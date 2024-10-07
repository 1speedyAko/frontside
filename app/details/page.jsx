'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; 
import Spinner from '@/app/spinner/page'; 
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiCopy } from 'react-icons/fi'; 
import { useAuth } from '../hooks/useAuth';  // Assuming you have an auth context for JWT token handling

const PaymentDetails = () => {
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/api/payment-details/?coin=${coin}&plan=${plan}`, {
          headers: {
            'Authorization': `Bearer ${token}`,  // Attach token for authenticated requests
          },
        });

        if (res.ok) {
          const data = await res.json();
          setPaymentData(data);
        } else {
          console.error('Failed to fetch payment details');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPaymentDetails();
  }, [coin, plan, token]);

  if (!paymentData) return <Spinner />;

  return (
    <div className='bg-ebony min-h-screen'>
      <div className="max-w-md mx-auto p-4 bg-gray-900 text-white rounded-md shadow-md pt-[30px]">
        <h2 className="text-2xl font-bold mb-4">Send Your Payment</h2>
        <div className="mb-4">
          <img src={paymentData.qr_code} alt="QR Code" className="w-32 h-32 mx-auto mb-4" />
          <h3 className="text-xl mb-2">{coin}</h3>

          <div className="mb-4">
            <p>Address: {paymentData.address}</p>
            <CopyToClipboard text={paymentData.address} onCopy={() => onCopyText('address')}>
              <button className="flex items-center bg-indigo-600 text-white py-2 px-4 rounded">
                <FiCopy className="mr-2" /> Copy Address
              </button>
            </CopyToClipboard>
            {copyStatus.address && <p className="text-green-500 mt-2">Address copied!</p>}
          </div>

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
