import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { localStorageGetOutcome, localStorageSetOutcome } from '@/lib/outcomeStorage'

type Outcome = 'success' | 'failure'
type useOutcomeReturn = [Outcome | null, Dispatch<SetStateAction<Outcome | null>>]

export function useOutcome(): useOutcomeReturn {
  const [outcome, setOutcome] = useState<Outcome | null>(() => {
    const storedOutcome = localStorageGetOutcome()
    return storedOutcome ?? null
  })

  useEffect(() => {
    if (outcome !== null) {
      localStorageSetOutcome(outcome)
    }
  }, [outcome])

  return [outcome, setOutcome]
}
