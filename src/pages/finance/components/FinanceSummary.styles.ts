import { SxProps, Theme } from '@mui/material'

export const FinanceSummaryStyles = {
  container: {
    mb: 3,
  } as SxProps<Theme>,

  title: {
    mb: 2,
    fontWeight: 600,
    color: 'text.primary',
  } as SxProps<Theme>,

  card: {
    height: '100%',
    transition: 'box-shadow 0.2s ease-in-out',
    '&:hover': {
      boxShadow: 2,
    },
  } as SxProps<Theme>,

  cardContent: {
    p: 2,
    '&:last-child': {
      pb: 2,
    },
  } as SxProps<Theme>,

  label: {
    mb: 1,
    fontSize: '0.875rem',
    lineHeight: 1.2,
  } as SxProps<Theme>,

  value: {
    fontWeight: 600,
    color: 'primary.main',
  } as SxProps<Theme>,

  skeleton: {
    mt: 1,
  } as SxProps<Theme>,
}
