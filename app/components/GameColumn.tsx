import { MonkeyImage } from './MonkeyImage'
import { GuessGrid } from './GuessGrid'
import { GuessForm } from './GuessForm'
import { Correct } from './Correct'
import { Failure } from './Failure'

interface GameColumnProps {
  imageUrl: string
  alt: string
  blurClass: string
  guesses: string[]
  correctAnswer: string
  isSolved: boolean
  isFailed: boolean
  onGuess: (guess: string, isCorrect: boolean) => void
}

export function GameColumn({
  imageUrl,
  alt,
  blurClass,
  guesses,
  correctAnswer,
  isSolved,
  isFailed,
  onGuess
}: GameColumnProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <MonkeyImage imageUrl={imageUrl} alt={alt} blurClass={blurClass} />
      <GuessGrid guesses={guesses} correctAnswer={correctAnswer} />
      {isSolved ? (
        <Correct displayName={correctAnswer} />
      ) : isFailed ? (
        <Failure displayName={correctAnswer} />
      ) : (
        <GuessForm correctAnswer={correctAnswer} onGuess={onGuess} />
      )}
    </div>
  )
}
