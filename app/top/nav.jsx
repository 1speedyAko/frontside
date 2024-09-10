'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;

export default function Nav() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/auth/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        router.push('/login');
      }
    };

    fetchUserDetails();
  }, [router]);

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    router.push('/login');
  };

  return (
    <nav className="flex justify-between items-center bg-blue-600 p-4 w-full rounded">
      <div className="text-white font-semibold">
        {user ? `Welcome, ${user.email}` : 'Welcome, User'}
      </div>
      <button
        onClick={logout}
        className="bg-red-500 text-white py-2 px-4 rounded-lg flex items-center hover:bg-red-600 w-3"
      >
        <span className="mr-2"><i className="fas fa-sign-out-alt w-3"></i></span>
        
      </button>
    </nav>
  );
}
