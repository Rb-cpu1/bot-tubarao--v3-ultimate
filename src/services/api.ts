import axios from 'axios'

const API_BASE_URL = 'https://api.example.com' // Replace with your actual API endpoint

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('supabase.auth.token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('supabase.auth.token')
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

export const marketApi = {
  // Get real-time market data
  getMarketData: async (pair: string) => {
    const response = await api.get(`/market/${pair}`)
    return response.data
  },

  // Get historical data for charts
  getHistoricalData: async (pair: string, timeframe: string = 'M5') => {
    const response = await api.get(`/market/${pair}/history?timeframe=${timeframe}`)
    return response.data
  },

  // Get AI signals
  getSignals: async () => {
    const response = await api.get('/signals')
    return response.data
  },

  // Generate new signal
  generateSignal: async (pair: string) => {
    const response = await api.post('/signals/generate', { pair })
    return response.data
  },

  // Get user trading history
  getTradingHistory: async () => {
    const response = await api.get('/trading/history')
    return response.data
  }
}

export default api