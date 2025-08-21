## PRD: Backoffice Client for Algo-Trading – v1

### Overview
- **Goal**: Build a React-based backoffice client with multi-tab navigation. First delivery covers Operations > Fills Reconciliation and Transactions Reconciliation.
- **Out of scope now**: Dashboard, Overview, Reports, Financa (assumed Finance – confirm), Settings.

### Objectives
- **Primary**: Enable operations teams to reconcile client vs broker fills and transactions efficiently using alerts, filters, and side-by-side tables.
- **Secondary**: Provide performant browsing of large datasets, deterministic filters application, and clear visibility into server-side match relationships.

### Non-Goals
- Client-side matching logic; matching decisions are server-side.
- Data entry or editing of domain data (beyond UI interactions like filter application).
- Persisting reconciliation actions beyond what backend supports.

### Users
- **Ops Analyst**: Investigates alerts, applies filters, reviews matches, exports or follows up.
- **Ops Lead**: Monitors workload via alerts, audits reconciliation status.

---

## Information Architecture & Navigation

### Top-Level Tabs (routes)
- Dashboard: `/dashboard` (future)
- Operations: `/operations`
- Reports: `/reports` (future)
- Financa: `/financa` (please confirm name; likely “Finance”)
- Settings: `/settings` (future)

### Operations Second-Level Tabs (routes)
- Overview: `/operations/overview` (future)
- Fills Reconciliation: `/operations/fills`
- Transactions Reconciliation: `/operations/transactions`

### Navigation Behavior
- Top-level tabs allow navigation between main sections (Operations, Dashboard, Reports, Finance, Settings)
- Each tab maintains its own state and URL parameters
- Active tab is highlighted in the navigation

---

## Page Layout (Fills and Transactions)

- **Left Alerts Pane**: ~15% width, fixed panel on the left, scrollable list.
  - Fills columns: DATE, BROKER, CONTRACT
  - Transactions columns: DATE, BROKER
  - Click behavior: populates the page’s filters and auto-applies (same effect as pressing “Apply filters”).
- **Main Area**: ~85% width, split vertically:
  - Filters header with “Apply filters” button; filters take effect only on button press.
  - Two side-by-side tables:
    - Fills: CLIENT FILLS | BROKER FILLS
    - Transactions: CLIENT TRANSACTIONS | BROKER TRANSACTIONS

---

## Functional Requirements

### Alerts Pane
- Displays alert rows with required columns and column headers at the top.
- Supports:
  - Infinite scroll/pagination.
  - Search/filter (optional v2).
  - Loading, empty, error states.
- Column headers displayed at the top of the alerts pane for better UX.
- On click:
  - Fills page: sets DATE, Account (if applicable via alert data), Instrument, Expiration, Strike derived from CONTRACT, then triggers fetch.
  - Transactions page: sets From and To to alert’s DATE, sets Broker to alert’s BROKER, then triggers fetch.

### Filters

- Fills page:
  - DATE (date picker; single date)
  - Account (dropdown; async options)
  - Instrument (dropdown; async options)
  - Expiration (dropdown; async options, dependent on Instrument)
  - Strike (dropdown or free text; if dropdown, async options, dependent on Instrument+Expiration)
  - Apply filters button (explicit submit; no implicit fetch on change)

- Transactions page:
  - From (date picker), To (date picker)
  - Broker (dropdown; async options)
  - Apply filters button

- Behavior:
  - Filters are controlled inputs. Changes do not fetch until Apply clicked or alert clicked.
  - Dependent pickers clear downstream selections when parent changes.
  - Persist last-applied filters per tab in URL query params to support deep-linking and refresh.

### Tables

- General:
  - Virtualized rendering for performance with large datasets.
  - Independent pagination per table with "All" option (show all rows without pagination).
  - Column sorting and in-column filtering (required), column resizing (optional v2).
  - Row selection via checkbox, with selection preserved within current data page.
  - Loading (skeleton rows), empty state, and error handling per table.

- Fills page – Columns:
  - checkbox
  - Reconciled (Auto/Manual/No)
  - Side (Buy/Sell)
  - Lots (integer)
  - Price (decimal)
  - Mode (A/M)
  - Final Name (text)
  - Time (time HH:mm:ss, no date)
  - Exc Ref (text)
  - File (path; right-click opens hover menu with options: Open File, Open Folder, Reload File)

