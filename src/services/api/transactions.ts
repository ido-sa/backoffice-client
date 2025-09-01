import ApiClient from './client'
import { API_ENDPOINTS } from '@/constants/api'
import { PaginatedResponse } from '@/types/common'
import { 
  ClientTransactionRow, 
  BrokerTransactionRow, 
  TransactionFilters, 
  TransactionAlert,
  TransactionMatchRequest,
  TransactionMatchResponse
} from '@/types/transactions'

class TransactionsApiClient extends ApiClient {
  async getTransactionAlerts(params: any): Promise<PaginatedResponse<TransactionAlert>> {
    return this.get<PaginatedResponse<TransactionAlert>>(API_ENDPOINTS.ALERTS_TRANSACTIONS, params)
  }

  async getClientTransactions(params: TransactionFilters & { page?: number; pageSize?: number; sort?: string }): Promise<PaginatedResponse<ClientTransactionRow>> {
    return this.get<PaginatedResponse<ClientTransactionRow>>(API_ENDPOINTS.TRANSACTIONS_CLIENT, params)
  }

  async getBrokerTransactions(params: TransactionFilters & { page?: number; pageSize?: number; sort?: string }): Promise<PaginatedResponse<BrokerTransactionRow>> {
    return this.get<PaginatedResponse<BrokerTransactionRow>>(API_ENDPOINTS.TRANSACTIONS_BROKER, params)
  }

  async matchTransactions(request: TransactionMatchRequest): Promise<TransactionMatchResponse> {
    return this.post<TransactionMatchResponse>(API_ENDPOINTS.TRANSACTIONS_MATCH, request)
  }

  async unmatchTransactions(request: TransactionMatchRequest): Promise<TransactionMatchResponse> {
    return this.post<TransactionMatchResponse>(API_ENDPOINTS.TRANSACTIONS_UNMATCH, request)
  }
}

export default new TransactionsApiClient()
