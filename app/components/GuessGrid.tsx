import { checkFuzzyMatch } from '@/lib/fuzzyMatch'

interface GuessGridProps {
  guesses: string[]
  correctAnswer: string
}

export function GuessGrid({ guesses, correctAnswer }: GuessGridProps) {
  return (
    <div className="flex flex-col gap-1 w-[300px]">
      {guesses.map((guess, index) => {
        const isCorrect = checkFuzzyMatch(guess, correctAnswer)
        return (
          <div
            key={index}
            className={`px-6 py-3 rounded-xl text-center font-bold shadow-lg border-4 transform transition-all ${
              isCorrect
                ? 'bg-green-500 text-white border-green-700 scale-105'
                : 'bg-yellow-100 text-green-900 border-yellow-400'
            }`}
          >
            {guess}
          </div>
        )
      })}
    </div>
  )
}
