import React, { useState, useEffect } from 'react';

const Preloader = () => {
  const [showLogo2, setShowLogo2] = useState(false);
  const [shatter, setShatter] = useState(false);

  useEffect(() => {
    // Show second logo after first animation
    const logo2Timer = setTimeout(() => {
      setShowLogo2(true);
    }, 1600);

    // Start shatter animation
    const shatterTimer = setTimeout(() => {
      setShatter(true);
    }, 2800);

    return () => {
      clearTimeout(logo2Timer);
      clearTimeout(shatterTimer);
    };
  }, []);

  return (
    <>
      {/* Old Preloader */}
      <div id="js-preloader" className="js-preloader">
        <div className="preloader-inner">
          <img src="/assets/images/logo1.png" alt="Logo" className="loader-logo" />
        </div>
      </div>

      {/* New Preloader */}
      <section
        id="preloader"
        className={`d-flex flex-column align-items-center justify-content-center position-fixed top-0 start-0 w-100 h-100 preloader-bg ${shatter ? 'shatter-open' : ''}`}
      >
        <img
          src="/assets/images/ALogo.png"
          id="logo1"
          className="img-fluid w-25 zoom-in"
          alt=""
        />

        <img
          src="/assets/images/AROCK.png"
          id="logo2"
          className={`img-fluid w-20 mt-2 mw-369 ${showLogo2 ? 'slide-up' : 'd-none'}`}
          alt=""
        />
      </section>
    </>
  );
};

export default Preloader;