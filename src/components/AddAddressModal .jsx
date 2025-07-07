import React from 'react';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';

const AddAddressModal = ({ onClose }) => {
  const [defaultShipping, setDefaultShipping] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="bg-white w-full max-w-3xl rounded-xl shadow-xl p-8 relative"
      >
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <FaTimes size={20} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-6">Add New Address</h2>

        {/* Country/Region */}
        <div className="mb-6">
          <label className="block font-medium text-sm mb-2">Country/region</label>
          <div className="flex items-center border rounded-lg p-2">
            <img
              src="https://flagcdn.com/w40/lk.png"
              alt="Sri Lanka"
              className="w-6 h-4 rounded mr-2"
            />
            <select className="w-full outline-none">
              <option>Sri Lanka</option>
              {/* More countries if needed */}
            </select>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mb-6">
          <label className="block font-medium text-sm mb-2">Contact information</label>
          <div className="grid grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Contact name*"
              className="col-span-2 border p-2 rounded-lg text-sm"
            />
            <div className="flex">
              <span className="flex items-center px-3 bg-gray-100 border border-r-0 rounded-l-lg text-sm text-gray-700">+94</span>
              <input
                type="text"
                placeholder="Mobile number*"
                className="flex-1 border rounded-r-lg p-2 text-sm"
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Please enter a contact name.</p>
        </div>

        {/* Address */}
        <div className="mb-6">
          <label className="block font-medium text-sm mb-2">Address</label>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <input type="text" placeholder="Street address*" className="border p-2 rounded-lg text-sm" />
            <input type="text" placeholder="Apt, suite, unit, etc (optional)" className="border p-2 rounded-lg text-sm" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            <select className="border p-2 rounded-lg text-sm">
              <option>Central</option>
            </select>
            <select className="border p-2 rounded-lg text-sm">
              <option>Kandy</option>
            </select>
            <select className="border p-2 rounded-lg text-sm">
              <option>Akurana</option>
            </select>
            <input type="text" placeholder="ZIP code*" className="border p-2 rounded-lg text-sm" />
          </div>
        </div>

        {/* Default Shipping */}
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            checked={defaultShipping}
            onChange={() => setDefaultShipping(!defaultShipping)}
            className="mr-2"
          />
          <label className="text-sm">Set as default shipping address</label>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button className="bg-red-500 text-white px-6 py-2 rounded-full font-medium hover:bg-red-600 transition">
            Confirm
          </button>
          <button
            onClick={onClose}
            className="border px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AddAddressModal;