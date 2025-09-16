import { PaginatedResponse, FilterOption } from '@/types/common'
import { FillAlert, TransactionAlert } from '@/types/alerts'
import { 
  FillRow, 
  FillMatchRequest, 
  FillMatchResponse,
  FillAddRequest,
  FillRemoveRequest,
  FillRestoreRequest,
  FillCopyRequest,
  FillActionResponse
} from '@/types/fills'
import { 
  ClientTransactionRow, 
  BrokerTransactionRow,
  TransactionMatchRequest,
  TransactionMatchResponse
} from '@/types/transactions'
import { 
  FinanceSummary, 
  FinanceBreakdown, 
  FinanceFilters,
  FundOption,
  BrokerOption
} from '@/types/finance'

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
  { id: 'strike4', name: '4800' },
  { id: 'strike5', name: '4900' },
  { id: 'strike6', name: '5000' },
  { id: 'strike7', name: '5100' },
  { id: 'strike8', name: '5200' },
  { id: 'strike9', name: '5300' },
  { id: 'strike10', name: '5400' },
]

// Finance mock data
const mockFinanceBrokers: BrokerOption[] = [
  { id: 'fb1', name: 'Goldman Sachs' },
  { id: 'fb2', name: 'Morgan Stanley' },
  { id: 'fb3', name: 'JP Morgan' },
  { id: 'fb4', name: 'Credit Suisse' },
  { id: 'fb5', name: 'Deutsche Bank' },
]

const mockFinanceFunds: FundOption[] = [
  { id: 'ff1', name: 'Alpha Fund' },
  { id: 'ff2', name: 'Beta Fund' },
  { id: 'ff3', name: 'Gamma Fund' },
  { id: 'ff4', name: 'Delta Fund' },
  { id: 'ff5', name: 'Epsilon Fund' },
  { id: 'ff6', name: 'Zeta Fund' },
]

const mockFinanceSummary: FinanceSummary = {
  balanceAtStart: 2500000.00,
  balanceAtEnd: 2750000.00,
  netReceivablesAtStart: 450000.00,
  netReceivablesAtEnd: 520000.00,
  withdrawals: 150000.00,
  netProfitLoss: 350000.00,
  financingProfitLoss: 50000.00,
  totalProfitLoss: 400000.00,
}

// Cash Flow mock data
const mockCashFlowSummary: FinanceSummary = {
  balanceAtStart: 1800000.00,
  balanceAtEnd: 1950000.00,
  netReceivablesAtStart: 320000.00,
  netReceivablesAtEnd: 380000.00,
  withdrawals: 200000.00,
  netProfitLoss: 150000.00,
  financingProfitLoss: 25000.00,
  totalProfitLoss: 175000.00,
}

const mockCashFlowBreakdown: FinanceBreakdown = {
  summary: mockCashFlowSummary,
  breakdown: [
    {
      broker: 'Morgan Stanley',
      funds: [
        {
          fund: 'Beta Fund',
          types: [
            {
              type: 'Cash Inflow',
              expected: {
                usd: 12000.00,
                currencies: {
                  'EUR': 10200.00,
                  'GBP': 9000.00,
                  'JPY': 1800000.00,
                  'CAD': 16200.00,
                  'AUD': 18000.00,
                  'CHF': 10800.00,
                  'CNY': 84000.00,
                  'INR': 996000.00,
                  'BRL': 60000.00,
                  'MXN': 216000.00,
                  'KRW': 16200000.00,
                  'SGD': 16200.00,
                  'HKD': 93600.00
                }
              },
              arrived: {
                usd: 13200.00,
                currencies: {
                  'EUR': 11220.00,
                  'GBP': 9900.00,
                  'JPY': 1980000.00,
                  'CAD': 17820.00,
                  'AUD': 19800.00,
                  'CHF': 11880.00,
                  'CNY': 92400.00,
                  'INR': 1095600.00,
                  'BRL': 66000.00,
                  'MXN': 237600.00,
                  'KRW': 17820000.00,
                  'SGD': 17820.00,
                  'HKD': 102960.00
                }
              }
            },
            {
              type: 'Cash Outflow',
              expected: {
                usd: 8000.00,
                currencies: {
                  'EUR': 6800.00,
                  'GBP': 6000.00,
                  'JPY': 1200000.00,
                  'CAD': 10800.00,
                  'AUD': 12000.00,
                  'CHF': 7200.00,
                  'CNY': 56000.00,
                  'INR': 664000.00,
                  'BRL': 40000.00,
                  'MXN': 144000.00,
                  'KRW': 10800000.00,
                  'SGD': 10800.00,
                  'HKD': 62400.00
                }
              },
              arrived: {
                usd: 8800.00,
                currencies: {
                  'EUR': 7480.00,
                  'GBP': 6600.00,
                  'JPY': 1320000.00,
                  'CAD': 11880.00,
                  'AUD': 13200.00,
                  'CHF': 7920.00,
                  'CNY': 61600.00,
                  'INR': 730400.00,
                  'BRL': 44000.00,
                  'MXN': 158400.00,
                  'KRW': 11880000.00,
                  'SGD': 11880.00,
                  'HKD': 68640.00
                }
              }
            }
          ]
        },
        {
          fund: 'Gamma Fund',
          types: [
            {
              type: 'Cash Inflow',
              expected: {
                usd: 9500.00,
                currencies: {
                  'EUR': 8075.00,
                  'GBP': 7125.00,
                  'JPY': 1425000.00,
                  'CAD': 12825.00,
                  'AUD': 14250.00,
                  'CHF': 8550.00,
                  'CNY': 66500.00,
                  'INR': 788250.00,
                  'BRL': 47500.00,
                  'MXN': 171000.00,
                  'KRW': 12825000.00,
                  'SGD': 12825.00,
                  'HKD': 74100.00
                }
              },
              arrived: {
                usd: 10450.00,
                currencies: {
                  'EUR': 8882.50,
                  'GBP': 7837.50,
                  'JPY': 1567500.00,
                  'CAD': 14107.50,
                  'AUD': 15675.00,
                  'CHF': 9405.00,
                  'CNY': 73150.00,
                  'INR': 867075.00,
                  'BRL': 52250.00,
                  'MXN': 188100.00,
                  'KRW': 14107500.00,
                  'SGD': 14107.50,
                  'HKD': 81510.00
                }
              }
            },
            {
              type: 'Cash Outflow',
              expected: {
                usd: 6500.00,
                currencies: {
                  'EUR': 5525.00,
                  'GBP': 4875.00,
                  'JPY': 975000.00,
                  'CAD': 8775.00,
                  'AUD': 9750.00,
                  'CHF': 5850.00,
                  'CNY': 45500.00,
                  'INR': 539250.00,
                  'BRL': 32500.00,
                  'MXN': 117000.00,
                  'KRW': 8775000.00,
                  'SGD': 8775.00,
                  'HKD': 50700.00
                }
              },
              arrived: {
                usd: 7150.00,
                currencies: {
                  'EUR': 6077.50,
                  'GBP': 5362.50,
                  'JPY': 1072500.00,
                  'CAD': 9652.50,
                  'AUD': 10725.00,
                  'CHF': 6435.00,
                  'CNY': 50050.00,
                  'INR': 593175.00,
                  'BRL': 35750.00,
                  'MXN': 128700.00,
                  'KRW': 9652500.00,
                  'SGD': 9652.50,
                  'HKD': 55770.00
                }
              }
            }
          ]
        }
      ]
    },
    {
      broker: 'JP Morgan',
      funds: [
        {
          fund: 'Delta Fund',
          types: [
            {
              type: 'Cash Inflow',
              expected: {
                usd: 11000.00,
                currencies: {
                  'EUR': 9350.00,
                  'GBP': 8250.00,
                  'JPY': 1650000.00,
                  'CAD': 14850.00,
                  'AUD': 16500.00,
                  'CHF': 9900.00,
                  'CNY': 77000.00,
                  'INR': 913000.00,
                  'BRL': 55000.00,
                  'MXN': 198000.00,
                  'KRW': 14850000.00,
                  'SGD': 14850.00,
                  'HKD': 85800.00
                }
              },
              arrived: {
                usd: 12100.00,
                currencies: {
                  'EUR': 10285.00,
                  'GBP': 9075.00,
                  'JPY': 1815000.00,
                  'CAD': 16335.00,
                  'AUD': 18150.00,
                  'CHF': 10890.00,
                  'CNY': 84700.00,
                  'INR': 1004300.00,
                  'BRL': 60500.00,
                  'MXN': 217800.00,
                  'KRW': 16335000.00,
                  'SGD': 16335.00,
                  'HKD': 94380.00
                }
              }
            },
            {
              type: 'Cash Outflow',
              expected: {
                usd: 7500.00,
                currencies: {
                  'EUR': 6375.00,
                  'GBP': 5625.00,
                  'JPY': 1125000.00,
                  'CAD': 10125.00,
                  'AUD': 11250.00,
                  'CHF': 6750.00,
                  'CNY': 52500.00,
                  'INR': 622500.00,
                  'BRL': 37500.00,
                  'MXN': 135000.00,
                  'KRW': 10125000.00,
                  'SGD': 10125.00,
                  'HKD': 58500.00
                }
              },
              arrived: {
                usd: 8250.00,
                currencies: {
                  'EUR': 7012.50,
                  'GBP': 6187.50,
                  'JPY': 1237500.00,
                  'CAD': 11137.50,
                  'AUD': 12375.00,
                  'CHF': 7425.00,
                  'CNY': 57750.00,
                  'INR': 684750.00,
                  'BRL': 41250.00,
                  'MXN': 148500.00,
                  'KRW': 11137500.00,
                  'SGD': 11137.50,
                  'HKD': 64350.00
                }
              }
            }
          ]
        }
      ]
    }
  ]
}

