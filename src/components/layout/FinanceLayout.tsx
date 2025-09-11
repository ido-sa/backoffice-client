import React from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Tab } from '@mui/material'
import { ROUTES } from '@/constants/routes'
import {
  StyledContainer,
  StyledHeaderPaper,
  StyledTabs,
  StyledMain,
} from './FinanceLayout.styles'

const FinanceLayout: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const getCurrentTab = () => {
    if (location.pathname.includes('/profit-loss')) return 'profit-loss'
    if (location.pathname.includes('/cash-flow')) return 'cash-flow'
    if (location.pathname.includes('/balance-sheet')) return 'balance-sheet'
    return 'profit-loss'
  }

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    if (newValue === 'profit-loss') {
      navigate(ROUTES.FINANCE_PROFIT_LOSS)
    } else if (newValue === 'cash-flow') {
      navigate(ROUTES.FINANCE_CASH_FLOW)
    } else if (newValue === 'balance-sheet') {
      navigate(ROUTES.FINANCE_BALANCE_SHEET)
    }
  }

  return (
    <StyledContainer>
      <StyledHeaderPaper>
        <StyledTabs 
          value={getCurrentTab()} 
          onChange={handleTabChange}
        >
          <Tab label="Profit & Loss" value="profit-loss" />
          <Tab label="Cash Flow" value="cash-flow" />
          <Tab label="Balance Sheet" value="balance-sheet" />
        </StyledTabs>
      </StyledHeaderPaper>
      
      <StyledMain>
        <Outlet />
      </StyledMain>
    </StyledContainer>
  )
}

export default FinanceLayout
