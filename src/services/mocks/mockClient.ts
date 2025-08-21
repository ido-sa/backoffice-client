import { PaginatedResponse, FilterOption } from '@/types/common'
import { FillAlert, TransactionAlert } from '@/types/alerts'
import { FillRow, FillFilters } from '@/types/fills'
import { ClientTransactionRow, BrokerTransactionRow, TransactionFilters } from '@/types/transactions'
import { API_ENDPOINTS } from '@/constants/api'

// Mock data generators
const generateMockId = (prefix: string) => `${prefix}_${Math.random().toString(36).substr(2, 9)}`

const mockBrokers: FilterOption[] = [
  { id: 'b1', name: 'Broker A' },
  { id: 'b2', name: 'Broker B' },
  { id: 'b3', name: 'Broker C' },
]

const mockAccounts: FilterOption[] = [
  { id: 'acc1', name: 'ACC-1' },
  { id: 'acc2', name: 'ACC-2' },
  { id: 'acc3', name: 'ACC-3' },
]

const mockInstruments: FilterOption[] = [
  { id: 'inst1', name: 'ES' },
  { id: 'inst2', name: 'NQ' },
  { id: 'inst3', name: 'YM' },
]

const mockExpirations: FilterOption[] = [
  { id: 'exp1', name: 'JUN25' },
  { id: 'exp2', name: 'SEP25' },
  { id: 'exp3', name: 'DEC25' },
]

const mockStrikes: FilterOption[] = [
  { id: 'strike1', name: '4500' },
  { id: 'strike2', name: '4600' },
  { id: 'strike3', name: '4700' },
]

class MockClient {
  private delay(ms: number = 300) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // Alerts
  async getFillAlerts(params: any): Promise<PaginatedResponse<FillAlert>> {
    await this.delay()
    
    const items: FillAlert[] = Array.from({ length: 10 }, (_, i) => ({
      id: generateMockId('fa'),
      date: '2025-05-12',
      brokerId: mockBrokers[i % mockBrokers.length].id,
      brokerName: mockBrokers[i % mockBrokers.length].name,
      contractId: generateMockId('contract'),
      contractName: `ES JUN25 ${4500 + i * 100}`,
    }))

    return {
      items,
      page: params.page || 1,
      pageSize: params.pageSize || 50,
      total: 120,
    }
  }

  async getTransactionAlerts(params: any): Promise<PaginatedResponse<TransactionAlert>> {
    await this.delay()
    
    const items: TransactionAlert[] = Array.from({ length: 8 }, (_, i) => ({
      id: generateMockId('ta'),
      date: '2025-05-12',
      brokerId: mockBrokers[i % mockBrokers.length].id,
      brokerName: mockBrokers[i % mockBrokers.length].name,
    }))

    return {
      items,
      page: params.page || 1,
      pageSize: params.pageSize || 50,
      total: 80,
    }
  }

  // Meta endpoints
  async getBrokers(params: any): Promise<PaginatedResponse<FilterOption>> {
    await this.delay()
    
    const filtered = mockBrokers.filter(broker => 
      !params.q || broker.name.toLowerCase().includes(params.q.toLowerCase())
    )

    return {
      items: filtered,
      page: params.page || 1,
      pageSize: params.pageSize || 50,
      total: filtered.length,
    }
  }

  async getAccounts(params: any): Promise<PaginatedResponse<FilterOption>> {
    await this.delay()
    
    const filtered = mockAccounts.filter(account => 
      !params.q || account.name.toLowerCase().includes(params.q.toLowerCase())
    )

    return {
      items: filtered,
      page: params.page || 1,
      pageSize: params.pageSize || 50,
      total: filtered.length,
    }
  }

  async getInstruments(params: any): Promise<PaginatedResponse<FilterOption>> {
    await this.delay()
    
    const filtered = mockInstruments.filter(instrument => 
      !params.q || instrument.name.toLowerCase().includes(params.q.toLowerCase())
    )

    return {
      items: filtered,
      page: params.page || 1,
      pageSize: params.pageSize || 50,
      total: filtered.length,
    }
  }

  async getExpirations(params: any): Promise<PaginatedResponse<FilterOption>> {
    await this.delay()
    
    return {
      items: mockExpirations,
      page: params.page || 1,
      pageSize: params.pageSize || 50,
      total: mockExpirations.length,
    }
  }

  async getStrikes(params: any): Promise<PaginatedResponse<FilterOption>> {
    await this.delay()
    
    return {
      items: mockStrikes,
      page: params.page || 1,
      pageSize: params.pageSize || 50,
      total: mockStrikes.length,
    }
  }

