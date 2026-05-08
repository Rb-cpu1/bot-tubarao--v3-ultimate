import React from 'react'
import { TradingSignal } from '../services/tradingEngine'

interface AdvancedSignalPanelProps {
  signal: TradingSignal
  className?: string
}

const AdvancedSignalPanel: React.FC<AdvancedSignalPanelProps> = ({ signal, className = '' }) => {
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

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400'
      case 'medium': return 'text-yellow-400'
      case 'high': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getRiskBg = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-500/20'
      case 'medium': return 'bg-yellow-500/20'
      case 'high': return 'bg-red-500/20'
      default: return 'bg-gray-500/20'
    }
  }

  return (
    <div className={`bg-gray-800/50 rounded-xl border-2 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 px-6 py-4 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🦈</span>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                BOT TUBARÃO V4
              </h2>
              <p className="text-sm text-gray-400">Sinal Multi-Strategy AI</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${getRiskBg(signal.riskLevel)} ${getRiskColor(signal.riskLevel)}`}>
              RISCO {signal.riskLevel.toUpperCase()}
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-500/20 text-green-400">
              ATIVO
            </span>
          </div>
        </div>
      </div>

      {/* Signal Direction */}
      <div className="p-6">
        <div className={`text-center py-8 rounded-xl mb-6 ${
          signal.direction === 'CALL' 
            ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30' 
            : 'bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-500/30'
        }`}>
          <div className="text-6xl mb-4">
            {signal.direction === 'CALL' ? '📈' : '📉'}
          </div>
          <span className={`text-5xl font-bold tracking-wider ${
            signal.direction === 'CALL' ? 'text-green-400' : 'text-red-400'
          }`}>
            {signal.direction}
          </span>
          <div className="mt-4">
            <span className="text-xs text-gray-400 uppercase tracking-wider">OPORTUNIDADE DE TRADING</span>
            <div className="text-xl font-bold text-yellow-400 mt-2 animate-pulse">
              ⚡ SINAL DE ALTA PRECISÃO
            </div>
          </div>
        </div>

        {/* Signal Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <span className="text-xs text-gray-400 uppercase tracking-wider mb-2">ATIVO</span>
            <div className="text-lg font-bold text-yellow-400">{signal.symbol}</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <span className="text-xs text-gray-400 uppercase tracking-wider mb-2">TIMEFRAME</span>
            <div className="text-lg font-bold text-yellow-400">{signal.timeframe}</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <span className="text-xs text-gray-400 uppercase tracking-wider mb-2">EXPIRAÇÃO</span>
            <div className="text-lg font-bold text-yellow-400">5 MINUTOS</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <span className="text-xs text-gray-400 uppercase tracking-wider mb-2">HORA</span>
            <div className="text-lg font-bold text-yellow-400">{formatTime(signal.createdAt)}</div>
          </div>
        </div>

        {/* Risk Management */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <span className="text-xs text-gray-400 uppercase tracking-wider mb-2">PREÇO DE ENTRADA</span>
            <div className="text-lg font-bold text-blue-400">
              ${signal.entryPrice.toFixed(2)}
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <span className="text-xs text-gray-400 uppercase tracking-wider mb-2">ALVO</span>
            <div className="text-lg font-bold text-green-400">
              ${signal.targetPrice.toFixed(2)}
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <span className="text-xs text-gray-400 uppercase tracking-wider mb-2">STOP LOSS</span>
            <div className="text-lg font-bold text-red-400">
              ${signal.stopLoss.toFixed(2)}
            </div>
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

        {/* Potential Return */}
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400 uppercase tracking-wider">POTENCIAL DE RETORNO</span>
            <span className="text-2xl font-bold text-yellow-400">
              +{signal.potentialReturn}%
            </span>
          </div>
          <div className="text-xs text-gray-400 mt-2">
            Baseado na volatilidade atual do mercado
          </div>
        </div>

        {/* Countdown */}
        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-4 text-center">
          <span className="text-sm text-gray-400 uppercase tracking-wider mb-2 block">EXPIRA EM</span>
          <div className="text-3xl font-bold text-red-400">
            {formatCountdown(signal.expiryTime)}
          </div>
          <div className="text-xs text-gray-400 mt-2">
            ⏰ Agora é o momento de agir!
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdvancedSignalPanel