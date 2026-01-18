import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../utils/api'; // Ensure this path matches your project structure
import './Project.css'; // Keep your existing styles
import AOS from 'aos';
import 'aos/dist/aos.css';

// 1. Function to fetch Categories
const fetchCategories = async () => {
    const res = await api.get('/project-categories'); // Same API as portfolio
    return res.data.data;
};
const fetchProjects = async ({ queryKey }) => {
    const [_key, page, filter] = queryKey;

    // Correct URL with multiple static state_ids
    let url = `/projects?state_id=0,3,4&page=${page}`;

    if (filter !== '*') {
        url += `&category_id=${filter}`;
    }

    const res = await api.get(url);
    return res.data.data; // Assuming API returns { data: { data: [], last_page: 1 } }
};


// 3. Skeleton Loader Component (Optional but recommended for UX)
const ProjectSkeleton = () => {
    return (
        <div className="row properties-box g-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="col-lg-4 col-md-6">
                    <div className="skeleton skeleton-card" style={{ height: '300px', borderRadius: '8px', width: '100%' }}></div>
                </div>
            ))}
        </div>
    );
};

const Project = () => {
    const [activeFilter, setActiveFilter] = useState('*');
    const [currentPage, setCurrentPage] = useState(1);
    const [loadFailed, setLoadFailed] = useState(false);

    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 120,
            easing: 'ease-in-out',
        });
        return () => {
            AOS.refreshHard();
        };
    }, []);

    // Fetch Categories
    const { data: categories = [], isLoading: categoriesLoading } = useQuery({
        queryKey: ['project-categories'],
        queryFn: fetchCategories,
        staleTime: 10 * 60 * 1000,
    });

    // Fetch Projects
    const { data: projectsData, isLoading, error } = useQuery({
        queryKey: ['projects', currentPage, activeFilter],
        queryFn: fetchProjects,
        keepPreviousData: true,
    });

    const projects = projectsData?.data || [];
    const lastPage = projectsData?.last_page || 1;

    // Handle timeout for failed loads
    React.useEffect(() => {
        if (isLoading) {
            const timer = setTimeout(() => setLoadFailed(true), 5000);
            return () => clearTimeout(timer);
        } else {
            setLoadFailed(false);
        }
    }, [isLoading]);

    return (
        <main>
            {/* Hero Section */}
            <section className="about-hero">
                <img
                    src="/assets/images/w1.JPG"
                    alt="Projects Arock Construction"
                    className="hero-bg"
                />
                <div className="container text-center text-white">
                    <h1
                        className="fw-bold mb-3 display-5"
                        data-aos="fade-up"
                    >
                        Projects - Arock Construction
                    </h1>
                    <nav aria-label="breadcrumb" data-aos="fade-up" data-aos-delay="300">
                        <ol className="breadcrumb justify-content-center">
                            <li className="breadcrumb-item">
                                <Link to="/" className="text-white text-decoration-none">Home</Link>
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

                    {/* Error State */}
                    {(loadFailed || error) && (
                        <div className="alert alert-danger text-center">
                            <h4>Failed to load projects.</h4>
                            <p>Please check your connection or try again later.</p>
                        </div>
                    )}

                    {/* Filters - Dynamic from API */}
                    <ul className="properties-filter d-flex justify-content-center list-unstyled gap-3 mb-5">
                        <li>
                            <a
                                href="#!"
                                className={activeFilter === '*' ? 'is_active' : ''}
                                onClick={(e) => { e.preventDefault(); setActiveFilter('*'); setCurrentPage(1); }}
                            >
                                Show All
                            </a>
                        </li>
                        {categories.map((cat) => (
                            <li key={cat.id}>
                                <a
                                    href="#!"
                                    className={activeFilter === cat.id ? 'is_active' : ''}
                                    onClick={(e) => { e.preventDefault(); setActiveFilter(cat.id); setCurrentPage(1); }}
                                >
                                    {cat.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Grid Content */}
                    {isLoading && !loadFailed ? (
                        <ProjectSkeleton />
                    ) : projects.length === 0 ? (
                        <div className="text-center py-5">
                            <h3 className="text-muted">No projects found in this category.</h3>
                        </div>
                    ) : (
                        <div className="row properties-box g-4">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="col-lg-4 col-md-6"
                                    data-aos="fade-up"
                                >
                                    <div className="property-card h-100">
                                        <div className="img-container position-relative">
                                            <img
                                                // Dynamic Image from API
                                                src={project.thumbnail_image || project.image || '/assets/images/default-project.jpg'}
                                                alt={project.title}
                                                className="w-100 h-100"
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div className="card-overlay">
                                            <div className="overlay-logo text-center">
                                                <div className="position-relative d-inline-block">
                                                    <div className="logo-icon badge-gradient shadow-lg">
                                                        <img
                                                            src="/assets/images/logo.png"
                                                            alt="Arock Logo"
                                                            className="logo-img-small"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Dynamic Link to Details Page */}
                                            <Link to={`/property-details/${project.slug || project.id}`} className="overlay-btn">
                                                View Project
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {projects.length > 0 && (
                        <div className="row mt-5">
                            <div className="col-lg-12">
                                <ul className="pagination justify-content-center list-unstyled d-flex gap-2">
                                    {currentPage > 1 && (
                                        <li>
                                            <a
                                                href="#!"
                                                onClick={(e) => { e.preventDefault(); setCurrentPage(currentPage - 1); }}
                                            >
                                                &laquo; Prev
                                            </a>
                                        </li>
                                    )}

                                    {[...Array(lastPage)].map((_, index) => {
                                        const page = index + 1;
                                        // Show only limited page numbers if needed, or all
                                        if (page === 1 || page === lastPage || (page >= currentPage - 1 && page <= currentPage + 1)) {
                                            return (
                                                <li key={page}>
                                                    <a
                                                        href="#!"
                                                        className={currentPage === page ? 'is_active' : ''}
                                                        onClick={(e) => { e.preventDefault(); setCurrentPage(page); }}
                                                    >
                                                        {page}
                                                    </a>
                                                </li>
                                            );
                                        }
                                        return null;
                                    })}

                                    {currentPage < lastPage && (
                                        <li>
                                            <a
                                                href="#!"
                                                onClick={(e) => { e.preventDefault(); setCurrentPage(currentPage + 1); }}
                                            >
                                                &raquo;
                                            </a>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Project;