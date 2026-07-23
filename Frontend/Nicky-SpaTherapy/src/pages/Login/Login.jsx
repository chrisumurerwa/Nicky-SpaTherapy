import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn, Eye, EyeOff, Loader2 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import logo from '../../assets/LogoNickySpa.jpeg'
import './Login.css'

const Login = () => {
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]   = useState(false)
  const [error, setError]     = useState('')
  const [submitting, setSubmitting] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await login(email, password)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <img src={logo} alt="Nicky Spa Therapy" className="login-logo" />
          <h1>Admin Login</h1>
          <p>Nicky Spa Therapy</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}

          <div className="login-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="admin@nickyspa.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>
            <div className="login-pw-wrap">
              <input
                id="password"
                type={showPw ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="login-pw-toggle"
                onClick={() => setShowPw(p => !p)}
                tabIndex={-1}
              >
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button className="login-btn" type="submit" disabled={submitting}>
            {submitting ? (
              <><Loader2 size={18} className="login-spinner" /> Signing in…</>
            ) : (
              <><LogIn size={18} /> Sign In</>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login

