import React, { useState } from 'react'
import { Box, Grid, Alert, Snackbar } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { FinanceFilters, FinanceSummary, FinanceBreakdownTable } from './components'
import { FinanceFilters as FinanceFiltersType } from '@/types/finance'
import { useFinanceData } from './hooks'
import MockClient from '@/services/mocks/mockClient'

const mockClient = new MockClient()

const ProfitLossPage: React.FC = () => {
  const [filters, setFilters] = useState<FinanceFiltersType>({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Fetch filter options
  const brokersQuery = useQuery({
    queryKey: ['finance-brokers'],
    queryFn: () => mockClient.getFinanceBrokers({}),
  })

  const fundsQuery = useQuery({
    queryKey: ['finance-funds'],
    queryFn: () => mockClient.getFinanceFunds({}),
  })

  // Fetch finance data
  const { summaryQuery, breakdownQuery } = useFinanceData(filters)

  const handleApplyFilters = (newFilters: FinanceFiltersType) => {
    setFilters(newFilters)
  }

  const handleCloseError = () => {
    setErrorMessage(null)
  }

  const handleCloseSuccess = () => {
    setSuccessMessage(null)
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Error and Success Messages */}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Filters Section */}
      <FinanceFilters
        filters={filters}
        onApply={handleApplyFilters}
        brokers={brokersQuery.data?.items || []}
        funds={fundsQuery.data?.items || []}
        loading={brokersQuery.isLoading || fundsQuery.isLoading}
      />

      {/* Summary Section */}
      <FinanceSummary
        summary={summaryQuery.data?.summary}
        loading={summaryQuery.isLoading}
        error={summaryQuery.error}
      />

      {/* Breakdown Table Section */}
      <FinanceBreakdownTable
        breakdown={breakdownQuery.data?.breakdown}
        loading={breakdownQuery.isLoading}
        error={breakdownQuery.error}
      />
    </Box>
  )
}

export default ProfitLossPage
