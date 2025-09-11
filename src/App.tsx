import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import OperationsLayout from '@/components/layout/OperationsLayout'
import FinanceLayout from '@/components/layout/FinanceLayout'
import FillsPage from '@/pages/operations/fills/FillsPage'
import TransactionsPage from '@/pages/operations/transactions/TransactionsPage'
import { ProfitLossPage, CashFlowPage, BalanceSheetPage } from '@/pages/finance'
import { ROUTES } from '@/constants/routes'

function App() {
  return (
    <Routes>
      {/* All routes wrapped in AppLayout for top-level navigation */}
      <Route element={<AppLayout />}>
        {/* Root redirect */}
        <Route path="/" element={<Navigate to={ROUTES.OPERATIONS} replace />} />
        
        {/* Operations routes */}
        <Route path={ROUTES.OPERATIONS} element={<OperationsLayout />}>
          <Route index element={<Navigate to={ROUTES.OPERATIONS_FILLS} replace />} />
          <Route path="fills" element={<FillsPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
        </Route>
        
        {/* Finance routes */}
        <Route path={ROUTES.FINANCE} element={<FinanceLayout />}>
          <Route index element={<Navigate to={ROUTES.FINANCE_PROFIT_LOSS} replace />} />
          <Route path="profit-loss" element={<ProfitLossPage />} />
          <Route path="cash-flow" element={<CashFlowPage />} />
          <Route path="balance-sheet" element={<BalanceSheetPage />} />
        </Route>
        
        {/* Future routes - placeholder pages */}
        <Route path={ROUTES.DASHBOARD} element={<div>Dashboard - Coming Soon</div>} />
        <Route path={ROUTES.REPORTS} element={<div>Reports - Coming Soon</div>} />
        <Route path={ROUTES.SETTINGS} element={<div>Settings - Coming Soon</div>} />
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to={ROUTES.OPERATIONS} replace />} />
      </Route>
    </Routes>
  )
}

export default App
