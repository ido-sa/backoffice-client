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

export const StyledHeaderBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}))

export const StyledContentBox = styled(Box)(() => ({
  flexGrow: 1,
  overflow: 'auto',
}))

export const StyledLoadingBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(4),
}))

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}))

export const StyledSelectedTableRow = styled(TableRow)(({ theme }) => ({
  cursor: 'pointer',
  backgroundColor: theme.palette.primary.light,
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}))

export const StyledErrorBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}))
