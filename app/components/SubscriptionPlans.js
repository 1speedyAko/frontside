'use client'; 

import Link from 'next/link';

const SubscriptionPlans = ({ plans }) => {
  return plans.map((plan) => (
    <div key={plan.category} className="p-6 bg-ebony shadow-md rounded-lg border-gray-200">
      <h3 className="text-xl font-bold prime">{plan.category} Plan</h3>
      <p className='prime'>{plan.currency}{plan.price} </p>
      <p className='prime font bold'>{plan.description}</p>
      {plan.discount && <p className='primary'>Save {plan.currency}{plan.discount}</p>}
      <Link href={`/subscriptions/${plan.category}`}>
        <a className="bg-indigo-600 text-white py-2 px-4 rounded-lg mt-4 inline-block">
          Subscribe
        </a>
      </Link>
    </div>
  ));
};

export default SubscriptionPlans;
