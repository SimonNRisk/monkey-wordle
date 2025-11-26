'use client'

import { useState, FormEvent } from 'react'

interface GuessFormProps {
  correctSlug: string
  onGuess: (guess: string, isCorrect: boolean) => void
}

export default function GuessForm({ correctSlug, onGuess }: GuessFormProps) {
  const [guess, setGuess] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const normalizedGuess = guess.trim().toLowerCase()
    const normalizedSlug = correctSlug.toLowerCase()

    const isCorrect = normalizedGuess === normalizedSlug
    onGuess(guess.trim(), isCorrect)
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
