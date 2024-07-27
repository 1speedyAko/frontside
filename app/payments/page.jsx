'use client'

import axios from 'axios';
import { useState } from 'react';

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [orderId, setOrderId] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const createPayment = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/create-payment', {
        amount: 100,
        currency: 'USD',
        order_id: `order_${Date.now()}`,
        callback_url: 'https://yourdomain.com/api/payment-callback',
      });
      setPaymentUrl(response.data.payment_url);
      setOrderId(response.data.order_id);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const checkPaymentStatus = async () => {
    try {
      const response = await axios.post('/api/check-payment-status', {
        order_id: orderId,
      });
      setPaymentStatus(response.data.status);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Payment Page</h1>
      <button onClick={createPayment} disabled={loading}>
        {loading ? 'Processing...' : 'Pay with Crypto'}
      </button>
      {paymentUrl && (
        <div>
          <a href={paymentUrl}>Complete Payment</a>
          <button onClick={checkPaymentStatus}>Check Payment Status</button>
          {paymentStatus && <p>Status: {paymentStatus}</p>}
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