// Balance Sheet mock data
const mockBalanceSheetSummary: FinanceSummary = {
  balanceAtStart: 3200000.00,
  balanceAtEnd: 3450000.00,
  netReceivablesAtStart: 680000.00,
  netReceivablesAtEnd: 720000.00,
  withdrawals: 180000.00,
  netProfitLoss: 250000.00,
  financingProfitLoss: 30000.00,
  totalProfitLoss: 280000.00,
}

const mockBalanceSheetBreakdown: FinanceBreakdown = {
  summary: mockBalanceSheetSummary,
  breakdown: [
    {
      broker: 'Goldman Sachs',
      funds: [
        {
          fund: 'Alpha Fund',
          types: [
            {
              type: 'Assets',
              expected: {
                usd: 850000.00,
                currencies: {
                  'EUR': 722500.00,
                  'GBP': 637500.00,
                  'JPY': 127500000.00,
                  'CAD': 1147500.00,
                  'AUD': 1275000.00,
                  'CHF': 765000.00,
                  'CNY': 5950000.00,
                  'INR': 70550000.00,
                  'BRL': 4250000.00,
                  'MXN': 15300000.00,
                  'KRW': 1147500000.00,
                  'SGD': 1147500.00,
                  'HKD': 6630000.00
                }
              },
              arrived: {
                usd: 920000.00,
                currencies: {
                  'EUR': 782000.00,
                  'GBP': 690000.00,
                  'JPY': 138000000.00,
                  'CAD': 1242000.00,
                  'AUD': 1380000.00,
                  'CHF': 828000.00,
                  'CNY': 6440000.00,
                  'INR': 76360000.00,
                  'BRL': 4600000.00,
                  'MXN': 16560000.00,
                  'KRW': 1242000000.00,
                  'SGD': 1242000.00,
                  'HKD': 7176000.00
                }
              }
            },
            {
              type: 'Liabilities',
              expected: {
                usd: 320000.00,
                currencies: {
                  'EUR': 272000.00,
                  'GBP': 240000.00,
                  'JPY': 48000000.00,
                  'CAD': 432000.00,
                  'AUD': 480000.00,
                  'CHF': 288000.00,
                  'CNY': 2240000.00,
                  'INR': 26560000.00,
                  'BRL': 1600000.00,
                  'MXN': 5760000.00,
                  'KRW': 432000000.00,
                  'SGD': 432000.00,
                  'HKD': 2496000.00
                }
              },
              arrived: {
                usd: 350000.00,
                currencies: {
                  'EUR': 297500.00,
                  'GBP': 262500.00,
                  'JPY': 52500000.00,
                  'CAD': 472500.00,
                  'AUD': 525000.00,
                  'CHF': 315000.00,
                  'CNY': 2450000.00,
                  'INR': 29050000.00,
                  'BRL': 1750000.00,
                  'MXN': 6300000.00,
                  'KRW': 472500000.00,
                  'SGD': 472500.00,
                  'HKD': 2730000.00
                }
              }
            }
          ]
        },
        {
          fund: 'Beta Fund',
          types: [
            {
              type: 'Assets',
              expected: {
                usd: 650000.00,
                currencies: {
                  'EUR': 552500.00,
                  'GBP': 487500.00,
                  'JPY': 97500000.00,
                  'CAD': 877500.00,
                  'AUD': 975000.00,
                  'CHF': 585000.00,
                  'CNY': 4550000.00,
                  'INR': 53950000.00,
                  'BRL': 3250000.00,
                  'MXN': 11700000.00,
                  'KRW': 877500000.00,
                  'SGD': 877500.00,
                  'HKD': 5070000.00
                }
              },
              arrived: {
                usd: 720000.00,
                currencies: {
                  'EUR': 612000.00,
                  'GBP': 540000.00,
                  'JPY': 108000000.00,
                  'CAD': 972000.00,
                  'AUD': 1080000.00,
                  'CHF': 648000.00,
                  'CNY': 5040000.00,
                  'INR': 59760000.00,
                  'BRL': 3600000.00,
                  'MXN': 12960000.00,
                  'KRW': 972000000.00,
                  'SGD': 972000.00,
                  'HKD': 5616000.00
                }
              }
            },
            {
              type: 'Liabilities',
              expected: {
                usd: 280000.00,
                currencies: {
                  'EUR': 238000.00,
                  'GBP': 210000.00,
                  'JPY': 42000000.00,
                  'CAD': 378000.00,
                  'AUD': 420000.00,
                  'CHF': 252000.00,
                  'CNY': 1960000.00,
                  'INR': 23240000.00,
                  'BRL': 1400000.00,
                  'MXN': 5040000.00,
                  'KRW': 378000000.00,
                  'SGD': 378000.00,
                  'HKD': 2184000.00
                }
              },
              arrived: {
                usd: 310000.00,
                currencies: {
                  'EUR': 263500.00,
                  'GBP': 232500.00,
                  'JPY': 46500000.00,
                  'CAD': 418500.00,
                  'AUD': 465000.00,
                  'CHF': 279000.00,
                  'CNY': 2170000.00,
                  'INR': 25730000.00,
                  'BRL': 1550000.00,
                  'MXN': 5580000.00,
                  'KRW': 418500000.00,
                  'SGD': 418500.00,
                  'HKD': 2418000.00
                }
              }
            }
          ]
        }
      ]
    },
    {
      broker: 'Morgan Stanley',
      funds: [
        {
          fund: 'Gamma Fund',
          types: [
            {
              type: 'Assets',
              expected: {
                usd: 750000.00,
                currencies: {
                  'EUR': 637500.00,
                  'GBP': 562500.00,
                  'JPY': 112500000.00,
                  'CAD': 1012500.00,
                  'AUD': 1125000.00,
                  'CHF': 675000.00,
                  'CNY': 5250000.00,
                  'INR': 62250000.00,
                  'BRL': 3750000.00,
                  'MXN': 13500000.00,
                  'KRW': 1012500000.00,
                  'SGD': 1012500.00,
                  'HKD': 5850000.00
                }
              },
              arrived: {
                usd: 820000.00,
                currencies: {
                  'EUR': 697000.00,
                  'GBP': 615000.00,
                  'JPY': 123000000.00,
                  'CAD': 1107000.00,
                  'AUD': 1230000.00,
                  'CHF': 738000.00,
                  'CNY': 5740000.00,
                  'INR': 68060000.00,
                  'BRL': 4100000.00,
                  'MXN': 14760000.00,
                  'KRW': 1107000000.00,
                  'SGD': 1107000.00,
                  'HKD': 6396000.00
                }
              }
            },
            {
              type: 'Liabilities',
              expected: {
                usd: 290000.00,
                currencies: {
                  'EUR': 246500.00,
                  'GBP': 217500.00,
                  'JPY': 43500000.00,
                  'CAD': 391500.00,
                  'AUD': 435000.00,
                  'CHF': 261000.00,
                  'CNY': 2030000.00,
                  'INR': 24070000.00,
                  'BRL': 1450000.00,
                  'MXN': 5220000.00,
                  'KRW': 391500000.00,
                  'SGD': 391500.00,
                  'HKD': 2262000.00
                }
              },
              arrived: {
                usd: 320000.00,
                currencies: {
                  'EUR': 272000.00,
                  'GBP': 240000.00,
                  'JPY': 48000000.00,
                  'CAD': 432000.00,
                  'AUD': 480000.00,
                  'CHF': 288000.00,
                  'CNY': 2240000.00,
                  'INR': 26560000.00,
                  'BRL': 1600000.00,
                  'MXN': 5760000.00,
                  'KRW': 432000000.00,
                  'SGD': 432000.00,
                  'HKD': 2496000.00
                }
              }
            }
          ]
        }
      ]
    }
  ]
}

