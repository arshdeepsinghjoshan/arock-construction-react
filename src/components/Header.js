import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Check if current path matches
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.header-area');
      if (window.scrollY > 100) {
        header?.classList.add('header-sticky');
      } else {
        header?.classList.remove('header-sticky');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed-top d-block">
      {/* Sub Header */}
      <div className="sub-header">
        <div className="container-fluid px-5">
          <div className="row">
            <div className="col-lg-8 col-md-8">
              <ul className="info">
                <li><i className="fa fa-envelope"></i><a href="mailto:sales@arockconstruction.com.au"className="text-decoration-none text-reset"> sales@arockconstruction.com.au</a></li>
                <li><i className="fa fa-map"></i> Unit 1/24 Technology Drive Augustine Heights Queensland 4300</li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-4">
              <ul className="social-links">
                <li><a href="https://www.facebook.com/share/1BtHoAWmWR/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a></li>
                {/* <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li> */}
                {/* <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a></li> */}
                <li><a href="https://www.instagram.com/arockconstruction_au?igsh=cW5ncDIwa2hzMnBu&utm_source=qr" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                <li><a href="https://www.tiktok.com/@arock.construction?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Header Area */}
      <header className="header-area header-sticky">
        <div className="container-fluid px-2 px-md-4 px-lg-6">
          <div className="row">
            <div className="col-12">
              <nav className="navbar main-nav navbar-expand-lg">
                {/* Logo */}
                <Link className="navbar-brand" to="/">
                  <img src="/assets/images/logov.png" alt="Logo" className="logo-img p-2" />
                </Link>

                {/* Menu - Using Link instead of <a> */}
                <ul className={`nav ${isMenuOpen ? 'active' : ''}`}>
                  <li>
                    <Link to="/" className={isActive('/')} onClick={closeMenu}>
                      HOME
                    </Link>
                  </li>

                   <li>
                    <Link to="/about" className={isActive('/about')} onClick={closeMenu}>
                      ABOUT
                    </Link>
                  </li>
                  <li>
                    <Link to="/portfolio" className={isActive('/portfolio')} onClick={closeMenu}>
                      PORTFOLIO
                    </Link>
                  </li>
                  <li>
                    <Link to="/project" className={isActive('/project')} onClick={closeMenu}>
                      PROJECTS
                    </Link>
                  </li>

                    <li>
                    <Link to="/current-offer" className={isActive('/current-offer')} onClick={closeMenu}>
                      HOUSE & LAND PACKAGES
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className={`hide-desktop ${isActive('/contact') ? 'active' : ''}`} onClick={closeMenu}>
                      Contact us
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" onClick={closeMenu}>
                      <i className="fa fa-calendar"></i> <span className={isActive('/contact') ? 'active' : ''}>Schedule a visit</span>
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="/contact" className={isActive('/contact')} onClick={closeMenu}>
                      Contact us
                    </Link>
                  </li> */}
                </ul>

                <span className={`menu-trigger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                  <span>Menu</span>
                </span>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;