  // Fills data
  async getClientFills(params: any): Promise<PaginatedResponse<FillRow>> {
    await this.delay()
    
    const items: FillRow[] = Array.from({ length: 20 }, (_, i) => ({
      id: generateMockId('cf'),
      reconciled: ['Auto', 'Manual', 'No'][i % 3] as any,
      side: i % 2 === 0 ? 'Buy' : 'Sell',
      lots: Math.floor(Math.random() * 10) + 1,
      price: 4275.25 + (i * 0.25),
      mode: i % 2 === 0 ? 'A' : 'M',
      finalName: `Fund ${String.fromCharCode(65 + (i % 5))}`,
      time: `14:${String(i % 60).padStart(2, '0')}:${String(i % 60).padStart(2, '0')}`,
      excRef: `X${10000 + i}`,
      matchedIds: [generateMockId('bf'), generateMockId('bf')],
    }))

    return {
      items,
      page: params.page || 1,
      pageSize: params.pageSize || 100,
      total: 200,
    }
  }

  async getBrokerFills(params: any): Promise<PaginatedResponse<FillRow>> {
    await this.delay()
    
    const items: FillRow[] = Array.from({ length: 18 }, (_, i) => ({
      id: generateMockId('bf'),
      reconciled: ['Auto', 'Manual', 'No'][i % 3] as any,
      side: i % 2 === 0 ? 'Buy' : 'Sell',
      lots: Math.floor(Math.random() * 10) + 1,
      price: 4275.25 + (i * 0.25),
      mode: i % 2 === 0 ? 'A' : 'M',
      finalName: `Fund ${String.fromCharCode(65 + (i % 5))}`,
      time: `14:${String(i % 60).padStart(2, '0')}:${String(i % 60).padStart(2, '0')}`,
      excRef: `X${10000 + i}`,
      file: `/files/fills/2025-05-12/bf_${i}.csv`,
      matchedIds: [generateMockId('cf'), generateMockId('cf')],
    }))

    return {
      items,
      page: params.page || 1,
      pageSize: params.pageSize || 100,
      total: 180,
    }
  }

  // Transactions data
  async getClientTransactions(params: any): Promise<PaginatedResponse<ClientTransactionRow>> {
    await this.delay()
    
    const items: ClientTransactionRow[] = Array.from({ length: 15 }, (_, i) => ({
      id: generateMockId('ct'),
      reconciled: ['Auto', 'Manual', 'No'][i % 3] as any,
      tradeDate: '2025-05-12',
      fund: `Fund ${String.fromCharCode(65 + (i % 5))}`,
      account: `ACC-${(i % 3) + 1}`,
      type: ['Interest', 'Commission', 'Fee'][i % 3],
      contract: `ES JUN25 ${4500 + i * 100}`,
      marketType: 'Futures',
      commission: (1.25 + i * 0.1).toFixed(2),
      cPeriod: '2025-05',
      currency: ['EUR', 'USD'][i % 2],
      value: 1000.50 + i * 50,
      usdValue: 1080.54 + i * 54,
      lots: Math.floor(Math.random() * 5) + 1,
      from: '2025-05-10',
      to: '2025-05-12',
      grace: 2,
      toPlusGrace: '2025-05-14',
      info: `Note ${i + 1}`,
      mode: i % 2 === 0 ? 'A' : 'M',
      matchedIds: [generateMockId('bt')],
    }))

    return {
      items,
      page: params.page || 1,
      pageSize: params.pageSize || 100,
      total: 150,
    }
  }

  async getBrokerTransactions(params: any): Promise<PaginatedResponse<BrokerTransactionRow>> {
    await this.delay()
    
    const items: BrokerTransactionRow[] = Array.from({ length: 12 }, (_, i) => ({
      id: generateMockId('bt'),
      reconciled: ['Auto', 'Manual', 'No'][i % 3] as any,
      date: '2025-05-12',
      fund: `Fund ${String.fromCharCode(65 + (i % 5))}`,
      account: `ACC-${(i % 3) + 1}`,
      type: ['Interest', 'Commission', 'Fee'][i % 3],
      contract: `ES JUN25 ${4500 + i * 100}`,
      currency: ['EUR', 'USD'][i % 2],
      value: 1000.50 + i * 50,
      usdValue: 1080.54 + i * 54,
      lots: Math.floor(Math.random() * 5) + 1,
      info: `Broker note ${i + 1}`,
      mode: i % 2 === 0 ? 'A' : 'M',
      file: `/files/broker/2025-05-12/bt_${i}.csv`,
      matchedIds: [generateMockId('ct')],
    }))

    return {
      items,
      page: params.page || 1,
      pageSize: params.pageSize || 100,
      total: 120,
    }
  }
}

export default MockClient
