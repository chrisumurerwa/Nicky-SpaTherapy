import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { packages } from '../../../data/packages'

const SpaPackages = () => (
  <section className="section-card" id="packages">
    <div className="section-heading">
      <p className="eyebrow">Spa Packages</p>
      <h2>Gentle indulgence designed for your escape</h2>
    </div>
    <div className="package-grid">
      {packages.map((pkg, i) => (
        <article
          key={pkg.title}
          className={`package-card${i === 1 ? ' package-card--featured' : ''}`}
        >
          {i === 1 && <span className="package-badge">Most Popular</span>}
          <h3>{pkg.title}</h3>
          <p className="price">{pkg.price}</p>
          <ul className="package-includes">
            {pkg.includes.map((item) => (
              <li key={item}>
                <Check size={13} strokeWidth={2.5} className="check-icon" />
                {item}
              </li>
            ))}
          </ul>
          <Link to="/booking" className="btn-small">Book Now</Link>
        </article>
      ))}
    </div>
    <div className="section-cta">
      <Link to="/packages" className="btn btn-outline">See All Packages</Link>
    </div>
  </section>
)

export default SpaPackages
