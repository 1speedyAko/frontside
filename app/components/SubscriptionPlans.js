'use client';

import Link from 'next/link';

const SubscriptionPlans = ({ plans }) => {
  return plans.map((plan) => (
    <div 
      key={plan.category} 
      className="p-6 bg-ebony shadow-md rounded-lg border border-gray-400 hover:prime transition-all duration-300"
    >
      <p className="prime text-2xl">{plan.currency}{plan.price && <p className="text-sm text-gray-300 font-bold">{plan.description}</p>}</p>
      <h3 className="text-xl font-bold prime capitalize">{plan.category} Plan</h3>
      <p className="prime font-bold">{plan.description}</p>
      <div>
        <ul>
          <li className='text-prime text-xl'>{plan.info_1}</li>
          <li className='text-prime text-xl'>{plan.info_2}</li>
        </ul>
      </div>
      {plan.discount && <p className="text-gray-400">Save {plan.currency}{plan.discount}</p>}
      <Link href={`/subscriptions/${plan.category}`}>
        <a className="bg-indigo-600 text-white py-2 px-4 rounded-lg mt-4 inline-block">
          Subscribe
        </a>
      </Link>
    </div>
  ));
};

export default SubscriptionPlans;
