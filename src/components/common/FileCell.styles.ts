import { styled } from '@mui/material/styles'
import { Box, Typography, IconButton } from '@mui/material'

export const StyledContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
}))

export const StyledFilePath = styled(Typography)(() => ({
  fontFamily: 'monospace',
  fontSize: '0.75rem',
  maxWidth: 200,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}))

export const StyledIconButton = styled(IconButton)(() => ({
  padding: 4,
}))
