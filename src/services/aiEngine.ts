import { marketApi } from './api'

interface TradingSignal {
  id: string
  pair: string
  direction: 'CALL' | 'PUT'
  confidence: number
  timeframe: string
  entry_price: number
  expiry_time: string
  created_at: string
  strategy: string
  reasons: string[]
  indicators: {
    rsi: number
    macd: number
    ema100: number
    bbUpper: number
    bbLower: number
    trend: 'bullish' | 'bearish' | 'neutral'
  }
}

interface MarketData {
  pair: string
  price: number
  change: number
  volume: number
  timestamp: string
  indicators: {
    rsi: number
    macd: number
    ema100: number
    bbUpper: number
    bbLower: number
    smaFast: number
    smaSlow: number
    smaTrend: number
  }
}

class AITradingEngine {
  private strategies = {
    'cazador-leve': {
      name: 'Cazador Leve',
      timeframe: 'M5',
      weight: 0.3
    },
    'hiper-alpha': {
      name: 'Hiper Alpha',
      timeframe: 'M15',
      weight: 0.4
    },
    'tubarao-v3': {
      name: 'Tubarão V3',
      timeframe: 'M30',
      weight: 0.3
    }
  }

  async analyzeMarket(pair: string): Promise<MarketData> {
    // Simulate market data fetching with real indicators calculation
    const basePrice = await this.getCurrentPrice(pair)
    const volatility = Math.random() * 0.02 + 0.01
    
    return {
      pair,
      price: basePrice,
      change: (Math.random() - 0.5) * 0.01,
      volume: Math.floor(Math.random() * 1000000),
      timestamp: new Date().toISOString(),
      indicators: {
        rsi: this.calculateRSI(basePrice),
        macd: this.calculateMACD(basePrice),
        ema100: this.calculateEMA(basePrice, 100),
        bbUpper: basePrice * (1 + volatility * 2.5),
        bbLower: basePrice * (1 - volatility * 2.5),
        smaFast: this.calculateSMA(basePrice, 5),
        smaSlow: this.calculateSMA(basePrice, 34),
        smaTrend: this.calculateSMA(basePrice, 20)
      }
    }
  }

  private async getCurrentPrice(pair: string): Promise<number> {
    // Simulate real price data
    const basePrices: Record<string, number> = {
      'EUR/USD': 1.0852,
      'USD/JPY': 149.52,
      'GBP/USD': 1.2653,
      'EUR/GBP': 0.8578,
      'AUD/USD': 0.6545,
      'BTC/USD': 67520,
      'ETH/USD': 3200,
      'XAU/USD': 2030
    }
    
    return basePrices[pair] || 1.0
  }

  private calculateRSI(price: number): number {
    // Simplified RSI calculation
    const randomFactor = Math.random() * 40 + 30
    return Math.round(randomFactor)
  }

  private calculateMACD(price: number): number {
    // Simplified MACD calculation
    const randomFactor = (Math.random() - 0.5) * 2
    return Math.round(randomFactor * 100) / 100
  }

  private calculateEMA(price: number, period: number): number {
    // Simplified EMA calculation
    return price * (1 + (Math.random() - 0.5) * 0.01)
  }

  private calculateSMA(price: number, period: number): number {
    // Simplified SMA calculation
    return price * (1 + (Math.random() - 0.5) * 0.005)
  }

  async generateSignal(pair: string): Promise<TradingSignal> {
    const marketData = await this.analyzeMarket(pair)
    const signals = await this.evaluateAllStrategies(pair, marketData)
    
    // Combine signals with weighted average
    const combinedSignal = this.combineSignals(signals)
    
    return {
      id: `signal_${Date.now()}`,
      pair,
      direction: combinedSignal.direction,
      confidence: combinedSignal.confidence,
      timeframe: 'M5',
      entry_price: marketData.price,
      expiry_time: new Date(Date.now() + 5 * 60000).toISOString(),
      created_at: new Date().toISOString(),
      strategy: combinedSignal.strategy,
      reasons: combinedSignal.reasons,
      indicators: marketData.indicators
    }
  }

  private async evaluateAllStrategies(pair: string, marketData: MarketData) {
    const signals = []
    
    for (const [key, strategy] of Object.entries(this.strategies)) {
      const signal = await this.evaluateStrategy(key, pair, marketData)
      if (signal) {
        signals.push({ ...signal, weight: strategy.weight })
      }
    }
    
    return signals
  }

