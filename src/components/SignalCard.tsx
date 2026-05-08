import React from 'react'
import { Signal } from '../hooks/useSignals'

interface SignalCardProps {
  signal: Signal
  className?: string
}

const SignalCard: React.FC<SignalCardProps> = ({ signal, className = '' }) => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400'
      case 'expired': return 'bg-red-500/20 text-red-400'
      case 'executed': return 'bg-blue-500/20 text-blue-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <div className={`bg-gray-800/50 rounded-xl border-2 overflow-hidden ${className}`}>
      <div className="bg-gray-800 px-4 py-3 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-purple-400">📡</span>
          <span className="text-sm text-gray-400 uppercase tracking-wider">SINAL DA IA</span>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(signal.status)}`}>
          {signal.status.toUpperCase()}
        </span>
      </div>
      
      <div className="p-4">
        <div className={`text-center py-4 rounded-lg mb-4 ${
          signal.direction === 'CALL' 
            ? 'bg-green-500/10 border border-green-500/20' 
            : 'bg-red-500/10 border border-red-500/20'
        }`}>
          <span className="text-3xl mb-2 block">
            {signal.direction === 'CALL' ? '📈' : '📉'}
          </span>
          <span className={`text-2xl font-bold tracking-wider ${
            signal.direction === 'CALL' ? 'text-green-400' : 'text-red-400'
          }`}>
            {signal.direction}
          </span>
          <span className="text-xs text-yellow-400 uppercase tracking-wider mt-2 block animate-pulse">
            ENTRADA AGORA
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-800 rounded-lg p-3 text-center">
            <span className="text-xs text-gray-400 uppercase tracking-wider">ATIVO</span>
            <span className="text-sm font-bold text-yellow-400">{signal.pair}</span>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 text-center">
            <span className="text-xs text-gray-400 uppercase tracking-wider">TIMEFRAME</span>
            <span className="text-sm font-bold text-yellow-400">M5</span>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 text-center">
            <span className="text-xs text-gray-400 uppercase tracking-wider">EXPIRAÇÃO</span>
            <span className="text-sm font-bold text-yellow-400">5 minutos</span>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 text-center">
            <span className="text-xs text-gray-400 uppercase tracking-wider">HORA</span>
            <span className="text-sm font-bold text-yellow-400">{formatTime(signal.created_at)}</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-3 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-purple-400">🧠 CONFIANÇA DA IA</span>
            <span className={`text-lg font-bold ${getConfidenceColor(signal.confidence)}`}>
              {signal.confidence}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all"
              style={{ 
                width: `${signal.confidence}%`,
                background: signal.confidence >= 80 
                  ? 'linear-gradient(90deg, #ffd700, #ff9100)' 
                  : signal.confidence >= 60 
                    ? 'linear-gradient(90deg, #00e676, #00bfa5)' 
                    : 'linear-gradient(90deg, #ff9100, #ff6d00)'
              }}
            ></div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-3 mb-4">
          <span className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">POR QUE ESTE SINAL?</span>
          <div className="space-y-1">
            {signal.reasons.map((reason, index) => (
              <div key={index} className="flex items-center gap-2 text-xs text-green-400">
                <span>✓</span>
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-3 text-center">
          <span className="text-xs text-gray-400 uppercase tracking-wider">Expira em</span>
          <span className="text-xl font-bold text-yellow-400">{formatCountdown(signal.expiry_time)}</span>
        </div>
      </div>
    </div>
  )
}

export default SignalCard