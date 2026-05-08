import { marketDataService, type MarketData, type TradingSignal } from './marketData'

interface Strategy {
  name: string
  timeframe: string
  weight: number
  minConfidence: number
}

class AdvancedTradingEngine {
  private strategies: Strategy[] = [
    { name: 'Cazador Leve', timeframe: 'M5', weight: 0.25, minConfidence: 60 },
    { name: 'Hiper Alpha', timeframe: 'M15', weight: 0.35, minConfidence: 70 },
    { name: 'Tubarão V3', timeframe: 'M30', weight: 0.40, minConfidence: 75 }
  ]

  async generateSignal(symbol: string): Promise<TradingSignal> {
    const marketData = await marketDataService.getMarketData(symbol)
    const strategySignals = await this.evaluateAllStrategies(symbol, marketData)
    
    const combinedSignal = this.combineSignals(strategySignals, marketData)
    
    return {
      id: `signal_${Date.now()}_${symbol}`,
      symbol,
      direction: combinedSignal.direction,
      confidence: combinedSignal.confidence,
      timeframe: 'M5',
      entryPrice: marketData.price,
      targetPrice: this.calculateTargetPrice(marketData, combinedSignal.direction),
      stopLoss: this.calculateStopLoss(marketData, combinedSignal.direction),
      expiryTime: new Date(Date.now() + 5 * 60000).toISOString(),
      createdAt: new Date().toISOString(),
      strategy: combinedSignal.strategy,
      reasons: combinedSignal.reasons,
      riskLevel: this.calculateRiskLevel(combinedSignal.confidence, marketData),
      potentialReturn: this.calculatePotentialReturn(marketData, combinedSignal.direction)
    }
  }

  private async evaluateAllStrategies(symbol: string, marketData: MarketData) {
    const signals = []
    
    for (const strategy of this.strategies) {
      const signal = await this.evaluateStrategy(strategy, symbol, marketData)
      if (signal && signal.confidence >= strategy.minConfidence) {
        signals.push({ ...signal, weight: strategy.weight })
      }
    }
    
    return signals
  }

  private async evaluateStrategy(strategy: Strategy, symbol: string, marketData: MarketData) {
    const { indicators } = marketData
    
    switch (strategy.name) {
      case 'Cazador Leve':
        return this.evaluateCazadorLeve(indicators)
      case 'Hiper Alpha':
        return this.evaluateHiperAlpha(indicators)
      case 'Tubarão V3':
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
        reasons: ['MACD cruzando para alça', 'Preço acima da EMA 100']
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
  }>, marketData: MarketData) {
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

  private calculateTargetPrice(marketData: MarketData, direction: 'CALL' | 'PUT'): number {
    const volatility = marketData.indicators.volatility / 100
    const targetDistance = volatility * 2
    
    if (direction === 'CALL') {
      return marketData.price * (1 + targetDistance)
    } else {
      return marketData.price * (1 - targetDistance)
    }
  }

  private calculateStopLoss(marketData: MarketData, direction: 'CALL' | 'PUT'): number {
    const volatility = marketData.indicators.volatility / 100
    const stopDistance = volatility * 1
    
    if (direction === 'CALL') {
      return marketData.price * (1 - stopDistance)
    } else {
      return marketData.price * (1 + stopDistance)
    }
  }

  private calculateRiskLevel(confidence: number, marketData: MarketData): 'low' | 'medium' | 'high' {
    const volatility = marketData.indicators.volatility
    
    if (confidence >= 80 && volatility < 20) return 'low'
    if (confidence >= 60 && volatility < 40) return 'medium'
    return 'high'
  }

  private calculatePotentialReturn(marketData: MarketData, direction: 'CALL' | 'PUT'): number {
    const volatility = marketData.indicators.volatility / 100
    const potential = volatility * 3
    
    return Math.round(potential * 100)
  }
}

export const tradingEngine = new AdvancedTradingEngine()