import React, { useState } from 'react'
import { Snackbar } from '@mui/material'
import {
  StyledPageContainer,
  StyledGridContainer,
  StyledAlertsPaneGrid,
  StyledMainContentGrid,
  StyledTablesContainer,
  StyledErrorAlert,
  StyledSuccessAlert,
} from './FillsPage.styles'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AlertsPane from '@/components/common/AlertsPane'
import FillsFilters from './FillsFilters'
import FillsTables from './FillsTables'
import ReconciliationButtons from '@/components/common/ReconciliationButtons'
import { FillAlert } from '@/types/alerts'
import { FillFilters, FillMatchRequest } from '@/types/fills'
import { useFillsAlerts, useFillsData } from './hooks/useFillsData'
import { fillsAlertColumns } from './constants'
import { useReconciliation } from '@/hooks/useReconciliation'
import MockClient from '@/services/mocks/mockClient'

const mockClient = new MockClient()

const FillsPage: React.FC = () => {
  const [filters, setFilters] = useState<FillFilters>({
    date: new Date().toISOString().split('T')[0],
  })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const queryClient = useQueryClient()

  // Fetch alerts
  const alertsQuery = useFillsAlerts()
  
  // Fetch filter options for mapping
  const instrumentsQuery = useQuery({
    queryKey: ['instruments'],
    queryFn: () => mockClient.getInstruments({}),
  })

  const expirationsQuery = useQuery({
    queryKey: ['expirations'],
    queryFn: () => mockClient.getExpirations({}),
  })

  const strikesQuery = useQuery({
    queryKey: ['strikes'],
    queryFn: () => mockClient.getStrikes({}),
  })

  // const accountsQuery = useQuery({
  //   queryKey: ['accounts'],
  //   queryFn: () => mockClient.getAccounts({}),
  // })
  
  // Fetch fills data when filters are applied
  const fillsQuery = useFillsData(filters)

  // Reconciliation state
  const reconciliation = useReconciliation(
    fillsQuery.data?.clientFills || [],
    fillsQuery.data?.brokerFills || []
  )

  // Match mutation
  const matchMutation = useMutation({
    mutationFn: (request: FillMatchRequest) => mockClient.matchFills(request),
    onSuccess: (response) => {
      if (response.success) {
        setSuccessMessage(response.message)
        reconciliation.clearSelection()
        // Refetch data to update reconciliation status
        queryClient.invalidateQueries({ queryKey: ['fills', filters] })
      } else {
        setErrorMessage(response.message)
      }
    },
    onError: (error) => {
      setErrorMessage(error.message || 'Failed to match fills')
    },
  })

  // Unmatch mutation
  const unmatchMutation = useMutation({
    mutationFn: (request: FillMatchRequest) => mockClient.unmatchFills(request),
    onSuccess: (response) => {
      if (response.success) {
        setSuccessMessage(response.message)
        reconciliation.clearSelection()
        // Refetch data to update reconciliation status
        queryClient.invalidateQueries({ queryKey: ['fills', filters] })
      } else {
        setErrorMessage(response.message)
      }
    },
    onError: (error) => {
      setErrorMessage(error.message || 'Failed to unmatch fills')
    },
  })

  const handleMatch = () => {
    const request: FillMatchRequest = {
      clientFillIds: reconciliation.selectedClientIds,
      brokerFillIds: reconciliation.selectedBrokerIds,
    }
    matchMutation.mutate(request)
  }

  const handleUnmatch = () => {
    const request: FillMatchRequest = {
      clientFillIds: reconciliation.selectedClientIds,
      brokerFillIds: reconciliation.selectedBrokerIds,
    }
    unmatchMutation.mutate(request)
  }

  const handleAlertClick = (alert: FillAlert) => {
    // Only proceed if all required queries have loaded
    if (!instrumentsQuery.data?.items || !expirationsQuery.data?.items || !strikesQuery.data?.items) {
      console.log('Query data not yet loaded, skipping filter update')
      return
    }

    // Parse contract name to extract instrument, expiration, strike
    // Contract name format: "ES JUN25 4500"
    const contractParts = alert.contractName.split(' ')
    console.log('Alert clicked:', alert)
    console.log('Contract parts:', contractParts)
    
    // Map contract parts to filter option IDs
    const instrument = instrumentsQuery.data.items.find(inst => inst.name === contractParts[0])?.id
    const expiration = expirationsQuery.data.items.find(exp => exp.name === contractParts[1])?.id
    const strike = strikesQuery.data.items.find(str => str.name === contractParts[2])?.id
    
    console.log('Mapped values:', { instrument, expiration, strike })
    console.log('Available strikes:', strikesQuery.data.items.map(s => s.name))
    
    const newFilters: FillFilters = {
      date: alert.date,
      // account: alert.accountId, // Commented out since accountsQuery is not used
      instrument: instrument,
      expiration: expiration,
      strike: strike,
    }
    
    console.log('New filters:', newFilters)
    setFilters(newFilters)
  }

  const handleFiltersApply = (newFilters: FillFilters) => {
    setFilters(newFilters)
  }

  return (
    <StyledPageContainer>
      <StyledGridContainer container>
        {/* Alerts Pane - 15% width */}
        <StyledAlertsPaneGrid item xs={12} md={2}>
          <AlertsPane
            columns={fillsAlertColumns}
            data={alertsQuery.data?.items || []}
            onAlertClick={handleAlertClick}
            loading={alertsQuery.isLoading}
            error={alertsQuery.error}
            title="Fills Alerts"
          />
        </StyledAlertsPaneGrid>

        {/* Main Content - 85% width */}
        <StyledMainContentGrid item xs={12} md={10}>
          <FillsFilters
            filters={filters}
            onApply={handleFiltersApply}
            loading={fillsQuery.isLoading}
          />
          
          <ReconciliationButtons
            canMatch={reconciliation.canMatch}
            canUnmatch={reconciliation.canUnmatch}
            onMatch={handleMatch}
            onUnmatch={handleUnmatch}
            loading={matchMutation.isPending || unmatchMutation.isPending}
          />
          
          <StyledTablesContainer>
            <FillsTables
              clientFills={fillsQuery.data?.clientFills || []}
              brokerFills={fillsQuery.data?.brokerFills || []}
              loading={fillsQuery.isLoading}
              error={fillsQuery.error}
              onRowSelection={(row, side, isUnchecking) => reconciliation.handleRowSelection(row, side, isUnchecking)}
              isSelected={reconciliation.isSelected}
            />
          </StyledTablesContainer>
        </StyledMainContentGrid>
      </StyledGridContainer>

      {/* Error and Success Messages */}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <StyledErrorAlert onClose={() => setErrorMessage(null)} severity="error">
          {errorMessage}
        </StyledErrorAlert>
      </Snackbar>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={4000}
        onClose={() => setSuccessMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <StyledSuccessAlert onClose={() => setSuccessMessage(null)} severity="success">
          {successMessage}
        </StyledSuccessAlert>
      </Snackbar>
    </StyledPageContainer>
  )
}

export default FillsPage
