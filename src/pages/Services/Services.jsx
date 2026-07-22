import { Link } from 'react-router-dom'
import { Leaf, Flame, Droplets, Bath, Sparkles, Flower2, Scissors } from 'lucide-react'
import { serviceCategories } from '../../data/services'
import './Services.css'

const iconMap = { Leaf, Flame, Droplets, Bath, Sparkles, Flower2, Scissors }

const Services = () => {
  return (
    <div className="services-page">

      <section className="services-hero">
        <div className="services-hero-inner">
          <p className="eyebrow">What We Offer</p>
          <h1>Our Premium Services</h1>
          <p>Every treatment is crafted to restore, refresh, and renew.</p>
        </div>
      </section>

      <div className="services-content">
        {serviceCategories.map((cat) => {
          const Icon = iconMap[cat.icon] ?? Sparkles
          const allKeys = [...new Set(cat.treatments.flatMap(t => Object.keys(t.prices)))]

          return (
            <section key={cat.id} className="service-category">
              <div className="service-category-header">
                <div className="service-category-title">
                  <span className="service-cat-icon">
                    <Icon size={22} strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="eyebrow">{cat.title}</p>
                    <p className="service-cat-desc">{cat.description}</p>
                  </div>
                </div>
                <Link to="/booking" className="btn btn-primary">Book Now</Link>
              </div>

              <div className="service-table-wrap">
                <table className="service-table">
                  <thead>
                    <tr>
                      <th>Treatment</th>
                      {allKeys.map(k => <th key={k}>{k}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {cat.treatments.map((t) => (
                      <tr key={t.name}>
                        <td className="treatment-name">{t.name}</td>
                        {allKeys.map(k => (
                          <td key={k} className="treatment-price">
                            {t.prices[k] ?? <span className="no-price">—</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )
        })}
      </div>

      <section className="services-cta">
        <h2>Ready to book your treatment?</h2>
        <p>Contact us or book online — we're open 7 days a week.</p>
        <Link to="/booking" className="btn btn-primary">Book an Appointment</Link>
      </section>

    </div>
  )
}

export default Services
