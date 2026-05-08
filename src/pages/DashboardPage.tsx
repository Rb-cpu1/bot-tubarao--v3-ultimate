import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthActions } from '../hooks/useAuth'
import { useTrading } from '../hooks/useTrading'
import { useToast } from '../hooks/useToast'
import LoadingSpinner from '../components/LoadingSpinner'
import MarketGrid from '../components/MarketGrid'
import AdvancedSignalPanel from '../components/AdvancedSignalPanel'

const DashboardPage: React.FC = () => {
  const [currentSymbol, setCurrentSymbol] = useState('EURUSD')
  const [muted, setMuted] = useState(false)
  const [showStrategies, setShowStrategies] = useState(false)
  const navigate = useNavigate()
  const { userName, userPlan, logout } = useAuthActions()
  const { 
    currentSignal, 
    marketData, 
    allSymbols, 
    loading, 
    error, 
    isGenerating, 
    generateSignal,
    tradingHistory 
  } = useTrading(currentSymbol)
  const { showError, showSuccess } = useToast()

  const handleSymbolSelect = (symbol: string) => {
    setCurrentSymbol(symbol)
  }

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

  const getSymbolInfo = (symbol: string) => {
    return allSymbols.find(s => s.symbol === symbol)
  }

  const symbolInfo = getSymbolInfo(currentSymbol)

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

        {/* Market Selector */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm text-gray-400 flex items-center gap-2">
              <span>🌐</span> SELECIONE O MERCADO
            </h2>
            <div className="text-sm">
              <span className="text-gray-400">Ativo:</span>
              <span className="text-yellow-400 font-bold ml-2">
                {symbolInfo?.name || currentSymbol}
              </span>
            </div>
          </div>
          
          <MarketGrid 
            onSymbolSelect={handleSymbolSelect}
            currentSymbol={currentSymbol}
          />
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
            <AdvancedSignalPanel signal={currentSignal} />
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
                          {new Date(signal.createdAt).toLocaleDateString('pt-BR')}
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