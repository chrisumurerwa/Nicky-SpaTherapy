import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import spaVideo from '../../../assets/v1spaVideo.mp4'

const Hero = () => (
  <section className="hero-section">
    <video
      className="hero-video"
      src={spaVideo}
      autoPlay
      muted
      loop
      playsInline
    />
    <div className="hero-overlay" />
    <div className="hero-content">
      <div className="hero-copy">
        <p className="eyebrow">Relax. Refresh. Renew.</p>
        <h1>Luxury Wellness &amp; Spa Experience in Kigali</h1>
        <p className="hero-text">
          Escape the demands of everyday life and immerse yourself in a world of
          comfort, calm, and rejuvenation. Every visit is designed to restore your
          body and soothe your mind.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/booking">Book Appointment</Link>
          <Link className="btn btn-secondary" to="/services">Explore Our Services</Link>
        </div>
      </div>
    </div>
    <div className="hero-scroll">
      <ChevronDown size={28} color="#C8A96A" strokeWidth={1.5} />
    </div>
  </section>
)

export default Hero
