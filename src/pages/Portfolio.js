import React, { useState } from 'react';
import api from '../utils/api';
import './Portfolio.css';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const fetchProjects = async ({ queryKey }) => {
    const [_key, page, filter] = queryKey;

    let url = `/projects?state_id=1&page=${page}`;
    if (filter !== '*') url += `&category_id=${filter}`;

    const res = await api.get(url);
    return res.data.data;
};

const fetchCategories = async () => {
    const res = await api.get('/project-categories');
    return res.data.data;
};

const PortfolioSkeleton = () => {
    return (
        <div className="row properties-box g-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="col-lg-4 col-md-6 mb-30">
                    <div className="skeleton skeleton-card" style={{ height: '300px', borderRadius: '8px' }}></div>
                    <div className="skeleton skeleton-title mt-2" style={{ height: '20px', width: '70%' }}></div>
                    <div className="skeleton skeleton-text mt-1" style={{ height: '15px', width: '50%' }}></div>
                </div>
            ))}
        </div>
    );
};

const Portfolio = () => {
    const [activeFilter, setActiveFilter] = useState('*');
    const [currentPage, setCurrentPage] = useState(1);
    const [loadFailed, setLoadFailed] = useState(false);

    // Categories
    const { data: categories = [], isLoading: categoriesLoading, error: categoriesError } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
        staleTime: 10 * 60 * 1000,
    });

    // Projects
    const { data: projectsData, isLoading, error } = useQuery({
        queryKey: ['portfolio', currentPage, activeFilter],
        queryFn: fetchProjects,
        keepPreviousData: true,
    });

    const projects = projectsData?.data || [];
    const lastPage = projectsData?.last_page || 1;

    // Set timeout for failed load
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
            <section className="about-hero">
                <img src="/assets/images/Portfolio.JPG" alt="Portfolio" className="hero-bg" />
                <div className="container text-center text-white">
                    <h1 className="fw-bold mb-3 display-5 display-md-4 display-lg-3" data-aos="fade-up">Portfolio</h1>
                    <nav aria-label="breadcrumb" data-aos="fade-up" data-aos-delay="300">
                        <ol className="breadcrumb justify-content-center">
                            <li className="breadcrumb-item"><a href="/" className="text-white text-decoration-none">Home</a></li>
                            <li className="breadcrumb-item active text-white-50" aria-current="page">Portfolio</li>
                        </ol>
                    </nav>
                </div>
            </section>

            <div className="section properties">
                <div className="container">

                    {/* ERROR or No Data */}
                    {(loadFailed || error) && (
                        <section
                            style={{
                                minHeight: '50vh',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <h2 className="text-danger mb-2">Failed to load projects 😔</h2>
                            <p>Please try again later.</p>
                        </section>
                    )}

                    {/* FILTER */}
                    <ul className="properties-filter">
                        <li>
                            <a
                                className={activeFilter === '*' ? 'is_active' : ''}
                                onClick={() => setActiveFilter('*')}
                            >
                                Show All
                            </a>
                        </li>

                        {categories.map(cat => (
                            <li key={cat.id}>
                                <a
                                    className={activeFilter === cat.id ? 'is_active' : ''}
                                    onClick={() => setActiveFilter(cat.id)}
                                >
                                    {cat.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* CONTENT */}
                    {isLoading && !loadFailed ? (
                        <PortfolioSkeleton />
                    ) : projects.length === 0 ? (
                        <section
                            style={{
                                minHeight: '50vh',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <h2 className="text-muted mb-2">No projects found 😔</h2>
                            <p>Try changing the filter or check back later.</p>
                        </section>
                    ) : (
                        <div className="row properties-box">
                            {projects.map(item => (
                                <div
                                    key={item.id}
                                    className={`col-lg-4 col-md-6 align-self-center mb-30 properties-items ${item.category_id}`}
                                >
                                    <div className="item">
                                        <div
                                            className="img-container position-relative"
                                            style={{ height: '250px', width: '100%', overflow: 'hidden' }}
                                        >
                                            <img
                                                src={item.thumbnail_image}
                                                alt={item.title}
                                                loading="lazy"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover', // makes image fill container
                                                    objectPosition: 'center', // optional: center the image
                                                }}
                                            />
                                        </div>

                                        <span className="category">{item?.category?.name}</span>
                                        <h4>
                                            <Link to={`/property-details/${item.slug}`}>
                                                {item.title}
                                            </Link>
                                        </h4>
                                        <ul className="property-info">
                                            <li><i className="fa fa-bed"></i> Bedrooms: <span>{item.features?.bedrooms || '-'}</span></li>
                                            <li><i className="fa fa-bath"></i> Bathrooms: <span>{item.features?.bathrooms || '-'}</span></li>
                                            <li><i className="fa fa-vector-square"></i> Total Floor Area: <span>{item.features?.total_area || '-'}</span></li>
                                            <li><i className="fa fa-building"></i> Floors: <span>{item.features?.floor || '-'}</span></li>
                                            <li><i className="fa fa-car"></i> Garages: <span>{item.features?.garages || '-'}</span></li>
                                        </ul>
                                        <div className="property-hover-btn">
                                            <Link to={`/property-details/${item.slug}`}>View Details</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* PAGINATION */}
                    {projects.length > 0 && (
                        <div className="row">
                            <div className="col-lg-12">
                                <ul className="pagination">
                                    {currentPage > 1 && (
                                        <li>
                                            <a href="#!"
                                                onClick={(e) => { e.preventDefault(); setCurrentPage(currentPage - 1); }}>
                                                &laquo;
                                            </a>
                                        </li>
                                    )}
                                    {[...Array(lastPage)].map((_, index) => {
                                        const page = index + 1;
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
                                    })}
                                    {currentPage < lastPage && (
                                        <li>
                                            <a href="#!"
                                                onClick={(e) => { e.preventDefault(); setCurrentPage(currentPage + 1); }}>
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

export default Portfolio;
