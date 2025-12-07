'use client'

import { useState } from 'react'
import { IoStatsChart } from 'react-icons/io5'
import { StatsModal } from './StatsModal'

interface StatsPanelProps {
  puzzleDate: string
  userGuessCount?: number // undefined = hasn't finished yet
}

export function StatsPanel({ puzzleDate, userGuessCount }: StatsPanelProps) {
  const [showStats, setShowStats] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowStats(true)}
        className="bg-yellow-100 hover:bg-yellow-200 border-4 border-yellow-400 rounded-2xl p-4 shadow-2xl transition-all hover:scale-105 flex flex-col items-center gap-2"
        aria-label="View statistics"
      >
        <IoStatsChart className="text-green-700" size={32} />
      </button>

      <StatsModal
        puzzleDate={puzzleDate}
        userGuessCount={userGuessCount}
        isOpen={showStats}
        onClose={() => setShowStats(false)}
      />
    </>
  )
}
