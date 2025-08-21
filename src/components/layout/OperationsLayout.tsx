import React from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Box, Tabs, Tab, Paper } from '@mui/material'
import { ROUTES } from '@/constants/routes'

const OperationsLayout: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const getCurrentTab = () => {
    if (location.pathname.includes('/fills')) return 'fills'
    if (location.pathname.includes('/transactions')) return 'transactions'
    return 'fills'
  }

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    if (newValue === 'fills') {
      navigate(ROUTES.OPERATIONS_FILLS)
    } else if (newValue === 'transactions') {
      navigate(ROUTES.OPERATIONS_TRANSACTIONS)
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Paper sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={getCurrentTab()} 
          onChange={handleTabChange}
          sx={{ px: 2 }}
        >
          <Tab label="Fills Reconciliation" value="fills" />
          <Tab label="Transactions Reconciliation" value="transactions" />
        </Tabs>
      </Paper>
      
      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default OperationsLayout
