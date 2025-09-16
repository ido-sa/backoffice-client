import { styled } from '@mui/material/styles'
import { Box, Button } from '@mui/material'

export const StyledActionButtonsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  minHeight: 64,
}))

export const StyledLeftButtonGroup = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  flex: 1,
}))

export const StyledCenterButtonGroup = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  flex: 1,
}))

export const StyledRightButtonGroup = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  flex: 1,
}))

export const StyledActionButton = styled(Button)(({ theme }) => ({
  minWidth: 100,
  fontSize: '0.875rem',
  '&:disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
    borderColor: theme.palette.action.disabledBackground,
  },
}))
