'use client'

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
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/subscriptions/create/${plan_name}/`,
          {}, // empty payload
          {
            headers: {
              'Authorization': `Bearer ${token.accessToken}`, // Pass the token in the headers
              'Content-Type': 'application/json',
            },
          }
        );
    

        // Redirect to the payment URL
        if (response.data.payment_url) {
          window.location.href = response.data.payment_url;
        } else {
          alert('Failed to initiate payment.');
          router.push('/subscriptions');
        }
      } catch (error) {
        console.error('Payment initiation error:', error);
        alert('An error occurred while processing your payment.');
        router.push('/subscriptions');
      }
    };

    createSubscription();
  }, [plan_name, router]);

  return <Spinner />;
}
