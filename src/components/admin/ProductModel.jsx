
import React from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { y: '-50px', opacity: 0 },
  visible: { y: '0', opacity: 1 },
};

const ProductModal = ({ title, children, onClose }) => {
  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
        variants={modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <FiX size={24} />
        </button>
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="text-gray-700">{children}</div>
      </motion.div>
    </motion.div>
  );
};

export default ProductModal;
