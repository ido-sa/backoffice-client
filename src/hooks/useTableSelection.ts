import { useState, useCallback } from 'react'

export function useTableSelection() {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const handleSelectionChange = useCallback((ids: string[]) => {
    setSelectedIds(ids)
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedIds([])
  }, [])

  const selectAll = useCallback((allIds: string[]) => {
    setSelectedIds(allIds)
  }, [])

  const selectNone = useCallback(() => {
    setSelectedIds([])
  }, [])

  return {
    selectedIds,
    handleSelectionChange,
    clearSelection,
    selectAll,
    selectNone,
  }
}
