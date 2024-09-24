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
        const token = localStorage.getItem('access');

        // Correcting the axios post request to include headers in the correct place
        const response = await axios.post(
          `/api/subscriptions/${plan_name}/`, // Make sure the trailing slash matches your backend route
          {}, // Pass an empty object if no body data is required
          {
            headers: {
              Authorization: `Bearer ${token}`, // Properly structured headers
            },
          }
        );

        if (response.data.payment_url) {
          window.location.href = response.data.payment_url;
        } else {
          alert('Failed to initiate payment.');
          router.push('/subscriptions');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while processing your payment.');
        router.push('/subscriptions');
      }
    };

    initiatePayment();
  }, [plan_name, router]);

  return <p>Redirecting to payment...</p>;
}
