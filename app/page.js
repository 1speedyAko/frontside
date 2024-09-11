'use client';

import React from 'react';
import Navbar from '../app/nav/page';
import Body from './body/page';


const HomePage = () => {
  

  return (
    <div className="relative h-screen w-full bg-ebony">
      {/* Background and layout container */}
      <div className="relative z-10">
        <Navbar />
        <div className="container mx-auto p-4">
          <Body />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
