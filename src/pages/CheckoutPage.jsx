import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import AddAddressModal from '../components/AddAddressModal ';
import api from '../api';
import { calculateFinalPrice } from "../utils/calcPrice";

import Payment from '../components/Payment';
import { useAuth } from '../context/AuthContext';

const CheckoutPage = () => {
  const { user } = useAuth();

  const { state } = useLocation();
  const selectedItems = state?.selectedItems || [];
  const totalPrice = state?.totalPrice || 0;

  const [showModal, setShowModal] = useState(false);
  const [orderID, setOrderID] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);


  const [loading, setLoading] = useState(false);

  const shippingAmount = 299.99; // Fixed shipping amount
  // const totalAmount = totalPrice + shippingAmount; // Total amount including shipping

  // Extract product IDs from selectedItems to send to backend
  const productIds = selectedItems.map(item => item.productId);

  console.log(productIds);

  console.log("selected items", selectedItems);



  const subtotal = selectedItems.reduce(
    (acc, item) => acc + calculateFinalPrice(item) * item.quantity,
    0
  );

  const totalAmount = subtotal + shippingAmount;

  console.log("subTotal Amount:", subtotal);  

  // Save order to backend DB after payment success
  const saveOrderToDB = async (payhereRef) => {
    try {
      setLoading(true);  

      const orderData = {
        orderId: orderID,
        amount: totalAmount.toFixed(2),
        currency: 'LKR',
        status: 'PAID',
        paymentMethod: 'PAYHERE',
        userId: user.id,
        productIds: selectedItems.map(item => item.productId),
        payhereRef: payhereRef,
        items: selectedItems.map(item => ({
          productId: item.productId, 
          quantity: item.quantity,
          size: item.size,
          customMaterial: item.customMaterial,
          customizationIds: item.customizations?.map(c => c.id) || [],
          finalPrice: calculateFinalPrice(item)
        }))
      };

      // const response = await api.post('/admin/orders', orderData);
      const endpoint = user.role === "ADMIN" ? "/admin/orders" : "/user/orders";
      const response = await api.post(endpoint, orderData);

      console.log('Order saved:', response.data);
      alert('Order saved successfully!');
    } catch (error) {
      console.error('Error saving order:', error);
      alert('Failed to save order.');
    } finally {
      setLoading(false);  
    }
  };

  // Callback after successful payment
  const handlePaymentSuccess = (payhereRef) => {
    setPaymentSuccess(true);
    saveOrderToDB(payhereRef);
  };

  return (
    <div className="pb-10 bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-center px-10 py-6 mb-3 bg-white border-t border-gray-200">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-800">Checkout</h1>
          <p className="text-sm text-gray-600">
            You're just one step away from owning something special
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-[#1B4965] rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">1</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Shipping Address</h2>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                + Add new address
              </button>
              {showModal && <AddAddressModal onClose={() => setShowModal(false)} />}
            </div>

            {/* Payment Method */}
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

            {/* Order Items */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 bg-[#1B4965] rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">3</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Order Items</h2>
              </div>
              {selectedItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 mb-3 rounded-2xl bg-gray-50">
                  <img
                    src={item.imageUrl || 'https://via.placeholder.com/150'}
                    alt={item.productName || 'Product'}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 text-sm">{item.productName}</h3>
                    <p className="text-gray-500 text-xs">Quantity: {item.quantity}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-green-600 text-sm font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
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
                  <span className="font-semibold">{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">LKR{shippingAmount.toFixed(2)}</span>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-800">Total</span>
                    <span className="text-xl font-bold text-blue-600">LKR{totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Payment
                firstname="John"
                lastname="Doe"
                email="john@example.com"
                paymentTitle="Order Payment"
                amount={totalAmount}
                setPaymentSuccess={handlePaymentSuccess}
                setOrderID={setOrderID}
                selectedItems={selectedItems}
                disabled={isProcessing || loading}   // ✅ disable if saving to DB
                className={`w-full py-3 rounded-xl font-medium transition-colors ${isProcessing || loading
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
              >
                {isProcessing || loading ? 'Processing...' : 'Pay with PayHere'}
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