import { useState, useEffect } from 'react'
import { marketApi } from '../services/api'

interface Signal {
  id: string
  pair: string
  direction: 'CALL' | 'PUT'
  confidence: number
  entry_price: number
  expiry_time: string
  created_at: string
  reasons: string[]
  status: 'pending' | 'active' | 'expired' | 'executed'
}

export const useSignals = () => {
  const [signals, setSignals] = useState<Signal[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSignals = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await marketApi.getSignals()
      setSignals(response.data)
    } catch (err) {
      setError('Erro ao carregar sinais')
      console.error('Signals error:', err)
    } finally {
      setLoading(false)
    }
  }

  const generateNewSignal = async (pair: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await marketApi.generateSignal(pair)
      setSignals(prev => [response.data, ...prev])
      return response.data
    } catch (err) {
      setError('Erro ao gerar novo sinal')
      console.error('Generate signal error:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSignals()
    
    // Refresh signals every 30 seconds
    const interval = setInterval(fetchSignals, 30000)
    
    return () => clearInterval(interval)
  }, [])

  return {
    signals,
    loading,
    error,
    generateNewSignal,
    refetch: fetchSignals
  }
}