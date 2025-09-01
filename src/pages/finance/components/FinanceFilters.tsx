import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { FinanceFilters as FinanceFiltersType, FundOption, BrokerOption } from '@/types/finance'
import { FinanceFiltersStyles } from './FinanceFilters.styles'

interface FinanceFiltersProps {
  filters: FinanceFiltersType
  onApply: (filters: FinanceFiltersType) => void
  brokers: BrokerOption[]
  funds: FundOption[]
  loading?: boolean
}

const FinanceFilters: React.FC<FinanceFiltersProps> = ({
  filters,
  onApply,
  brokers,
  funds,
  loading = false,
}) => {
  // Local state for filter changes
  const [localFilters, setLocalFilters] = useState<FinanceFiltersType>(filters)

  // Update local filters when props change
  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  const handleStartDateChange = (date: Date | null) => {
    setLocalFilters(prev => ({
      ...prev,
      startDate: date ? date.toISOString().split('T')[0] : undefined,
    }))
  }

  const handleEndDateChange = (date: Date | null) => {
    setLocalFilters(prev => ({
      ...prev,
      endDate: date ? date.toISOString().split('T')[0] : undefined,
    }))
  }

  const handleBrokerChange = (event: any) => {
    setLocalFilters(prev => ({
      ...prev,
      brokerId: event.target.value || undefined,
    }))
  }

  const handleFundChange = (event: any) => {
    setLocalFilters(prev => ({
      ...prev,
      fundId: event.target.value || undefined,
    }))
  }

  const handleApply = () => {
    onApply(localFilters)
  }

  return (
    <Box sx={FinanceFiltersStyles.container}>
      <Grid container spacing={2} alignItems="center">
        {/* Start Date */}
        <Grid item xs={12} sm={6} md={2}>
          <DatePicker
            label="Start Date"
            value={localFilters.startDate ? new Date(localFilters.startDate) : null}
            onChange={handleStartDateChange}
            slotProps={{
              textField: {
                fullWidth: true,
                size: 'small',
              },
            }}
          />
        </Grid>

        {/* End Date */}
        <Grid item xs={12} sm={6} md={2}>
          <DatePicker
            label="End Date"
            value={localFilters.endDate ? new Date(localFilters.endDate) : null}
            onChange={handleEndDateChange}
            slotProps={{
              textField: {
                fullWidth: true,
                size: 'small',
              },
            }}
          />
        </Grid>

        {/* Fund Dropdown */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Fund</InputLabel>
            <Select
              value={localFilters.fundId || ''}
              onChange={handleFundChange}
              label="Fund"
              disabled={loading}
            >
              <MenuItem value="">
                <em>All Funds</em>
              </MenuItem>
              {funds.map((fund) => (
                <MenuItem key={fund.id} value={fund.id}>
                  {fund.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Broker Dropdown */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Broker</InputLabel>
            <Select
              value={localFilters.brokerId || ''}
              onChange={handleBrokerChange}
              label="Broker"
              disabled={loading}
            >
              <MenuItem value="">
                <em>All Brokers</em>
              </MenuItem>
              {brokers.map((broker) => (
                <MenuItem key={broker.id} value={broker.id}>
                  {broker.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Apply Button */}
        <Grid item xs={12} sm={12} md={2}>
          <Button
            variant="contained"
            onClick={handleApply}
            disabled={loading || !localFilters.startDate || !localFilters.endDate}
            fullWidth
            sx={FinanceFiltersStyles.applyButton}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              'Apply Filters'
            )}
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default FinanceFilters
