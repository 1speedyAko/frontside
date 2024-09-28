// Hook to retrieve JWT token from localStorage
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken'); // Assuming token is stored as 'accessToken'
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return { token };
};
