import { useQuery } from '@tanstack/react-query'
import { FinanceFilters, FinanceSummaryResponse, FinanceBreakdownResponse } from '@/types/finance'
import { API_ENDPOINTS } from '@/constants/api'
import MockClient from '@/services/mocks/mockClient'

const mockClient = new MockClient()

// Hook for fetching finance summary data
export function useFinanceSummary(filters: FinanceFilters) {
  return useQuery({
    queryKey: ['finance-summary', filters],
    queryFn: () => mockClient.getFinancePnlSummary(filters),
    enabled: !!(filters.startDate && filters.endDate),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Hook for fetching finance breakdown data
export function useFinanceBreakdown(filters: FinanceFilters) {
  return useQuery({
    queryKey: ['finance-breakdown', filters],
    queryFn: () => mockClient.getFinancePnl(filters),
    enabled: !!(filters.startDate && filters.endDate),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Combined hook for both summary and breakdown data
export function useFinanceData(filters: FinanceFilters) {
  const summaryQuery = useFinanceSummary(filters)
  const breakdownQuery = useFinanceBreakdown(filters)

  return {
    summaryQuery,
    breakdownQuery,
  }
}
