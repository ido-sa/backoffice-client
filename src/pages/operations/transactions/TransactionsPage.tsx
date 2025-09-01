import React, { useState } from 'react'
import { Box, Grid, Snackbar, Alert } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import AlertsPane from '@/components/common/AlertsPane'
import TransactionsFilters from './TransactionsFilters'
import TransactionsTables from './TransactionsTables'
import ReconciliationButtons from '@/components/common/ReconciliationButtons'
import { TransactionAlert } from '@/types/alerts'
import { TransactionFilters, TransactionMatchRequest } from '@/types/transactions'
import { useTransactionsAlerts, useTransactionsData } from './hooks/useTransactionsData'
import { transactionsAlertColumns } from './constants'
import { useReconciliation } from '@/hooks/useReconciliation'
import MockClient from '@/services/mocks/mockClient'

const mockClient = new MockClient()

const TransactionsPage: React.FC = () => {
  const [filters, setFilters] = useState<TransactionFilters>({
    from: new Date().toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0],
  })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const queryClient = useQueryClient()

  // Fetch alerts
  const alertsQuery = useTransactionsAlerts()
  
  // Fetch transactions data when filters are applied
  const transactionsQuery = useTransactionsData(filters)

  // Reconciliation state
  const reconciliation = useReconciliation(
    transactionsQuery.data?.clientTransactions || [],
    transactionsQuery.data?.brokerTransactions || []
  )

  // Match mutation
  const matchMutation = useMutation({
    mutationFn: (request: TransactionMatchRequest) => mockClient.matchTransactions(request),
    onSuccess: (response) => {
      if (response.success) {
        setSuccessMessage(response.message)
        reconciliation.clearSelection()
        // Refetch data to update reconciliation status
        queryClient.invalidateQueries({ queryKey: ['transactions-data', filters] })
      } else {
        setErrorMessage(response.message)
      }
    },
    onError: (error) => {
      setErrorMessage(error.message || 'Failed to match transactions')
    },
  })

  // Unmatch mutation
  const unmatchMutation = useMutation({
    mutationFn: (request: TransactionMatchRequest) => mockClient.unmatchTransactions(request),
    onSuccess: (response) => {
      if (response.success) {
        setSuccessMessage(response.message)
        reconciliation.clearSelection()
        // Refetch data to update reconciliation status
        queryClient.invalidateQueries({ queryKey: ['transactions-data', filters] })
      } else {
        setErrorMessage(response.message)
      }
    },
    onError: (error) => {
      setErrorMessage(error.message || 'Failed to unmatch transactions')
    },
  })

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

  const handleMatch = () => {
    const request: TransactionMatchRequest = {
      clientTransactionIds: reconciliation.selectedClientIds,
      brokerTransactionIds: reconciliation.selectedBrokerIds,
    }
    matchMutation.mutate(request)
  }

  const handleUnmatch = () => {
    const request: TransactionMatchRequest = {
      clientTransactionIds: reconciliation.selectedClientIds,
      brokerTransactionIds: reconciliation.selectedBrokerIds,
    }
    unmatchMutation.mutate(request)
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

          {/* Reconciliation Buttons */}
          <ReconciliationButtons
            canMatch={reconciliation.canMatch}
            canUnmatch={reconciliation.canUnmatch}
            onMatch={handleMatch}
            onUnmatch={handleUnmatch}
            loading={matchMutation.isPending || unmatchMutation.isPending}
          />
          
          <Box sx={{ flexGrow: 1, mt: 1 }}>
            <TransactionsTables
              clientTransactions={transactionsQuery.data?.clientTransactions || []}
              brokerTransactions={transactionsQuery.data?.brokerTransactions || []}
              loading={transactionsQuery.isLoading}
              error={transactionsQuery.error}
              onRowSelection={(row, side, isUnchecking) => reconciliation.handleRowSelection(row, side, isUnchecking)}
              isSelected={reconciliation.isSelected}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Error and Success Messages */}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setErrorMessage(null)} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSuccessMessage(null)} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default TransactionsPage
