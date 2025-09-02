import React from 'react'
import { Outlet } from 'react-router-dom'
import { Toolbar, Tab } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import {
  StyledContainer,
  StyledAppBar,
  StyledTitle,
  StyledTabs,
  StyledMain,
} from './AppLayout.styles'

const AppLayout: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const getCurrentTab = () => {
    if (location.pathname.startsWith(ROUTES.OPERATIONS)) return ROUTES.OPERATIONS
    if (location.pathname.startsWith(ROUTES.DASHBOARD)) return ROUTES.DASHBOARD
    if (location.pathname.startsWith(ROUTES.REPORTS)) return ROUTES.REPORTS
    if (location.pathname.startsWith(ROUTES.FINANCE)) return ROUTES.FINANCE
    if (location.pathname.startsWith(ROUTES.SETTINGS)) return ROUTES.SETTINGS
    return ROUTES.OPERATIONS
  }

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    navigate(newValue)
  }

  return (
    <StyledContainer>
      <StyledAppBar position="static">
        <Toolbar>
          <StyledTitle variant="h6">
            Backoffice Client
          </StyledTitle>
          <StyledTabs 
            value={getCurrentTab()} 
            onChange={handleTabChange}
            textColor="inherit"
            indicatorColor="secondary"
          >
            <Tab label="Dashboard" value={ROUTES.DASHBOARD} />
            <Tab label="Operations" value={ROUTES.OPERATIONS} />
            <Tab label="Reports" value={ROUTES.REPORTS} />
            <Tab label="Finance" value={ROUTES.FINANCE} />
            <Tab label="Settings" value={ROUTES.SETTINGS} />
          </StyledTabs>
        </Toolbar>
      </StyledAppBar>
      
      <StyledMain component="main">
        <Outlet />
      </StyledMain>
    </StyledContainer>
  )
}

export default AppLayout
