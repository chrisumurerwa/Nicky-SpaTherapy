import { useState } from 'react'
import './Gallery.css'

const allImages = [
  { title: 'Signature Massage Room', image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80', category: 'Massage' },
  { title: 'Wellness Lounge', image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80', category: 'Lounge' },
  { title: 'Luxury Bath Ritual', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80', category: 'Bath' },
  { title: 'Sauna Experience', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80', category: 'Sauna' },
  { title: 'Facial Treatment', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80', category: 'Facial' },
  { title: 'Relaxation Suite', image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=900&q=80', category: 'Lounge' },
  { title: 'Body Scrub Ritual', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80', category: 'Body' },
  { title: 'Jacuzzi Suite', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80', category: 'Jacuzzi' },
  { title: 'Moroccan Bath', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80', category: 'Bath' },
]

const Gallery = () => {
  const [lightbox, setLightbox] = useState(null)

  return (
    <div className="gallery-page">
        <section className="gallery-hero">
          <div className="gallery-hero-inner">
            <p className="eyebrow">Our Space</p>
            <h1>Gallery</h1>
            <p>A glimpse into the world of calm and luxury at Nicky Spa Therapy.</p>
          </div>
        </section>

        <section className="gallery-section">
          <div className="gallery-masonry">
            {allImages.map((item, i) => (
              <figure
                key={item.title}
                className="gallery-item"
                onClick={() => setLightbox(i)}
              >
                <img src={item.image} alt={item.title} loading="lazy" />
                <figcaption>
                  <span className="gallery-category">{item.category}</span>
                  <span className="gallery-title">{item.title}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {lightbox !== null && (
          <div className="lightbox" onClick={() => setLightbox(null)}>
            <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            <button
              className="lightbox-prev"
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + allImages.length) % allImages.length) }}
            >‹</button>
            <img src={allImages[lightbox].image} alt={allImages[lightbox].title} onClick={(e) => e.stopPropagation()} />
            <p className="lightbox-caption">{allImages[lightbox].title}</p>
            <button
              className="lightbox-next"
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % allImages.length) }}
            >›</button>
          </div>
        )}
    </div>
  )
}

export default Gallery
