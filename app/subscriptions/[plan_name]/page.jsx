'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Spinner from '@/app/spinner/page';

export default function PlanPaymentPage({ params }) {
  const { plan_name } = params;
  const [loading, setLoading] = useState(false); // Corrected 'False' to 'false'
  const router = useRouter();

  useEffect(() => {
    const initiatePayment = async () => {
      setLoading(true); // Start loading spinner

      try {
        const token = localStorage.getItem('access');

        if (!token) {
          alert('Unauthorized access');
          router.push('/login');
          return;
        }

        const response = await axios.post(
          `/api/subscriptions/${plan_name}/`,
          {},
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.data.checkout_url) {
          window.location.href = response.data.checkout_url;
        } else {
          alert('Failed to initiate payment.');
          router.push('/subscriptions');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while processing your payment.');
        router.push('/subscriptions');
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    initiatePayment();
  }, [plan_name, router]);

  // Render Spinner when loading
  if (loading) {
    return <Spinner />;
  }

  // Optionally render some content or placeholder when not loading
  return (
    <div>
      <p>Redirecting to payment...</p>
    </div>
  );
}
