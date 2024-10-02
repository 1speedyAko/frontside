'use client'
import { useState } from 'react';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';

const PaymentPage = () => {
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [open, setIsopen]  = useState(false);
  
  const coins = ['USDC', 'LTC'];

  const handleCoinSelection = (coin) => {
    setSelectedCoin(coin);
    // Trigger API call to backend to get payment details
    // getPaymentDetails(coin);
  };

  return (
    <div className='relative bg-ebony h-screen flex justify-center font-bold prime w-[340px] h-[340px] rounded-lg'>
      <button 
        onClick={() => setIsopen((prev) => !prev)} 
        className='bg-indigo-600 h-10 rounded w-[200px] mt-20 p-2 flex items-center tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white'
      >
        Select Coin
        {!open ? (
          <AiOutlineCaretDown className='h-8 ml-auto' />
        ) : (
          <AiOutlineCaretUp className='h-8 ml-auto' /> 
        )}
      </button>
      
      {open && (
        <div className='absolute bg-indigo-600 mt-[130px] rounded w-[200px] p-2'>
          {coins.map((coin, index) => (
            <div 
              key={index} 
              onClick={() => handleCoinSelection(coin)} 
              className='cursor-pointer hover:bg-indigo-800 p-2 rounded transition-colors duration-200 mb-2'
            >
              <h3>{coin}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
