import React, { useState } from 'react'
import {
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material'
import { MoreVert as MoreVertIcon } from '@mui/icons-material'
import {
  StyledContainer,
  StyledFilePath,
  StyledIconButton,
} from './FileCell.styles'

interface FileCellProps {
  filePath?: string
}

const FileCell: React.FC<FileCellProps> = ({ filePath }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  if (!filePath) {
    return <StyledFilePath color="text.secondary">-</StyledFilePath>
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleOpenFile = () => {
    // In a real implementation, this would open the file
    console.log('Opening file:', filePath)
    handleMenuClose()
  }

  const handleOpenFolder = () => {
    // In a real implementation, this would open the folder
    console.log('Opening folder for:', filePath)
    handleMenuClose()
  }

  const handleReloadFile = () => {
    // In a real implementation, this would reload the file
    console.log('Reloading file:', filePath)
    handleMenuClose()
  }

  const handleCopyPath = () => {
    navigator.clipboard.writeText(filePath)
    handleMenuClose()
  }

  return (
    <StyledContainer>
      <StyledFilePath variant="body2">
        {filePath}
      </StyledFilePath>
      
      <Tooltip title="File actions">
        <StyledIconButton
          size="small"
          onClick={handleMenuOpen}
        >
          <MoreVertIcon fontSize="small" />
        </StyledIconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleOpenFile}>Open File</MenuItem>
        <MenuItem onClick={handleOpenFolder}>Open Folder</MenuItem>
        <MenuItem onClick={handleReloadFile}>Reload File</MenuItem>
        <MenuItem onClick={handleCopyPath}>Copy Path</MenuItem>
      </Menu>
    </StyledContainer>
  )
}

export default FileCell
