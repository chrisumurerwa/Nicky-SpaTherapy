import { Link } from 'react-router-dom'
import { Award, Briefcase, Sparkles, Heart, Leaf, ShieldCheck, Smile } from 'lucide-react'
import './About.css'

const values = [
  { Icon: Award,      title: 'Excellence',     text: 'We hold ourselves to the highest standards in every treatment and interaction.' },
  { Icon: Briefcase,  title: 'Professionalism', text: 'Our team is trained, skilled, and dedicated to delivering expert-level care.' },
  { Icon: Sparkles,   title: 'Cleanliness',    text: 'A spotless, hygienic environment is the foundation of every visit.' },
  { Icon: Heart,      title: 'Customer Care',  text: 'Every guest is treated with warmth, respect, and genuine personal attention.' },
  { Icon: Leaf,       title: 'Relaxation',     text: 'We create a calm, peaceful space where you can truly unwind and let go.' },
  { Icon: ShieldCheck, title: 'Wellness',      text: 'We promote holistic well-being — body, mind, and spirit — through every service.' },
  { Icon: Smile,      title: 'Integrity',      text: 'We are honest, transparent, and consistent in everything we do.' },
]

const About = () => (
  <div className="about-page">

      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <p className="eyebrow">About Us</p>
          <h1>Wellness is more than a luxury</h1>
          <p>
            At Nicky Spa Therapy, we believe wellness is an essential part of a healthy
            and balanced life — and we're here to make it accessible to everyone.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="about-story">
        <div className="about-story-text">
          <p className="eyebrow">Our Story</p>
          <h2>A peaceful sanctuary built for you</h2>
          <p>
            At Nicky Spa Therapy, we believe that wellness is more than a luxury — it's
            an essential part of a healthy and balanced life. We created our spa to
            provide a peaceful sanctuary where every guest can relax, recharge, and feel
            cared for.
          </p>
          <p>
            Our experienced therapists are committed to delivering personalized treatments
            using professional techniques and high-quality products. Whether you're
            visiting for stress relief, skincare, or a wellness escape, we strive to make
            every experience memorable.
          </p>
        </div>
        <div className="about-story-image">
          <img
            src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80"
            alt="Nicky Spa Therapy interior"
          />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-mv">
        <div className="about-mv-inner">
          <div className="mv-card">
            <p className="eyebrow">Our Mission</p>
            <h2>Why we exist</h2>
            <p>
              To provide exceptional spa and wellness experiences through professional
              care, personalized treatments, and a peaceful environment that promotes
              relaxation, beauty, and overall well-being.
            </p>
          </div>
          <div className="mv-divider" />
          <div className="mv-card">
            <p className="eyebrow">Our Vision</p>
            <h2>Where we're going</h2>
            <p>
              To become one of Kigali's most trusted luxury wellness destinations, known
              for outstanding service, professionalism, and unforgettable spa experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="section-heading">
          <p className="eyebrow">Our Values</p>
          <h2>What guides everything we do</h2>
        </div>
        <div className="values-grid">
          {values.map(({ Icon, title, text }) => (
            <article key={title} className="value-card">
              <span className="value-icon">
                <Icon size={22} strokeWidth={1.5} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>Experience the difference yourself</h2>
        <p>Come visit us and discover why our guests keep coming back.</p>
        <Link to="/booking" className="btn btn-primary">Book a Session</Link>
      </section>

    </div>
)

export default About
