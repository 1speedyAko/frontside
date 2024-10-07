'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import { useAuth } from '../hooks/useAuth'; // Assuming this hook provides the JWT token

const fallbackPlans = [
  {
    category: 'Silver',
    price: 10,
    currency: 'USDC',
    description: 'Basic subscription plan.',
    info_1: 'Access to basic content',
    info_2: 'Limited features',
    discount: 1,
  },
  {
    category: 'Gold',
    price: 20,
    currency: 'USDC',
    description: 'Premium subscription plan.',
    info_1: 'Access to all content',
    info_2: 'Exclusive features',
    discount: 2,
  },
  {
    category: 'Platinum',
    price: 30,
    currency: 'USDC',
    description: 'Ultimate subscription plan.',
    info_1: 'All benefits of Gold',
    info_2: 'Priority support',
    discount: 3,
  },
];

const SubscriptionPlans = () => {
  const { token, user } = useAuth(); // Get token and user from custom hook
  const [plans, setPlans] = useState([]); // Store subscription plans
  const [selectedPlan, setSelectedPlan] = useState(null); // Track selected plan
  const [selectedCoin, setSelectedCoin] = useState(null); // Track selected coin
  const [openDropdown, setOpenDropdown] = useState(false); // Manage dropdown visibility
  const router = useRouter();

  const coins = ['USDC', 'LTC']; // Available coin options

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions/plans/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setPlans(response.data); // Set plans from backend
      } catch (error) {
        console.error('Error fetching subscription plans:', error);
        // Fallback to static plans if error occurs
        setPlans(fallbackPlans);
      }
    };

    fetchPlans();
  }, [token]); // Fetch plans when token is available

  const handleJoinNow = (plan) => {
    setSelectedPlan(plan); // Set the selected plan
    setOpenDropdown(!openDropdown); // Toggle dropdown visibility
  };

  const handleCoinSelection = (coin) => {
    setSelectedCoin(coin);
    setOpenDropdown(false); // Close dropdown
    router.push(`/details?plan=${selectedPlan.category}&coin=${coin}&price=${selectedPlan.price}`);
    console.log(`Selected Plan: ${selectedPlan.category}, Coin: ${coin}`);
  };

  const handleSubscription = async (plan) => {
    try {
      const payload = {
        amount: plan.price,
        currency: selectedCoin || plan.currency,
        buyer_email: user.email,
        subscription_plan: plan.category,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/subscriptions/create/${plan.category}/`, // Adjust API path
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.payment_url) {
        window.location.href = response.data.payment_url; // Redirect to payment URL
      } else {
        alert('Failed to initiate payment.');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('An error occurred.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-ebony min-h-screen">
      <h2 className="text-3xl font-bold prime text-center mb-8">Choose Your Subscription Plan</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {plans.map((plan) => (
          <div key={plan.category} className="relative p-6 bg-ebony shadow-md rounded-lg border border-gray-400">
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
                {plan.info_1 && <li className="text-white text-xl">{plan.info_1}</li>}
                {plan.info_2 && <li className="text-white text-xl">{plan.info_2}</li>}
              </ul>
            </div>
            {plan.discount && (
              <p className="text-gray-400 mt-4">Save {plan.currency}{plan.discount}</p>
            )}
            <button
              className="bg-indigo-600 text-white py-2 px-4 rounded-lg mt-4 inline-block border-4 border-transparent active:border-white duration-300 active:text-indigo"
              onClick={() => handleJoinNow(plan)}
            >
              Join now
              {openDropdown && selectedPlan?.category === plan.category ? (
                <AiOutlineCaretUp />
              ) : (
                <AiOutlineCaretDown />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Global Dropdown for Coin Selection */}
      {openDropdown && selectedPlan && (
        <div className="bg-indigo-600 mt-6 rounded w-[200px] p-4 mx-auto">
          <h3 className="text-xl text-white mb-2">Select Coin for {selectedPlan.category}</h3>
          {coins.map((coin, index) => (
            <div
              key={index}
              onClick={() => handleCoinSelection(coin)}
              className="cursor-pointer hover:bg-indigo-800 p-2 rounded transition-colors duration-200 mb-2 text-white"
            >
              {coin}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubscriptionPlans;
