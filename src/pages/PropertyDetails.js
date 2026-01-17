import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

const PropertyDetailsPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentZoom, setCurrentZoom] = useState(1);


  const [thumbnail, setThumbnail] = useState('');

  const fetchProject = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/projects/${slug}`);
      const data = res.data.data;
      setProject(data.project);
      setThumbnail(data.thumbnail || ''); // main image
      setGalleryImages(data.gallery || []); // gallery images
    } catch (err) {
      setProject(null);
    }
  };

  const maxZoom = 3;
  const minZoom = 0.5;

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 120, easing: "ease-in-out" });
    fetchProject();
  }, []);



  const openLightbox = (index) => {
    setCurrentIndex(index);
    setCurrentZoom(1);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  const zoomIn = () => setCurrentZoom((z) => (z < maxZoom ? z + 0.5 : z));
  const zoomOut = () => setCurrentZoom((z) => (z > minZoom ? z - 0.5 : z));
  const resetZoom = () => setCurrentZoom(1);

  if (!project) {
    return (
      <div className="container py-5 text-center">
        <h2 className="text-muted">Property not found</h2>
      </div>
    );
  }

  const currentImage = galleryImages[currentIndex] || {};

  return (
    <>
      {/* HERO — same design */}
      <section className="about-hero">
        <div className="container text-center text-white">
          <h1 className="fw-bold mb-3 display-5" data-aos="fade-up">{project.title}</h1>
          <nav aria-label="breadcrumb" data-aos="fade-up" data-aos-delay="300">
            <ol className="breadcrumb justify-content-center">
              <li className="breadcrumb-item"><a href="/" className="text-white text-decoration-none">Home</a></li>
              <li className="breadcrumb-item"><a href="/portfolio" className="text-white text-decoration-none">Portfolio</a></li>
              <li className="breadcrumb-item active text-white-50" aria-current="page">Property Detail</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-5">
        <div className="container">
          <div className="row g-5">

            {/* Gallery */}
            <div className="col-lg-8" data-aos="fade-up">
              <div className="property-gallery">
                <div className="main-property-image" onClick={() => openLightbox(0)}>
                  <img
                    src={thumbnail || galleryImages[0]?.src} // fallback to first gallery if no thumbnail
                    alt={project.title}
                  />
                  <span className="gallery-badge">{project.status || "For Sale"}</span>
                  <div className="gallery-photos-count">
                    <i className="bi bi-images"></i>
                    <span>{galleryImages.length} Photos</span>
                  </div>
                </div>

                <div className="thumbnail-grid">
                  {galleryImages.map((img, i) => (
                    <div key={i} className="thumbnail-item" onClick={() => openLightbox(i)}>
                      <img src={img.src} alt={img.title} />
                      <div className="thumbnail-overlay"><i className="bi bi-zoom-in"></i></div>
                    </div>
                  ))}

                </div>
              </div>

              {/* Description */}
              <div className="mt-5">
                <h3 className="section-title-custom">Description</h3>
                {/* <p className="text-muted" style={{ lineHeight: 1.9 }}>{project.content}</p> */}
                <div
                  className="text-muted"
                  style={{ lineHeight: 1.9 }}
                  dangerouslySetInnerHTML={{ __html: project.content }}
                ></div>
              </div>

              {/* Property Details Grid */}
              <div className="row g-4 mt-3"><div className="row g-4 mt-3">
                {project && (
                  <>
                    <div className="col-md-3 col-6">
                      <div className="info-card">
                        <div className="info-card-icon">
                          <i className="bi bi-house-door"></i>
                        </div>
                        <h5>{project.features.total_area}</h5>
                        <span>Total Area</span>
                      </div>
                    </div>

                    <div className="col-md-3 col-6">
                      <div className="info-card">
                        <div className="info-card-icon">
                          <i className="bi bi-door-open"></i>
                        </div>
                        <h5>{project.features.bedrooms}</h5>
                        <span>Bedrooms</span>
                      </div>
                    </div>

                    <div className="col-md-3 col-6">
                      <div className="info-card">
                        <div className="info-card-icon">
                          <i className="bi bi-droplet"></i>
                        </div>
                        <h5>{project.features.bathrooms}</h5>
                        <span>Bathrooms</span>
                      </div>
                    </div>

                    <div className="col-md-3 col-6">
                      <div className="info-card">
                        <div className="info-card-icon">
                          <i className="bi bi-car-front"></i>
                        </div>
                        <h5>{project.features.garages}</h5>
                        <span>Garages</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Amenities */}
<div className="mt-5">
  <h3 className="section-title-custom">Amenities</h3>
  <div className="row g-3">
    {project.amenities && project.amenities.length > 0 ? (
      project.amenities.map((amenity, index) => {
        // Map your amenity names to icons
        const iconMap = {
          "High-Speed Internet": "bi-wifi",
          "Central Air Conditioning": "bi-snow",
          "Central Heating": "bi-fire",
          "24/7 Security System": "bi-shield-check",
          "Swimming Pool": "bi-water",
          "Private Garden": "bi-tree",
          "Smart Home System": "bi-tv",
          "Storage Room": "bi-box-seam",
        };

        const iconClass = iconMap[amenity] || "bi-star"; // fallback icon

        return (
          <div className="col-md-6" key={index}>
            <div className="amenity-item">
              <div className="amenity-icon">
                <i className={`bi ${iconClass}`}></i>
              </div>
              <span>{amenity}</span>
            </div>
          </div>
        );
      })
    ) : (
      <p>No amenities available.</p>
    )}
  </div>
</div>
</div>
            </div>

            {/* Sidebar remains the same */}
            <div className="col-lg-4" data-aos="fade-up">
              <div className="property-header mb-4">
                <span className="badge bg-primary-custom mb-3">Featured Property</span>
                <h1>{project.title}</h1>
                <div className="property-location"><i className="bi bi-geo-alt-fill"></i> <span>{project.address ? project.address : "Address not available"}</span></div>
               <div className="property-price">
  ${Number(project.price).toLocaleString()} <span>/ Starting from</span>
</div>
       <div className="agent-card mb-4">
                <div className="agent-avatar">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80"
                    alt="Agent"
                  />
                </div>
                <h4 className="agent-name">Michael Johnson</h4>
                <p className="agent-role">Senior Property Consultant</p>
                <div className="agent-contact">
                  <a href="tel:+1234567890">
                    <i className="bi bi-telephone-fill text-primary-custom"></i> +1 (234)
                    567-8900
                  </a>
                  <a href="mailto:agent@company.com">
                    <i className="bi bi-envelope-fill text-primary-custom"></i>
                    agent@company.com
                  </a>
                </div>
                <button className="btn-submit mt-4">
                  <i className="bi bi-telephone-fill me-2"></i>Request Call Back
                </button>
              </div>

              {/* Contact Form */}
              <div className="contact-form-card">
                <h4 className="fw-bold mb-4">Schedule a Visit</h4>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // Handle your form submit logic here
                  }}
                >
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Your Phone"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <select className="form-control" defaultValue="">
                      <option value="">Select Date</option>
                      <option value="2026-01-20">Jan 20, 2026</option>
                      <option value="2026-01-21">Jan 21, 2026</option>
                      <option value="2026-01-22">Jan 22, 2026</option>
                      <option value="2026-01-23">Jan 23, 2026</option>
                      <option value="2026-01-24">Jan 24, 2026</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Your Message"
                    ></textarea>
                  </div>
                  <button type="submit" className="btn-submit">
                    <i className="bi bi-calendar-check me-2"></i>Book Appointment
                  </button>
                </form>
              </div>

             
             
             <div className="info-card mt-4">
  <h5 className="fw-bold mb-3">Quick Info</h5>
  {project && Object.entries(project.quick_info).map(([key, value]) => (
    <div className="d-flex justify-content-between py-2 border-bottom" key={key}>
      <span className="text-muted">{key}</span>
      <span className="fw-bold">{value}</span>
    </div>
  ))}
</div>
 </div>
            </div>

          </div>
        </div>
      </section>

      {/* Lightbox */}
      <div className={`lightbox ${lightboxOpen ? "active" : ""}`} id="lightbox" onClick={(e) => e.target.id === "lightbox" && closeLightbox()}>
        <div className="lightbox-content">
          <button className="lightbox-close" onClick={closeLightbox}>&times;</button>
          <button className="lightbox-nav lightbox-prev" onClick={prevImage}><i className="bi bi-chevron-left"></i></button>
          <img
            src={galleryImages[currentIndex]?.src}
            alt={galleryImages[currentIndex]?.title}
          />
          <button className="lightbox-nav lightbox-next" onClick={nextImage}><i className="bi bi-chevron-right"></i></button>
          <div className="lightbox-caption">{currentImage?.title}</div>
          <div className="zoom-controls">
            <button className="zoom-btn" onClick={zoomOut}><i className="bi bi-dash"></i></button>
            <button className="zoom-btn" onClick={resetZoom}><i className="bi bi-arrow-repeat"></i></button>
            <button className="zoom-btn" onClick={zoomIn}><i className="bi bi-plus"></i></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetailsPage;
