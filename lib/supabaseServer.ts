import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/database.types'

export function createServiceSupabaseClient(): SupabaseClient<Database> {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false }
  })
}
