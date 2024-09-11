'use client'

import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import { checkAndRefreshToken } from '../api/utils/jwtUtils';
import Spinner from '../components/Spinner'; // Import the Spinner component

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fallbackPlans = [
  { currency: '$', price: '49.9', description: '/month', title: 'Silver' },
  { currency: '$', price: '89.9', description: '2 months', discount: '9.9', title: 'Gold' },
  { currency: '$', price: '129.9', description: '3 months', discount: '20', title: 'Platinum' },
];

const Subscriptions = () => {
  const [plans, setPlans] = useState([]);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch subscription plans
  const fetchSubscriptionPlans = useCallback(async () => {
    setLoading(true);  // Show loading spinner
    const token = await checkAndRefreshToken();

    if (!token) {
      console.warn('No valid token available');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/subscriptions/plans/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setPlans(response.data);
      }
    } catch (error) {
      console.error('Error fetching subscription plans:', error);
    } finally {
      setLoading(false);  // Stop loading spinner
    }
  }, []);

  useEffect(() => {
    fetchSubscriptionPlans();
  }, [fetchSubscriptionPlans]);

  const handlePayment = async (planName) => {
    const token = await checkAndRefreshToken();

    if (!token) {
      setStatus({ error: 'Token is missing or invalid' });
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/subscriptions/create/${planName}/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        window.location.href = response.data.payment_url; // Redirect to payment URL
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
      setStatus({ error: 'Failed to initiate payment' });
    }
  };

  const renderPlans = (plans.length > 0 ? plans : fallbackPlans).map((plan, index) => (
    <div
      key={index}
      className="relative bg-black p-6 rounded-lg shadow-lg flex flex-col justify-between min-h-[200px]"
    >
      <div className="ml-4">
        <h2 className="text-white text-3xl font-bold mb-2">
          {plan.title}
        </h2>
        <p className="text-white prime text-2xl mb-2">
          {plan.currency}{plan.price}
        </p>
        <p className="text-gray-400 mb-4">
          {plan.description}
        </p>
        {plan.discount && (
          <p className="text-red-500">Discount: -${plan.discount}</p>
        )}
      </div>
      <button
        onClick={() => handlePayment(plan.title)}
        className="bg-blue-500 text-black py-2 px-4 rounded-full font-semibold hover:bg-blue-900"
      >
        Join Now
      </button>
    </div>
  ));

  return (
    <div className="min-h-screen flex flex-col items-center bg-ebony p-4">
      <h1 className="text-white text-3xl font-bold mb-8">Select a Plan</h1>
      
      {loading ? ( 
        <Spinner />  // Correct usage of Spinner component
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {renderPlans}
        </div>
      )}

      {status && (
        <div className="mt-4 p-4 bg-gray-800 text-white rounded-lg">
          {status.error ? <p>Error: {status.error}</p> : <p>Status: {status}</p>}
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
