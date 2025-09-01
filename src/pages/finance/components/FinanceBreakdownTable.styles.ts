import { SxProps, Theme } from '@mui/material'

export const FinanceBreakdownTableStyles = {
  container: {
    mb: 3,
  } as SxProps<Theme>,

  title: {
    mb: 1.5,
    fontWeight: 600,
    color: 'text.primary',
    fontSize: '1.1rem',
  } as SxProps<Theme>,

  tableContainer: {
    maxHeight: '70vh',
    overflow: 'auto',
  } as SxProps<Theme>,

  headerCell: {
    backgroundColor: 'grey.50',
    fontWeight: 600,
    color: 'text.primary',
    borderBottom: '2px solid',
    borderBottomColor: 'divider',
    position: 'sticky',
    top: 0,
    zIndex: 1,
    py: 0.125,
    px: 0.25,
    fontSize: '0.75rem',
    whiteSpace: 'nowrap',
  } as SxProps<Theme>,

  tableRow: {
    '&:hover': {
      backgroundColor: 'action.hover',
    },
    '&:nth-of-type(even)': {
      backgroundColor: 'grey.50',
    },
  } as SxProps<Theme>,

  tableCell: {
    borderBottom: '1px solid',
    borderBottomColor: 'divider',
    py: 0.0625,
    px: 0.25,
    fontSize: '0.7rem',
  } as SxProps<Theme>,

  cellContent: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.25,
  } as SxProps<Theme>,

  cellText: {
    fontSize: '0.7rem',
    color: 'text.primary',
    lineHeight: 1.1,
  } as SxProps<Theme>,

  expandButton: {
    p: 0.0625,
    minWidth: 'auto',
    width: '12px',
    height: '12px',
    '&:hover': {
      backgroundColor: 'action.hover',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '0.75rem',
    },
  } as SxProps<Theme>,

  // Column width styles
  brokerColumn: {
    width: '36px !important',
    minWidth: '36px !important',
    maxWidth: '36px !important',
    flex: '0 0 36px',
  } as SxProps<Theme>,

  fundColumn: {
    width: '36px !important',
    minWidth: '36px !important',
    maxWidth: '36px !important',
    flex: '0 0 36px',
  } as SxProps<Theme>,

  typeColumn: {
    width: '36px !important',
    minWidth: '36px !important',
    maxWidth: '36px !important',
    flex: '0 0 36px',
  } as SxProps<Theme>,

  expectedArrivedColumn: {
    width: '30px !important',
    minWidth: '30px !important',
    maxWidth: '30px !important',
    flex: '0 0 30px',
  } as SxProps<Theme>,

  usdColumn: {
    width: '3%',
  } as SxProps<Theme>,

  currencyColumn: {
    width: '2%',
  } as SxProps<Theme>,

  // Combined styles for table cells
  brokerCell: {
    borderBottom: '1px solid',
    borderBottomColor: 'divider',
    py: 0.0625,
    px: 0.25,
    fontSize: '0.7rem',
    width: '36px !important',
    minWidth: '36px !important',
    maxWidth: '36px !important',
    flex: '0 0 36px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  } as SxProps<Theme>,

  fundCell: {
    borderBottom: '1px solid',
    borderBottomColor: 'divider',
    py: 0.0625,
    px: 0.25,
    fontSize: '0.7rem',
    width: '36px !important',
    minWidth: '36px !important',
    maxWidth: '36px !important',
    flex: '0 0 36px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  } as SxProps<Theme>,

  typeCell: {
    borderBottom: '1px solid',
    borderBottomColor: 'divider',
    py: 0.0625,
    px: 0.25,
    fontSize: '0.7rem',
    width: '36px !important',
    minWidth: '36px !important',
    maxWidth: '36px !important',
    flex: '0 0 36px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  } as SxProps<Theme>,

  expectedArrivedCell: {
    borderBottom: '1px solid',
    borderBottomColor: 'divider',
    py: 0.0625,
    px: 0.25,
    fontSize: '0.7rem',
    width: '30px !important',
    minWidth: '30px !important',
    maxWidth: '30px !important',
    flex: '0 0 30px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  } as SxProps<Theme>,

  usdCell: {
    borderBottom: '1px solid',
    borderBottomColor: 'divider',
    py: 0.0625,
    px: 0.25,
    fontSize: '0.7rem',
    width: '6%',
  } as SxProps<Theme>,

  currencyCell: {
    borderBottom: '1px solid',
    borderBottomColor: 'divider',
    py: 0.0625,
    px: 0.25,
    fontSize: '0.7rem',
    width: '4%',
  } as SxProps<Theme>,
}
