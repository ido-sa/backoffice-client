export interface PaginatedResponse<T> {
  items: T[]
  page: number
  pageSize: number
  total: number
}

export interface ApiError {
  message: string
  code?: string
  requestId?: string
}

export interface FilterOption {
  id: string
  name: string
}

export interface ColumnDefinition<T> {
  id: keyof T
  header: string
  accessorKey: keyof T
  sortable?: boolean
  filterable?: boolean
  width?: number
  render?: (value: any, row: T) => React.ReactNode
}

export interface FilterDefinition {
  name: string
  label: string
  type: 'date' | 'dropdown' | 'text' | 'number'
  required?: boolean
  dependentOn?: string
  options?: FilterOption[]
  asyncOptions?: (query?: string) => Promise<FilterOption[]>
}

export type ReconciledStatus = 'Auto' | 'Manual' | 'No'
export type Side = 'Buy' | 'Sell'
export type Mode = 'A' | 'M'
