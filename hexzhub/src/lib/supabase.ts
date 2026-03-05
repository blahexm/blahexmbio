import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://zwavwijmgjgpaembmpnl.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3YXZ3aWptZ2pncGFlbWJtcG5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2NTU5MDIsImV4cCI6MjA4ODIzMTkwMn0.fAqRlMP6COBxT0v1wgvvW7NSxn6jv93Ah1d42C_GKMU'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
