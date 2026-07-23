import { Link } from 'react-router-dom'
import { gallery } from '../../../data/gallery'

const GalleryPreview = () => (
  <section className="section-card" id="gallery">
    <div className="section-heading">
      <p className="eyebrow">Gallery</p>
      <h2>Moments of calm and luxury</h2>
    </div>
    <div className="gallery-grid">
      {gallery.map((item) => (
        <figure key={item.title} className="gallery-card">
          <img src={item.image} alt={item.title} loading="lazy" />
          <figcaption>{item.title}</figcaption>
        </figure>
      ))}
    </div>
    <div className="section-cta">
      <Link to="/gallery" className="btn btn-outline">View Full Gallery</Link>
    </div>
  </section>
)

export default GalleryPreview
