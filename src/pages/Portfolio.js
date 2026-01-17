import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Portfolio.css';

const Portfolio = () => {
    const [projects, setProjects] = useState([]);
    const [activeFilter, setActiveFilter] = useState('*');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const res = await axios.get('http://localhost:8000/api/projects');
        setProjects(res.data.data.data);
    };

    const filteredProjects =
        activeFilter === '*'
            ? projects
            : projects.filter(p => p.category_key === activeFilter);

    return (
        <main>

            {/* HERO — SAME */}
            <section className="about-hero">
                <img
                    src="/assets/images/w1.JPG"
                    alt="About Arock Construction"
                    className="hero-bg"
                />
                <div className="container text-center text-white">
                    <h1 className="fw-bold mb-3 display-5 display-md-4 display-lg-3" data-aos="fade-up">
                        Projects Arock Construction
                    </h1>
                    <nav aria-label="breadcrumb" data-aos="fade-up" data-aos-delay="300">
                        <ol className="breadcrumb justify-content-center">
                            <li className="breadcrumb-item">
                                <a href="/" className="text-white text-decoration-none">Home</a>
                            </li>
                            <li className="breadcrumb-item active text-white-50" aria-current="page">Portfolio</li>
                        </ol>
                    </nav>
                </div>
            </section>

            {/* PROPERTIES */}
            <div className="section properties">
                <div className="container">

                    {/* FILTER — SAME UI */}
                    <ul className="properties-filter">
                        <li><a className={activeFilter === '*' ? 'is_active' : ''} onClick={() => setActiveFilter('*')}>Show All</a></li>
                        <li><a className={activeFilter === 'adv' ? 'is_active' : ''} onClick={() => setActiveFilter('adv')}>Single Story</a></li>
                        <li><a className={activeFilter === 'str' ? 'is_active' : ''} onClick={() => setActiveFilter('str')}>Double Story</a></li>
                        <li><a className={activeFilter === 'rac' ? 'is_active' : ''} onClick={() => setActiveFilter('rac')}>Split Levels</a></li>
                    </ul>

                    {/* CARDS — SAME STRUCTURE */}
                    <div className="row properties-box">
                     
                        {filteredProjects.map(item => (
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

                </div>
            </div>
        </main>
    );
};

export default Portfolio;
