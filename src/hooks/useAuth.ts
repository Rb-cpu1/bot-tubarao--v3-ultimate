import { useAuth as useAuthContext } from '../contexts/AuthContext'

export const useAuth = () => {
  const context = useAuthContext()
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const useAuthActions = () => {
  const { user, profile, loading, logout, authReady } = useAuth()
  
  const isAuthenticated = !!user && !loading && authReady
  const hasProfile = !!profile
  
  return {
    user,
    profile,
    loading,
    logout,
    isAuthenticated,
    hasProfile,
    authReady,
    userName: profile?.name || user?.email?.split('@')[0] || 'Trader',
    userPlan: profile?.plan || 'Básico'
  }
}