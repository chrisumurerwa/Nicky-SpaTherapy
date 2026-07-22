import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className={`top-nav${scrolled ? ' top-nav--scrolled' : ''}`}>
      <Link to="/" className="nav-brand" onClick={closeMenu}>
        <p className="brand-mark">Nicky Spa Therapy</p>
        <span className="brand-tag">Luxury Wellness in Kigali</span>
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
      </div>
    </nav>
  )
}

export default Navbar
