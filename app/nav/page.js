'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = localStorage.getItem('access');
        if (!accessToken) {
          setIsAuthenticated(false);
          return;
        }

        const response = await axios.get('http://localhost:8000/auth/users/me/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUser(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setIsAuthenticated(false);
    setUser(null);
    router.push('/login');
  };

  return (
    <div className="container  p-4 w-full">
      
      {isAuthenticated ? (
        <div>
          <p className="mt-4">Hello, {user ? user.email : 'User'}!</p>
          <button onClick={handleLogout} className="btn mt-4 bg-red-500 text-white p-2">
            Logout
          </button>
        </div>
      ) : (
        
        <div className=" mt-4">
          
         <div className='flex justify-end'>
        
          <Link href="/login" legacyBehavior>
            <a className="btn mr-4 border-secondary border-4 border-yellow">Sign In</a>
          </Link>
          <Link href="/register" legacyBehavior>
            <a className="btn border-primary border-4 border-yellow">Sign Up</a>
          </Link>
         </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;