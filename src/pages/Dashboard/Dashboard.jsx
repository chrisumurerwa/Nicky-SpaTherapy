import { useState, useEffect } from 'react'
import { Trash2, RefreshCw, MessageCircle, Calendar, Users, Clock } from 'lucide-react'
import './Dashboard.css'

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

  const load = () => setBookings(JSON.parse(localStorage.getItem('nicky_bookings') || '[]'))

  useEffect(() => { load() }, [])

  const updateStatus = (id, status) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b)
    setBookings(updated)
    localStorage.setItem('nicky_bookings', JSON.stringify(updated))
  }

  const deleteBooking = (id) => {
    if (!window.confirm('Delete this booking?')) return
    const updated = bookings.filter(b => b.id !== id)
    setBookings(updated)
    localStorage.setItem('nicky_bookings', JSON.stringify(updated))
  }

  const clearAll = () => {
    if (!window.confirm('Clear ALL bookings? This cannot be undone.')) return
    localStorage.removeItem('nicky_bookings')
    setBookings([])
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

      <div className="dash-header">
        <div>
          <h1>Bookings Dashboard</h1>
          <p>Nicky Spa Therapy — Manage all appointments</p>
        </div>
        <div className="dash-header-actions">
          <button className="dash-btn dash-btn--ghost" onClick={load}>
            <RefreshCw size={15} /> Refresh
          </button>
          <button className="dash-btn dash-btn--danger" onClick={clearAll}>
            <Trash2 size={15} /> Clear All
          </button>
        </div>
      </div>

      <div className="dash-stats">
        <div className="stat-card"><Users size={22} color="#C8A96A" /><div><p className="stat-num">{counts.total}</p><p className="stat-label">Total Bookings</p></div></div>
        <div className="stat-card"><Clock size={22} color="#f59e0b" /><div><p className="stat-num">{counts.pending}</p><p className="stat-label">Pending</p></div></div>
        <div className="stat-card"><MessageCircle size={22} color="#4F6F52" /><div><p className="stat-num">{counts.confirmed}</p><p className="stat-label">Confirmed</p></div></div>
        <div className="stat-card"><Calendar size={22} color="#3b82f6" /><div><p className="stat-num">{counts.today}</p><p className="stat-label">Today</p></div></div>
      </div>

      <div className="dash-toolbar">
        <div className="dash-filters">
          {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map(s => (
            <button key={s} className={`filter-btn${filter === s ? ' filter-btn--active' : ''}`} onClick={() => setFilter(s)}>{s}</button>
          ))}
        </div>
        <input className="dash-search" placeholder="Search by name, treatment, phone..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {filtered.length === 0 ? (
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
