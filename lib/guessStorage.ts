const GUESSES_KEY = 'monkey-wordle-guesses'

interface StoredGuesses {
  guesses: string[]
  puzzleDate: string
}

export function localStorageGetGuesses(currentPuzzleDate: string | null): string[] {
  if (typeof window === 'undefined') return []
  if (!currentPuzzleDate) return []

  const stored = localStorage.getItem(GUESSES_KEY)
  if (!stored) return []

  try {
    const data: StoredGuesses = JSON.parse(stored)
    // If puzzle date doesn't match, clear and return empty
    if (data.puzzleDate !== currentPuzzleDate) {
      localStorageClearGuesses()
      return []
    }
    return data.guesses || []
  } catch {
    return []
  }
}

export function localStorageSetGuesses(guesses: string[], puzzleDate: string): void {
  if (typeof window !== 'undefined') {
    const data: StoredGuesses = { guesses, puzzleDate }
    localStorage.setItem(GUESSES_KEY, JSON.stringify(data))
  }
}

export function localStorageClearGuesses(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(GUESSES_KEY)
  }
}
