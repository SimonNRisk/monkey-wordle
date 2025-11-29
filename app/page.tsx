'use client'

import { useState, useEffect } from 'react'
import { getTodayPuzzle } from '@/lib/getTodayPuzzle'
import { getBlur } from '@/lib/getBlur'
import { hasSeenInstructions, markInstructionsAsSeen } from '@/lib/instructionsStorage'
import { InstructionsModal } from './components/InstructionsModal'
import { Footer } from './components/Footer'
import { HintModals } from './components/HintModals'
import { HintDisplay } from './components/HintDisplay'
import { GameColumn } from './components/GameColumn'
import { HowItWorks } from './components/HowItWorks'

export default function MonkeyPage() {
  const [numberOfGuesses, setNumberOfGuesses] = useState(0)
  const [isSolved, setIsSolved] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [puzzle, setPuzzle] = useState<{
    imageUrl: string
    displayName: string
    slug: string
    hintPrimary: string | null
    hintSecondary: string | null
  } | null>(null)
  const [guesses, setGuesses] = useState<string[]>([])
  const [showPrimaryHint, setShowPrimaryHint] = useState(false)
  const [showSecondaryHint, setShowSecondaryHint] = useState(false)
  const [shownPrimaryHint, setShownPrimaryHint] = useState<string | null>(null)
  const [shownSecondaryHint, setShownSecondaryHint] = useState<string | null>(null)

  const blurClass = isSolved ? 'blur-none' : getBlur(numberOfGuesses)

  useEffect(() => {
    if (!hasSeenInstructions()) {
      setShowInstructions(true)
    }
  }, [])

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
    <main className="min-h-screen flex flex-col pt-12 pb-12 px-4 relative">
      <InstructionsModal
        isOpen={showInstructions}
        onClose={() => {
          setShowInstructions(false)
          markInstructionsAsSeen()
        }}
      />

      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/jungle-background.webp)' }}
      />
      <div className="fixed inset-0 -z-10 bg-green-900/40" />

      <div className="grid grid-cols-[1fr_auto_1fr] gap-8 max-w-6xl mx-auto w-full">
        <div className="flex justify-end">
          <HowItWorks />
        </div>
        <div className="flex justify-center">
          <GameColumn
            imageUrl={puzzle.imageUrl}
            alt={puzzle.displayName}
            blurClass={blurClass}
            guesses={guesses}
            correctAnswer={puzzle.displayName}
            isSolved={isSolved}
            isFailed={isFailed}
            onGuess={handleGuess}
          />
        </div>
        <div className="flex justify-start">
          <HintDisplay primaryHint={shownPrimaryHint} secondaryHint={shownSecondaryHint} />
        </div>
      </div>

      {!isSolved && !isFailed && (
        <HintModals
          showPrimary={showPrimaryHint}
          showSecondary={showSecondaryHint}
          primaryHint={puzzle.hintPrimary}
          secondaryHint={puzzle.hintSecondary}
          onPrimaryClose={() => {
            setShowPrimaryHint(false)
            setShownPrimaryHint(puzzle.hintPrimary)
          }}
          onSecondaryClose={() => {
            setShowSecondaryHint(false)
            setShownSecondaryHint(puzzle.hintSecondary)
          }}
        />
      )}

      <Footer />
    </main>
  )
}
