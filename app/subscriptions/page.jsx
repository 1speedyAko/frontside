// /app/subscriptions/page.jsx

import { headers } from "next/headers";
import { getToken } from "next-auth/jwt";
import SubscriptionPlans from "../components/SubscriptionPlans";

export default async function SubscriptionPage() {
  const reqHeaders = headers();

  const token = await getToken({
    req: {
      headers: {
        get: (name) => reqHeaders.get(name),
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token || !token.accessToken) {
    return <p>You need to be logged in to view subscriptions.</p>;
  }

const accessToken = localStorage.getItem("access");

const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions/plans/`, {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
  },
  cache: 'no-store', // Ensure fresh data
});


  if (!res.ok) {
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
