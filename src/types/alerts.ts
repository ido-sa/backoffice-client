export interface FillAlert {
  id: string
  date: string
  brokerId: string
  brokerName: string
  contractId: string
  contractName: string
}

export interface TransactionAlert {
  id: string
  date: string
  brokerId: string
  brokerName: string
}

export type Alert = FillAlert | TransactionAlert
