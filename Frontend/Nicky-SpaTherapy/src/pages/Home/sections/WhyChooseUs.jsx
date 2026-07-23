import { Heart, Crown, UserCheck } from 'lucide-react'

const features = [
  {
    Icon: Heart,
    title: 'Personalized Care',
    text: 'Every treatment is tailored to your needs for a truly restorative experience.',
  },
  {
    Icon: Crown,
    title: 'Luxury Atmosphere',
    text: 'A calm, elegant setting designed to help you unwind from the moment you arrive.',
  },
  {
    Icon: UserCheck,
    title: 'Expert Therapists',
    text: 'Skilled professionals use premium products and refined techniques with care.',
  },
]

const WhyChooseUs = () => (
  <section className="section-card" id="about">
    <div className="section-heading">
      <p className="eyebrow">Why Choose Us</p>
      <h2>Carefully curated luxury for every visit</h2>
    </div>
    <div className="feature-grid">
      {features.map(({ Icon, title, text }) => (
        <article key={title} className="feature-card">
          <div className="feature-icon">
            <Icon size={34} strokeWidth={1.5} color="#C8A96A" />
          </div>
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </div>
  </section>
)

export default WhyChooseUs
