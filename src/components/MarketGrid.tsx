import React from 'react'
import { useTrading } from '../hooks/useTrading'

interface MarketGridProps {
  onSymbolSelect: (symbol: string) => void
  currentSymbol: string
  className?: string
}

const MarketGrid: React.FC<MarketGridProps> = ({ onSymbolSelect, currentSymbol, className = '' }) => {
  const { allSymbols, loading } = useTrading()

  const getSymbolTypeColor = (type: string) => {
    switch (type) {
      case 'forex': return 'text-green-400'
      case 'crypto': return 'text-purple-400'
      case 'commodity': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const getSymbolTypeIcon = (type: string) => {
    switch (type) {
      case 'forex': return '🌐'
      case 'crypto': return '₿'
      case 'commodity': return '🏅'
      default: return '📊'
    }
  }

  if (loading) {
    return (
      <div className={`bg-gray-800/50 rounded-xl border border-gray-700 p-6 ${className}`}>
        <div className="text-center text-gray-400">Carregando mercados...</div>
      </div>
    )
  }

  const groupedSymbols = allSymbols.reduce((acc, symbol) => {
    if (!acc[symbol.type]) {
      acc[symbol.type] = []
    }
    acc[symbol.type].push(symbol)
    return acc
  }, {} as Record<string, typeof allSymbols>)

  return (
    <div className={`bg-gray-800/50 rounded-xl border border-gray-700 p-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Forex */}
        <div>
          <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
            <span>🌐</span> Forex
          </h3>
          <div className="space-y-2">
            {groupedSymbols.forex?.map((symbol) => (
              <button
                key={symbol.symbol}
                onClick={() => onSymbolSelect(symbol.symbol)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  currentSymbol === symbol.symbol
                    ? 'border-green-400 bg-green-400/10 shadow-lg'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white">{symbol.symbol}</div>
                    <div className="text-xs text-gray-400">{symbol.name}</div>
                  </div>
                  <span className="text-green-400">📈</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Crypto */}
        <div>
          <h3 className="text-lg font-bold text-purple-400 mb-4 flex items-center gap-2">
            <span>₿</span> Criptomoedas
          </h3>
          <div className="space-y-2">
            {groupedSymbols.crypto?.map((symbol) => (
              <button
                key={symbol.symbol}
                onClick={() => onSymbolSelect(symbol.symbol)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  currentSymbol === symbol.symbol
                    ? 'border-purple-400 bg-purple-400/10 shadow-lg'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white">{symbol.symbol}</div>
                    <div className="text-xs text-gray-400">{symbol.name}</div>
                  </div>
                  <span className="text-purple-400">🚀</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Commodities */}
        <div>
          <h3 className="text-lg font-bold text-yellow-400 mb-4 flex items-center gap-2">
            <span>🏅</span> Commodities
          </h3>
          <div className="space-y-2">
            {groupedSymbols.commodity?.map((symbol) => (
              <button
                key={symbol.symbol}
                onClick={() => onSymbolSelect(symbol.symbol)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  currentSymbol === symbol.symbol
                    ? 'border-yellow-400 bg-yellow-400/10 shadow-lg'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white">{symbol.symbol}</div>
                    <div className="text-xs text-gray-400">{symbol.name}</div>
                  </div>
                  <span className="text-yellow-400">💰</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketGrid