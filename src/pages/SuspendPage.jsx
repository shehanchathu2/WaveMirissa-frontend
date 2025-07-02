import React from 'react';
import { MdBlock, MdEmail, MdPhone, MdSupportAgent } from 'react-icons/md';

const SuspendPage = () => {
  return (
    <div className="min-h-screen bg-red-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-xl shadow-md p-6 space-y-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <MdBlock className="text-red-500 text-3xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mt-4">Account Suspended</h1>
          <p className="text-sm text-gray-600 mt-2">
            Your account has been temporarily suspended due to unusual activity.
            Please contact support to restore access.
          </p>
        </div>

        <div className="border-t pt-4">
          <h2 className="text-sm font-medium text-gray-700 mb-2 text-center">Contact Support</h2>
          <div className="space-y-3">
            <a
              href="mailto:support@company.com"
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-100"
            >
              <MdEmail className="text-blue-500 text-xl" />
              <span className="text-sm text-gray-800">support@company.com</span>
            </a>
            <a
              href="tel:+1234567890"
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-100"
            >
              <MdPhone className="text-green-500 text-xl" />
              <span className="text-sm text-gray-800">+1 (234) 567-8900</span>
            </a>
          </div>
        </div>

        <button
          className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
        >
          <div className="flex justify-center items-center gap-2">
            <MdSupportAgent className="text-lg" />
            Get Help Now
          </div>
        </button>

        <div className="text-center text-xs text-gray-400 pt-4 border-t">
          Account ID: USR-{Math.random().toString(36).substr(2, 9).toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default SuspendPage;