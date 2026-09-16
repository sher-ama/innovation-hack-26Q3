import { useCallback, useEffect, useRef, useState } from 'react'

import { fetchFaqEntries } from '../api/chatClient'
import type { FaqEntryDto } from '../types/chat'

let faqRequestInFlight: Promise<FaqEntryDto[]> | null = null

async function fetchFaqEntriesWithDedupe() {
  if (!faqRequestInFlight) {
    faqRequestInFlight = fetchFaqEntries()
      .then((result) => result.entries)
      .finally(() => {
        faqRequestInFlight = null
      })
  }

  return faqRequestInFlight
}

export function useFaq() {
  const [entries, setEntries] = useState<FaqEntryDto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isMountedRef = useRef(true)
  const isLoadingRef = useRef(false)

  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
    }
  }, [])

  const loadFaq = useCallback(async () => {
    if (isLoadingRef.current || !isMountedRef.current) {
      return
    }

    isLoadingRef.current = true
    setError(null)
    setIsLoading(true)

    try {
      const nextEntries = await fetchFaqEntriesWithDedupe()
      if (isMountedRef.current) {
        setEntries(nextEntries)
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError(err instanceof Error ? err.message : 'Unable to load FAQ entries')
      }
    } finally {
      isLoadingRef.current = false
      if (isMountedRef.current) {
        setIsLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    void loadFaq()
  }, [loadFaq])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    entries,
    isLoading,
    error,
    loadFaq,
    clearError,
    setEntries,
  }
}