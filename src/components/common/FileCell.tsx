import React, { useState } from 'react'
import {
  Box,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
} from '@mui/material'
import { MoreVert as MoreVertIcon } from '@mui/icons-material'

interface FileCellProps {
  filePath?: string
}

const FileCell: React.FC<FileCellProps> = ({ filePath }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  if (!filePath) {
    return <Typography color="text.secondary">-</Typography>
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
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography
        variant="body2"
        sx={{
          fontFamily: 'monospace',
          fontSize: '0.75rem',
          maxWidth: 200,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {filePath}
      </Typography>
      
      <Tooltip title="File actions">
        <IconButton
          size="small"
          onClick={handleMenuOpen}
          sx={{ p: 0.5 }}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
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
    </Box>
  )
}

export default FileCell