- Transactions page – Columns:
  - Client side:
    - checkbox
    - Reconciled (Auto/Manual/No)
    - Trade Date (date)
    - Fund (text)
    - Account (text)
    - Type (text)
    - Contract (text)
    - Market Type (text)
    - Commission (text)
    - c.Period (text)
    - Currency (text)
    - Value (decimal)
    - USD Value (decimal)
    - Lots (integer)
    - From (date)
    - To (date)
    - grace (integer)
    - To + Grace (date)
    - Info (text)
    - Mode (A/M)

  - Broker side:
    - checkbox
    - Reconciled (Auto/Manual/No)
    - Date (date)
    - Fund (text)
    - Account (text)
    - Type (text)
    - Contract (text)
    - Currency (text)
    - Value (decimal)
    - USD Value (decimal)
    - Lots (integer)
    - Info (text)
    - Mode (A/M)
    - File (path; right-click opens hover menu with options: Open File, Open Folder, Reload File)

### Matching Visualization
- Each row includes `matchedIds` (list of matched row IDs on both sides, since many-to-many matching is possible).
- Interaction:
  - Clicking a row highlights all matched rows on both sides.
  - Hovering a row lightly highlights its matches.
  - Show a “Matched: n” indicator in a column or via a chip with tooltip listing IDs.
- Aggregates:
  - For many-to-many, don’t compute totals client-side; optionally display a server-provided `matchGroupId` or `matchSummary` if available (optional v2).
- Status:
  - Reconciled column reflects server status (Auto/Manual/No) - read-only, no manual override needed.

### Data & Domain Rules (server-side, reflected client-side)
- Contract = unique id for Instrument + Expiration (if any) + Strike (if any).
- Fills matching: same triplet (trade_date, account_contract), same side and price; total lots must equal across matched group.
- Transactions matching: same broker; broker’s transaction Date ∈ [From, To + grace] on client transaction (inclusive).
- Client shows server matching only; no client recomputation.

### States & Errors
- Loading spinners/skeletons for alerts, filters options, and tables independently.
- Empty states with contextual copy and “Clear filters” CTA.
- Error banners with retry and diagnostic info (request ID if provided by server).
- Graceful handling of 0 matches, large result sets, and API timeouts.

---

## API Requirements

- REST API only; no static data in front-end.
- Separate mock layer that implements the same interface as the API client but returns mocked responses. The API client must be pure and unaware of mocks.

### Endpoints (proposed)

- Alerts
  - GET `/api/alerts/fills?date=YYYY-MM-DD&brokerId=...&contractId=...&page=1&pageSize=50`
  - GET `/api/alerts/transactions?date=YYYY-MM-DD&brokerId=...&page=1&pageSize=50`

- Filters metadata
  - GET `/api/meta/brokers?q=...&page=1&pageSize=50`
  - GET `/api/meta/accounts?q=...&page=1&pageSize=50`
  - GET `/api/meta/instruments?q=...&page=1&pageSize=50`
  - GET `/api/meta/expirations?instrumentId=...`
  - GET `/api/meta/strikes?instrumentId=...&expirationId=...` (if dropdown is desired)

- Fills data
  - GET `/api/fills/client?date=YYYY-MM-DD&accountId=...&instrumentId=...&expirationId=...&strike=...&page=1&pageSize=100&sort=time:asc`
  - GET `/api/fills/broker?date=YYYY-MM-DD&accountId=...&instrumentId=...&expirationId=...&strike=...&page=1&pageSize=100&sort=time:asc`

- Transactions data
  - GET `/api/transactions/client?from=YYYY-MM-DD&to=YYYY-MM-DD&brokerId=...&page=1&pageSize=100&sort=tradeDate:asc`
  - GET `/api/transactions/broker?from=YYYY-MM-DD&to=YYYY-MM-DD&brokerId=...&page=1&pageSize=100&sort=date:asc`

- Optional (if backend supports):
  - POST `/api/reconciliation/manual` to mark items manual or adjust groups
  - GET `/api/reconciliation/groups?ids=...` to fetch group summaries

### Response Shapes (examples)

- Alerts (fills)
{
  "items": [
    { "id": "af1", "date": "2025-05-12", "brokerId": "b1", "brokerName": "Broker A", "contractId": "c123", "contractName": "ES JUN25 4500" }
  ],
  "page": 1,
  "pageSize": 50,
  "total": 120
}

