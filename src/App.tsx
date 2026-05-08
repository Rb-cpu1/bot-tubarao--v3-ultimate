import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import PaymentPage from './pages/PaymentPage'
import DashboardPage from './pages/DashboardPage'
import ProfilePage from './pages/ProfilePage'
import ToastContainer from './components/ToastContainer'
import LoadingSpinner from './components/LoadingSpinner'

function App() {
  const [isInitialized, setIsInitialized] = useState(false)
  const [authInitialized, setAuthInitialized] = useState(false)

  useEffect(() => {
    // Initialize app with splash screen
    const timer = setTimeout(() => {
      setIsInitialized(true)
    }, 1000) // Reduzido para 1 segundo
    return () => clearTimeout(timer)
  }, [])

  // Verificar se o auth está pronto
  useEffect(() => {
    if (isInitialized) {
      const authTimer = setTimeout(() => {
        setAuthInitialized(true)
      }, 500) // Tempo adicional para auth carregar
      return () => clearTimeout(authTimer)
    }
  }, [isInitialized])

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="text-center">
          <div className="text-6xl mb-6 animate-bounce">🦈</div>
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-white text-xl font-bold">Iniciando Bot Tubarão V4...</p>
          <p className="text-gray-300 text-sm mt-2">Multi-Strategy Intelligence System</p>
        </div>
      </div>
    )
  }

  if (!authInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="text-center">
          <div className="text-6xl mb-6">🦈</div>
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-white text-xl font-bold">Carregando sistema...</p>
          <p className="text-gray-300 text-sm mt-2">Aguarde um momento</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <AuthProvider>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App