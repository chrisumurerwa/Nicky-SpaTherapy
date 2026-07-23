import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react'
import { FaInstagram } from 'react-icons/fa'
import { phone, email, instagram } from '../../utils/constants'
import './Contact.css'

const contactItems = [
  { Icon: Phone, label: 'Phone', value: phone },
  { Icon: Mail, label: 'Email', value: email },
  { Icon: () => <FaInstagram size={18} />, label: 'Instagram', value: instagram },
  { Icon: MapPin, label: 'Location', value: 'Kigali, Rwanda' },
  { Icon: Clock, label: 'Hours', value: 'Mon – Sun: 8:00 AM – 8:00 PM' },
]

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = (e) => { e.preventDefault(); setSent(true) }

  return (
    <div className="contact-page">
        <section className="contact-hero">
          <div className="contact-hero-inner">
            <p className="eyebrow">We'd Love to Hear From You</p>
            <h1>Get In Touch</h1>
            <p>Reach out to us for bookings, inquiries, or just to say hello.</p>
          </div>
        </section>

        <section className="contact-section">
          <div className="contact-layout">
            <div className="contact-details">
              <h2>Contact Information</h2>
              <div className="contact-info-cards">
                {contactItems.map(({ Icon, label, value }) => (
                  <div key={label} className="contact-info-card">
                    <span className="contact-info-icon">
                      <Icon size={18} strokeWidth={1.8} />
                    </span>
                    <div>
                      <strong>{label}</strong>
                      <p>{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="contact-form-wrap">
              {sent ? (
                <div className="contact-success">
                  <CheckCircle size={52} color="#d8b36d" strokeWidth={1.5} />
                  <h2>Message Sent!</h2>
                  <p>Thank you for reaching out. We'll get back to you very soon.</p>
                  <button className="btn btn-primary" onClick={() => setSent(false)}>Send Another</button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <h2>Send Us a Message</h2>
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" required />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
                  </div>
                  <div className="form-group">
                    <label>Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} placeholder="How can we help you?" rows={5} required />
                  </div>
                  <button type="submit" className="btn btn-primary btn-full">Send Message</button>
                </form>
              )}
            </div>
          </div>
        </section>
    </div>
  )
}

export default Contact
