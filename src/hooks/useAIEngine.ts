import { useState, useEffect } from 'react'
import { aiEngine, type TradingSignal, type MarketData } from '../services/aiEngine'

export const useAIEngine = (pair: string = 'EUR/USD') => {
  const [currentSignal, setCurrentSignal] = useState<TradingSignal | null>(null)
  const [marketData, setMarketData] = useState<MarketData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateSignal = async () => {
    setIsGenerating(true)
    setLoading(true)
    setError(null)
    
    try {
      const signal = await aiEngine.generateSignal(pair)
      setCurrentSignal(signal)
      setMarketData(await aiEngine.analyzeMarket(pair))
    } catch (err) {
      setError('Erro ao gerar sinal')
      console.error('AI Engine error:', err)
    } finally {
      setLoading(false)
      setIsGenerating(false)
    }
  }

  const refreshMarketData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const data = await aiEngine.analyzeMarket(pair)
      setMarketData(data)
    } catch (err) {
      setError('Erro ao carregar dados do mercado')
      console.error('Market data error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshMarketData()
    
    // Auto-generate signal every 5 minutes
    const signalInterval = setInterval(() => {
      generateSignal()
    }, 5 * 60 * 1000)
    
    // Refresh market data every 30 seconds
    const dataInterval = setInterval(refreshMarketData, 30 * 1000)
    
    return () => {
      clearInterval(signalInterval)
      clearInterval(dataInterval)
    }
  }, [pair])

  return {
    currentSignal,
    marketData,
    loading,
    error,
    isGenerating,
    generateSignal,
    refreshMarketData
  }
}