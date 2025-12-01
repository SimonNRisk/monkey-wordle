const OUTCOME_KEY = 'monkey-wordle-outcome'

type Outcome = 'success' | 'failure'

interface StoredOutcome {
  outcome: Outcome
  puzzleDate: string
}

export function localStorageGetOutcome(currentPuzzleDate: string | null): Outcome | null {
  if (typeof window === 'undefined') return null
  if (!currentPuzzleDate) return null

  const stored = localStorage.getItem(OUTCOME_KEY)
  if (!stored) return null

  try {
    const data: StoredOutcome = JSON.parse(stored)
    // If puzzle date doesn't match, clear and return null
    if (data.puzzleDate !== currentPuzzleDate) {
      localStorageClearOutcome()
      return null
    }
    return data.outcome || null
  } catch {
    return null
  }
}

export function localStorageSetOutcome(outcome: Outcome, puzzleDate: string): void {
  if (typeof window !== 'undefined') {
    const data: StoredOutcome = { outcome, puzzleDate }
    localStorage.setItem(OUTCOME_KEY, JSON.stringify(data))
  }
}

export function localStorageClearOutcome(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(OUTCOME_KEY)
  }
}