- Fills row (client/broker)
{
  "id": "fc_1001",
  "reconciled": "Auto", 
  "side": "Buy",
  "lots": 5,
  "price": 4275.25,
  "mode": "A",
  "finalName": "Fund X",
  "time": "14:22:18",
  "excRef": "X12345",
  "file": "/files/fills/2025-05-12/fc_1001.csv",
  "matchedIds": ["fb_9001", "fb_9002"]
}

- Transactions row (client)
{
  "id": "tc_7001",
  "reconciled": "Manual",
  "tradeDate": "2025-05-12",
  "fund": "Fund X",
  "account": "ACC-1",
  "type": "Interest",
  "contract": "ES JUN25 4500",
  "marketType": "Futures",
  "comission": "1.25", 
  "cPeriod": "2025-05",
  "currency": "EUR",
  "value": 1000.50,
  "usdValue": 1080.54,
  "lots": 2,
  "from": "2025-05-10",
  "to": "2025-05-12",
  "grace": 2,
  "toPlusGrace": "2025-05-14",
  "info": "Note...",
  "mode": "M",
  "matchedIds": ["tb_8101"]
}

- Transactions row (broker)
{
  "id": "tb_8101",
  "reconciled": "Auto",
  "date": "2025-05-12",
  "fund": "Fund X",
  "account": "ACC-1",
  "type": "Interest",
  "contract": "ES JUN25 4500",
  "currency": "EUR",
  "value": 1000.50,
  "usdValue": 1080.54,
  "lots": 2,
  "info": "",
  "mode": "A",
  "file": "/files/broker/2025-05-12/tb_8101.csv",
  "matchedIds": ["tc_7001"]
}

- Meta option
{ "id": "b1", "name": "Broker A" }

### Query Params & Pagination
- Common: `page`, `pageSize`, `sort` (e.g., `field:asc|desc`), filter params as specified.
- Return `total` for precise pagination; support cursor-based pagination if needed later.

### Mock Layer
- Standalone module that implements the same interface as the API client and returns promises of mocked data based on query params.
- Should generate realistic distributions:
  - 1–1, 1–many, many–1, many–many matches.
  - Edge cases (zero matches, large groups).
- Selectable via config flag (e.g., environment variable) without changing API client code.

---

## UX/UI Specifications

- **Framework**: React + Material UI (MUI v5+).
- **Tables**: TanStack Table v8 + react-virtual or MUI Data Grid (Community). If Data Grid Pro is acceptable, confirm licensing; otherwise prefer TanStack Table.
- **Data Fetching**: TanStack Query (React Query) with request cancellation, caching, retries.
- **Routing**: React Router v6 (top tabs ↔ routes; second-level tabs ↔ nested routes).
- **Pickers**: MUI X Date Pickers.
- **Layout**: Responsive; alerts pane collapses below 1024px to a drawer; main switches to vertical stacking on narrow widths.
- **Interactions**:
  - Row click selects and highlights matched counterparts.
  - Tooltips for truncated text and statuses.
  - File cells open URL or copy path to clipboard if path-only.
- **Keyboard**:
  - Tab focusable filters and rows; arrow navigation within tables.
  - Enter triggers Apply filters when focused on the button or filters region.
- **Accessibility**:
  - ARIA roles for grids, labeled controls, visible focus states.
  - Color contrast compliant; non-color indicators for matched links.

---

## Performance & Reliability

- Virtualized tables target 100k+ rows with smooth scroll.
- Network:
  - Debounce filter option lookups (300ms).
  - Apply filters triggers fresh queries with cancel of in-flight.
- Caching:
  - Cache metadata (brokers, accounts, instruments) for session with background refresh.
- Observability:
  - Log API latencies, error rates, and filter applications for UX telemetry (no PII).
- Resilience:
  - Graceful degradation if one table fails (show other).

---

## Security

- Auth: Bearer token or cookie-based session; all requests authorized.
- No secrets in client; environment variables via build-time injection.
- Download links signed or proxied by backend if sensitive.

---

## Internationalization & Formatting

- Dates: ISO dates to/from server. Display in exchange timezone.
- Time: HH:mm:ss without date (Fills Time).
- Numbers: Locale-aware formatting with fixed decimals for monetary, integer for lots.
- Currency: Display as provided; no conversion on client (usdValue comes from server).

---

## Testing & Acceptance Criteria

