import React from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Tab } from '@mui/material'
import { ROUTES } from '@/constants/routes'
import {
  StyledContainer,
  StyledHeaderPaper,
  StyledTabs,
  StyledMain,
} from './OperationsLayout.styles'

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
    <StyledContainer>
      <StyledHeaderPaper>
        <StyledTabs 
          value={getCurrentTab()} 
          onChange={handleTabChange}
        >
          <Tab label="Fills Reconciliation" value="fills" />
          <Tab label="Transactions Reconciliation" value="transactions" />
        </StyledTabs>
      </StyledHeaderPaper>
      
      <StyledMain>
        <Outlet />
      </StyledMain>
    </StyledContainer>
  )
}

export default OperationsLayout
