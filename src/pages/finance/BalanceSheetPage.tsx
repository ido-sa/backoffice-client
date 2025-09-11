import React, { useState } from 'react'
import { Alert, Snackbar } from '@mui/material'
import { StyledPageContainer } from './BalanceSheetPage.styles'
import { useQuery } from '@tanstack/react-query'
import { FinanceFilters, FinanceBreakdownTable } from './components'
import { FinanceFilters as FinanceFiltersType } from '@/types/finance'
import { useBalanceSheetData } from './hooks'
import MockClient from '@/services/mocks/mockClient'

const mockClient = new MockClient()

const BalanceSheetPage: React.FC = () => {
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

  // Fetch balance sheet data
  const { breakdownQuery } = useBalanceSheetData(filters)

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
    <StyledPageContainer>
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

      {/* Breakdown Table Section - without E/A column */}
      <FinanceBreakdownTable
        breakdown={breakdownQuery.data?.breakdown}
        loading={breakdownQuery.isLoading}
        error={breakdownQuery.error}
        hideExpectedArrivedColumn={true}
        title="Balance Sheet (Broken Down)"
      />
    </StyledPageContainer>
  )
}

export default BalanceSheetPage
