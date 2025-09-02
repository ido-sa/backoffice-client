import React from 'react'
import {
  Grid,
  Alert,
} from '@mui/material'
import { FinanceSummary as FinanceSummaryType } from '@/types/finance'
import {
  StyledContainer,
  StyledTitle,
  StyledCard,
  StyledCardContent,
  StyledLabel,
  StyledValue,
  StyledSkeleton,
} from './FinanceSummary.styles'

interface FinanceSummaryProps {
  summary?: FinanceSummaryType
  loading?: boolean
  error?: Error | null
}

const FinanceSummary: React.FC<FinanceSummaryProps> = ({
  summary,
  loading = false,
  error,
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value)
  }

  const summaryItems = [
    {
      label: 'Balance at the beginning of period',
      value: summary?.balanceAtStart,
      key: 'balanceAtStart',
    },
    {
      label: 'Balance at the end of period',
      value: summary?.balanceAtEnd,
      key: 'balanceAtEnd',
    },
    {
      label: 'Net receivables at the beginning of period',
      value: summary?.netReceivablesAtStart,
      key: 'netReceivablesAtStart',
    },
    {
      label: 'Net receivables at the end of period',
      value: summary?.netReceivablesAtEnd,
      key: 'netReceivablesAtEnd',
    },
    {
      label: 'Withdrawals for period',
      value: summary?.withdrawals,
      key: 'withdrawals',
    },
    {
      label: 'Net profit and loss for period',
      value: summary?.netProfitLoss,
      key: 'netProfitLoss',
    },
    {
      label: 'Financing profit and loss for period',
      value: summary?.financingProfitLoss,
      key: 'financingProfitLoss',
    },
    {
      label: 'Total profit and loss for period',
      value: summary?.totalProfitLoss,
      key: 'totalProfitLoss',
    },
  ]

  if (error) {
    return (
      <StyledContainer>
        <Alert severity="error">
          Failed to load summary data: {error.message}
        </Alert>
      </StyledContainer>
    )
  }

  return (
    <StyledContainer>
      <StyledTitle variant="h6">
        Summary
      </StyledTitle>
      
      <Grid container spacing={2}>
        {summaryItems.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.key}>
            <StyledCard>
              <StyledCardContent>
                <StyledLabel 
                  variant="body2" 
                  color="text.secondary"
                >
                  {item.label}
                </StyledLabel>
                {loading ? (
                  <StyledSkeleton 
                    variant="text" 
                    width="60%" 
                    height={32}
                  />
                ) : (
                  <StyledValue 
                    variant="h6"
                  >
                    {item.value !== undefined ? formatCurrency(item.value) : 'N/A'}
                  </StyledValue>
                )}
              </StyledCardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </StyledContainer>
  )
}

export default FinanceSummary
