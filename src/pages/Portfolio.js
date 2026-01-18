import React, { useState } from 'react';
import api from '../utils/api';
import './Portfolio.css';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const fetchProjects = async ({ queryKey }) => {
    const [_key, page, filter] = queryKey;

    let url = `/projects?page=${page}`;
    if (filter !== '*') url += `&category_id=${filter}`;

    const res = await api.get(url);
    return res.data.data;
};

const fetchCategories = async () => {
    const res = await api.get('/project-categories');
    return res.data.data;
};

const Portfolio = () => {
    const [activeFilter, setActiveFilter] = useState('*');
    const [currentPage, setCurrentPage] = useState(1);

    // Categories
    const {
        data: categories = [],
        isLoading: categoriesLoading,
        error: categoriesError
    } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
        staleTime: 10 * 60 * 1000,
    });

    // Projects
    const {
        data: projectsData,
        isLoading,
        error
    } = useQuery({
        queryKey: ['projects', currentPage, activeFilter],
        queryFn: fetchProjects,
        keepPreviousData: true,
    });

    const projects = projectsData?.data || [];
    const lastPage = projectsData?.last_page || 1;
    return (
        <main>
            <section className="about-hero">
                <img src="/assets/images/w1.JPG" alt="Portfolio" className="hero-bg" />
                <div className="container text-center text-white">
                    <h1 className="fw-bold">Projects Arock Construction</h1>
                </div>
            </section>

            <div className="section properties">
                <div className="container">

                    {/* ERROR */}
                    {error && (
                        <div className="alert alert-danger text-center">
                            {error}
                        </div>
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
                    <div className="row properties-box">
                        {isLoading  ? (
                            <div className="col-12 text-center py-5">
                                <h4>Loading projects...</h4>
                            </div>
                        ) : projects.length === 0 ? (
                            <div className="col-12 text-center py-5">
                                <h4>No projects found!</h4>
                            </div>
                        ) : (
                             projects.map(item => (
                                <div
                                    key={item.id}
                                    className={`col-lg-4 col-md-6 align-self-center mb-30 properties-items ${item.category_id}`}
                                >
                                    <div className="item">
                                        <a href={`/property-details/${item.slug}`}>
                                            <img
                                                src={item.thumbnail_image}
                                                alt={item.title}
                                                loading="lazy"
                                            />
                                        </a>

                                        <span className="category">{item.title}</span>

                                        <h4>
                                            <a href={`/property-details/${item.slug}`}>
                                                {item.title}
                                            </a>
                                        </h4>

                                        <ul className="property-info">
                                            <li><i className="fa fa-bed"></i> Bedrooms: <span>{item.bedrooms}</span></li>
                                            <li><i className="fa fa-bath"></i> Bathrooms: <span>{item.bathrooms}</span></li>
                                            <li><i className="fa fa-vector-square"></i> Total Floor Area: <span>{item.area}</span></li>
                                            <li><i className="fa fa-building"></i> Floor: <span>{item.floor}</span></li>
                                            <li><i className="fa fa-car"></i> Parking: <span>{item.parking}</span></li>
                                        </ul>

                                        <div className="property-hover-btn">
                                                <Link to={`/property-details/${item.slug}`}>View Details</Link>

                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
  {/* PAGINATION */}
                    {projects.length > 0 && (
                        <div className="row">
                            <div className="col-lg-12">
                                <ul className="pagination">
                                    {currentPage > 1 && (
                                        <li>
                                            <a href="#!"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setCurrentPage(currentPage - 1);
                                                }}>
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
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setCurrentPage(page);
                                                    }}
                                                >
                                                    {page}
                                                </a>
                                            </li>
                                        );
                                    })}

                                    {currentPage < lastPage && (
                                        <li>
                                            <a href="#!"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setCurrentPage(currentPage + 1);
                                                }}>
                                                &raquo;
                                            </a>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    )}                </div>
            </div>
        </main>
    );
};

export default Portfolio;
