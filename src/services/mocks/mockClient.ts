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
    
    // Predefined client fills with actual matches
    const items: FillRow[] = [
      {
        id: 'cf_001',
        reconciled: 'Auto',
        side: 'Buy',
        lots: 5,
        price: 4275.25,
        mode: 'A',
        finalName: 'Fund A',
        time: '14:22:18',
        excRef: 'X12345',
        matchedIds: ['bf_001', 'bf_002'], // Matches with 2 broker fills
      },
      {
        id: 'cf_002',
        reconciled: 'Manual',
        side: 'Sell',
        lots: 3,
        price: 4276.50,
        mode: 'M',
        finalName: 'Fund B',
        time: '14:23:45',
        excRef: 'X12346',
        matchedIds: ['bf_003'], // Matches with 1 broker fill
      },
      {
        id: 'cf_003',
        reconciled: 'No',
        side: 'Buy',
        lots: 8,
        price: 4277.75,
        mode: 'A',
        finalName: 'Fund C',
        time: '14:25:12',
        excRef: 'X12347',
        matchedIds: [], // No matches
      },
      {
        id: 'cf_004',
        reconciled: 'Auto',
        side: 'Sell',
        lots: 2,
        price: 4278.00,
        mode: 'M',
        finalName: 'Fund A',
        time: '14:26:33',
        excRef: 'X12348',
        matchedIds: ['bf_004', 'bf_005', 'bf_006'], // Matches with 3 broker fills
      },
      {
        id: 'cf_005',
        reconciled: 'Manual',
        side: 'Buy',
        lots: 6,
        price: 4279.25,
        mode: 'A',
        finalName: 'Fund B',
        time: '14:28:07',
        excRef: 'X12349',
        matchedIds: ['bf_007'], // Matches with 1 broker fill
      },
      {
        id: 'cf_006',
        reconciled: 'No',
        side: 'Sell',
        lots: 4,
        price: 4280.50,
        mode: 'M',
        finalName: 'Fund C',
        time: '14:29:55',
        excRef: 'X12350',
        matchedIds: [], // No matches
      },
      {
        id: 'cf_007',
        reconciled: 'Auto',
        side: 'Buy',
        lots: 7,
        price: 4281.75,
        mode: 'A',
        finalName: 'Fund A',
        time: '14:31:22',
        excRef: 'X12351',
        matchedIds: ['bf_008'], // Matches with 1 broker fill
      },
      {
        id: 'cf_008',
        reconciled: 'Manual',
        side: 'Sell',
        lots: 1,
        price: 4282.00,
        mode: 'M',
        finalName: 'Fund B',
        time: '14:32:48',
        excRef: 'X12352',
        matchedIds: ['bf_009', 'bf_010'], // Matches with 2 broker fills
      },
    ]

    return {
      items,
      page: params.page || 1,
      pageSize: params.pageSize || 100,
      total: items.length,
    }
  }

  async getBrokerFills(params: any): Promise<PaginatedResponse<FillRow>> {
    await this.delay()
    
    // Predefined broker fills with actual matches
    const items: FillRow[] = [
      {
        id: 'bf_001',
        reconciled: 'Auto',
        side: 'Buy',
        lots: 3,
        price: 4275.25,
        mode: 'A',
        finalName: 'Fund A',
        time: '14:22:18',
        excRef: 'X12345',
        file: '/files/fills/2025-05-12/bf_001.csv',
        matchedIds: ['cf_001'], // Matches with client fill
      },
      {
        id: 'bf_002',
        reconciled: 'Auto',
        side: 'Buy',
        lots: 2,
        price: 4275.25,
        mode: 'A',
        finalName: 'Fund A',
        time: '14:22:19',
        excRef: 'X12345',
        file: '/files/fills/2025-05-12/bf_002.csv',
        matchedIds: ['cf_001'], // Matches with same client fill
      },
      {
        id: 'bf_003',
        reconciled: 'Manual',
        side: 'Sell',
        lots: 3,
        price: 4276.50,
        mode: 'M',
        finalName: 'Fund B',
        time: '14:23:45',
        excRef: 'X12346',
        file: '/files/fills/2025-05-12/bf_003.csv',
        matchedIds: ['cf_002'], // Matches with client fill
      },
      {
        id: 'bf_004',
        reconciled: 'Auto',
        side: 'Sell',
        lots: 1,
        price: 4278.00,
        mode: 'M',
        finalName: 'Fund A',
        time: '14:26:33',
        excRef: 'X12348',
        file: '/files/fills/2025-05-12/bf_004.csv',
        matchedIds: ['cf_004'], // Matches with client fill
      },
      {
        id: 'bf_005',
        reconciled: 'Auto',
        side: 'Sell',
        lots: 1,
        price: 4278.00,
        mode: 'M',
        finalName: 'Fund A',
        time: '14:26:34',
        excRef: 'X12348',
        file: '/files/fills/2025-05-12/bf_005.csv',
        matchedIds: ['cf_004'], // Matches with same client fill
      },
      {
        id: 'bf_006',
        reconciled: 'Auto',
        side: 'Sell',
        lots: 1,
        price: 4278.00,
        mode: 'M',
        finalName: 'Fund A',
        time: '14:26:35',
        excRef: 'X12348',
        file: '/files/fills/2025-05-12/bf_006.csv',
        matchedIds: ['cf_004'], // Matches with same client fill
      },
      {
        id: 'bf_007',
        reconciled: 'Manual',
        side: 'Buy',
        lots: 6,
        price: 4279.25,
        mode: 'A',
        finalName: 'Fund B',
        time: '14:28:07',
        excRef: 'X12349',
        file: '/files/fills/2025-05-12/bf_007.csv',
        matchedIds: ['cf_005'], // Matches with client fill
      },
      {
        id: 'bf_008',
        reconciled: 'Auto',
        side: 'Buy',
        lots: 7,
        price: 4281.75,
        mode: 'A',
        finalName: 'Fund A',
        time: '14:31:22',
        excRef: 'X12351',
        file: '/files/fills/2025-05-12/bf_008.csv',
        matchedIds: ['cf_007'], // Matches with client fill
      },
      {
        id: 'bf_009',
        reconciled: 'Manual',
        side: 'Sell',
        lots: 1,
        price: 4282.00,
        mode: 'M',
        finalName: 'Fund B',
        time: '14:32:48',
        excRef: 'X12352',
        file: '/files/fills/2025-05-12/bf_009.csv',
        matchedIds: ['cf_008'], // Matches with client fill
      },
      {
        id: 'bf_010',
        reconciled: 'Manual',
        side: 'Sell',
        lots: 1,
        price: 4282.00,
        mode: 'M',
        finalName: 'Fund B',
        time: '14:32:49',
        excRef: 'X12352',
        file: '/files/fills/2025-05-12/bf_010.csv',
        matchedIds: ['cf_008'], // Matches with same client fill
      },
      {
        id: 'bf_011',
        reconciled: 'No',
        side: 'Buy',
        lots: 4,
        price: 4283.25,
        mode: 'A',
        finalName: 'Fund C',
        time: '14:35:12',
        excRef: 'X12353',
        file: '/files/fills/2025-05-12/bf_011.csv',
        matchedIds: [], // No matches
      },
      {
        id: 'bf_012',
        reconciled: 'No',
        side: 'Sell',
        lots: 2,
        price: 4284.50,
        mode: 'M',
        finalName: 'Fund A',
        time: '14:37:45',
        excRef: 'X12354',
        file: '/files/fills/2025-05-12/bf_012.csv',
        matchedIds: [], // No matches
      },
    ]

    return {
      items,
      page: params.page || 1,
      pageSize: params.pageSize || 100,
      total: items.length,
    }
  }

  // Transactions data
  async getClientTransactions(params: any): Promise<PaginatedResponse<ClientTransactionRow>> {
    await this.delay()
    
    // Predefined client transactions with actual matches
    const items: ClientTransactionRow[] = [
      {
        id: 'ct_001',
        reconciled: 'Auto',
        tradeDate: '2025-05-12',
        fund: 'Fund A',
        account: 'ACC-1',
        type: 'Interest',
        contract: 'ES JUN25 4500',
        marketType: 'Futures',
        commission: '1.25',
        cPeriod: '2025-05',
        currency: 'EUR',
        value: 1000.50,
        usdValue: 1080.54,
        lots: 5,
        from: '2025-05-10',
        to: '2025-05-12',
        grace: 2,
        toPlusGrace: '2025-05-14',
        info: 'Note 1',
        mode: 'A',
        matchedIds: ['bt_001', 'bt_002'], // Matches with 2 broker transactions
      },
      {
        id: 'ct_002',
        reconciled: 'Manual',
        tradeDate: '2025-05-12',
        fund: 'Fund B',
        account: 'ACC-2',
        type: 'Commission',
        contract: 'ES JUN25 4600',
        marketType: 'Futures',
        commission: '1.35',
        cPeriod: '2025-05',
        currency: 'USD',
        value: 1050.50,
        usdValue: 1050.50,
        lots: 3,
        from: '2025-05-10',
        to: '2025-05-12',
        grace: 2,
        toPlusGrace: '2025-05-14',
        info: 'Note 2',
        mode: 'M',
        matchedIds: ['bt_003'], // Matches with 1 broker transaction
      },
      {
        id: 'ct_003',
        reconciled: 'No',
        tradeDate: '2025-05-12',
        fund: 'Fund C',
        account: 'ACC-3',
        type: 'Fee',
        contract: 'ES JUN25 4700',
        marketType: 'Futures',
        commission: '1.45',
        cPeriod: '2025-05',
        currency: 'EUR',
        value: 1100.50,
        usdValue: 1188.54,
        lots: 2,
        from: '2025-05-10',
        to: '2025-05-12',
        grace: 2,
        toPlusGrace: '2025-05-14',
        info: 'Note 3',
        mode: 'A',
        matchedIds: [], // No matches
      },
      {
        id: 'ct_004',
        reconciled: 'Auto',
        tradeDate: '2025-05-12',
        fund: 'Fund A',
        account: 'ACC-1',
        type: 'Interest',
        contract: 'ES JUN25 4800',
        marketType: 'Futures',
        commission: '1.55',
        cPeriod: '2025-05',
        currency: 'USD',
        value: 1150.50,
        usdValue: 1150.50,
        lots: 4,
        from: '2025-05-10',
        to: '2025-05-12',
        grace: 2,
        toPlusGrace: '2025-05-14',
        info: 'Note 4',
        mode: 'M',
        matchedIds: ['bt_004'], // Matches with 1 broker transaction
      },
    ]

    return {
      items,
      page: params.page || 1,
      pageSize: params.pageSize || 100,
      total: items.length,
    }
  }

  async getBrokerTransactions(params: any): Promise<PaginatedResponse<BrokerTransactionRow>> {
    await this.delay()
    
    // Predefined broker transactions with actual matches
    const items: BrokerTransactionRow[] = [
      {
        id: 'bt_001',
        reconciled: 'Auto',
        date: '2025-05-12',
        fund: 'Fund A',
        account: 'ACC-1',
        type: 'Interest',
        contract: 'ES JUN25 4500',
        currency: 'EUR',
        value: 500.25,
        usdValue: 540.27,
        lots: 2,
        info: 'Broker note 1',
        mode: 'A',
        file: '/files/broker/2025-05-12/bt_001.csv',
        matchedIds: ['ct_001'], // Matches with client transaction
      },
      {
        id: 'bt_002',
        reconciled: 'Auto',
        date: '2025-05-12',
        fund: 'Fund A',
        account: 'ACC-1',
        type: 'Interest',
        contract: 'ES JUN25 4500',
        currency: 'EUR',
        value: 500.25,
        usdValue: 540.27,
        lots: 3,
        info: 'Broker note 2',
        mode: 'A',
        file: '/files/broker/2025-05-12/bt_002.csv',
        matchedIds: ['ct_001'], // Matches with same client transaction
      },
      {
        id: 'bt_003',
        reconciled: 'Manual',
        date: '2025-05-12',
        fund: 'Fund B',
        account: 'ACC-2',
        type: 'Commission',
        contract: 'ES JUN25 4600',
        currency: 'USD',
        value: 1050.50,
        usdValue: 1050.50,
        lots: 3,
        info: 'Broker note 3',
        mode: 'M',
        file: '/files/broker/2025-05-12/bt_003.csv',
        matchedIds: ['ct_002'], // Matches with client transaction
      },
      {
        id: 'bt_004',
        reconciled: 'Auto',
        date: '2025-05-12',
        fund: 'Fund A',
        account: 'ACC-1',
        type: 'Interest',
        contract: 'ES JUN25 4800',
        currency: 'USD',
        value: 1150.50,
        usdValue: 1150.50,
        lots: 4,
        info: 'Broker note 4',
        mode: 'M',
        file: '/files/broker/2025-05-12/bt_004.csv',
        matchedIds: ['ct_004'], // Matches with client transaction
      },
      {
        id: 'bt_005',
        reconciled: 'No',
        date: '2025-05-12',
        fund: 'Fund C',
        account: 'ACC-3',
        type: 'Fee',
        contract: 'ES JUN25 4900',
        currency: 'EUR',
        value: 1200.50,
        usdValue: 1296.54,
        lots: 1,
        info: 'Broker note 5',
        mode: 'A',
        file: '/files/broker/2025-05-12/bt_005.csv',
        matchedIds: [], // No matches
      },
    ]

    return {
      items,
      page: params.page || 1,
      pageSize: params.pageSize || 100,
      total: items.length,
    }
  }
}

export default MockClient
