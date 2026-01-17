import React from 'react';

const WhatWeDo = () => {
  return (
    <div className="py-5 bg-light">
      <div className="container">
        {/* Section Heading */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">What We Do</h2>
        </div>

        {/* Row 1 */}
        <div className="row align-items-center g-4 mb-5">
          <div className="col-lg-6" data-aos="fade-up">
            <img src="/assets/images/DifficultSites.JPG" className="img-fluid rounded-4 shadow" alt="" />
          </div>
          <div className="col-lg-6" data-aos="fade-down">
            <h4 className="fw-semibold mb-3">Difficult Sites</h4>
            <p className="text-muted lh-lg">
              Some builders prefer working on simple homes on flat blocks, but we embrace the challenge of complex sites
              with enthusiasm and creativity. Every challenging site presents a unique opportunity to design and construct
              something extraordinary. From design to completion, we ensure the highest standards of craftsmanship and
              quality.
            </p>
          </div>
        </div>

        {/* Row 2 */}
        <div className="row align-items-center g-4 mb-5">
          <div className="col-lg-6 order-2 order-lg-1" data-aos="fade-up">
            <h4 className="fw-semibold mb-3">Residential Design</h4>
            <p className="text-muted lh-lg">
              We create homes, not just houses. Our design process begins with understanding your lifestyle and
              preferences. We carefully review plans with you and visit your site to ensure the final design harmonizes
              with its surroundings and your long-term goals.
            </p>
          </div>
          <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-down">
            <img src="/assets/images/ResidentialDesign.JPG" className="img-fluid rounded-4 shadow" alt="" />
          </div>
        </div>

        {/* Row 3 */}
        <div className="row align-items-center g-4">
          <div className="col-lg-6" data-aos="fade-up">
            <img src="/assets/images/KnockdownRebuild.JPG" className="img-fluid rounded-4 shadow" alt="" />
          </div>
          <div className="col-lg-6" data-aos="fade-down">
            <h4 className="fw-semibold mb-3">Knockdown Rebuild</h4>
            <p className="text-muted lh-lg">
              When your current home no longer suits your lifestyle, a knockdown rebuild offers a cost-effective solution.
              We manage the entire process—from demolition to design and construction—allowing you to stay in the location
              you love while enjoying a brand-new home.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;