import { Link } from 'react-router-dom'
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
          <p>{pkg.details}</p>
        </article>
      ))}
    </div>
    <div className="section-cta">
      <Link to="/packages" className="btn btn-outline">See All Packages</Link>
    </div>
  </section>
)

export default SpaPackages
