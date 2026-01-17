import React from 'react';

const Hero = ({ animateContent }) => {
  return (
    <section className="position-relative vh-100 overflow-hidden">
      {/* Video */}
      <video autoPlay muted loop playsInline className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover">
        <source src="/assets/videos/hero.mov" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="position-absolute top-0 start-0 w-100 h-100 hero-overlay"></div>

      {/* Content */}
      <div className="container h-100 position-relative z-2">
        <div className="row h-100 align-items-center">
          <div className="col-lg-8 text-white hero-text">
            {/* Heading 1 */}
            <h1
              className={`fw-bold display-1 ${animateContent ? 'animated-text animate fadeInLeft' : 'animated-text'}`}
              data-animation="fadeInLeft"
              data-delay=".8s"
              tabIndex="0"
              style={{ animationDelay: '0.8s' }}
            >
              Welcome To Arock
            </h1>

            {/* Heading 2 */}
            <h3
              className={`fw-bold fs-1 display-2 ${animateContent ? 'animated-text animate fadeInLeft' : 'animated-text'}`}
              data-animation="fadeInLeft"
              data-delay=".9s"
              tabIndex="0"
              style={{ animationDelay: '0.9s' }}
            >
              Find Your Dream Home
            </h3>

            {/* Paragraph */}
            <p
              className={`fs-5 ${animateContent ? 'animated-text animate fadeInLeft' : 'animated-text'}`}
              data-animation="fadeInLeft"
              data-delay="1s"
              tabIndex="0"
              style={{ animationDelay: '1s' }}
            >
              Crafting luxury custom homes in prime locations
            </p>

            {/* Buttons */}
            <div
              className={`mt-4 d-flex flex-column flex-md-row gap-3 ${animateContent ? 'animated-text fadeInRight animate' : 'animated-text'}`}
              data-delay="1.1s"
              style={{ animationDelay: '1.1s' }}
            >
              <a href="/project" className="btn btn-lg btn-col">Display Homes</a>
              <a href="/contact" className="btn btn-lg btn-col">Book An Appointment</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;