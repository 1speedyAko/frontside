import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth'; // Example auth hook to get the token

export default function SubscriptionButton({ plan }) {
  const router = useRouter();
  const { token } = useAuth(); // Assuming you have a custom hook that provides the JWT token

  const handleSubscription = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/api/subscriptions/create/${plan.category}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.payment_url) {
        window.location.href = response.data.payment_url;  // Redirect to payment URL
      } else {
        alert('Failed to initiate payment.');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('An error occurred.');
    }
  };

  return (
    <button
      className="bg-indigo-600 text-white py-2 px-4 rounded-lg mt-4"
      onClick={handleSubscription}
    >
      Subscribe
    </button>
  );
}
