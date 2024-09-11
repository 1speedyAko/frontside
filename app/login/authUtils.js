// authUtils.js

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Function to check if the token is expired and refresh it if needed
export const checkToken = async () => {
  const accessToken = localStorage.getItem("access");
  const refreshToken = localStorage.getItem("refresh");

  if (!accessToken) {
    return false; // No token available
  }

  const isExpired = isTokenExpired(accessToken);

  if (isExpired && refreshToken) {
    try {
      const response = await axios.post(`${API_URL}/auth/jwt/refresh/`, {
        refresh: refreshToken,
      });

      const newAccessToken = response.data.access;
      localStorage.setItem("access", newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return false;
    }
  }

  return accessToken; // Return valid or non-expired token
};

// Function to check if the token is expired
const isTokenExpired = (token) => {
  const decoded = jwtDecode(token);
  const now = Date.now() / 1000;
  return decoded.exp < now;
};
