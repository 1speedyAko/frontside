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
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={`${roboto.className} w-full flex flex-col lg:flex-row p-4`}>
      <div className="w-full lg:w-1/2 p-4">
      <p className='prime font-bold text-2xl'>
       <ReactTyped strings={['Tired of losing bets ! worry no more...']} typeSpeed={100} loop/>
       </p>
        <p className="text-lg text-blue-500 mt-5">
          Welcome to Predictoriouszone.{' '}
        
        </p>
        
        <p className='secondary mt-5'>
          We analyze and offer 2+ odds for free, upon signup and also offer 10+ odds across all leagues and sports for our premium members.
          Join us to win, its great to win.<br/> <span className='prime text-xl mt-7'>Become great !</span>
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
