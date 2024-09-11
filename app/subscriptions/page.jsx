// app/subscriptions/page.js
import SubscriptionPlans from "../components/SubscriptionPlans";

export default async function SubscriptionPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions/plans/`, {
    headers: {
      'Authorization': `Bearer ${getAccessToken()}`, // Implement getAccessToken accordingly
    },
    cache: 'no-store', // Ensure fresh data
  });

  if (!res.ok) {
    // Handle error
    return <p>Failed to load subscription plans.</p>;
  }

  const plans = await res.json();

  return (
    <div className="flex justify-center items-center min-h-screen bg-ebony">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <SubscriptionPlans plans={plans} />
      </div>
    </div>
  );
}
