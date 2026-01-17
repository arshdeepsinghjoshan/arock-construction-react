  import React, { useState, useEffect } from 'react';
  import { BrowserRouter, Routes, Route } from 'react-router-dom';
  import AOS from 'aos';

  // Components
  import Preloader from './components/Preloader';
  import Header from './components/Header';
  import Footer from './components/Footer';

  // Pages
  import Home from './pages/Home';
  import About from './pages/About';
  import Properties from './pages/Properties';
  import PropertyDetails from './pages/PropertyDetails';
  import Contact from './pages/Contact';
  import Portfolio from './pages/Portfolio';
import CurrentOffer from './pages/CurrentOffer';
import Project from './pages/Project';

  function App() {
    const [loading, setLoading] = useState(true);
    const [animateContent, setAnimateContent] = useState(false);

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

    // Show preloader only on first load
    if (loading) {
      return <Preloader />;
    }

    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home animateContent={animateContent} />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/property-details" element={<PropertyDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/project" element={<Project />} />
            <Route path="/current-offer" element={<CurrentOffer />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }

  export default App;