const mockFinanceBreakdown: FinanceBreakdown = {
  summary: mockFinanceSummary,
  breakdown: [
    {
      broker: 'Goldman Sachs',
      funds: [
        {
          fund: 'Alpha Fund',
          types: [
            {
              type: 'Charge',
              expected: {
                usd: 15000.00,
                currencies: {
                  'EUR': 12750.00,
                  'GBP': 11250.00,
                  'JPY': 2250000.00,
                  'CAD': 20250.00,
                  'AUD': 22500.00,
                  'CHF': 13500.00,
                  'CNY': 105000.00,
                  'INR': 1245000.00,
                  'BRL': 75000.00,
                  'MXN': 270000.00,
                  'KRW': 20250000.00,
                  'SGD': 20250.00,
                  'HKD': 117000.00
                }
              },
              arrived: {
                usd: 16500.00,
                currencies: {
                  'EUR': 14025.00,
                  'GBP': 12375.00,
                  'JPY': 2475000.00,
                  'CAD': 22275.00,
                  'AUD': 24750.00,
                  'CHF': 14850.00,
                  'CNY': 115500.00,
                  'INR': 1369500.00,
                  'BRL': 82500.00,
                  'MXN': 297000.00,
                  'KRW': 22275000.00,
                  'SGD': 22275.00,
                  'HKD': 128700.00
                }
              }
            },
            {
              type: 'Rebate',
              expected: {
                usd: 8500.00,
                currencies: {
                  'EUR': 7225.00,
                  'GBP': 6375.00,
                  'JPY': 1275000.00,
                  'CAD': 11475.00,
                  'AUD': 12750.00,
                  'CHF': 7650.00,
                  'CNY': 59500.00,
                  'INR': 705750.00,
                  'BRL': 42500.00,
                  'MXN': 153000.00,
                  'KRW': 11475000.00,
                  'SGD': 11475.00,
                  'HKD': 66300.00
                }
              },
              arrived: {
                usd: 9200.00,
                currencies: {
                  'EUR': 7820.00,
                  'GBP': 6900.00,
                  'JPY': 1380000.00,
                  'CAD': 12420.00,
                  'AUD': 13800.00,
                  'CHF': 8280.00,
                  'CNY': 64400.00,
                  'INR': 763800.00,
                  'BRL': 46000.00,
                  'MXN': 165600.00,
                  'KRW': 12420000.00,
                  'SGD': 12420.00,
                  'HKD': 71760.00
                }
              }
            },
            {
              type: 'Tax',
              expected: {
                usd: 3200.00,
                currencies: {
                  'EUR': 2720.00,
                  'GBP': 2400.00,
                  'JPY': 480000.00,
                  'CAD': 4320.00,
                  'AUD': 4800.00,
                  'CHF': 2880.00,
                  'CNY': 22400.00,
                  'INR': 265600.00,
                  'BRL': 16000.00,
                  'MXN': 57600.00,
                  'KRW': 4320000.00,
                  'SGD': 4320.00,
                  'HKD': 24960.00
                }
              }
            }
          ]
        },
        {
          fund: 'Beta Fund',
          types: [
            {
              type: 'Interest',
              arrived: {
                usd: 25000.00,
                currencies: {
                  'EUR': 21250.00,
                  'GBP': 18750.00,
                  'JPY': 3750000.00,
                  'CAD': 33750.00,
                  'AUD': 37500.00,
                  'CHF': 22500.00,
                  'CNY': 175000.00,
                  'INR': 2075000.00,
                  'BRL': 125000.00,
                  'MXN': 450000.00,
                  'KRW': 33750000.00,
                  'SGD': 33750.00,
                  'HKD': 195000.00
                }
              }
            },
            {
              type: 'Gross Profit',
              expected: {
                usd: 125000.00,
                currencies: {
                  'EUR': 106250.00,
                  'GBP': 93750.00,
                  'JPY': 18750000.00,
                  'CAD': 168750.00,
                  'AUD': 187500.00,
                  'CHF': 112500.00,
                  'CNY': 875000.00,
                  'INR': 10375000.00,
                  'BRL': 625000.00,
                  'MXN': 2250000.00,
                  'KRW': 168750000.00,
                  'SGD': 168750.00,
                  'HKD': 975000.00
                }
              },
              arrived: {
                usd: 135000.00,
                currencies: {
                  'EUR': 114750.00,
                  'GBP': 101250.00,
                  'JPY': 20250000.00,
                  'CAD': 182250.00,
                  'AUD': 202500.00,
                  'CHF': 121500.00,
                  'CNY': 945000.00,
                  'INR': 11205000.00,
                  'BRL': 675000.00,
                  'MXN': 2430000.00,
                  'KRW': 182250000.00,
                  'SGD': 182250.00,
                  'HKD': 1053000.00
                }
              }
            }
          ]
        }
      ]
    },
    {
      broker: 'Morgan Stanley',
      funds: [
        {
          fund: 'Gamma Fund',
          types: [
            {
              type: 'Charge',
              expected: {
                usd: 12000.00,
                currencies: {
                  'EUR': 10200.00,
                  'GBP': 9000.00,
                  'JPY': 1800000.00,
                  'CAD': 16200.00,
                  'AUD': 18000.00,
                  'CHF': 10800.00,
                  'CNY': 84000.00,
                  'INR': 996000.00,
                  'BRL': 60000.00,
                  'MXN': 216000.00,
                  'KRW': 16200000.00,
                  'SGD': 16200.00,
                  'HKD': 93600.00
                }
              },
              arrived: {
                usd: 13000.00,
                currencies: {
                  'EUR': 11050.00,
                  'GBP': 9750.00,
                  'JPY': 1950000.00,
                  'CAD': 17550.00,
                  'AUD': 19500.00,
                  'CHF': 11700.00,
                  'CNY': 91000.00,
                  'INR': 1079000.00,
                  'BRL': 65000.00,
                  'MXN': 234000.00,
                  'KRW': 17550000.00,
                  'SGD': 17550.00,
                  'HKD': 101400.00
                }
              }
            },
            {
              type: 'USD Rate',
              expected: {
                usd: 8500.00,
                currencies: {
                  'EUR': 7225.00,
                  'GBP': 6375.00,
                  'JPY': 1275000.00,
                  'CAD': 11475.00,
                  'AUD': 12750.00,
                  'CHF': 7650.00,
                  'CNY': 59500.00,
                  'INR': 705750.00,
                  'BRL': 42500.00,
                  'MXN': 153000.00,
                  'KRW': 11475000.00,
                  'SGD': 11475.00,
                  'HKD': 66300.00
                }
              }
            }
          ]
        },
        {
          fund: 'Delta Fund',
          types: [
            {
              type: 'Net Profit',
              expected: {
                usd: 85000.00,
                currencies: {
                  'EUR': 72250.00,
                  'GBP': 63750.00,
                  'JPY': 12750000.00,
                  'CAD': 114750.00,
                  'AUD': 127500.00,
                  'CHF': 76500.00,
                  'CNY': 595000.00,
                  'INR': 7057500.00,
                  'BRL': 425000.00,
                  'MXN': 1530000.00,
                  'KRW': 114750000.00,
                  'SGD': 114750.00,
                  'HKD': 663000.00
                }
              },
              arrived: {
                usd: 92000.00,
                currencies: {
                  'EUR': 78200.00,
                  'GBP': 69000.00,
                  'JPY': 13800000.00,
                  'CAD': 124200.00,
                  'AUD': 138000.00,
                  'CHF': 82800.00,
                  'CNY': 644000.00,
                  'INR': 7638000.00,
                  'BRL': 460000.00,
                  'MXN': 1656000.00,
                  'KRW': 124200000.00,
                  'SGD': 124200.00,
                  'HKD': 717600.00
                }
              }
            }
          ]
        }
      ]
    },
    {
      broker: 'JP Morgan',
      funds: [
        {
          fund: 'Epsilon Fund',
          types: [
            {
              type: 'Commission',
              expected: {
                usd: 5500.00,
                currencies: {
                  'EUR': 4675.00,
                  'GBP': 4125.00,
                  'JPY': 825000.00,
                  'CAD': 7425.00,
                  'AUD': 8250.00,
                  'CHF': 4950.00,
                  'CNY': 38500.00,
                  'INR': 456500.00,
                  'BRL': 27500.00,
                  'MXN': 99000.00,
                  'KRW': 7425000.00,
                  'SGD': 7425.00,
                  'HKD': 42900.00
                }
              },
              arrived: {
                usd: 6000.00,
                currencies: {
                  'EUR': 5100.00,
                  'GBP': 4500.00,
                  'JPY': 900000.00,
                  'CAD': 8100.00,
                  'AUD': 9000.00,
                  'CHF': 5400.00,
                  'CNY': 42000.00,
                  'INR': 498000.00,
                  'BRL': 30000.00,
                  'MXN': 108000.00,
                  'KRW': 8100000.00,
                  'SGD': 8100.00,
                  'HKD': 46800.00
                }
              }
            },
            {
              type: 'Fee',
              arrived: {
                usd: 3500.00,
                currencies: {
                  'EUR': 2975.00,
                  'GBP': 2625.00,
                  'JPY': 525000.00,
                  'CAD': 4725.00,
                  'AUD': 5250.00,
                  'CHF': 3150.00,
                  'CNY': 24500.00,
                  'INR': 290500.00,
                  'BRL': 17500.00,
                  'MXN': 63000.00,
                  'KRW': 4725000.00,
                  'SGD': 4725.00,
                  'HKD': 27300.00
                }
              }
            }
          ]
        },
        {
          fund: 'Zeta Fund',
          types: [
            {
              type: 'Interest',
              expected: {
                usd: 18000.00,
                currencies: {
                  'EUR': 15300.00,
                  'GBP': 13500.00,
                  'JPY': 2700000.00,
                  'CAD': 24300.00,
                  'AUD': 27000.00,
                  'CHF': 16200.00,
                  'CNY': 126000.00,
                  'INR': 1494000.00,
                  'BRL': 90000.00,
                  'MXN': 324000.00,
                  'KRW': 24300000.00,
                  'SGD': 24300.00,
                  'HKD': 140400.00
                }
              },
              arrived: {
                usd: 19500.00,
                currencies: {
                  'EUR': 16575.00,
                  'GBP': 14625.00,
                  'JPY': 2925000.00,
                  'CAD': 26325.00,
                  'AUD': 29250.00,
                  'CHF': 17550.00,
                  'CNY': 136500.00,
                  'INR': 1618500.00,
                  'BRL': 97500.00,
                  'MXN': 351000.00,
                  'KRW': 26325000.00,
                  'SGD': 26325.00,
                  'HKD': 152100.00
                }
              }
            }
          ]
        }
      ]
    }
  ]
}

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
      accountId: mockAccounts[i % mockAccounts.length].id,
      accountName: mockAccounts[i % mockAccounts.length].name,
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
        finalName: 'ES.JUN25.4500',
        time: '14:22:18',
        excRef: 'X12345',
        file: '/files/client/fills/2025-05-12/cf_001.csv',
        matchedIds: ['bf_001', 'bf_002'], // Matches with 2 broker fills
        removed: false,
      },
      {
        id: 'cf_002',
        reconciled: 'Manual',
        side: 'Sell',
        lots: 3,
        price: 4276.50,
        mode: 'M',
        finalName: 'ES.JUN25.4600',
        time: '14:23:45',
        excRef: 'X12346',
        file: '/files/client/fills/2025-05-12/cf_002.csv',
        matchedIds: ['bf_003'], // Matches with 1 broker fill
        removed: false,
      },
      {
        id: 'cf_003',
        reconciled: 'No',
        side: 'Buy',
        lots: 8,
        price: 4277.75,
        mode: 'A',
        finalName: 'ES.JUN25.4700',
        time: '14:25:12',
        excRef: 'X12347',
        file: '/files/client/fills/2025-05-12/cf_003.csv',
        matchedIds: [], // No matches
        removed: false,
      },
      {
        id: 'cf_004',
        reconciled: 'Auto',
        side: 'Sell',
        lots: 2,
        price: 4278.00,
        mode: 'M',
        finalName: 'ES.JUN25.4800',
        time: '14:26:33',
        excRef: 'X12348',
        file: '/files/client/fills/2025-05-12/cf_004.csv',
        matchedIds: ['bf_004', 'bf_005', 'bf_006'], // Matches with 3 broker fills
        removed: false,
      },
      {
        id: 'cf_005',
        reconciled: 'Manual',
        side: 'Buy',
        lots: 6,
        price: 4279.25,
        mode: 'A',
        finalName: 'ES.JUN25.4900',
        time: '14:28:07',
        excRef: 'X12349',
        file: '/files/client/fills/2025-05-12/cf_005.csv',
        matchedIds: ['bf_007'], // Matches with 1 broker fill
        removed: false,
      },
      {
        id: 'cf_006',
        reconciled: 'No',
        side: 'Sell',
        lots: 4,
        price: 4280.50,
        mode: 'M',
        finalName: 'ES.JUN25.5000',
        time: '14:29:55',
        excRef: 'X12350',
        file: '/files/client/fills/2025-05-12/cf_006.csv',
        matchedIds: [], // No matches
        removed: false,
      },
      {
        id: 'cf_007',
        reconciled: 'Auto',
        side: 'Buy',
        lots: 7,
        price: 4281.75,
        mode: 'A',
        finalName: 'ES.JUN25.5100',
        time: '14:31:22',
        excRef: 'X12351',
        file: '/files/client/fills/2025-05-12/cf_007.csv',
        matchedIds: ['bf_008'], // Matches with 1 broker fill
        removed: false,
      },
      {
        id: 'cf_008',
        reconciled: 'Manual',
        side: 'Sell',
        lots: 1,
        price: 4282.00,
        mode: 'M',
        finalName: 'ES.JUN25.5200',
        time: '14:32:48',
        excRef: 'X12352',
        file: '/files/client/fills/2025-05-12/cf_008.csv',
        matchedIds: ['bf_009', 'bf_010'], // Matches with 2 broker fills
        removed: false,
      },
      // Add some removed fills for testing
      {
        id: 'cf_removed_001',
        reconciled: 'No',
        side: 'Buy',
        lots: 2,
        price: 4285.00,
        mode: 'M',
        finalName: 'ES.JUN25.5200',
        time: '15:00:00',
        excRef: 'X99999',
        file: '/files/client/fills/2025-05-12/cf_removed_001.csv',
        matchedIds: [],
        removed: true,
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
        finalName: 'ES.JUN25.4500',
        time: '14:22:18',
        excRef: 'X12345',
        file: '/files/fills/2025-05-12/bf_001.csv',
        matchedIds: ['cf_001'], // Matches with client fill
        removed: false,
      },
      {
        id: 'bf_002',
        reconciled: 'Auto',
        side: 'Buy',
        lots: 2,
        price: 4275.25,
        mode: 'A',
        finalName: 'ES.JUN25.4500',
        time: '14:22:19',
        excRef: 'X12345',
        file: '/files/fills/2025-05-12/bf_002.csv',
        matchedIds: ['cf_001'], // Matches with same client fill
        removed: false,
      },
      {
        id: 'bf_003',
        reconciled: 'Manual',
        side: 'Sell',
        lots: 3,
        price: 4276.50,
        mode: 'M',
        finalName: 'ES.JUN25.4600',
        time: '14:23:45',
        excRef: 'X12346',
        file: '/files/fills/2025-05-12/bf_003.csv',
        matchedIds: ['cf_002'], // Matches with client fill
        removed: false,
      },
      {
        id: 'bf_004',
        reconciled: 'Auto',
        side: 'Sell',
        lots: 1,
        price: 4278.00,
        mode: 'M',
        finalName: 'ES.JUN25.4800',
        time: '14:26:33',
        excRef: 'X12348',
        file: '/files/fills/2025-05-12/bf_004.csv',
        matchedIds: ['cf_004'], // Matches with client fill
        removed: false,
      },
      {
        id: 'bf_005',
        reconciled: 'Auto',
        side: 'Sell',
        lots: 1,
        price: 4278.00,
        mode: 'M',
        finalName: 'ES.JUN25.4800',
        time: '14:26:34',
        excRef: 'X12348',
        file: '/files/fills/2025-05-12/bf_005.csv',
        matchedIds: ['cf_004'], // Matches with same client fill
        removed: false,
      },
      {
        id: 'bf_006',
        reconciled: 'Auto',
        side: 'Sell',
        lots: 1,
        price: 4278.00,
        mode: 'M',
        finalName: 'ES.JUN25.4800',
        time: '14:26:35',
        excRef: 'X12348',
        file: '/files/fills/2025-05-12/bf_006.csv',
        matchedIds: ['cf_004'], // Matches with same client fill
        removed: false,
      },
      {
        id: 'bf_007',
        reconciled: 'Manual',
        side: 'Buy',
        lots: 6,
        price: 4279.25,
        mode: 'A',
        finalName: 'ES.JUN25.4900',
        time: '14:28:07',
        excRef: 'X12349',
        file: '/files/fills/2025-05-12/bf_007.csv',
        matchedIds: ['cf_005'], // Matches with client fill
        removed: false,
      },
      {
        id: 'bf_008',
        reconciled: 'Auto',
        side: 'Buy',
        lots: 7,
        price: 4281.75,
        mode: 'A',
        finalName: 'ES.JUN25.5100',
        time: '14:31:22',
        excRef: 'X12351',
        file: '/files/fills/2025-05-12/bf_008.csv',
        matchedIds: ['cf_007'], // Matches with client fill
        removed: false,
      },
      {
        id: 'bf_009',
        reconciled: 'Manual',
        side: 'Sell',
        lots: 1,
        price: 4282.00,
        mode: 'M',
        finalName: 'ES.JUN25.5200',
        time: '14:32:48',
        excRef: 'X12352',
        file: '/files/fills/2025-05-12/bf_009.csv',
        matchedIds: ['cf_008'], // Matches with client fill
        removed: false,
      },
      {
        id: 'bf_010',
        reconciled: 'Manual',
        side: 'Sell',
        lots: 1,
        price: 4282.00,
        mode: 'M',
        finalName: 'ES.JUN25.5200',
        time: '14:32:49',
        excRef: 'X12352',
        file: '/files/fills/2025-05-12/bf_010.csv',
        matchedIds: ['cf_008'], // Matches with same client fill
        removed: false,
      },
      {
        id: 'bf_011',
        reconciled: 'No',
        side: 'Buy',
        lots: 4,
        price: 4283.25,
        mode: 'A',
        finalName: 'ES.JUN25.5300',
        time: '14:35:12',
        excRef: 'X12353',
        file: '/files/fills/2025-05-12/bf_011.csv',
        matchedIds: [], // No matches
        removed: false,
      },
      {
        id: 'bf_012',
        reconciled: 'No',
        side: 'Sell',
        lots: 2,
        price: 4284.50,
        mode: 'M',
        finalName: 'ES.JUN25.5400',
        time: '14:37:45',
        excRef: 'X12354',
        file: '/files/fills/2025-05-12/bf_012.csv',
        matchedIds: [], // No matches
        removed: false,
      },
      // Add some removed broker fills for testing
      {
        id: 'bf_removed_001',
        reconciled: 'No',
        side: 'Sell',
        lots: 1,
        price: 4286.00,
        mode: 'M',
        finalName: 'ES.JUN25.5500',
        time: '15:01:00',
        excRef: 'X99998',
        file: '/files/fills/2025-05-12/bf_removed_001.csv',
        matchedIds: [],
        removed: true,
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

  // Reconciliation methods
  async matchFills(request: FillMatchRequest): Promise<FillMatchResponse> {
    await this.delay()
    
    // Get all fills data to validate
    const clientFills = await this.getClientFills({})
    const brokerFills = await this.getBrokerFills({})
    
    const selectedClientFills = clientFills.items.filter(fill => request.clientFillIds.includes(fill.id))
    const selectedBrokerFills = brokerFills.items.filter(fill => request.brokerFillIds.includes(fill.id))
    
    // Validation: Check if all selected fills are "No" status
    const hasNonNoClientFills = selectedClientFills.some(fill => fill.reconciled !== 'No')
    const hasNonNoBrokerFills = selectedBrokerFills.some(fill => fill.reconciled !== 'No')
    
    if (hasNonNoClientFills || hasNonNoBrokerFills) {
      return {
        success: false,
        message: 'Cannot match fills: Only "No" status fills can be matched',
        error: 'INVALID_STATUS'
      }
    }
    
    // Validation: Check sides
    const clientSides = [...new Set(selectedClientFills.map(fill => fill.side))]
    const brokerSides = [...new Set(selectedBrokerFills.map(fill => fill.side))]
    
    if (clientSides.length > 1 || brokerSides.length > 1 || clientSides[0] !== brokerSides[0]) {
      return {
        success: false,
        message: `Cannot match fills: Different sides (Client: ${clientSides.join(', ')} vs Broker: ${brokerSides.join(', ')})`,
        error: 'DIFFERENT_SIDES'
      }
    }
    
    // Validation: Check prices
    const clientPrices = [...new Set(selectedClientFills.map(fill => fill.price))]
    const brokerPrices = [...new Set(selectedBrokerFills.map(fill => fill.price))]
    
    if (clientPrices.length > 1 || brokerPrices.length > 1 || clientPrices[0] !== brokerPrices[0]) {
      return {
        success: false,
        message: `Cannot match fills: Different prices (Client: ${clientPrices.join(', ')} vs Broker: ${brokerPrices.join(', ')})`,
        error: 'DIFFERENT_PRICES'
      }
    }
    
    // Validation: Check aggregated quantities
    const clientTotalLots = selectedClientFills.reduce((sum, fill) => sum + fill.lots, 0)
    const brokerTotalLots = selectedBrokerFills.reduce((sum, fill) => sum + fill.lots, 0)
    
    if (clientTotalLots !== brokerTotalLots) {
      return {
        success: false,
        message: `Cannot match fills: Aggregated quantities don't match (Client: ${clientTotalLots} vs Broker: ${brokerTotalLots})`,
        error: 'QUANTITY_MISMATCH'
      }
    }
    
    // Success
    return {
      success: true,
      message: `Successfully matched ${selectedClientFills.length} client fills with ${selectedBrokerFills.length} broker fills`,
      error: null
    }
  }

  async unmatchFills(request: FillMatchRequest): Promise<FillMatchResponse> {
    await this.delay()
    
    // Get all fills data to validate
    const clientFills = await this.getClientFills({})
    const brokerFills = await this.getBrokerFills({})
    
    const selectedClientFills = clientFills.items.filter(fill => request.clientFillIds.includes(fill.id))
    const selectedBrokerFills = brokerFills.items.filter(fill => request.brokerFillIds.includes(fill.id))
    
    // Validation: Check if all selected fills are matched (Auto or Manual)
    const hasUnmatchedClientFills = selectedClientFills.some(fill => fill.reconciled === 'No')
    const hasUnmatchedBrokerFills = selectedBrokerFills.some(fill => fill.reconciled === 'No')
    
    if (hasUnmatchedClientFills || hasUnmatchedBrokerFills) {
      return {
        success: false,
        message: 'Cannot unmatch fills: Only matched fills (Auto/Manual) can be unmatched',
        error: 'INVALID_STATUS'
      }
    }
    
    // Success
    return {
      success: true,
      message: `Successfully unmatched ${selectedClientFills.length} client fills with ${selectedBrokerFills.length} broker fills`,
      error: null
    }
  }

  async matchTransactions(request: TransactionMatchRequest): Promise<TransactionMatchResponse> {
    await this.delay()
    
    // Get all transactions data to validate
    const clientTransactions = await this.getClientTransactions({})
    const brokerTransactions = await this.getBrokerTransactions({})
    
    const selectedClientTransactions = clientTransactions.items.filter(tx => request.clientTransactionIds.includes(tx.id))
    const selectedBrokerTransactions = brokerTransactions.items.filter(tx => request.brokerTransactionIds.includes(tx.id))
    
    // Validation: Check if all selected transactions are "No" status
    const hasNonNoClientTransactions = selectedClientTransactions.some(tx => tx.reconciled !== 'No')
    const hasNonNoBrokerTransactions = selectedBrokerTransactions.some(tx => tx.reconciled !== 'No')
    
    if (hasNonNoClientTransactions || hasNonNoBrokerTransactions) {
      return {
        success: false,
        message: 'Cannot match transactions: Only "No" status transactions can be matched',
        error: 'INVALID_STATUS'
      }
    }
    
    // Success (transactions have simpler validation for now)
    return {
      success: true,
      message: `Successfully matched ${selectedClientTransactions.length} client transactions with ${selectedBrokerTransactions.length} broker transactions`,
      error: null
    }
  }

  async unmatchTransactions(request: TransactionMatchRequest): Promise<TransactionMatchResponse> {
    await this.delay()
    
    // Get all transactions data to validate
    const clientTransactions = await this.getClientTransactions({})
    const brokerTransactions = await this.getBrokerTransactions({})
    
    const selectedClientTransactions = clientTransactions.items.filter(tx => request.clientTransactionIds.includes(tx.id))
    const selectedBrokerTransactions = brokerTransactions.items.filter(tx => request.brokerTransactionIds.includes(tx.id))
    
    // Validation: Check if all selected transactions are matched (Auto or Manual)
    const hasUnmatchedClientTransactions = selectedClientTransactions.some(tx => tx.reconciled === 'No')
    const hasUnmatchedBrokerTransactions = selectedBrokerTransactions.some(tx => tx.reconciled === 'No')
    
    if (hasUnmatchedClientTransactions || hasUnmatchedBrokerTransactions) {
      return {
        success: false,
        message: 'Cannot unmatch transactions: Only matched transactions (Auto/Manual) can be unmatched',
        error: 'INVALID_STATUS'
      }
    }
    
    // Success
    return {
      success: true,
      message: `Successfully unmatched ${selectedClientTransactions.length} client transactions with ${selectedBrokerTransactions.length} broker transactions`,
      error: null
    }
  }

  // Finance endpoints
  async getFinanceBrokers(params: any): Promise<PaginatedResponse<BrokerOption>> {
    await this.delay()
    
    const filtered = mockFinanceBrokers.filter(broker => 
      !params.q || broker.name.toLowerCase().includes(params.q.toLowerCase())
    )

    return {
      items: filtered,
      page: params.page || 1,
      pageSize: params.pageSize || 50,
      total: filtered.length,
    }
  }

  async getFinanceFunds(params: any): Promise<PaginatedResponse<FundOption>> {
    await this.delay()
    
    const filtered = mockFinanceFunds.filter(fund => 
      !params.q || fund.name.toLowerCase().includes(params.q.toLowerCase())
    )

    return {
      items: filtered,
      page: params.page || 1,
      pageSize: params.pageSize || 50,
      total: filtered.length,
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getFinancePnlSummary(filters: FinanceFilters): Promise<{ summary: FinanceSummary }> {
    await this.delay()
    
    // In a real implementation, this would filter based on the provided filters
    // For mock purposes, we return the same summary data
    return {
      summary: mockFinanceSummary
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getFinancePnl(filters: FinanceFilters): Promise<{ breakdown: FinanceBreakdown['breakdown'] }> {
    await this.delay()
    
    // In a real implementation, this would filter based on the provided filters
    // For mock purposes, we return the same breakdown data
    return {
      breakdown: mockFinanceBreakdown.breakdown
    }
  }

  // Cash Flow endpoints
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getCashFlowSummary(filters: FinanceFilters): Promise<{ summary: FinanceSummary }> {
    await this.delay()
    
    // In a real implementation, this would filter based on the provided filters
    // For mock purposes, we return the same cash flow summary data
    return {
      summary: mockCashFlowSummary
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getCashFlowBreakdown(filters: FinanceFilters): Promise<{ breakdown: FinanceBreakdown['breakdown'] }> {
    await this.delay()
    
    // In a real implementation, this would filter based on the provided filters
    // For mock purposes, we return the same cash flow breakdown data
    return {
      breakdown: mockCashFlowBreakdown.breakdown
    }
  }

  // Balance Sheet endpoints
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getBalanceSheetSummary(filters: FinanceFilters): Promise<{ summary: FinanceSummary }> {
    await this.delay()
    
    // In a real implementation, this would filter based on the provided filters
    // For mock purposes, we return the same balance sheet summary data
    return {
      summary: mockBalanceSheetSummary
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getBalanceSheetBreakdown(filters: FinanceFilters): Promise<{ breakdown: FinanceBreakdown['breakdown'] }> {
    await this.delay()
    
    // In a real implementation, this would filter based on the provided filters
    // For mock purposes, we return the same balance sheet breakdown data
    return {
      breakdown: mockBalanceSheetBreakdown.breakdown
    }
  }

  // Fill action methods
  async addFills(request: FillAddRequest): Promise<FillActionResponse> {
    await this.delay()
    
    // Validation: Check required fields for creating new fills
    if (!request.side || !request.lots || !request.price || !request.finalName || !request.time) {
      return {
        success: false,
        message: 'Missing required fields for creating new fill',
        error: 'INVALID_REQUEST'
      }
    }
    
    // Validation: Check if side is valid
    if (!['client', 'broker'].includes(request.side)) {
      return {
        success: false,
        message: 'Invalid side. Must be "client" or "broker"',
        error: 'INVALID_SIDE'
      }
    }
    
    // Success
    return {
      success: true,
      message: `Successfully added new fill to ${request.side} side`,
      error: null
    }
  }

  async removeFills(request: FillRemoveRequest): Promise<FillActionResponse> {
    await this.delay()
    
    // Validation: Check if fill IDs exist
    if (!request.fillIds || request.fillIds.length === 0) {
      return {
        success: false,
        message: 'No fill IDs provided',
        error: 'INVALID_REQUEST'
      }
    }
    
    // Success
    return {
      success: true,
      message: `Successfully removed ${request.fillIds.length} fills`,
      error: null
    }
  }

  async restoreFills(request: FillRestoreRequest): Promise<FillActionResponse> {
    await this.delay()
    
    // Validation: Check if fill IDs exist
    if (!request.fillIds || request.fillIds.length === 0) {
      return {
        success: false,
        message: 'No fill IDs provided',
        error: 'INVALID_REQUEST'
      }
    }
    
    // Success
    return {
      success: true,
      message: `Successfully restored ${request.fillIds.length} fills`,
      error: null
    }
  }

  async copyFills(request: FillCopyRequest): Promise<FillActionResponse> {
    await this.delay()
    
    // Validation: Check if fill IDs exist
    if (!request.fillIds || request.fillIds.length === 0) {
      return {
        success: false,
        message: 'No fill IDs provided',
        error: 'INVALID_REQUEST'
      }
    }
    
    // Validation: Check if target side is valid
    if (!request.targetSide || !['client', 'broker'].includes(request.targetSide)) {
      return {
        success: false,
        message: 'Invalid target side. Must be "client" or "broker"',
        error: 'INVALID_TARGET_SIDE'
      }
    }
    
    // Success
    return {
      success: true,
      message: `Successfully copied ${request.fillIds.length} fills to ${request.targetSide}`,
      error: null
    }
  }

  // Fill metadata methods
  async getFinalNames(instrumentId: string): Promise<string[]> {
    await this.delay()
    
    // Validation: Check if instrument ID is provided
    if (!instrumentId) {
      return []
    }
    
    // Mock final names based on instrument ID
    // In a real implementation, this would query the database for actual final names
    const mockFinalNames: Record<string, string[]> = {
      'inst1': [ // ES
        'ES.JUN25.4500',
        'ES.JUN25.4600',
        'ES.JUN25.4700',
        'ES.JUN25.4800',
        'ES.JUN25.4900',
        'ES.JUN25.5000',
        'ES.JUN25.5100',
        'ES.JUN25.5200',
        'ES.SEP25.4500',
        'ES.SEP25.4600',
        'ES.SEP25.4700',
        'ES.SEP25.4800',
        'ES.SEP25.4900',
        'ES.SEP25.5000',
        'ES.SEP25.5100',
        'ES.SEP25.5200',
      ],
      'inst2': [ // NQ
        'NQ.JUN25.15000',
        'NQ.JUN25.15100',
        'NQ.JUN25.15200',
        'NQ.JUN25.15300',
        'NQ.JUN25.15400',
        'NQ.SEP25.15000',
        'NQ.SEP25.15100',
        'NQ.SEP25.15200',
        'NQ.SEP25.15300',
        'NQ.SEP25.15400',
      ],
      'inst3': [ // YM
        'YM.JUN25.40000',
        'YM.JUN25.40100',
        'YM.JUN25.40200',
        'YM.JUN25.40300',
        'YM.SEP25.40000',
        'YM.SEP25.40100',
        'YM.SEP25.40200',
        'YM.SEP25.40300',
      ],
    }
    
    return mockFinalNames[instrumentId] || []
  }
}

export default MockClient