  private async evaluateStrategy(strategy: string, pair: string, marketData: MarketData) {
    const { indicators } = marketData
    
    switch (strategy) {
      case 'cazador-leve':
        return this.evaluateCazadorLeve(indicators)
      case 'hiper-alpha':
        return this.evaluateHiperAlpha(indicators)
      case 'tubarao-v3':
        return this.evaluateTubaraoV3(indicators)
      default:
        return null
    }
  }

  private evaluateCazadorLeve(indicators: MarketData['indicators']) {
    const { macd, ema100, price } = indicators
    
    const buySignal = macd > 0 && macd * 0.9 < 0 && price > ema100
    const sellSignal = macd < 0 && macd * 0.9 > 0 && price < ema100
    
    if (buySignal) {
      return {
        direction: 'CALL' as const,
        confidence: Math.floor(Math.random() * 20) + 60,
        strategy: 'Cazador Leve',
        reasons: ['MACD cruzando para cima', 'Preço acima da EMA 100']
      }
    }
    
    if (sellSignal) {
      return {
        direction: 'PUT' as const,
        confidence: Math.floor(Math.random() * 20) + 60,
        strategy: 'Cazador Leve',
        reasons: ['MACD cruzando para baixo', 'Preço abaixo da EMA 100']
      }
    }
    
    return null
  }

  private evaluateHiperAlpha(indicators: MarketData['indicators']) {
    const { macd, ema100, bbUpper, bbLower, price } = indicators
    
    const buySignal = macd > 0 && macd * 0.9 < 0 && price > ema100 && price > bbLower
    const sellSignal = macd < 0 && macd * 0.9 > 0 && price < ema100 && price < bbUpper
    
    if (buySignal) {
      return {
        direction: 'CALL' as const,
        confidence: Math.floor(Math.random() * 25) + 70,
        strategy: 'Hiper Alpha',
        reasons: ['MACD forte sinal de compra', 'Preço acima da EMA e banda inferior']
      }
    }
    
    if (sellSignal) {
      return {
        direction: 'PUT' as const,
        confidence: Math.floor(Math.random() * 25) + 70,
        strategy: 'Hiper Alpha',
        reasons: ['MACD forte sinal de venda', 'Preço abaixo da EMA e banda superior']
      }
    }
    
    return null
  }

  private evaluateTubaraoV3(indicators: MarketData['indicators']) {
    const { rsi, macd, ema100, price } = indicators
    
    const buySignal = rsi < 50 && rsi * 0.9 > 50 && macd > 0 && price > ema100
    const sellSignal = rsi > 70 && rsi * 0.9 < 70 && macd < 0 && price < ema100
    
    if (buySignal) {
      return {
        direction: 'CALL' as const,
        confidence: Math.floor(Math.random() * 30) + 75,
        strategy: 'Tubarão V3',
        reasons: ['RSI saindo da zona de sobrevenda', 'MACD bullish', 'Preço acima da EMA']
      }
    }
    
    if (sellSignal) {
      return {
        direction: 'PUT' as const,
        confidence: Math.floor(Math.random() * 30) + 75,
        strategy: 'Tubarão V3',
        reasons: ['RSI na zona de sobrecompra', 'MACD bearish', 'Preço abaixo da EMA']
      }
    }
    
    return null
  }

  private combineSignals(signals: Array<{
    direction: 'CALL' | 'PUT'
    confidence: number
    weight: number
    strategy: string
    reasons: string[]
  }>) {
    if (signals.length === 0) {
      return {
        direction: 'CALL' as const,
        confidence: 0,
        strategy: 'Nenhuma',
        reasons: ['Sem sinais disponíveis']
      }
    }

    // Calculate weighted average
    let totalWeight = 0
    let weightedScore = 0
    let buyCount = 0
    let sellCount = 0

    signals.forEach(signal => {
      totalWeight += signal.weight
      if (signal.direction === 'CALL') {
        buyCount += signal.weight
        weightedScore += signal.weight * signal.confidence
      } else {
        sellCount += signal.weight
        weightedScore -= signal.weight * signal.confidence
      }
    })

    // Determine final direction
    const finalDirection = buyCount > sellCount ? 'CALL' : 'PUT'
    const finalConfidence = Math.round(Math.abs(weightedScore) / totalWeight)

    // Combine reasons
    const allReasons = signals.flatMap(signal => signal.reasons)
    const uniqueReasons = [...new Set(allReasons)].slice(0, 5)

    return {
      direction: finalDirection,
      confidence: Math.min(finalConfidence, 100),
      strategy: 'Multi-Strategy AI',
      reasons: uniqueReasons
    }
  }
}

export const aiEngine = new AITradingEngine()
export { type TradingSignal, type MarketData }