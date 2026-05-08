import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Carregar dados do usuário do localStorage
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
      setUserData(JSON.parse(currentUser))
    }
    setLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    navigate('/')
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Pro': return 'text-yellow-400'
      case 'Elite': return 'text-purple-400'
      case 'Demo': return 'text-green-400'
      case 'Básico': return 'text-blue-400'
      default: return 'text-gray-400'
    }
  }

  const getPlanBg = (plan: string) => {
    switch (plan) {
      case 'Pro': return 'bg-yellow-500/20'
      case 'Elite': return 'bg-purple-500/20'
      case 'Demo': return 'bg-green-500/20'
      case 'Básico': return 'bg-blue-500/20'
      default: return 'bg-gray-500/20'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">🦈</div>
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl font-bold">Carregando perfil...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="bg-gray-800/90 backdrop-blur-md border-b border-gray-700 p-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            ←
          </button>
          <h1 className="text-xl font-bold text-white">Perfil</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        {/* Profile Card */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-6 text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-black">
              {userData?.name?.charAt(0) || 'T'}
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mb-1">{userData?.name || 'Trader'}</h2>
          <p className="text-sm text-gray-400">{userData?.email || 'trader@example.com'}</p>
        </div>

        {/* Information Section */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 mb-6 overflow-hidden">
          <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
            <h3 className="text-sm text-gray-400 uppercase tracking-wider">INFORMAÇÕES</h3>
          </div>
          <div className="divide-y divide-gray-700">
            <div className="p-4 flex justify-between items-center">
              <span className="text-sm text-gray-400">Nome completo</span>
              <span className="text-sm font-medium text-white">{userData?.name || 'Trader'}</span>
            </div>
            <div className="p-4 flex justify-between items-center">
              <span className="text-sm text-gray-400">Email</span>
              <span className="text-sm font-medium text-white">{userData?.email || 'trader@example.com'}</span>
            </div>
            <div className="p-4 flex justify-between items-center">
              <span className="text-sm text-gray-400">Plano atual</span>
              <span className={`text-sm font-bold ${getPlanColor(userData?.plan || 'Básico')} ${getPlanBg(userData?.plan || 'Básico')} px-3 py-1 rounded-full`}>
                {userData?.plan || 'Básico'}
              </span>
            </div>
            <div className="p-4 flex justify-between items-center">
              <span className="text-sm text-gray-400">Membro desde</span>
              <span className="text-sm font-medium text-white">{new Date().toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="p-4 flex justify-between items-center">
              <span className="text-sm text-gray-400">Status</span>
              <span className="text-sm font-medium text-green-400">✅ Ativo</span>
            </div>
          </div>
        </div>

        {/* Plan Benefits */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 mb-6 overflow-hidden">
          <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
            <h3 className="text-sm text-gray-400 uppercase tracking-wider">BENEFÍCIOS DO SEU PLANO</h3>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {userData?.plan === 'Pro' && (
                <>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-green-400">✓</span>
                    <span>Acesso a todos os ativos</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-green-400">✓</span>
                    <span>Sinais ULTRA precisos</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-green-400">✓</span>
                    <span>Validade: 90 dias</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-green-400">✓</span>
                    <span>Suporte prioritário</span>
                  </div>
                </>
              )}
              {userData?.plan === 'Elite' && (
                <>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-green-400">✓</span>
                    <span>Tudo do plano Pro</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-green-400">✓</span>
                    <span>Acesso VITALÍCIO</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-green-400">✓</span>
                    <span>Atualizações grátis</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-green-400">✓</span>
                    <span>Suporte VIP 24/7</span>
                  </div>
                </>
              )}
              {userData?.plan === 'Demo' && (
                <>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-green-400">✓</span>
                    <span>Acesso demonstrativo</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-green-400">✓</span>
                    <span>Sinais básicos</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-green-400">✓</span>
                    <span>3 ativos principais</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-green-400">✓</span>
                    <span>Validade: 7 dias</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 mb-6 overflow-hidden">
          <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
            <h3 className="text-sm text-gray-400 uppercase tracking-wider">SUPORTE</h3>
          </div>
          <div className="p-4 space-y-3">
            <a
              href="https://wa.me/258835333667"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
            >
              <span>💬</span> Falar com suporte via WhatsApp
            </a>
            <a
              href="mailto:suporte@bottubarao.com"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
            >
              <span>📧</span> Enviar email para suporte
            </a>
          </div>
        </div>

        {/* Upgrade Section */}
        {userData?.plan !== 'Elite' && (
          <div className="bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 border border-yellow-500/20 rounded-xl p-6 mb-6">
            <div className="text-center">
              <h3 className="text-lg font-bold text-yellow-400 mb-2">Quer mais poder?</h3>
              <p className="text-gray-300 mb-4">
                Faça upgrade para o plano Elite e tenha acesso vitalício a todas as funcionalidades
              </p>
              <button
                onClick={() => navigate('/payment')}
                className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black rounded-lg font-semibold hover:from-yellow-500 hover:to-orange-500 transition-all"
              >
                <span>🚀</span> Fazer Upgrade
              </button>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full py-3 bg-red-600/20 text-red-400 rounded-lg font-semibold hover:bg-red-600/40 transition-all flex items-center justify-center gap-2"
        >
          <span>🚪</span> Sair da conta
        </button>
      </main>
    </div>
  )
}

export default ProfilePage