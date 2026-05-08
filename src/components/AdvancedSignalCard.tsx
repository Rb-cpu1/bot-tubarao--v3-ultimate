import React from 'react'
import { TradingSignal } from '../services/aiEngine'

interface AdvancedSignalCardProps {
  signal: TradingSignal
  className?: string
}

const AdvancedSignalCard: React.FC<AdvancedSignalCardProps> = ({ signal, className = '' }) => {
  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const formatCountdown = (expiryTime: string) => {
    const expiry = new Date(expiryTime)
    const now = new Date()
    const diff = expiry.getTime() - now.getTime()
    
    if (diff <= 0) return '00:00'
    
    const minutes = Math.floor(diff / 60000)
    const seconds = Math.floor((diff % 60000) / 1000)
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-yellow-400'
    if (confidence >= 60) return 'text-green-400'
    return 'text-orange-400'
  }

  const getStrategyColor = (strategy: string) => {
    switch (strategy) {
      case 'Cazador Leve': return 'from-green-500 to-emerald-500'
      case 'Hiper Alpha': return 'from-purple-500 to-indigo-500'
      case 'Tubarão V3': return 'from-orange-500 to-red-500'
      default: return 'from-blue-500 to-cyan-500'
    }
  }

  return (
    <div className={`bg-gray-800/50 rounded-xl border-2 overflow-hidden ${className}`}>
      <div className="bg-gray-800 px-4 py-3 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-purple-400">📡</span>
          <span className="text-sm text-gray-400 uppercase tracking-wider">SINAL MULTI-STRATEGY</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${getStrategyColor(signal.strategy)} text-white`}>
            {signal.strategy}
          </span>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-500/20 text-green-400">
            ATIVO
          </span>
        </div>
      </div>
      
      <div className="p-4">
        {/* Signal Direction */}
        <div className={`text-center py-6 rounded-lg mb-6 ${
          signal.direction === 'CALL' 
            ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30' 
            : 'bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-500/30'
        }`}>
          <div className="text-5xl mb-4">
            {signal.direction === 'CALL' ? '📈' : '📉'}
          </div>
          <span className={`text-4xl font-bold tracking-wider ${
            signal.direction === 'CALL' ? 'text-green-400' : 'text-red-400'
          }`}>
            {signal.direction}
          </span>
          <div className="mt-4">
            <span className="text-xs text-gray-400 uppercase tracking-wider">ENTRADA IMEDIATA</span>
            <div className="text-lg font-bold text-yellow-400 mt-1 animate-pulse">
              ⚡ SINAL DE ALTA PRECISÃO
            </div>
          </div>
        </div>

        {/* Signal Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <span className="text-xs text-gray-400 uppercase tracking-wider mb-2">PAR</span>
            <div className="text-lg font-bold text-yellow-400">{signal.pair}</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <span className="text-xs text-gray-400 uppercase tracking-wider">TIMEFRAME</span>
            <div className="text-lg font-bold text-yellow-400">M5</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <span className="text-xs text-gray-400 uppercase tracking-wider">EXPIRAÇÃO</span>
            <div className="text-lg font-bold text-yellow-400">5 MINUTOS</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <span className="text-xs text-gray-400 uppercase tracking-wider">HORA</span>
            <div className="text-lg font-bold text-yellow-400">{formatTime(signal.created_at)}</div>
          </div>
        </div>

        {/* AI Confidence */}
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-purple-400 font-semibold">🧠 CONFIANÇA DA IA</span>
            <span className={`text-2xl font-bold ${getConfidenceColor(signal.confidence)}`}>
              {signal.confidence}%
            </span>
          </div>
          <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-1000"
              style={{ 
                width: `${signal.confidence}%`,
                background: signal.confidence >= 80 
                  ? 'linear-gradient(90deg, #ffd700, #ff9100, #ff6d00)' 
                  : signal.confidence >= 60 
                    ? 'linear-gradient(90deg, #00e676, #00bfa5)' 
                    : 'linear-gradient(90deg, #ff9100, #ff6d00)'
              }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>Fraco</span>
            <span>Forte</span>
          </div>
        </div>

        {/* Strategy Analysis */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-400 uppercase tracking-wider">ANÁLISE ESTRATÉGICA</span>
            <span className="text-xs font-bold text-yellow-400">{signal.strategy}</span>
          </div>
          <div className="space-y-2">
            {signal.reasons.map((reason, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-sm text-gray-300">{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Indicators Summary */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <span className="text-sm text-gray-400 uppercase tracking-wider mb-3 block">INDICADORES TÉCNICOS</span>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="text-xs text-gray-400 mb-1">RSI</div>
              <div className="text-sm font-bold text-yellow-400">
                {signal.indicators.rsi}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-400 mb-1">MACD</div>
              <div className="text-sm font-bold text-yellow-400">
                {signal.indicators.macd > 0 ? '+' : ''}{signal.indicators.macd.toFixed(2)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-400 mb-1">EMA 100</div>
              <div className="text-sm font-bold text-blue-400">
                {signal.indicators.ema100.toFixed(4)}
              </div>
            </div>
          </div>
        </div>

        {/* Countdown */}
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4 text-center">
          <span className="text-sm text-gray-400 uppercase tracking-wider mb-2 block">EXPIRA EM</span>
          <div className="text-3xl font-bold text-yellow-400">
            {formatCountdown(signal.expiry_time)}
          </div>
          <div className="text-xs text-gray-400 mt-2">
            ⏰ Agora é o momento de agir!
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdvancedSignalCard