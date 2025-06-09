// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const links = [
    { to: '/admin', label: 'Dashboard', exact: true },
    { to: '/admin/products', label: 'Products' },
    { to: '/admin/orders', label: 'Orders' },
    { to: '/admin/users', label: 'Users' },
    { to: '/admin/settings', label: 'Settings' },
  ];

  return (
    <aside className="h-screen w-64 bg-[#111827] text-white flex flex-col justify-between px-6 py-8 shadow-md">
      <div>
        <h2 className="text-2xl font-bold mb-8">AdminPanel.IO</h2>
        <nav className="space-y-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.exact}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-all ${
                  isActive ? 'bg-[#10B981] text-white' : 'hover:bg-gray-700 text-gray-300'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="border-t border-gray-700 pt-6">
        <button className="w-full text-left text-gray-400 hover:text-white">Logout</button>
        <div className="mt-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-600 rounded-full" />
          <div>
            <p className="text-sm font-semibold">Tanzir Rahman</p>
            <p className="text-xs text-gray-400">View profile</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
