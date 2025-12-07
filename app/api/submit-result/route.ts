import { NextResponse } from 'next/server'
import { createServiceSupabaseClient } from '@/lib/supabaseServer'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { puzzleDate, guessCount } = body

    if (!puzzleDate || !guessCount) {
      return NextResponse.json({ error: 'Missing puzzleDate or guessCount' }, { status: 400 })
    }

    if (typeof puzzleDate !== 'string' || typeof guessCount !== 'number') {
      return NextResponse.json({ error: 'Invalid puzzleDate or guessCount' }, { status: 400 })
    }
    if (guessCount < 1 || guessCount > 7) {
      return NextResponse.json({ error: 'Guess count must be between 1 and 7 (7 for failure)' }, { status: 400 })
    }

    const supabase = createServiceSupabaseClient()

    // puzzle date match validation
    const { data: puzzle } = await supabase
      .from('daily_monkey_puzzles')
      .select('puzzle_date')
      .eq('puzzle_date', puzzleDate)
      .single()

    if (!puzzle) {
      return NextResponse.json({ error: 'Invalid puzzle date' }, { status: 400 })
    }

    const { error } = await supabase.from('game_results').insert({
      puzzle_date: puzzleDate,
      guess_count: guessCount
    })

    if (error) {
      console.error('Error submitting result:', error)
      return NextResponse.json({ error: 'Failed to submit result' }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error submitting result:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
