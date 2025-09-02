import React from 'react'
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Grid,
  TableRow,
  Checkbox,
  CircularProgress,
  Alert,
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
} from './FillsTables.styles'
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
      <StyledErrorBox>
        <Alert severity="error">{error.message}</Alert>
      </StyledErrorBox>
    )
  }

  return (
    <StyledGridContainer container spacing={2}>
      {/* Client Fills Table */}
      <Grid item xs={12} md={6}>
        <StyledPaper>
          <StyledHeaderBox>
            <Typography variant="h6">Client Fills</Typography>
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
                      <React.Fragment key={row.id}>
                        {isSelected && isSelected(row.id) ? (
                          <StyledSelectedTableRow
                            hover
                            selected={true}
                            onClick={() => handleRowClick(row, 'client')}
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
                          </StyledSelectedTableRow>
                        ) : (
                          <StyledTableRow
                            hover
                            selected={false}
                            onClick={() => handleRowClick(row, 'client')}
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

      {/* Broker Fills Table */}
      <Grid item xs={12} md={6}>
        <StyledPaper>
          <StyledHeaderBox>
            <Typography variant="h6">Broker Fills</Typography>
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
                      <React.Fragment key={row.id}>
                        {isSelected && isSelected(row.id) ? (
                          <StyledSelectedTableRow
                            hover
                            selected={true}
                            onClick={() => handleRowClick(row, 'broker')}
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
                          </StyledSelectedTableRow>
                        ) : (
                          <StyledTableRow
                            hover
                            selected={false}
                            onClick={() => handleRowClick(row, 'broker')}
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

export default FillsTables
