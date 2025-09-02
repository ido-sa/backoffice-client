import React, { useState, useEffect } from 'react'
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material'
import {
  StyledFiltersContainer,
  StyledApplyButton,
} from './FillsFilters.styles'
import { DatePicker } from '@mui/x-date-pickers'
import { useQuery } from '@tanstack/react-query'
import { FillFilters } from '@/types/fills'
import MockClient from '@/services/mocks/mockClient'

const mockClient = new MockClient()

interface FillsFiltersProps {
  filters: FillFilters
  onApply: (filters: FillFilters) => void
  loading?: boolean
}

const FillsFilters: React.FC<FillsFiltersProps> = ({
  filters,
  onApply,
  loading = false,
}) => {
  // Local state for filter changes
  const [localFilters, setLocalFilters] = useState<FillFilters>(filters)

  // Update local filters when props change (e.g., from alert click)
  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  // Fetch filter options
  const accountsQuery = useQuery({
    queryKey: ['accounts'],
    queryFn: () => mockClient.getAccounts({}),
  })

  const instrumentsQuery = useQuery({
    queryKey: ['instruments'],
    queryFn: () => mockClient.getInstruments({}),
  })

  const expirationsQuery = useQuery({
    queryKey: ['expirations', localFilters.instrument],
    queryFn: () => mockClient.getExpirations({}),
    enabled: !!localFilters.instrument,
  })

  const strikesQuery = useQuery({
    queryKey: ['strikes', localFilters.instrument, localFilters.expiration],
    queryFn: () => mockClient.getStrikes({}),
    enabled: !!localFilters.instrument && !!localFilters.expiration,
  })

  const handleApply = () => {
    onApply(localFilters)
  }

  return (
    <StyledFiltersContainer>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={2}>
          <DatePicker
            label="Date"
            value={localFilters.date ? new Date(localFilters.date) : null}
            onChange={(date) => {
              const newFilters = { ...localFilters }
              if (date) {
                newFilters.date = date.toISOString().split('T')[0]
              } else {
                newFilters.date = new Date().toISOString().split('T')[0]
              }
              setLocalFilters(newFilters)
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                size: 'small',
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Account</InputLabel>
            <Select
              value={localFilters.account || ''}
              onChange={(e) => {
                const newFilters = { ...localFilters, account: e.target.value || undefined }
                setLocalFilters(newFilters)
              }}
              label="Account"
            >
              <MenuItem value="">All</MenuItem>
              {accountsQuery.data?.items.map((account) => (
                <MenuItem key={account.id} value={account.id}>
                  {account.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Instrument</InputLabel>
            <Select
              value={localFilters.instrument || ''}
              onChange={(e) => {
                const newFilters = { 
                  ...localFilters, 
                  instrument: e.target.value || undefined,
                  expiration: undefined,
                  strike: undefined,
                }
                setLocalFilters(newFilters)
              }}
              label="Instrument"
            >
              <MenuItem value="">All</MenuItem>
              {instrumentsQuery.data?.items.map((instrument) => (
                <MenuItem key={instrument.id} value={instrument.id}>
                  {instrument.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Expiration</InputLabel>
            <Select
              value={localFilters.expiration && expirationsQuery.data?.items?.some(exp => exp.id === localFilters.expiration) 
                ? localFilters.expiration 
                : ''}
              onChange={(e) => {
                const newFilters = { 
                  ...localFilters, 
                  expiration: e.target.value || undefined,
                  strike: undefined,
                }
                setLocalFilters(newFilters)
              }}
              label="Expiration"
              disabled={!localFilters.instrument}
            >
              <MenuItem value="">All</MenuItem>
              {expirationsQuery.data?.items?.map((expiration) => (
                <MenuItem key={expiration.id} value={expiration.id}>
                  {expiration.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Strike</InputLabel>
            <Select
              value={localFilters.strike && strikesQuery.data?.items?.some(str => str.id === localFilters.strike) 
                ? localFilters.strike 
                : ''}
              onChange={(e) => {
                const newFilters = { ...localFilters, strike: e.target.value || undefined }
                setLocalFilters(newFilters)
              }}
              label="Strike"
              disabled={!localFilters.instrument || !localFilters.expiration}
            >
              <MenuItem value="">All</MenuItem>
              {strikesQuery.data?.items?.map((strike) => (
                <MenuItem key={strike.id} value={strike.id}>
                  {strike.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <StyledApplyButton
            variant="contained"
            onClick={handleApply}
            disabled={loading}
            fullWidth
          >
            {loading ? <CircularProgress size={20} /> : 'Apply Filters'}
          </StyledApplyButton>
        </Grid>
      </Grid>
    </StyledFiltersContainer>
  )
}

export default FillsFilters
