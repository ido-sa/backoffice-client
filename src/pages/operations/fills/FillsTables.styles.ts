import { styled } from '@mui/material/styles'
import { Box, Grid, Paper, TableRow } from '@mui/material'

export const StyledGridContainer = styled(Grid)(() => ({
  height: '100%',
}))

export const StyledPaper = styled(Paper)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}))

export const StyledHeaderBox = styled(Box)(() => ({
  padding: 16,
  borderBottom: '1px solid #e0e0e0',
}))

export const StyledContentBox = styled(Box)(() => ({
  flexGrow: 1,
  overflow: 'auto',
}))

export const StyledLoadingBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  padding: 32,
}))

export const StyledTableRow = styled(TableRow)(() => ({
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}))

export const StyledSelectedTableRow = styled(TableRow)(() => ({
  cursor: 'pointer',
  backgroundColor: '#e3f2fd',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: '#e3f2fd',
  },
}))

export const StyledErrorBox = styled(Box)(() => ({
  padding: 16,
}))
