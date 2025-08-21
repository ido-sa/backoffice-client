import { ReconciledStatus, Mode } from './common'

export interface ClientTransactionRow {
  id: string
  reconciled: ReconciledStatus
  tradeDate: string
  fund: string
  account: string
  type: string
  contract: string
  marketType: string
  commission: string
  cPeriod: string
  currency: string
  value: number
  usdValue: number
  lots: number
  from: string
  to: string
  grace: number
  toPlusGrace: string
  info: string
  mode: Mode
  matchedIds: string[]
}

export interface BrokerTransactionRow {
  id: string
  reconciled: ReconciledStatus
  date: string
  fund: string
  account: string
  type: string
  contract: string
  currency: string
  value: number
  usdValue: number
  lots: number
  info: string
  mode: Mode
  file?: string
  matchedIds: string[]
}

export interface TransactionFilters {
  from: string
  to: string
  broker?: string
}

export interface TransactionAlert {
  id: string
  date: string
  brokerId: string
  brokerName: string
}
