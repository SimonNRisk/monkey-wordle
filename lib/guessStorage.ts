// Need to implement TTL for these guesses, but I'll do that later.

const GUESSES_KEY = 'monkey-wordle-guesses'

export function localStorageGetGuesses(): string[] {
  if (typeof window === 'undefined') return []
  return JSON.parse(localStorage.getItem(GUESSES_KEY) || '[]')
}

export function localStorageSetGuesses(guesses: string[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(GUESSES_KEY, JSON.stringify(guesses))
  }
}

export function localStorageClearGuesses(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(GUESSES_KEY)
  }
}
