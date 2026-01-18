import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../utils/api'; // Ensure this path is correct
import './CurrentOffer.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

// 1. Function to fetch Categories
const fetchCategories = async () => {
    const res = await api.get('/project-categories');
    return res.data.data;
};

// 2. Function to fetch Projects (with pagination and filtering)
const fetchProjects = async ({ queryKey }) => {
    const [_key, page, filter] = queryKey;

    // Assuming 'state_id=4' means Active/Current Offers (as per your Portfolio example)
    let url = `/projects?state_id=3,4&page=${page}`;
    if (filter !== '*') {
        url += `&category_id=${filter}`;
    }

    const res = await api.get(url);
    return res.data.data; // Returns { data: [...], last_page: 5, current_page: 1 }
};

// 3. Skeleton Loader Component
const OfferSkeleton = () => {
    return (
        <div className="row properties-box">
            {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="col-lg-4 col-md-6 align-self-center mb-30">
                    <div className="skeleton skeleton-card" style={{ height: '400px', borderRadius: '8px' }}></div>
                </div>
            ))}
        </div>
    );
};

const CurrentOffer = () => {
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
        queryKey: ['current-offer-categories'],
        queryFn: fetchCategories,
        staleTime: 10 * 60 * 1000,
    });

    // Fetch Projects
    const { data: projectsData, isLoading, error } = useQuery({
        queryKey: ['current-offers', currentPage, activeFilter],
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
                    alt="Current Offers Arock Construction"
                    className="hero-bg"
                />
                <div className="container text-center text-white">
                    <h1 className="fw-bold mb-3 display-5" data-aos="fade-up">
                        Current Offers - Arock Construction
                    </h1>
                    <nav aria-label="breadcrumb" data-aos="fade-up" data-aos-delay="300">
                        <ol className="breadcrumb justify-content-center">
                            <li className="breadcrumb-item">
                                <Link to="/" className="text-white text-decoration-none">Home</Link>
                            </li>
                            <li className="breadcrumb-item active text-white-50" aria-current="page">Current Offers</li>
                        </ol>
                    </nav>
                </div>
            </section>

            {/* Properties Section */}
            <div className="section properties">
                <div className="container">
                    
                    {/* Error State */}
                    {(loadFailed || error) && (
                        <div className="alert alert-danger text-center my-4">
                            <h4>Failed to load offers.</h4>
                            <p>Please check your connection or try again later.</p>
                        </div>
                    )}

                    {/* Filters - Dynamic from API */}
                    <ul className="properties-filter">
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
                    
                    {/* Content Grid */}
                    {isLoading && !loadFailed ? (
                        <OfferSkeleton />
                    ) : projects.length === 0 ? (
                        <div className="text-center py-5">
                            <h3 className="text-muted">No current offers found in this category.</h3>
                        </div>
                    ) : (
                        <div className="row properties-box">
                            {projects.map((item) => (
                                <div
                                    key={item.id}
                                    className={`col-lg-4 col-md-6 align-self-center mb-30 properties-items ${item.category_id}`}
                                    data-aos="fade-up"
                                >
                                    <div className={`item ${item.state_id === 4 ? 'card-sold' : ''}`}>
                                        {/* Sold Stamp Logic */}
                                        {item.state_id === 4 && (
                                            <div className="sold-stamp">
                                                <span className="sold-stamp-text">Sold Out</span>
                                            </div>
                                        )}

                                        {/* Image & Link */}
                                        <Link to={`/property-details/${item.slug}`}>
                                            <img 
                                                src={item.thumbnail_image || '/assets/images/default-property.jpg'} 
                                                alt={item.title} 
                                            />
                                        </Link>

                                        <span className="category">{item.title}</span>
                                        <h4>
                                            <Link to={`/property-details/${item.slug}`}>
                                                {item.location || item.address || 'Location not specified'}
                                            </Link>
                                        </h4>

                                        {/* Property Info - Dynamic Fields */}
                                         <ul className="property-info">
                                            <li><i className="fa fa-bed"></i> Bedrooms: <span>{item.features?.bedrooms || '-'}</span></li>
                                            <li><i className="fa fa-bath"></i> Bathrooms: <span>{item.features?.bathrooms || '-'}</span></li>
                                            <li><i className="fa fa-vector-square"></i> Total Floor Area: <span>{item.features?.total_area || '-'}</span></li>
                                            <li><i className="fa fa-building"></i> Floor: <span>{item.features?.floor || '-'}</span></li>
                                            <li><i className="fa fa-car"></i> Parking: <span>{item.features?.parking || '-'}</span></li>
                                        </ul>

                                        <div className="property-hover-btn">
                                            <Link to={`/property-details/${item.slug}`}>View Details</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {projects.length > 0 && (
                        <div className="row">
                            <div className="col-lg-12">
                                <ul className="pagination">
                                    {currentPage > 1 && (
                                        <li>
                                            <a 
                                                href="#!" 
                                                onClick={(e) => { e.preventDefault(); setCurrentPage(currentPage - 1); }}
                                            >
                                                &laquo;
                                            </a>
                                        </li>
                                    )}
                                    
                                    {[...Array(lastPage)].map((_, index) => {
                                        const page = index + 1;
                                        // Show limited pages for better UI
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

export default CurrentOffer;