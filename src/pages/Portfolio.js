import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Portfolio.css';
import { Link } from 'react-router-dom';

const Portfolio = () => {
    const [projects, setProjects] = useState([]);
    const [activeFilter, setActiveFilter] = useState('*');
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProjects(1, activeFilter);
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const res = await axios.get('http://localhost:8000/api/project-categories');
        setCategories(res.data.data);
    };

    const fetchProjects = async (page = 1, filter = '*') => {
        setLoading(true);
        let url = `http://localhost:8000/api/projects?page=${page}`;
        if (filter !== '*') {
            url += `&category_id=${filter}`;
        }

        try {
            const res = await axios.get(url);
            setProjects(res.data.data.data);
            setCurrentPage(res.data.data.current_page);
            setLastPage(res.data.data.last_page);
        } catch (err) {
            console.error('Error fetching projects:', err);
            setProjects([]);
            setCurrentPage(1);
            setLastPage(1);
        } finally {
            setLoading(false);
        }
    };

    const changeFilter = (filter) => {
        setActiveFilter(filter);
        fetchProjects(1, filter);
    };

    const changePage = (page) => {
        fetchProjects(page, activeFilter);
    };

    return (
        <main>
            {/* HERO */}
            <section className="about-hero">
                <img src="/assets/images/w1.JPG" alt="Portfolio" className="hero-bg" />
                <div className="container text-center text-white">
                    <h1 className="fw-bold">Projects Arock Construction</h1>
                </div>
            </section>

            {/* PROPERTIES */}
            <div className="section properties">
                <div className="container">

                    {/* FILTER */}
                    <ul className="properties-filter">
                        <li>
                            <a
                                className={activeFilter === '*' ? 'is_active' : ''}
                                onClick={() => changeFilter('*')}
                            >
                                Show All
                            </a>
                        </li>

                        {categories.map(cat => (
                            <li key={cat.id}>
                                <a
                                    className={activeFilter === cat.id ? 'is_active' : ''}
                                    onClick={() => changeFilter(cat.id)}
                                >
                                    {cat.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* CARDS */}
                    <div className="row properties-box">
                        {loading ? (
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
                                                    changePage(currentPage - 1);
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
                                                        changePage(page);
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
                                                    changePage(currentPage + 1);
                                                }}>
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
