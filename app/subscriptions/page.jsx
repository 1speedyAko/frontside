"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SubscriptionPlans from "../components/SubscriptionPlans";
import Spinner from "../spinner/page";
import axios from "axios";

export default function SubscriptionPage() {
  const [plans, setPlans] = useState(null);
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false); // For checking client-side rendering
  const router = useRouter();

  useEffect(() => {
    // Ensure we are running this code client-side
    setIsClient(true);

    if (isClient) {
      // Fetch subscription plans when the component mounts
      const fetchSubscriptionPlans = async () => {
        const token = localStorage.getItem("access"); // JWT access token

        // If no token is found, redirect to login
        if (!token) {
          router.push("/login");
          return;
        }

        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions/plans/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store", // Ensure fresh data
          });

          // Handle non-200 responses
          if (res.status !== 200) {
            throw new Error("Failed to fetch subscription plans");
          }

          // Set the plans data
          setPlans(res.data);
        } catch (error) {
          // Log and set an error message
          console.error("Error fetching subscription plans:", error);
          setError(error.message || "An error occurred while fetching subscription plans.");
        }
      };

      fetchSubscriptionPlans();
    }
  }, [router, isClient]);

  // Display error if it exists
  if (error) {
    return <p>{error}</p>;
  }

  // Show spinner while data is loading
  if (!plans) {
    return <Spinner />;
  }

  // Render subscription plans
  return (
    <div className="flex justify-center items-center min-h-screen bg-ebony">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <SubscriptionPlans plans={plans} />
      </div>
    </div>
  );
}
