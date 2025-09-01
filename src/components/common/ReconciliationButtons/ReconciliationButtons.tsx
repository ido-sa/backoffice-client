import React from 'react'
import { Stack } from '@mui/material'
import { 
  StyledReconciliationContainer, 
  StyledMatchButton, 
  StyledUnmatchButton 
} from './ReconciliationButtons.styles'

interface ReconciliationButtonsProps {
  canMatch: boolean
  canUnmatch: boolean
  onMatch: () => void
  onUnmatch: () => void
  loading?: boolean
}

const ReconciliationButtons: React.FC<ReconciliationButtonsProps> = ({
  canMatch,
  canUnmatch,
  onMatch,
  onUnmatch,
  loading = false,
}) => {
  return (
    <StyledReconciliationContainer>
      <Stack direction="row" spacing={2} justifyContent="center">
        <StyledMatchButton
          variant="contained"
          color="primary"
          onClick={onMatch}
          disabled={!canMatch || loading}
        >
          Match
        </StyledMatchButton>
        <StyledUnmatchButton
          variant="outlined"
          color="secondary"
          onClick={onUnmatch}
          disabled={!canUnmatch || loading}
        >
          Unmatch
        </StyledUnmatchButton>
      </Stack>
    </StyledReconciliationContainer>
  )
}

export default ReconciliationButtons
