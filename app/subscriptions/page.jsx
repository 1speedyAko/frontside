"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SubscriptionPlans from "../components/SubscriptionPlans";

export default function SubscriptionPage() {
  const [plans, setPlans] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch subscription plans when the component mounts
    const fetchSubscriptionPlans = async () => {
      const accessToken = localStorage.getItem("access"); // JWT access token

      // If no token is found, redirect to login
      if (!accessToken) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions/plans/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          cache: "no-store", // Ensure fresh data
        });

        // Handle failed response
        if (!res.ok) {
          throw new Error("Failed to fetch subscription plans");
        }

        // Parse the JSON response
        const data = await res.json();
        setPlans(data);
      } catch (error) {
        // Set an error message
        setError(error.message || "An error occurred while fetching subscription plans.");
      }
    };

    fetchSubscriptionPlans();
  }, [router]); // Depend on the router for redirection

  if (error) {
    return <p>{error}</p>;
  }

  if (!plans) {
    return <p>Loading subscription plans...</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-ebony">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <SubscriptionPlans plans={plans} />
      </div>
    </div>
  );
}
