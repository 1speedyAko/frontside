import jwtDecode from "jwt-decode";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Decode the JWT token
export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

// Check if the token is expired
export const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  if (decoded && decoded.exp) {
    const now = Date.now() / 1000; // Current time in seconds
    return decoded.exp < now;
  }
  return true; // Consider expired if no expiry claim
};

// Save the JWT token (both access and refresh tokens)
export const saveToken = (token) => {
  if (token.access && token.refresh) {
    localStorage.setItem('jwtToken', JSON.stringify(token.access));  // Save access token
    saveRefreshToken(token.refresh);  // Save refresh token
  } else if (typeof token === 'string') {
    localStorage.setItem('jwtToken', JSON.stringify(token)); // Save access token when refreshing
  }
};

// Get the token from localStorage
export const getToken = () => {
  const token = localStorage.getItem('jwtToken');
  return token ? JSON.parse(token) : null;
};

// Save refresh token
export const saveRefreshToken = (refreshToken) => {
  localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
};

// Get refresh token
export const getRefreshToken = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  return refreshToken ? JSON.parse(refreshToken) : null;
};

// Remove tokens from localStorage
export const removeTokens = () => {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('refreshToken');
};

// Check token validity and refresh it if needed
export const checkAndRefreshToken = async () => {
  let token = getToken();

  if (token && isTokenExpired(token)) {
    console.warn('Token expired, attempting refresh...');
    token = await refreshAccessToken();
  }

  if (token) {
    return getToken(); // Return the valid token after potential refresh
  }

  console.warn('No valid token available');
  return null;
};

// Refresh access token using refresh token
export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return null; // No refresh token available
  }

  try {
    const response = await axios.post(`${API_URL}/auth/jwt/refresh/`, {
      refresh: refreshToken,  // 'refresh' field for Djoser
    });

    const newAccessToken = response.data.access; // Djoser returns 'access'
    saveToken(newAccessToken); // Save the new token
    return newAccessToken;
  } catch (error) {
    console.error('Failed to refresh access token:', error);
    removeTokens(); // Clear tokens on failure
    return null;
  }
};
