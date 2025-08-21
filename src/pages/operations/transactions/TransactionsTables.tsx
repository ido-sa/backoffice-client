import React, { useState } from 'react'
import {
  Box,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  CircularProgress,
  Alert,
} from '@mui/material'
import { ClientTransactionRow, BrokerTransactionRow } from '@/types/transactions'
import { clientTransactionColumns, brokerTransactionColumns } from './constants'

interface TransactionsTablesProps {
  clientTransactions: ClientTransactionRow[]
  brokerTransactions: BrokerTransactionRow[]
  loading?: boolean
  error?: Error | null
}

const TransactionsTables: React.FC<TransactionsTablesProps> = ({
  clientTransactions,
  brokerTransactions,
  loading = false,
  error = null,
}) => {
  const [selectedClientIds, setSelectedClientIds] = useState<string[]>([])
  const [selectedBrokerIds, setSelectedBrokerIds] = useState<string[]>([])

  const handleRowSelection = (row: ClientTransactionRow | BrokerTransactionRow, side: 'client' | 'broker') => {
    const matchedIds = row.matchedIds || []
    const allMatchedIds = [row.id, ...matchedIds]
    
    // Clear previous selections and select the new group
    setSelectedClientIds([])
    setSelectedBrokerIds([])
    
    // Select all matched rows on both sides
    allMatchedIds.forEach(id => {
      const clientTransaction = clientTransactions.find(t => t.id === id)
      const brokerTransaction = brokerTransactions.find(t => t.id === id)
      
      if (clientTransaction) {
        setSelectedClientIds(prev => [...prev, id])
      }
      if (brokerTransaction) {
        setSelectedBrokerIds(prev => [...prev, id])
      }
    })
  }

  const handleClientSelectionChange = (ids: string[]) => {
    setSelectedClientIds(ids)
  }

  const handleBrokerSelectionChange = (ids: string[]) => {
    setSelectedBrokerIds(ids)
  }

  const isSelected = (id: string) => selectedClientIds.includes(id) || selectedBrokerIds.includes(id)

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error.message}</Alert>
      </Box>
    )
  }

  return (
    <Grid container spacing={2} sx={{ height: '100%' }}>
      {/* Client Transactions Table */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h6">Client Transactions</Typography>
          </Box>
          
          <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedClientIds.length === clientTransactions.length}
                          indeterminate={selectedClientIds.length > 0 && selectedClientIds.length < clientTransactions.length}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleClientSelectionChange(clientTransactions.map(t => t.id))
                            } else {
                              handleClientSelectionChange([])
                            }
                          }}
                        />
                      </TableCell>
                      {clientTransactionColumns.map((column) => (
                        <TableCell key={String(column.id)}>
                          {column.header}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clientTransactions.map((row) => (
                      <TableRow
                        key={row.id}
                        hover
                        selected={isSelected(row.id)}
                        onClick={() => handleRowSelection(row, 'client')}
                        sx={{
                          cursor: 'pointer',
                          backgroundColor: isSelected(row.id) ? 'primary.light' : 'inherit',
                          '&:hover': {
                            backgroundColor: isSelected(row.id) ? 'primary.light' : 'action.hover',
                          },
                          transition: 'background-color 0.2s ease',
                        }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected(row.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                handleRowSelection(row, 'client')
                              } else {
                                // Clear all selections when unchecking
                                setSelectedClientIds([])
                                setSelectedBrokerIds([])
                              }
                            }}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </TableCell>
                        {clientTransactionColumns.map((column) => (
                          <TableCell key={String(column.id)}>
                            {column.render ? column.render(row[column.accessorKey], row) : String(row[column.accessorKey] || '')}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </Paper>
      </Grid>

      {/* Broker Transactions Table */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h6">Broker Transactions</Typography>
          </Box>
          
          <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedBrokerIds.length === brokerTransactions.length}
                          indeterminate={selectedBrokerIds.length > 0 && selectedBrokerIds.length < brokerTransactions.length}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleBrokerSelectionChange(brokerTransactions.map(t => t.id))
                            } else {
                              handleBrokerSelectionChange([])
                            }
                          }}
                        />
                      </TableCell>
                      {brokerTransactionColumns.map((column) => (
                        <TableCell key={String(column.id)}>
                          {column.header}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {brokerTransactions.map((row) => (
                      <TableRow
                        key={row.id}
                        hover
                        selected={isSelected(row.id)}
                        onClick={() => handleRowSelection(row, 'broker')}
                        sx={{
                          cursor: 'pointer',
                          backgroundColor: isSelected(row.id) ? 'primary.light' : 'inherit',
                          '&:hover': {
                            backgroundColor: isSelected(row.id) ? 'primary.light' : 'action.hover',
                          },
                          transition: 'background-color 0.2s ease',
                        }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected(row.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                handleRowSelection(row, 'broker')
                              } else {
                                // Clear all selections when unchecking
                                setSelectedClientIds([])
                                setSelectedBrokerIds([])
                              }
                            }}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </TableCell>
                        {brokerTransactionColumns.map((column) => (
                          <TableCell key={String(column.id)}>
                            {column.render ? column.render(row[column.accessorKey], row) : String(row[column.accessorKey] || '')}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default TransactionsTables
