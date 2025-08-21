import React from 'react'
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
    queryKey: ['expirations', filters.instrument],
    queryFn: () => mockClient.getExpirations({}),
    enabled: !!filters.instrument,
  })

  const strikesQuery = useQuery({
    queryKey: ['strikes', filters.instrument, filters.expiration],
    queryFn: () => mockClient.getStrikes({}),
    enabled: !!filters.instrument && !!filters.expiration,
  })

  const handleApply = () => {
    onApply(filters)
  }

  return (
    <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={2}>
          <DatePicker
            label="Date"
            value={filters.date ? new Date(filters.date) : null}
            onChange={(date) => {
              const newFilters = { ...filters }
              if (date) {
                newFilters.date = date.toISOString().split('T')[0]
              } else {
                delete newFilters.date
              }
              onApply(newFilters)
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
              value={filters.account || ''}
              onChange={(e) => {
                const newFilters = { ...filters, account: e.target.value || undefined }
                onApply(newFilters)
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
              value={filters.instrument || ''}
              onChange={(e) => {
                const newFilters = { 
                  ...filters, 
                  instrument: e.target.value || undefined,
                  expiration: undefined,
                  strike: undefined,
                }
                onApply(newFilters)
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
              value={filters.expiration || ''}
              onChange={(e) => {
                const newFilters = { 
                  ...filters, 
                  expiration: e.target.value || undefined,
                  strike: undefined,
                }
                onApply(newFilters)
              }}
              label="Expiration"
              disabled={!filters.instrument}
            >
              <MenuItem value="">All</MenuItem>
              {expirationsQuery.data?.items.map((expiration) => (
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
              value={filters.strike || ''}
              onChange={(e) => {
                const newFilters = { ...filters, strike: e.target.value || undefined }
                onApply(newFilters)
              }}
              label="Strike"
              disabled={!filters.instrument || !filters.expiration}
            >
              <MenuItem value="">All</MenuItem>
              {strikesQuery.data?.items.map((strike) => (
                <MenuItem key={strike.id} value={strike.id}>
                  {strike.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Button
            variant="contained"
            onClick={handleApply}
            disabled={loading}
            fullWidth
            sx={{ height: 40 }}
          >
            {loading ? <CircularProgress size={20} /> : 'Apply Filters'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default FillsFilters
