import React from 'react'
import { Chip } from '@mui/material'
import { ReconciledStatus } from '@/types/common'

interface StatusChipProps {
  status: ReconciledStatus
  size?: 'small' | 'medium'
}

const StatusChip: React.FC<StatusChipProps> = ({ status, size = 'small' }) => {
  const getStatusConfig = (status: ReconciledStatus) => {
    switch (status) {
      case 'Auto':
        return { color: 'success' as const, label: 'Auto' }
      case 'Manual':
        return { color: 'warning' as const, label: 'Manual' }
      case 'No':
        return { color: 'error' as const, label: 'No' }
      default:
        return { color: 'default' as const, label: status }
    }
  }

  const config = getStatusConfig(status)

  return (
    <Chip
      label={config.label}
      color={config.color}
      size={size}
      variant="outlined"
    />
  )
}

export default StatusChip
