import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FilterDefinition } from '@/types/common'

interface UseFiltersProps {
  filters: FilterDefinition[]
  onApply: (values: Record<string, any>) => void
}

export function useFilters({ filters, onApply }: UseFiltersProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [values, setValues] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(false)

  // Initialize values from URL params
  useEffect(() => {
    const initialValues: Record<string, any> = {}
    filters.forEach(filter => {
      const paramValue = searchParams.get(filter.name)
      if (paramValue !== null) {
        initialValues[filter.name] = paramValue
      }
    })
    setValues(initialValues)
  }, [filters, searchParams])

  const handleChange = useCallback((name: string, value: any) => {
    setValues(prev => {
      const newValues = { ...prev, [name]: value }
      
      // Clear dependent filters when parent changes
      const dependentFilters = filters.filter(f => f.dependentOn === name)
      dependentFilters.forEach(filter => {
        delete newValues[filter.name]
      })
      
      return newValues
    })
  }, [filters])

  const handleApply = useCallback(async () => {
    setLoading(true)
    try {
      // Update URL params
      const newSearchParams = new URLSearchParams()
      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          newSearchParams.set(key, String(value))
        }
      })
      setSearchParams(newSearchParams)
      
      // Call the apply callback
      await onApply(values)
    } finally {
      setLoading(false)
    }
  }, [values, onApply, setSearchParams])

  const clearFilters = useCallback(() => {
    setValues({})
    setSearchParams({})
  }, [setSearchParams])

  return {
    values,
    loading,
    handleChange,
    handleApply,
    clearFilters,
  }
}
