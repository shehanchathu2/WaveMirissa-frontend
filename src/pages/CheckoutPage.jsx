import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import AddAddressModal from '../components/AddAddressModal ';
import axios from 'axios';

import Payment from '../components/Payment';




const CheckoutPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [orderID, setOrderID] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);


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
            <div className="sticky p-6 bg-white border border-gray-100 shadow-sm rounded-3xl top-8">
              <h2 className="mb-6 text-xl font-bold text-center text-gray-800">Order Summary</h2>

              <div className="mb-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">LKR484.03</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">LKR181.30</span>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">

          

                    <span className="text-lg font-bold text-gray-800">Total</span>
                    <span className="text-xl font-bold text-blue-600">LKR665.33</span>
                  </div>
                </div>
              </div>
               <Payment
              firstname="John"
              lastname="Doe"
              email="john@example.com"
              paymentTitle="Car Luminous Tire Valve Caps"
              amount={amount}
              setPaymentSuccess={setPaymentSuccess}
              setOrderID={setOrderID}
            
                
                disabled={isProcessing}
                className={`w-full py-3 rounded-xl font-medium transition-colors ${isProcessing
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
              >
                {isProcessing ? 'Processing...' : 'Pay with PayHere'}
              </Payment>


              <p className="mt-4 text-xs leading-relaxed text-center text-gray-500">

            

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