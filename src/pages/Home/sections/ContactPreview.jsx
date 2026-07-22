import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, CalendarCheck, CreditCard, Smartphone } from 'lucide-react'
import { FaInstagram } from 'react-icons/fa'
import { phone, email, instagram } from '../../../utils/constants'

const ContactPreview = () => (
  <section className="section-card" id="contact">
    <div className="section-heading">
      <p className="eyebrow">Get In Touch</p>
      <h2>Begin your wellness retreat today</h2>
    </div>
    <div className="contact-box">
      <div className="contact-card">
        <h3>Contact Details</h3>
        <p><Phone size={15} strokeWidth={1.8} /> {phone}</p>
        <p><Mail size={15} strokeWidth={1.8} /> {email}</p>
        <p><FaInstagram size={15} /> {instagram}</p>
        <p><MapPin size={15} strokeWidth={1.8} /> Kigali, Rwanda</p>
      </div>
      <div className="contact-card">
        <h3>Booking</h3>
        <p><CalendarCheck size={15} strokeWidth={1.8} /> Online booking available</p>
        <p><CreditCard size={15} strokeWidth={1.8} /> Payment: MTN Mobile Money</p>
        <p><Smartphone size={15} strokeWidth={1.8} /> MoMo Code: 781132</p>
        <Link to="/booking" className="btn btn-primary">
          Book Now
        </Link>
      </div>
    </div>
  </section>
)

export default ContactPreview
