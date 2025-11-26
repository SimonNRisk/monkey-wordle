'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getTodayPuzzle } from '@/lib/getTodayPuzzle'
import { getBlur } from '@/lib/getBlur'
import GuessForm from './components/GuessForm'
import GuessGrid from './components/GuessGrid'
import Correct from './components/Correct'
import Failure from './components/Failure'
import InstructionsModal from './components/InstructionsModal'
import Footer from './components/Footer'

export default function MonkeyPage() {
  const [numberOfGuesses, setNumberOfGuesses] = useState(0)
  const [isSolved, setIsSolved] = useState(false)
  // TODO: use local storage to store the state of this
  const [showInstructions, setShowInstructions] = useState(true)
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
    return (
      <main className="min-h-screen flex items-center justify-center px-4 relative">
        <div
          className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/jungle-background.webp)' }}
        />
        <div className="fixed inset-0 -z-10 bg-green-900/40" />
        <div className="text-center bg-yellow-100/95 border-4 border-yellow-400 rounded-2xl px-8 py-6 shadow-2xl">
          <p className="text-lg font-bold text-green-900">No monkey set for today yet.</p>
        </div>
      </main>
    )
  }

  const isFailed = numberOfGuesses >= 7 && !isSolved
  const showPrimaryHint = numberOfGuesses >= 5 && !isSolved
  const showSecondaryHint = numberOfGuesses >= 6 && !isSolved

  return (
    <main className="min-h-screen flex flex-col items-center gap-6 pt-12 pb-12 px-4 relative">
      <InstructionsModal isOpen={showInstructions} onClose={() => setShowInstructions(false)} />

      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/jungle-background.webp)' }}
      />
      <div className="fixed inset-0 -z-10 bg-green-900/40" />

      <h1 className="text-3xl font-bold text-yellow-300 drop-shadow-lg mb-2 text-center">Monkey of the Day</h1>

      <div className="overflow-hidden rounded-2xl shadow-2xl border-4 border-yellow-400 bg-white/10 backdrop-blur-sm p-2">
        <Image
          src={puzzle.imageUrl}
          alt={puzzle.displayName}
          width={400}
          height={400}
          className={`${blurClass} transition-all duration-300 rounded-xl`}
        />
      </div>

      <GuessGrid guesses={guesses} correctAnswer={puzzle.displayName} />

      {showPrimaryHint && puzzle.hintPrimary && (
        <div className="text-center bg-yellow-100/90 border-2 border-yellow-400 rounded-xl px-6 py-4 shadow-lg max-w-md">
          <p className="text-sm font-semibold text-green-800 mb-1">Hint:</p>
          <p className="text-green-900">{puzzle.hintPrimary}</p>
        </div>
      )}

      {showSecondaryHint && puzzle.hintSecondary && (
        <div className="text-center bg-yellow-100/90 border-2 border-yellow-400 rounded-xl px-6 py-4 shadow-lg max-w-md">
          <p className="text-sm font-semibold text-green-800 mb-1">Another Hint:</p>
          <p className="text-green-900">{puzzle.hintSecondary}</p>
        </div>
      )}

      {isSolved ? (
        <Correct displayName={puzzle.displayName} />
      ) : isFailed ? (
        <Failure displayName={puzzle.displayName} />
      ) : (
        <GuessForm correctAnswer={puzzle.displayName} onGuess={handleGuess} />
      )}

      <Footer />
    </main>
  )
}
