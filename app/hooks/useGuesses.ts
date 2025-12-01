import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { localStorageGetGuesses, localStorageSetGuesses } from '@/lib/guessStorage'

// A Dispatch<SetStateAction<string[]>> is just a type of function that updates state (specifically for string[])
type UseGuessesReturn = [string[], Dispatch<SetStateAction<string[]>>]

export function useGuesses(puzzleDate: string | null): UseGuessesReturn {
  const [guesses, setGuesses] = useState<string[]>(() => {
    if (!puzzleDate) return []
    const storedGuesses = localStorageGetGuesses(puzzleDate)
    return storedGuesses || []
  })

  // Re-check storage when puzzleDate changes
  useEffect(() => {
    if (puzzleDate) {
      const storedGuesses = localStorageGetGuesses(puzzleDate)
      setGuesses(storedGuesses)
    } else {
      setGuesses([])
    }
  }, [puzzleDate])

  useEffect(() => {
    if (puzzleDate) {
      localStorageSetGuesses(guesses, puzzleDate)
    }
  }, [guesses, puzzleDate])

  return [guesses, setGuesses]
}
