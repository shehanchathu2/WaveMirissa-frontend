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
    <div className="pb-10 bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-center px-10 py-6 mb-3 bg-white border-t border-gray-200">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-800">Checkout</h1>
          <p className="text-sm text-gray-600">You're just one step away from owning something special</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mb-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-3">
            {/* Shipping Section */}
            <div className="p-6 transition-shadow bg-white border border-gray-100 shadow-sm rounded-3xl hover:shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-[#1B4965] rounded-full flex items-center justify-center shadow-md">
                  <span className="text-sm font-semibold text-white">1</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Shipping Address</h2>
              </div>

              <div>
                <button
                  onClick={() => setShowModal(true)}
                  className="font-medium text-blue-500 hover:text-blue-600"
                >
                  + Add new address
                </button>

                {showModal && <AddAddressModal onClose={() => setShowModal(false)} />}
              </div>


            </div>

            {/* Payment Section */}
            <div className="p-6 transition-shadow bg-white border border-gray-100 shadow-sm rounded-3xl hover:shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 bg-[#1B4965] rounded-full flex items-center justify-center shadow-md">
                  <span className="text-sm font-semibold text-white">2</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Payment Method</h2>
              </div>


              <div className="space-y-3">
                <label className="flex items-center gap-4 p-3 transition-colors border border-gray-200 cursor-pointer rounded-2xl hover:border-blue-300">
                  <input type="radio" name="payment" className="text-blue-500" defaultChecked />
                  <div className="flex items-center gap-3">
                    <FaMoneyCheckAlt className="text-xl text-green-600" />
                    <span className="font-medium">Pay Here</span>
                  </div>
                </label>
              </div>

              {/* <div className="space-y-3">
                <label className="flex items-center gap-4 p-3 transition-colors border border-gray-200 cursor-pointer rounded-2xl hover:border-blue-300">
                  <input type="radio" name="payment" className="text-blue-500" />
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <FaCcVisa className="text-xl text-blue-600" />
                      <FaCcMastercard className="text-xl text-red-500" />
                    </div>
                    <span className="font-medium">Credit/Debit Card</span>
                  </div>
                </label>

                <label className="flex items-center gap-4 p-3 transition-colors border border-gray-200 cursor-pointer rounded-2xl hover:border-blue-300">
                  <input type="radio" name="payment" className="text-blue-500" />
                  <div className="flex items-center gap-3">
                    <FaGooglePay className="text-2xl text-blue-600" />
                    <span className="font-medium">Google Pay</span>
                  </div>
                </label>

                <label className="flex items-center gap-4 p-3 transition-colors border border-gray-200 cursor-pointer rounded-2xl hover:border-blue-300">
                  <input type="radio" name="payment" className="text-blue-500" />
                  <div className="flex items-center gap-3">
                    <FaPaypal className="text-2xl text-blue-600" />
                    <span className="font-medium">PayPal</span>
                  </div>
                </label>
              </div> */}
            </div>







            {/* Products Section */}
            <div className="p-6 transition-shadow bg-white border border-gray-100 shadow-sm rounded-3xl hover:shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 bg-[#1B4965] rounded-full flex items-center justify-center shadow-md">
                  <span className="text-sm font-semibold text-white">3</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Order Items</h2>
              </div>

              <div className="space-y-4">
                {/* Product 1 */}
                <div className="flex gap-4 p-4 transition-colors rounded-2xl bg-gray-50 hover:bg-gray-100">
                  <img
                    src="https://ae01.alicdn.com/kf/S91eec62f57a84ac7ae22b0e75c5a5e9cT.jpg"
                    alt="Tire Valve Caps"
                    className="object-cover w-20 h-20 rounded-xl"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium leading-tight text-gray-800">
                      Car Luminous Tire Valve Caps Fluorescent Night Glowing
                    </h3>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm font-medium text-green-600">4pcs green</span>
                      <span className="font-bold text-gray-800">LKR151.39</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Delivery: Jul 09 - 18</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={decrement}
                      className="flex items-center justify-center w-8 h-8 text-gray-600 transition-colors bg-white border border-gray-300 rounded-full hover:border-gray-400 hover:text-gray-800"
                    >
                      -
                    </button>
                    <span className="w-8 font-medium text-center">{quantity}</span>
                    <button
                      onClick={increment}
                      className="flex items-center justify-center w-8 h-8 text-gray-600 transition-colors bg-white border border-gray-300 rounded-full hover:border-gray-400 hover:text-gray-800"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Product 2 */}
                <div className="flex gap-4 p-4 transition-colors rounded-2xl bg-gray-50 hover:bg-gray-100">
                  <img
                    src="https://ae01.alicdn.com/kf/S16213c72b91c437c9c63b16f23c5bb69V.jpg"
                    alt="Xiaomi Pen Drive"
                    className="object-cover w-20 h-20 rounded-xl"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium leading-tight text-gray-800">
                      Original Xiaomi Pen Drive 2TB USB 3.0 Flash Drive
                    </h3>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="font-bold text-gray-800">LKR332.64</span>
                      <span className="text-sm font-medium text-green-600">Free shipping</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Delivery: Jun 23 - 26</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center justify-center w-8 h-8 text-gray-600 transition-colors bg-white border border-gray-300 rounded-full hover:border-gray-400 hover:text-gray-800">
                      -
                    </button>
                    <span className="w-8 font-medium text-center">1</span>
                    <button className="flex items-center justify-center w-8 h-8 text-gray-600 transition-colors bg-white border border-gray-300 rounded-full hover:border-gray-400 hover:text-gray-800">
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


              <button
                className="w-full bg-gradient-to-r from-[#1b4761]/70 to-[#1b4761] text-white py-3 rounded-xl font-medium hover:from-[#1b4765] hover:to-[#1b4765] transition-all duration-200 shadow-sm hover:shadow-md mb-4"
              >
                Place Order
              </button>

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