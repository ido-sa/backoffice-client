import { ApiError } from '@/types/common'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
  headers?: Record<string, string>
}

class ApiClient {
  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body, headers = {} } = options

    const config: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    }

    if (body) {
      config.body = JSON.stringify(body)
    }

    const url = `${API_BASE_URL}${endpoint}`
    
    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData: ApiError = await response.json().catch(() => ({
          message: `HTTP ${response.status}: ${response.statusText}`,
        }))
        
        throw new Error(errorData.message || `HTTP ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Network error')
    }
  }

  protected get<T>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<T> {
    const url = params ? this.buildUrl(endpoint, params) : endpoint
    return this.request<T>(url)
  }

  protected post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body: data })
  }

  private buildUrl(endpoint: string, params: Record<string, string | number | boolean>): string {
    const url = new URL(endpoint, window.location.origin)
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, String(value))
      }
    })
    
    return url.pathname + url.search
  }
}

export default ApiClient
