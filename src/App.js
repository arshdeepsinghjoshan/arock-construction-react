import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AOS from 'aos';

// Components (NO lazy – always needed)
import Preloader from './components/Preloader';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './pages/ScrollToTop';

// Pages (LAZY LOAD 🔥)
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const PropertyDetails = lazy(() => import('./pages/PropertyDetails'));
const Contact = lazy(() => import('./pages/Contact'));
const Project = lazy(() => import('./pages/Project'));
const CurrentOffer = lazy(() => import('./pages/CurrentOffer'));

function App() {
  const [loading, setLoading] = useState(true);
  const [animateContent, setAnimateContent] = useState(false);

  // AOS Init + Preloader
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 120,
      easing: 'ease-in-out'
    });

    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        setAnimateContent(true);
      }, 100);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Disable right-click, copy, cut, and select
  // useEffect(() => {
  //   const disableContextMenu = (e) => {
  //     e.preventDefault();
  //     return false;
  //   };

  //   const disableCopy = (e) => {
  //     e.preventDefault();
  //     return false;
  //   };

  //   const disableSelection = (e) => {
  //     e.preventDefault();
  //     return false;
  //   };

  //   const disableKeyboardShortcuts = (e) => {
  //     // Disable Ctrl+C, Ctrl+U, Ctrl+S, F12, Ctrl+Shift+I
  //     if (
  //       (e.ctrlKey && (e.key === 'c' || e.key === 'C')) ||
  //       (e.ctrlKey && (e.key === 'u' || e.key === 'U')) ||
  //       (e.ctrlKey && (e.key === 's' || e.key === 'S')) ||
  //       (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'I')) ||
  //       (e.ctrlKey && e.shiftKey && (e.key === 'j' || e.key === 'J')) ||
  //       (e.ctrlKey && e.shiftKey && (e.key === 'c' || e.key === 'C')) ||
  //       e.key === 'F12'
  //     ) {
  //       e.preventDefault();
  //       return false;
  //     }
  //   };

  //   // Add event listeners
  //   document.addEventListener('contextmenu', disableContextMenu);
  //   document.addEventListener('copy', disableCopy);
  //   document.addEventListener('cut', disableCopy);
  //   document.addEventListener('selectstart', disableSelection);
  //   document.addEventListener('keydown', disableKeyboardShortcuts);

  //   // Cleanup
  //   return () => {
  //     document.removeEventListener('contextmenu', disableContextMenu);
  //     document.removeEventListener('copy', disableCopy);
  //     document.removeEventListener('cut', disableCopy);
  //     document.removeEventListener('selectstart', disableSelection);
  //     document.removeEventListener('keydown', disableKeyboardShortcuts);
  //   };
  // }, []);

  useEffect(() => {
    if (!loading) {
      AOS.refresh();
    }
  }, [loading]);

  // 🔒 First load preloader
  if (loading) {
    return <Preloader />;
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        {/* 👇 Lazy loading fallback */}
         <ScrollToTop />
        <Suspense fallback={<div className="page-loader">Loading...</div>}>
           
          <Routes>
            <Route path="/" element={<Home animateContent={animateContent} />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/property-details/:slug" element={<PropertyDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/project" element={<Project />} />
            <Route path="/current-offer" element={<CurrentOffer />} />
          </Routes>
        </Suspense>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
