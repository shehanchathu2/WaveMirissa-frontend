import axios from 'axios';
import React, { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CartModal = ({onClose }) => {
    const navigate = useNavigate();
      const { user } = useAuth();
    
  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (user) {
          const res = await axios.get(`http://localhost:8080/cart/${user.id}`);
          setCart(res.data);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    fetchCart();
  }, [user]);

    //  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    
  return (
    <div className="fixed top-0 right-0 w-full max-w-sm h-full bg-white shadow-lg z-50 flex flex-col p-4 overflow-y-auto">
      <h2 className="text-lg font-bold text-red-600 flex items-center gap-2 mb-2">
        🛒 Subtotal
      </h2>

      {/* <div className="text-2xl font-bold text-gray-800 mb-2">LKR {subtotal.toFixed(2)}</div> */}

      <div className="bg-orange-50 p-3 rounded-xl text-green-600 flex items-center gap-2 mb-4">
        <FaCheckCircle />
        <span>Free shipping on all orders</span>
      </div>

      <button
        onClick={() => {
          navigate('/checkout');
          onClose();
        }}
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-full mb-3 w-full"
      >
        {/* Checkout ({cartItems.length}) */}
      </button>

      <button
        onClick={() => {
          navigate('/cart');
          onClose();
        }}
        className="border border-gray-300 text-gray-700 py-2 rounded-full font-medium w-full mb-4"
      >
        Go to cart
      </button>

      <div className="border-t border-gray-200 pt-3">
        {/* <h3 className="font-semibold text-gray-700 mb-2">Select all ({cartItems.length})</h3> */}
        <div className="space-y-3">
          {/* {cartItems.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <img
                src={item.imageUrl || 'https://via.placeholder.com/60'}
                alt={item.productName}
                className="w-14 h-14 rounded-lg object-cover border"
              />
              <div className="flex-1">
                <p className="text-sm text-gray-800 truncate">{item.productName}</p>
                <p className="text-sm font-medium text-gray-500">LKR {item.price.toFixed(2)}</p>
                <select
                  value={item.quantity}
                  disabled
                  className="mt-1 text-sm border rounded px-2 py-1"
                >
                  <option>{item.quantity}</option>
                </select>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
