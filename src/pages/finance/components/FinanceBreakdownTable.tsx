import React, { useMemo, useState } from 'react'
import {
  TableBody,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
  Alert,
} from '@mui/material'
import { ExpandMore, ExpandLess } from '@mui/icons-material'
import { BrokerData, TypeData } from '@/types/finance'
import {
  StyledContainer,
  StyledTitle,
  StyledTableContainer,
  StyledBrokerColumn,
  StyledFundColumn,
  StyledTypeColumn,
  StyledExpectedArrivedColumn,
  StyledUsdColumn,
  StyledCurrencyColumn,
  StyledTableRow,
  StyledBrokerCell,
  StyledFundCell,
  StyledTypeCell,
  StyledExpectedArrivedCell,
  StyledUsdCell,
  StyledCurrencyCell,
  StyledCellContent,
  StyledExpandButton,
  StyledBrokerText,
  StyledFundText,
  StyledTypeText,
  StyledUsdText,
  StyledCurrencyText,
} from './FinanceBreakdownTable.styles'

interface FinanceBreakdownTableProps {
  breakdown?: BrokerData[]
  loading?: boolean
  error?: Error | null
  hideExpectedArrivedColumn?: boolean
  title?: string
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
  hideExpectedArrivedColumn = false,
  title = 'Profit and Loss (Broken Down)',
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

  const formatCurrency = (value: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(value)
  }

  const getAggregatedValue = (row: TableRowData, currency: string = 'USD'): number => {
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

    // For collapsed rows, we need to access the original data structure
    if (!breakdown) return 0

    if (row.level === 'broker') {
      const brokerIndex = parseInt(row.id.split('-')[1])
      const broker = breakdown[brokerIndex]
      if (!broker) return 0

      return broker.funds.reduce((sum, fund) => {
        return sum + getFundAggregatedValue(fund, currency)
      }, 0)
    }

    if (row.level === 'fund') {
      const [, brokerIndex, fundIndex] = row.id.split('-').map(Number)
      const fund = breakdown[brokerIndex]?.funds[fundIndex]
      if (!fund) return 0

      return getFundAggregatedValue(fund, currency)
    }

    if (row.level === 'type') {
      const [, brokerIndex, fundIndex, typeIndex] = row.id.split('-').map(Number)
      const type = breakdown[brokerIndex]?.funds[fundIndex]?.types[typeIndex]
      if (!type) return 0

      return getTypeAggregatedValue(type, currency)
    }

    return 0
  }

  const getFundAggregatedValue = (fund: any, currency: string = 'USD'): number => {
    return fund.types.reduce((sum: number, type: any) => {
      return sum + getTypeAggregatedValue(type, currency)
    }, 0)
  }

  const getTypeAggregatedValue = (type: any, currency: string = 'USD'): number => {
    let sum = 0
    
    if (type.expected) {
      if (currency === 'USD') {
        sum += type.expected.usd
      } else {
        sum += type.expected.currencies[currency] || 0
      }
    }
    
    if (type.arrived) {
      if (currency === 'USD') {
        sum += type.arrived.usd
      } else {
        sum += type.arrived.currencies[currency] || 0
      }
    }
    
    return sum
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
      const [, brokerIndex, fundIndex] = row.id.split('-').map(Number)
      return breakdown[brokerIndex]?.funds[fundIndex]?.types?.length > 0
    }
    
    if (row.level === 'type') {
      const [, brokerIndex, fundIndex, typeIndex] = row.id.split('-').map(Number)
      const type = breakdown[brokerIndex]?.funds[fundIndex]?.types[typeIndex]
      return !!(type?.expected || type?.arrived)
    }
    
