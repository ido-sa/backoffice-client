import React from 'react'
import { Box, Typography, Paper } from '@mui/material'

const BalanceSheetPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Balance Sheet
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Balance Sheet analysis page - Coming Soon
        </Typography>
      </Paper>
    </Box>
  )
}

export default BalanceSheetPage
