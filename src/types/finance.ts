import { FilterOption } from './common'

// Finance Summary Types
export interface FinanceSummary {
  balanceAtStart: number
  balanceAtEnd: number
  netReceivablesAtStart: number
  netReceivablesAtEnd: number
  withdrawals: number
  netProfitLoss: number
  financingProfitLoss: number
  totalProfitLoss: number
}

// Finance Breakdown Types
export interface CurrencyValues {
  [currency: string]: number
}

export interface ExpectedArrivedData {
  usd: number
  currencies: CurrencyValues
}

export interface TypeData {
  type: string
  expected?: ExpectedArrivedData
  arrived?: ExpectedArrivedData
}

export interface FundData {
  fund: string
  types: TypeData[]
}

export interface BrokerData {
  broker: string
  funds: FundData[]
}

export interface FinanceBreakdown {
  summary: FinanceSummary
  breakdown: BrokerData[]
}

// Finance Filters
export interface FinanceFilters {
  startDate?: string
  endDate?: string
  fundId?: string
  brokerId?: string
}

// Finance API Response Types
export interface FinanceSummaryResponse {
  summary: FinanceSummary
}

export interface FinanceBreakdownResponse {
  breakdown: BrokerData[]
}

// Fund and Broker filter options (reusing existing FilterOption type)
export type FundOption = FilterOption
export type BrokerOption = FilterOption
