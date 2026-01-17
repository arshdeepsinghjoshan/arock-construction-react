import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Portfolio.css';

const Portfolio = () => {
    const [projects, setProjects] = useState([]);
    const [activeFilter, setActiveFilter] = useState('*');
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        fetchProjects(1, activeFilter);
    }, []);

    const fetchProjects = async (page = 1, filter = '*') => {
        let url = `http://localhost:8000/api/projects?page=${page}`;

        if (filter !== '*') {
            url += `&category_key=${filter}`;
        }

        const res = await axios.get(url);

        setProjects(res.data.data.data);
        setCurrentPage(res.data.data.current_page);
        setLastPage(res.data.data.last_page);
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
                        <li><a className={activeFilter === '*' ? 'is_active' : ''} onClick={() => changeFilter('*')}>Show All</a></li>
                        <li><a className={activeFilter === 'adv' ? 'is_active' : ''} onClick={() => changeFilter('adv')}>Single Story</a></li>
                        <li><a className={activeFilter === 'str' ? 'is_active' : ''} onClick={() => changeFilter('str')}>Double Story</a></li>
                        <li><a className={activeFilter === 'rac' ? 'is_active' : ''} onClick={() => changeFilter('rac')}>Split Levels</a></li>
                    </ul>

                    {/* CARDS */}
                    <div className="row properties-box">
                        {projects.map(item => (
                            <div
                                key={item.id}
                                className={`col-lg-4 col-md-6 align-self-center mb-30 properties-items ${item.category_key}`}
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
                                        <a href={`/property-details/${item.slug}`}>View Details</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <ul className="pagination">

                                {/* PREV */}
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

                                {/* PAGE NUMBERS */}
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

                                {/* NEXT */}
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


                </div>
            </div>
        </main>
    );
};

export default Portfolio;
