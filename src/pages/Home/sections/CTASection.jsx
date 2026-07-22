import { Link } from 'react-router-dom'

const CTASection = () => (
  <section className="cta-banner">
    <div className="cta-banner-inner">
      <p className="eyebrow">Ready to Unwind?</p>
      <h2>Your wellness retreat awaits</h2>
      <p>
        Reserve your space for relaxation, beauty, and unforgettable care at Nicky
        Spa Therapy. Our team is ready to welcome you into a world of calm.
      </p>
      <Link to="/booking" className="btn btn-primary">Book Your Session</Link>
    </div>
  </section>
)

export default CTASection
