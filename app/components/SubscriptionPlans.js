// app/components/SubscriptionPlans.js
'use client'; // If using client-side features

import Link from 'next/link';

const SubscriptionPlans = ({ plans }) => {
  return plans.map((plan) => (
    <div key={plan.category} className="p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-xl font-bold">{plan.category.capitalize()} Plan</h3>
      <p>{plan.currency}{plan.price} {plan.description}</p>
      {plan.discount && <p>Save {plan.currency}{plan.discount}</p>}
      <Link href={`/subscriptions/${plan.category}`}>
        <a className="bg-indigo-600 text-white py-2 px-4 rounded-lg mt-4 inline-block">
          Subscribe
        </a>
      </Link>
    </div>
  ));
};

export default SubscriptionPlans;
