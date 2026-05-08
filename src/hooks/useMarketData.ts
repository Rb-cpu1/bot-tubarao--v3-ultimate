import { useState, useEffect } from 'react'
import { marketApi } from '../services/api'

interface MarketData {
  pair: string
  price: number
  change: number
  volume: number
  timestamp: string
}

interface HistoricalData {
  time: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export const useMarketData = (pair: string = 'EUR/USD') => {
  const [data, setData] = useState<MarketData | null>(null)
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMarketData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const [marketResponse, historicalResponse] = await Promise.all([
        marketApi.getMarketData(pair),
        marketApi.getHistoricalData(pair)
      ])
      
      setData(marketResponse.data)
      setHistoricalData(historicalResponse.data)
    } catch (err) {
      setError('Erro ao carregar dados do mercado')
      console.error('Market data error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMarketData()
    
    // Update data every 5 seconds
    const interval = setInterval(fetchMarketData, 5000)
    
    return () => clearInterval(interval)
  }, [pair])

  return {
    data,
    historicalData,
    loading,
    error,
    refetch: fetchMarketData
  }
}