    return false
  }

  if (error) {
    return (
      <StyledContainer>
        <Alert severity="error">
          Failed to load breakdown data: {error.message}
        </Alert>
      </StyledContainer>
    )
  }

  return (
    <StyledContainer>
      <StyledTitle variant="h6">
        {title}
      </StyledTitle>
      
      <StyledTableContainer>
        <Paper>
          <table style={{ tableLayout: 'fixed', width: '100%' }}>
          <TableHead>
            <TableRow>
              <StyledBrokerColumn>Broker</StyledBrokerColumn>
              <StyledFundColumn>Fund</StyledFundColumn>
              <StyledTypeColumn>Type</StyledTypeColumn>
              {!hideExpectedArrivedColumn && <StyledExpectedArrivedColumn>E/A</StyledExpectedArrivedColumn>}
              <StyledUsdColumn>$</StyledUsdColumn>
              {currencies.map(currency => (
                <StyledCurrencyColumn key={currency}>
                  {currency}
                </StyledCurrencyColumn>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  <StyledBrokerCell><Skeleton variant="text" width="80%" /></StyledBrokerCell>
                  <StyledFundCell><Skeleton variant="text" width="80%" /></StyledFundCell>
                  <StyledTypeCell><Skeleton variant="text" width="80%" /></StyledTypeCell>
                  {!hideExpectedArrivedColumn && <StyledExpectedArrivedCell><Skeleton variant="text" width="80%" /></StyledExpectedArrivedCell>}
                  <StyledUsdCell><Skeleton variant="text" width="80%" /></StyledUsdCell>
                  {currencies.map((_, colIndex) => (
                    <StyledCurrencyCell key={colIndex}>
                      <Skeleton variant="text" width="80%" />
                    </StyledCurrencyCell>
                  ))}
                </TableRow>
              ))
            ) : (
              tableData.map((row) => (
                <StyledTableRow key={row.id}>
                  {/* Broker Column */}
                  <StyledBrokerCell>
                    <StyledCellContent>
                      {hasChildren(row) && row.level === 'broker' && (
                        <StyledExpandButton
                          size="small"
                          onClick={() => toggleRowExpansion(row.id)}
                        >
                          {row.isExpanded ? <ExpandLess /> : <ExpandMore />}
                        </StyledExpandButton>
                      )}
                      <StyledBrokerText
                        style={{
                          paddingLeft: hasChildren(row) && row.level === 'broker' ? 0 : 12,
                          fontWeight: row.level === 'broker' ? 600 : 'normal',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {row.level === 'broker' ? row.broker : ''}
                      </StyledBrokerText>
                    </StyledCellContent>
                  </StyledBrokerCell>

                  {/* Fund Column */}
                  <StyledFundCell>
                    <StyledCellContent>
                      {hasChildren(row) && row.level === 'fund' && (
                        <StyledExpandButton
                          size="small"
                          onClick={() => toggleRowExpansion(row.id)}
                        >
                          {row.isExpanded ? <ExpandLess /> : <ExpandMore />}
                        </StyledExpandButton>
                      )}
                      <StyledFundText
                        style={{
                          paddingLeft: hasChildren(row) && row.level === 'fund' ? 0 : row.depth * 12,
                          fontWeight: row.level === 'fund' ? 600 : 'normal',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {row.level === 'fund' ? row.fund : ''}
                      </StyledFundText>
                    </StyledCellContent>
                  </StyledFundCell>

                  {/* Type Column */}
                  <StyledTypeCell>
                    <StyledCellContent>
                      {hasChildren(row) && row.level === 'type' && (
                        <StyledExpandButton
                          size="small"
                          onClick={() => toggleRowExpansion(row.id)}
                        >
                          {row.isExpanded ? <ExpandLess /> : <ExpandMore />}
                        </StyledExpandButton>
                      )}
                      <StyledTypeText
                        style={{
                          paddingLeft: hasChildren(row) && row.level === 'type' ? 0 : row.depth * 12,
                          fontWeight: row.level === 'type' ? 600 : 'normal',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {row.level === 'type' ? row.type : ''}
                      </StyledTypeText>
                    </StyledCellContent>
                  </StyledTypeCell>

                  {/* Expected/Arrived Column */}
                  {!hideExpectedArrivedColumn && (
                    <StyledExpectedArrivedCell>
                      <StyledBrokerText
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {row.level === 'expected' || row.level === 'arrived' ? row.expectedArrived : ''}
                      </StyledBrokerText>
                    </StyledExpectedArrivedCell>
                  )}

                  {/* USD Column */}
                  <StyledUsdCell>
                    <StyledUsdText
                      style={{
                        fontWeight: !expandedRows.has(row.id) ? 600 : 'normal',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {(() => {
                        const value = getAggregatedValue(row, 'USD')
                        const isCollapsed = !expandedRows.has(row.id)
                        const showValue = row.level === 'expected' || row.level === 'arrived' || isCollapsed
                        return showValue ? formatCurrency(value, 'USD') : ''
                      })()}
                    </StyledUsdText>
                  </StyledUsdCell>

                  {/* Currency Columns */}
                  {currencies.map(currency => (
                    <StyledCurrencyCell key={currency}>
                      <StyledCurrencyText
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {(() => {
                          const value = getAggregatedValue(row, currency)
                          const isCollapsed = !expandedRows.has(row.id)
                          const showValue = row.level === 'expected' || row.level === 'arrived' || isCollapsed
                          return showValue ? formatCurrency(value, currency) : ''
                        })()}
                      </StyledCurrencyText>
                    </StyledCurrencyCell>
                  ))}
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </table>
        </Paper>
      </StyledTableContainer>
    </StyledContainer>
  )
}

export default FinanceBreakdownTable