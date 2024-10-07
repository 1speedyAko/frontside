'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; // To get query parameters
import Spinner from '@/app/spinner/page'; // Assuming you have a spinner component
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiCopy } from 'react-icons/fi'; // Import copy icon

const PaymentDetails = () => {
  const searchParams = useSearchParams(); // Access the query parameters
  const coin = searchParams.get('coin'); // Get the selected coin
  const plan = searchParams.get('plan'); // Get the selected plan
  const price = searchParams.get('price'); // Get the plan price

  const [paymentData, setPaymentData] = useState(null);
  const [copyStatus, setCopyStatus] = useState({ address: false, amount: false });

  // Copy feedback
  const onCopyText = (field) => {
    setCopyStatus({ ...copyStatus, [field]: true });
    setTimeout(() => setCopyStatus({ ...copyStatus, [field]: false }), 2000);
  };

  useEffect(() => {
    // Simulate an API fetch request to get payment details
    const mockPaymentResponse = {
      qr_code: 'https://via.placeholder.com/150',  // Simulated QR code
      address: '1234ABCDEF5678GHIJKLMNOPQ',       // Simulated wallet address
      amount: price,                             // Use the price passed from the subscription plan
    };

    // Simulate network delay
    setTimeout(() => {
      setPaymentData(mockPaymentResponse);
    }, 2000); // 2 seconds delay to simulate a fetch
  }, [coin, plan, price]);

  // If the payment data hasn't been fetched yet, show a spinner
  if (!paymentData) return <Spinner />;

  return (
    <div className='bg-ebony min-h-screen'>
      <div className="max-w-md mx-auto p-4 bg-gray-900 text-white rounded-md shadow-md pt-[30px]">
        <h2 className="text-2xl font-bold mb-4">Send Your Payment</h2>
        <div className="mb-4">
          <img src={paymentData.qr_code} alt="QR Code" className="w-32 h-32 mx-auto mb-4" />
          <h3 className="text-xl mb-2">{coin}</h3>

          {/* Address Section */}
          <div className="mb-4">
            <p>Address: {paymentData.address}</p>
            <CopyToClipboard text={paymentData.address} onCopy={() => onCopyText('address')}>
              <button className="flex items-center bg-indigo-600 text-white py-2 px-4 rounded">
                <FiCopy className="mr-2" /> Copy Address
              </button>
            </CopyToClipboard>
            {copyStatus.address && <p className="text-green-500 mt-2">Address copied!</p>}
          </div>

          {/* Amount Section */}
          <div>
            <p>Amount: {paymentData.amount}</p>
            <CopyToClipboard text={paymentData.amount} onCopy={() => onCopyText('amount')}>
              <button className="flex items-center bg-indigo-600 text-white py-2 px-4 rounded">
                <FiCopy className="mr-2" /> Copy Amount
              </button>
            </CopyToClipboard>
            {copyStatus.amount && <p className="text-green-500 mt-2">Amount copied!</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
