import { MonkeyImage } from './MonkeyImage'
import { GuessGrid } from './GuessGrid'
import { GuessForm } from './GuessForm'
import { GameResult } from './GameResult'

interface GameColumnProps {
  imageUrl: string
  alt: string
  blurClass: string
  guesses: string[]
  correctAnswer: string
  isSolved: boolean
  isFailed: boolean
  puzzleDate: string
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
  puzzleDate,
  onGuess
}: GameColumnProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <MonkeyImage imageUrl={imageUrl} alt={alt} blurClass={blurClass} />
      <GuessGrid guesses={guesses} correctAnswer={correctAnswer} />
      {isSolved ? (
        <GameResult outcome="success" displayName={correctAnswer} guessCount={guesses.length} puzzleDate={puzzleDate} />
      ) : isFailed ? (
        <GameResult outcome="failure" displayName={correctAnswer} guessCount={guesses.length} puzzleDate={puzzleDate} />
      ) : (
        <GuessForm correctAnswer={correctAnswer} onGuess={onGuess} />
      )}
    </div>
  )
}
