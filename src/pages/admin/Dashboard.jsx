// src/pages/admin/Dashboard.jsx
import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-500">Welcome to the admin panel.</p>
      </div>

      {/* Example Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-2xl p-6">
          <h3 className="text-sm text-gray-500 mb-2">Total Revenue</h3>
          <p className="text-xl font-bold text-gray-800">$240,399</p>
        </div>
        <div className="bg-white shadow rounded-2xl p-6">
          <h3 className="text-sm text-gray-500 mb-2">New Users</h3>
          <p className="text-xl font-bold text-gray-800">2,349</p>
        </div>
        <div className="bg-white shadow rounded-2xl p-6">
          <h3 className="text-sm text-gray-500 mb-2">Orders Today</h3>
          <p className="text-xl font-bold text-gray-800">187</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
