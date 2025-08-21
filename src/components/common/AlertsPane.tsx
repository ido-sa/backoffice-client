import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material'
import { ColumnDefinition } from '@/types/common'

interface AlertsPaneProps<T> {
  columns: ColumnDefinition<T>[]
  data: T[]
  onAlertClick: (alert: T) => void
  loading?: boolean
  error?: Error | null
  className?: string
  title?: string
}

function AlertsPane<T>({
  columns,
  data,
  onAlertClick,
  loading = false,
  error = null,
  title = 'Alerts',
}: AlertsPaneProps<T>) {
  if (error) {
    return (
      <Paper sx={{ p: 2, height: '100%' }}>
        <Alert severity="error">
          {error.message}
        </Alert>
      </Paper>
    )
  }

  return (
    <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : data.length === 0 ? (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography color="text.secondary">
              No alerts found
            </Typography>
          </Box>
        ) : (
          <>
            {/* Column Headers */}
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', backgroundColor: 'grey.50' }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {columns.map((column) => (
                  <Typography key={String(column.id)} variant="subtitle2" sx={{ fontWeight: 'bold', flex: 1 }}>
                    {column.header}
                  </Typography>
                ))}
              </Box>
            </Box>
            
            <List sx={{ p: 0 }}>
              {data.map((item, index) => (
              <ListItem
                key={index}
                button
                onClick={() => onAlertClick(item)}
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      {columns.map((column) => (
                        <Typography key={String(column.id)} variant="body2" sx={{ flex: 1 }}>
                          {String(item[column.accessorKey])}
                        </Typography>
                      ))}
                    </Box>
                  }
                />
              </ListItem>
            ))}
            </List>
          </>
        )}
      </Box>
    </Paper>
  )
}

export default AlertsPane
