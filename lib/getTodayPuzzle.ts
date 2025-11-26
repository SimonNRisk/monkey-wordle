import { createPublicSupabaseClient } from './supabasePublic'

export async function getTodayPuzzle() {
  const supabase = createPublicSupabaseClient()
  // Get today's date in YYYY-MM-DD format (no need for time)
  const today = new Date().toISOString().split('T')[0]

  const { data, error } = await supabase
    .from('daily_monkey_puzzles')
    .select(
      `
      puzzle_date,
      image_path,
      species:species_id (
        slug,
        display_name,
        label,
        hint_primary,
        hint_secondary
      )
    `
    )
    .eq('puzzle_date', today)
    .single()
  if (error) throw new Error('No puzzle found for today')

  const { data: urlData } = await supabase.storage.from('monkeys').getPublicUrl(data.image_path)

  return {
    date: data.puzzle_date,
    imageUrl: urlData.publicUrl,
    slug: data.species.slug,
    displayName: data.species.display_name,
    hintPrimary: data.species.hint_primary,
    hintSecondary: data.species.hint_secondary
  }
}
