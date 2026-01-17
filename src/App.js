import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AOS from 'aos';

// Components (NO lazy – always needed)
import Preloader from './components/Preloader';
import Header from './components/Header';
import Footer from './components/Footer';

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
