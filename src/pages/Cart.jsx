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
      <div className="flex items-center justify-center py-6 mb-3 bg-white border-t border-gray-200 px-">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-800">Shopping Cart</h1>
          <p className="text-sm text-gray-600">Handcrafted treasures waiting for you</p>
        </div>
      </div>

      <div className="grid max-w-6xl gap-8 px-6 pb-12 mx-auto lg:grid-cols-3">
        {/* Cart Items */}
        <div className="space-y-6 lg:col-span-2">
          {/* Offer Banner */}
          <div className="relative p-6 text-gray-800 bg-white border border-gray-200 shadow-sm rounded-2xl">
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
          <div className="p-6 transition-shadow duration-300 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md">
            <div className="flex items-start gap-4">

              {/* Selected circle */}
              <div className="pt-2">
                <button
                  onClick={() => toggleSelect('item1')}
                  className={`w-5 h-5 rounded-full border-2 ${selectedItems.item1 ? 'bg-[#1b4765] border-[#1b4765]' : 'border-gray-300'
                    } flex items-center justify-center`}
                >
                  {selectedItems.item1 && (
                    <FaCheck className="text-xs text-white" />
                  )}
                </button>
              </div>

              {/* Product image */}
              <div className="relative">
                <div className="w-24 h-24 pb-2">
                  <img src={img4} alt="" className="object-cover w-full h-full rounded-lg" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="mb-1 font-medium text-gray-800">Delicate Rose Gold Chain</h3>
                    <p className="text-sm text-gray-500">18k Rose Gold • 16" length</p>
                  </div>
                  <button className="text-gray-400 transition-colors hover:text-rose-500">
                    <FaTrashAlt className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  {/* Quantity controls */}
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity('item1', -1)} className="flex items-center justify-center w-8 h-8 transition-colors border border-gray-200 rounded-full hover:bg-gray-50">
                      <FaMinus className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="w-8 font-medium text-center">{quantities.item1}</span>
                    <button onClick={() => updateQuantity('item1', 1)} className="flex items-center justify-center w-8 h-8 transition-colors border border-gray-200 rounded-full hover:bg-gray-50">
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
          <div className="p-6 transition-shadow duration-300 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md">
            <div className="flex items-start gap-4">

              {/* Selected circle */}
              <div className="pt-2">
                <button
                  onClick={() => toggleSelect('item2')}
                  className={`w-5 h-5 rounded-full border-2 ${selectedItems.item2 ? 'bg-[#1b4765] border-[#1b4765]' : 'border-gray-300'
                    } flex items-center justify-center`}
                >
                  {selectedItems.item1 && (
                    <FaCheck className="text-xs text-white" />
                  )}
                </button>
              </div>

              {/* Product image */}
              <div className="relative">
                <div className="w-24 h-24 pb-2">
                  <img src={img4} alt="" className="object-cover w-full h-full rounded-lg" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="mb-1 font-medium text-gray-800">Delicate Rose Gold Chain</h3>
                    <p className="text-sm text-gray-500">18k Rose Gold • 16" length</p>
                  </div>
                  <button className="text-gray-400 transition-colors hover:text-rose-500">
                    <FaTrashAlt className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  {/* Quantity controls */}
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity('item1', -1)} className="flex items-center justify-center w-8 h-8 transition-colors border border-gray-200 rounded-full hover:bg-gray-50">
                      <FaMinus className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="w-8 font-medium text-center">{quantities.item1}</span>
                    <button onClick={() => updateQuantity('item1', 1)} className="flex items-center justify-center w-8 h-8 transition-colors border border-gray-200 rounded-full hover:bg-gray-50">
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
          <div className="sticky p-6 bg-white border border-gray-100 shadow-sm rounded-2xl top-6">
            <h3 className="mb-6 text-lg font-medium text-gray-800">Order Summary</h3>

            <div className="mb-6 space-y-4">
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
              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-800">Total</span>
                  <span className="text-xl font-semibold text-gray-800">$188.00</span>
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

            <div className="mb-6 text-center">
              <p className="text-xs text-gray-500">Secure checkout with</p>
              <div className="flex justify-center gap-4 mt-2 text-2xl">
                <FaCcVisa className="text-blue-600" title="Visa" />
                <FaCcMastercard className="text-red-600" title="MasterCard" />
                <FaCcAmex className="text-blue-800" title="American Express" />
                <FaCcPaypal className="text-blue-500" title="PayPal" />
              </div>
            </div>

            <div className="p-4 border border-green-200 bg-green-50 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-white">✓</span>
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium text-green-800">Handmade Guarantee</p>
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
      <div className="pl-40 pr-40 mt-10 mb-20 lg:col-span-2">
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
