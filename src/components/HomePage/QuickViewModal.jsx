import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const QuickViewModal = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="bg-white max-w-xl w-full rounded-xl shadow-xl p-6 relative"
        >
          <button
            className="absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-red-500"
            onClick={onClose}
          >
            &times;
          </button>

          <div className="flex gap-6">
            <img
              src={product.image_url1}
              alt={product.name}
              className="w-48 h-48 object-cover rounded-xl"
            />

            <div className="flex-1 space-y-3">
              <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
              <p className="text-gray-600 text-sm">{product.description}</p>

              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">5.0 (23 reviews)</span>
              </div>

              <p className="text-lg font-bold text-blue-600">LKR {product.price}</p>

              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <div><span className="font-semibold">Material:</span> {product.material}</div>
                <div><span className="font-semibold">Category:</span> {product.category}</div>
                <div><span className="font-semibold">Gender:</span> {product.gender}</div>
                <div><span className="font-semibold">Available:</span> {product.available ? 'Yes' : 'No'}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuickViewModal;