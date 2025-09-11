import { useQuery } from '@tanstack/react-query'
import { FinanceFilters } from '@/types/finance'
import MockClient from '@/services/mocks/mockClient'

const mockClient = new MockClient()

// Hook for fetching cash flow summary data
export function useCashFlowSummary(filters: FinanceFilters) {
  return useQuery({
    queryKey: ['cashflow-summary', filters],
    queryFn: () => mockClient.getCashFlowSummary(filters),
    enabled: !!(filters.startDate && filters.endDate),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Hook for fetching cash flow breakdown data
export function useCashFlowBreakdown(filters: FinanceFilters) {
  return useQuery({
    queryKey: ['cashflow-breakdown', filters],
    queryFn: () => mockClient.getCashFlowBreakdown(filters),
    enabled: !!(filters.startDate && filters.endDate),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Combined hook for both summary and breakdown data
export function useCashFlowData(filters: FinanceFilters) {
  const summaryQuery = useCashFlowSummary(filters)
  const breakdownQuery = useCashFlowBreakdown(filters)

  return {
    summaryQuery,
    breakdownQuery,
  }
}
