import {
  ListItemText,
  CircularProgress,
  Alert,
  Typography,
} from '@mui/material'
import { ColumnDefinition } from '@/types/common'
import {
  StyledErrorPaper,
  StyledMainPaper,
  StyledContentBox,
  StyledLoadingBox,
  StyledEmptyBox,
  StyledHeaderBox,
  StyledHeaderContentBox,
  StyledHeaderText,
  StyledList,
  StyledListItem,
  StyledListItemContentBox,
  StyledListItemText,
} from './AlertsPane.styles'

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

}: AlertsPaneProps<T>) {
  if (error) {
    return (
      <StyledErrorPaper>
        <Alert severity="error">
          {error.message}
        </Alert>
      </StyledErrorPaper>
    )
  }

  return (
    <StyledMainPaper>
      <StyledContentBox>
        {loading ? (
          <StyledLoadingBox>
            <CircularProgress />
          </StyledLoadingBox>
        ) : data.length === 0 ? (
          <StyledEmptyBox>
            <Typography color="text.secondary">
              No alerts found
            </Typography>
          </StyledEmptyBox>
        ) : (
          <>
            {/* Column Headers */}
            <StyledHeaderBox>
              <StyledHeaderContentBox>
                {columns.map((column) => (
                  <StyledHeaderText key={String(column.id)} variant="subtitle2">
                    {column.header}
                  </StyledHeaderText>
                ))}
              </StyledHeaderContentBox>
            </StyledHeaderBox>
            
            <StyledList>
              {data.map((item, index) => (
              <StyledListItem
                key={index}
                onClick={() => onAlertClick(item)}
              >
                <ListItemText
                  primary={
                    <StyledListItemContentBox>
                      {columns.map((column) => (
                        <StyledListItemText key={String(column.id)} variant="body2">
                          {String(item[column.accessorKey])}
                        </StyledListItemText>
                      ))}
                    </StyledListItemContentBox>
                  }
                />
              </StyledListItem>
            ))}
            </StyledList>
          </>
        )}
      </StyledContentBox>
    </StyledMainPaper>
  )
}

export default AlertsPane
