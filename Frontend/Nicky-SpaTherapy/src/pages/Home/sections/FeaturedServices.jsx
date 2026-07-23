import { Link } from 'react-router-dom'
import { Leaf, Flame, Droplets, Bath, Sparkles, Flower2, Scissors } from 'lucide-react'
import { services } from '../../../data/services'

const serviceIcons = [Leaf, Flame, Droplets, Bath, Sparkles, Flower2, Scissors]

const FeaturedServices = () => (
  <section className="section-card" id="services">
    <div className="section-heading">
      <p className="eyebrow">Featured Services</p>
      <h2>Signature treatments for every mood and moment</h2>
    </div>
    <div className="service-grid">
      {services.map((service, i) => {
        const Icon = serviceIcons[i] ?? Sparkles
        return (
          <article key={service.title} className="service-card">
            <span className="service-icon">
              <Icon size={22} strokeWidth={1.5} />
            </span>
            <div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </article>
        )
      })}
    </div>
    <div className="section-cta">
      <Link to="/services" className="btn btn-outline">View All Services</Link>
    </div>
  </section>
)

export default FeaturedServices
