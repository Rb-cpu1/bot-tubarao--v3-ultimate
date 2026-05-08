import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const DashboardPage: React.FC = () => {
  const [currentSymbol, setCurrentSymbol] = useState('EURUSD')
  const [signal, setSignal] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [marketData, setMarketData] = useState<any>(null)
  const [tradingHistory, setTradingHistory] = useState<any[]>([])
  const navigate = useNavigate()

  // Simulação de dados do mercado
  const symbols = [
    { symbol: 'EURUSD', name: 'Euro/Dólar' },
    { symbol: 'GBPUSD', name: 'Libra/Dólar' },
    { symbol: 'USDJPY', name: 'Dólar/Yen' },
    { symbol: 'BTCUSD', name: 'Bitcoin/Dólar' }
  ]

  // Simular dados do mercado
  useEffect(() => {
    const interval = setInterval(() => {
      const randomPrice = (Math.random() * 0.02 + 1.08).toFixed(4)
      setMarketData({
        symbol: currentSymbol,
        price: randomPrice,
        change: (Math.random() * 0.01 - 0.005).toFixed(4),
        timestamp: new Date().toISOString()
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [currentSymbol])

  // Gerar sinal simulado
  const generateSignal = async () => {
    setIsGenerating(true)
    
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const directions = ['CALL', 'PUT']
    const randomDirection = directions[Math.floor(Math.random() * directions.length)]
    const randomConfidence = Math.floor(Math.random() * 30) + 70
    
    const newSignal = {
      id: `signal_${Date.now()}`,
      symbol: currentSymbol,
      direction: randomDirection,
      confidence: randomConfidence,
      entry_price: marketData?.price || '1.0850',
      target_price: randomDirection === 'CALL' 
        ? (parseFloat(marketData?.price || '1.0850') * 1.01).toFixed(4)
        : (parseFloat(marketData?.price || '1.0850') * 0.99).toFixed(4),
      stop_loss: randomDirection === 'CALL'
        ? (parseFloat(marketData?.price || '1.0850') * 0.99).toFixed(4)
        : (parseFloat(marketData?.price || '1.0850') * 1.01).toFixed(4),
      expiry_time: new Date(Date.now() + 5 * 60000).toISOString(),
      created_at: new Date().toISOString(),
      strategy: 'Multi-Strategy AI',
      reasons: [
        'RSI saindo da zona de sobrevenda',
        'MACD bullish',
        'Preço acima da EMA 100'
      ],
      risk_level: randomConfidence >= 80 ? 'low' : 'medium',
      potential_return: Math.floor(Math.random() * 20) + 10
    }
    
    setSignal(newSignal)
    setTradingHistory(prev => [newSignal, ...prev.slice(0, 9)])
    setIsGenerating(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    navigate('/')
  }

  return (
    <div id="scr-app" className="scr active">
      <header className="hdr">
        <div className="hdr-l">
          <span className="hdr-s">🦈</span>
          <div>
            <span className="hdr-n">BOT TUBARÃO</span>
            <span className="hdr-v">V3 • IA</span>
          </div>
        </div>
        <div className="hdr-r">
          <button className="hdr-b" onClick={() => navigate('/profile')}>
            <i className="fas fa-user-circle"></i>
          </button>
          <button className="hdr-b" id="btn-snd" onClick={() => console.log('Toggle sound')}>
            <i className="fas fa-volume-up"></i>
          </button>
          <button className="hdr-b hdr-out" onClick={handleLogout}>
            <i className="fas fa-power-off"></i>
          </button>
        </div>
      </header>

      <main className="content">
        {/* PAGE: DASHBOARD */}
        <section id="pg-dashboard" className="pg active">
          <div className="hero">
            <div className="hero-top">
              <div>
                <span className="hero-hi">Olá, <strong id="hero-name">Trader</strong> 👋</span>
                <span className="hero-date" id="hero-date">--</span>
              </div>
              <div className="hero-status">
                <span className="dot-live"></span>
                <span id="hero-mkt">MERCADO ABERTO</span>
              </div>
            </div>
            <div className="hero-msg">
              <div className="hero-msg-icon">💰</div>
              <p className="hero-msg-txt">Seu próximo lucro está a um sinal de distância. A IA está trabalhando para você.</p>
            </div>
          </div>

          <div className="ai-status">
            <div className="ai-s-icon"><i className="fas fa-brain"></i></div>
            <div className="ai-s-info">
              <span className="ai-s-label">MOTOR DE INTELIGÊNCIA ARTIFICIAL</span>
              <span className="ai-s-state" id="ai-state">Inicializando...</span>
            </div>
            <div className="ai-s-dot" id="ai-dot"></div>
          </div>

          <div className="asset-selector">
            <div className="as-title"><i className="fas fa-coins"></i> ESCOLHA O ATIVO</div>
            <div className="as-grid" id="asset-grid">
              <button className="as-btn active" data-pair="EUR/USD" onClick={(e) => {
                setCurrentSymbol('EURUSD')
                document.querySelectorAll('.as-btn').forEach(btn => btn.classList.remove('active'))
                e.currentTarget.classList.add('active')
              }}>
                <span className="as-flag">🇪🇺🇺🇸</span>
                <span className="as-name">EUR/USD</span>
                <span className="as-price" id="price-EUR/USD">--</span>
              </button>
              <button className="as-btn" data-pair="USD/JPY" onClick={(e) => {
                setCurrentSymbol('USDJPY')
                document.querySelectorAll('.as-btn').forEach(btn => btn.classList.remove('active'))
                e.currentTarget.classList.add('active')
              }}>
                <span className="as-flag">🇺🇸🇯🇵</span>
                <span className="as-name">USD/JPY</span>
                <span className="as-price" id="price-USD/JPY">--</span>
              </button>
              <button className="as-btn" data-pair="GBP/USD" onClick={(e) => {
                setCurrentSymbol('GBPUSD')
                document.querySelectorAll('.as-btn').forEach(btn => btn.classList.remove('active'))
                e.currentTarget.classList.add('active')
              }}>
                <span className="as-flag">🇬🇧🇺🇸</span>
                <span className="as-name">GBP/USD</span>
                <span className="as-price" id="price-GBP/USD">--</span>
              </button>
              <button className="as-btn" data-pair="EUR/GBP" onClick={(e) => {
                setCurrentSymbol('EURGBP')
                document.querySelectorAll('.as-btn').forEach(btn => btn.classList.remove('active'))
                e.currentTarget.classList.add('active')
              }}>
                <span className="as-flag">🇪🇺🇬🇧</span>
                <span className="as-name">EUR/GBP</span>
                <span className="as-price" id="price-EUR/GBP">--</span>
              </button>
              <button className="as-btn" data-pair="AUD/USD" onClick={(e) => {
                setCurrentSymbol('AUDUSD')
                document.querySelectorAll('.as-btn').forEach(btn => btn.classList.remove('active'))
                e.currentTarget.classList.add('active')
              }}>
                <span className="as-flag">🇦🇺🇺🇸</span>
                <span className="as-name">AUD/USD</span>
                <span className="as-price" id="price-AUD/USD">--</span>
              </button>
              <button className="as-btn" data-pair="BTC/USD" onClick={(e) => {
                setCurrentSymbol('BTCUSD')
                document.querySelectorAll('.as-btn').forEach(btn => btn.classList.remove('active'))
                e.currentTarget.classList.add('active')
              }}>
                <span className="as-flag">₿💲</span>
                <span className="as-name">BTC/USD</span>
                <span className="as-price" id="price-BTC/USD">--</span>
              </button>
            </div>
          </div>

          <div className="chart-box">
            <div className="chart-header">
              <span className="chart-pair" id="chart-pair">EUR/USD</span>
              <span className="chart-tf">M5</span>
            </div>
            <canvas id="chart" height="180"></canvas>
          </div>

          <div id="sig-card" className="sig-card idle">
            <div className="sig-header">
              <div className="sig-h-left"><i className="fas fa-satellite-dish"></i><span>SINAL DA IA</span></div>
              <span className="sig-level" id="sig-level">AGUARDANDO</span>
            </div>
            <div className="sig-body">
              <div id="sig-wait" className="sig-wait">
                <div className="radar">
                  <div className="rc"></div>
                  <div className="rc"></div>
                  <div className="rc"></div>
                  <div className="rs"></div>
                  <div className="rm">🦈</div>
                </div>
                <p className="sw-t1">A IA está analisando o mercado...</p>
                <p className="sw-t2">Aguarde o próximo sinal de alta precisão</p>
              </div>
              <div id="sig-active" className="sig-active hide">
                <div className="sig-dir" id="sig-dir">
                  <span className="sd-icon" id="sd-icon">📈</span>
                  <span className="sd-txt" id="sd-txt">CALL</span>
                  <span className="sd-sub">ENTRADA AGORA</span>
                </div>
                <div className="sig-info">
                  <div className="si-item"><span className="si-label">ATIVO</span><span className="si-val" id="si-asset">EUR/USD</span></div>
                  <div className="si-item"><span className="si-label">TIMEFRAME</span><span className="si-val">M5</span></div>
                  <div className="si-item"><span className="si-label">EXPIRAÇÃO</span><span className="si-val">5 minutos</span></div>
                  <div className="si-item"><span className="si-label">HORA</span><span className="si-val" id="si-time">--:--</span></div>
                </div>
                <div className="ai-conf">
                  <div className="ac-top"><span>🧠 CONFIANÇA DA IA</span><span className="ac-pct" id="ac-pct">0%</span></div>
                  <div className="ac-bar"><div className="ac-fill" id="ac-fill"></div></div>
                </div>
                <div className="sig-reasons">
                  <span className="sr-title">POR QUE ESTE SINAL?</span>
                  <div className="sr-list" id="sr-list"></div>
                </div>
                <div className="sig-cd">
                  <span className="scd-label">Expira em</span>
                  <span className="scd-val" id="scd-val">5:00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="indicators">
            <div className="ind-title"><i className="fas fa-chart-bar"></i> ANÁLISE TÉCNICA</div>
            <div className="ind-row">
              <div className="ind-card">
                <span className="ic-name">RSI</span>
                <div className="ic-bar"><div className="ic-fill" id="ic-rsi"></div></div>
                <span className="ic-val" id="iv-rsi">--</span>
              </div>
              <div className="ind-card">
                <span className="ic-name">MACD</span>
                <span className="ic-val" id="iv-macd">--</span>
              </div>
              <div className="ind-card">
                <span className="ic-name">TENDÊNCIA</span>
                <span className="ic-val" id="iv-trend">--</span>
              </div>
              <div className="ind-card">
                <span className="ic-name">🧠 IA</span>
                <span className="ic-val" id="iv-ai">--</span>
              </div>
            </div>
          </div>

          <div className="motivation">
            <div className="mot-icon">🦈</div>
            <p className="mot-txt">"O tubarão não caça toda hora. Ele espera o momento certo — e quando ataca, não erra."</p>
          </div>

          <div className="history-section">
            <div className="hs-title"><i className="fas fa-history"></i> ÚLTIMOS SINAIS</div>
            <div id="hist-list" className="hist-list">
              <div className="hist-empty"><p>Os sinais aparecerão aqui</p></div>
            </div>
          </div>
        </section>

        {/* PAGE: PROFILE */}
        <section id="pg-profile" className="pg">
          <div className="prof-header">
            <button className="prof-back" onClick={() => navigate('/dashboard')}>
              <i className="fas fa-arrow-left"></i> Voltar
            </button>
          </div>

          <div className="prof-card">
            <div className="prof-avatar">
              <div className="prof-av-circle">
                <span className="prof-av-letter" id="prof-letter">T</span>
              </div>
              <div className="prof-av-badge" id="prof-plan-badge">PRO</div>
            </div>
            <h2 className="prof-name" id="prof-name">Trader</h2>
            <p className="prof-email" id="prof-email">email@email.com</p>
          </div>

          <div className="prof-section">
            <div className="prof-s-title"><i className="fas fa-id-card"></i> INFORMAÇÕES</div>
            <div className="prof-item">
              <span className="pi-label">Nome completo</span>
              <span className="pi-value" id="pi-name">--</span>
            </div>
            <div className="prof-item">
              <span className="pi-label">Email</span>
              <span className="pi-value" id="pi-email">--</span>
            </div>
            <div className="prof-item">
              <span className="pi-label">Plano atual</span>
              <span className="pi-value gold" id="pi-plan">--</span>
            </div>
            <div className="prof-item">
              <span className="pi-label">Membro desde</span>
              <span className="pi-value" id="pi-since">--</span>
            </div>
            <div className="prof-item">
              <span className="pi-label">Status</span>
              <span className="pi-value green">✅ Ativo</span>
            </div>
          </div>

          <div className="prof-section">
            <div className="prof-s-title"><i className="fas fa-crown"></i> SEU PLANO</div>
            <div className="prof-plan-box" id="prof-plan-box">
              <div className="ppb-icon">💎</div>
              <div className="ppb-info">
                <h3 id="ppb-name">PRO</h3>
                <p id="ppb-desc">Todos os ativos • Sinais ULTRA</p>
              </div>
              <div className="ppb-status">ATIVO</div>
            </div>
            <a href="https://wa.me/258835333667?text=Olá! Quero fazer upgrade do meu plano no Bot Tubarão V3" target="_blank" className="prof-upgrade">
              <i className="fas fa-arrow-up"></i> Fazer Upgrade
            </a>
          </div>

          <div className="prof-section">
            <div className="prof-s-title"><i className="fas fa-headset"></i> SUPORTE</div>
            <a href="https://wa.me/258835333667" target="_blank" className="prof-support">
              <i className="fab fa-whatsapp"></i> Falar com suporte via WhatsApp
            </a>
          </div>

          <button className="prof-logout" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Sair da conta
          </button>
        </section>
      </main>
    </div>
  )
}

export default DashboardPage