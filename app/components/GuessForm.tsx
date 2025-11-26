'use client'

import { useState, FormEvent } from 'react'
import { checkFuzzyMatch } from '@/lib/fuzzyMatch'

interface GuessFormProps {
  correctAnswer: string
  onGuess: (guess: string, isCorrect: boolean) => void
}

export default function GuessForm({ correctAnswer, onGuess }: GuessFormProps) {
  const [guess, setGuess] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmedGuess = guess.trim()
    const isCorrect = checkFuzzyMatch(trimmedGuess, correctAnswer)
    onGuess(trimmedGuess, isCorrect)
    setGuess('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="border-2 border-gray-300 rounded-md p-2"
        placeholder="Enter your guess"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />
    </form>
  )
}
