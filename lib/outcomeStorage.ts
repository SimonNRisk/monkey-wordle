const OUTCOME_KEY = 'monkey-wordle-outcome'

type Outcome = 'success' | 'failure'

export function localStorageGetOutcome(): Outcome | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(OUTCOME_KEY) as Outcome | null
}

export function localStorageSetOutcome(outcome: Outcome): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(OUTCOME_KEY, outcome)
  }
}
