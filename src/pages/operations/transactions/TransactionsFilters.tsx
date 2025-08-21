import React from 'react'
import {
  Box,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { useQuery } from '@tanstack/react-query'
import { TransactionFilters } from '@/types/transactions'
import MockClient from '@/services/mocks/mockClient'

const mockClient = new MockClient()

interface TransactionsFiltersProps {
  filters: TransactionFilters
  onApply: (filters: TransactionFilters) => void
  loading?: boolean
}

const TransactionsFilters: React.FC<TransactionsFiltersProps> = ({
  filters,
  onApply,
  loading = false,
}) => {
  // Fetch broker options
  const brokersQuery = useQuery({
    queryKey: ['brokers'],
    queryFn: () => mockClient.getBrokers({}),
  })

  const handleApply = () => {
    onApply(filters)
  }

  return (
    <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <DatePicker
            label="From"
            value={filters.from ? new Date(filters.from) : null}
            onChange={(date) => {
              const newFilters = { ...filters }
              if (date) {
                newFilters.from = date.toISOString().split('T')[0]
              } else {
                delete newFilters.from
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

        <Grid item xs={12} sm={6} md={3}>
          <DatePicker
            label="To"
            value={filters.to ? new Date(filters.to) : null}
            onChange={(date) => {
              const newFilters = { ...filters }
              if (date) {
                newFilters.to = date.toISOString().split('T')[0]
              } else {
                delete newFilters.to
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

        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Broker</InputLabel>
            <Select
              value={filters.broker || ''}
              onChange={(e) => {
                const newFilters = { ...filters, broker: e.target.value || undefined }
                onApply(newFilters)
              }}
              label="Broker"
            >
              <MenuItem value="">All</MenuItem>
              {brokersQuery.data?.items.map((broker) => (
                <MenuItem key={broker.id} value={broker.id}>
                  {broker.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
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

export default TransactionsFilters
