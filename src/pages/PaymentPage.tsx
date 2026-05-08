import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Plan {
  id: string
  name: string
  price: number
  features: string[]
  popular?: boolean
  elite?: boolean
}

const PaymentPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [txId, setTxId] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const navigate = useNavigate()

  const plans: Plan[] = [
    {
      id: 'basico',
      name: 'BÁSICO',
      price: 47,
      features: [
        'Acesso ao Bot Tubarão',
        'Sinais com IA',
        '3 ativos principais',
        'Validade: 30 dias'
      ]
    },
    {
      id: 'pro',
      name: 'PRO',
      price: 97,
      features: [
        'Tudo do Básico',
        'Todos os ativos',
        'Sinais ULTRA precisos',
        'Validade: 90 dias'
      ],
      popular: true
    },
    {
      id: 'elite',
      name: 'ELITE',
      price: 197,
      features: [
        'Tudo do Pro',
        'Acesso VITALÍCIO',
        'Atualizações grátis',
        'Suporte prioritário'
      ],
      elite: true
    }
  ]

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan)
  }

  const handleConfirmPayment = async () => {
    if (!txId.trim()) {
      alert('Cole o TxID da transação')
      return
    }

    try {
      // Here you would typically send the payment data to your backend
      console.log('Payment confirmed:', { plan: selectedPlan, txId })
      setShowSuccess(true)
    } catch (error) {
      alert('Erro ao confirmar pagamento')
    }
  }

  const copyAddress = () => {
    navigator.clipboard.writeText('0x6f6fc92b5fc7c7dc93e54fa3b731c1e745415911')
    alert('Endereço copiado!')
  }

  const copyPayID = () => {
    navigator.clipboard.writeText('544252086')
    alert('Binance Pay ID copiado!')
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 p-4">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-md text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-green-400 mb-4">Pagamento enviado!</h2>
          <p className="text-gray-300 mb-6">
            Estamos verificando sua transação. Você receberá seu código de ativação em até <strong>30 minutos</strong> pelo WhatsApp.
          </p>
          <p className="text-yellow-400 italic mb-6">
            Seu código será enviado para ativar o bot.
          </p>
          <div className="space-y-3">
            <a
              href="https://wa.me/258835333667"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Falar com suporte
            </a>
            <button
              onClick={() => navigate('/')}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Ir para Login
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          >
            ←
          </button>
          <h1 className="text-2xl font-bold text-white">🦈 Tubarão Trading</h1>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Escolha seu plano
          </h2>
          <p className="text-center text-gray-300 mb-6">
            Comece a lucrar com Inteligência Artificial hoje
          </p>

          <div className="space-y-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => handleSelectPlan(plan)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedPlan?.id === plan.id
                    ? 'border-yellow-400 bg-yellow-400/10 shadow-lg'
                    : 'border-gray-700 hover:border-gray-600'
                } ${plan.popular ? 'border-yellow-400' : ''} ${plan.elite ? 'border-purple-400' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-1 rounded-full text-sm font-bold">
                    MAIS POPULAR 🔥
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{plan.id === 'basico' ? '⭐' : plan.id === 'pro' ? '💎' : '👑'}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">{plan.name}</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="text-green-400">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-yellow-400">${plan.price}</span>
                    <span className="text-xs text-gray-400">USDT</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-400">
            <span>🔒</span>
            <span>Pagamento 100% seguro via Binance</span>
          </div>
        </div>

        {selectedPlan && (
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-center">Finalizar pagamento</h2>
            
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{selectedPlan.name}</span>
                <span className="text-xl font-bold text-yellow-400">${selectedPlan.price} USDT</span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm text-gray-400 mb-3">USDT — Rede BEP20 (BSC)</h3>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-2">Endereço USDT (BEP20)</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-yellow-400">0x6f6fc92b5fc7c7dc93e54fa3b731c1e745415911</span>
                    <button
                      onClick={copyAddress}
                      className="px-3 py-1 bg-yellow-400 text-black rounded text-sm font-semibold hover:bg-yellow-500 transition-colors"
                    >
                      Copiar
                    </button>
                  </div>
                </div>
                <div className="bg-orange-500/20 border border-orange-500 rounded-lg p-3 mt-3 text-sm text-orange-300">
                  <strong>Atenção:</strong> Envie APENAS pela rede BEP20 (BSC). Outra rede = perda dos fundos!
                </div>
              </div>

              <div className="flex items-center gap-4 my-4">
                <div className="flex-1 h-px bg-gray-700"></div>
                <span className="text-sm text-gray-400">OU</span>
                <div className="flex-1 h-px bg-gray-700"></div>
              </div>

              <div>
                <h3 className="text-sm text-gray-400 mb-3">Binance Pay ID</h3>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-yellow-400">544252086</span>
                    <button
                      onClick={copyPayID}
                      className="px-3 py-1 bg-yellow-400 text-black rounded text-sm font-semibold hover:bg-yellow-500 transition-colors"
                    >
                      Copiar
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm text-gray-400 mb-3">TxID (ID da transação)</h3>
                <input
                  type="text"
                  value={txId}
                  onChange={(e) => setTxId(e.target.value)}
                  placeholder="Cole o TxID aqui"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>

              <button
                onClick={handleConfirmPayment}
                className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black rounded-lg font-semibold hover:from-yellow-500 hover:to-orange-500 transition-all"
              >
                Confirmar Pagamento
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentPage