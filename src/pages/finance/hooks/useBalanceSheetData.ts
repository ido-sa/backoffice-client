import { useQuery } from '@tanstack/react-query'
import { FinanceFilters } from '@/types/finance'
import MockClient from '@/services/mocks/mockClient'

const mockClient = new MockClient()

// Hook for fetching balance sheet summary data
export function useBalanceSheetSummary(filters: FinanceFilters) {
  return useQuery({
    queryKey: ['balance-sheet-summary', filters],
    queryFn: () => mockClient.getBalanceSheetSummary(filters),
    enabled: !!(filters.startDate && filters.endDate),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Hook for fetching balance sheet breakdown data
export function useBalanceSheetBreakdown(filters: FinanceFilters) {
  return useQuery({
    queryKey: ['balance-sheet-breakdown', filters],
    queryFn: () => mockClient.getBalanceSheetBreakdown(filters),
    enabled: !!(filters.startDate && filters.endDate),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Combined hook for both summary and breakdown data
export function useBalanceSheetData(filters: FinanceFilters) {
  const summaryQuery = useBalanceSheetSummary(filters)
  const breakdownQuery = useBalanceSheetBreakdown(filters)

  return {
    summaryQuery,
    breakdownQuery,
  }
}
