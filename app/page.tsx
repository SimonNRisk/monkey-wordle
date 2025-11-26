'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getTodayPuzzle } from '@/lib/getTodayPuzzle'
import { getBlur } from '@/lib/getBlur'
import GuessForm from './components/GuessForm'
import GuessGrid from './components/GuessGrid'
import Correct from './components/Correct'
import Failure from './components/Failure'

export default function MonkeyPage() {
  const [numberOfGuesses, setNumberOfGuesses] = useState(0)
  const [isSolved, setIsSolved] = useState(false)
  const [puzzle, setPuzzle] = useState<{
    imageUrl: string
    displayName: string
    slug: string
    hintPrimary: string | null
    hintSecondary: string | null
  } | null>(null)
  const [guesses, setGuesses] = useState<string[]>([])

  const blurClass = isSolved ? 'blur-none' : getBlur(numberOfGuesses)

  useEffect(() => {
    getTodayPuzzle()
      .then(setPuzzle)
      .catch(() => {})
  }, [])

  const handleGuess = (guess: string, isCorrect: boolean) => {
    setGuesses([...guesses, guess])
    setNumberOfGuesses(numberOfGuesses + 1)
    if (isCorrect) {
      setIsSolved(true)
    }
  }

  if (!puzzle) {
    return <main className="min-h-screen flex items-center justify-center">No monkey set for today yet.</main>
  }

  const isFailed = numberOfGuesses >= 7 && !isSolved
  const showPrimaryHint = numberOfGuesses >= 5 && !isSolved
  const showSecondaryHint = numberOfGuesses >= 6 && !isSolved

  return (
    <main className="min-h-screen flex flex-col items-center gap-6 pt-20">
      <h1 className="text-3xl font-bold">Monkey of the Day</h1>

      <div className="overflow-hidden rounded-xl shadow-lg">
        <Image
          src={puzzle.imageUrl}
          alt={puzzle.displayName}
          width={400}
          height={400}
          className={`${blurClass} transition-all duration-300`}
        />
      </div>

      <GuessGrid guesses={guesses} correctAnswer={puzzle.displayName} />

      {showPrimaryHint && puzzle.hintPrimary && (
        <div className="text-center text-gray-600 italic">
          <p className="text-sm font-semibold mb-1">Hint:</p>
          <p>{puzzle.hintPrimary}</p>
        </div>
      )}

      {showSecondaryHint && puzzle.hintSecondary && (
        <div className="text-center text-gray-600 italic">
          <p className="text-sm font-semibold mb-1">Another Hint:</p>
          <p>{puzzle.hintSecondary}</p>
        </div>
      )}

      {isSolved ? (
        <Correct displayName={puzzle.displayName} />
      ) : isFailed ? (
        <Failure displayName={puzzle.displayName} />
      ) : (
        <GuessForm correctAnswer={puzzle.displayName} onGuess={handleGuess} />
      )}
    </main>
  )
}
