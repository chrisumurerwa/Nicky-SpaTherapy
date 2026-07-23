import { FaStar, FaQuoteLeft } from 'react-icons/fa'
import { testimonials } from '../../../data/testimonials'

const Testimonials = () => (
  <section className="section-card">
    <div className="section-heading">
      <p className="eyebrow">Client Love</p>
      <h2>What our guests are saying</h2>
    </div>
    <div className="testimonial-grid">
      {testimonials.map((item) => (
        <blockquote key={item.author} className="testimonial-card">
          <FaQuoteLeft size={20} color="#C8A96A" style={{ marginBottom: '12px', opacity: 0.7 }} />
          <div className="testimonial-stars">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={13} color="#C8A96A" />
            ))}
          </div>
          <p>"{item.quote}"</p>
          <footer>— {item.author}</footer>
        </blockquote>
      ))}
    </div>
  </section>
)

export default Testimonials
