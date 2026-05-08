import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import PaymentPage from './pages/PaymentPage'
import DashboardPage from './pages/DashboardPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar se o usuário está logado
    const currentUser = localStorage.getItem('currentUser')
    setIsAuthenticated(!!currentUser)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="text-center">
          <div className="text-6xl mb-6">🦈</div>
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl font-bold">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <LoginPage />} />
        <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App