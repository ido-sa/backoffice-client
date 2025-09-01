import ApiClient from './client'
import { API_ENDPOINTS } from '@/constants/api'
import { PaginatedResponse } from '@/types/common'
import { FillRow, FillFilters, FillAlert, FillMatchRequest, FillMatchResponse } from '@/types/fills'

class FillsApiClient extends ApiClient {
  async getFillAlerts(params: any): Promise<PaginatedResponse<FillAlert>> {
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
}

export default new FillsApiClient()
