import { useState, useEffect } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import logo from '../../assets/LogoNickySpa.jpeg'
import './Navbar.css'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Packages', to: '/packages' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)

  const { isAuthenticated, admin, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClick = () => setAdminOpen(false)
    if (adminOpen) {
      document.addEventListener('click', handleClick)
    }
    return () => document.removeEventListener('click', handleClick)
  }, [adminOpen])

  const closeMenu = () => setMenuOpen(false)

  const handleLogout = () => {
    logout()
    closeMenu()
    setAdminOpen(false)
    navigate('/')
  }

  return (
    <nav className={`top-nav${scrolled ? ' top-nav--scrolled' : ''}`}>
      <Link to="/" className="nav-brand" onClick={closeMenu}>
        <img src={logo} alt="Nicky Spa Therapy" className="nav-logo" />
      </Link>

      <button
        className={`nav-toggle${menuOpen ? ' nav-toggle--open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <div className={`nav-links${menuOpen ? ' nav-links--open' : ''}`}>
        {navLinks.map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => isActive ? 'nav-active' : ''}
            onClick={closeMenu}
          >
            {label}
          </NavLink>
        ))}
        <Link to="/booking" className="nav-cta" onClick={closeMenu}>Book Now</Link>

        {/* Admin section */}
        {isAuthenticated && admin ? (
          <div
            className={`nav-admin-dropdown${adminOpen ? ' nav-admin-dropdown--open' : ''}`}
            onClick={(e) => { e.stopPropagation(); setAdminOpen(!adminOpen) }}
          >
            <button
              className="nav-admin-trigger"
              onClick={(e) => { e.stopPropagation(); setAdminOpen(!adminOpen) }}
              aria-label="Admin menu"
            >
              <User size={20} />
              <span className="nav-admin-name">{admin.name}</span>
            </button>
            {adminOpen && (
              <div className="nav-admin-menu">
                <Link to="/dashboard" className="nav-admin-item" onClick={() => { closeMenu(); setAdminOpen(false) }}>
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
                <button className="nav-admin-item nav-admin-item--logout" onClick={handleLogout}>
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="nav-login-link"
            onClick={closeMenu}
            title="Admin Login"
          >
            <User size={20} />
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
