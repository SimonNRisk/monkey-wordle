import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { localStorageGetOutcome, localStorageSetOutcome } from '@/lib/outcomeStorage'

type Outcome = 'success' | 'failure'
type useOutcomeReturn = [Outcome | null, Dispatch<SetStateAction<Outcome | null>>]

export function useOutcome(puzzleDate: string | null): useOutcomeReturn {
  const [outcome, setOutcome] = useState<Outcome | null>(() => {
    if (!puzzleDate) return null
    return localStorageGetOutcome(puzzleDate) ?? null
  })

  // Re-check storage when puzzleDate changes
  useEffect(() => {
    if (puzzleDate) {
      const storedOutcome = localStorageGetOutcome(puzzleDate)
      setOutcome(storedOutcome)
    } else {
      setOutcome(null)
    }
  }, [puzzleDate])

  useEffect(() => {
    if (outcome !== null && puzzleDate) {
      localStorageSetOutcome(outcome, puzzleDate)
    }
  }, [outcome, puzzleDate])

  return [outcome, setOutcome]
}
