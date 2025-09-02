import { styled } from '@mui/material/styles'
import { Paper, Box, List, ListItem, Typography } from '@mui/material'

export const StyledErrorPaper = styled(Paper)(() => ({
  padding: 16,
  height: '100%',
}))

export const StyledMainPaper = styled(Paper)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}))

export const StyledContentBox = styled(Box)(() => ({
  flexGrow: 1,
  overflow: 'auto',
}))

export const StyledLoadingBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  padding: 32,
}))

export const StyledEmptyBox = styled(Box)(() => ({
  padding: 16,
  textAlign: 'center',
}))

export const StyledHeaderBox = styled(Box)(() => ({
  padding: 16,
  borderBottom: '1px solid',
  borderBottomColor: '#e0e0e0',
  backgroundColor: '#fafafa',
}))

export const StyledHeaderContentBox = styled(Box)(() => ({
  display: 'flex',
  gap: 16,
}))

export const StyledHeaderText = styled(Typography)(() => ({
  fontWeight: 'bold',
  flex: 1,
}))

export const StyledList = styled(List)(() => ({
  padding: 0,
}))

export const StyledListItem = styled(ListItem)(() => ({
  borderBottom: '1px solid',
  borderBottomColor: '#e0e0e0',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}))

export const StyledListItemContentBox = styled(Box)(() => ({
  display: 'flex',
  gap: 16,
}))

export const StyledListItemText = styled(Typography)(() => ({
  flex: 1,
}))
