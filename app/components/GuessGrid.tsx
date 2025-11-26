import { checkFuzzyMatch } from '@/lib/fuzzyMatch'

interface GuessGridProps {
  guesses: string[]
  correctAnswer: string
}

export default function GuessGrid({ guesses, correctAnswer }: GuessGridProps) {
  return (
    <div className="flex flex-col gap-2">
      {guesses.map((guess, index) => {
        const isCorrect = checkFuzzyMatch(guess, correctAnswer)
        return (
          <div
            key={index}
            className={`px-4 py-2 rounded-md text-center font-semibold ${
              isCorrect ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {guess}
          </div>
        )
      })}
    </div>
  )
}
