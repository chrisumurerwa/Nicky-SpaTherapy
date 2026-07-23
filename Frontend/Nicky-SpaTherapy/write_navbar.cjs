const fs = require('fs');
const path = 'src/components/Navbar/Navbar.jsx';

const content = `import { useState, useEffect } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { Menu, X, User, LogOut, LayoutDashboard, Phone, Mail, Clock, MapPin } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { phone, email, location } from '../../utils/constants'
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
    <>
      {/* Top Contact Bar */}
      <div className={\`top-bar\${scrolled ? ' top-bar--hidden' : ''}\`}>
        <div className="top-bar-inner">
          <div className="top-bar-left">
            <span className="top-bar-item">
              <Phone size={12} /> <a href={\`tel:\${phone.replace(/\\s/g, '')}\`}>{phone}</a>
            </span>
            <span className="top-bar-divider">|</span>
            <span className="top-bar-item">
              <Mail size={12} /> <a href={\`mailto:\${email}\`}>{email}</a>
            </span>
          </div>
          <div className="top-bar-right">
            <span className="top-bar-item">
              <Clock size={12} /> Mon - Sat: 8:00 AM - 7:00 PM
            </span>
            <span className="top-bar-divider">|</span>
            <span className="top-bar-item">
              <MapPin size={12} /> {location}
            </span>
          </div>
      </div>

      {/* Main Navigation */}
      <nav className={\`top-nav\${scrolled ? ' top-nav--scrolled' : ''}\`}>
        {/* Umugongo Backbone decorative element */}
        <div className="umugongo-spine">
          <div className="umugongo-spine-line"></div>
          <div className="umugongo-spine-knot"></div>
          <div className="umugongo-spine-line"></div>

        <Link to="/" className="nav-brand" onClick={closeMenu}>
          <img src={logo} alt="Nicky Spa Therapy" className="nav-logo" />
          <div className="nav-brand-text">
            <span className="nav-brand-name">NICKY SPA</span>
            <span className="nav-brand-sub">THERAPY</span>
          </div>
        </Link>

        <button
          className={\`nav-toggle\${menuOpen ? ' nav-toggle--open' : ''}\`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className={\`nav-links\${menuOpen ? ' nav-links--open' : ''}\`}>
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

          <div className="nav-actions">
            {isAuthenticated && admin ? (
              <div
                className={\`nav-admin-dropdown\${adminOpen ? ' nav-admin-dropdown--open' : ''}\`}
                onClick={(e) => { e.stopPropagation(); setAdminOpen(!adminOpen) }}
              >
                <button
                  className="nav-admin-trigger"
                  onClick={(e) => { e.stopPropagation(); setAdminOpen(!adminOpen) }}
                  aria-label="Admin menu"
                >
                  <User size={18} />
                  <span className="nav-admin-name">{admin.name}</span>
                </button>
                {adminOpen && (
                  <div className="nav-admin-menu" onClick={(e) => e.stopPropagation()}>
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
                <User size={18} />
              </Link>
            )}
            <Link to="/booking" className="nav-cta" onClick={closeMenu}>Book Now</Link>
          </div>
      </nav>
    </>
  )
}

export default Navbar
`;

fs.writeFileSync(path, content, 'utf8');
console.log('Written successfully!');
console.log('File size:', content.length, 'bytes');
