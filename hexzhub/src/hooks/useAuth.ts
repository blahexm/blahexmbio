import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useAuth() {
  const [label, setLabel] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const key = localStorage.getItem('hexz_key')
    const lbl = localStorage.getItem('hexz_label')
    if (key && lbl) {
      setLabel(lbl)
    }
    setLoading(false)
  }, [])

  const login = async (key: string, remember: boolean): Promise<string | null> => {
    const { data, error } = await supabase
      .from('access_keys')
      .select('key_value,label,active')
      .eq('key_value', key)
      .eq('active', true)
      .single()

    if (error || !data) return 'Invalid access key'

    if (remember) localStorage.setItem('hexz_key', key)
    localStorage.setItem('hexz_label', data.label || 'User')
    setLabel(data.label || 'User')
    return null
  }

  const logout = () => {
    localStorage.removeItem('hexz_key')
    localStorage.removeItem('hexz_label')
    setLabel(null)
  }

  const isLoggedIn = !!label

  return { label, loading, login, logout, isLoggedIn }
}
