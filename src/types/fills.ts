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

export interface FillMatchRequest {
  clientFillIds: string[]
  brokerFillIds: string[]
}

export interface FillMatchResponse {
  success: boolean
  message: string
  error: string | null
}

// Fill action request types
export interface FillActionRequest {
  fillIds: string[]
}

export interface FillActionResponse {
  success: boolean
  message: string
  error: string | null
}

// Specific action types
export interface FillAddRequest {
  // For Add, we need all table columns and filter values to create new fills
  side: 'client' | 'broker'
  lots: number
  price: number
  mode: Mode
  finalName: string
  time: string
  excRef: string
  file?: string
  // Include filter values for context
  date: string
  account?: string
  instrument?: string
  expiration?: string
  strike?: string
}

export interface FillRemoveRequest extends FillActionRequest {}
export interface FillRestoreRequest extends FillActionRequest {}
export interface FillCopyRequest extends FillActionRequest {
  targetSide: 'client' | 'broker'
}
