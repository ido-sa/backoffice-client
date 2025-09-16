import { styled } from '@mui/material/styles'
import { Box, Stack } from '@mui/material'

export const StyledModalContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: 400,
}))

export const StyledFormSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '&:last-child': {
    marginBottom: 0,
  },
}))

export const StyledButtonGroup = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: theme.spacing(1),
}))
