'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Spinner from '@/app/spinner/page'; 
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiCopy } from 'react-icons/fi'; 
import axios from 'axios';
import { useAuth } from '../hooks/useAuth'; // Assuming you have an auth context for JWT token handling

const PaymentDetailsComponent = () => {
  const searchParams = useSearchParams(); 
  const coin = searchParams.get('coin'); 
  const plan = searchParams.get('plan'); 
  const price = searchParams.get('price'); 

  const [paymentData, setPaymentData] = useState(null);
  const [copyStatus, setCopyStatus] = useState({ address: false, amount: false });
  const { token } = useAuth();  // Assuming you're using JWT and a context for authentication

  const onCopyText = (field) => {
    setCopyStatus({ ...copyStatus, [field]: true });
    setTimeout(() => setCopyStatus({ ...copyStatus, [field]: false }), 2000);
  };

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        // Using Axios to fetch payment details
        const token = localStorage.getItem('access')

        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions/create-subscription/${plan}/`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Pass JWT for authentication
          },
          params: { coin, price },  // Send coin and price as query parameters
        });

        setPaymentData(res.data);
      } catch (error) {
        console.error('Error fetching payment details:', error);
      }
    };

    fetchPaymentDetails();
  }, [coin, plan, price, token]);

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

const PaymentDetails = () => (
  <Suspense fallback={<Spinner />}>
    <PaymentDetailsComponent />
  </Suspense>
);

export default PaymentDetails;
