import React, { useEffect, useRef } from 'react'
import { useMarketData } from '../hooks/useMarketData'

interface ChartProps {
  pair: string
  height?: number
  className?: string
}

const Chart: React.FC<ChartProps> = ({ pair, height = 180, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { historicalData, loading } = useMarketData(pair)

  useEffect(() => {
    if (!canvasRef.current || !historicalData.length) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const padding = 20
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Find min and max values
    const prices = historicalData.map(d => d.close)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const priceRange = maxPrice - minPrice

    // Draw grid
    ctx.strokeStyle = '#1e293b'
    ctx.lineWidth = 1
    ctx.beginPath()
    
    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight / 4) * i
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
    }
    
    // Vertical grid lines
    for (let i = 0; i <= 6; i++) {
      const x = padding + (chartWidth / 6) * i
      ctx.moveTo(x, padding)
      ctx.lineTo(x, height - padding)
    }
    
    ctx.stroke()

    // Draw price line
    ctx.strokeStyle = '#fbbf24'
    ctx.lineWidth = 2
    ctx.beginPath()

    historicalData.forEach((data, index) => {
      const x = padding + (chartWidth / (historicalData.length - 1)) * index
      const y = padding + ((maxPrice - data.close) / priceRange) * chartHeight
      
      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Draw current price
    if (historicalData.length > 0) {
      const lastData = historicalData[historicalData.length - 1]
      const x = width - padding
      const y = padding + ((maxPrice - lastData.close) / priceRange) * chartHeight
      
      ctx.fillStyle = '#fbbf24'
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()
      
      // Price label
      ctx.fillStyle = '#fbbf24'
      ctx.font = '12px JetBrains Mono'
      ctx.fillText(lastData.close.toFixed(4), x - 30, y - 10)
    }

  }, [historicalData, height])

  if (loading) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ height }}>
        <div className="text-gray-400">Carregando gráfico...</div>
      </div>
    )
  }

  return (
    <div className={className}>
      <canvas 
        ref={canvasRef} 
        width={400} 
        height={height}
        className="w-full"
      />
    </div>
  )
}

export default Chart