import { useState, useEffect } from 'react'
import { tradingEngine, marketDataService, type MarketData, type TradingSignal } from '../services/tradingEngine'

export const useTrading = (symbol: string = 'EURUSD') => {
  const [currentSignal, setCurrentSignal] = useState<TradingSignal | null>(null)
  const [marketData, setMarketData] = useState<MarketData | null>(null)
  const [allSymbols, setAllSymbols] = useState<Array<{ symbol: string; name: string; type: string }>>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [tradingHistory, setTradingHistory] = useState<TradingSignal[]>([])

  const generateSignal = async () => {
    setIsGenerating(true)
    setLoading(true)
    setError(null)
    
    try {
      const signal = await tradingEngine.generateSignal(symbol)
      setCurrentSignal(signal)
      setMarketData(await marketDataService.getMarketData(symbol))
      
      // Add to history
      setTradingHistory(prev => [signal, ...prev.slice(0, 9)])
    } catch (err) {
      setError('Erro ao gerar sinal')
      console.error('Trading engine error:', err)
    } finally {
      setLoading(false)
      setIsGenerating(false)
    }
  }

  const refreshMarketData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const data = await marketDataService.getMarketData(symbol)
      setMarketData(data)
    } catch (err) {
      setError('Erro ao carregar dados do mercado')
      console.error('Market data error:', err)
    } finally {
      setLoading(false)
    }
  }

  const getAllSymbols = async () => {
    try {
      const symbols = marketDataService.getAllSymbols()
      setAllSymbols(symbols)
    } catch (err) {
      console.error('Error getting symbols:', err)
    }
  }

  useEffect(() => {
    getAllSymbols()
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
  }, [symbol])

  return {
    currentSignal,
    marketData,
    allSymbols,
    loading,
    error,
    isGenerating,
    tradingHistory,
    generateSignal,
    refreshMarketData,
    setSymbol: (newSymbol: string) => {
      // This would trigger a re-render with the new symbol
      setCurrentSignal(null)
      setMarketData(null)
    }
  }
}