'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Spinner from '@/app/spinner/page';

export default function PlanPaymentPage({ params }) {
  const { plan_name } = params;
  const [loading, setLoading] = useState(False)
  const router = useRouter();

  useEffect(() => {
    const initiatePayment = async () => {
      try {
        const token = localStorage.getItem('access');
        
        const response = await axios.post(`/api/subscriptions/${plan_name}/`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

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
      }
    };

    initiatePayment();
  }, [plan_name, router]);

    return {
      if (loading) {
        return <Spinner/>
    }
  }
}
