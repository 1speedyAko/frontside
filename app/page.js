'use client';

import React from 'react';
import Navbar from '../app/nav/page';
import Body from '../app/body/page';
const HomePage = () => {
  return (
    <div className="relative h-screen w-full bg-ebony">
      <div className="absolute  ">
        
        <div className="absolute  "></div>
      </div>
      <div className="relative z-10">
        <Navbar />
        <div className="container mx-auto p-4">
          <Body/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
