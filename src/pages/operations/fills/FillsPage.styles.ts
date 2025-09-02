import { styled } from '@mui/material/styles'
import { Box, Grid, Alert } from '@mui/material'

export const StyledPageContainer = styled(Box)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}))

export const StyledGridContainer = styled(Grid)(() => ({
  height: '100%',
}))

export const StyledAlertsPaneGrid = styled(Grid)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(1),
}))

export const StyledMainContentGrid = styled(Grid)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(1),
}))

export const StyledTablesContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  marginTop: theme.spacing(1),
}))

export const StyledErrorAlert = styled(Alert)(() => ({
  width: '100%',
}))

export const StyledSuccessAlert = styled(Alert)(() => ({
  width: '100%',
}))
