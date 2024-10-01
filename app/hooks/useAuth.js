import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch token from localStorage
    const storedToken = localStorage.getItem('access'); // Assuming token is stored under 'access'
    if (storedToken) {
      setToken(storedToken);
      fetchUserData(storedToken);
    } else {
      setLoading(false); // If no token, stop loading
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/users/auth/users/me/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false); // Always stop loading after the request
    }
  };

  return { token, user, loading };
};
