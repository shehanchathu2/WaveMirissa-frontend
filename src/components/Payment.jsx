import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Payment = ({
  firstname,
  lastname,
  email,
  paymentTitle,
  amount,
  setPaymentSuccess,
  setOrderID,
}) => {
  const [payData, setPayData] = useState(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.payhere.lk/lib/payhere.js';
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  useEffect(() => {
    const fetchHash = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/payhere/hash', {
          params: { amount: parseFloat(amount).toFixed(2) },
        });
        setPayData(res.data);
      } catch (err) {
        console.error('Error fetching payment hash', err);
      }
    };
    fetchHash();
  }, [amount]);

  useEffect(() => {
    if (scriptLoaded && window.payhere) {
      window.payhere.onCompleted = (orderId) => {
        console.log('Payment completed:', orderId);
        setPaymentSuccess(true);
        setOrderID(orderId);
      };

      window.payhere.onDismissed = () => {
        console.log('Payment dismissed');
      };

      window.payhere.onError = (error) => {
        console.error('Payment error:', error);
      };
    }
  }, [scriptLoaded]);

  const pay = () => {
    if (!payData || !scriptLoaded || !window.payhere) {
      console.error('Payment data or script not ready');
      return;
    }

    const payment = {
      sandbox: true,
      merchant_id: '1231066',
      return_url: 'https://www.example.com/success',
      cancel_url: 'https://www.example.com/cancel',
      notify_url: 'https://e3e4-192-248-93-25.ngrok-free.app/auth/notify',
      order_id: payData.orderId,
      items: paymentTitle,
      amount: payData.amount,
      currency: 'LKR',
      hash: payData.hash,
      first_name: firstname,
      last_name: lastname,
      email: email,
      phone: '0765424122',
      address: 'No.1, Galle Road',
      city: 'Colombo',
      country: 'Sri Lanka',
    };

    window.payhere.startPayment(payment);
  };

  return (
    <button
      onClick={pay}
      disabled={!payData || !scriptLoaded}
      className={`w-full py-3 rounded-xl font-medium transition-colors ${
        !payData || !scriptLoaded
          ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      Pay with PayHere
    </button>
  );
};

export default Payment;