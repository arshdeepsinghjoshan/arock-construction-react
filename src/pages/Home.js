import React from 'react';
import Hero from '../components/Hero';
import WhatWeDo from '../components/WhatWeDo';
import OurProcess from '../components/OurProcess';
import BestDeal from '../components/BestDeal';

const Home = ({ animateContent }) => {
  return (
    <>
      <Hero animateContent={animateContent} />
      <WhatWeDo />
      <OurProcess />
      <BestDeal />
    </>
  );
};

export default Home;