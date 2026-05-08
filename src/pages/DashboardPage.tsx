import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DashboardPage: React.FC = () => {
  const [currentSymbol, setCurrentSymbol] = useState('EURUSD')
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }

  const symbols = [
    { symbol: 'EURUSD', name: 'Euro/Dólar' },
    { symbol: 'GBPUSD', name: 'Libra/Dólar' },
    { symbol: 'USDJPY', name: 'Dólar/Yen' },
    { symbol: 'BTCUSD', name: 'Bitcoin/Dólar' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="bg-gray-800/90 backdrop-blur-md border-b border-gray-700 p-4">
        <div className="flex justify-between items-center">
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
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                <div className="font-bold text-white">{symbol.symbol}</div>
                <div className="text-xs text-gray-400">{symbol.name}</div>
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
              onClick={() => {
                alert('Novo sinal gerado pela IA!')
              }}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-sm font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              <span>🎯</span>
              Gerar Sinal
            </button>
          </div>

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