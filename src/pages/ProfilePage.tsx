import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const ProfilePage: React.FC = () => {
  const navigate = useNavigate()
  const { profile } = useAuth()

  const userData = profile || {
    name: 'Trader',
    email: 'trader@example.com',
    plan: 'PRO',
    created_at: '01/01/2024',
    status: 'Ativo'
  }

  const planInfo = {
    name: userData.plan || 'PRO',
    description: userData.plan === 'Pro' ? 'Todos os ativos • Sinais ULTRA • 90 dias' :
                 userData.plan === 'Elite' ? 'Acesso VITALÍCIO • Tudo incluído' :
                 userData.plan === 'Básico' ? '3 ativos • Sinais IA • 30 dias' :
                 'Modo demonstração',
    status: 'ATIVO'
  }

  const formatDateString = (dateString: string) => {
    if (!dateString) return '01/01/2024'
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric', year: 'numeric' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      {/* Header */}
      <header className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 p-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
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
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-6 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-10"></div>
          
          <div className="relative z-10">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-black">
                {userData.name ? userData.name.charAt(0).toUpperCase() : 'T'}
              </span>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-bold px-3 py-1 rounded-full">
              {userData.plan || 'PRO'}
            </div>
            <h2 className="text-xl font-bold text-white mb-1">{userData.name || 'Trader'}</h2>
            <p className="text-sm text-gray-400">{userData.email || 'trader@example.com'}</p>
          </div>
        </div>

        {/* Information Section */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 mb-6 overflow-hidden">
          <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
            <h3 className="text-sm text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <span>🆔</span> INFORMAÇÕES
            </h3>
          </div>
          <div className="divide-y divide-gray-700">
            <div className="p-4 flex justify-between items-center">
              <span className="text-sm text-gray-400">Nome completo</span>
              <span className="text-sm font-medium text-white">{userData.name || 'Trader'}</span>
            </div>
            <div className="p-4 flex justify-between items-center">
              <span className="text-sm text-gray-400">Email</span>
              <span className="text-sm font-medium text-white">{userData.email || 'trader@example.com'}</span>
            </div>
            <div className="p-4 flex justify-between items-center">
              <span className="text-sm text-gray-400">Plano atual</span>
              <span className="text-sm font-medium text-yellow-400">{userData.plan || 'PRO'}</span>
            </div>
            <div className="p-4 flex justify-between items-center">
              <span className="text-sm text-gray-400">Membro desde</span>
              <span className="text-sm font-medium text-white">{formatDateString(userData.created_at)}</span>
            </div>
            <div className="p-4 flex justify-between items-center">
              <span className="text-sm text-gray-400">Status</span>
              <span className="text-sm font-medium text-green-400">✅ {userData.status || 'Ativo'}</span>
            </div>
          </div>
        </div>

        {/* Plan Section */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 mb-6 overflow-hidden">
          <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
            <h3 className="text-sm text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <span>👑</span> SEU PLANO
            </h3>
          </div>
          <div className="p-4">
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4 mb-4 flex items-center gap-4">
              <span className="text-2xl">💎</span>
              <div className="flex-1">
                <h4 className="font-bold text-yellow-400">{planInfo.name}</h4>
                <p className="text-sm text-gray-400">{planInfo.description}</p>
              </div>
              <span className="text-xs font-bold bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                {planInfo.status}
              </span>
            </div>
            <a
              href="https://wa.me/258835333667?text=Olá! Quero fazer upgrade do meu plano no Bot Tubarão V3"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black rounded-lg font-semibold hover:from-yellow-500 hover:to-orange-500 transition-all flex items-center justify-center gap-2"
            >
              <span>↑</span> Fazer Upgrade
            </a>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 mb-6 overflow-hidden">
          <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
            <h3 className="text-sm text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <span>🎧</span> SUPORTE
            </h3>
          </div>
          <div className="p-4">
            <a
              href="https://wa.me/258835333667"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
            >
              <span>💬</span> Falar com suporte via WhatsApp
            </a>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => {
            // Implement logout logic
            navigate('/')
          }}
          className="w-full py-3 bg-red-600/20 text-red-400 rounded-lg font-semibold hover:bg-red-600/40 transition-all flex items-center justify-center gap-2"
        >
          <span>🚪</span> Sair da conta
        </button>
      </main>
    </div>
  )
}

export default ProfilePage