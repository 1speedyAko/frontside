// app/subscriptions/[plan_name]/page.js
'use client'; // If using client-side features

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function PlanPaymentPage({ params }) {
  const { plan_name } = params; // Extracts the dynamic plan name from the URL
  const router = useRouter();

  useEffect(() => {
    const initiatePayment = async () => {
      try {
        const token = localStorage.getItem('access'); // Fetch the access token from local storage

        const response = await axios.post(`/api/subscriptions/${plan_name}`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.data.payment_url) {
          window.location.href = response.data.payment_url; // Redirect to payment URL if payment is initiated
        } else {
          // Handle failure in initiating payment
          alert('Failed to initiate payment.');
          router.push('/subscriptions');
        }
      } catch (error) {
        console.error(error); // Log the error in the console for debugging
        alert('An error occurred while processing your payment.'); // Show an error message to the user
        router.push('/subscriptions'); // Redirect to subscriptions page on failure
      }
    };

    initiatePayment();
  }, [plan_name, router]); // Run the effect when plan_name or router changes

  return <p>Redirecting to payment...</p>; // Display while the redirect is happening
}
