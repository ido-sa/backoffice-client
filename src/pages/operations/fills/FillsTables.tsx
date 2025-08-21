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
import { FillRow } from '@/types/fills'
import { fillsTableColumns } from './constants'
import { useTableSelection } from '@/hooks/useTableSelection'

interface FillsTablesProps {
  clientFills: FillRow[]
  brokerFills: FillRow[]
  loading?: boolean
  error?: Error | null
}

const FillsTables: React.FC<FillsTablesProps> = ({
  clientFills,
  brokerFills,
  loading = false,
  error = null,
}) => {
  const [selectedClientIds, setSelectedClientIds] = useState<string[]>([])
  const [selectedBrokerIds, setSelectedBrokerIds] = useState<string[]>([])
  const [highlightedIds, setHighlightedIds] = useState<string[]>([])

  const handleRowClick = (row: FillRow, side: 'client' | 'broker') => {
    const matchedIds = row.matchedIds || []
    setHighlightedIds(matchedIds)
  }

  const handleClientSelectionChange = (ids: string[]) => {
    setSelectedClientIds(ids)
  }

  const handleBrokerSelectionChange = (ids: string[]) => {
    setSelectedBrokerIds(ids)
  }

  const isHighlighted = (id: string) => highlightedIds.includes(id)

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error.message}</Alert>
      </Box>
    )
  }

  return (
    <Grid container spacing={2} sx={{ height: '100%' }}>
      {/* Client Fills Table */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h6">Client Fills</Typography>
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
                          checked={selectedClientIds.length === clientFills.length}
                          indeterminate={selectedClientIds.length > 0 && selectedClientIds.length < clientFills.length}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleClientSelectionChange(clientFills.map(f => f.id))
                            } else {
                              handleClientSelectionChange([])
                            }
                          }}
                        />
                      </TableCell>
                      {fillsTableColumns.map((column) => (
                        <TableCell key={String(column.id)}>
                          {column.header}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clientFills.map((row) => (
                      <TableRow
                        key={row.id}
                        hover
                        selected={selectedClientIds.includes(row.id)}
                        onClick={() => handleRowClick(row, 'client')}
                        sx={{
                          cursor: 'pointer',
                          backgroundColor: isHighlighted(row.id) ? 'action.hover' : 'inherit',
                        }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedClientIds.includes(row.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                handleClientSelectionChange([...selectedClientIds, row.id])
                              } else {
                                handleClientSelectionChange(selectedClientIds.filter(id => id !== row.id))
                              }
                            }}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </TableCell>
                        {fillsTableColumns.map((column) => (
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

      {/* Broker Fills Table */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h6">Broker Fills</Typography>
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
                          checked={selectedBrokerIds.length === brokerFills.length}
                          indeterminate={selectedBrokerIds.length > 0 && selectedBrokerIds.length < brokerFills.length}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleBrokerSelectionChange(brokerFills.map(f => f.id))
                            } else {
                              handleBrokerSelectionChange([])
                            }
                          }}
                        />
                      </TableCell>
                      {fillsTableColumns.map((column) => (
                        <TableCell key={String(column.id)}>
                          {column.header}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {brokerFills.map((row) => (
                      <TableRow
                        key={row.id}
                        hover
                        selected={selectedBrokerIds.includes(row.id)}
                        onClick={() => handleRowClick(row, 'broker')}
                        sx={{
                          cursor: 'pointer',
                          backgroundColor: isHighlighted(row.id) ? 'action.hover' : 'inherit',
                        }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedBrokerIds.includes(row.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                handleBrokerSelectionChange([...selectedBrokerIds, row.id])
                              } else {
                                handleBrokerSelectionChange(selectedBrokerIds.filter(id => id !== row.id))
                              }
                            }}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </TableCell>
                        {fillsTableColumns.map((column) => (
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

export default FillsTables
