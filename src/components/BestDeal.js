import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

// 1. Skeleton Component for Categories (Tabs)
const CategorySkeleton = () => {
    return (
        <div className="nav-wrapper">
            <ul className="nav nav-tabs" role="tablist">
                {[1, 2, 3].map((i) => (
                    <li className="nav-item" key={i}>
                        <button className="nav-link disabled" type="button">
                            <div className="skeleton" style={{ width: '80px', height: '16px' }}></div>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// 2. Skeleton Component for Project Content
const ProjectSkeleton = () => {
    return (
        <div className="row">
            {/* Left Column Skeleton */}
            <div className="col-lg-3">
                <div className="info-table">
                    <ul>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <li key={i} className="mb-2">
                                <div className="skeleton" style={{ width: '100%', height: '15px' }}></div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Middle Column Skeleton (Image) */}
            <div className="col-lg-6">
                <div className="skeleton" style={{ width: '100%', height: '300px', borderRadius: '8px' }}></div>
            </div>

            {/* Right Column Skeleton */}
            <div className="col-lg-3">
                <div className="skeleton" style={{ width: '70%', height: '24px', marginBottom: '10px' }}></div>
                <div className="skeleton" style={{ width: '100%', height: '15px', marginBottom: '5px' }}></div>
                <div className="skeleton" style={{ width: '90%', height: '15px', marginBottom: '5px' }}></div>
                <div className="skeleton" style={{ width: '80%', height: '15px', marginBottom: '20px' }}></div>
                <div className="skeleton" style={{ width: '100%', height: '40px' }}></div>
            </div>
        </div>
    );
};

// --- API Functions ---

const fetchCategories = async () => {
    const res = await api.get('/project-categories');
    return res.data.data;
};

const fetchProjects = async ({ queryKey }) => {
    const [_key, page, categoryId] = queryKey;
    
    let url = `/projects?state_id=1&page=${page}&per_page=1`;
    if (categoryId) {
        url += `&category_id=${categoryId}`; // Change to category_key if needed
    }

    const res = await api.get(url);
    return res.data.data;
};

const BestDeal = () => {
    const [activeCategoryId, setActiveCategoryId] = useState(null);

    // Fetch Categories
    const { data: categories = [], isLoading: catLoading } = useQuery({
        queryKey: ['project-categories'],
        queryFn: fetchCategories,
    });

    // Fetch Projects
    const { data: projectsData, isLoading: projLoading, error } = useQuery({
        queryKey: ['best-deals', 1, activeCategoryId],
        queryFn: fetchProjects,
        enabled: !!categories,
    });

    const project = projectsData?.data?.[0];
    const lastPage = projectsData?.last_page || 1;

    // Set default category
    useEffect(() => {
        if (categories.length > 0 && activeCategoryId === null) {
            setActiveCategoryId(categories[0].id);
        }
    }, [categories, activeCategoryId]);

    return (
        <div className="best-deal">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="section-heading">
                            <h6>| Best Deal</h6>
                            <h2>Find Your Best Deal Right Now!</h2>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="tabs-content">
                            <div className="row">
                                {/* --- CATEGORY TABS --- */}
                                {catLoading ? (
                                    <CategorySkeleton />
                                ) : (
                                    <div className="nav-wrapper">
                                        <ul className="nav nav-tabs" role="tablist">
                                            {categories.map((cat) => (
                                                <li className="nav-item" key={cat.id}>
                                                    <button
                                                        className={`nav-link ${activeCategoryId === cat.id ? 'active' : ''}`}
                                                        onClick={() => setActiveCategoryId(cat.id)}
                                                        type="button"
                                                        role="tab"
                                                    >
                                                        {cat.name}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* --- PROJECT CONTENT --- */}
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active">
                                        {projLoading ? (
                                            <ProjectSkeleton />
                                        ) : error ? (
                                            <div className="alert alert-danger text-center py-4">
                                                Error loading project details.
                                            </div>
                                        ) : project ? (
                                            <div className="row">
                                                <div className="col-lg-3">
                                                    <div className="info-table">
                                                        <ul>
                                                            <li>Total Flat Space <span>{project.features?.total_area || '-'}</span></li>
                                                            <li>Floor number <span>{project.features?.floor || '-'}</span></li>
                                                            <li>Number of rooms <span>{project.features?.bedrooms || '-'}</span></li>
                                                            <li>Parking Available <span>{project.features?.parking || 'No'}</span></li>
                                                            <li>Payment Process <span>Bank</span></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <img 
                                                        src={project.thumbnail_image || '/assets/images/default-deal.jpg'} 
                                                        alt={project.title} 
                                                        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                                                    />
                                                </div>
                                                <div className="col-lg-3">
                                                    <h4>{project.title}</h4>
                                                    <p>{project.short_description || 'No description available.'}</p>
                                                    <br />
                                                    <div className="icon-button">
                                                        <Link to={`/property-details/${project.slug}`}>
                                                            <i className="fa fa-calendar"></i> Schedule a visit
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-5">
                                                <h4>No project found in this category.</h4>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pagination (Optional) */}
                {project && lastPage > 1 && (
                    <div className="row mt-4">
                        <div className="col-lg-12 text-center">
                            <div className="pagination d-inline-flex gap-2">
                                <button className="btn btn-outline-primary" disabled>&laquo; Previous</button>
                                <span className="btn btn-light disabled">Page 1 of {lastPage}</span>
                                <button className="btn btn-outline-primary" disabled>Next &raquo;</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BestDeal;