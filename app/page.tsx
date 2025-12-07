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
import { StatsPanel } from './components/StatsPanel'
import { useGuesses } from './hooks/useGuesses'
import { useOutcome } from './hooks/useOutcome'

export default function MonkeyPage() {
  const [showInstructions, setShowInstructions] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [puzzle, setPuzzle] = useState<{
    date: string
    imageUrl: string
    displayName: string
    slug: string
    hintPrimary: string | null
    hintSecondary: string | null
  } | null>(null)
  const [guesses, setGuesses] = useGuesses(puzzle?.date ?? null)
  const [outcome, setOutcome] = useOutcome(puzzle?.date ?? null)
  const numberOfGuesses = guesses.length
  const [showPrimaryHint, setShowPrimaryHint] = useState(false)
  const [showSecondaryHint, setShowSecondaryHint] = useState(false)
  const [shownPrimaryHint, setShownPrimaryHint] = useState<string | null>(null)
  const [shownSecondaryHint, setShownSecondaryHint] = useState<string | null>(null)

  const blurClass = outcome === 'success' ? 'blur-none' : getBlur(numberOfGuesses)

  useEffect(() => {
    if (!hasSeenInstructions()) {
      setShowInstructions(true)
    }
  }, [])

  useEffect(() => {
    setIsLoading(true)
    getTodayPuzzle()
      .then((puzzle) => {
        setPuzzle(puzzle)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    if (numberOfGuesses === 4) {
      setShowPrimaryHint(true)
    } else if (numberOfGuesses === 5) {
      setShowSecondaryHint(true)
    }
  }, [numberOfGuesses])

  useEffect(() => {
    if (numberOfGuesses >= 6 && outcome !== 'success') {
      setOutcome('failure')
    }
  }, [numberOfGuesses, outcome])

  const handleGuess = (guess: string, isCorrect: boolean) => {
    setGuesses((prevGuesses: string[]) => [...prevGuesses, guess])
    if (isCorrect) {
      setOutcome('success')
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 relative">
        <div
          className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/jungle-background.webp)' }}
        />
        <div className="fixed inset-0 -z-10 bg-green-900/40" />
        <div className="text-center bg-yellow-100/95 border-4 border-yellow-400 rounded-2xl px-8 py-6 shadow-2xl">
          <p className="text-lg font-bold text-green-900">Loading today&apos;s monkey...</p>
        </div>
      </main>
    )
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

  const isFailed = numberOfGuesses >= 6 && outcome === 'failure'

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
            isSolved={outcome === 'success'}
            isFailed={isFailed}
            puzzleDate={puzzle.date}
            onGuess={handleGuess}
          />
        </div>
        <div className="flex justify-start">
          <div className="flex flex-col gap-3">
            <StatsPanel
              puzzleDate={puzzle.date}
              userGuessCount={outcome === 'success' ? guesses.length : isFailed ? 7 : undefined}
            />
            <HintDisplay primaryHint={shownPrimaryHint} secondaryHint={shownSecondaryHint} />
          </div>
        </div>
      </div>

      {!isFailed && outcome !== 'success' && (
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
