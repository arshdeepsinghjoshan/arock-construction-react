import React, { useEffect } from 'react';
import './Portfolio.css'; // Import the custom styles for this page

const Portfolio = () => {
    // If you need to refresh AOS or isotope when component mounts
    // useEffect(() => {
    //     if (window.AOS) {
    //         window.AOS.refresh();
    //     }
    // }, []);

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

            {/* Properties Section */}
            <div className="section properties">
                <div className="container">
                    <ul className="properties-filter">
                        <li>
                            <a className="is_active" href="#!" data-filter="*">Show All</a>
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
                    
                    <div className="row properties-box">
                        {/* Property 1 */}
                        <div className="col-lg-4 col-md-6 align-self-center mb-30 properties-items col-md-6 adv">
                            <div className="item">
                                <a href="/property-details">
                                    <img src="/assets/images/property-01.jpg" alt="Property 1" />
                                </a>
                                <span className="category">Luxury Villa</span>
                                <h4>
                                    <a href="/property-details">18 Old Street Miami, OR 97219</a>
                                </h4>
                                <ul className="property-info">
                                    <li><i className="fa fa-bed"></i> Bedrooms: <span>8</span></li>
                                    <li><i className="fa fa-bath"></i> Bathrooms: <span>8</span></li>
                                    <li><i className="fa fa-vector-square"></i> Total Floor Area: <span>545m2</span></li>
                                    <li><i className="fa fa-building"></i> Floor: <span>3</span></li>
                                    <li><i className="fa fa-car"></i> Parking: <span>6 spots</span></li>
                                </ul>
                                <div className="property-hover-btn">
                                    <a href="/property-details">View Details</a>
                                </div>
                            </div>
                        </div>


                        {/* Property 3 */}
                        <div className="col-lg-4 col-md-6 align-self-center mb-30 properties-items col-md-6 adv rac">
                            <div className="item">
                                <a href="/property-details">
                                    <img src="/assets/images/property-03.jpg" alt="Property 3" />
                                </a>
                                <span className="category">Luxury Villa</span>
                                <h4>
                                    <a href="/property-details">26 Mid Street Portland, OR 38540</a>
                                </h4>
                                <ul className="property-info">
                                    <li><i className="fa fa-bed"></i> Bedrooms: <span>5</span></li>
                                    <li><i className="fa fa-bath"></i> Bathrooms: <span>4</span></li>
                                    <li><i className="fa fa-vector-square"></i> Total Floor Area: <span>225m2</span></li>
                                    <li><i className="fa fa-building"></i> Floor: <span>3</span></li>
                                    <li><i className="fa fa-car"></i> Parking: <span>10 spots</span></li>
                                </ul>
                                <div className="property-hover-btn">
                                    <a href="/property-details">View Details</a>
                                </div>
                            </div>
                        </div>

                        {/* Property 4 */}
                        <div className="col-lg-4 col-md-6 align-self-center mb-30 properties-items col-md-6 str">
                            <div className="item">
                                <a href="/property-details">
                                    <img src="/assets/images/property-04.jpg" alt="Property 4" />
                                </a>
                                <span className="category">Apartment</span>
                                <h4>
                                    <a href="/property-details">12 Hope Street Portland, OR 12650</a>
                                </h4>
                                <ul className="property-info">
                                    <li><i className="fa fa-bed"></i> Bedrooms: <span>4</span></li>
                                    <li><i className="fa fa-bath"></i> Bathrooms: <span>3</span></li>
                                    <li><i className="fa fa-vector-square"></i> Total Floor Area: <span>125m2</span></li>
                                    <li><i className="fa fa-building"></i> Floor: <span>25th</span></li>
                                    <li><i className="fa fa-car"></i> Parking: <span>2 cars</span></li>
                                </ul>
                                <div className="property-hover-btn">
                                    <a href="/property-details">View Details</a>
                                </div>
                            </div>
                        </div>


                        {/* Property 6 */}
                        <div className="col-lg-4 col-md-6 align-self-center mb-30 properties-items col-md-6 rac adv">
                            <div className="item">
                                <a href="/property-details">
                                    <img src="/assets/images/property-06.jpg" alt="Property 6" />
                                </a>
                                <span className="category">Modern Condo</span>
                                <h4>
                                    <a href="/property-details">22 Hope Street Portland, OR 16540</a>
                                </h4>
                                <ul className="property-info">
                                    <li><i className="fa fa-bed"></i> Bedrooms: <span>3</span></li>
                                    <li><i className="fa fa-bath"></i> Bathrooms: <span>2</span></li>
                                    <li><i className="fa fa-vector-square"></i> Total Floor Area: <span>165m2</span></li>
                                    <li><i className="fa fa-building"></i> Floor: <span>26th</span></li>
                                    <li><i className="fa fa-car"></i> Parking: <span>3 cars</span></li>
                                </ul>
                                <div className="property-hover-btn">
                                    <a href="/property-details">View Details</a>
                                </div>
                            </div>
                        </div>

                        {/* Property 7 */}
                        <div className="col-lg-4 col-md-6 align-self-center mb-30 properties-items col-md-6 rac str">
                            <div className="item">
                                <a href="/property-details">
                                    <img src="/assets/images/property-03.jpg" alt="Property 7" />
                                </a>
                                <span className="category">Luxury Villa</span>
                                <h4>
                                    <a href="/property-details">14 Mid Street Miami, OR 36450</a>
                                </h4>
                                <ul className="property-info">
                                    <li><i className="fa fa-bed"></i> Bedrooms: <span>8</span></li>
                                    <li><i className="fa fa-bath"></i> Bathrooms: <span>8</span></li>
                                    <li><i className="fa fa-vector-square"></i> Total Floor Area: <span>550m2</span></li>
                                    <li><i className="fa fa-building"></i> Floor: <span>3</span></li>
                                    <li><i className="fa fa-car"></i> Parking: <span>12 spots</span></li>
                                </ul>
                                <div className="property-hover-btn">
                                    <a href="/property-details">View Details</a>
                                </div>
                            </div>
                        </div>

                     

                        {/* Property 9 */}
                        <div className="col-lg-4 col-md-6 align-self-center mb-30 properties-items col-md-6 rac adv">
                            <div className="item">
                                <a href="/property-details">
                                    <img src="/assets/images/property-01.jpg" alt="Property 9" />
                                </a>
                                <span className="category">Luxury Villa</span>
                                <h4>
                                    <a href="/property-details">34 New Street Miami, OR 24650</a>
                                </h4>
                                <ul className="property-info">
                                    <li><i className="fa fa-bed"></i> Bedrooms: <span>10</span></li>
                                    <li><i className="fa fa-bath"></i> Bathrooms: <span>12</span></li>
                                    <li><i className="fa fa-vector-square"></i> Total Floor Area: <span>860m2</span></li>
                                    <li><i className="fa fa-building"></i> Floor: <span>3</span></li>
                                    <li><i className="fa fa-car"></i> Parking: <span>10 spots</span></li>
                                </ul>
                                <div className="property-hover-btn">
                                    <a href="/property-details">View Details</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="row">
                        <div className="col-lg-12">
                            <ul className="pagination">
                                <li><a href="#!">1</a></li>
                                <li><a className="is_active" href="#!">2</a></li>
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

export default Portfolio;