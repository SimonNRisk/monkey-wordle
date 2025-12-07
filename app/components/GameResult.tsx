'use client'

import { useEffect, useRef } from 'react'

interface GameResultProps {
  outcome: 'success' | 'failure'
  displayName: string
  guessCount: number
  puzzleDate: string
}

export function GameResult({ outcome, displayName, guessCount, puzzleDate }: GameResultProps) {
  const hasSubmitted = useRef(false)

  useEffect(() => {
    if (hasSubmitted.current) return
    hasSubmitted.current = true

    // Submit result: 1-6 for success, 7 for failure
    const finalGuessCount = outcome === 'failure' ? 7 : guessCount

    fetch('/api/submit-result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        puzzleDate,
        guessCount: finalGuessCount
      })
    }).catch(console.error)
  }, [outcome, guessCount, puzzleDate])

  return (
    <div className="text-center">
      {outcome === 'success' ? (
        <div className="bg-green-100/95 border-4 border-green-500 rounded-2xl px-8 py-6 shadow-2xl">
          <h2 className="text-2xl font-bold text-green-700 mb-2">Correct!</h2>
          <p className="text-lg text-green-900">It&apos;s a {displayName}!</p>
        </div>
      ) : (
        <div className="bg-orange-100/95 border-4 border-orange-500 rounded-2xl px-8 py-6 shadow-2xl">
          <h2 className="text-2xl font-bold text-orange-700 mb-2">Out of Guesses!</h2>
          <p className="text-lg text-orange-900">The answer was: {displayName}</p>
        </div>
      )}
    </div>
  )
}
