'use client'
import { useState, useEffect } from 'react';
import Spinner from '@/app/spinner/page';

const PaymentDetails = ({ selectedCoin }) => {
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    // Fetch payment details from the backend
    fetch(`/api/create_payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        coin: selectedCoin,
        amount: '100',  // Example amount
        email: 'user@example.com',
        plan: 'Silver Plan'
      })
    })
      .then(res => res.json())
      .then(data => setPaymentData(data));
  }, [selectedCoin]);

  if (!paymentData) return <Spinner/>

  return (
    <div>
      <h2>Send your payment</h2>
      <div>
        <img src={paymentData.qr_code} alt="QR code" />
        <h3>{selectedCoin}</h3>
        <p>Address: {paymentData.address}</p>
        <button onClick={() => navigator.clipboard.writeText(paymentData.address)}>
          Copy Address
        </button>
        <p>Amount: {paymentData.amount}</p>
        <button onClick={() => navigator.clipboard.writeText(paymentData.amount)}>
          Copy Amount
        </button>
      </div>
    </div>
  );
};

export default PaymentDetails;
