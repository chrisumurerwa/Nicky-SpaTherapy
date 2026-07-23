import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import { FaInstagram } from 'react-icons/fa'
import './Footer.css'
import { phone, email, instagram } from '../../utils/constants'

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-brand">
        <p className="footer-logo">Nicky Spa Therapy</p>
        <p className="footer-tagline">Luxury Wellness in Kigali</p>
        <p className="footer-desc">
          A serene sanctuary where every guest is welcomed, restored, and cared for
          with elegance and professionalism.
        </p>
        <div className="footer-social">
          <a
            href="https://instagram.com/nickyspakigali"
            target="_blank"
            rel="noreferrer"
            className="footer-social-link"
            aria-label="Instagram"
          >
            <FaInstagram size={18} />
          </a>
        </div>
      </div>

      <div className="footer-col">
        <h4>Quick Links</h4>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/packages">Packages</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/booking">Book Now</Link>
      </div>

      <div className="footer-col">
        <h4>Contact</h4>
        <p><Phone size={14} strokeWidth={1.8} /> {phone}</p>
        <p><Mail size={14} strokeWidth={1.8} /> {email}</p>
        <p><MapPin size={14} strokeWidth={1.8} /> Kigali, Rwanda</p>
        <p><FaInstagram size={14} /> {instagram}</p>
      </div>
    </div>

    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} Nicky Spa Therapy. All rights reserved.</p>
    </div>
  </footer>
)

export default Footer
