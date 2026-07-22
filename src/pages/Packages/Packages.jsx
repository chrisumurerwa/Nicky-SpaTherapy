import { Link } from 'react-router-dom'
import { Check, Phone, CreditCard } from 'lucide-react'
import { FaInstagram } from 'react-icons/fa'
import { spaPackages, couplePackages } from '../../data/packages'
import './Packages.css'

const PackageCard = ({ pkg, index }) => (
  <article className={`pkg-card${pkg.featured ? ' pkg-card--featured' : ''}`}>
    {pkg.featured && <span className="pkg-badge">Most Popular</span>}
    <div className="pkg-header">
      <h2>{pkg.title}</h2>
      <p className="pkg-price">{pkg.price}</p>
    </div>
    <ul className="pkg-includes">
      {pkg.includes.map((item) => (
        <li key={item}>
          <Check size={14} strokeWidth={2.5} className="pkg-check-icon" />
          {item}
        </li>
      ))}
    </ul>
    <Link to="/booking" className={`btn ${pkg.featured ? 'btn-gold' : 'btn-outline-dark'}`}>
      Book This Package
    </Link>
  </article>
)

const Packages = () => (
  <div className="packages-page">

      <section className="packages-hero">
        <div className="packages-hero-inner">
          <p className="eyebrow">Curated Experiences</p>
          <h1>Our Packages</h1>
          <p>Choose the perfect wellness journey tailored to your needs and desires.</p>
        </div>
      </section>

      {/* Spa Packages */}
      <section className="packages-list">
        <div className="packages-section-heading">
          <p className="eyebrow">Spa Packages</p>
          <h2>Relax. Refresh. Rejuvenate.</h2>
        </div>
        <div className="packages-grid">
          {spaPackages.map((pkg, i) => (
            <PackageCard key={pkg.title} pkg={pkg} index={i} />
          ))}
        </div>
      </section>

      {/* Couple Packages */}
      <section className="packages-list packages-list--couple">
        <div className="packages-section-heading">
          <p className="eyebrow">Couple Packages</p>
          <h2>Share the experience together</h2>
        </div>
        <div className="packages-grid packages-grid--3">
          {couplePackages.map((pkg, i) => (
            <PackageCard key={pkg.title} pkg={pkg} index={i} />
          ))}
        </div>
      </section>

      {/* Footer note */}
      <section className="packages-note">
        <p><CreditCard size={15} strokeWidth={1.8} /> Payment via MTN Mobile Money · MoMo Code: <strong>781132</strong></p>
        <p><Phone size={15} strokeWidth={1.8} /> Questions? Call us at <strong>+250 787 326 503</strong></p>
        <p><FaInstagram size={15} /> Follow us: <strong>nickyspakigali</strong></p>
      </section>

    </div>
)

export default Packages
