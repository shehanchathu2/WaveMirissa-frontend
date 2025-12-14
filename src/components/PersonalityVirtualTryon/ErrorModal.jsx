import React from "react";

const ErrorModal = ({ message, onConfirm }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Oops!</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          onClick={onConfirm}
          className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
