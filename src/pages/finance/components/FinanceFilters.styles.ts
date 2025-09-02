import { styled } from '@mui/material/styles'
import { Box, Button } from '@mui/material'

export const StyledContainer = styled(Box)(() => ({
  marginBottom: 24,
  padding: 16,
  border: '1px solid',
  borderColor: '#e0e0e0',
  borderRadius: 4,
  backgroundColor: '#ffffff',
}))

export const StyledApplyButton = styled(Button)(() => ({
  height: '40px',
  fontWeight: 600,
}))
