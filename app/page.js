'use client';

import React from 'react';
import Navbar from '../app/nav/page';
import Body from '../app/body/page';
const HomePage = () => {
  return (
    <div className="relative h-screen w-full">
      <div className="absolute inset-0 ">
        <img
          src="https://th.bing.com/th/id/R.21f1a301c64fa08c773ba79e9dbfb24e?rik=apQpyOLEIExj%2bw&riu=http%3a%2f%2fgamification-research.org%2fwp-content%2fuploads%2f2017%2f11%2fVirtual-Money-768x432.jpg&ehk=FCl0kDQAWkOdqaDmwDqyVv8B0doW2LjaHFRTPSX5x8M%3d&risl=&pid=ImgRaw&r=0"
          alt="Background"
          className="w-full h-full object-cover "
        />
        <div className="absolute inset-0 bg-green-300 opacity-50"></div>
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
