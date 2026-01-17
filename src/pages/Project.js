// src/pages/Project.jsx
import React, { useEffect } from 'react';
import './Project.css'; // We'll create this for custom styles
import AOS from 'aos';
import 'aos/dist/aos.css';

const Project = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 120,
            easing: 'ease-in-out',
        });

        // Optional: Re-init AOS if dynamic content changes
        return () => {
            AOS.refreshHard();
        };
    }, []);

    const projects = [
        { id: 1, img: '/assets/images/property-01.jpg', type: 'adv' },
        { id: 2, img: '/assets/images/property-02.jpg', type: 'str' },
        { id: 3, img: '/assets/images/property-03.jpg', type: 'rac' },
        { id: 4, img: '/assets/images/property-04.jpg', type: 'adv' },
        { id: 5, img: '/assets/images/property-05.jpg', type: 'str' },
        { id: 6, img: '/assets/images/property-06.jpg', type: 'rac' },
    ];

    return (
        <main>
            {/* Hero Section */}
            <section className="about-hero">
                 <img
                    src="/assets/images/w1.JPG"
                    alt="About Arock Construction"
                    className="hero-bg"
                />
                <div className="container text-center text-white">
                    <h1
                        className="fw-bold mb-3 display-5 display-md-4 display-lg-3"
                        data-aos="fade-up"
                    >
                        Projects - Arock Construction
                    </h1>
                    <nav aria-label="breadcrumb" data-aos="fade-up" data-aos-delay="300">
                        <ol className="breadcrumb justify-content-center">
                            <li className="breadcrumb-item">
                                <a href="/" className="text-white text-decoration-none">Home</a>
                            </li>
                            <li className="breadcrumb-item active text-white-50" aria-current="page">
                                Project
                            </li>
                        </ol>
                    </nav>
                </div>
            </section>

            {/* Properties Grid */}
            <div className="section properties py-5">
                <div className="container">
                    {/* Filters */}
                    <ul className="properties-filter d-flex justify-content-center list-unstyled gap-3 mb-5">
                        <li>
                            <a href="#!" className="is_active" data-filter="*">
                                Show All
                            </a>
                        </li>
                        <li>
                            <a href="#!" data-filter=".adv">Single Story</a>
                        </li>
                        <li>
                            <a href="#!" data-filter=".str">Double Story</a>
                        </li>
                        <li>
                            <a href="#!" data-filter=".rac">Split Levels</a>
                        </li>
                    </ul>

                    {/* Grid */}
                    <div className="row properties-box g-4">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className={`col-lg-4 col-md-6 ${project.type}`}
                            >
                                <div className="property-card h-100">
                                    <div className="img-container position-relative">
                                        <img
                                            src={project.img}
                                            alt={`Project ${project.id}`}
                                            className="w-100 h-100"
                                        />
                                    </div>
                                    <div className="card-overlay">
                                        <div className="overlay-logo text-center">
                                            <div className="position-relative d-inline-block">
                                                {/* Logo Ring (optional animation can be added via CSS) */}
                                                {/* <div className="logo-ring"></div> */}
                                                <div className="logo-icon badge-gradient shadow-lg">
                                                    <img
                                                        src="/assets/images/logo.png"
                                                        alt="Arock Logo"
                                                        className="logo-img-small"
                                                    />
                                                </div>
                                            </div>
                                            <p className="logo-text mt-2">
                                                Arock <span>Build</span>
                                            </p>
                                        </div>
                                        <a href={`/project/${project.id}`} className="overlay-btn">
                                            View Project
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination (Optional: replace with infinite scroll or router links) */}
                    <div className="row mt-5">
                        <div className="col-lg-12">
                            <ul className="pagination justify-content-center list-unstyled d-flex gap-2">
                                <li><a href="#!">1</a></li>
                                <li><a href="#!" className="is_active">2</a></li>
                                <li><a href="#!">3</a></li>
                                <li><a href="#!">&gt;&gt;</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Project;