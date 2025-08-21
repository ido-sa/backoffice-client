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
} as const

export type RouteKey = keyof typeof ROUTES
