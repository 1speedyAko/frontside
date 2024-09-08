'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import {CircularProgress} from "@nextui-org/react";

const API_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = localStorage.getItem('access');
        if (!accessToken) {
          setIsAuthenticated(false);
          return;
        }

        const response = await axios.get(`${API_URL}/auth/users/me/`, {
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
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex items-center flex-shrink-0 mr-6">
          <Link href="/" legacyBehavior>
            <a className="flex text-2xl font-bold text-gold mt-10 mx-2">Predictorious <span className='secondary'> zone</span></a>
          </Link>
        </div>
        <div className="block lg:hidden text-xl">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center px-3 py-2 border rounded text-gray-700 border-gray-200 hover:text-blue-500 hover:border-gray-900"
          >
            <svg className="fill-current h-3 w-3 text-gold " viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z" />
            </svg>
          </button>
        </div>
        <div
          className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
            isMenuOpen ? 'block' : 'hidden'
          } lg:block`}
        >
          {isAuthenticated ? (
            <div className="text-sm lg:flex-grow">
              <p className="block mt-4 lg:inline-block lg:mt-0 text-gray-700 text-xl">Hello, {user ? user.email : 'User'}!</p>
              <button
                onClick={handleLogout}
                className="btn mt-4 lg:mt-0 bg-red-500 text-white p-2 rounded text-xl"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="text-sm lg:flex-grow lg:flex lg:justify-end">
              <div className="block lg:hidden bg-ebony absolute right-0 mr-6 mt-2 py-2 rounded  border-gray-200 hover:text-blue-500 hover:border-gray-900 shadow-lg">
                <Link href="/login" legacyBehavior>
                  <a className="block text-blue-500 px-4 py-2 mt-2 text-xl hover:bg-gray-200">Sign In</a>
                </Link>
                <Link href="/register" legacyBehavior>
                  <a className="block text-blue-500 px-4 py-2 mt-2 text-xl hover:bg-gray-200">Sign Up</a>
                </Link>
              </div>
              <div className="hidden lg:block">
                <Link href="/login" legacyBehavior >
                  <a className="btn  mr-4 mt-4 lg:mt-0 border-indigo-600 border-4  p-2 rounded text-xl hover:bg-gray-200">
                    Sign In
                  </a>
                </Link>
                <Link href="/register" legacyBehavior >
                  <a className="btn mt-4 lg:mt-0 border-indigo-600  border-4  p-2 rounded text-xl hover:bg-gray-200">
                    Sign Up
                  </a>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
