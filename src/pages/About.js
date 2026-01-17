import React, { useEffect } from 'react';
import './About.css'; // Import the custom styles for this page

// Assuming other global CSS (like Bootstrap, FontAwesome, AOS, and template styles)
// are imported in your App.js or main entry file.

const About = () => {
    // If AOS is initialized globally in App.js with `once: true`,
    // you typically don't need to do anything specific here unless
    // you have dynamically loaded content you need to tell AOS about.
    // If you need to re-trigger AOS animations when the component mounts,
    // you might use an effect like this, but ensure AOS.init() is called once first.
    // useEffect(() => {
    //     if (window.AOS) {
    //         window.AOS.refresh(); // Refresh AOS to detect new elements
    //     }
    // }, []);

    return (
        // The <main> tag provides semantic structure for the main content
        <main>
            {/* Hero Section */}
            <section className="about-hero">
                 <img
                    src="/assets/images/w1.JPG"
                    alt="About Arock Construction"
                    className="hero-bg"
                />
                <div className="container text-center text-white">
                    <h1 className="fw-bold mb-3 display-5 display-md-4 display-lg-3" data-aos="fade-up">About Arock Construction</h1>
                    <p className="lead fs-4" data-aos="fade-up" data-aos-delay="200">Building Trust, Comfort, and Places That Feel Like They Belong</p>
                    <nav aria-label="breadcrumb" data-aos="fade-up" data-aos-delay="300">
                        <ol className="breadcrumb justify-content-center">
                            <li className="breadcrumb-item"><a href="/" className="text-white text-decoration-none">Home</a></li>
                            <li className="breadcrumb-item active text-white-50" aria-current="page">About Us</li>
                        </ol>
                    </nav>
                </div>
            </section>


            {/* About Intro Section */}
            <section className="py-5">
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6" data-aos="fade-up">
                            {/* Image paths assume 'assets/images' is in your 'public' folder */}
                            <img src="/assets/images/About_more_than_just_struct.JPG" className="img-fluid rounded-4 shadow-lg"
                                alt="About Arock Construction" />
                        </div>
                        <div className="col-lg-6" data-aos="fade-down">
                            <h6 className="text-uppercase text-colour fw-semibold mb-2">
                                | About Arock Construction
                            </h6>
                            {/* Inline style converted to JSX style object */}
                            <div className="mb-3" style={{ width: '80px', height: '4px', background: '#c59d5f' }}></div>

                            <h2 className="display-5 fw-bold mb-4">
                                More Than Just a <span className="text-colour">Structure</span>
                            </h2>
                            <p className="text-muted lh-lg mb-4">
                                At Arock Construction, we understand that a building is never just a structure. It is a dream
                                taking shape, a vision turning real, and a space where life unfolds every single day.
                            </p>
                            <p className="text-muted lh-lg">
                                Every project begins with listening — understanding your needs, your expectations, and the story
                                behind the space you want to create. Because when someone trusts us with their home or
                                workplace, they're trusting us with something deeply personal.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Building with Heart Section */}
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6 order-2 order-lg-1" data-aos="fade-up">
                            <h6 className="text-uppercase text-colour fw-semibold mb-2">| Our Philosophy</h6>
                            <div className="mb-3" style={{ width: '80px', height: '4px', background: '#c59d5f' }}></div>
                            <h2 className="display-5 fw-bold mb-4">
                                Building with Heart and <span className="text-colour">Responsibility</span>
                            </h2>
                            <p className="text-muted lh-lg mb-4">
                                Arock Construction was founded on the belief that construction should feel reassuring, not
                                overwhelming. From the first conversation to the final handover, we focus on clarity, honesty,
                                and craftsmanship.
                            </p>
                            <p className="text-muted lh-lg">
                                We take pride in being present at every stage — planning carefully, working responsibly, and
                                paying attention to the details that truly matter. Our goal is simple: to create spaces that
                                feel right, function beautifully, and stand strong for years to come.
                            </p>
                        </div>
                        <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-down">
                            <img src="/assets/images/About_Building_Heart.JPG" className="img-fluid rounded-4 shadow-lg" alt="Building with Heart" />
                        </div>
                    </div>
                </div>
            </section>

            {/* More Than Construction Section */}
            <section className="mission-section py-5">
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-10 text-center" data-aos="fade-up">
                            <h6 className="text-uppercase text-white-50 mb-3">| What Sets Us Apart</h6>
                            <h2 className="display-5 fw-bold text-white mb-4">More Than Construction</h2>
                            <p className="text-white-50 lh-lg fs-5 mb-4">
                                What sets us apart is not just how we build, but why we build. We care about the people who will
                                live, work, and grow within the spaces we create. Every wall, every finish, and every detail is
                                approached with purpose and respect.
                            </p>
                            <p className="text-white-50 lh-lg fs-5">
                                We believe quality is felt long after the project is complete — in the comfort of a home, in the
                                confidence of a workspace, and in the peace of knowing it was built the right way.
                            </p>
                        </div>
                    </div>
                    <div className="row g-4 mt-5">
                        <div className="col-md-4" data-aos="fade-up" data-aos-delay="0">
                            <div className="p-4 bg-white bg-opacity-10 rounded-4 text-center h-100">
                                <div className="d-inline-block p-3 bg-white rounded-circle mb-3">
                                    <i className="bi bi-house-heart fs-2 text-colour"></i>
                                </div>
                                <h5 className="text-white fw-bold mb-2">Comfort</h5>
                                <p className="text-white-50 small mb-0">Creating spaces that feel like home from day one.</p>
                            </div>
                        </div>
                        <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
                            <div className="p-4 bg-white bg-opacity-10 rounded-4 text-center h-100">
                                <div className="d-inline-block p-3 bg-white rounded-circle mb-3">
                                    <i className="bi bi-building-check fs-2 text-colour"></i>
                                </div>
                                <h5 className="text-white fw-bold mb-2">Confidence</h5>
                                <p className="text-white-50 small mb-0">Workspaces built to inspire productivity and success.</p>
                            </div>
                        </div>
                        <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
                            <div className="p-4 bg-white bg-opacity-10 rounded-4 text-center h-100">
                                <div className="d-inline-block p-3 bg-white rounded-circle mb-3">
                                    <i className="bi bi-shield-check fs-2 text-colour"></i>
                                </div>
                                <h5 className="text-white fw-bold mb-2">Peace of Mind</h5>
                                <p className="text-white-50 small mb-0">Knowing your space was built the right way.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="py-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <h6 className="text-uppercase text-muted mb-2">| What We Stand For</h6>
                        <h2 className="display-5 fw-bold">Our Core Values</h2>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="0" data-aos="zoom-in">
                            <div className="text-center p-4">
                                <div className="value-icon bg-gradient-primary">
                                    <i className="bi bi-ear"></i>
                                </div>
                                <h5 className="fw-bold mb-3">Listening</h5>
                                <p className="text-muted small">Every project begins with understanding your needs and the story
                                    behind your space.</p>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="100" data-aos="zoom-in">
                            <div className="text-center p-4">
                                <div className="value-icon bg-gradient-primary">
                                    <i className="bi bi-hand-thumbs-up"></i>
                                </div>
                                <h5 className="fw-bold mb-3">Honesty</h5>
                                <p className="text-muted small">Clarity and transparency guide every conversation and decision we
                                    make.</p>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="200" data-aos="zoom-in">
                            <div className="text-center p-4">
                                <div className="value-icon bg-gradient-primary">
                                    <i className="bi bi-tools"></i>
                                </div>
                                <h5 className="fw-bold mb-3">Craftsmanship</h5>
                                <p className="text-muted small">Attention to detail and quality in every wall, finish, and element
                                    we create.</p>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="300" data-aos="zoom-in">
                            <div className="text-center p-4">
                                <div className="value-icon bg-gradient-primary">
                                    <i className="bi bi-award"></i>
                                </div>
                                <h5 className="fw-bold mb-3">Accountability</h5>
                                <p className="text-muted small">We stand behind our work and the trust our clients place in us.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Commitment Section */}
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6" data-aos="fade-up">
                            <img src="/assets/images/About_Commitment.JPG" className="img-fluid rounded-4 shadow-lg" alt="A Commitment That Lasts" />
                        </div>
                        <div className="col-lg-6" data-aos="fade-down">
                            <h6 className="text-uppercase text-muted mb-2">| Our Promise</h6>
                            <h2 className="display-5 fw-bold mb-4">A Commitment That Lasts</h2>
                            <p className="text-muted lh-lg mb-4">
                                For us, success isn't measured only in completed projects, but in lasting relationships. We
                                value trust, accountability, and the confidence our clients place in us. That responsibility
                                drives us to deliver work we are proud to stand behind.
                            </p>
                            <div className="p-4 bg-white rounded-4 shadow-sm quote-card">
                                <p className="text-dark fw-medium fst-italic mb-0 fs-5">
                                    "At Arock Construction, we don't just build spaces — we build trust, comfort, and places
                                    that feel like they belong."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section py-5">
                <div className="container py-5 text-center">
                    <h2 className="display-5 fw-bold text-white mb-4" data-aos="fade-up">Ready to Build Your Dream Space?</h2>
                    <p className="text-white-50 fs-5 mb-4" data-aos="fade-up" data-aos-delay="100">Let's discuss your project and
                        turn your vision into reality.</p>
                    <div className="d-flex flex-column flex-sm-row
                    justify-content-center align-items-center gap-3" data-aos="fade-up" data-aos-delay="200">
                        {/* Use React Router Link or normal <a> tag depending on your routing setup */}
                        <a href="/contact" className="btn btn-light btn-lg px-5 py-3 fw-bold w-100 w-sm-auto btn-col">
                            Contact Us
                        </a>

                        <a href="/project" // Changed from property-details.html to portfolio for consistency with your home page navigation
                            className="btn btn-outline-light btn-lg px-5 py-3 fw-bold w-100 w-sm-auto btn-col">
                            View Projects
                        </a>

                    </div>

                </div>
            </section>
        </main>
    );
};

export default About;