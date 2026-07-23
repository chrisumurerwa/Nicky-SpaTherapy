import { useState } from 'react'
import { ListChecks, CalendarDays, CreditCard, Smile, Phone, Mail, CheckCircle } from 'lucide-react'
import { serviceCategories } from '../../data/services'
import { phone, email } from '../../utils/constants'
import './Booking.css'

const WHATSAPP_NUMBER = '250787326503'

const steps = [
  { Icon: ListChecks, title: 'Choose your treatment', desc: 'Pick a category, then your exact treatment.' },
  { Icon: CalendarDays, title: 'Pick a date & time',  desc: "We're open 7 days a week for your convenience." },
  { Icon: CreditCard,  title: 'Confirm & pay',        desc: 'Payment via MTN MoMo · Code: 781132' },
  { Icon: Smile,       title: 'Arrive & unwind',      desc: "We'll take care of everything from there." },
]

const EMPTY = { name: '', phone: '', email: '', category: '', treatment: '', duration: '', date: '', time: '', notes: '' }

const saveBooking = (data) => {
  const existing = JSON.parse(localStorage.getItem('nicky_bookings') || '[]')
  const newBooking = { ...data, id: Date.now(), submittedAt: new Date().toISOString(), status: 'Pending' }
  localStorage.setItem('nicky_bookings', JSON.stringify([newBooking, ...existing]))
  return newBooking
}

const buildWhatsAppMessage = (form, price) => {
  const lines = [
    '🌿 *New Booking — Nicky Spa Therapy*',
    '',
    `👤 *Name:* ${form.name}`,
    `📞 *Phone:* ${form.phone}`,
    form.email ? `✉️ *Email:* ${form.email}` : null,
    '',
    `💆 *Category:* ${form.category}`,
    `✨ *Treatment:* ${form.treatment}`,
    form.duration ? `⏱ *Duration:* ${form.duration}` : null,
    price ? `💰 *Price:* ${price}` : null,
    '',
    `📅 *Date:* ${form.date}`,
    `🕐 *Time:* ${form.time}`,
    form.notes ? `📝 *Notes:* ${form.notes}` : null,
  ]
  return encodeURIComponent(lines.filter(Boolean).join('\n'))
}

const Booking = () => {
  const [form, setForm]           = useState(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [savedBooking, setSaved]  = useState(null)

  const selectedCategory  = serviceCategories.find(c => c.id === form.category)
  const selectedTreatment = selectedCategory?.treatments.find(t => t.name === form.treatment)
  const durationOptions   = selectedTreatment ? Object.keys(selectedTreatment.prices) : []
  const selectedPrice     = form.duration
    ? selectedTreatment?.prices[form.duration]
    : durationOptions.length === 1 ? selectedTreatment?.prices[durationOptions[0]] : null

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'category')  return setForm(f => ({ ...f, category: value, treatment: '', duration: '' }))
    if (name === 'treatment') return setForm(f => ({ ...f, treatment: value, duration: '' }))
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const booking = saveBooking({ ...form, price: selectedPrice || '' })
    setSaved(booking)
    setSubmitted(true)
    // open WhatsApp
    const msg = buildWhatsAppMessage(form, selectedPrice)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
  }

  const reset = () => { setSubmitted(false); setForm(EMPTY); setSaved(null) }

  return (
    <div className="booking-page">

        <section className="booking-hero">
          <div className="booking-hero-inner">
            <p className="eyebrow">Reserve Your Visit</p>
            <h1>Book an Appointment</h1>
            <p>Fill in the form below and our team will confirm your booking shortly.</p>
          </div>
        </section>

        <section className="booking-section">
          <div className="booking-layout">

            <div className="booking-info">
              <h2>How It Works</h2>
              <ul className="booking-steps">
                {steps.map(({ Icon, title, desc }, i) => (
                  <li key={title}>
                    <span className="step-num">{i + 1}</span>
                    <div>
                      <strong>{title}</strong>
                      <p>{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="booking-contact-note">
                <p><Phone size={14} strokeWidth={1.8} /> {phone}</p>
                <p><Mail size={14} strokeWidth={1.8} /> {email}</p>
              </div>
            </div>

            <div className="booking-form-wrap">
              {submitted ? (
                <div className="booking-success">
                  <CheckCircle size={52} color="#C8A96A" strokeWidth={1.5} />
                  <h2>Booking Request Sent!</h2>
                  <p>
                    Thank you, <strong>{savedBooking?.name}</strong>. Your booking for{' '}
                    <strong>{savedBooking?.treatment}</strong>
                    {savedBooking?.duration && ` (${savedBooking.duration})`}
                    {savedBooking?.price && ` — ${savedBooking.price}`} has been sent to our WhatsApp.
                    We'll confirm shortly.
                  </p>
                  <div className="success-actions">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage(savedBooking, savedBooking?.price)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-whatsapp"
                    >
                      Open WhatsApp Again
                    </a>
                    <button className="btn btn-primary" onClick={reset}>Book Another</button>
                  </div>
                </div>
              ) : (
                <form className="booking-form" onSubmit={handleSubmit}>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
                    </div>
                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input name="phone" value={form.phone} onChange={handleChange} placeholder="+250 7XX XXX XXX" required />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
                  </div>

                  <div className="form-group">
                    <label>Service Category *</label>
                    <select name="category" value={form.category} onChange={handleChange} required>
                      <option value="">Select a category...</option>
                      {serviceCategories.map(c => (
                        <option key={c.id} value={c.id}>{c.title}</option>
                      ))}
                    </select>
                  </div>

                  {selectedCategory && (
                    <div className="form-group">
                      <label>Treatment *</label>
                      <select name="treatment" value={form.treatment} onChange={handleChange} required>
                        <option value="">Select a treatment...</option>
                        {selectedCategory.treatments.map(t => (
                          <option key={t.name} value={t.name}>{t.name}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {selectedTreatment && durationOptions.length > 1 && (
                    <div className="form-group">
                      <label>Duration *</label>
                      <select name="duration" value={form.duration} onChange={handleChange} required>
                        <option value="">Select duration...</option>
                        {durationOptions.map(d => (
                          <option key={d} value={d}>
                            {d} — {selectedTreatment.prices[d]}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {selectedPrice && (
                    <div className="booking-price-preview">
                      <span>Estimated Price</span>
                      <strong>{selectedPrice}</strong>
                    </div>
                  )}

                  <div className="form-row">
                    <div className="form-group">
                      <label>Preferred Date *</label>
                      <input name="date" type="date" value={form.date} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label>Preferred Time *</label>
                      <input name="time" type="time" value={form.time} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Special Requests</label>
                    <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Any preferences or notes..." rows={3} />
                  </div>

                  <button type="submit" className="btn btn-primary btn-full">
                    Confirm Booking & Send to WhatsApp
                  </button>
                </form>
              )}
            </div>

          </div>
        </section>
      </div>
    )
  }

export default Booking
