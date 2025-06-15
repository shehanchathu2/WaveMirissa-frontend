import React, { useState } from 'react';
import { FaCcVisa, FaCcMastercard, FaPaypal, FaGooglePay } from 'react-icons/fa';
import { motion } from 'framer-motion';
import AddAddressModal from '../components/AddAddressModal ';
import { FaMoneyCheckAlt } from 'react-icons/fa';



const CheckoutPage = () => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => quantity > 1 && setQuantity(quantity - 1);
  const [showModal, setShowModal] = useState(false);


  return (
    <div className="bg-gray-100 pb-10">
      {/* Header */}
      <div className="py-10 bg-white border-t border-gray-200 flex items-center justify-center px-10 mb-3">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Checkout</h1>
          <p className="text-gray-600 text-sm">You're just one step away from owning something special</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Shipping Section */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-[#1B4965] rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white font-semibold text-sm">1</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Shipping Address</h2>
              </div>

              <div>
                <button
                  onClick={() => setShowModal(true)}
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  + Add new address
                </button>

                {showModal && <AddAddressModal onClose={() => setShowModal(false)} />}
              </div>


            </div>

            {/* Payment Section */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 bg-[#1B4965] rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white font-semibold text-sm">2</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Payment Method</h2>
              </div>


              <div className="space-y-3">
                <label className="flex items-center gap-4 p-3 rounded-2xl border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors">
                  <input type="radio" name="payment" className="text-blue-500" defaultChecked />
                  <div className="flex items-center gap-3">
                    <FaMoneyCheckAlt className="text-green-600 text-xl" />
                    <span className="font-medium">Pay Here</span>
                  </div>
                </label>
              </div>

              {/* <div className="space-y-3">
                <label className="flex items-center gap-4 p-3 rounded-2xl border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors">
                  <input type="radio" name="payment" className="text-blue-500" />
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <FaCcVisa className="text-blue-600 text-xl" />
                      <FaCcMastercard className="text-red-500 text-xl" />
                    </div>
                    <span className="font-medium">Credit/Debit Card</span>
                  </div>
                </label>

                <label className="flex items-center gap-4 p-3 rounded-2xl border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors">
                  <input type="radio" name="payment" className="text-blue-500" />
                  <div className="flex items-center gap-3">
                    <FaGooglePay className="text-2xl text-blue-600" />
                    <span className="font-medium">Google Pay</span>
                  </div>
                </label>

                <label className="flex items-center gap-4 p-3 rounded-2xl border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors">
                  <input type="radio" name="payment" className="text-blue-500" />
                  <div className="flex items-center gap-3">
                    <FaPaypal className="text-2xl text-blue-600" />
                    <span className="font-medium">PayPal</span>
                  </div>
                </label>
              </div> */}
            </div>







            {/* Products Section */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 bg-[#1B4965] rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white font-semibold text-sm">3</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Order Items</h2>
              </div>

              <div className="space-y-4">
                {/* Product 1 */}
                <div className="flex gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <img
                    src="https://ae01.alicdn.com/kf/S91eec62f57a84ac7ae22b0e75c5a5e9cT.jpg"
                    alt="Tire Valve Caps"
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-800 text-sm leading-tight">
                      Car Luminous Tire Valve Caps Fluorescent Night Glowing
                    </h3>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-green-600 text-sm font-medium">4pcs green</span>
                      <span className="font-bold text-gray-800">LKR151.39</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Delivery: Jul 09 - 18</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={decrement}
                      className="w-8 h-8 rounded-full bg-white border border-gray-300 hover:border-gray-400 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">{quantity}</span>
                    <button
                      onClick={increment}
                      className="w-8 h-8 rounded-full bg-white border border-gray-300 hover:border-gray-400 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Product 2 */}
                <div className="flex gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <img
                    src="https://ae01.alicdn.com/kf/S16213c72b91c437c9c63b16f23c5bb69V.jpg"
                    alt="Xiaomi Pen Drive"
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-800 text-sm leading-tight">
                      Original Xiaomi Pen Drive 2TB USB 3.0 Flash Drive
                    </h3>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="font-bold text-gray-800">LKR332.64</span>
                      <span className="text-green-600 text-sm font-medium">Free shipping</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Delivery: Jun 23 - 26</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded-full bg-white border border-gray-300 hover:border-gray-400 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors">
                      -
                    </button>
                    <span className="w-8 text-center font-medium">1</span>
                    <button className="w-8 h-8 rounded-full bg-white border border-gray-300 hover:border-gray-400 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">LKR484.03</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">LKR181.30</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">Total</span>
                    <span className="text-xl font-bold text-blue-600">LKR665.33</span>
                  </div>
                </div>
              </div>


              <button
                className="w-full bg-gradient-to-r from-[#1b4761]/70 to-[#1b4761] text-white py-3 rounded-xl font-medium hover:from-[#1b4765] hover:to-[#1b4765] transition-all duration-200 shadow-sm hover:shadow-md mb-4"
              >
                Place Order
              </button>

              <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
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