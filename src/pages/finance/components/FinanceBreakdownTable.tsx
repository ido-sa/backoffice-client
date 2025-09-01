import React, { useMemo, useState } from 'react'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Skeleton,
  Alert,
} from '@mui/material'
import { ExpandMore, ExpandLess } from '@mui/icons-material'
import { BrokerData, TypeData } from '@/types/finance'
import { FinanceBreakdownTableStyles } from './FinanceBreakdownTable.styles'

interface FinanceBreakdownTableProps {
  breakdown?: BrokerData[]
  loading?: boolean
  error?: Error | null
}

interface TableRowData {
  id: string
  level: 'broker' | 'fund' | 'type' | 'expected' | 'arrived'
  broker?: string
  fund?: string
  type?: string
  expectedArrived?: 'Expected' | 'Arrived'
  data?: TypeData
  parentId?: string
  isExpanded?: boolean
  depth: number
}

const FinanceBreakdownTable: React.FC<FinanceBreakdownTableProps> = ({
  breakdown,
  loading = false,
  error,
}) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  // Extract all unique currencies from the data
  const currencies = useMemo(() => {
    if (!breakdown) return []
    
    const currencySet = new Set<string>()
    breakdown.forEach(broker => {
      broker.funds.forEach(fund => {
        fund.types.forEach(type => {
          if (type.expected?.currencies) {
            Object.keys(type.expected.currencies).forEach(currency => currencySet.add(currency))
          }
          if (type.arrived?.currencies) {
            Object.keys(type.arrived.currencies).forEach(currency => currencySet.add(currency))
          }
        })
      })
    })
    
    return Array.from(currencySet).sort()
  }, [breakdown])

  // Transform data into flat table structure
  const tableData = useMemo(() => {
    if (!breakdown) return []

    const rows: TableRowData[] = []

    breakdown.forEach((broker, brokerIndex) => {
      const brokerId = `broker-${brokerIndex}`
      const isBrokerExpanded = expandedRows.has(brokerId)
      
      rows.push({
        id: brokerId,
        level: 'broker',
        broker: broker.broker,
        isExpanded: isBrokerExpanded,
        depth: 0,
      })

      if (isBrokerExpanded) {
        broker.funds.forEach((fund, fundIndex) => {
          const fundId = `fund-${brokerIndex}-${fundIndex}`
          const isFundExpanded = expandedRows.has(fundId)
          
          rows.push({
            id: fundId,
            level: 'fund',
            broker: broker.broker,
            fund: fund.fund,
            parentId: brokerId,
            isExpanded: isFundExpanded,
            depth: 1,
          })

          if (isFundExpanded) {
            fund.types.forEach((type, typeIndex) => {
              const typeId = `type-${brokerIndex}-${fundIndex}-${typeIndex}`
              const isTypeExpanded = expandedRows.has(typeId)
              
              rows.push({
                id: typeId,
                level: 'type',
                broker: broker.broker,
                fund: fund.fund,
                type: type.type,
                data: type,
                parentId: fundId,
                isExpanded: isTypeExpanded,
                depth: 2,
              })

              if (isTypeExpanded) {
                if (type.expected) {
                  rows.push({
                    id: `${typeId}-expected`,
                    level: 'expected',
                    broker: broker.broker,
                    fund: fund.fund,
                    type: type.type,
                    expectedArrived: 'Expected',
                    data: type,
                    parentId: typeId,
                    depth: 3,
                  })
                }
                if (type.arrived) {
                  rows.push({
                    id: `${typeId}-arrived`,
                    level: 'arrived',
                    broker: broker.broker,
                    fund: fund.fund,
                    type: type.type,
                    expectedArrived: 'Arrived',
                    data: type,
                    parentId: typeId,
                    depth: 3,
                  })
                }
              }
            })
          }
        })
      }
    })

    return rows
  }, [breakdown, expandedRows])

  const formatCurrency = (value: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(value)
  }

  const getAggregatedValue = (row: TableRowData, currency: string = 'USD') => {
    if (row.level === 'expected' || row.level === 'arrived') {
      const data = row.data
      if (!data) return 0
      
      if (row.level === 'expected' && data.expected) {
        return currency === 'USD' ? data.expected.usd : (data.expected.currencies[currency] || 0)
      }
      if (row.level === 'arrived' && data.arrived) {
        return currency === 'USD' ? data.arrived.usd : (data.arrived.currencies[currency] || 0)
      }
    }

    // For collapsed rows, aggregate child values
    const children = tableData.filter(child => child.parentId === row.id)
    return children.reduce((sum, child) => {
      if (child.level === 'expected' || child.level === 'arrived') {
        return sum + getAggregatedValue(child, currency)
      }
      return sum + getAggregatedValue(child, currency)
    }, 0)
  }

  const toggleRowExpansion = (rowId: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(rowId)) {
      newExpanded.delete(rowId)
      // Also collapse all children
      const children = tableData.filter(row => row.parentId === rowId)
      children.forEach(child => newExpanded.delete(child.id))
    } else {
      newExpanded.add(rowId)
    }
    setExpandedRows(newExpanded)
  }

  const hasChildren = (row: TableRowData) => {
    if (!breakdown) return false
    
    if (row.level === 'broker') {
      const brokerIndex = parseInt(row.id.split('-')[1])
      return breakdown[brokerIndex]?.funds?.length > 0
    }
    
    if (row.level === 'fund') {
      const [_, brokerIndex, fundIndex] = row.id.split('-').map(Number)
      return breakdown[brokerIndex]?.funds[fundIndex]?.types?.length > 0
    }
    
    if (row.level === 'type') {
      const [_, brokerIndex, fundIndex, typeIndex] = row.id.split('-').map(Number)
      const type = breakdown[brokerIndex]?.funds[fundIndex]?.types[typeIndex]
      return !!(type?.expected || type?.arrived)
    }
    
    return false
  }

  if (error) {
    return (
      <Box sx={FinanceBreakdownTableStyles.container}>
        <Alert severity="error">
          Failed to load breakdown data: {error.message}
        </Alert>
      </Box>
    )
  }

  return (
    <Box sx={FinanceBreakdownTableStyles.container}>
      <Typography variant="h6" sx={FinanceBreakdownTableStyles.title}>
        Profit and Loss (Broken Down)
      </Typography>
      
      <TableContainer component={Paper} sx={FinanceBreakdownTableStyles.tableContainer}>
        <Table size="small" sx={{ tableLayout: 'auto' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ ...FinanceBreakdownTableStyles.headerCell, ...FinanceBreakdownTableStyles.brokerColumn } as any}>Broker</TableCell>
              <TableCell sx={{ ...FinanceBreakdownTableStyles.headerCell, ...FinanceBreakdownTableStyles.fundColumn } as any}>Fund</TableCell>
              <TableCell sx={{ ...FinanceBreakdownTableStyles.headerCell, ...FinanceBreakdownTableStyles.typeColumn } as any}>Type</TableCell>
              <TableCell sx={{ ...FinanceBreakdownTableStyles.headerCell, ...FinanceBreakdownTableStyles.expectedArrivedColumn } as any}>E/A</TableCell>
              <TableCell sx={{ ...FinanceBreakdownTableStyles.headerCell, ...FinanceBreakdownTableStyles.usdColumn } as any}>$</TableCell>
              {currencies.map(currency => (
                <TableCell key={currency} sx={{ ...FinanceBreakdownTableStyles.headerCell, ...FinanceBreakdownTableStyles.currencyColumn } as any}>
                  {currency}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell sx={FinanceBreakdownTableStyles.brokerColumn}><Skeleton variant="text" width="80%" /></TableCell>
                  <TableCell sx={FinanceBreakdownTableStyles.fundColumn}><Skeleton variant="text" width="80%" /></TableCell>
                  <TableCell sx={FinanceBreakdownTableStyles.typeColumn}><Skeleton variant="text" width="80%" /></TableCell>
                  <TableCell sx={FinanceBreakdownTableStyles.expectedArrivedColumn}><Skeleton variant="text" width="80%" /></TableCell>
                  <TableCell sx={FinanceBreakdownTableStyles.usdColumn}><Skeleton variant="text" width="80%" /></TableCell>
                  {currencies.map((_, colIndex) => (
                    <TableCell key={colIndex} sx={FinanceBreakdownTableStyles.currencyColumn}>
                      <Skeleton variant="text" width="80%" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              tableData.map((row) => (
                <TableRow key={row.id} sx={FinanceBreakdownTableStyles.tableRow}>
                  {/* Broker Column */}
                  <TableCell sx={FinanceBreakdownTableStyles.brokerCell}>
                    <Box sx={FinanceBreakdownTableStyles.cellContent}>
                      {hasChildren(row) && row.level === 'broker' && (
                        <IconButton
                          size="small"
                          onClick={() => toggleRowExpansion(row.id)}
                          sx={FinanceBreakdownTableStyles.expandButton}
                        >
                          {row.isExpanded ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                      )}
                      <Typography
                        variant="body2"
                        sx={{
                          ...FinanceBreakdownTableStyles.cellText,
                          pl: hasChildren(row) && row.level === 'broker' ? 0 : 1.5,
                          fontWeight: row.level === 'broker' ? 600 : 'normal',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {row.level === 'broker' ? row.broker : ''}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Fund Column */}
                  <TableCell sx={FinanceBreakdownTableStyles.fundCell}>
                    <Box sx={FinanceBreakdownTableStyles.cellContent}>
                      {hasChildren(row) && row.level === 'fund' && (
                        <IconButton
                          size="small"
                          onClick={() => toggleRowExpansion(row.id)}
                          sx={FinanceBreakdownTableStyles.expandButton}
                        >
                          {row.isExpanded ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                      )}
                      <Typography
                        variant="body2"
                        sx={{
                          ...FinanceBreakdownTableStyles.cellText,
                          pl: hasChildren(row) && row.level === 'fund' ? 0 : row.depth * 1.5,
                          fontWeight: row.level === 'fund' ? 600 : 'normal',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {row.level === 'fund' ? row.fund : ''}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Type Column */}
                  <TableCell sx={FinanceBreakdownTableStyles.typeCell}>
                    <Box sx={FinanceBreakdownTableStyles.cellContent}>
                      {hasChildren(row) && row.level === 'type' && (
                        <IconButton
                          size="small"
                          onClick={() => toggleRowExpansion(row.id)}
                          sx={FinanceBreakdownTableStyles.expandButton}
                        >
                          {row.isExpanded ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                      )}
                      <Typography
                        variant="body2"
                        sx={{
                          ...FinanceBreakdownTableStyles.cellText,
                          pl: hasChildren(row) && row.level === 'type' ? 0 : row.depth * 1.5,
                          fontWeight: row.level === 'type' ? 600 : 'normal',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {row.level === 'type' ? row.type : ''}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Expected/Arrived Column */}
                  <TableCell sx={FinanceBreakdownTableStyles.expectedArrivedCell}>
                    <Typography
                      variant="body2"
                      sx={{
                        ...FinanceBreakdownTableStyles.cellText,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {row.level === 'expected' || row.level === 'arrived' ? row.expectedArrived : ''}
                    </Typography>
                  </TableCell>

                  {/* USD Column */}
                  <TableCell sx={FinanceBreakdownTableStyles.usdCell}>
                    <Typography
                      variant="body2"
                      sx={{
                        ...FinanceBreakdownTableStyles.cellText,
                        fontWeight: row.isExpanded === false ? 600 : 'normal',
                        textAlign: 'right',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {(() => {
                        const value = getAggregatedValue(row, 'USD')
                        const showValue = row.level === 'expected' || row.level === 'arrived' || row.isExpanded === false
                        return showValue ? formatCurrency(value, 'USD') : ''
                      })()}
                    </Typography>
                  </TableCell>

                  {/* Currency Columns */}
                  {currencies.map(currency => (
                    <TableCell key={currency} sx={FinanceBreakdownTableStyles.currencyCell}>
                      <Typography
                        variant="body2"
                        sx={{
                          ...FinanceBreakdownTableStyles.cellText,
                          textAlign: 'right',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {(() => {
                          const value = getAggregatedValue(row, currency)
                          const showValue = row.level === 'expected' || row.level === 'arrived'
                          return showValue ? formatCurrency(value, currency) : ''
                        })()}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default FinanceBreakdownTable