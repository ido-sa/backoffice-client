import { styled } from '@mui/material/styles'
import { Box, Paper, Tabs } from '@mui/material'

export const StyledContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
}))

export const StyledHeaderPaper = styled(Paper)(() => ({
  borderBottom: '1px solid',
  borderBottomColor: '#e0e0e0',
}))

export const StyledTabs = styled(Tabs)(() => ({
  paddingLeft: 16,
  paddingRight: 16,
}))

export const StyledMain = styled(Box)(() => ({
  flexGrow: 1,
  overflow: 'hidden',
}))
