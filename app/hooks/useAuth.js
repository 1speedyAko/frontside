// Hook to retrieve JWT token from localStorage
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access'); // Assuming token is stored as 'access'
    if (token) {
      setToken(token);
    }
  }, []);

  return { token };
};
