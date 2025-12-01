import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { localStorageGetGuesses, localStorageSetGuesses } from '@/lib/guessStorage'

// A Dispatch<SetStateAction<string[]>> is just a type of function that updates state (specifically for string[])
type UseGuessesReturn = [string[], Dispatch<SetStateAction<string[]>>]

export function useGuesses(): UseGuessesReturn {
  const [guesses, setGuesses] = useState<string[]>(() => {
    const storedGuesses = localStorageGetGuesses()
    if (!storedGuesses) return []
    return storedGuesses.length > 0 ? storedGuesses : []
  })

  useEffect(() => {
    localStorageSetGuesses(guesses)
  }, [guesses])

  return [guesses, setGuesses]
}
