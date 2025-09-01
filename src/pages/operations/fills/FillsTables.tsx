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
import { FillRow } from '@/types/fills'
import { fillsTableColumns } from './constants'


interface FillsTablesProps {
  clientFills: FillRow[]
  brokerFills: FillRow[]
  loading?: boolean
  error?: Error | null
  onRowSelection?: (row: FillRow, side: 'client' | 'broker', isUnchecking?: boolean) => void
  isSelected?: (id: string) => boolean
}

const FillsTables: React.FC<FillsTablesProps> = ({
  clientFills,
  brokerFills,
  loading = false,
  error = null,
  onRowSelection,
  isSelected,
}) => {
  const handleRowClick = (row: FillRow, side: 'client' | 'broker') => {
    if (onRowSelection) {
      onRowSelection(row, side)
    }
  }

  const handleCheckboxChange = (row: FillRow, side: 'client' | 'broker', checked: boolean) => {
    if (onRowSelection) {
      // Pass the isUnchecking flag to the parent component
      onRowSelection(row, side, !checked)
    }
  }

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
                      <TableCell padding="checkbox"></TableCell>
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
                        selected={isSelected ? isSelected(row.id) : false}
                        onClick={() => handleRowClick(row, 'client')}
                        sx={{
                          cursor: 'pointer',
                          backgroundColor: isSelected && isSelected(row.id) ? 'primary.light' : 'inherit',
                          '&:hover': {
                            backgroundColor: isSelected && isSelected(row.id) ? 'primary.light' : 'action.hover',
                          },
                          transition: 'background-color 0.2s ease',
                        }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected ? isSelected(row.id) : false}
                            onChange={(e) => handleCheckboxChange(row, 'client', e.target.checked)}
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
                      <TableCell padding="checkbox"></TableCell>
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
                        selected={isSelected ? isSelected(row.id) : false}
                        onClick={() => handleRowClick(row, 'broker')}
                        sx={{
                          cursor: 'pointer',
                          backgroundColor: isSelected && isSelected(row.id) ? 'primary.light' : 'inherit',
                          '&:hover': {
                            backgroundColor: isSelected && isSelected(row.id) ? 'primary.light' : 'action.hover',
                          },
                          transition: 'background-color 0.2s ease',
                        }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected ? isSelected(row.id) : false}
                            onChange={(e) => handleCheckboxChange(row, 'broker', e.target.checked)}
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
