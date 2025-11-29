'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getTodayPuzzle } from '@/lib/getTodayPuzzle'
import { getBlur } from '@/lib/getBlur'
import { GuessForm } from './components/GuessForm'
import { GuessGrid } from './components/GuessGrid'
import { Correct } from './components/Correct'
import { Failure } from './components/Failure'
import { InstructionsModal } from './components/InstructionsModal'
import { Footer } from './components/Footer'
import { HintModal } from './components/HintModal'

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
  // TODO: after hint showed, we want to persist on the UI, probably to the right of the monkey photo
  const [showPrimaryHint, setShowPrimaryHint] = useState(false)
  const [showSecondaryHint, setShowSecondaryHint] = useState(false)

  const blurClass = isSolved ? 'blur-none' : getBlur(numberOfGuesses)

  useEffect(() => {
    getTodayPuzzle()
      .then(setPuzzle)
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (numberOfGuesses === 4) {
      setShowPrimaryHint(true)
    } else if (numberOfGuesses === 5) {
      setShowSecondaryHint(true)
    }
  }, [numberOfGuesses])

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

  const isFailed = numberOfGuesses >= 6 && !isSolved

  return (
    <main className="min-h-screen flex flex-col items-center gap-3 pt-12 pb-12 px-4 relative">
      <InstructionsModal isOpen={showInstructions} onClose={() => setShowInstructions(false)} />

      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/jungle-background.webp)' }}
      />
      <div className="fixed inset-0 -z-10 bg-green-900/40" />

      <div className="overflow-hidden rounded-2xl shadow-2xl border-4 border-yellow-400 bg-white/10 backdrop-blur-sm p-2">
        <Image
          src={puzzle.imageUrl}
          alt={puzzle.displayName}
          width={300}
          height={300}
          unoptimized
          className={`${blurClass} transition-all duration-300 rounded-xl`}
        />
      </div>

      <GuessGrid guesses={guesses} correctAnswer={puzzle.displayName} />

      {showPrimaryHint && puzzle.hintPrimary && (
        <HintModal hint={puzzle.hintPrimary} isOpen={showPrimaryHint} onClose={() => setShowPrimaryHint(false)} />
      )}

      {showSecondaryHint && puzzle.hintSecondary && (
        <HintModal hint={puzzle.hintSecondary} isOpen={showSecondaryHint} onClose={() => setShowSecondaryHint(false)} />
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
