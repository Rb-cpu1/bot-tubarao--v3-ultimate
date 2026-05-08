import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthActions } from '../hooks/useAuth'
import { useAIEngine } from '../hooks/useAIEngine'
import { useToast } from '../hooks/useToast'
import LoadingSpinner from '../components/LoadingSpinner'
import AIIndicatorPanel from '../components/AIIndicatorPanel'
import AdvancedSignalCard from '../components/AdvancedSignalCard'

interface Asset {
  pair: string
  flag: string
  name: string
  type: 'forex' | 'crypto' | 'commodity'
}

const DashboardPage: React.FC = () => {
  const [activeAsset, setActiveAsset] = useState('EUR/USD')
  const [muted, setMuted] = useState(false)
  const [showStrategies, setShowStrategies] = useState(false)
  const navigate = useNavigate()
  const { userName, userPlan, logout } = useAuthActions()
  const { currentSignal, marketData, loading, error, isGenerating, generateSignal } = useAIEngine(activeAsset)
  const { showError, showSuccess } = useToast()

  const assets: Asset[] = [
    // Forex
    { pair: 'EUR/USD', flag: '🇪🇺🇺🇸', name: 'Euro/Dólar', type: 'forex' },
    { pair: 'USD/JPY', flag: '🇺🇸🇯🇵', name: 'Dólar/Yen', type: 'forex' },
    { pair: 'GBP/USD', flag: '🇬🇧🇺🇸', name: 'Libra/Dólar', type: 'forex' },
    { pair: 'USD/CHF', flag: '🇺🇸🇨🇭', name: 'Dólar/Franco', type: 'forex' },
    { pair: 'AUD/USD', flag: '🇦🇺🇺🇸', name: 'Dólar Australiano', type: 'forex' },
    { pair: 'USD/CAD', flag: '🇺🇸🇨🇦', name: 'Dólar Canadense', type: 'forex' },
    { pair: 'NZD/USD', flag: '🇳🇿🇺🇸', name: 'Dólar Neozelandês', type: 'forex' },
    { pair: 'EUR/GBP', flag: '🇪🇺🇬🇧', name: 'Euro/Libra', type: 'forex' },
    
    // Cryptocurrencies
    { pair: 'BTC/USD', flag: '₿💎', name: 'Bitcoin', type: 'crypto' },
    { pair: 'ETH/USD', flag: '🔷💎', name: 'Ethereum', type: 'crypto' },
    { pair: 'BNB/USD', flag: '🟡💎', name: 'Binance Coin', type: 'crypto' },
    { pair: 'SOL/USD', flag: '🌟💎', name: 'Solana', type: 'crypto' },
    { pair: 'XRP/USD', flag: '🌊💎', name: 'Ripple', type: 'crypto' },
    { pair: 'ADA/USD', flag: '🔷💎', name: 'Cardano', type: 'crypto' },
    
    // Commodities
    { pair: 'XAU/USD', flag: '🏅💰', name: 'Ouro', type: 'commodity' },
    { pair: 'XAG/USD', flag: '🥈💰', name: 'Prata', type: 'commodity' },
    { pair: 'WTI/USD', flag: '🛢️💰', name: 'Petróleo WTI', type: 'commodity' },
    { pair: 'NG/USD', flag: '🔥💰', name: 'Gás Natural', type: 'commodity' }
  ]

  const handleLogout = async () => {
    try {
      await logout()
      showSuccess('Logout realizado com sucesso!')
      navigate('/')
    } catch (error) {
      showError('Erro ao realizar logout')
    }
  }

  const handleGenerateSignal = async () => {
    try {
      await generateSignal()
      showSuccess('Novo sinal gerado pela IA!')
    } catch (error) {
      showError('Erro ao gerar sinal')
    }
  }

  const getAssetTypeColor = (type: string) => {
    switch (type) {
      case 'forex': return 'text-green-400'
      case 'crypto': return 'text-purple-400'
      case 'commodity': return 'text-yellow-400'
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
              onClick={() => setMuted(!muted)}
              className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            >
              {muted ? '🔇' : '🔊'}
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
                  {userName}
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

        {/* AI Status */}
        <div className="mb-8 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-indigo-500/10 border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-3xl text-purple-400">🧠</div>
              <div>
                <div className="text-sm text-purple-400 uppercase tracking-wider mb-1">
                  MOTOR DE INTELIGÊNCIA ARTIFICIAL V4
                </div>
                <p className="text-gray-300">
                  3 estratégias integradas • Análise em tempo real • Sinais de alta precisão
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-green-400">IA ATIVA</span>
            </div>
          </div>
        </div>

        {/* Asset Selector */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm text-gray-400 flex items-center gap-2">
              <span>🌐</span> SELECIONE O MERCADO
            </h2>
            <button
              onClick={() => setShowStrategies(!showStrategies)}
              className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
            >
              {showStrategies ? 'Ocultar estratégias' : 'Ver estratégias'}
            </button>
          </div>
          
          {showStrategies && (
            <div className="mb-4 bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <h3 className="text-sm font-semibold text-gray-300 mb-3">Estratégias Ativas:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-gray-800 rounded-lg p-3 border border-green-500/20">
                  <div className="text-green-400 font-semibold mb-1">🎯 Cazador Leve</div>
                  <div className="text-xs text-gray-400">Timeframe M5 • Sinais rápidos</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 border border-purple-500/20">
                  <div className="text-purple-400 font-semibold mb-1">⚡ Hiper Alpha</div>
                  <div className="text-xs text-gray-400">Timeframe M15 • Alta precisão</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 border border-orange-500/20">
                  <div className="text-orange-400 font-semibold mb-1">🦈 Tubarão V3</div>
                  <div className="text-xs text-gray-400">Timeframe M30 • Multi-indicador</div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {assets.map((asset) => (
              <button
                key={asset.pair}
                onClick={() => setActiveAsset(asset.pair)}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  activeAsset === asset.pair
                    ? 'border-yellow-400 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 shadow-lg transform scale-105'
                    : 'border-gray-700 hover:border-gray-600 hover:bg-gray-800/50'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{asset.flag}</div>
                  <div className="text-xs font-bold text-white mb-1">{asset.pair}</div>
                  <div className="text-xs text-gray-400 mb-2">{asset.name}</div>
                  <span className={`text-xs font-semibold ${getAssetTypeColor(asset.type)}`}>
                    {asset.type.toUpperCase()}
                  </span>
                </div>
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
              onClick={handleGenerateSignal}
              disabled={isGenerating || loading}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-sm font-semibold hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <LoadingSpinner size="sm" />
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

          {currentSignal ? (
            <AdvancedSignalCard signal={currentSignal} />
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

        {/* AI Indicators Panel */}
        <div className="mb-8">
          <AIIndicatorPanel marketData={marketData} />
        </div>

        {/* Market Overview */}
        <div className="mb-8">
          <h2 className="text-sm text-gray-400 mb-4 flex items-center gap-2">
            <span>📊</span> VISÃO GERAL DO MERCADO
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Volatilidade', value: 'Moderada', trend: 'stable', color: 'text-yellow-400' },
              { name: 'Liquidez', value: 'Alta', trend: 'high', color: 'text-green-400' },
              { name: 'Sentimento', value: 'Bullish', trend: 'positive', color: 'text-green-400' },
              { name: 'Volume', value: '1.2M', trend: 'high', color: 'text-blue-400' }
            ].map((item, index) => (
              <div key={index} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <div className="text-xs text-gray-400 mb-2">{item.name}</div>
                <div className={`text-lg font-bold ${item.color}`}>{item.value}</div>
                <div className="text-xs text-gray-500 mt-1">{item.trend}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trading History */}
        <div>
          <h2 className="text-sm text-gray-400 mb-4 flex items-center gap-2">
            <span>📝</span> HISTÓRICO DE SINAIS
          </h2>
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
            <div className="p-6 text-center text-gray-500">
              <div className="text-4xl mb-4">📊</div>
              <p>Os sinais aparecerão aqui</p>
              <p className="text-sm text-gray-400 mt-2">Histórico completo de operações</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage