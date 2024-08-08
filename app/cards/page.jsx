import React from 'react';
import Link from 'next/link';

const CardData = [
  {
    currency: '$',
    amount: '49.9',
    description: '/month',
    title: 'Silver'
  },
  {
    currency: '$',
    amount: '89.9',
    description: '2 months',
    discount: '$9.9',
    title: 'Gold'
  },
  {
    currency: '$',
    amount: '129.9',
    description: '3 months',
    discount: '$20',
    title: 'Platinum'
  },
];

const CenteredCard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center  bg-ebony p-4">
      <h1 className="text-white text-3xl font-bold primary mb-8">Select a Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl top-8">
        {CardData.map((item, index) => (
          <div key={index} className="relative bg-black p-6 rounded-lg shadow-lg flex flex-col justify-between min-h-[200px]">
            <div className='ml-4'>
              <h2 className="text-white text-3xl prime font-bold mb-2">{item.title}</h2>
              <p className="absolute text-sm left-8 bottom-25 prime text-gray-400 mb-2">{item.currency}</p>
              <p className="text-white prime text-2xl mb-2">{item.amount} </p>
              {/* <p className="text-white prime text-2xl mb-2">{item.discount}</p> */}
              <p className="absolute bottom-25 text-gray-400 mb-4">{item.description}</p>
             
              
              
            </div>
            <Link href="/go-premium" legacyBehavior>
              <a className="bg-blue-500 text-center secondary text-black py-2 px-4 rounded-full font-semibold hover:bg-blue-900">
                Join Now
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CenteredCard;
