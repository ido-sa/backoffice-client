# Backoffice Client

A React-based backoffice client for algo-trading operations, built with Vite, TypeScript, and Material-UI.

## Features

- **Fills Reconciliation**: Side-by-side comparison of client vs broker fills
- **Transactions Reconciliation**: Side-by-side comparison of client vs broker transactions
- **Alerts Pane**: Real-time alerts for reconciliation issues
- **Advanced Filtering**: Date, account, instrument, expiration, strike, and broker filters
- **Row Highlighting**: Visual matching of related records across tables
- **Responsive Design**: Mobile-friendly layout with collapsible alerts pane

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI) v5
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router v6
- **Date Handling**: MUI X Date Pickers with date-fns
- **Styling**: MUI's system with CSS-in-JS

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Generic components (AlertsPane, StatusChip, etc.)
│   ├── layout/          # Layout components (AppLayout, OperationsLayout)
│   └── ui/              # Basic UI elements
├── pages/               # Page-level components
│   └── operations/      # Operations section
│       ├── fills/       # Fills reconciliation
│       └── transactions/ # Transactions reconciliation
├── hooks/               # Custom React hooks
├── services/            # API and data services
│   ├── api/            # API client layer
│   └── mocks/          # Mock data layer
├── types/               # TypeScript type definitions
├── constants/           # Application constants
└── theme/              # MUI theme configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd backoffice-client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3001
VITE_USE_MOCK_DATA=true
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Features in Detail

### Fills Reconciliation

- **Alerts**: Shows reconciliation alerts with date, broker, and contract information
- **Filters**: Date picker, account dropdown, instrument/expiration/strike cascading dropdowns
- **Tables**: Side-by-side client and broker fills with matching visualization
- **Columns**: Reconciled status, side, lots, price, mode, final name, time, exc ref, file

### Transactions Reconciliation

- **Alerts**: Shows transaction alerts with date and broker information
- **Filters**: Date range pickers and broker dropdown
- **Tables**: Side-by-side client and broker transactions with matching visualization
- **Columns**: Comprehensive transaction data including fund, account, type, contract, values, etc.

### Matching Visualization

- Click on any row to highlight all matched records across both tables
- Visual feedback with hover states
- Support for many-to-many matching relationships

### Responsive Design

- Alerts pane collapses to drawer on mobile/tablet
- Tables stack vertically on narrow screens
- Touch-friendly interactions

## API Integration

The application is designed to work with a REST API. Currently, it uses mock data for development. To integrate with a real API:

1. Set `VITE_USE_MOCK_DATA=false` in your environment variables
2. Update the API endpoints in `src/constants/api.ts`
3. Implement the real API client in `src/services/api/`

### Mock Data

The mock layer provides realistic test data including:
- Various reconciliation statuses (Auto, Manual, No)
- Different matching scenarios (1-1, 1-many, many-1, many-many)
- Edge cases and large datasets
- Realistic financial data

## Development

### Code Style

- TypeScript with strict configuration
- ESLint for code quality
- Prettier for formatting
- Component-based architecture with proper separation of concerns

### Testing

- Unit tests for components and hooks
- Integration tests for data flow
- Accessibility testing with axe-core

### Performance

- Virtualized tables for large datasets
- React Query for efficient data fetching and caching
- Optimized re-renders with React.memo and useMemo

## Contributing

1. Follow the existing code style and patterns
2. Add TypeScript types for all new features
3. Include tests for new functionality
4. Update documentation as needed

## License

[Add your license information here]
