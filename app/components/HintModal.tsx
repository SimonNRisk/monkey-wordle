'use client'

import { useEffect, useRef } from 'react'
import { IoClose } from 'react-icons/io5'
import { useClickOutside } from '../hooks/useClickOutside'

interface HintModalProps {
  hint: string
  isOpen: boolean
  onClose: () => void
}

export function HintModal({ hint, isOpen, onClose }: HintModalProps) {
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
        className="relative bg-yellow-100 border-4 border-yellow-400 rounded-2xl shadow-2xl max-w-md w-full p-6 z-10"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-green-900 hover:text-green-700 transition-colors"
          aria-label="Close"
        >
          <IoClose size={28} />
        </button>

        <h2 className="text-2xl font-bold text-green-900 mb-4 pr-8">{hint}</h2>
      </div>
    </div>
  )
}
