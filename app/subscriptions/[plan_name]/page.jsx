// app/subscriptions/[plan_name]/page.js
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function PlanPaymentPage({ params }) {
  const { plan_name } = params;
  const router = useRouter();

  useEffect(() => {
    const initiatePayment = async () => {
      try {
        // Retrieve the JWT token from localStorage
        const token = localStorage.getItem('access');

        // Make a request to the server-side API to initiate the payment
        const response = await axios.post(`/api/subscriptions/${plan_name}`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200 && response.data.payment_url) {
          // Redirect user to the checkout page
          window.location.href = response.data.payment_url;
        } else {
          alert('Failed to initiate payment.');
          router.push('/subscriptions'); // Redirect back if payment initiation fails
        }
      } catch (error) {
        console.error('Error initiating payment:', error);
        alert('An error occurred while processing your payment.');
        router.push('/subscriptions'); // Redirect in case of any errors
      }
    };

    initiatePayment();
  }, [plan_name, router]);

  return <p>Redirecting to payment...</p>;
}
