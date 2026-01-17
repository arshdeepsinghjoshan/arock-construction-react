import React from 'react';

const Properties = () => {
  return (
    <div className="properties-page" style={{ marginTop: '120px', minHeight: '80vh' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-heading">
              <h6>| Properties</h6>
              <h2>Find Your Perfect Property</h2>
            </div>
          </div>
        </div>

        {/* Property Cards */}
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card shadow">
              <img src="/assets/images/deal-01.jpg" className="card-img-top" alt="Property" />
              <div className="card-body">
                <h5 className="card-title">Luxury Apartment</h5>
                <p className="card-text">Beautiful 3 bedroom apartment in downtown</p>
                <p className="text-primary fw-bold">$350,000</p>
                <a href="/property-details" className="btn btn-col">View Details</a>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card shadow">
              <img src="/assets/images/deal-02.jpg" className="card-img-top" alt="Property" />
              <div className="card-body">
                <h5 className="card-title">Villa House</h5>
                <p className="card-text">Spacious villa with garden and pool</p>
                <p className="text-primary fw-bold">$750,000</p>
                <a href="/property-details" className="btn btn-col">View Details</a>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card shadow">
              <img src="/assets/images/deal-03.jpg" className="card-img-top" alt="Property" />
              <div className="card-body">
                <h5 className="card-title">Penthouse</h5>
                <p className="card-text">Premium penthouse with city view</p>
                <p className="text-primary fw-bold">$1,200,000</p>
                <a href="/property-details" className="btn btn-col">View Details</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;