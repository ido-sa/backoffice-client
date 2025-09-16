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
  
  // Reconciliation actions
  FILLS_MATCH: '/api/fills/match',
  FILLS_UNMATCH: '/api/fills/unmatch',
  TRANSACTIONS_MATCH: '/api/transactions/match',
  TRANSACTIONS_UNMATCH: '/api/transactions/unmatch',
  
  // Fill actions
  FILLS_ADD: '/api/fills/add',
  FILLS_REMOVE: '/api/fills/remove',
  FILLS_RESTORE: '/api/fills/restore',
  FILLS_COPY: '/api/fills/copy',
  
  // Fill metadata
  FILLS_FINAL_NAMES: '/api/fills/final-names',
  
  // Optional reconciliation endpoints
  RECONCILIATION_MANUAL: '/api/reconciliation/manual',
  RECONCILIATION_GROUPS: '/api/reconciliation/groups',
  
  // Finance endpoints
  FINANCE_FUNDS: '/api/funds',
  FINANCE_BROKERS: '/api/brokers',
  FINANCE_PNL_SUMMARY: '/api/finance/pnl_summary',
  FINANCE_PNL: '/api/finance/pnl',
} as const

export const DEFAULT_PAGE_SIZE = 50
export const DEFAULT_TABLE_PAGE_SIZE = 100
