// src/components/EmailModal.jsx
import React from 'react';

const SendEmailModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg relative">
        <h2 className="text-2xl font-semibold mb-4">Send Order Email</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Customer Name</label>
            <input
              type="text"
              value={data.name}
              readOnly
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Customer Email</label>
            <input
              type="email"
              value={data.email}
              readOnly
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Order ID</label>
            <input
              type="text"
              value={data.id}
              readOnly
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Order Details</label>
            <textarea
              value={data.details}
              readOnly
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Send
            </button>
          </div>
        </form>

        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl">
          &times;
        </button>
      </div>
    </div>
  );
};

export default SendEmailModal;
