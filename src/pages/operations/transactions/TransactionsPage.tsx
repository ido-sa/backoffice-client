import React, { useState } from 'react'
import { Box, Grid } from '@mui/material'
import AlertsPane from '@/components/common/AlertsPane'
import TransactionsFilters from './TransactionsFilters'
import TransactionsTables from './TransactionsTables'
import { TransactionAlert } from '@/types/alerts'
import { TransactionFilters } from '@/types/transactions'
import { useTransactionsAlerts, useTransactionsData } from './hooks/useTransactionsData'
import { transactionsAlertColumns } from './constants'

const TransactionsPage: React.FC = () => {
  const [filters, setFilters] = useState<TransactionFilters>({
    from: new Date().toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0],
  })

  // Fetch alerts
  const alertsQuery = useTransactionsAlerts()
  
  // Fetch transactions data when filters are applied
  const transactionsQuery = useTransactionsData(filters)

  const handleAlertClick = (alert: TransactionAlert) => {
    const newFilters: TransactionFilters = {
      from: alert.date,
      to: alert.date,
      broker: alert.brokerId,
    }
    setFilters(newFilters)
  }

  const handleFiltersApply = (newFilters: TransactionFilters) => {
    setFilters(newFilters)
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Grid container sx={{ height: '100%' }}>
        {/* Alerts Pane - 15% width */}
        <Grid item xs={12} md={2} sx={{ height: '100%', p: 1 }}>
          <AlertsPane
            columns={transactionsAlertColumns}
            data={alertsQuery.data?.items || []}
            onAlertClick={handleAlertClick}
            loading={alertsQuery.isLoading}
            error={alertsQuery.error}
            title="Transaction Alerts"
          />
        </Grid>

        {/* Main Content - 85% width */}
        <Grid item xs={12} md={10} sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 1 }}>
          <TransactionsFilters
            filters={filters}
            onApply={handleFiltersApply}
            loading={transactionsQuery.isLoading}
          />
          
          <Box sx={{ flexGrow: 1, mt: 1 }}>
            <TransactionsTables
              clientTransactions={transactionsQuery.data?.clientTransactions || []}
              brokerTransactions={transactionsQuery.data?.brokerTransactions || []}
              loading={transactionsQuery.isLoading}
              error={transactionsQuery.error}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TransactionsPage
