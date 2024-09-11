'use client';

import axios from 'axios';
import React, { useCallback, useState, useEffect } from 'react';
import { isTokenExpired, getToken } from '../api/utils/jwtUtils'; // Import JWT functions

// Static fallback data
const CardData = [
  {
    currency: '$',
    price: '49.9',
    description: '/month',
    title: 'Silver',
  },
  {
    currency: '$',
    price: '89.9',
    description: '2 months',
    discount: '9.9',
    title: 'Gold',
  },
  {
    currency: '$',
    price: '129.9',
    description: '3 months',
    discount: '20',
    title: 'Platinum',
  },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Subscriptions = () => {
  const [plans, setPlans] = useState([]);
  const [status, setStatus] = useState(null);
  const [token, setToken] = useState(null);

  // Fetch subscription plans from the backend
  const fetchSubscriptionPlans = useCallback(async (fetchedToken) => {
    try {
      if (!fetchedToken) {
        console.warn('No token provided');
        return;
      }

      console.log('Fetching plans with token:', fetchedToken);
      if (isTokenExpired(fetchedToken)) {
        console.warn('Token is expired');
        return; // Do not proceed if token is expired
      }

      const response = await fetch(`${API_URL}/subscriptions/plans/`, {
        headers: { Authorization: `Bearer ${fetchedToken}` },
      });

      if (!response.ok) {
        console.error('Error fetching plans:', response.statusText);
        return;
      }

      const data = await response.json();
      setPlans(data); // Store the plans in the state
    } catch (error) {
      console.error('Error fetching subscription plans:', error);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedToken = getToken(); // Retrieve token using jwtUtils
  
      if (savedToken && !isTokenExpired(savedToken)) {
        setToken(savedToken); // Save valid token in state
        fetchSubscriptionPlans(savedToken); // Fetch plans when the token is valid
      } else {
        console.warn('Token is missing or expired');
      }
    }
  }, [fetchSubscriptionPlans]);
  
  const checkPaymentStatus = async (paymentData) => {
    try {
      if (!token) {
        console.error('Token is missing');
        return; // Exit if there's no token
      }
  
      if (isTokenExpired(token)) {
        console.warn('Token is expired');
        return; // Exit if the token is expired
      }
  
      console.log(`Using token: ${token}`);
      console.log(`Initiating payment for plan: ${paymentData.plan_name}`);
  
      const response = await axios.post(
        `${API_URL}/subscriptions/create/${paymentData.plan_name}/`,
        {}, // Pass any required data in the body if needed
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token from localStorage
          },
        }
      );
      
      console.log('Payment response:', response.data); // Log the response
      window.location.href = response.data.payment_url;
  
    } catch (error) {
      console.error('Payment initiation failed:', error); // Log the full error
      setStatus({ error: 'Failed to initiate payment' });
      setTimeout(() => {
        setStatus(null);
      }, 3000);
    }
  };
  

  const renderPlans = (plans.length > 0 ? plans : CardData).map((item, index) => (
    <div
      key={index}
      className="relative bg-black p-6 rounded-lg shadow-lg flex flex-col justify-between min-h-[200px]"
    >
      <div className="ml-4">
        <h2 className="text-white text-3xl prime font-bold mb-2">
          {item.category
            ? item.category.charAt(0).toUpperCase() + item.category.slice(1)
            : item.title}
        </h2>
        <p className="absolute text-sm left-8 bottom-25 prime text-gray-400 mb-2">
          {item.currency}
        </p>
        <p className="text-white prime text-2xl mb-2">{item.price}</p>
        <p className="absolute bottom-25 text-gray-400 mb-4">
          {item.description}
        </p>
        {item.discount && (
          <p className="text-red-500">{`Discount: -${item.discount}`}</p>
        )}
      </div>
      <button
        onClick={() =>
          checkPaymentStatus({
            plan_name: item.category ? item.category : item.title,
          })
        }
        className="bg-blue-500 text-center secondary text-black py-2 px-4 rounded-full font-semibold hover:bg-blue-900"
      >
        Join Now
      </button>
    </div>
  ));

  return (
    <div className="min-h-screen flex flex-col items-center bg-ebony p-4">
      <h1 className="text-white text-3xl font-bold primary mb-8">Select a Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl top-8">
        {renderPlans}
      </div>

      {status && (
        <div className="mt-4 p-4 bg-gray-800 text-white rounded-lg">
          {status.error ? <p>Error: {status.error}</p> : <p>Status: {status}</p>}
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
