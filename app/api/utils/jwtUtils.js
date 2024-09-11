import jwtDecode from "jwt-decode"; // Ensure this import is correct without curly braces

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

// Function to save the JWT token as a string
export const saveToken = (token) => {
  localStorage.setItem('jwtToken', String(token)); // Ensure the token is stored as a string
};

// Function to get the token from localStorage and ensure it's a string
export const getToken = () => {
  const token = localStorage.getItem('jwtToken');
  return token ? String(token) : null; // Return token as a string or null if not found
};

// Function to remove the token from localStorage
export const removeToken = () => {
  localStorage.removeItem('jwtToken');
};
