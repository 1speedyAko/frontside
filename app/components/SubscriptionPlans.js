'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth'; // Assuming this hook provides the JWT token



const SubscriptionPlans = ({ plans }) => {
  const { token, user } = useAuth(); // Get the token and user info using the custom hook
  const router = useRouter();

  const handleSubscription = async (plan) => {
    try {
      // Prepare the data to be sent in the request body
      const payload = {
        amount: plan.price,             // Amount for the transaction
        currency: plan.currency,        // The currency being used (e.g., USDC)
        buyer_email: user.email,        // Use the dynamic buyer's email from the user object
        subscription_plan: plan.category // Subscription plan name (e.g., 'platinum')
      };

      // Make a request to your Django backend to create the subscription
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/subscriptions/create/${plan.category}/`, // Adjust the API path
        payload, // Send the payload with dynamic data
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.payment_url) {
        // Redirect to CoinPayments payment URL
        window.location.href = response.data.payment_url;
      } else {
        alert('Failed to initiate payment.');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('An error occurred.');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {plans.map((plan) => (
        <div 
          key={plan.category} 
          className="p-6 bg-ebony shadow-md rounded-lg border border-gray-400 "
        >
          <h3 className="text-xl font-bold prime capitalize">{plan.category}</h3>
          
          <p className="prime text-2xl">
            {plan.currency}{plan.price}
            {plan.description && (
              <span className="text-sm text-gray-300 font-bold block mt-1">
                {plan.description}
              </span>
            )}
          </p>

          <div className="mt-4">
            <ul>
              {plan.info_1 && <li className="text-prime text-xl">{plan.info_1}</li>}
              {plan.info_2 && <li className="text-prime text-xl">{plan.info_2}</li>}
            </ul>
          </div>

          {plan.discount && (
            <p className="text-gray-400 mt-4">Save {plan.currency}{plan.discount}</p>
          )}

          <button
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg mt-4 inline-block"
            onClick={() => handleSubscription(plan)}
          >
            Join now
          </button>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionPlans;
