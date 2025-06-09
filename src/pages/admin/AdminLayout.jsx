// src/pages/admin/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-10 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
