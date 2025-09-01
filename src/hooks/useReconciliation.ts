import { useState, useCallback } from 'react'
import { FillRow } from '@/types/fills'
import { ClientTransactionRow, BrokerTransactionRow } from '@/types/transactions'

export interface ReconciliationState {
  selectedClientIds: string[]
  selectedBrokerIds: string[]
  isMatchedGroup: boolean
  canMatch: boolean
  canUnmatch: boolean
}

export const useReconciliation = <T extends FillRow | ClientTransactionRow | BrokerTransactionRow>(
  clientData: T[],
  brokerData: T[]
) => {
  const [selectedClientIds, setSelectedClientIds] = useState<string[]>([])
  const [selectedBrokerIds, setSelectedBrokerIds] = useState<string[]>([])

  // Check if current selection is a matched group
  const isMatchedGroup = useCallback(() => {
    if (selectedClientIds.length === 0 && selectedBrokerIds.length === 0) return false
    
    // Check if all selected items are part of the same matched group
    const allSelectedIds = [...selectedClientIds, ...selectedBrokerIds]
    const allData = [...clientData, ...brokerData]
    
    // Find the matched group by looking at the first selected item's matchedIds
    const firstSelectedItem = allData.find(item => allSelectedIds.includes(item.id))
    if (!firstSelectedItem || firstSelectedItem.matchedIds.length === 0) return false
    
    const matchedGroupIds = [firstSelectedItem.id, ...firstSelectedItem.matchedIds]
    
    // Check if all selected items are part of this matched group
    return allSelectedIds.every(id => matchedGroupIds.includes(id))
  }, [selectedClientIds, selectedBrokerIds, clientData, brokerData])

  // Check if we can match (at least one "No" fill from each side)
  const canMatch = useCallback(() => {
    if (selectedClientIds.length === 0 || selectedBrokerIds.length === 0) return false
    
    const selectedClientItems = clientData.filter(item => selectedClientIds.includes(item.id))
    const selectedBrokerItems = brokerData.filter(item => selectedBrokerIds.includes(item.id))
    
    // All selected items must be "No" status
    const allClientNo = selectedClientItems.every(item => item.reconciled === 'No')
    const allBrokerNo = selectedBrokerItems.every(item => item.reconciled === 'No')
    
    return allClientNo && allBrokerNo
  }, [selectedClientIds, selectedBrokerIds, clientData, brokerData])

  // Check if we can unmatch (matched group selected)
  const canUnmatch = useCallback(() => {
    return isMatchedGroup()
  }, [isMatchedGroup])

  const handleRowSelection = useCallback((row: T, side: 'client' | 'broker', isUnchecking = false) => {
    const matchedIds = row.matchedIds || []
    
    if (row.reconciled === 'Auto' || row.reconciled === 'Manual') {
      if (isUnchecking) {
        // For unchecking matched fills, clear the entire group
        setSelectedClientIds([])
        setSelectedBrokerIds([])
      } else {
        // For matched fills, select the entire group
        const allMatchedIds = [row.id, ...matchedIds]
        
        // Clear previous selections
        setSelectedClientIds([])
        setSelectedBrokerIds([])
        
        // Select all matched rows on both sides
        allMatchedIds.forEach(id => {
          const clientItem = clientData.find(item => item.id === id)
          const brokerItem = brokerData.find(item => item.id === id)
          
          if (clientItem) {
            setSelectedClientIds(prev => [...prev, id])
          }
          if (brokerItem) {
            setSelectedBrokerIds(prev => [...prev, id])
          }
        })
      }
    } else if (row.reconciled === 'No') {
      // For "No" fills, clear any matched group selections and toggle this item
      if (isMatchedGroup()) {
        setSelectedClientIds([])
        setSelectedBrokerIds([])
      }
      
      if (side === 'client') {
        setSelectedClientIds(prev => 
          prev.includes(row.id) 
            ? prev.filter(id => id !== row.id)
            : [...prev, row.id]
        )
      } else {
        setSelectedBrokerIds(prev => 
          prev.includes(row.id) 
            ? prev.filter(id => id !== row.id)
            : [...prev, row.id]
        )
      }
    }
  }, [clientData, brokerData, isMatchedGroup])

  const clearSelection = useCallback(() => {
    setSelectedClientIds([])
    setSelectedBrokerIds([])
  }, [])

  const isSelected = useCallback((id: string) => {
    return selectedClientIds.includes(id) || selectedBrokerIds.includes(id)
  }, [selectedClientIds, selectedBrokerIds])

  return {
    selectedClientIds,
    selectedBrokerIds,
    isMatchedGroup: isMatchedGroup(),
    canMatch: canMatch(),
    canUnmatch: canUnmatch(),
    handleRowSelection,
    clearSelection,
    isSelected,
  }
}
