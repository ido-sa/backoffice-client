import { ReconciledStatus, Side, Mode } from './common'

export interface FillRow {
  id: string
  reconciled: ReconciledStatus
  side: Side
  lots: number
  price: number
  mode: Mode
  finalName: string
  time: string // HH:mm:ss format
  excRef: string
  file?: string
  matchedIds: string[]
}

export interface FillFilters {
  date: string
  account?: string
  instrument?: string
  expiration?: string
  strike?: string
}

export interface FillAlert {
  id: string
  date: string
  brokerId: string
  brokerName: string
  contractId: string
  contractName: string
}
