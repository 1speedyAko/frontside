"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SubscriptionPlans from "../components/SubscriptionPlans";
import Spinner from "../spinner/page";
import axios from 'axios';

export default function SubscriptionPage() {
  const [plans, setPlans] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch subscription plans when the component mounts
    const fetchSubscriptionPlans = async () => {
      const token = localStorage.getItem("access"); // JWT access token
      console.log
      // If no token is found, redirect to login
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions/plans/`, {
          headers: {
            Authorization: `Bearer ${token}`,
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
    return <Spinner/>
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-ebony">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <SubscriptionPlans plans={plans} />
      </div>
    </div>
  );
}
