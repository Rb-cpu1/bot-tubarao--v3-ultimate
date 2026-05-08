import { useAuth as useAuthContext } from '../contexts/AuthContext'

export const useAuth = () => {
  const context = useAuthContext()
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const useAuthActions = () => {
  const { user, profile, loading, logout } = useAuth()
  
  const isAuthenticated = !!user && !loading
  const hasProfile = !!profile
  
  return {
    user,
    profile,
    loading,
    logout,
    isAuthenticated,
    hasProfile,
    userName: profile?.name || user?.email?.split('@')[0] || 'Trader',
    userPlan: profile?.plan || 'Básico'
  }
}