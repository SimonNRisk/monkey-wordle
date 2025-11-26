import Image from 'next/image'
import { getTodayPuzzle } from '@/lib/getTodayPuzzle'

export default async function MonkeyPage() {
  let puzzle

  try {
    puzzle = await getTodayPuzzle()
  } catch {
    return <main className="min-h-screen flex items-center justify-center">No monkey set for today yet.</main>
  }

  return (
    <main className="min-h-screen flex flex-col items-center gap-6 pt-20">
      <h1 className="text-3xl font-bold">Monkey of the Day</h1>

      <div className="overflow-hidden rounded-xl shadow-lg">
        <Image src={puzzle.imageUrl} alt={puzzle.displayName} width={400} height={400} />
      </div>

      <p className="text-gray-500 text-sm">
        (debug) {puzzle.displayName} — {puzzle.slug}
      </p>
    </main>
  )
}
