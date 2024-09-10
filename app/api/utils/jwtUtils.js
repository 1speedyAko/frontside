// jwtUtils.js
import { jwtDecode } from "jwt-decode";

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

// Function to save the JWT token
export const saveToken = (token) => {
  localStorage.setItem('jwtToken', token);
};

// Function to get the token from localStorage
export const getToken = () => {
  return localStorage.getItem('jwtToken');
};

// Function to remove the token from localStorage
export const removeToken = () => {
  localStorage.removeItem('jwtToken');
};
