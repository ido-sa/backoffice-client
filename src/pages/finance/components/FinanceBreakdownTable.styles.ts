import { styled } from '@mui/material/styles'
import { Box, Typography, TableContainer, TableRow, TableCell, IconButton } from '@mui/material'

export const StyledContainer = styled(Box)(() => ({
  marginBottom: 24,
}))

export const StyledTitle = styled(Typography)(() => ({
  marginBottom: 12,
  fontWeight: 600,
  color: '#1976d2',
  fontSize: '1.1rem',
}))

export const StyledTableContainer = styled(TableContainer)(() => ({
  maxHeight: '70vh',
  overflow: 'auto',
}))

export const StyledTable = styled('table')(() => ({
  tableLayout: 'auto',
}))

export const StyledHeaderCell = styled(TableCell)(() => ({
  backgroundColor: '#fafafa',
  fontWeight: 600,
  color: '#1976d2',
  borderBottom: '2px solid',
  borderBottomColor: '#e0e0e0',
  position: 'sticky',
  top: 0,
  zIndex: 1,
  paddingTop: 1,
  paddingBottom: 1,
  paddingLeft: 2,
  paddingRight: 2,
  fontSize: '0.75rem',
  whiteSpace: 'nowrap',
}))

export const StyledTableRow = styled(TableRow)(() => ({
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#fafafa',
  },
}))

export const StyledTableCell = styled(TableCell)(() => ({
  borderBottom: '1px solid',
  borderBottomColor: '#e0e0e0',
  paddingTop: 0.5,
  paddingBottom: 0.5,
  paddingLeft: 2,
  paddingRight: 2,
  fontSize: '0.7rem',
}))

export const StyledCellContent = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 2,
}))

export const StyledCellText = styled('span')(() => ({
  fontSize: '0.7rem',
  color: '#1976d2',
  lineHeight: 1.1,
}))

export const StyledExpandButton = styled(IconButton)(() => ({
  padding: 0.5,
  minWidth: 'auto',
  width: '12px',
  height: '12px',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '0.75rem',
  },
}))

// Column width styles
export const StyledBrokerColumn = styled(StyledHeaderCell)(() => ({
  width: '120px !important',
  minWidth: '120px !important',
  maxWidth: '120px !important',
}))

export const StyledFundColumn = styled(StyledHeaderCell)(() => ({
  width: '120px !important',
  minWidth: '120px !important',
  maxWidth: '120px !important',
}))

export const StyledTypeColumn = styled(StyledHeaderCell)(() => ({
  width: '120px !important',
  minWidth: '120px !important',
  maxWidth: '120px !important',
}))

export const StyledExpectedArrivedColumn = styled(StyledHeaderCell)(() => ({
  width: '80px !important',
  minWidth: '80px !important',
  maxWidth: '80px !important',
}))

export const StyledUsdColumn = styled(StyledHeaderCell)(() => ({
  width: '100px !important',
  minWidth: '100px !important',
  maxWidth: '100px !important',
}))

export const StyledCurrencyColumn = styled(StyledHeaderCell)(() => ({
  width: '100px !important',
  minWidth: '100px !important',
  maxWidth: '100px !important',
}))

// Combined styles for table cells
export const StyledBrokerCell = styled(StyledTableCell)(() => ({
  width: '120px !important',
  minWidth: '120px !important',
  maxWidth: '120px !important',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}))

export const StyledFundCell = styled(StyledTableCell)(() => ({
  width: '120px !important',
  minWidth: '120px !important',
  maxWidth: '120px !important',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}))

export const StyledTypeCell = styled(StyledTableCell)(() => ({
  width: '120px !important',
  minWidth: '120px !important',
  maxWidth: '120px !important',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}))

export const StyledExpectedArrivedCell = styled(StyledTableCell)(() => ({
  width: '80px !important',
  minWidth: '80px !important',
  maxWidth: '80px !important',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}))

export const StyledUsdCell = styled(StyledTableCell)(() => ({
  width: '100px !important',
  minWidth: '100px !important',
  maxWidth: '100px !important',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}))

export const StyledCurrencyCell = styled(StyledTableCell)(() => ({
  width: '100px !important',
  minWidth: '100px !important',
  maxWidth: '100px !important',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}))

// Special text styles for different levels
export const StyledBrokerText = styled(StyledCellText)(() => ({
  fontWeight: 600,
}))

export const StyledFundText = styled(StyledCellText)(() => ({
  fontWeight: 600,
}))

export const StyledTypeText = styled(StyledCellText)(() => ({
  fontWeight: 600,
}))

export const StyledUsdText = styled(StyledCellText)(() => ({
  textAlign: 'right',
}))

export const StyledCurrencyText = styled(StyledCellText)(() => ({
  textAlign: 'right',
}))

export const StyledCollapsedText = styled(StyledCellText)(() => ({
  fontWeight: 600,
}))
