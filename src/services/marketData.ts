import { marketApi } from './api'

interface MarketData {
  symbol: string
  name: string
  type: 'forex' | 'crypto' | 'commodity' | 'index'
  price: number
  change: number
  changePercent: number
  volume: number
  high24h: number
  low24h: number
  timestamp: string
  indicators: {
    rsi: number
    macd: number
    ema100: number
    sma20: number
    bbUpper: number
    bbLower: number
    trend: 'bullish' | 'bearish' | 'neutral'
    volatility: number
  }
}

interface TradingSignal {
  id: string
  symbol: string
  direction: 'CALL' | 'PUT'
  confidence: number
  timeframe: string
  entryPrice: number
  targetPrice: number
    stopLoss: number
  expiryTime: string
  createdAt: string
  strategy: string
  reasons: string[]
  riskLevel: 'low' | 'medium' | 'high'
  potentialReturn: number
}

class MarketDataService {
  private symbols = {
    forex: [
      { symbol: 'EURUSD', name: 'Euro/Dólar Americano', pip: 0.0001 },
      { symbol: 'GBPUSD', name: 'Libra Esterlina/Dólar Americano', pip: 0.0001 },
      { symbol: 'USDJPY', name: 'Dólar Americano/Yen Japonês', pip: 0.001 },
      { symbol: 'USDCHF', name: 'Dólar Americano/Franco Suíço', pip: 0.0001 },
      { symbol: 'AUDUSD', name: 'Dólar Australiano/Dólar Americano', pip: 0.0001 },
      { symbol: 'USDCAD', name: 'Dólar Americano/Dólar Canadense', pip: 0.0001 },
      { symbol: 'NZDUSD', name: 'Dólar Neozelandês/Dólar Americano', pip: 0.0001 },
      { symbol: 'EURGBP', name: 'Euro/Libra Esterlina', pip: 0.0001 }
    ],
    crypto: [
      { symbol: 'BTCUSD', name: 'Bitcoin', pip: 0.01 },
      { symbol: 'ETHUSD', name: 'Ethereum', pip: 0.01 },
      { symbol: 'BNBUSD', name: 'Binance Coin', pip: 0.01 },
      { symbol: 'SOLUSD', name: 'Solana', pip: 0.001 },
      { symbol: 'XRPUSD', name: 'Ripple', pip: 0.0001 },
      { symbol: 'ADAUSD', name: 'Cardano', pip: 0.0001 },
      { symbol: 'DOTUSD', name: 'Polkadot', pip: 0.001 },
      { symbol: 'AVAXUSD', name: 'Avalanche', pip: 0.001 }
    ],
    commodity: [
      { symbol: 'XAUUSD', name: 'Ouro', pip: 0.01 },
      { symbol: 'XAGUSD', name: 'Prata', pip: 0.001 },
      { symbol: 'WTIUSD', name: 'Petróleo WTI', pip: 0.01 },
      { symbol: 'NGUSD', name: 'Gás Natural', pip: 0.001 }
    ]
  }

  async getMarketData(symbol: string): Promise<MarketData> {
    // Simulate real market data with realistic price movements
    const basePrice = await this.getBasePrice(symbol)
    const volatility = Math.random() * 0.02 + 0.01
    const change = (Math.random() - 0.5) * 0.02
    
    return {
      symbol,
      name: this.getSymbolName(symbol),
      type: this.getSymbolType(symbol),
      price: basePrice * (1 + change),
      change: change * basePrice,
      changePercent: change * 100,
      volume: Math.floor(Math.random() * 1000000) + 100000,
      high24h: basePrice * (1 + volatility),
      low24h: basePrice * (1 - volatility),
      timestamp: new Date().toISOString(),
      indicators: {
        rsi: this.calculateRSI(basePrice),
        macd: this.calculateMACD(basePrice),
        ema100: this.calculateEMA(basePrice, 100),
        sma20: this.calculateSMA(basePrice, 20),
        bbUpper: basePrice * (1 + volatility * 2.5),
        bbLower: basePrice * (1 - volatility * 2.5),
        trend: this.calculateTrend(basePrice),
        volatility: volatility * 100
      }
    }
  }

  private async getBasePrice(symbol: string): Promise<number> {
    const prices: Record<string, number> = {
      'EURUSD': 1.0852,
      'GBPUSD': 1.2653,
      'USDJPY': 149.52,
      'USDCHF': 0.9023,
      'AUDUSD': 0.6545,
      'USDCAD': 1.3567,
      'NZDUSD': 0.6123,
      'EURGBP': 0.8578,
      'BTCUSD': 67520,
      'ETHUSD': 3200,
      'BNBUSD': 580,
      'SOLUSD': 145,
      'XRPUSD': 0.52,
      'ADAUSD': 0.45,
      'DOTUSD': 6.5,
      'AVAXUSD': 32,
      'XAUUSD': 2030,
      'XAGUSD': 22.5,
      'WTIUSD': 78.5,
      'NGUSD': 2.8
    }
    
    return prices[symbol] || 1.0
  }

  private getSymbolName(symbol: string): string {
    for (const category of Object.values(this.symbols)) {
      const found = category.find(s => s.symbol === symbol)
      if (found) return found.name
    }
    return symbol
  }

  private getSymbolType(symbol: string): 'forex' | 'crypto' | 'commodity' | 'index' {
    if (this.symbols.forex.some(s => s.symbol === symbol)) return 'forex'
    if (this.symbols.crypto.some(s => s.symbol === symbol)) return 'crypto'
    if (this.symbols.commodity.some(s => s.symbol === symbol)) return 'commodity'
    return 'index'
  }

  private calculateRSI(price: number): number {
    // Simplified RSI calculation
    const base = 50
    const variation = (Math.random() - 0.5) * 40
    return Math.max(0, Math.min(100, base + variation))
  }

  private calculateMACD(price: number): number {
    // Simplified MACD calculation
    return (Math.random() - 0.5) * 2
  }

  private calculateEMA(price: number, period: number): number {
    // Simplified EMA calculation
    return price * (1 + (Math.random() - 0.5) * 0.01)
  }

  private calculateSMA(price: number, period: number): number {
    // Simplified SMA calculation
    return price * (1 + (Math.random() - 0.5) * 0.005)
  }

  private calculateTrend(price: number): 'bullish' | 'bearish' | 'neutral' {
    const random = Math.random()
    if (random < 0.3) return 'bearish'
    if (random < 0.7) return 'neutral'
    return 'bullish'
  }

  getAllSymbols(): Array<{ symbol: string; name: string; type: string }> {
    const allSymbols = []
    
    for (const [type, symbols] of Object.entries(this.symbols)) {
      allSymbols.push(...symbols.map(s => ({
        symbol: s.symbol,
        name: s.name,
        type
      })))
    }
    
    return allSymbols
  }

  async getMultipleSymbols(symbols: string[]): Promise<MarketData[]> {
    return Promise.all(symbols.map(symbol => this.getMarketData(symbol)))
  }
}

export const marketDataService = new MarketDataService()
export type { MarketData, TradingSignal }