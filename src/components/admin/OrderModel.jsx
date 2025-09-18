import React from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const OrderModal = ({ title, children, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 p-4"
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg w-full max-w-2xl relative flex flex-col max-h-[80vh]"
        variants={modal}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Scrollable Content with hidden scrollbar */}
        <div className="p-6 overflow-y-auto scrollbar-hide">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OrderModal;
