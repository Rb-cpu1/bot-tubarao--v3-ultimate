import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const DashboardPage: React.FC = () => {
  const [currentSymbol, setCurrentSymbol] = useState('EURUSD')
  const [signal, setSignal] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [marketData, setMarketData] = useState<any>(null)
  const [tradingHistory, setTradingHistory] = useState<any[]>([])
  const navigate = useNavigate()

  // Simulação de dados do mercado
  const symbols = [
    { symbol: 'EURUSD', name: 'Euro/Dólar', type: 'forex' },
    { symbol: 'GBPUSD', name: 'Libra/Dólar', type: 'forex' },
    { symbol: 'USDJPY', name: 'Dólar/Yen', type: 'forex' },
    { symbol: 'BTCUSD', name: 'Bitcoin/Dólar', type: 'crypto' },
    { symbol: 'ETHUSD', name: 'Ethereum/Dólar', type: 'crypto' },
    { symbol: 'XAUUSD', name: 'Ouro/Dólar', type: 'commodity' }
  ]

  // Simular dados do mercado
  useEffect(() => {
    const interval = setInterval(() => {
      const randomPrice = (Math.random() * 0.02 + 1.08).toFixed(4)
      setMarketData({
        symbol: currentSymbol,
        price: randomPrice,
        change: (Math.random() * 0.01 - 0.005).toFixed(4),
        timestamp: new Date().toISOString()
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [currentSymbol])

  // Gerar sinal simulado
  const generateSignal = async () => {
    setIsGenerating(true)
    
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const directions = ['CALL', 'PUT']
    const randomDirection = directions[Math.floor(Math.random() * directions.length)]
    const randomConfidence = Math.floor(Math.random() * 30) + 70
    
    const newSignal = {
      id: `signal_${Date.now()}`,
      symbol: currentSymbol,
      direction: randomDirection,
      confidence: randomConfidence,
      entry_price: marketData?.price || '1.0850',
      target_price: randomDirection === 'CALL' 
        ? (parseFloat(marketData?.price || '1.0850') * 1.01).toFixed(4)
        : (parseFloat(marketData?.price || '1.0850') * 0.99).toFixed(4),
      stop_loss: randomDirection === 'CALL'
        ? (parseFloat(marketData?.price || '1.0850') * 0.99).toFixed(4)
        : (parseFloat(marketData?.price || '1.0850') * 1.01).toFixed(4),
      expiry_time: new Date(Date.now() + 5 * 60000).toISOString(),
      created_at: new Date().toISOString(),
      strategy: 'Multi-Strategy AI',
      reasons: [
        'RSI saindo da zona de sobrevenda',
        'MACD bullish',
        'Preço acima da EMA 100'
      ],
      risk_level: randomConfidence >= 80 ? 'low' : 'medium',
      potential_return: Math.floor(Math.random() * 20) + 10
    }
    
    setSignal(newSignal)
    setTradingHistory(prev => [newSignal, ...prev.slice(0, 9)])
    setIsGenerating(false)
  }

  // Auto-gerar sinal a cada 5 minutos
  useEffect(() => {
    const interval = setInterval(() => {
      if (!signal) {
        generateSignal()
      }
    }, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [signal])

  const handleLogout = () => {
    navigate('/')
  }

  const getSymbolTypeColor = (type: string) => {
    switch (type) {
      case 'forex': return 'text-green-400'
      case 'crypto': return 'text-purple-400'
      case 'commodity': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="bg-gray-800/90 backdrop-blur-md border-b border-gray-700 p-4 sticky top-0 z-50">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🦈</span>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                BOT TUBARÃO V4
              </span>
              <span className="text-xs text-purple-400 ml-2">MULTI-STRATEGY AI</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/profile')}
              className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            >
              👤
            </button>
            <button
              onClick={handleLogout}
              className="p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/40 transition-colors"
            >
              🔌
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Olá, <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Trader
                </span> 👋
              </h1>
              <p className="text-gray-400">
                {new Date().toLocaleDateString('pt-BR', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
            <div className="flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-4 py-2 rounded-full border border-green-500/30">
              <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-green-400 font-semibold">MERCADO ATIVO</span>
              <span className="text-xs text-green-300">24/7</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 border border-yellow-500/20 rounded-xl p-6 flex items-center gap-4">
            <div className="text-4xl">🚀</div>
            <div>
              <p className="text-gray-300 mb-2">
                Sistema de IA Multi-Strategy operando em tempo real
              </p>
              <div className="flex gap-4 text-sm">
                <span className="text-green-400">✓ Forex</span>
                <span className="text-purple-400">✓ Criptomoedas</span>
                <span className="text-yellow-400">✓ Commodities</span>
                <span className="text-blue-400">✓ 3 Estratégias IA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Market Selector */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm text-gray-400 flex items-center gap-2">
              <span>🌐</span> SELECIONE O MERCADO
            </h2>
            <div className="text-sm">
              <span className="text-gray-400">Ativo:</span>
              <span className="text-yellow-400 font-bold ml-2">
                {symbols.find(s => s.symbol === currentSymbol)?.name || currentSymbol}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {symbols.map((symbol) => (
              <button
                key={symbol.symbol}
                onClick={() => setCurrentSymbol(symbol.symbol)}
                className={`p-4 bg-gray-800 rounded-lg border transition-all ${
                  currentSymbol === symbol.symbol
                    ? 'border-yellow-400 bg-yellow-400/10 shadow-lg'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold text-white">{symbol.symbol}</div>
                  <span className={`text-sm ${getSymbolTypeColor(symbol.type)}`}>
                    {symbol.type === 'forex' ? '🌐' : symbol.type === 'crypto' ? '₿' : '🏅'}
                  </span>
                </div>
                <div className="text-xs text-gray-400">{symbol.name}</div>
                {marketData && marketData.symbol === symbol.symbol && (
                  <div className="mt-2 text-xs">
                    <span className="text-green-400">${marketData.price}</span>
                    <span className={`ml-2 ${parseFloat(marketData.change) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {parseFloat(marketData.change) >= 0 ? '↑' : '↓'} {Math.abs(parseFloat(marketData.change)) * 100}%
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Signal Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm text-gray-400 flex items-center gap-2">
              <span>📡</span> SINAL DA IA MULTI-STRATEGY
            </h2>
            <button
              onClick={generateSignal}
              disabled={isGenerating}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-sm font-semibold hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <span className="animate-spin">⚡</span>
                  Gerando...
                </>
              ) : (
                <>
                  <span>🎯</span>
                  Gerar Sinal
                </>
              )}
            </button>
          </div>

          {signal ? (
            <div className="bg-gray-800/50 rounded-xl border-2 overflow-hidden">
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
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${getRiskColor(signal.risk_level)} bg-opacity-20`}>
                      RISCO {signal.risk_level.toUpperCase()}
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

                {/* Signal Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-800 rounded-lg p-4 text-center">
                    <span className="text-xs text-gray-400 uppercase tracking-wider mb-2">ATIVO</span>
                    <div className="text-lg font-bold text-yellow-400">{signal.symbol}</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 text-center">
                    <span className="text-xs text-gray-400 uppercase tracking-wider mb-2">TIMEFRAME</span>
                    <div className="text-lg font-bold text-yellow-400">M5</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 text-center">
                    <span className="text-xs text-gray-400 uppercase tracking-wider mb-2">EXPIRAÇÃO</span>
                    <div className="text-lg font-bold text-yellow-400">5 MINUTOS</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 text-center">
                    <span className="text-xs text-gray-400 uppercase tracking-wider mb-2">HORA</span>
                    <div className="text-lg font-bold text-yellow-400">{formatTime(signal.created_at)}</div>
                  </div>
                </div>

                {/* Risk Management */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-800 rounded-lg p-4 text-center">
                    <span className="text-xs text-gray-400 uppercase tracking-wider mb-2">PREÇO DE ENTRADA</span>
                    <div className="text-lg font-bold text-blue-400">
                      ${signal.entry_price}
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 text-center">
                    <span className="text-xs text-gray-400 uppercase tracking-wider mb-2">ALVO</span>
                    <div className="text-lg font-bold text-green-400">
                      ${signal.target_price}
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 text-center">
                    <span className="text-xs text-gray-400 uppercase tracking-wider mb-2">STOP LOSS</span>
                    <div className="text-lg font-bold text-red-400">
                      ${signal.stop_loss}
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
                    {signal.reasons.map((reason: string, index: number) => (
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
                      +{signal.potential_return}%
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
                    {formatCountdown(signal.expiry_time)}
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    ⏰ Agora é o momento de agir!
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800/50 rounded-xl border-2 border-gray-700 overflow-hidden">
              <div className="bg-gray-800 px-4 py-3 flex justify-between items-center border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <span className="text-purple-400">📡</span>
                  <span className="text-sm text-gray-400 uppercase tracking-wider">AGUARDANDO SINAL</span>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-700 text-gray-300">
                  IA ANALISANDO
                </span>
              </div>
              
              <div className="p-8 text-center">
                <div className="text-6xl mb-6">🦈</div>
                <h3 className="text-xl font-bold text-gray-300 mb-2">A IA está analisando o mercado</h3>
                <p className="text-gray-400 mb-6">
                  Integrando 3 estratégias avançadas para encontrar a melhor oportunidade
                </p>
                <div className="flex justify-center gap-4 text-sm text-gray-500">
                  <span>🎯 Cazador Leve</span>
                  <span>⚡ Hiper Alpha</span>
                  <span>🦈 Tubarão V3</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Trading History */}
        <div>
          <h2 className="text-sm text-gray-400 mb-4 flex items-center gap-2">
            <span>📝</span> HISTÓRICO DE SINAIS
          </h2>
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
            {tradingHistory.length > 0 ? (
              <div className="divide-y divide-gray-700">
                {tradingHistory.map((signal, index) => (
                  <div key={signal.id} className="p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">
                        {signal.direction === 'CALL' ? '📈' : '📉'}
                      </span>
                      <div>
                        <div className="font-bold text-white">{signal.symbol}</div>
                        <div className="text-xs text-gray-400">
                          {new Date(signal.created_at).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-bold ${
                        signal.direction === 'CALL' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {signal.direction}
                      </div>
                      <div className="text-xs text-gray-400">
                        {signal.confidence}% confiança
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                <div className="text-4xl mb-4">📊</div>
                <p>Os sinais aparecerão aqui</p>
                <p className="text-sm text-gray-400 mt-2">Histórico completo de operações</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage