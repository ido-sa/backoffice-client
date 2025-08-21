export const API_ENDPOINTS = {
  // Alerts
  ALERTS_FILLS: '/api/alerts/fills',
  ALERTS_TRANSACTIONS: '/api/alerts/transactions',
  
  // Filters metadata
  META_BROKERS: '/api/meta/brokers',
  META_ACCOUNTS: '/api/meta/accounts',
  META_INSTRUMENTS: '/api/meta/instruments',
  META_EXPIRATIONS: '/api/meta/expirations',
  META_STRIKES: '/api/meta/strikes',
  
  // Fills data
  FILLS_CLIENT: '/api/fills/client',
  FILLS_BROKER: '/api/fills/broker',
  
  // Transactions data
  TRANSACTIONS_CLIENT: '/api/transactions/client',
  TRANSACTIONS_BROKER: '/api/transactions/broker',
  
  // Optional reconciliation endpoints
  RECONCILIATION_MANUAL: '/api/reconciliation/manual',
  RECONCILIATION_GROUPS: '/api/reconciliation/groups',
} as const

export const DEFAULT_PAGE_SIZE = 50
export const DEFAULT_TABLE_PAGE_SIZE = 100
