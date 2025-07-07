import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import AddAddressModal from '../components/AddAddressModal ';
import axios from 'axios';


import Payment from '../components/Payment';




const CheckoutPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderID, setOrderID] = useState('');

  const amount = 665.33;

  return (
    <div className="pb-10 bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-center px-10 py-6 mb-3 bg-white border-t border-gray-200">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-800">Checkout</h1>
          <p className="text-sm text-gray-600">You're just one step away from owning something special</p>
        </div>
      </div>
      {/* Content */}
      {/* ... keep your structured checkout UI here ... */}
      {/* Payment Integration */}
      <Payment
        firstname="John"
        lastname="Doe"
        email="john@example.com"
        paymentTitle="Car Luminous Tire Valve Caps"
        amount={amount}
        setPaymentSuccess={setPaymentSuccess}
        setOrderID={setOrderID}
      />
    </div>
  );
};

export default CheckoutPage;