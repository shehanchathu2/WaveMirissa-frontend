import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import AddAddressModal from '../components/AddAddressModal ';
import axios from 'axios';
import toast from 'react-hot-toast';
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

  const shippingAmount = 299.99; // Fixed shipping amount
  const totalAmount = totalPrice + shippingAmount; // Total amount including shipping

  // Extract product IDs from selectedItems to send to backend
  const productIds = selectedItems.map(item => item.id);
  // Replace or get from user context/auth if you have one

  console.log("selected items", selectedItems);
  // Save order to backend DB after payment success
  const saveOrderToDB = async (payhereRef) => {
    try {
      const orderData = {
        orderId: orderID,
        amount: totalAmount.toFixed(2),
        currency: 'LKR',
        status: 'PAID',
        paymentMethod: 'PAYHERE',
        userId: user.id,
        productIds: productIds,
        payhereRef: payhereRef,

         items: selectedItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        size: item.size,
        customMaterial: item.customMaterial,
      }))
      };

      const response = await axios.post('http://localhost:8080/api/admin/orders', orderData);

      console.log('Order saved:', response.data);
      toast.success('Order saved successfully!');
    } catch (error) {
      console.error('Error saving order:', error);
      toast.error('Failed to save order.');
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
                      <span className="text-green-600 text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
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
                setPaymentSuccess={handlePaymentSuccess}  // Pass the handler here!
                setOrderID={setOrderID}
                selectedItems={selectedItems}
                disabled={isProcessing}
                className={`w-full py-3 rounded-xl font-medium transition-colors ${isProcessing ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
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
