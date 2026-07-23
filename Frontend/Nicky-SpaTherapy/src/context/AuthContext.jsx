import { createContext, useContext, useState, useEffect } from 'react'

const API = '/api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [token, setToken]     = useState(null)
  const [admin, setAdmin]     = useState(null)
  const [loading, setLoading] = useState(true)

  // On mount — restore token from storage
  useEffect(() => {
    const saved = localStorage.getItem('nicky_admin_token')
    if (saved) {
      setToken(saved)
      // Fetch admin profile
      fetch(`${API}/auth/me`, {
        headers: { Authorization: `Bearer ${saved}` }
      })
        .then(res => {
          if (!res.ok) throw new Error('Invalid token')
          return res.json()
        })
        .then(data => {
          setAdmin(data)
          setLoading(false)
        })
        .catch(() => {
          localStorage.removeItem('nicky_admin_token')
          setToken(null)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.details || data.error || 'Login failed')
    }

    localStorage.setItem('nicky_admin_token', data.token)
    setToken(data.token)
    setAdmin(data.admin)
    return data
  }

  const logout = () => {
    localStorage.removeItem('nicky_admin_token')
    setToken(null)
    setAdmin(null)
  }

  return (
    <AuthContext.Provider value={{ token, admin, loading, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

