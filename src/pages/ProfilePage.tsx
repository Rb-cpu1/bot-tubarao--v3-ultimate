import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProfilePage: React.FC = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
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
            <span className="text-2xl font-bold text-black">T</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-1">Trader</h2>
          <p className="text-sm text-gray-400">trader@example.com</p>
        </div>

        {/* Information Section */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 mb-6 overflow-hidden">
          <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
            <h3 className="text-sm text-gray-400 uppercase tracking-wider">INFORMAÇÕES</h3>
          </div>
          <div className="divide-y divide-gray-700">
            <div className="p-4 flex justify-between items-center">
              <span className="text-sm text-gray-400">Nome completo</span>
              <span className="text-sm font-medium text-white">Trader</span>
            </div>
            <div className="p-4 flex justify-between items-center">
              <span className="text-sm text-gray-400">Email</span>
              <span className="text-sm font-medium text-white">trader@example.com</span>
            </div>
            <div className="p-4 flex justify-between items-center">
              <span className="text-sm text-gray-400">Plano atual</span>
              <span className="text-sm font-medium text-yellow-400">Pro</span>
            </div>
            <div className="p-4 flex justify-between items-center">
              <span className="text-sm text-gray-400">Membro desde</span>
              <span className="text-sm font-medium text-white">01/01/2024</span>
            </div>
            <div className="p-4 flex justify-between items-center">
              <span className="text-sm text-gray-400">Status</span>
              <span className="text-sm font-medium text-green-400">✅ Ativo</span>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 mb-6 overflow-hidden">
          <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
            <h3 className="text-sm text-gray-400 uppercase tracking-wider">SUPORTE</h3>
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