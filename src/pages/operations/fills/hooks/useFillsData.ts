import { useQuery } from '@tanstack/react-query'
import { FillAlert } from '@/types/alerts'
import { FillRow, FillFilters } from '@/types/fills'
import { PaginatedResponse } from '@/types/common'
import { API_ENDPOINTS, DEFAULT_PAGE_SIZE, DEFAULT_TABLE_PAGE_SIZE } from '@/constants/api'
import MockClient from '@/services/mocks/mockClient'

const mockClient = new MockClient()

// Hook for fetching fills alerts
export function useFillsAlerts() {
  return useQuery({
    queryKey: ['fills-alerts'],
    queryFn: () => mockClient.getFillAlerts({
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Hook for fetching fills data
export function useFillsData(filters: FillFilters) {
  return useQuery({
    queryKey: ['fills-data', filters],
    queryFn: async () => {
      const [clientFills, brokerFills] = await Promise.all([
        mockClient.getClientFills({
          ...filters,
          page: 1,
          pageSize: DEFAULT_TABLE_PAGE_SIZE,
          sort: 'time:asc',
        }),
        mockClient.getBrokerFills({
          ...filters,
          page: 1,
          pageSize: DEFAULT_TABLE_PAGE_SIZE,
          sort: 'time:asc',
        }),
      ])

      return {
        clientFills: clientFills.items,
        brokerFills: brokerFills.items,
        clientTotal: clientFills.total,
        brokerTotal: brokerFills.total,
      }
    },
    enabled: !!filters.date, // Only fetch when date is provided
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}
