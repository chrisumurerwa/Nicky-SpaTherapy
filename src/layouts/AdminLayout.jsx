import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, CalendarCheck, LogOut, Menu, X, ChevronDown, User, Sparkles,
  Clock, CheckCircle, XCircle, ListTodo, Home
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/LogoNickySpa.jpeg'
import './AdminLayout.css'

const sidebarLinks = [
  { label: 'Bookings', to: '/dashboard', icon: CalendarCheck },
]

const bookingFilters = [
  { label: 'All Bookings', filter: 'All', icon: ListTodo },
  { label: 'Pending',      filter: 'Pending', icon: Clock },
  { label: 'Confirmed',    filter: 'Confirmed', icon: CheckCircle },
  { label: 'Cancelled',    filter: 'Cancelled', icon: XCircle },
]

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { admin, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    // Force full page reload to go back to main website
    window.location.href = '/'
  }

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className={`admin-layout${sidebarOpen ? ' admin-layout--sidebar-open' : ''}`}>
      {sidebarOpen && <div className="admin-overlay" onClick={closeSidebar} />}

      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <img src={logo} alt="Nicky Spa" className="admin-sidebar-logo" />
          <div className="admin-sidebar-brand-text">
            <span className="admin-sidebar-title">Nicky Spa</span>
            <span className="admin-sidebar-subtitle">Admin Panel</span>
          </div>
        </div>

        <nav className="admin-sidebar-nav">
          {sidebarLinks.map(({ label, to, icon: Icon }) => {
            const isActive = location.pathname === to && !location.search
            return (
              <button
                key={to}
                className={`admin-sidebar-link${isActive ? ' admin-sidebar-link--active' : ''}`}
                onClick={() => { navigate(to); closeSidebar() }}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            )
          })}

          <div className="admin-sidebar-section">
            <span className="admin-sidebar-section-label">Booking Status</span>
          </div>
          {bookingFilters.map(({ label, filter, icon: Icon }) => {
            const isActive = location.search === `?filter=${filter}` || 
              (filter === 'All' && !location.search)
            return (
              <button
                key={filter}
                className={`admin-sidebar-filter${isActive ? ' admin-sidebar-filter--active' : ''}`}
                onClick={() => { 
                  if (filter === 'All') {
                    navigate('/dashboard')
                  } else {
                    navigate(`/dashboard?filter=${filter}`)
                  }
                  closeSidebar() 
                }}
              >
                <Icon size={16} />
                <span>{label}</span>
              </button>
            )
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <button className="admin-sidebar-link admin-sidebar-link--logout" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-navbar">
          <button className="admin-navbar-toggle" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
            <Menu size={22} />
          </button>

          <div className="admin-navbar-title">
            <Sparkles size={18} color="#C8A96A" />
            <span>Dashboard</span>
          </div>

          <div className="admin-navbar-right">
            <div className="admin-navbar-profile" onClick={() => setProfileOpen(!profileOpen)}>
              <div className="admin-navbar-avatar">
                <User size={16} />
              </div>
              <span className="admin-navbar-name">{admin?.name || 'Admin'}</span>
              <ChevronDown size={14} className={`admin-navbar-chevron${profileOpen ? ' admin-navbar-chevron--open' : ''}`} />
            </div>
            {profileOpen && (
              <div className="admin-navbar-dropdown">
                <div className="admin-navbar-dropdown-header">
                  <p className="admin-navbar-dropdown-name">{admin?.name}</p>
                  <p className="admin-navbar-dropdown-email">{admin?.email}</p>
                </div>
                <button className="admin-navbar-dropdown-item" onClick={handleLogout}>
                  <LogOut size={15} /> Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
