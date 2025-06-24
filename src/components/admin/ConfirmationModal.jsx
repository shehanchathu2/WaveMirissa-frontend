import React from 'react';

const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4">{title || 'Confirm Action'}</h2>
        <p className="text-gray-700 mb-6">{message || 'Are you sure you want to proceed?'}</p>
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
