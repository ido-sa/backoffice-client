export const ROUTES = {
  // Top-level tabs
  DASHBOARD: '/dashboard',
  OPERATIONS: '/operations',
  REPORTS: '/reports',
  FINANCE: '/finance',
  SETTINGS: '/settings',
  
  // Operations second-level tabs
  OPERATIONS_OVERVIEW: '/operations/overview',
  OPERATIONS_FILLS: '/operations/fills',
  OPERATIONS_TRANSACTIONS: '/operations/transactions',
  
  // Finance second-level tabs
  FINANCE_PROFIT_LOSS: '/finance/profit-loss',
  FINANCE_CASH_FLOW: '/finance/cash-flow',
  FINANCE_BALANCE_SHEET: '/finance/balance-sheet',
} as const

export type RouteKey = keyof typeof ROUTES
