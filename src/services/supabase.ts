import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kxzejoohvanuhkzxsmqb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4emVqb29odmFudWhrenhzbXFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMTQ1MTgsImV4cCI6MjA5Mzc5MDUxOH0.Aw8TN6V504Ih3yHcPpY-Byk3-TS0rO3XZTkWPIcVuFY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const createUser = async (email: string, password: string, name: string, activationCode: string) => {
  const activationCodes: Record<string, string> = {
    "TUBARAO2025": "Pro",
    "SHARKV3PRO": "Pro", 
    "TUBARAOELITE": "Elite",
    "SHARKULTRA": "Elite",
    "DEMO123": "Demo",
    "BASICO2025": "Básico"
  }

  if (!activationCodes[activationCode.toUpperCase()]) {
    throw new Error('Código de ativação inválido')
  }

  // Sign up user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name
      }
    }
  })

  if (error) {
    throw new Error(error.message)
  }

  if (data.user) {
    // Insert user data into the bot_12 table
    const { error: insertError } = await supabase
      .from('bot_12')
      .insert({
        name,
        email,
        plan: activationCodes[activationCode.toUpperCase()],
        created_at: new Date().toISOString()
      })

    if (insertError) {
      throw new Error('Erro ao criar perfil do usuário')
    }
  }

  return data.user
}

export const loginUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    throw new Error(error.message)
  }

  return data.user
}

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('bot_12')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    throw new Error('Erro ao obter perfil do usuário')
  }

  return data
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw new Error(error.message)
  }
}