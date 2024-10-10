'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Spinner from '@/app/spinner/page';

export default function SubscriptionPage({ params }) {
  const { plan_name } = params; 
  const router = useRouter();

  useEffect(() => {
    const createSubscription = async () => {
      try {
        const token = localStorage.getItem('access'); // Get access token
        if (!token) {
          alert('You are not logged in. Please log in to continue.');
          router.push('/login'); // Redirect to login page if no token is found
          return;
        }

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/subscriptions/create/${plan_name}/`, // Update endpoint
          {}, // Empty payload
          {
            headers: {
              'Authorization': `Bearer ${token}`, // Pass the token in the headers
              'Content-Type': 'application/json',
            },
          }
        );

        // Redirect to the payment URL if it exists
        if (response.data.payment_url) {
          window.location.href = response.data.payment_url; // Redirect to Binance payment URL
        } else {
          alert('Failed to initiate payment.'); // Alert user on failure
          router.push('/subscriptions'); // Redirect to subscriptions page
        }
      } catch (error) {
        console.error('Payment initiation error:', error); // Log error for debugging
        alert('An error occurred while processing your payment. Please try again.'); // Alert user on error
        router.push('/subscriptions'); // Redirect to subscriptions page
      }
    };

    createSubscription(); // Call the subscription creation function
  }, [plan_name, router]);

  return <Spinner />; // Show a spinner while loading
}
