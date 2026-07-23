import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Trash2, RefreshCw, MessageCircle, Calendar, Users, Clock, AlertTriangle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import './Dashboard.css'

const API_URL = '/api'

const WHATSAPP_NUMBER = '250787326503'

const STATUS_COLORS = {
  Pending:   { bg: '#fff8e6', color: '#b07d00', border: '#f5d87a' },
  Confirmed: { bg: '#e8f5e9', color: '#2e7d32', border: '#a5d6a7' },
  Completed: { bg: '#e3f2fd', color: '#1565c0', border: '#90caf9' },
  Cancelled: { bg: '#fce4ec', color: '#c62828', border: '#ef9a9a' },
}

const buildMsg = (b) => encodeURIComponent(
  `🌿 *Booking — Nicky Spa Therapy*\n\n` +
  `👤 *Name:* ${b.name}\n📞 *Phone:* ${b.phone}\n` +
  (b.email ? `✉️ *Email:* ${b.email}\n` : '') +
  `\n💆 *Treatment:* ${b.treatment}` +
  (b.duration ? ` (${b.duration})` : '') +
  (b.price ? `\n💰 *Price:* ${b.price}` : '') +
  `\n📅 *Date:* ${b.date}  🕐 *Time:* ${b.time}` +
  (b.notes ? `\n📝 *Notes:* ${b.notes}` : '')
)

const Dashboard = () => {
  const [bookings, setBookings] = useState([])
  const [filter, setFilter]     = useState('All')
  const [search, setSearch]     = useState('')
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState('')

  const { token } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Sync filter from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const filterParam = params.get('filter')
    if (filterParam && ['Pending', 'Confirmed', 'Completed', 'Cancelled'].includes(filterParam)) {
      setFilter(filterParam)
    } else {
      setFilter('All')
    }
  }, [location.search])

  const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }

  const loadBookings = async () => {
    if (!token) {
      navigate('/login', { replace: true })
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/bookings`, { headers: authHeaders })
      if (!res.ok) {
        if (res.status === 401) {
          navigate('/login', { replace: true })
          return
        }
        throw new Error('Failed to fetch bookings')
      }
      const data = await res.json()
      setBookings(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      loadBookings()
    }
  }, [token])

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/bookings/${id}`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify({ status })
      })
      if (!res.ok) throw new Error('Update failed')
      const updated = await res.json()
      setBookings(prev => prev.map(b => b.id === updated.id ? updated : b))
    } catch (err) {
      setError(err.message)
    }
  }

  const deleteBooking = async (id) => {
    if (!window.confirm('Delete this booking?')) return
    try {
      const res = await fetch(`${API_URL}/bookings/${id}`, {
        method: 'DELETE',
        headers: authHeaders
      })
      if (!res.ok) throw new Error('Delete failed')
      setBookings(prev => prev.filter(b => b.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  const clearAll = async () => {
    if (!window.confirm('Clear ALL bookings? This cannot be undone.')) return
    try {
      const res = await fetch(`${API_URL}/bookings`, {
        method: 'DELETE',
        headers: authHeaders
      })
      if (!res.ok) throw new Error('Clear failed')
      setBookings([])
    } catch (err) {
      setError(err.message)
    }
  }

  const filtered = bookings.filter(b => {
    const matchFilter = filter === 'All' || b.status === filter
    const matchSearch = search === '' ||
      b.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.treatment?.toLowerCase().includes(search.toLowerCase()) ||
      b.phone?.includes(search)
    return matchFilter && matchSearch
  })

  const counts = {
    total:     bookings.length,
    pending:   bookings.filter(b => b.status === 'Pending').length,
    confirmed: bookings.filter(b => b.status === 'Confirmed').length,
    today:     bookings.filter(b => b.date === new Date().toISOString().split('T')[0]).length,
  }

  return (
    <div className="dashboard">
      <div className="dash-toolbar">
        <div className="dash-toolbar-left">
          <div className="dash-filters">
            {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map(s => (
              <button key={s} className={`filter-btn${filter === s ? ' filter-btn--active' : ''}`} onClick={() => setFilter(s)}>{s}</button>
            ))}
          </div>
        </div>
        <div className="dash-toolbar-right">
          <input className="dash-search" placeholder="Search by name, treatment, phone..." value={search} onChange={e => setSearch(e.target.value)} />
          <button className="dash-btn dash-btn--ghost" onClick={loadBookings} disabled={loading} title="Refresh">
            <RefreshCw size={15} className={loading ? 'dash-spin' : ''} />
          </button>
          <button className="dash-btn dash-btn--danger" onClick={clearAll} title="Clear all bookings">
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {error && (
        <div className="dash-error">
          <AlertTriangle size={16} /> {error}
        </div>
      )}

      <div className="dash-stats">
        <div className="stat-card"><Users size={22} color="#C8A96A" /><div><p className="stat-num">{counts.total}</p><p className="stat-label">Total Bookings</p></div></div>
        <div className="stat-card"><Clock size={22} color="#f59e0b" /><div><p className="stat-num">{counts.pending}</p><p className="stat-label">Pending</p></div></div>
        <div className="stat-card"><MessageCircle size={22} color="#4F6F52" /><div><p className="stat-num">{counts.confirmed}</p><p className="stat-label">Confirmed</p></div></div>
        <div className="stat-card"><Calendar size={22} color="#3b82f6" /><div><p className="stat-num">{counts.today}</p><p className="stat-label">Today</p></div></div>
      </div>

      {loading ? (
        <div className="dash-empty">
          <div className="dash-loader"></div>
          <p>Loading bookings...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="dash-empty">
          <p>🌿 No bookings found.</p>
          <p>Bookings submitted through the booking form will appear here.</p>
        </div>
      ) : (
        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Treatment</th>
                <th>Date & Time</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => {
                const sc = STATUS_COLORS[b.status] || STATUS_COLORS.Pending
                return (
                  <tr key={b.id}>
                    <td>
                      <p className="client-name">{b.name}</p>
                      <p className="client-contact">{b.phone}</p>
                      {b.email && <p className="client-contact">{b.email}</p>}
                    </td>
                    <td>
                      <p className="treatment-name">{b.treatment}</p>
                      {b.duration && <p className="treatment-dur">{b.duration}</p>}
                      <p className="treatment-cat">{b.category}</p>
                    </td>
                    <td>
                      <p className="booking-date">{b.date}</p>
                      <p className="booking-time">{b.time}</p>
                      {b.notes && <p className="booking-notes">"{b.notes}"</p>}
                    </td>
                    <td><p className="booking-price">{b.price || '—'}</p></td>
                    <td>
                      <select
                        className="status-select"
                        value={b.status}
                        onChange={e => updateStatus(b.id, e.target.value)}
                        style={{ background: sc.bg, color: sc.color, borderColor: sc.border }}
                      >
                        {Object.keys(STATUS_COLORS).map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td>
                      <div className="action-btns">
                        <button className="action-btn action-btn--wa" onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${buildMsg(b)}`, '_blank')} title="Send via WhatsApp">
                          <MessageCircle size={15} />
                        </button>
                        <button className="action-btn action-btn--del" onClick={() => deleteBooking(b.id)} title="Delete">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Dashboard

