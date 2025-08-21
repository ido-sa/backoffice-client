import { useQuery } from '@tanstack/react-query'
import { TransactionAlert } from '@/types/alerts'
import { ClientTransactionRow, BrokerTransactionRow, TransactionFilters } from '@/types/transactions'
import { PaginatedResponse } from '@/types/common'
import { API_ENDPOINTS, DEFAULT_PAGE_SIZE, DEFAULT_TABLE_PAGE_SIZE } from '@/constants/api'
import MockClient from '@/services/mocks/mockClient'

const mockClient = new MockClient()

// Hook for fetching transaction alerts
export function useTransactionsAlerts() {
  return useQuery({
    queryKey: ['transactions-alerts'],
    queryFn: () => mockClient.getTransactionAlerts({
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Hook for fetching transactions data
export function useTransactionsData(filters: TransactionFilters) {
  return useQuery({
    queryKey: ['transactions-data', filters],
    queryFn: async () => {
      const [clientTransactions, brokerTransactions] = await Promise.all([
        mockClient.getClientTransactions({
          ...filters,
          page: 1,
          pageSize: DEFAULT_TABLE_PAGE_SIZE,
          sort: 'tradeDate:asc',
        }),
        mockClient.getBrokerTransactions({
          ...filters,
          page: 1,
          pageSize: DEFAULT_TABLE_PAGE_SIZE,
          sort: 'date:asc',
        }),
      ])

      return {
        clientTransactions: clientTransactions.items,
        brokerTransactions: brokerTransactions.items,
        clientTotal: clientTransactions.total,
        brokerTotal: brokerTransactions.total,
      }
    },
    enabled: !!filters.from && !!filters.to, // Only fetch when from and to dates are provided
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}
