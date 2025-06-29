import React from 'react';

const SuspendPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100">
      <div className="text-center p-10 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-red-600">Account Suspended</h1>
        <p className="mt-4 text-gray-700">
          Your account has been suspended. Please contact support for more information.
        </p>
      </div>
    </div>
  );
};

export default SuspendPage;
