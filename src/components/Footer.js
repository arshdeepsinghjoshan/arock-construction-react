import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3">
      <div className="container">
        <div className="row align-items-start">
          {/* Logo */}
          <div className="col-lg-4 mb-4 text-lg-start text-center">
            <img src="/assets/images/logo.png" alt="Villa Agency Logo" className="mb-3" style={{ width: '150px' }} />
          </div>

          {/* Quick Links - Using Link */}
          <div className="col-6 col-lg-4 mb-4 text-center text-lg-start">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light text-decoration-none d-block py-1">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-light text-decoration-none d-block py-1">
                  About
                </Link>
              </li>

              <li>
                <Link to="/portfolio" className="text-light text-decoration-none d-block py-1">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/project" className="text-light text-decoration-none d-block py-1">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/current-offer" className="text-light text-decoration-none d-block py-1">
                  House And Land Packages
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-light text-decoration-none d-block py-1">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-6 col-lg-4 mb-4 text-center text-lg-start">
            <h5 className="fw-bold mb-3">Contact Us</h5>
            <p className="text-light mb-2"><i className="bi bi-geo-alt-fill me-2"></i>Unit 1/24 Technology Drive Augustine Heights Queensland 4300</p>
            <p className="text-light mb-2"><i className="bi bi-telephone-fill me-2"></i>+61 730776788</p>
            <p className="text-light mb-2"><i className="bi bi-telephone-fill me-2"></i>+61 433271896</p>
            <p className="text-light mb-2"><i className="bi bi-envelope-fill me-2"></i>sales@arockconstruction.com.au</p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="text-center pt-4 border-top border-secondary mt-4">
         <p className="mb-0">
  &copy; {new Date().getFullYear()} Arock Construction Co., Ltd. All rights reserved.
</p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;