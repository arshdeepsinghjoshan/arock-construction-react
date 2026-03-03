import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { useQuery } from "@tanstack/react-query";
import AOS from "aos";
import "aos/dist/aos.css";
import "./PropertyDetails.css";

const fetchProject = async ({ queryKey }) => {
  const [_key, slug] = queryKey;
  const res = await api.get(`/projects/${slug}`);
  return res.data.data;
};

const PropertyDetailsPage = () => {
  const { slug } = useParams();

  const [loadFailed, setLoadFailed] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentZoom, setCurrentZoom] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    visit_date: "",
    message: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await api.post("/schedule-visit", {
        project_id: project.id,
        ...form
      });

      alert("Visit scheduled successfully ✅");

      setForm({
        name: "",
        email: "",
        phone: "",
        visit_date: "",
        message: ""
      });
    } catch (error) {
      alert("Something went wrong ❌");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 120 });
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["project-details", slug],
    queryFn: fetchProject,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setLoadFailed(true), 5000);
      return () => clearTimeout(timer);
    } else {
      setLoadFailed(false);
    }
  }, [isLoading]);

  if (isLoading && !loadFailed) {
    return <div style={{ minHeight: "70vh" }} />;
  }

  if (loadFailed || error || !data?.project) {
    return (
      <section className="py-5 text-center">
        <h2 className="text-danger">Failed to load property 😔</h2>
      </section>
    );
  }

  const project = data.project;
  const galleryImages = data?.gallery ? Object.values(data.gallery) : [];
  const thumbnail = data?.thumbnail ?? "";
  const features = project?.features ?? {};

  const maxZoom = 3;
  const minZoom = 0.5;

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setCurrentZoom(1);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const prevImage = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );

  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);

  const zoomIn = () =>
    setCurrentZoom((z) => (z < maxZoom ? z + 0.5 : z));

  const zoomOut = () =>
    setCurrentZoom((z) => (z > minZoom ? z - 0.5 : z));

  const resetZoom = () => setCurrentZoom(1);

  return (
    <>
      {/* HERO */}
      <section className="about-hero">
        <img src="/assets/images/viewdetails.JPG" alt="" className="hero-bg" />
        <div className="container text-center text-white">
          <h1 className="fw-bold">{project.title}</h1>
        </div>
      </section>

      {/* MAIN */}
      <section className="py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-8">
              <div className="property-gallery">
                <div
                  className="main-property-image"
                  onClick={() => openLightbox(0)}
                >
                  <img
                    src={thumbnail || galleryImages[0]?.src}
                    alt={project.title}
                  />
                </div>

                <div className="thumbnail-grid">
                  {galleryImages.map((img, i) => (
                    <div
                      key={i}
                      className="thumbnail-item"
                      onClick={() => openLightbox(i)}
                    >
                      <img src={img.src} alt="" />
                    </div>
                  ))}
                </div>
                {/* Description */}
                <div className="mt-5">
                  <h3 className="section-title-custom">Description</h3>
                  {/* <p className="text-muted" style={{ lineHeight: 1.9 }}>{project.content}</p> */}
                  {/* <div
                  className="text-muted"
                  style={{ lineHeight: 1.9 }}
                  dangerouslySetInnerHTML={{ __html: project.content }}
                ></div> */}
                  {project.content ? (
                    <div
                      className="text-muted"
                      style={{ lineHeight: 1.9 }}
                      dangerouslySetInnerHTML={{ __html: project.content }}
                    />
                  ) : (
                    <p className="text-muted">Description not available</p>
                  )}

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
                          {/* <h5>{project.features.total_area}</h5> */}

                          <h5>{features.total_area ?? "-"}</h5>

                          <span>Total Floor Area</span>
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
                      {(Array.isArray(project?.amenities) && project.amenities.length > 0) ? (
                        project.amenities.map((amenity, index) => {
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

                          const iconClass = iconMap[amenity] || "bi-star";

                          return (
                            <div className="col-md-6" key={index}>
                              <div className="amenity-item">
                                <div className="amenity-dot"></div>
                                <span>{amenity}</span>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="col-12">
                          <p className="text-muted">No amenities available.</p>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4" data-aos="fade-up">
              <div className="property-header mb-4">
                <span className="badge bg-primary-custom mb-3">Featured Property</span>
                <h1>{project.title}</h1>
                {/* <div className="property-location"><i className="bi bi-geo-alt-fill"></i> <span>{project.address ? project.address : "Address not available"}</span></div> */}

                {project.state_id === 3 && (
                  <div className="property-price">
                    ${Number(project.price).toLocaleString()} <span>/ Starting from</span>
                  </div>
                )}

                <div className="agent-card mb-4">
                  <div className="agent-avatar">
                    <i className="bi bi-person-circle boy-avatar"></i>
                  </div>

                  <h4 className="agent-name">Mithil Patel</h4>
                  <p className="agent-role text-center">Senior Property Consultant</p>
                  <div className="agent-contact">
                    <a href="tel:+61420999007">
                      <i className="bi bi-telephone-fill text-primary-custom"></i> +61 (420)
                      999-007
                    </a>
                    <a href="mailto:sales@arockconstruction.com.au">
                      <i className="bi bi-envelope-fill text-primary-custom"></i>
                      sales@arockconstruction.com.au
                    </a>
                  </div>
                  <button
                    className="btn-submit mt-4"
                    onClick={() => window.location.href = "tel:+61420999007"}
                  >
                    <i className="bi bi-telephone-fill me-2"></i>
                    Request Call Back
                  </button>
                </div>

                {/* Contact Form */}
                <div className="contact-form-card">
                  <h4 className="fw-bold mb-4">Schedule a Visit</h4>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="name"
                      className="form-control mb-3"
                      placeholder="Your Name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />

                    <input
                      type="email"
                      name="email"
                      className="form-control mb-3"
                      placeholder="Your Email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />

                    <input
                      type="tel"
                      name="phone"
                      className="form-control mb-3"
                      placeholder="Your Phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />

                    <input
                      type="date"
                      name="visit_date"
                      className="form-control mb-3"
                      value={form.visit_date}
                      onChange={handleChange}
                      required
                    />

                    <textarea
                      name="message"
                      className="form-control mb-3"
                      rows="4"
                      placeholder="Your Message"
                      value={form.message}
                      onChange={handleChange}
                    />

                    <button type="submit" className="btn-submit" disabled={submitting}>
                      {submitting ? "Submitting..." : "Book Appointment"}
                    </button>
                  </form>
                </div>
                {project?.state_id === 3 && (
                  <div className="info-card mt-4">
                    <h5 className="fw-bold mb-3">Quick Info</h5>
                    {(project?.quick_info &&
                      typeof project.quick_info === "object" &&
                      Object.keys(project.quick_info).length > 0) ? (
                      Object.entries(project.quick_info).map(([key, value]) => (
                        <div
                          className="d-flex justify-content-between py-2 border-bottom"
                          key={key}
                        >
                          <span className="text-muted">{key}</span>
                          <span
                            className={`fw-bold ${value === "Available" ? "text-success" : ""
                              }`}
                          >
                            {value}
                          </span>

                        </div>
                      ))
                    ) : (
                      <p className="text-muted mb-0">No information available.</p>
                    )}
                  </div>
                )}


              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <div
        id="lightbox"
        className={`lightbox ${lightboxOpen ? "active" : ""}`}
        onClick={(e) => e.target.id === "lightbox" && closeLightbox()}
      >
        <div className="lightbox-content">
          <button className="lightbox-close z-1" onClick={closeLightbox}>
            &times;
          </button>

          <button className="lightbox-nav lightbox-prev z-1" onClick={prevImage}>
            <i className="bi bi-chevron-left"></i>
          </button>

          {/* ✅ ZOOM FIX APPLIED HERE */}
          <img
            src={galleryImages[currentIndex]?.src}
            alt=""
            style={{
              transform: `scale(${currentZoom})`,
              transition: "transform 0.3s ease",
              maxWidth: "100%",
              maxHeight: "80vh",
            }}
          />

          <button className="lightbox-nav lightbox-next" onClick={nextImage}>
            <i className="bi bi-chevron-right"></i>
          </button>

          <div className="zoom-controls">
            <button onClick={zoomOut}>
              <i className="bi bi-dash"></i>
            </button>
            <button onClick={resetZoom}>
              <i className="bi bi-arrow-repeat"></i>
            </button>
            <button onClick={zoomIn}>
              <i className="bi bi-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetailsPage;
