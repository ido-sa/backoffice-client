import React from 'react'
import { Stack, Switch, FormControlLabel } from '@mui/material'
import {
  StyledActionButtonsContainer,
  StyledButtonRow,
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
  onAdd: () => void
  onRemove: () => void
  onRestore: () => void
  onClientCopyToBroker: () => void
  onBrokerCopyToFinal: () => void
  showRemoved: boolean
  onShowRemovedChange: (show: boolean) => void
  loading?: boolean
}

const FillsActionButtons: React.FC<FillsActionButtonsProps> = ({
  canMatch,
  canUnmatch,
  onMatch,
  onUnmatch,
  onAdd,
  onRemove,
  onRestore,
  onClientCopyToBroker,
  onBrokerCopyToFinal,
  showRemoved,
  onShowRemovedChange,
  loading = false,
}) => {
  return (
    <StyledActionButtonsContainer>
      {/* Row 1: Add, Remove, Restore, Show Removed (center) + Copy buttons (left/right) */}
      <StyledButtonRow>
        {/* Left: Copy to Broker */}
        <StyledLeftButtonGroup>
          <StyledActionButton
            variant="outlined"
            size="small"
            onClick={onClientCopyToBroker}
            disabled={loading}
          >
            Copy to Broker
          </StyledActionButton>
        </StyledLeftButtonGroup>

        {/* Center: Add, Remove, Restore, Show Removed */}
        <StyledCenterButtonGroup>
          <Stack direction="row" spacing={1} alignItems="center">
            <StyledActionButton
              variant="outlined"
              size="small"
              onClick={onAdd}
              disabled={loading}
            >
              Add
            </StyledActionButton>
            <StyledActionButton
              variant="outlined"
              size="small"
              onClick={onRemove}
              disabled={loading}
            >
              Remove
            </StyledActionButton>
            <StyledActionButton
              variant="outlined"
              size="small"
              onClick={onRestore}
              disabled={loading}
            >
              Restore
            </StyledActionButton>
            <FormControlLabel
              control={
                <Switch
                  checked={showRemoved}
                  onChange={(e) => onShowRemovedChange(e.target.checked)}
                  size="small"
                />
              }
              label="Show Removed"
              labelPlacement="end"
            />
          </Stack>
        </StyledCenterButtonGroup>

        {/* Right: Copy to Final */}
        <StyledRightButtonGroup>
          <StyledActionButton
            variant="outlined"
            size="small"
            onClick={onBrokerCopyToFinal}
            disabled={loading}
          >
            Copy to Final
          </StyledActionButton>
        </StyledRightButtonGroup>
      </StyledButtonRow>

      {/* Row 2: Match/Unmatch (center) */}
      <StyledButtonRow>
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
      </StyledButtonRow>
    </StyledActionButtonsContainer>
  )
}

export default FillsActionButtons
