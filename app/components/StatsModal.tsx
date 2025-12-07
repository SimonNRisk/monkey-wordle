'use client'

import { useEffect, useRef } from 'react'
import { IoClose, IoStatsChart } from 'react-icons/io5'
import { useClickOutside } from '../hooks/useClickOutside'
import { ResultsGraph } from './ResultsGraph'

interface StatsModalProps {
  puzzleDate: string
  userGuessCount?: number // undefined = hasn't finished yet
  isOpen: boolean
  onClose: () => void
}

export function StatsModal({ puzzleDate, userGuessCount, isOpen, onClose }: StatsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useClickOutside(modalRef, onClose, isOpen)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred background */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal content */}
      <div
        ref={modalRef}
        className="relative bg-yellow-100 border-4 border-yellow-400 rounded-2xl shadow-2xl max-w-sm w-full z-10"
      >
        <div className="flex items-center justify-between p-4 border-b-2 border-yellow-300">
          <div className="flex items-center gap-2">
            <IoStatsChart className="text-green-700" size={24} />
            <h2 className="text-xl font-bold text-green-900">Statistics</h2>
          </div>
          <button
            onClick={onClose}
            className="text-green-900 hover:text-green-700 transition-colors"
            aria-label="Close"
          >
            <IoClose size={28} />
          </button>
        </div>

        <ResultsGraph puzzleDate={puzzleDate} userGuessCount={userGuessCount} />
      </div>
    </div>
  )
}
