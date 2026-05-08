import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthActions } from '../hooks/useAuth'
import { useSignals } from '../hooks/useSignals'
import { useMarketData } from '../hooks/useMarketData'
import { useToast } from '../hooks/useToast'
import LoadingSpinner from '../components/LoadingSpinner'
import Chart from '../components/Chart'
import SignalCard from '../components/SignalCard'

interface Asset {
  pair: string
  flag: string
  price: number
}

const DashboardPage: React.FC = () => {
  const [activeAsset, setActiveAsset] = useState('EUR/USD')
  const [muted, setMuted] = useState(false)
  const navigate = useNavigate()
  const { userName, userPlan, logout } = useAuthActions()
  const { signals, loading: signalsLoading, generateNewSignal } = useSignals()
  const { data: marketData, loading: marketLoading } = useMarketData(activeAsset)
  const { showError, showSuccess } = useToast()

  const assets: Asset[] = [
    { pair: 'EUR/USD', flag: '🇪🇺🇺🇸', price: 1.0852 },
    { pair: 'USD/JPY', flag: '🇺🇸🇯🇵', price: 149.52 },
    { pair: 'GBP/USD', flag: '🇬🇧🇺🇸', price: 1.2653 },
    { pair: 'EUR/GBP', flag: '🇪🇺🇬🇧', price: 0.8578 },
    { pair: 'AUD/USD', flag: '🇦🇺🇺🇸', price: 0.6545 },
    { pair: 'BTC/USD', flag: '₿💲', price: 67520 }
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
      await generateNewSignal(activeAsset)
      showSuccess('Novo sinal gerado!')
    } catch (error) {
      showError('Erro ao gerar sinal')
    }
  }

  const activeSignal = signals.find(signal => 
    signal.pair === activeAsset && signal.status === 'active'
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      {/* Header */}
      <header className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 p-4 sticky top-0 z-50">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🦈</span>
            <div>
              <span className="text-lg font-bold text-yellow-400">BOT TUBARÃO</span>
              <span className="text-xs text-purple-400">V3 • IA</span>
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

      <main className="max-w-6xl mx-auto p-4">
        {/* Hero Section */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-xl font-semibold">
                Olá, <span className="text-yellow-400">{userName}</span> 👋
              </h1>
              <p className="text-sm text-gray-400">
                {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>
            <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-green-400">MERCADO ABERTO</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4 flex items-center gap-3">
            <span className="text-2xl">💰</span>
            <p className="text-sm text-gray-300">
              Seu próximo lucro está a um sinal de distância. A IA está trabalhando para você.
            </p>
          </div>
        </div>

        {/* AI Status */}
        <div className="mb-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-4 flex items-center gap-4">
          <span className="text-xl text-purple-400">🧠</span>
          <div className="flex-1">
            <span className="text-xs text-purple-400 uppercase tracking-wider">Motor de Inteligência Artificial</span>
            <p className="text-sm text-gray-300">IA Ativa — Pronta para operar</p>
          </div>
          <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
        </div>

        {/* Asset Selector */}
        <div className="mb-6">
          <h2 className="text-sm text-gray-400 mb-3 flex items-center gap-2">
            <span>🪙</span> ESCOLHA O ATIVO
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {assets.map((asset) => (
              <button
                key={asset.pair}
                onClick={() => setActiveAsset(asset.pair)}
                className={`p-3 rounded-lg border transition-all ${
                  activeAsset === asset.pair
                    ? 'border-yellow-400 bg-yellow-400/10 shadow-lg'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="text-center">
                  <div className="text-lg mb-1">{asset.flag}</div>
                  <div className="text-xs font-bold text-white mb-1">{asset.pair}</div>
                  <div className="text-xs text-yellow-400">
                    {marketData ? marketData.price.toFixed(asset.pair.includes('BTC') ? 0 : 4) : '--'}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="mb-6">
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
            <div className="bg-gray-800 px-4 py-3 flex justify-between items-center">
              <span className="text-sm font-bold text-yellow-400">{activeAsset}</span>
              <span className="text-xs text-gray-400">M5</span>
            </div>
            <div className="p-4">
              {marketLoading ? (
                <div className="flex items-center justify-center" style={{ height: 180 }}>
                  <LoadingSpinner />
                </div>
              ) : (
                <Chart pair={activeAsset} />
              )}
            </div>
          </div>
        </div>

        {/* Signal Card */}
        <div className="mb-6">
          {activeSignal ? (
            <SignalCard signal={activeSignal} />
          ) : (
            <div className="bg-gray-800/50 rounded-xl border-2 border-gray-700 overflow-hidden">
              <div className="bg-gray-800 px-4 py-3 flex justify-between items-center border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <span className="text-purple-400">📡</span>
                  <span className="text-sm text-gray-400 uppercase tracking-wider">SINAL DA IA</span>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-700 text-gray-300">
                  AGUARDANDO
                </span>
              </div>
              
              <div className="p-4">
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🦈</div>
                  <p className="text-sm text-gray-400 mb-2">A IA está analisando o mercado...</p>
                  <p className="text-xs text-gray-500">Aguarde o próximo sinal de alta precisão</p>
                  <button
                    onClick={handleGenerateSignal}
                    disabled={signalsLoading}
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2 mx-auto"
                  >
                    {signalsLoading ? (
                      <>
                        <LoadingSpinner size="sm" />
                        Gerando sinal...
                      </>
                    ) : (
                      <>
                        <span>🎯</span>
                        Gerar Sinal Agora
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Technical Analysis */}
        <div className="mb-6">
          <h2 className="text-sm text-gray-400 mb-3 flex items-center gap-2">
            <span>📊</span> ANÁLISE TÉCNICA
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'RSI', value: '45', status: 'ok' },
              { name: 'MACD', value: '📈 Bullish', status: 'green' },
              { name: 'TENDÊNCIA', value: '📈 ALTA', status: 'green' },
              { name: '🧠 IA', value: 'Analisando...', status: '' }
            ].map((indicator, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-3 text-center">
                <span className="text-xs text-gray-400 uppercase tracking-wider mb-2">{indicator.name}</span>
                <div className="text-sm font-bold text-yellow-400">{indicator.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Motivation */}
        <div className="mb-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4 text-center">
          <span className="text-2xl mb-2 block">🦈</span>
          <p className="text-sm text-yellow-400 italic">
            "O tubarão não caça toda hora. Ele espera o momento certo — e quando ataca, não erra."
          </p>
        </div>

        {/* History */}
        <div>
          <h2 className="text-sm text-gray-400 mb-3 flex items-center gap-2">
            <span>📝</span> ÚLTIMOS SINAIS
          </h2>
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
            {signals.length > 0 ? (
              <div className="divide-y divide-gray-700">
                {signals.slice(0, 5).map((signal) => (
                  <div key={signal.id} className="p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">
                        {signal.direction === 'CALL' ? '📈' : '📉'}
                      </span>
                      <div>
                        <div className="font-bold text-white">{signal.pair}</div>
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
              <div className="p-4 text-center text-gray-500 text-sm">
                Os sinais aparecerão aqui
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage