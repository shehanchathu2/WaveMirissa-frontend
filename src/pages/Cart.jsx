import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import {
  FaMinus,
  FaPlus,
  FaTrashAlt,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
  FaCheck,
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Cart = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [selectedItems, setSelectedItems] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (user) {
          const res = await axios.get(`http://localhost:8080/cart/${user.id}`);
          setCart(res.data);

          const initialQuantities = {};
          const initialSelected = {};
          res.data.items.forEach(item => {
            initialQuantities[item.id] = item.quantity;
            initialSelected[item.id] = true;
          });

          setQuantities(initialQuantities);
          setSelectedItems(initialSelected);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    fetchCart();
  }, [user]);

  useEffect(() => {
    if (!cart || !cart.items) return;

    const total = cart.items.reduce((sum, item) => {
      if (selectedItems[item.id]) {
        const quantity = quantities[item.id] || item.quantity;
        return sum + item.price * quantity;
      }
      return sum;
    }, 0);

    setTotalPrice(total);
  }, [cart, quantities, selectedItems]);

  const updateQuantity = (itemId, change) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) + change),
    }));
  };

  const toggleSelect = (itemId) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleCheckout = () => {
    if (!cart?.items) return;

    const selectedItemsData = cart.items
      .filter(item => selectedItems[item.id])
      .map(item => ({
        ...item,
        quantity: quantities[item.id] ?? item.quantity,
      }));

    navigate('/checkout', {
      state: {
        selectedItems: selectedItemsData,
        totalPrice,
      },
    });
  };

  return (
    <div className="pb-10 bg-gradient-to-br bg-gray-50">
      <div className="flex items-center justify-center py-6 mb-3 bg-white border-t border-gray-200">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-800">Shopping Cart</h1>
          <p className="text-sm text-gray-600">Handcrafted treasures waiting for you</p>
        </div>
      </div>

      <div className="grid max-w-6xl gap-8 px-6 pb-12 mx-auto lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
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

          {/* Cart Items */}
          <div className="p-6 transition-shadow duration-300 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md space-y-6">
            {cart?.items?.length > 0 ? (
              cart.items.map((item) => (
                <div key={item.id} className="flex items-start gap-4 mb-6">
                  <div className="pt-2">
                    <button
                      onClick={() => toggleSelect(item.id)}
                      className={`w-5 h-5 rounded-full border-2 ${selectedItems[item.id] ? 'bg-[#1b4765] border-[#1b4765]' : 'border-gray-300'} flex items-center justify-center`}
                    >
                      {selectedItems[item.id] && <FaCheck className="text-xs text-white" />}
                    </button>
                  </div>

                  <div className="relative">
                    <div className="w-24 h-24 pb-2">
                      <img
                        src={item.imageUrl || 'https://via.placeholder.com/150'}
                        alt={item.productName || 'Product'}
                        className="object-cover w-full h-full rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="mb-1 font-medium text-gray-800">{item.productName}</h3>
                        <p className="text-sm text-gray-500">Custom Material or Size</p>
                      </div>
                      <button className="text-gray-400 transition-colors hover:text-rose-500">
                        <FaTrashAlt className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="flex items-center justify-center w-8 h-8 transition-colors border border-gray-200 rounded-full hover:bg-gray-50"
                        >
                          <FaMinus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="w-8 font-medium text-center">{quantities[item.id] ?? item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="flex items-center justify-center w-8 h-8 transition-colors border border-gray-200 rounded-full hover:bg-gray-50"
                        >
                          <FaPlus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold text-gray-800">
                          ${((item.price || 0) * (quantities[item.id] ?? item.quantity)).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
               <div className="flex items-center justify-center min-h-[60vh] bg-[#f3f7fa] px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <FaShoppingCart className="text-[#1b4765]" size={48} />
        </div>
        <h2 className="text-2xl font-semibold text-[#1b4765] mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Looks like you haven’t added anything to your cart yet.</p>
        <button
          onClick={() => navigate('/shop')}
          className="px-6 py-2 rounded-xl bg-[#1b4765] text-white hover:bg-[#163a54] transition duration-200"
        >
          Go to Shop
        </button>
      </div>
    </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky p-6 bg-white border border-gray-100 shadow-sm rounded-2xl top-6">
            <h3 className="mb-6 text-lg font-medium text-gray-800">Order Summary</h3>

            <div className="mb-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-800">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-800">Free</span>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-800">Total</span>
                  <span className="text-xl font-semibold text-gray-800">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-[#1b4761]/70 to-[#1b4761] text-white py-3 rounded-xl font-medium hover:from-[#1b4765] hover:to-[#1b4765] transition-all duration-200 shadow-sm hover:shadow-md mb-4"
            >
              Proceed to Checkout
            </button>

            <div className="mb-6 text-center">
              <p className="text-xs text-gray-500">Secure checkout with</p>
              <div className="flex justify-center gap-4 mt-2 text-2xl">
                <FaCcVisa className="text-blue-600" />
                <FaCcMastercard className="text-red-600" />
                <FaCcAmex className="text-blue-800" />
                <FaCcPaypal className="text-blue-500" />
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

      {/* You may also like */}
      <div className="pl-40 pr-40 mt-10 mb-20 lg:col-span-2">
        <h3 className="mb-4 text-2xl font-bold">You may also like</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="p-3 transition border rounded-xl hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
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