import React from 'react'
import { Box, Typography, Paper } from '@mui/material'

const CashFlowPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Cash Flow
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Cash Flow analysis page - Coming Soon
        </Typography>
      </Paper>
    </Box>
  )
}

export default CashFlowPage
