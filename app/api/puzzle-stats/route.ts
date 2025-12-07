import { NextResponse } from 'next/server'
import { createPublicSupabaseClient } from '@/lib/supabasePublic'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const puzzleDate = searchParams.get('date')

  if (!puzzleDate) {
    return NextResponse.json({ error: 'Missing date parameter' }, { status: 400 })
  }

  const supabase = createPublicSupabaseClient()

  const { data, error } = await supabase.from('game_results').select('guess_count').eq('puzzle_date', puzzleDate)

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch game stats' }, { status: 500 })
  }

  // bucket guesses, initializing at 0
  const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 }

  for (const row of data || []) {
    distribution[row.guess_count] = (distribution[row.guess_count] || 0) + 1
  }

  const totalPlayers = data?.length || 0

  return NextResponse.json({
    distribution,
    totalPlayers
  })
}
