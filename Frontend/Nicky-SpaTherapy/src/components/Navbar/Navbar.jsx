import { useState, useEffect, useCallback } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { MapPin, Menu, X, User, LogOut, LayoutDashboard, Mail, Phone, Clock } from 'lucide-react'
import { FaInstagram } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import { phone, email, hours, instagram, location } from '../../utils/constants'
import logo from '../../assets/LogoNickySpa.jpeg'
import './Navbar.css'

/**
 * Navigation links configuration.
 * Each entry maps a label to a route path.
 */
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

  const closeMenu = useCallback(() => setMenuOpen(false), [])

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

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeMenu()
        setAdminOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [closeMenu])

  const toggleMenu = () => setMenuOpen((prev) => !prev)
  const toggleAdmin = (e) => {
    e.stopPropagation()
    setAdminOpen((prev) => !prev)
  }

  const handleLogout = () => {
    logout()
    closeMenu()
    setAdminOpen(false)
    navigate('/')
  }

  return (
    <header className="nav-header">
      <div className="nav-topbar">
        <div className="nav-topbar-inner">
          <div className="nav-topbar-group nav-topbar-group--left">
            <span className="nav-topbar-item" aria-label={`Phone: ${phone}`}>
              <Phone size={14} className="nav-topbar-icon" />
              <span className="nav-topbar-text">{phone}</span>
            </span>
            <a
              href={`mailto:${email}`}
              className="nav-topbar-item"
              aria-label={`Email: ${email}`}
              title={email}
            >
              <Mail size={14} className="nav-topbar-icon" />
              <span className="nav-topbar-text nav-topbar-text--hide-tablet">{email}</span>
            </a>
          </div>

          <div className="nav-topbar-group nav-topbar-group--right">
            <a
              href="https://instagram.com/nickyspakigali"
              target="_blank"
              rel="noreferrer"
              className="nav-topbar-item nav-topbar-item--instagram"
              aria-label="Instagram"
              title="Instagram"
            >
              <FaInstagram size={14} className="nav-topbar-icon" />
              <span className="nav-topbar-text nav-topbar-text--hide-tablet">{instagram}</span>
            </a>
            <a
              href="https://maps.google.com/?q=Kigali+Rwanda"
              target="_blank"
              rel="noreferrer"
              className="nav-topbar-item nav-topbar-text--hide-tablet"
              aria-label="Location"
              title={location}
            >
              <MapPin size={14} className="nav-topbar-icon" />
              <span className="nav-topbar-text">{location}</span>
            </a>
            <span className="nav-topbar-item" aria-label="Opening hours">
              <Clock size={14} className="nav-topbar-icon" />
              <span className="nav-topbar-text nav-topbar-text--hide-mobile">{hours}</span>
            </span>
          </div>
        </div>
      </div>
      <nav
        className={`top-nav${scrolled ? ' top-nav--scrolled' : ''}`}
        aria-label="Main navigation"
      >
        {/* Center diamond accent */}
        <span className="nav-center-diamond" />
        {/* Scattered shimmer dots along bottom */}
        <span className="nav-bottom-dot nav-bottom-dot--1" />
        <span className="nav-bottom-dot nav-bottom-dot--2" />
        <span className="nav-bottom-dot nav-bottom-dot--3" />
        <span className="nav-bottom-dot nav-bottom-dot--4" />
        <span className="nav-bottom-dot nav-bottom-dot--5" />
        <span className="nav-bottom-dot nav-bottom-dot--6" />

        <Link to="/" className="nav-brand" onClick={closeMenu}>
          <img src={logo} alt="Nicky Spa Therapy" className="nav-logo" />
        </Link>
        <button
          type="button"
          className={`nav-toggle${menuOpen ? ' nav-toggle--open' : ''}`}
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
        >
          <span className="nav-toggle-bar nav-toggle-bar--1" />
          <span className="nav-toggle-bar nav-toggle-bar--2" />
          <span className="nav-toggle-bar nav-toggle-bar--3" />
        </button>
        <div
          id="nav-menu"
          className={`nav-links${menuOpen ? ' nav-links--open' : ''}`}
        >
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link--active' : 'nav-link'
              }
              onClick={closeMenu}
            >
              {label}
            </NavLink>
          ))}
          {isAuthenticated && admin ? (
            <div
              className={`nav-admin-dropdown${
                adminOpen ? ' nav-admin-dropdown--open' : ''
              }`}
              onClick={toggleAdmin}
            >
              <button
                type="button"
                className="nav-admin-trigger"
                aria-label="Admin menu"
                aria-haspopup="menu"
                aria-expanded={adminOpen}
              >
                <User size={20} />
                <span className="nav-admin-name">{admin.name}</span>
              </button>
              {adminOpen && (
                <div className="nav-admin-menu" role="menu">
                  <Link
                    to="/dashboard"
                    className="nav-admin-item"
                    onClick={() => {
                      closeMenu()
                      setAdminOpen(false)
                    }}
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    className="nav-admin-item nav-admin-item--logout"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="nav-auth-link"
              onClick={closeMenu}
              title="Admin Login"
              aria-label="Admin Login"
            >
              <User size={20} />
            </Link>
          )}
          <Link to="/booking" className="nav-cta" onClick={closeMenu}>
            Book Now
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
