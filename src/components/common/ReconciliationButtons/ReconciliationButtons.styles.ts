import { styled } from '@mui/material/styles'
import { Box, Button } from '@mui/material'

export const StyledReconciliationContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'center',
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}))

export const StyledMatchButton = styled(Button)(({ theme }) => ({
  minWidth: 120,
  '&:disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
}))

export const StyledUnmatchButton = styled(Button)(({ theme }) => ({
  minWidth: 120,
  '&:disabled': {
    borderColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
}))
