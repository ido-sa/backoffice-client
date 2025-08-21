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

const FillsPage: React.FC = () => {
  const [filters, setFilters] = useState<FillFilters>({
    date: new Date().toISOString().split('T')[0],
  })

  // Fetch alerts
  const alertsQuery = useFillsAlerts()
  
  // Fetch fills data when filters are applied
  const fillsQuery = useFillsData(filters)

  const handleAlertClick = (alert: FillAlert) => {
    // Parse contract name to extract instrument, expiration, strike
    const contractParts = alert.contractName.split(' ')
    const newFilters: FillFilters = {
      date: alert.date,
      instrument: contractParts[0] || undefined,
      expiration: contractParts[1] || undefined,
      strike: contractParts[2] || undefined,
    }
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
