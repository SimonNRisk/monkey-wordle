import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/database.types'

export function createPublicSupabaseClient(): SupabaseClient<Database> {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}
