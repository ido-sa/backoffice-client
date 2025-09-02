import { styled } from '@mui/material/styles'
import { Box, Typography, Card, CardContent, Skeleton } from '@mui/material'

export const StyledContainer = styled(Box)(() => ({
  marginBottom: 24,
}))

export const StyledTitle = styled(Typography)(() => ({
  marginBottom: 16,
  fontWeight: 600,
  color: '#1976d2',
}))

export const StyledCard = styled(Card)(() => ({
  height: '100%',
  transition: 'box-shadow 0.2s ease-in-out',
  '&:hover': {
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
}))

export const StyledCardContent = styled(CardContent)(() => ({
  padding: 16,
  '&:last-child': {
    paddingBottom: 16,
  },
}))

export const StyledLabel = styled(Typography)(() => ({
  marginBottom: 8,
  fontSize: '0.875rem',
  lineHeight: 1.2,
}))

export const StyledValue = styled(Typography)(() => ({
  fontWeight: 600,
  color: '#1976d2',
}))

export const StyledSkeleton = styled(Skeleton)(() => ({
  marginTop: 8,
}))
