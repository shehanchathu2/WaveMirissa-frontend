import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import AddAddressModal from '../components/AddAddressModal ';
import axios from 'axios';

const CheckoutPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [hash, setHash] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const amount = 665.33;

  const generateHash = async (orderId) => {
    try {
      const response = await axios.get('http://localhost:8080/api/payhere/hash', {
        params: {
          orderId,
          amount: amount.toFixed(2)
        },
      });
      console.log(response.data.hash)
      return response.data.hash;
    } catch (error) {
      console.error('Error generating hash:', error);
      throw error;
    }
  };

  const payNow = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    const newOrderId = `ORDER_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    setOrderId(newOrderId);
    console.log("🆔 Generated Order ID:", newOrderId);

    try {
      const hashValue = (await generateHash(newOrderId)).toUpperCase();
      console.log("🔐 Hash received for Order ID:", newOrderId);
      console.log("🔑 Hash value:", hashValue);
      setHash(hashValue);

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://sandbox.payhere.lk/pay/checkout';
      form.target = '_self';

      const fields = {
        merchant_id: '1231047',
        return_url: 'http://localhost:5173/payment-success',
        cancel_url: 'http://localhost:5173/payment-cancel',
        notify_url: 'http://localhost:8080/api/payments/notify',
        order_id: newOrderId,
        items: 'Car Luminous Tire Valve Caps',
        amount: amount.toFixed(2),
        currency: 'LKR',
        hash: hashValue,
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'jane@doe.com',
        phone: '0712345678',
        address: '123 Galle Road',
        city: 'Colombo',
        country: 'Sri Lanka',
        delivery_address: '123 Galle Road',
        delivery_city: 'Colombo',
        delivery_country: 'Sri Lanka'
      };

      console.log('Submitting PayHere form with fields:', fields);

      console.log("🧾 Final form submission:");
      console.log("Order ID:", newOrderId);            
      console.log("Hash:", hashValue);                 
      console.log("Amount:", amount.toFixed(2));      
      console.log("Currency:", 'LKR');

      console.log("✅ Using Order ID:", newOrderId);
// const hashValue = (await generateHash(newOrderId)).toUpperCase();
console.log("✅ Hash from backend:", hashValue);
console.log("✅ Sending to PayHere form:");
console.log({ order_id: newOrderId, amount: amount.toFixed(2), hash: hashValue });

      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error('Payment Error:', err);
      alert('Failed to process payment. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-gray-100 pb-10">
      <div className="py-10 bg-white border-t border-gray-200 flex items-center justify-center px-10 mb-3">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Checkout</h1>
          <p className="text-gray-600 text-sm">You're just one step away from owning something special</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-[#1B4965] rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">1</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Shipping Address</h2>
              </div>
              <button onClick={() => setShowModal(true)} className="text-blue-500 hover:text-blue-600 font-medium">
                + Add new address
              </button>
              {showModal && <AddAddressModal onClose={() => setShowModal(false)} />}
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 bg-[#1B4965] rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">2</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Payment Method</h2>
              </div>
              <label className="flex items-center gap-4 p-3 rounded-2xl border border-gray-200 hover:border-blue-300 cursor-pointer">
                <input type="radio" name="payment" className="text-blue-500" defaultChecked />
                <div className="flex items-center gap-3">
                  <FaMoneyCheckAlt className="text-green-600 text-xl" />
                  <span className="font-medium">PayHere</span>
                </div>
              </label>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 bg-[#1B4965] rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">3</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Order Items</h2>
              </div>
              <div className="flex gap-4 p-4 rounded-2xl bg-gray-50">
                <img
                  src="https://ae01.alicdn.com/kf/S91eec62f57a84ac7ae22b0e75c5a5e9cT.jpg"
                  alt="product"
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 text-sm">Car Luminous Tire Valve Caps</h3>
                  <p className="text-gray-500 text-xs">Delivery: Jul 09 - 18</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-green-600 text-sm font-medium">4pcs green</span>
                    <span className="font-bold text-gray-800">LKR151.39</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">LKR484.03</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">LKR181.30</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-800">Total</span>
                    <span className="text-xl font-bold text-blue-600">LKR665.33</span>
                  </div>
                </div>
              </div>
              <button
                onClick={payNow}
                disabled={isProcessing}
                className={`w-full py-3 rounded-xl font-medium transition-colors ${isProcessing
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
              >
                {isProcessing ? 'Processing...' : 'Pay with PayHere'}
              </button>
              <p className="text-xs text-gray-500 text-center mt-4">
                By placing your order, you agree to our terms and conditions
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;