- Unit tests for:
  - Filters state and Apply behavior.
  - Row highlight and matchedIds interactions.
  - URL sync of filters.
- Integration tests (mocked API):
  - Clicking an alert populates filters and triggers fetch with correct params.
  - Fills: Instrument/Expiration/Strike derived from Contract via meta endpoints.
  - Transactions: From/To/Broker set from alert.
  - Tables render correct columns and formats; virtualization active for large datasets.
- Accessibility checks with axe-core.
- Performance checks: render time < 200ms for 5k visible rows; smooth scroll.

---

## Open Questions

- Confirm "Financa" tab naming (should it be "Finance"?). **RESOLVED: Yes, should be "Finance"**
- Is "Comission" column intentionally spelled that way? What exact semantics? **RESOLVED: Should be "Commission"**
- Should "Mode (A/M)" and "Reconciled" be editable, and if so, what backend actions exist? **RESOLVED: No, read-only status from server**
- Are alerts real-time (WebSocket) or polled? If real-time, provide subscription details. **RESOLVED: Alerts pane should be updated via explicit user-initiated polling (refresh button)**
- Timezone: Use exchange timezone, server timezone, or user's local timezone? **RESOLVED: Use exchange timezone**
- Contract decomposition: will backend expose mapping from contractId to instrument/expiration/strike, or must client parse strings? **RESOLVED: Backend will expose it, just need to mock it**
- File columns: will `file` be a URL or filesystem path? If path, should client offer download via backend proxy? **RESOLVED: Path to mounted folder on PC running the website**
- Max expected page sizes and dataset sizes (to tune virtualization/pagination). **RESOLVED: Can be up to 100K rows**
- Any export requirements (CSV/Excel) for current view? **RESOLVED: CSV is enough for now**

---

## Component Architecture & Design Rules

### DRY Methodology & Component Reuse
- **Shared Components**: Create reusable components for common UI patterns:
  - `AlertsPane`: Generic alerts component accepting column configuration and click handlers
  - `FiltersSection`: Generic filters component accepting filter definitions and apply callback
  - `ReconciliationTable`: Generic table component accepting column definitions, data, and selection handlers
  - `FileCell`: Reusable file path display with context menu
  - `StatusChip`: Reusable status indicator for reconciled states
  - `LoadingSkeleton`: Reusable loading states for tables and lists
  - `ErrorBoundary`: Generic error handling wrapper

- **Component Composition**: Use composition over inheritance:
  - Pass configuration objects to customize behavior
  - Use render props or children props for flexible content
  - Implement prop interfaces that allow for type-safe customization

- **Custom Hooks**: Extract reusable logic:
  - `useFilters`: Generic filter state management with URL sync
  - `useAlerts`: Generic alerts fetching and pagination
  - `useTableSelection`: Generic table row selection logic
  - `useMatchedHighlighting`: Generic matched row highlighting logic

### Styling Architecture
- **No Inline Styles**: All styling must be externalized to `.styles.ts` files
- **File Structure**: Each component must have a corresponding styles file:
  ```
  ComponentName/
  ├── ComponentName.tsx
  ├── ComponentName.styles.ts
  ├── ComponentName.types.ts (if needed)
  └── index.ts
  ```

- **Style Patterns**:
  - Use `makeStyles` or `styled` from MUI for component-specific styles
  - Create theme-aware styles using MUI's theme system
  - Use CSS-in-JS for dynamic styles based on props
  - Maintain consistent spacing, colors, and typography through theme tokens

- **Responsive Design**: All components must be responsive:
  - Mobile-first approach with breakpoint-based adaptations
  - Consistent breakpoints: xs (0px), sm (600px), md (900px), lg (1200px), xl (1536px)
  - Alerts pane collapses to drawer on mobile/tablet

### Project Structure & Organization

