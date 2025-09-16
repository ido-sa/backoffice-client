import ApiClient from './client'
import { API_ENDPOINTS } from '@/constants/api'
import { PaginatedResponse } from '@/types/common'
import { 
  FillRow, 
  FillFilters, 
  FillAlert, 
  FillMatchRequest, 
  FillMatchResponse,
  FillAddRequest,
  FillRemoveRequest,
  FillRestoreRequest,
  FillCopyRequest,
  FillActionResponse
} from '@/types/fills'

class FillsApiClient extends ApiClient {
  async getFillAlerts(params: { page: number; pageSize: number }): Promise<PaginatedResponse<FillAlert>> {
    return this.get<PaginatedResponse<FillAlert>>(API_ENDPOINTS.ALERTS_FILLS, params)
  }

  async getClientFills(params: FillFilters & { page?: number; pageSize?: number; sort?: string }): Promise<PaginatedResponse<FillRow>> {
    return this.get<PaginatedResponse<FillRow>>(API_ENDPOINTS.FILLS_CLIENT, params)
  }

  async getBrokerFills(params: FillFilters & { page?: number; pageSize?: number; sort?: string }): Promise<PaginatedResponse<FillRow>> {
    return this.get<PaginatedResponse<FillRow>>(API_ENDPOINTS.FILLS_BROKER, params)
  }

  async matchFills(request: FillMatchRequest): Promise<FillMatchResponse> {
    return this.post<FillMatchResponse>(API_ENDPOINTS.FILLS_MATCH, request)
  }

  async unmatchFills(request: FillMatchRequest): Promise<FillMatchResponse> {
    return this.post<FillMatchResponse>(API_ENDPOINTS.FILLS_UNMATCH, request)
  }

  // Fill action methods
  async addFills(request: FillAddRequest): Promise<FillActionResponse> {
    return this.post<FillActionResponse>(API_ENDPOINTS.FILLS_ADD, request)
  }

  async removeFills(request: FillRemoveRequest): Promise<FillActionResponse> {
    return this.post<FillActionResponse>(API_ENDPOINTS.FILLS_REMOVE, request)
  }

  async restoreFills(request: FillRestoreRequest): Promise<FillActionResponse> {
    return this.post<FillActionResponse>(API_ENDPOINTS.FILLS_RESTORE, request)
  }

  async copyFills(request: FillCopyRequest): Promise<FillActionResponse> {
    return this.post<FillActionResponse>(API_ENDPOINTS.FILLS_COPY, request)
  }

  // Fill metadata methods
  async getFinalNames(instrumentId: string): Promise<string[]> {
    return this.get<string[]>(API_ENDPOINTS.FILLS_FINAL_NAMES, { instrumentId })
  }
}

export default new FillsApiClient()
