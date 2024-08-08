import axios from 'axios';

const API_URL = 'http://localhost:8000/api';  

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchUserDetails = (token) => api.get('/users/me/', {
  headers: { Authorization: `Bearer ${token}` }
});

export const fetchFreeOdds = (token) => api.get('/games/free-odds/', {
  headers: { Authorization: `Bearer ${token}` }
});

export const fetchPremiumPicks = (token) => api.get('/games/premium-picks/', {
  headers: { Authorization: `Bearer ${token}` }
});