```
src/
├── components/                    # Shared/reusable components
│   ├── common/                   # Generic UI components
│   │   ├── AlertsPane/
│   │   ├── FiltersSection/
│   │   ├── ReconciliationTable/
│   │   ├── FileCell/
│   │   ├── StatusChip/
│   │   ├── LoadingSkeleton/
│   │   └── ErrorBoundary/
│   ├── layout/                   # Layout components
│   │   ├── AppLayout/
│   │   ├── Navigation/
│   │   └── Sidebar/
│   └── ui/                       # Basic UI elements
│       ├── Button/
│       ├── Input/
│       └── Select/
├── pages/                        # Page-level components
│   ├── dashboard/                # Future: Dashboard page
│   ├── operations/               # Operations section
│   │   ├── OperationsLayout/     # Operations-specific layout
│   │   ├── fills/                # Fills reconciliation
│   │   │   ├── FillsPage/
│   │   │   ├── FillsAlerts/
│   │   │   ├── FillsFilters/
│   │   │   └── FillsTables/
│   │   └── transactions/         # Transactions reconciliation
│   │       ├── TransactionsPage/
│   │       ├── TransactionsAlerts/
│   │       ├── TransactionsFilters/
│   │       └── TransactionsTables/
│   ├── reports/                  # Future: Reports section
│   ├── finance/                  # Future: Finance section
│   └── settings/                 # Future: Settings section
├── hooks/                        # Custom hooks
│   ├── useFilters.ts
│   ├── useAlerts.ts
│   ├── useTableSelection.ts
│   └── useMatchedHighlighting.ts
├── services/                     # API and data services
│   ├── api/                      # API client layer
│   │   ├── client.ts
│   │   ├── alerts.ts
│   │   ├── fills.ts
│   │   ├── transactions.ts
│   │   └── meta.ts
│   └── mocks/                    # Mock data layer
│       ├── mockClient.ts
│       ├── mockAlerts.ts
│       ├── mockFills.ts
│       ├── mockTransactions.ts
│       └── mockMeta.ts
├── types/                        # TypeScript type definitions
│   ├── alerts.ts
│   ├── fills.ts
│   ├── transactions.ts
│   └── common.ts
├── utils/                        # Utility functions
│   ├── dateUtils.ts
│   ├── numberUtils.ts
│   ├── fileUtils.ts
│   └── validationUtils.ts
├── constants/                    # Application constants
│   ├── routes.ts
│   ├── api.ts
│   └── config.ts
└── theme/                        # MUI theme configuration
    ├── theme.ts
    ├── palette.ts
    └── typography.ts
```

### Component Design Patterns

#### Generic Components with Configuration
```typescript
// Example: AlertsPane component
interface AlertsPaneProps<T> {
  columns: ColumnDefinition<T>[];
  data: T[];
  onAlertClick: (alert: T) => void;
  loading?: boolean;
  error?: Error | null;
  className?: string;
}

// Example: FiltersSection component
interface FiltersSectionProps {
  filters: FilterDefinition[];
  values: Record<string, any>;
  onChange: (name: string, value: any) => void;
  onApply: () => void;
  loading?: boolean;
  className?: string;
}

// Example: ReconciliationTable component
interface ReconciliationTableProps<T> {
  columns: ColumnDefinition<T>[];
  data: T[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  onRowClick: (row: T) => void;
  matchedIds?: string[];
  loading?: boolean;
  className?: string;
}
```

#### Style File Pattern
```typescript
// ComponentName.styles.ts
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // Component root styles
  },
  // Other style classes
}));
```

### Code Quality & Standards

#### TypeScript
- Strict TypeScript configuration
- All components must have proper prop interfaces
- Use generic types for reusable components
- Avoid `any` type; use proper typing for all data structures

#### Testing Structure
```
src/
├── __tests__/                    # Test files mirror src structure
│   ├── components/
│   │   ├── common/
│   │   └── layout/
│   ├── pages/
│   │   └── operations/
│   ├── hooks/
│   └── services/
```

#### Import/Export Patterns
- Use barrel exports (index.ts) for clean imports
- Group imports: React, third-party, internal, relative
- Use named exports for components and functions
- Use default exports only for main page components

#### Performance Considerations
- Implement React.memo for expensive components
- Use useMemo and useCallback for expensive computations
- Lazy load routes and heavy components
- Implement proper key props for list rendering

---

## Delivery Plan (Initial Scope)

### Phase 1: Foundation & Structure
1. Set up project structure and folder organization
2. Configure MUI theme and styling architecture
3. Implement shared components (AlertsPane, FiltersSection, ReconciliationTable)
4. Set up routing and navigation structure

### Phase 2: Operations Implementation
1. Implement Operations layout and navigation
2. Build Fills reconciliation page with reusable components
3. Build Transactions reconciliation page with reusable components
4. Implement API client layer with mock provider

### Phase 3: Integration & Polish
1. Integrate all components with proper data flow
2. Implement error handling and loading states
3. Add responsive design and accessibility features
4. Performance optimization and testing

