import './Home.css'
import Hero from './sections/Hero'
import Introduction from './sections/Introduction'
import WhyChooseUs from './sections/WhyChooseUs'
import FeaturedServices from './sections/FeaturedServices'
import SpaPackages from './sections/SpaPackages'
import Testimonials from './sections/Testimonials'
import GalleryPreview from './sections/GalleryPreview'
import CTASection from './sections/CTASection'
import ContactPreview from './sections/ContactPreview'

const Home = () => (
  <div className="page-shell">
    <Hero />
    <main>
      <Introduction />
      <WhyChooseUs />
      <FeaturedServices />
      <SpaPackages />
      <Testimonials />
      <GalleryPreview />
      <CTASection />
      <ContactPreview />
    </main>
  </div>
)

export default Home
