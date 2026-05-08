import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const form = e.target as HTMLFormElement
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value

    try {
      // Simulate login
      console.log('Login attempt:', email)
      await new Promise(resolve => setTimeout(resolve, 1000))
      localStorage.setItem('currentUser', JSON.stringify({
        email,
        name: email.split('@')[0],
        plan: 'Pro'
      }))
      navigate('/dashboard')
    } catch (err) {
      setError('Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const form = e.target as HTMLFormElement
    const name = (form.elements.namedItem('name') as HTMLInputElement).value
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value
    const activationCode = (form.elements.namedItem('activationCode') as HTMLInputElement).value

    try {
      // Simulate registration
      console.log('Registration attempt:', email)
      await new Promise(resolve => setTimeout(resolve, 1000))
      localStorage.setItem('currentUser', JSON.stringify({
        email,
        name,
        plan: activationCode.toUpperCase() === 'DEMO123' ? 'Demo' : 'Pro'
      }))
      alert('Conta criada com sucesso!')
      navigate('/dashboard')
    } catch (err) {
      setError('Erro ao criar conta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div id="scr-login" className="scr active">
      <div className="lg-fx">
        <div className="lp"></div>
        <div className="lp"></div>
        <div className="lp"></div>
      </div>
      <div className="lg-wrap">
        <div className="lg-logo">
          <div className="lg-icon">🦈</div>
          <h1 className="lg-title">BOT TUBARÃO</h1>
          <div className="lg-badge">V3 ULTIMATE</div>
          <p className="lg-sub">O sistema de IA que transforma o mercado financeiro em oportunidade</p>
          <div className="lg-proof">
            <div className="proof-i"><i className="fas fa-brain"></i><span>IA Avançada</span></div>
            <div className="proof-i"><i className="fas fa-chart-line"></i><span>Sinais Precisos</span></div>
            <div className="proof-i"><i className="fas fa-shield-alt"></i><span>100% Seguro</span></div>
          </div>
        </div>
        <div className="lg-box">
          <div className="lg-tabs">
            <button className={`lgt ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>
              ENTRAR
            </button>
            <button className={`lgt ${activeTab === 'register' ? 'active' : ''}`} onClick={() => setActiveTab('register')}>
              CRIAR CONTA
            </button>
          </div>
          <div id="tab-login" className={`tabc ${activeTab === 'login' ? 'active' : ''}`}>
            <div className="inp">
              <i className="fas fa-envelope"></i>
              <input type="email" id="l-email" placeholder="Seu email" />
            </div>
            <div className="inp">
              <i className="fas fa-lock"></i>
              <input type="password" id="l-pass" placeholder="Sua senha" />
            </div>
            <button className="btn-go" onClick={handleLogin}>
              <i className="fas fa-sign-in-alt"></i> ACESSAR SISTEMA
            </button>
            <p className="lg-link">
              Não tem conta? <a href="#" onClick={() => navigate('/payment')}>Adquira seu plano</a>
            </p>
          </div>
          <div id="tab-register" className={`tabc ${activeTab === 'register' ? 'active' : ''}`}>
            <div className="inp">
              <i className="fas fa-user"></i>
              <input type="text" id="r-name" placeholder="Seu nome" />
            </div>
            <div className="inp">
              <i className="fas fa-envelope"></i>
              <input type="email" id="r-email" placeholder="Seu email" />
            </div>
            <div className="inp">
              <i className="fas fa-lock"></i>
              <input type="password" id="r-pass" placeholder="Criar senha (mín. 6)" />
            </div>
            <div className="inp">
              <i className="fas fa-key"></i>
              <input type="text" id="r-key" placeholder="Código de ativação" />
            </div>
            <button className="btn-go" onClick={handleRegister}>
              <i className="fas fa-rocket"></i> ATIVAR AGORA
            </button>
          </div>
          <div id="auth-err" className={`amsg err ${error ? '' : 'hide'}`}>{error}</div>
          <div id="auth-ok" className="amsg ok hide"></div>
        </div>
        <div className="lg-footer">
          <div className="lg-trust">
            <span>🔒 Criptografado</span>
            <span>⚡ Tempo real</span>
            <span>🧠 IA Ativa</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage