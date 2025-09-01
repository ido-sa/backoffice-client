import React from 'react'
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
  onRowSelection?: (row: ClientTransactionRow | BrokerTransactionRow, side: 'client' | 'broker', isUnchecking?: boolean) => void
  isSelected?: (id: string) => boolean
}

const TransactionsTables: React.FC<TransactionsTablesProps> = ({
  clientTransactions,
  brokerTransactions,
  loading = false,
  error = null,
  onRowSelection,
  isSelected,
}) => {

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
                        {/* Header checkbox removed - no select all functionality */}
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
                        selected={isSelected?.(row.id) || false}
                        onClick={() => onRowSelection?.(row, 'client')}
                        sx={{
                          cursor: 'pointer',
                          backgroundColor: isSelected?.(row.id) ? 'primary.light' : 'inherit',
                          '&:hover': {
                            backgroundColor: isSelected?.(row.id) ? 'primary.light' : 'action.hover',
                          },
                          transition: 'background-color 0.2s ease',
                        }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected?.(row.id) || false}
                            onChange={(e) => {
                              onRowSelection?.(row, 'client', !e.target.checked)
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
                        {/* Header checkbox removed - no select all functionality */}
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
                        selected={isSelected?.(row.id) || false}
                        onClick={() => onRowSelection?.(row, 'broker')}
                        sx={{
                          cursor: 'pointer',
                          backgroundColor: isSelected?.(row.id) ? 'primary.light' : 'inherit',
                          '&:hover': {
                            backgroundColor: isSelected?.(row.id) ? 'primary.light' : 'action.hover',
                          },
                          transition: 'background-color 0.2s ease',
                        }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected?.(row.id) || false}
                            onChange={(e) => {
                              onRowSelection?.(row, 'broker', !e.target.checked)
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
