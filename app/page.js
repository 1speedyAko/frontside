'use client';

import React, { useEffect } from 'react';
import Navbar from '../app/nav/page';
import Body from './body/page';
import { checkToken } from './login/authUtils'; // Adjust the path as needed

const HomePage = () => {
  useEffect(() => {
    const validateToken = async () => {
      const token = await checkToken();
      if (!token) {
        // Redirect to login page or show an error
        window.location.href = "/login";
      }
    };

    validateToken();
  }, []);

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
