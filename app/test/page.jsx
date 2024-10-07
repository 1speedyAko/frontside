'use client';

import { useState } from 'react';
import payload from '../test/payload.json'; // Adjust the path based on your directory structure
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import {useRouter} from 'next/navigation'

const SubscriptionPlans = () => {
  const [plans] = useState(payload.plans); // Directly set plans from the JSON file
  const [selectedPlan, setSelectedPlan] = useState(null); // Track the selected plan
  const [selectedCoin, setSelectedCoin] = useState(null); // Track the selected coin
  const [openDropdown, setOpenDropdown] = useState(false); // Manage dropdown visibility
  const router = useRouter()

  const coins = ['USDC', 'LTC'];

  const handleSubscription = async (plan) => {
    try {
      const payload = {
        amount: plan.price,
        currency: plan.currency,
        buyer_email: 'user@example.com', // Replace with dynamic user email if needed
        subscription_plan: plan.category,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/subscriptions/create/${plan.category}/`, // Adjust the API path
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (data.payment_url) {
        window.location.href = data.payment_url; // Redirect to payment URL if provided
      } else {
        alert('Failed to initiate payment.');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('An error occurred.');
    }
  };

  const handleJoinNow = (plan) => {
    setSelectedPlan(plan); // Set the selected plan
    setOpenDropdown(!openDropdown); // Toggle dropdown visibility
  };

  const handleCoinSelection = (coin) => {
    setSelectedCoin(coin);
    setOpenDropdown(false); // Close the dropdown after selection
    router.push(`/details?plan=${selectedPlan.category}&coin=${coin}&price=${selectedPlan.price}`);
    // router.push("/details");

    // Here, you can now proceed to the next step, such as redirecting to a details page
    console.log(`Selected Plan: ${selectedPlan.category}, Coin: ${coin}`);
  };

  return (
    <div className="relative max-w-7xl mx-auto p-4 bg-ebony min-h-screen ">
      <h2 className="text-3xl font-bold prime text-center mb-8">Choose Your Subscription Plan</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {plans.map((plan) => (
          <div 
            key={plan.category} 
            className="relative p-6 bg-ebony shadow-md rounded-lg border border-gray-400"
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
