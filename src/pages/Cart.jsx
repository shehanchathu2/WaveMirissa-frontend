import React, { useState } from 'react';
import { FaHeart, FaMinus, FaPlus, FaTrashAlt, FaShoppingBag } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import img4 from '../assets/bestSeller/img4.jpg'
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal } from 'react-icons/fa';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const Cart = () => {
  const [quantities, setQuantities] = useState({ item1: 1, item2: 1 });

  const updateQuantity = (item, change) => {
    setQuantities(prev => ({
      ...prev,
      [item]: Math.max(1, prev[item] + change),
    }));
  };

  const [selectedItems, setSelectedItems] = useState({
    item1: true, // or false depending on default
    item2: false,
  });

  const toggleSelect = (itemId) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  return (
    <div className="pb-10 bg-gradient-to-br bg-gray-50">
      {/* Header */}
      <div className="py-10 bg-white border-t border-gray-200 flex items-center justify-center px- mb-3">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Shopping Cart</h1>
          <p className="text-gray-600 text-sm">Handcrafted treasures waiting for you</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-12 grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Offer Banner */}
          <div className="relative bg-white border border-gray-200 rounded-2xl p-6 text-gray-800 shadow-sm">
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <HiSparkles className="w-5 h-5 text-yellow-500" />
                <span className="font-medium">Artisan's Promise</span>
              </div>
              <p className="text-sm text-gray-600">
                Enjoy complimentary polishing and care support on all handcrafted jewelry. It's our way of saying thank you.
              </p>
            </div>
          </div>

          {/* Cart Item 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex gap-4 items-start">

              {/* Selected circle */}
              <div className="pt-2">
                <button
                  onClick={() => toggleSelect('item1')}
                  className={`w-5 h-5 rounded-full border-2 ${selectedItems.item1 ? 'bg-[#1b4765] border-[#1b4765]' : 'border-gray-300'
                    } flex items-center justify-center`}
                >
                  {selectedItems.item1 && (
                    <FaCheck className="text-white text-xs" />
                  )}
                </button>
              </div>

              {/* Product image */}
              <div className="relative">
                <div className="w-24 h-24 pb-2">
                  <img src={img4} alt="" className="rounded-lg object-cover w-full h-full" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Delicate Rose Gold Chain</h3>
                    <p className="text-sm text-gray-500">18k Rose Gold • 16" length</p>
                  </div>
                  <button className="text-gray-400 hover:text-rose-500 transition-colors">
                    <FaTrashAlt className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  {/* Quantity controls */}
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity('item1', -1)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <FaMinus className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="w-8 text-center font-medium">{quantities.item1}</span>
                    <button onClick={() => updateQuantity('item1', 1)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <FaPlus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <div className="font-semibold text-gray-800">$149.00</div>
                    <div className="text-sm text-gray-400 line-through">$199.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Cart Item 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex gap-4 items-start">

              {/* Selected circle */}
              <div className="pt-2">
                <button
                  onClick={() => toggleSelect('item2')}
                  className={`w-5 h-5 rounded-full border-2 ${selectedItems.item2 ? 'bg-[#1b4765] border-[#1b4765]' : 'border-gray-300'
                    } flex items-center justify-center`}
                >
                  {selectedItems.item1 && (
                    <FaCheck className="text-white text-xs" />
                  )}
                </button>
              </div>

              {/* Product image */}
              <div className="relative">
                <div className="w-24 h-24 pb-2">
                  <img src={img4} alt="" className="rounded-lg object-cover w-full h-full" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Delicate Rose Gold Chain</h3>
                    <p className="text-sm text-gray-500">18k Rose Gold • 16" length</p>
                  </div>
                  <button className="text-gray-400 hover:text-rose-500 transition-colors">
                    <FaTrashAlt className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  {/* Quantity controls */}
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity('item1', -1)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <FaMinus className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="w-8 text-center font-medium">{quantities.item1}</span>
                    <button onClick={() => updateQuantity('item1', 1)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <FaPlus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <div className="font-semibold text-gray-800">$149.00</div>
                    <div className="text-sm text-gray-400 line-through">$199.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-6">
            <h3 className="font-medium text-gray-800 mb-6 text-lg">Order Summary</h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal (2 items)</span>
                <span className="text-gray-800">$238.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Discount</span>
                <span className="text-green-600">-$50.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-800">Free</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-800">Total</span>
                  <span className="font-semibold text-xl text-gray-800">$188.00</span>
                </div>
              </div>
            </div>

            <Link to="/checkout">
              <button
                className="w-full bg-gradient-to-r from-[#1b4761]/70 to-[#1b4761] text-white py-3 rounded-xl font-medium hover:from-[#1b4765] hover:to-[#1b4765] transition-all duration-200 shadow-sm hover:shadow-md mb-4"
              >
                Proceed to Checkout
              </button>
            </Link>

            <div className="text-center mb-6">
              <p className="text-xs text-gray-500">Secure checkout with</p>
              <div className="flex justify-center gap-4 mt-2 text-2xl">
                <FaCcVisa className="text-blue-600" title="Visa" />
                <FaCcMastercard className="text-red-600" title="MasterCard" />
                <FaCcAmex className="text-blue-800" title="American Express" />
                <FaCcPaypal className="text-blue-500" title="PayPal" />
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800 mb-1">Handmade Guarantee</p>
                  <p className="text-xs text-green-700">
                    Each piece is lovingly crafted by skilled artisans with a lifetime quality promise.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* you mat to love */}
      <div className="mt-10 lg:col-span-2 pl-40 pr-40 mb-20">
        <h3 className="mb-4 text-2xl font-bold">You may also like</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="p-3 transition border rounded-xl hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src="https://i.etsystatic.com/22631453/r/il/2bc218/4515072246/il_794xN.4515072246_r92b.jpg"
                alt="Suggested Product"
                className="object-cover w-full h-32 rounded-lg"
              />
              <p className="mt-2 text-sm">Ceramic Whisper</p>
              <p className="text-sm font-semibold text-green-600">In Stock</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
