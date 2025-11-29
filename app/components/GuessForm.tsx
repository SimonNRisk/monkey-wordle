'use client'

import { useState, FormEvent } from 'react'
import { checkFuzzyMatch } from '@/lib/fuzzyMatch'

interface GuessFormProps {
  correctAnswer: string
  onGuess: (guess: string, isCorrect: boolean) => void
}

export function GuessForm({ correctAnswer, onGuess }: GuessFormProps) {
  const [guess, setGuess] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmedGuess = guess.trim()
    if (!trimmedGuess) return
    const isCorrect = checkFuzzyMatch(trimmedGuess, correctAnswer)
    onGuess(trimmedGuess, isCorrect)
    setGuess('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-[300px]">
      <input
        type="text"
        className="flex-1 border-4 border-yellow-400 rounded-xl px-6 py-3 font-semibold bg-white/95 shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:border-yellow-500 text-green-900 placeholder-green-600"
        placeholder="Enter your guess..."
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />
    </form>
  )
}
