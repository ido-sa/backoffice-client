import { styled } from '@mui/material/styles'
import { Box, AppBar, Typography, Tabs } from '@mui/material'

export const StyledContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
}))

export const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: '#1976d2',
}))

export const StyledTitle = styled(Typography)(() => ({
  flexGrow: 0,
  marginRight: 32,
  color: 'white',
}))

export const StyledTabs = styled(Tabs)(() => ({
  flexGrow: 1,
  '& .MuiTab-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: 'normal',
    '&.Mui-selected': {
      color: 'white',
      fontWeight: 'bold',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
  '& .MuiTabs-indicator': {
    backgroundColor: 'white',
    height: 3,
  },
}))

export const StyledMain = styled(Box)(() => ({
  flexGrow: 1,
  overflow: 'hidden',
}))
