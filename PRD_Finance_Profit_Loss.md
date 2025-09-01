# Product Requirements Document (PRD)
## Finance/Profit and Loss Page

### 1. Overview
A comprehensive Profit and Loss reporting page that provides detailed financial breakdowns with hierarchical data visualization, filtering capabilities, and multi-currency support.

### 2. Page Structure

#### 2.1 Filters Section
**Location**: Top of the page
**Components**:
- Start Date (Date Picker - single date selection)
- End Date (Date Picker - single date selection) 
- Fund (Dropdown - async options from API)
- Broker (Dropdown - async options from API)
- Apply Filters Button

**Behavior**: 
- Filters are applied only when "Apply Filters" button is clicked
- All data sections update based on applied filters
- Loading states during filter application

#### 2.2 Summary Section
**Location**: Below filters, above main table
**Display Values** (all in USD):
- Balance at the beginning of period
- Balance at the end of period
- Net receivables at the beginning of period
- Net receivables at the end of period
- Withdrawals for period
- Net profit and loss for period
- Financing profit and loss for period
- Total profit and loss for period

**Data Source**: REST API call triggered by filter application

#### 2.3 Profit and Loss Breakdown Table
**Location**: Below summary section
**Technology**: TanStack React Table
**Structure**: Hierarchical, collapsible rows

### 3. Table Structure

#### 3.1 Column Layout
1. **Broker** (Leftmost)
2. **Fund** (Second)
3. **Type** (Third) - e.g., Charge, Rebate, Tax, Interest, USD Rate, Gross Profit, Net Profit
4. **Expected/Arrived** (Fourth) - Sub-rows under each Type
5. **$** (Fifth) - Aggregated USD values
6. **Currency Columns** (Dynamic) - Currencies determined from data (any currency that appears at least once in the dataset gets its own column)

#### 3.2 Hierarchical Structure
```
Broker1
├── Fund1
│   ├── Charge
│   │   ├── Expected: $100
│   │   └── Arrived: $200
│   ├── Rebate
│   │   ├── Expected: $50
│   │   └── Arrived: $75
│   └── Tax
│       └── Expected: $25
└── Fund2
    ├── Interest
    │   └── Arrived: $150
    └── Gross Profit
        ├── Expected: $300
        └── Arrived: $350
```

#### 3.3 Collapse/Expand Behavior
- Clicking on any row collapses all child rows to the right
- Collapsed rows show aggregated "$" values (sum of all child values)
- Currency columns are hidden when collapsed
- Only "$" column shows aggregated values

### 4. Data Flow

#### 4.1 API Endpoints
1. **GET /api/funds** - Fetch fund options for dropdown
2. **GET /api/brokers** - Fetch broker options for dropdown  
3. **GET /api/finance/pnl_summary** - Fetch summary values
4. **GET /api/finance/pnl** - Fetch hierarchical P&L data (includes all currency data)

#### 4.2 API Response Structure
```json
{
  "summary": {
    "balanceAtStart": 10000,
    "balanceAtEnd": 12000,
    "netReceivablesAtStart": 5000,
    "netReceivablesAtEnd": 4500,
    "withdrawals": 2000,
    "netProfitLoss": 1500,
    "financingProfitLoss": 500,
    "totalProfitLoss": 2000
  },
  "breakdown": [
    {
      "broker": "Broker1",
      "funds": [
        {
          "fund": "Fund1",
          "types": [
            {
              "type": "Charge",
              "expected": {
                "usd": 100,
                "currencies": {
                  "EUR": 85,
                  "GBP": 75
                }
              },
              "arrived": {
                "usd": 200,
                "currencies": {
                  "EUR": 170,
                  "GBP": 150
                }
              }
            }
          ]
        }
      ]
    }
  ]
}
```

**Note**: Currency columns are dynamically determined by scanning all currency values in the breakdown data. Any currency that appears at least once in any Expected/Arrived object will get its own column in the table.

### 5. Technical Requirements

#### 5.1 Component Structure
```
FinanceProfitLoss/
├── index.tsx
├── FinanceProfitLoss.styles.ts
├── components/
│   ├── FiltersSection/
│   │   ├── index.tsx
│   │   └── FiltersSection.styles.ts
│   ├── SummarySection/
│   │   ├── index.tsx
│   │   └── SummarySection.styles.ts
│   └── BreakdownTable/
│       ├── index.tsx
│       ├── BreakdownTable.styles.ts
│       └── hooks/
│           └── useTableData.ts
```

#### 5.2 Styling Requirements
- All styles in separate `.styles.ts` files
- No inline styles
- Follow existing design system
- Responsive design for different screen sizes

#### 5.3 State Management
- Loading states for all API calls
- Error handling for failed requests
- Filter state management
- Table expansion/collapse state

### 6. User Experience

#### 6.1 Loading States
- Skeleton loaders for table rows
- Loading spinners for filter dropdowns
- Progress indicators for data fetching

#### 6.2 Error Handling
- Error messages for failed API calls
- Retry mechanisms for network failures
- Graceful degradation when data is unavailable

#### 6.3 Accessibility
- Keyboard navigation support
- Screen reader compatibility
- ARIA labels for interactive elements

### 7. Performance Considerations
- Lazy loading for large datasets
- Virtualization for tables with many rows
- Debounced filter inputs
- Caching for frequently accessed data

### 8. Future Enhancements
- Export functionality (PDF/Excel)
- Advanced filtering options
- Date range presets
- Real-time data updates
- Drill-down capabilities

---

## Table Visual Example

```
┌─────────┬──────┬─────────┬──────────┬──────┬──────┬──────┬──────┐
│ Broker  │ Fund │  Type   │Expected/ │  $   │ EUR  │ GBP  │ JPY  │
│         │      │         │ Arrived  │      │      │      │      │
├─────────┼──────┼─────────┼──────────┼──────┼──────┼──────┼──────┤
│ Broker1 │ Fund1│ Charge  │ Expected │ $100 │ €85  │ £75  │ ¥150 │
│         │      │         │ Arrived  │ $200 │ €170 │ £150 │ ¥300 │
│         │      │ Rebate  │ Expected │ $50  │ €42  │ £37  │ ¥75  │
│         │      │         │ Arrived  │ $75  │ €63  │ £56  │ ¥112 │
│         │ Fund2│ Interest│ Arrived  │ $150 │ €127 │ £112 │ ¥225 │
└─────────┴──────┴─────────┴──────────┴──────┴──────┴──────┴──────┘

When collapsed at "Charge" level:
┌─────────┬──────┬─────────┬──────────┬──────┬──────┬──────┬──────┐
│ Broker  │ Fund │  Type   │Expected/ │  $   │ EUR  │ GBP  │ JPY  │
│         │      │         │ Arrived  │      │      │      │      │
├─────────┼──────┼─────────┼──────────┼──────┼──────┼──────┼──────┤
│ Broker1 │ Fund1│ Charge  │   [▼]    │ $300 │      │      │      │
│         │      │ Rebate  │ Expected │ $50  │ €42  │ £37  │ ¥75  │
│         │      │         │ Arrived  │ $75  │ €63  │ £56  │ ¥112 │
│         │ Fund2│ Interest│ Arrived  │ $150 │ €127 │ £112 │ ¥225 │
└─────────┴──────┴─────────┴──────────┴──────┴──────┴──────┴──────┘
```

This PRD provides a comprehensive overview of the Finance/Profit and Loss page requirements. Please review and let me know if you need any modifications or have additional questions before we proceed with implementation.
