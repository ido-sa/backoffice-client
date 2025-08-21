import React, { useState } from 'react'
import { Box, Grid } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import AlertsPane from '@/components/common/AlertsPane'
import FillsFilters from './FillsFilters'
import FillsTables from './FillsTables'
import { FillAlert } from '@/types/alerts'
import { FillFilters } from '@/types/fills'
import { useFillsAlerts, useFillsData } from './hooks/useFillsData'
import { fillsAlertColumns } from './constants'
import MockClient from '@/services/mocks/mockClient'

const mockClient = new MockClient()

const FillsPage: React.FC = () => {
  const [filters, setFilters] = useState<FillFilters>({
    date: new Date().toISOString().split('T')[0],
  })

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

  const accountsQuery = useQuery({
    queryKey: ['accounts'],
    queryFn: () => mockClient.getAccounts({}),
  })
  
  // Fetch fills data when filters are applied
  const fillsQuery = useFillsData(filters)

  const handleAlertClick = (alert: FillAlert) => {
    // Parse contract name to extract instrument, expiration, strike
    // Contract name format: "ES JUN25 4500"
    const contractParts = alert.contractName.split(' ')
    console.log('Alert clicked:', alert)
    console.log('Contract parts:', contractParts)
    
    // Map contract parts to filter option IDs
    const instrument = instrumentsQuery.data?.items.find(inst => inst.name === contractParts[0])?.id
    const expiration = expirationsQuery.data?.items.find(exp => exp.name === contractParts[1])?.id
    const strike = strikesQuery.data?.items.find(str => str.name === contractParts[2])?.id
    
    console.log('Mapped values:', { instrument, expiration, strike })
    console.log('Available strikes:', strikesQuery.data?.items.map(s => s.name))
    
    const newFilters: FillFilters = {
      date: alert.date,
      account: alert.accountId,
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
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Grid container sx={{ height: '100%' }}>
        {/* Alerts Pane - 15% width */}
        <Grid item xs={12} md={2} sx={{ height: '100%', p: 1 }}>
          <AlertsPane
            columns={fillsAlertColumns}
            data={alertsQuery.data?.items || []}
            onAlertClick={handleAlertClick}
            loading={alertsQuery.isLoading}
            error={alertsQuery.error}
            title="Fills Alerts"
          />
        </Grid>

        {/* Main Content - 85% width */}
        <Grid item xs={12} md={10} sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 1 }}>
          <FillsFilters
            filters={filters}
            onApply={handleFiltersApply}
            loading={fillsQuery.isLoading}
          />
          
          <Box sx={{ flexGrow: 1, mt: 1 }}>
            <FillsTables
              clientFills={fillsQuery.data?.clientFills || []}
              brokerFills={fillsQuery.data?.brokerFills || []}
              loading={fillsQuery.isLoading}
              error={fillsQuery.error}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default FillsPage
