import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box, AppBar, Toolbar, Typography, Tabs, Tab } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

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
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0, mr: 4, color: 'white' }}>
            Backoffice Client
          </Typography>
          <Tabs 
            value={getCurrentTab()} 
            onChange={handleTabChange}
            sx={{ 
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
            }}
            textColor="inherit"
            indicatorColor="secondary"
          >
            <Tab label="Dashboard" value={ROUTES.DASHBOARD} />
            <Tab label="Operations" value={ROUTES.OPERATIONS} />
            <Tab label="Reports" value={ROUTES.REPORTS} />
            <Tab label="Finance" value={ROUTES.FINANCE} />
            <Tab label="Settings" value={ROUTES.SETTINGS} />
          </Tabs>
        </Toolbar>
      </AppBar>
      
      <Box component="main" sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default AppLayout
