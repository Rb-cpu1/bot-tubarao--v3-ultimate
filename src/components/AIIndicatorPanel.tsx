import React from 'react'
import { MarketData } from '../services/aiEngine'

interface AIIndicatorPanelProps {
  marketData: MarketData | null
  className?: string
}

const AIIndicatorPanel: React.FC<AIIndicatorPanelProps> = ({ marketData, className = '' }) => {
  if (!marketData) {
    return (
      <div className={`bg-gray-800/50 rounded-xl border border-gray-700 p-4 ${className}`}>
        <div className="text-center text-gray-400">Carregando indicadores...</div>
      </div>
    )
  }

  const { indicators } = marketData

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'bullish': return 'text-green-400'
      case 'bearish': return 'text-red-400'
      default: return 'text-yellow-400'
    }
  }

  const getRSIStatus = (rsi: number) => {
    if (rsi < 30) return { color: 'text-green-400', status: 'Sobrevenda' }
    if (rsi > 70) return { color: 'text-red-400', status: 'Sobrecompra' }
    return { color: 'text-yellow-400', status: 'Neutro' }
  }

  const getMACDStatus = (macd: number) => {
    if (macd > 0) return { color: 'text-green-400', status: 'Bullish' }
    if (macd < 0) return { color: 'text-red-400', status: 'Bearish' }
    return { color: 'text-yellow-400', status: 'Neutro' }
  }

  return (
    <div className={`bg-gray-800/50 rounded-xl border border-gray-700 p-4 ${className}`}>
      <h3 className="text-sm text-gray-400 mb-4 flex items-center gap-2">
        <span>🧠</span> INDICADORES DE INTELIGÊNCIA ARTIFICIAL
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        {/* RSI */}
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400 uppercase tracking-wider">RSI</span>
            <span className={`text-xs font-bold ${getRSIStatus(indicators.rsi).color}`}>
              {getRSIStatus(indicators.rsi).status}
            </span>
          </div>
          <div className="text-2xl font-bold text-yellow-400">{indicators.rsi}</div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mt-2">
            <div 
              className="h-full rounded-full transition-all"
              style={{ 
                width: `${indicators.rsi}%`,
                background: indicators.rsi < 30 
                  ? 'linear-gradient(90deg, #00e676, #00bfa5)' 
                  : indicators.rsi > 70 
                    ? 'linear-gradient(90deg, #ff1744, #d50000)' 
                    : 'linear-gradient(90deg, #ffd700, #ff9100)'
              }}
            ></div>
          </div>
        </div>

        {/* MACD */}
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400 uppercase tracking-wider">MACD</span>
            <span className={`text-xs font-bold ${getMACDStatus(indicators.macd).color}`}>
              {getMACDStatus(indicators.macd).status}
            </span>
          </div>
          <div className="text-2xl font-bold text-yellow-400">{indicators.macd.toFixed(2)}</div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mt-2">
            <div 
              className="h-full rounded-full transition-all"
              style={{ 
                width: `${Math.abs(indicators.macd) * 50}%`,
                background: indicators.macd > 0 
                  ? 'linear-gradient(90deg, #00e676, #00bfa5)' 
                  : 'linear-gradient(90deg, #ff1744, #d50000)'
              }}
            ></div>
          </div>
        </div>

        {/* EMA 100 */}
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">EMA 100</div>
          <div className="text-lg font-bold text-blue-400">
            {indicators.ema100.toFixed(4)}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Tendência de longo prazo
          </div>
        </div>

        {/* Bandas de Bollinger */}
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">BANDAS DE BOLLINGER</div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-xs text-gray-400">Superior:</span>
              <span className="text-xs font-bold text-sky-400">
                {indicators.bbUpper.toFixed(4)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-400">Inferior:</span>
              <span className="text-xs font-bold text-orange-400">
                {indicators.bbLower.toFixed(4)}
              </span>
            </div>
          </div>
        </div>

        {/* Médias Móveis */}
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">MÉDIAS MÓVEIS</div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-xs text-gray-400">Fast (5):</span>
              <span className="text-xs font-bold text-pink-400">
                {indicators.smaFast.toFixed(4)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-400">Slow (34):</span>
              <span className="text-xs font-bold text-blue-400">
                {indicators.smaSlow.toFixed(4)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-400">Trend (20):</span>
              <span className="text-xs font-bold text-orange-400">
                {indicators.smaTrend.toFixed(4)}
              </span>
            </div>
          </div>
        </div>

        {/* Análise de Tendência */}
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">ANÁLISE DE TENDÊNCIA</div>
          <div className="text-lg font-bold text-yellow-400">
            {indicators.smaFast > indicators.smaSlow && indicators.smaSlow > indicators.smaTrend
              ? '📈 TENDÊNCIA ALTA'
              : indicators.smaFast < indicators.smaSlow && indicators.smaSlow < indicators.smaTrend
                ? '📉 TENDÊNCIA BAIXA'
                : '➡️ TENDÊNCIA NEUTRA'
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIIndicatorPanel