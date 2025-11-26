'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getTodayPuzzle } from '@/lib/getTodayPuzzle'
import { getBlur } from '@/lib/getBlur'

export default function MonkeyPage() {
  const [numberOfGuesses, setNumberOfGuesses] = useState(0)
  const [puzzle, setPuzzle] = useState<{ imageUrl: string; displayName: string; slug: string } | null>(null)
  const blurClass = getBlur(numberOfGuesses)

  useEffect(() => {
    getTodayPuzzle()
      .then(setPuzzle)
      .catch(() => {})
  }, [])

  if (!puzzle) {
    return <main className="min-h-screen flex items-center justify-center">No monkey set for today yet.</main>
  }

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

      <p className="text-gray-500 text-sm">
        (debug) {puzzle.displayName} — {puzzle.slug}
      </p>
    </main>
  )
}
