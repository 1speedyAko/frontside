"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SubscriptionPlans from "../components/SubscriptionPlans";
import Spinner from "../spinner/page";
import axios from "axios";

export default function SubscriptionPage() {
  const [plans, setPlans] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSubscriptionPlans = async () => {
      const token = localStorage.getItem("access");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const token = localStorage.getItem('access')
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions/plans/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });

        if (res.status !== 200) {
          throw new Error("Failed to fetch subscription plans");
        }

        setPlans(res.data);
      } catch (error) {
        console.error("Error fetching subscription plans:", error);
        setError(error.response?.data?.error || error.message || "An error occurred while fetching subscription plans.");
      }
    };

    fetchSubscriptionPlans();
  }, [router]);

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!plans) {
    return <Spinner />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-ebony">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl p-4">
        <SubscriptionPlans plans={plans} />
      </div>
    </div>
  );
}
