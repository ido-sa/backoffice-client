import React from 'react'
import {
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
  Grid,
} from '@mui/material'
import {
  StyledGridContainer,
  StyledPaper,
  StyledHeaderBox,
  StyledContentBox,
  StyledLoadingBox,
  StyledTableRow,
  StyledSelectedTableRow,
  StyledErrorBox,
} from './TransactionsTables.styles'
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
      <StyledErrorBox>
        <Alert severity="error">{error.message}</Alert>
      </StyledErrorBox>
    )
  }

  return (
    <StyledGridContainer container spacing={2}>
      {/* Client Transactions Table */}
      <Grid item xs={12} md={6}>
        <StyledPaper>
          <StyledHeaderBox>
            <Typography variant="h6">Client Transactions</Typography>
          </StyledHeaderBox>
          
          <StyledContentBox>
            {loading ? (
              <StyledLoadingBox>
                <CircularProgress />
              </StyledLoadingBox>
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
                      <React.Fragment key={row.id}>
                        {isSelected?.(row.id) ? (
                          <StyledSelectedTableRow
                            hover
                            selected={true}
                            onClick={() => onRowSelection?.(row, 'client')}
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
                          </StyledSelectedTableRow>
                        ) : (
                          <StyledTableRow
                            hover
                            selected={false}
                            onClick={() => onRowSelection?.(row, 'client')}
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
                          </StyledTableRow>
                        )}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </StyledContentBox>
        </StyledPaper>
      </Grid>

      {/* Broker Transactions Table */}
      <Grid item xs={12} md={6}>
        <StyledPaper>
          <StyledHeaderBox>
            <Typography variant="h6">Broker Transactions</Typography>
          </StyledHeaderBox>
          
          <StyledContentBox>
            {loading ? (
              <StyledLoadingBox>
                <CircularProgress />
              </StyledLoadingBox>
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
                      <React.Fragment key={row.id}>
                        {isSelected?.(row.id) ? (
                          <StyledSelectedTableRow
                            hover
                            selected={true}
                            onClick={() => onRowSelection?.(row, 'broker')}
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
                          </StyledSelectedTableRow>
                        ) : (
                          <StyledTableRow
                            hover
                            selected={false}
                            onClick={() => onRowSelection?.(row, 'broker')}
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
                          </StyledTableRow>
                        )}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </StyledContentBox>
        </StyledPaper>
      </Grid>
    </StyledGridContainer>
  )
}

export default TransactionsTables
