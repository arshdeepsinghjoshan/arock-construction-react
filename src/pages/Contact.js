import React, { useState, useEffect } from 'react';
import './Contact.css';
import { Link } from 'react-router-dom';
// import api from '/untiapi'; // Make sure this points to your api config
import api from '../utils/api'; // Ensure this path matches your project structure

const Contact = () => {
    const [selectedPropertyType, setSelectedPropertyType] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        budget: 'Under $500k',
        message: '',
        agreeToCommunications: true,
    });

    // Fetch project categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoadingCategories(true);
                const res = await api.get('/project-categories');
                setCategories(res.data.data || res.data);
                // Set default selected category
                if (res.data.data?.length > 0) {
                    setSelectedPropertyType(res.data.data[0].id);
                } else if (res.data?.length > 0) {
                    setSelectedPropertyType(res.data[0].id);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoadingCategories(false);
            }
        };

        fetchCategories();
    }, []);

    const handlePropertyTypeSelect = (categoryId) => {
        setSelectedPropertyType(categoryId);
        // Clear category error when selected
        if (errors.project_category_id) {
            setErrors(prev => ({ ...prev, project_category_id: null }));
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage('');
        setSubmitting(true);

        try {
            const payload = {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                budget: formData.budget,
                project_category_id: selectedPropertyType,
                message: formData.message,
                agreeToCommunications: formData.agreeToCommunications,
            };

            const response = await api.post('/schedule-enquiry', payload);

            // Success
            setSuccessMessage('Thank you for your enquiry! We will get back to you soon.');
            alert('Thank you for your enquiry! We will get back to you soon.');
            // Reset form
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                budget: 'Under $500k',
                message: '',
                agreeToCommunications: true,
            });
            
            // Reset to first category
            if (categories.length > 0) {
                setSelectedPropertyType(categories[0].id);
            }

        } catch (error) {
            console.error('Form submission error:', error);
            
            if (error.response?.status === 422) {
                // Laravel validation errors
                const validationErrors = error.response.data.errors;
                setErrors(validationErrors);
            } else {
                setErrors({ general: 'Something went wrong. Please try again later.' });
            }
        } finally {
            setSubmitting(false);
        }
    };

    // Get icon for category (you can customize based on your category names)
    const getCategoryIcon = (categoryName) => {
        const name = categoryName?.toLowerCase() || '';
        if (name.includes('single')) return 'fas fa-home';
        if (name.includes('double')) return 'fas fa-building';
        if (name.includes('split')) return 'fas fa-city';
        if (name.includes('apartment')) return 'fas fa-building';
        if (name.includes('villa')) return 'fas fa-hotel';
        return 'fas fa-home';
    };

    // Skeleton loader component for categories
    const CategorySkeleton = () => (
        <div className="property-type-grid">
            {[1, 2, 3].map((item) => (
                <div key={item} className="type-card skeleton-card">
                    <div className="skeleton skeleton-icon"></div>
                    <div className="skeleton skeleton-text"></div>
                </div>
            ))}
        </div>
    );

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
                                    <h2 className="fw-bold mb-4">Let's Build Something Great Together</h2>
                                    <p className="mb-5 opacity-75">Fill out the form and our property consultant will get back to you within 24 hours to discuss your requirements and schedule a site visit.</p>

                                    <div className="contact-item">
                                        <div className="contact-icon"><i className="fas fa-phone-alt"></i></div>
                                        <div>
                                            <h6 className="mb-0 fw-bold">Call Us Direct</h6>
                                            <a href="tel:+61730776788" className="mb-0 d-block text-white opacity-75 text-decoration-none">
                                                Office: +61 730776788
                                            </a>
                                            <a href="tel:+61420999007" className="mb-0 d-block text-white opacity-75 text-decoration-none">
                                                Mobile: +61 420999007
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

                                    {/* Success Message */}
                                    {successMessage && (
                                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                                            <i className="fas fa-check-circle me-2"></i>
                                            {successMessage}
                                            <button 
                                                type="button" 
                                                className="btn-close" 
                                                onClick={() => setSuccessMessage('')}
                                            ></button>
                                        </div>
                                    )}

                                    {/* General Error */}
                                    {errors.general && (
                                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                            <i className="fas fa-exclamation-circle me-2"></i>
                                            {errors.general}
                                            <button 
                                                type="button" 
                                                className="btn-close" 
                                                onClick={() => setErrors(prev => ({ ...prev, general: null }))}
                                            ></button>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            {/* Property Type Selection */}
                                            <div className="col-12">
                                                <label className="form-label small fw-bold">SELECT PROPERTY TYPE</label>
                                                
                                                {loadingCategories ? (
                                                    <CategorySkeleton />
                                                ) : (
                                                    <div className="property-type-grid">
                                                        {categories.map(category => (
                                                            <div
                                                                key={category.id}
                                                                className={`type-card ${selectedPropertyType === category.id ? 'active' : ''}`}
                                                                onClick={() => handlePropertyTypeSelect(category.id)}
                                                            >
                                                                <i className={getCategoryIcon(category.name)}></i>
                                                                <span>{category.name}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                
                                                {errors.project_category_id && (
                                                    <div className="text-danger small mt-1">
                                                        <i className="fas fa-exclamation-circle me-1"></i>
                                                        {errors.project_category_id[0]}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Full Name */}
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold">FULL NAME</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                                                    placeholder="John Doe"
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleChange}
                                                />
                                                {errors.fullName && (
                                                    <div className="invalid-feedback">
                                                        {errors.fullName[0]}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Email */}
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold">EMAIL ADDRESS</label>
                                                <input
                                                    type="email"
                                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                    placeholder="john@example.com"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                                {errors.email && (
                                                    <div className="invalid-feedback">
                                                        {errors.email[0]}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Phone */}
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold">PHONE NUMBER</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                                    placeholder="+1 (555) 000-0000"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                />
                                                {errors.phone && (
                                                    <div className="invalid-feedback">
                                                        {errors.phone[0]}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Budget */}
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold">BUDGET RANGE</label>
                                                <select
                                                    className={`form-select ${errors.budget ? 'is-invalid' : ''}`}
                                                    name="budget"
                                                    value={formData.budget}
                                                    onChange={handleChange}
                                                >
                                                    <option value="Under $500k">Under $500k</option>
                                                    <option value="$500k - $1M">$500k - $1M</option>
                                                    <option value="$1M - $3M">$1M - $3M</option>
                                                    <option value="$3M+">$3M+</option>
                                                </select>
                                                {errors.budget && (
                                                    <div className="invalid-feedback">
                                                        {errors.budget[0]}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Message */}
                                            <div className="col-12">
                                                <label className="form-label small fw-bold">YOUR MESSAGE</label>
                                                <textarea
                                                    className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                                                    rows="4"
                                                    placeholder="Tell us more about your dream project..."
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                ></textarea>
                                                {errors.message && (
                                                    <div className="invalid-feedback">
                                                        {errors.message[0]}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Agreement Checkbox */}
                                            <div className="col-12">
                                                <div className="form-check mb-4">
                                                    <input
                                                        className={`form-check-input ${errors.agreeToCommunications ? 'is-invalid' : ''}`}
                                                        type="checkbox"
                                                        id="agree"
                                                        name="agreeToCommunications"
                                                        checked={formData.agreeToCommunications}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label small text-muted" htmlFor="agree">
                                                        I agree to receive communications regarding my enquiry.
                                                    </label>
                                                    {errors.agreeToCommunications && (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.agreeToCommunications[0]}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Submit Button */}
                                                <button 
                                                    type="submit" 
                                                    className="btn-enquiry"
                                                    disabled={submitting || loadingCategories}
                                                >
                                                    {submitting ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                            Sending...
                                                        </>
                                                    ) : (
                                                        <>
                                                            Send Message <i className="fas fa-paper-plane ms-2"></i>
                                                        </>
                                                    )}
                                                </button>
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