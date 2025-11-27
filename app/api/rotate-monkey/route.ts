import { NextResponse } from 'next/server'
import { createServiceSupabaseClient } from '@/lib/supabaseServer'

export async function POST(req: Request) {
  const secret = req.headers.get('x-cron-secret')
  if (secret !== process.env.CRON_SECRET) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const supabase = createServiceSupabaseClient()

  const { data: species } = await supabase.from('monkey_species').select('*')
  if (!species) {
    throw new Error('No species found')
  }
  // Randomly choose which species the daily monkey puzzle will be from
  const randomSpecies = species[Math.floor(Math.random() * species.length)]

  // List images in that species folder
  const { data: files } = await supabase.storage.from('monkeys').list(randomSpecies.label)

  if (!files) {
    throw new Error('No files found')
  }

  const randomFile = files[Math.floor(Math.random() * files.length)]
  const imagePath = `${randomSpecies.label}/${randomFile.name}`

  const d = new Date()
  d.setDate(d.getDate() + 1)
  const tomorrow = d.toISOString().split('T')[0]

  await supabase.from('daily_monkey_puzzles').upsert(
    {
      puzzle_date: tomorrow,
      species_id: randomSpecies.id,
      image_path: imagePath
    },
    {
      onConflict: 'puzzle_date'
    }
  )

  return NextResponse.json({
    date: tomorrow,
    species: randomSpecies.slug,
    imagePath
  })
}
