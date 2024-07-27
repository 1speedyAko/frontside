'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ReactTyped } from 'react-typed';
import Spinner from '../spinner/page'; 
import { roboto } from '../_app';

const Body = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a data fetch
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={`${roboto.className} w-full flex flex-col lg:flex-row p-4`}>
      <div className="w-full lg:w-1/2 p-4">
        <p className="text-4xl text-blue-500">
          lorem ipsum{' '}
          <ReactTyped strings={['lorem ipsum dolisad saldnsad jsadksad']} typeSpeed={100} loop />
        </p>
      </div>
      <div className="w-full lg:w-1/2 flex justify-center items-center p-4">
        <Link href="/register" legacyBehavior>
          <a className="bg-blue-500 text-gold py-2 px-4 rounded-lg hover:bg-blue-700">
            Get Started
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Body;
