import { useState, useEffect, useCallback } from 'react'
import { STORAGE_KEY } from '../constants'

export function useProspects() {
  const [prospects, setProspects] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prospects))
  }, [prospects])

  const addProspect = useCallback((entry) => {
    const newEntry = {
      ...entry,
      id: crypto.randomUUID(),
      submittedAt: new Date().toLocaleString('id-ID'),
    }
    setProspects(prev => [newEntry, ...prev])
  }, [])

  const clearAll = useCallback(() => setProspects([]), [])

  return { prospects, addProspect, clearAll }
}
