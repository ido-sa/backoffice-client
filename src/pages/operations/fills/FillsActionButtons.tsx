import React from 'react'
import { Stack, Button } from '@mui/material'
import {
  StyledActionButtonsContainer,
  StyledLeftButtonGroup,
  StyledCenterButtonGroup,
  StyledRightButtonGroup,
  StyledActionButton,
} from './FillsActionButtons.styles'

interface FillsActionButtonsProps {
  canMatch: boolean
  canUnmatch: boolean
  onMatch: () => void
  onUnmatch: () => void
  onClientAdd: () => void
  onClientRemove: () => void
  onClientRestore: () => void
  onClientCopyToBroker: () => void
  onBrokerAdd: () => void
  onBrokerRemove: () => void
  onBrokerRestore: () => void
  onBrokerCopyToFinal: () => void
  loading?: boolean
}

const FillsActionButtons: React.FC<FillsActionButtonsProps> = ({
  canMatch,
  canUnmatch,
  onMatch,
  onUnmatch,
  onClientAdd,
  onClientRemove,
  onClientRestore,
  onClientCopyToBroker,
  onBrokerAdd,
  onBrokerRemove,
  onBrokerRestore,
  onBrokerCopyToFinal,
  loading = false,
}) => {
  return (
    <StyledActionButtonsContainer>
      {/* Left side buttons - above Client's fills */}
      <StyledLeftButtonGroup>
        <Stack direction="row" spacing={1}>
          <StyledActionButton
            variant="outlined"
            size="small"
            onClick={onClientAdd}
            disabled={loading}
          >
            Add
          </StyledActionButton>
          <StyledActionButton
            variant="outlined"
            size="small"
            onClick={onClientRemove}
            disabled={loading}
          >
            Remove
          </StyledActionButton>
          <StyledActionButton
            variant="outlined"
            size="small"
            onClick={onClientRestore}
            disabled={loading}
          >
            Restore
          </StyledActionButton>
          <StyledActionButton
            variant="outlined"
            size="small"
            onClick={onClientCopyToBroker}
            disabled={loading}
          >
            Copy to Broker
          </StyledActionButton>
        </Stack>
      </StyledLeftButtonGroup>

      {/* Center buttons - Match/Unmatch */}
      <StyledCenterButtonGroup>
        <Stack direction="row" spacing={2}>
          <StyledActionButton
            variant="contained"
            color="primary"
            onClick={onMatch}
            disabled={!canMatch || loading}
          >
            Match
          </StyledActionButton>
          <StyledActionButton
            variant="outlined"
            color="secondary"
            onClick={onUnmatch}
            disabled={!canUnmatch || loading}
          >
            Unmatch
          </StyledActionButton>
        </Stack>
      </StyledCenterButtonGroup>

      {/* Right side buttons - above Broker's fills */}
      <StyledRightButtonGroup>
        <Stack direction="row" spacing={1}>
          <StyledActionButton
            variant="outlined"
            size="small"
            onClick={onBrokerAdd}
            disabled={loading}
          >
            Add
          </StyledActionButton>
          <StyledActionButton
            variant="outlined"
            size="small"
            onClick={onBrokerRemove}
            disabled={loading}
          >
            Remove
          </StyledActionButton>
          <StyledActionButton
            variant="outlined"
            size="small"
            onClick={onBrokerRestore}
            disabled={loading}
          >
            Restore
          </StyledActionButton>
          <StyledActionButton
            variant="outlined"
            size="small"
            onClick={onBrokerCopyToFinal}
            disabled={loading}
          >
            Copy to Final
          </StyledActionButton>
        </Stack>
      </StyledRightButtonGroup>
    </StyledActionButtonsContainer>
  )
}

export default FillsActionButtons
