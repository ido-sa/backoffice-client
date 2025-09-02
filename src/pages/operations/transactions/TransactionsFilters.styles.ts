import { styled } from '@mui/material/styles'
import { Box, Button } from '@mui/material'

export const StyledFiltersContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}))

export const StyledApplyButton = styled(Button)(({ theme }) => ({
  height: 40,
}))
