import React, { useState, useEffect } from 'react';
import './Contact.css'; // Import the custom styles for this page
// Assuming other global CSS (like Bootstrap, FontAwesome, AOS, and template styles)
// are imported in your App.js or main entry file.
// If you use React Router, you'll want to use Link from 'react-router-dom'
import { Link } from 'react-router-dom';

const Contact = () => {
    const [selectedPropertyType, setSelectedPropertyType] = useState('singleStory');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        budget: 'Under $500k',
        message: '',
        agreeToCommunications: true,
    });

    const propertyTypes = [
        { id: 'singleStory', icon: 'fas fa-home', label: 'Single Story' },
        { id: 'doubleStory', icon: 'fas fa-building', label: 'Double Story' },
        { id: 'splitLevel', icon: 'fas fa-city', label: 'Split Level' },
    ];

    const handlePropertyTypeSelect = (typeId) => {
        setSelectedPropertyType(typeId);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", { ...formData, selectedPropertyType });
        // Here you would typically send data to a backend API
        alert('Thank you for your enquiry! We will get back to you soon.');
        // Optionally reset form
        setFormData({
            fullName: '',
            email: '',
            phone: '',
            budget: 'Under $500k',
            message: '',
            agreeToCommunications: true,
        });
        setSelectedPropertyType('singleStory');
    };

    // If AOS is initialized globally in App.js with `once: true`,
    // you typically don't need to do anything specific here unless
    // you have dynamically loaded content you need to tell AOS about.
    // useEffect(() => {
    //     if (window.AOS) {
    //         window.AOS.refresh();
    //     }
    // }, []);

    return (
        <main>
            <section className="enquiry-hero">
                <div className="container text-center text-white">
                    <h1 className="fw-bold display-4" data-aos="fade-down">Enquire Today</h1>
                    <p className="lead" data-aos="fade-up" data-aos-delay="200">Your dream home is just one message away.</p>
                </div>
            </section>

            <div className="container enquiry-container">
                <div className="row justify-content-center">
                    <div className="col-lg-11">
                        <div className="glass-card" data-aos="zoom-in">
                            <div className="row g-0">
                                <div className="col-lg-5 info-side">
                                    <span className="feature-tag">Trusted Developers</span>
                                    <h2 className="fw-bold mb-4">Let's Build Something Great Together</h2>
                                    <p className="mb-5 opacity-75">Fill out the form and our property consultant will get back to you within 24 hours to discuss your requirements and schedule a site visit.</p>

                                    <div className="contact-item">
                                        <div className="contact-icon"><i className="fas fa-phone-alt"></i></div>
                                        <div>
                                            <h6 className="mb-0 fw-bold">Call Us Direct</h6>
                                            <a href="tel:+61730776788" className="mb-0 d-block text-white opacity-75 text-decoration-none">
                                                Office: +61 730776788
                                            </a>
                                            <a href="tel:+61433271896" className="mb-0 d-block text-white opacity-75 text-decoration-none">
                                                Mobile: +61 433271896
                                            </a>
                                        </div>
                                    </div>

                                    <div className="contact-item">
                                        <div className="contact-icon"><i className="fas fa-envelope"></i></div>
                                        <div>
                                            <h6 className="mb-0 fw-bold">Email Support</h6>
                                            <a
                                                href="mailto:sales@arockconstruction.com.au"
                                                className="mb-0 d-block text-white opacity-75 text-decoration-none"
                                            >
                                                sales@arockconstruction.com.au
                                            </a>
                                        </div>
                                    </div>

                                    <div className="contact-item">
                                        <div className="contact-icon"><i className="fas fa-map-marker-alt"></i></div>
                                        <div>
                                            <h6 className="mb-0 fw-bold">Main Office</h6>
                                            <a
                                                href="https://www.google.com/maps?q=Unit+1/24+Technology+Drive+Augustine+Heights+Queensland+4300"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mb-0 d-block text-white opacity-75 text-decoration-none"
                                            >
                                                Unit 1/24 Technology Drive,<br />
                                                Augustine Heights,<br />
                                                Queensland 4300
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-7 form-side">
                                    <div className="d-flex align-items-center mb-4">
                                        <div className="spinner-grow text-success spinner-grow-sm me-2" role="status"></div>
                                        <span className="small fw-bold text-success">Consultants Online Now</span>
                                    </div>
                                    <h3 className="fw-bold mb-4" style={{ color: 'var(--dark-blue)' }}>Project Enquiry Form</h3>

                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-12">
                                                <label className="form-label small fw-bold">SELECT PROPERTY TYPE</label>
                                                <div className="property-type-grid">
                                                    {propertyTypes.map(type => (
                                                        <div
                                                            key={type.id}
                                                            className={`type-card ${selectedPropertyType === type.id ? 'active' : ''}`}
                                                            onClick={() => handlePropertyTypeSelect(type.id)}
                                                        >
                                                            <i className={type.icon}></i>
                                                            <span>{type.label}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold">FULL NAME</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="John Doe"
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold">EMAIL ADDRESS</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="john@example.com"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold">PHONE NUMBER</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="+1 (555) 000-0000"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold">BUDGET RANGE</label>
                                                <select
                                                    className="form-select"
                                                    name="budget"
                                                    value={formData.budget}
                                                    onChange={handleChange}
                                                >
                                                    <option>Under $500k</option>
                                                    <option>$500k - $1M</option>
                                                    <option>$1M - $3M</option>
                                                    <option>$3M+</option>
                                                </select>
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label small fw-bold">YOUR MESSAGE</label>
                                                <textarea
                                                    className="form-control"
                                                    rows="4"
                                                    placeholder="Tell us more about your dream project..."
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                ></textarea>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-check mb-4">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="agree"
                                                        name="agreeToCommunications"
                                                        checked={formData.agreeToCommunications}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label small text-muted" htmlFor="agree">
                                                        I agree to receive communications regarding my enquiry.
                                                    </label>
                                                </div>
                                                <button type="submit" className="btn-enquiry">Send Message <i className="fas fa-paper-plane ms-2"></i></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Process Steps */}
            <section className="process-steps">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
                            <div className="step-item">
                                <div className="step-icon">1</div>
                                <h5>Send Enquiry</h5>
                                <p>Fill out the form with your project details and budget requirements.</p>
                            </div>
                        </div>
                        <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
                            <div className="step-item">
                                <div className="step-icon">2</div>
                                <h5>Free Consultation</h5>
                                <p>Our experts will reach out within 24 hours for a detailed design brief.</p>
                            </div>
                        </div>
                        <div className="col-lg-4" data-aos="fade-up" data-aos-delay="300">
                            <div className="step-item">
                                <div className="step-icon">3</div>
                                <h5>Project Launch</h5>
                                <p>Finalize the blueprints and witness your dream home come to life.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="map-section py-5" data-aos="fade-up">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-heading text-center mb-5">
                                <h6 className="text-uppercase fw-bold" style={{ color: 'var(--primary-gold)' }}>Our Location</h6>
                                <h2 className="fw-bold">Visit Our Design Studio</h2>
                            </div>
                            <div className="map-container position-relative">
                                <iframe
                                    src="https://www.google.com/maps?q=Unit+1/24+Technology+Drive+Augustine+Heights+Queensland+4300&output=embed"
                                    width="100%"
                                    height="500"
                                    style={{
                                        border: 0,
                                        borderRadius: '20px',
                                        boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
                                    }}
                                    allowFullScreen
                                    loading="lazy"
                                    title="Office Location"
                                ></iframe>

                                <div className="map-overlay d-none d-lg-block">
                                    <div
                                        className="bg-white p-4 rounded-4 shadow-lg position-absolute"
                                        style={{ top: '40px', left: '40px', width: '320px' }}
                                    >
                                        <h5 className="fw-bold mb-3" style={{ color: 'var(--dark-blue)' }}>
                                            Arock Headquarters
                                        </h5>

                                        <p className="small text-muted mb-3">
                                            <i className="fas fa-map-marker-alt me-2 text-warning"></i>
                                            Unit 1/24 Technology Drive,<br />
                                            Augustine Heights,<br />
                                            Queensland 4300
                                        </p>

                                        <hr />

                                        <a
                                            href="https://www.google.com/maps?q=Unit+1/24+Technology+Drive+Augustine+Heights+Queensland+4300"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-sm w-100 text-white"
                                            style={{ background: 'var(--primary-gold)' }}
                                        >
                                            Get Directions
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Contact;