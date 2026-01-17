import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// External CSS & assets should be imported via your bundler or included in index.html
// Example:
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import "./assets/css/fontawesome.css";
// import "./assets/css/templatemo-villa-agency.css";
// import "./assets/css/owl.css";
// import "./assets/css/animate.css";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    title: "Luxury Modern Villa - Front View",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    title: "Living Room",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    title: "Modern Kitchen",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
    title: "Master Bedroom",
  },
  {
    src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
    title: "Bathroom",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
    title: "Swimming Pool",
  },
];

const PropertyDetailsPage = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentZoom, setCurrentZoom] = useState(1);

  const maxZoom = 3;
  const minZoom = 0.5;

  // Init AOS and add keyboard events
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 120,
      easing: "ease-in-out",
    });

    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
      if (e.key === "0") resetZoom();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, currentIndex, currentZoom]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [lightboxOpen]);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setCurrentZoom(1);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const prevImage = () => {
    setCurrentZoom(1);
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const nextImage = () => {
    setCurrentZoom(1);
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const zoomIn = () => {
    setCurrentZoom((z) => (z < maxZoom ? z + 0.5 : z));
  };

  const zoomOut = () => {
    setCurrentZoom((z) => (z > minZoom ? z - 0.5 : z));
  };

  const resetZoom = () => {
    setCurrentZoom(1);
  };

  const currentImage = galleryImages[currentIndex];

  return (
    <>
      {/* Inline styles moved here for convenience. You can move them to a CSS file. */}
      <style>{`
        /* .about-hero {
            background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/public/assets/images/w1.JPG');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            min-height: 60vh;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 100px;
        } */
 .about-hero {
     position: relative;
     min-height: 70vh;
     display: flex;
     align-items: center;
     overflow: hidden;
 }

 .about-hero .hero-bg {
     position: absolute;
     inset: 0;
     width: 100%;
     height: 100%;
     object-fit: cover;
     z-index: 0;
 }

 /* Overlay */
 .about-hero::before {
     content: '';
     position: absolute;
     inset: 0;
     background: rgba(0, 0, 0, 0.6);
     z-index: 1;
 }

 .about-hero .container {
     position: relative;
     z-index: 2;
 }


 .value-icon {
     width: 80px;
     height: 80px;
     border-radius: 50%;
     display: flex;
     align-items: center;
     justify-content: center;
     font-size: 2rem;
     margin: 0 auto 1rem;
 }

 .bg-gradient-primary {
     background: linear-gradient(135deg, #b17a27 0%, #ff8c00 100%);
     color: #fff;
 }

 .mission-section {
     background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
 }

 .cta-section {
     position: relative;
     background: linear-gradient(135deg, #b17a27 0%, #8c611f 100%);
     padding: 100px 0 140px;
     overflow: hidden;
 }

 /* Decorative gradient glow */
 .cta-section::before {
     content: "";
     position: absolute;
     top: -40%;
     left: -20%;
     width: 600px;
     height: 600px;
     background: radial-gradient(circle, rgba(255, 255, 255, 0.15), transparent 60%);
     border-radius: 50%;
 }

 .cta-section h2 {
     letter-spacing: 0.5px;
 }

 .cta-section p {
     max-width: 650px;
     margin: auto;
 }

 /* CTA Buttons */
 .cta-section .btn {
     border-radius: 50px;
     padding: 14px 36px;
     transition: all 0.4s ease;
 }

 .cta-section .btn-light:hover {
     background: #fff;
     color: #b17a27;
     transform: translateY(-4px);
 }

 .cta-section .btn-outline-light:hover {
     background: #fff;
     color: #b17a27;
     border-color: #fff;
     transform: translateY(-4px);
 }


 .quote-card {
     border-left: 5px solid #b17a27;
 }
      `}</style>

      {/* Preloader */}
      {/* <div id="js-preloader" className="js-preloader">
        <div className="preloader-inner">
          <img src="assets/images/logo1.png" alt="Logo" className="loader-logo" />
        </div>
      </div> */}

      {/* Fixed Header */}
      <div className="fixed-top d-block">
        <div className="sub-header">
          <div className="container-fluid px-5">
            <div className="row">
              <div className="col-lg-8 col-md-8">
                <ul className="info">
                  <li>
                    <i className="fa fa-envelope"></i> info@company.com
                  </li>
                  <li>
                    <i className="fa fa-map"></i> Sunny Isles Beach, FL 33160
                  </li>
                </ul>
              </div>
              <div className="col-lg-4 col-md-4">
                <ul className="social-links">
                  <li>
                    <a href="#">
                      <i className="fab fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://x.com/minthu" target="_blank" rel="noreferrer">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Header Area */}
        <header className="header-area header-sticky">
          <div className="container-fluid px-2 px-md-4 px-lg-6">
            <div className="row">
              <div className="col-12">
                <nav className="navbar main-nav navbar-expand-lg">
                  <a className="navbar-brand" href="index.html">
                    <img src="assets/images/logov.png" alt="Logo" className="logo-img p-2" />
                  </a>
                  <ul className="nav">
                    <li>
                      <a href="index.html" className="active">
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="about.html">About</a>
                    </li>
                    <li>
                      <a href="portfolio.html">Portfolio</a>
                    </li>
                    <li>
                      <a href="property-details.html">Property Details</a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-calendar"></i> Schedule a visit
                      </a>
                    </li>
                  </ul>
                  <a className="menu-trigger">
                    <span>Menu</span>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Hero */}
      <section className="about-hero">
        <div className="container text-center text-white">
          <h1
            className="fw-bold mb-3 display-5 display-md-4 display-lg-3"
            data-aos="fade-up"
          >
            Single Property
          </h1>
          <nav aria-label="breadcrumb" data-aos="fade-up" data-aos-delay="300">
            <ol className="breadcrumb justify-content-center">
              <li className="breadcrumb-item">
                <a href="index.html" className="text-white text-decoration-none">
                  Home
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href="index.html" className="text-white text-decoration-none">
                  Portfolio
                </a>
              </li>
              <li className="breadcrumb-item active text-white-50" aria-current="page">
                Property Detail
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-5">
        <div className="container">
          <div className="row g-5">
            {/* Property Images */}
            <div className="col-lg-8" data-aos="fade-up">
              <div className="property-gallery">
                {/* Main Image */}
                <div className="main-property-image" onClick={() => openLightbox(0)}>
                  <img
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80"
                    alt="Luxury Villa"
                    id="mainImage"
                  />
                  <span className="gallery-badge">For Sale</span>
                  <div className="gallery-photos-count" onClick={() => openLightbox(0)}>
                    <i className="bi bi-images"></i>
                    <span id="photoCount">{galleryImages.length} Photos</span>
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="thumbnail-grid" id="thumbnailGrid">
                  {galleryImages.map((img, i) => (
                    <div
                      key={i}
                      className="thumbnail-item"
                      onClick={() => openLightbox(i)}
                    >
                      <img src={img.src.replace("w=1200", "w=300")} alt={img.title} />
                      <div className="thumbnail-overlay">
                        <i className="bi bi-zoom-in"></i>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="mt-5">
                <h3 className="section-title-custom">Description</h3>
                <p className="text-muted" style={{ lineHeight: 1.9 }}>
                  Welcome to this stunning luxury villa that epitomizes modern living at its
                  finest. This exceptional property offers an unparalleled combination of
                  elegance, comfort, and breathtaking design that will captivate you from
                  the moment you arrive.
                </p>
                <p className="text-muted" style={{ lineHeight: 1.9 }}>
                  Nestled in a prestigious neighborhood, this architectural masterpiece
                  features expansive living spaces, floor-to-ceiling windows, and premium
                  finishes throughout. The open-concept design seamlessly blends indoor and
                  outdoor living, perfect for entertaining or relaxing in style.
                </p>
                <p className="text-muted" style={{ lineHeight: 1.9 }}>
                  Every detail has been carefully curated to provide the ultimate in luxury
                  living, from the gourmet kitchen with top-of-the-line appliances to the
                  lavish master suite with panoramic views. This is more than a home – it's
                  a lifestyle statement.
                </p>
              </div>

              {/* Property Details Grid */}
              <div className="row g-4 mt-3">
                <div className="col-md-3 col-6">
                  <div className="info-card">
                    <div className="info-card-icon">
                      <i className="bi bi-house-door"></i>
                    </div>
                    <h5>450 m²</h5>
                    <span>Total Area</span>
                  </div>
                </div>
                <div className="col-md-3 col-6">
                  <div className="info-card">
                    <div className="info-card-icon">
                      <i className="bi bi-door-open"></i>
                    </div>
                    <h5>4</h5>
                    <span>Bedrooms</span>
                  </div>
                </div>
                <div className="col-md-3 col-6">
                  <div className="info-card">
                    <div className="info-card-icon">
                      <i className="bi bi-droplet"></i>
                    </div>
                    <h5>3</h5>
                    <span>Bathrooms</span>
                  </div>
                </div>
                <div className="col-md-3 col-6">
                  <div className="info-card">
                    <div className="info-card-icon">
                      <i className="bi bi-car-front"></i>
                    </div>
                    <h5>2</h5>
                    <span>Garages</span>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="mt-5">
                <h3 className="section-title-custom">Amenities</h3>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="amenity-item">
                      <div className="amenity-icon">
                        <i className="bi bi-wifi"></i>
                      </div>
                      <span>High-Speed Internet</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="amenity-item">
                      <div className="amenity-icon">
                        <i className="bi bi-snow"></i>
                      </div>
                      <span>Central Air Conditioning</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="amenity-item">
                      <div className="amenity-icon">
                        <i className="bi bi-fire"></i>
                      </div>
                      <span>Central Heating</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="amenity-item">
                      <div className="amenity-icon">
                        <i className="bi bi-shield-check"></i>
                      </div>
                      <span>24/7 Security System</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="amenity-item">
                      <div className="amenity-icon">
                        <i className="bi bi-water"></i>
                      </div>
                      <span>Swimming Pool</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="amenity-item">
                      <div className="amenity-icon">
                        <i className="bi bi-tree"></i>
                      </div>
                      <span>Private Garden</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="amenity-item">
                      <div className="amenity-icon">
                        <i className="bi bi-tv"></i>
                      </div>
                      <span>Smart Home System</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="amenity-item">
                      <div className="amenity-icon">
                        <i className="bi bi-box-seam"></i>
                      </div>
                      <span>Storage Room</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4" data-aos="fade-up">
              {/* Property Info */}
              <div className="property-header mb-4">
                <span className="badge bg-primary-custom mb-3">Featured Property</span>
                <h1>Luxury Modern Villa</h1>
                <div className="property-location">
                  <i className="bi bi-geo-alt-fill"></i>
                  <span>24 New Street, Miami, OR 24560</span>
                </div>
                <div className="property-price">
                  $2,450,000 <span>/ Starting from</span>
                </div>
              </div>

              {/* Agent Card */}
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

              {/* Quick Info */}
              <div className="info-card mt-4">
                <h5 className="fw-bold mb-3">Quick Info</h5>
                <div className="d-flex justify-content-between py-2 border-bottom">
                  <span className="text-muted">Property ID:</span>
                  <span className="fw-bold">#PRO-2024-001</span>
                </div>
                <div className="d-flex justify-content-between py-2 border-bottom">
                  <span className="text-muted">Year Built:</span>
                  <span className="fw-bold">2023</span>
                </div>
                <div className="d-flex justify-content-between py-2 border-bottom">
                  <span className="text-muted">Property Type:</span>
                  <span className="fw-bold">Villa</span>
                </div>
                <div className="d-flex justify-content-between py-2 border-bottom">
                  <span className="text-muted">Status:</span>
                  <span className="fw-bold text-success">Available</span>
                </div>
                <div className="d-flex justify-content-between py-2">
                  <span className="text-muted">Price per m²:</span>
                  <span className="fw-bold">$5,444</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-light pt-5 pb-3">
        <div className="container">
          <div className="row align-items-start">
            <div className="col-lg-4 mb-4 text-lg-start text-center">
              <img
                src="assets/images/logo.png"
                alt="Villa Agency Logo"
                className="mb-3"
                style={{ width: "150px" }}
              />
            </div>
            <div className="col-6 col-lg-4 mb-4 text-center text-lg-start">
              <h5 className="fw-bold mb-3">Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a
                    href="index.html"
                    className="text-light text-decoration-none d-block py-1"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="about.html"
                    className="text-light text-decoration-none d-block py-1"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="properties.html"
                    className="text-light text-decoration-none d-block py-1"
                  >
                    Properties
                  </a>
                </li>
                <li>
                  <a
                    href="contact.html"
                    className="text-light text-decoration-none d-block py-1"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-lg-4 mb-4 text-center text-lg-start">
              <h5 className="fw-bold mb-3">Contact Us</h5>
              <p className="text-light mb-2">
                <i className="bi bi-geo-alt-fill me-2"></i>123 Villa Street, Dream City
              </p>
              <p className="text-light mb-2">
                <i className="bi bi-telephone-fill me-2"></i>+1 234 567 890
              </p>
              <p className="text-light mb-2">
                <i className="bi bi-envelope-fill me-2"></i>info@villaagency.com
              </p>
            </div>
          </div>
          <div className="text-center pt-4 border-top border-secondary mt-4">
            <p className="mb-0">&copy; 2026 Arock Construction Co., Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Lightbox Modal */}
      <div
        className={`lightbox ${lightboxOpen ? "active" : ""}`}
        id="lightbox"
        onClick={(e) => {
          if (e.target.id === "lightbox") closeLightbox();
        }}
      >
        <div className="lightbox-content">
          <button className="lightbox-close" onClick={closeLightbox}>
            &times;
          </button>
          <button className="lightbox-nav lightbox-prev" onClick={prevImage}>
            <i className="bi bi-chevron-left"></i>
          </button>
          <img
            id="lightbox-image"
            src={currentImage?.src}
            alt="Property"
            style={{ transform: `scale(${currentZoom})` }}
          />
          <button className="lightbox-nav lightbox-next" onClick={nextImage}>
            <i className="bi bi-chevron-right"></i>
          </button>
          <div className="lightbox-caption" id="lightbox-caption">
            {currentImage?.title}
          </div>
          <div className="zoom-controls">
            <button className="zoom-btn" onClick={zoomOut} title="Zoom Out">
              <i className="bi bi-dash"></i>
            </button>
            <button className="zoom-btn" onClick={resetZoom} title="Reset">
              <i className="bi bi-arrow-repeat"></i>
            </button>
            <button className="zoom-btn" onClick={zoomIn} title="Zoom In">
              <i className="bi bi-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetailsPage;