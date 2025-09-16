import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Box,
  CircularProgress,
  Autocomplete,
} from '@mui/material'
import { FilterOption } from '@/types/common'
import { FillAddRequest, FillFilters } from '@/types/fills'
import { useQuery } from '@tanstack/react-query'
import MockClient from '@/services/mocks/mockClient'
import {
  StyledModalContent,
  StyledFormSection,
  StyledButtonGroup,
} from './FillAddModal.styles'

const mockClient = new MockClient()

interface FillAddModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (request: FillAddRequest) => void
  loading?: boolean
  filters: FillFilters
}

const FillAddModal: React.FC<FillAddModalProps> = ({
  open,
  onClose,
  onSubmit,
  loading = false,
  filters,
}) => {
  const [formData, setFormData] = useState<FillAddRequest>({
    side: 'client',
    lots: 1,
    price: 0,
    finalName: '',
    time: new Date().toTimeString().split(' ')[0],
    excRef: '',
    file: undefined,
    date: filters.date,
    account: filters.account || '',
    instrument: filters.instrument || '', // Will be set from dropdown
    expiration: filters.expiration,
    strike: filters.strike,
  })

  // Fetch instruments for the dropdown
  // Fetch final names based on instrument from filters
  const finalNamesQuery = useQuery({
    queryKey: ['finalNames', filters.instrument],
    queryFn: () => mockClient.getFinalNames(filters.instrument || ''),
    enabled: !!filters.instrument, // Only fetch when instrument is selected in filters
  })


  const handleInputChange = (field: keyof FillAddRequest, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = () => {
    // Basic validation - finalName is required and instrument must be selected in filters
    if (!filters.instrument || !formData.finalName.trim()) {
      return
    }
    onSubmit(formData)
  }

  const handleClose = () => {
    if (!loading) {
      onClose()
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Add New Fill</DialogTitle>
      <DialogContent>
        <StyledModalContent>
          {/* Side Selection */}
          <StyledFormSection>
            <FormControl component="fieldset">
              <FormLabel component="legend">Side</FormLabel>
              <RadioGroup
                row
                value={formData.side}
                onChange={(e) => handleInputChange('side', e.target.value)}
              >
                <FormControlLabel value="client" control={<Radio />} label="Client" />
                <FormControlLabel value="broker" control={<Radio />} label="Broker" />
              </RadioGroup>
            </FormControl>
          </StyledFormSection>


          {/* Fill Details */}
          <StyledFormSection>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Lots"
                  type="number"
                  value={formData.lots}
                  onChange={(e) => handleInputChange('lots', parseInt(e.target.value) || 0)}
                  inputProps={{ min: 1 }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                  inputProps={{ step: 0.01, min: 0 }}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  fullWidth
                  options={finalNamesQuery.data || []}
                  value={formData.finalName}
                  onChange={(event, newValue) => handleInputChange('finalName', newValue || '')}
                  onInputChange={(event, newInputValue) => handleInputChange('finalName', newInputValue)}
                  disabled={!filters.instrument || finalNamesQuery.isLoading}
                  loading={finalNamesQuery.isLoading}
                  freeSolo={false}
                  openOnFocus
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Final Name"
                      required
                      placeholder={!filters.instrument ? "Select an instrument in filters first" : "Select final name"}
                      helperText={!filters.instrument ? "Select an instrument in the page filters to see final name options" : ""}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {finalNamesQuery.isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Exchange Reference (Optional)"
                  value={formData.excRef}
                  onChange={(e) => handleInputChange('excRef', e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="File (Optional)"
                  value={formData.file || ''}
                  onChange={(e) => handleInputChange('file', e.target.value || undefined)}
                />
              </Grid>
            </Grid>
          </StyledFormSection>


          {/* Filter Context (Read-only) */}
          <StyledFormSection>
            <Box>
              <strong>Filter Context:</strong>
              <Box sx={{ mt: 1, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>Date: {formData.date}</Grid>
                  <Grid item xs={6}>Account: {formData.account || 'Any'}</Grid>
                  <Grid item xs={6}>Instrument: {formData.instrument || 'Any'}</Grid>
                  <Grid item xs={6}>Expiration: {formData.expiration || 'Any'}</Grid>
                  <Grid item xs={6}>Strike: {formData.strike || 'Any'}</Grid>
                </Grid>
              </Box>
            </Box>
          </StyledFormSection>
        </StyledModalContent>
      </DialogContent>
      <DialogActions>
        <StyledButtonGroup>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading || !filters.instrument || !formData.finalName.trim()}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Adding...' : 'Add Fill'}
          </Button>
        </StyledButtonGroup>
      </DialogActions>
    </Dialog>
  )
}

export default FillAddModal
