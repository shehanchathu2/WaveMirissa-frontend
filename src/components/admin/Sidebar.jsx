// src/components/admin/Sidebar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaArrowLeft } from 'react-icons/fa'; // or use FaHome
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingCart,
  FaPaintBrush,
  FaTruck,
  FaCreditCard,
  FaChartBar,
  FaFileAlt,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaChevronRight
} from 'react-icons/fa';

const Sidebar = () => {
  const links = [
    { to: '/admin', label: 'Dashboard', exact: true, icon: <FaTachometerAlt /> },
    { to: '/admin/products', label: 'Products', icon: <FaBoxOpen /> },
    { to: '/admin/orders', label: 'Orders', icon: <FaShoppingCart /> },
    { to: '/admin/customization', label: 'Customization', icon: <FaPaintBrush /> },
    { to: '/admin/delivery', label: 'Delivery & Tracking', icon: <FaTruck /> },
    { to: '/admin/payment', label: 'Payment', icon: <FaCreditCard /> },
    { to: '/admin/reports', label: 'Reports & Analytics', icon: <FaChartBar /> },
    // { to: '/admin/content', label: 'Content', icon: <FaFileAlt /> },
    { to: '/admin/users', label: 'Users', icon: <FaUsers /> },
    // { to: '/admin/settings', label: 'Settings', icon: <FaCog /> },
  ];

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const GoToHomePage = () => {
    navigate('/');
  };

  return (

    <aside className="relative flex-shrink-0 h-screen w-72 bg-gradient-to-br from-[#1b4765] via-[#1a4461] to-[#163b54] text-white flex flex-col shadow-2xl border-r border-[#2d5a7b]/30 overflow-scroll scrollbar-hide">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-[#10B981]/20 to-transparent rounded-full blur-xl" />

      {/* Header Section */}
      <div className="px-8 py-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">W</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Wave Mirrissa
            </h2>
            <p className="text-xs text-[#8bb5d1] font-medium">Admin Panel</p>
          </div>
        </div>

        {/* Elegant divider */}
        <div className="mt-6 relative">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#3d6b8a] to-transparent" />
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#10B981] rounded-full shadow-lg shadow-[#10B981]/50" />
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 px-6 space-y-1">
        {links.map((link, index) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.exact}
            className={({ isActive }) =>
              `group relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ease-out transform hover:scale-[1.02] ${isActive
                ? 'bg-gradient-to-r from-[#10B981] to-[#059669] text-white '
                : 'hover:bg-white/10 text-[#b8d4e6] hover:text-white backdrop-blur-sm'
              }`
            }
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Active indicator */}
            <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full transition-all duration-300 ${({ isActive }) => isActive ? 'opacity-100 ' : 'opacity-0 '
              }`} />

            {/* Icon container */}
            <div className={`flex items-center justify-center w-10 h-4 rounded-xl transition-all duration-300 ${({ isActive }) => isActive
              ? 'bg-white/20 shadow-inner'
              : 'group-hover:bg-white/10'
              }`}>
              <span className="text-lg transition-transform duration-300 group-hover:scale-110">
                {link.icon}
              </span>
            </div>

            {/* Label */}
            <span className="font-medium flex-1 transition-all duration-300">
              {link.label}
            </span>

            {/* Arrow indicator */}
            <FaChevronRight className={`text-xs transition-all duration-300 ${({ isActive }) => isActive
              ? 'opacity-100 transform translate-x-0'
              : 'opacity-0 transform -translate-x-2 group-hover:opacity-70 group-hover:translate-x-0'
              }`} />
          </NavLink>
        ))}
      </nav>

      {/* Footer Section */}
      <div className="px-6 py-8 border-t border-[#2d5a7b]/50 bg-gradient-to-t from-black/10 to-transparent">
        {/* Logout Button */}
        <button className="group w-full flex items-center gap-3 px-4 py-3 mb-6 text-[#b8d4e6] hover:text-white transition-all duration-300 hover:bg-white/10 rounded-xl
         " onClick={handleLogout}>
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/20 group-hover:bg-red-500/30 transition-colors duration-300">
            <FaSignOutAlt className="text-sm text-red-400" />
          </div>
          Logout
        </button>



        <button
          className="group w-full flex items-center gap-3 px-4 py-3 mb-6 text-[#b8d4e6] hover:text-white transition-all duration-300 hover:bg-white/10 rounded-xl"
          onClick={GoToHomePage}
        >
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors duration-300">
            <FaArrowLeft className="text-sm text-blue-600" />
          </div>
          Back to User Site
        </button>



        {/* User Profile */}
        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer group">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-[#1b4765] rounded-full" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-white truncate">Admin</p>
            {/* <p className="text-xs text-[#8bb5d1] group-hover:text-[#10B981] transition-colors duration-300">
              View profile →
            </p> */}
          </div>
        </div>
      </div>

      {/* Bottom decorative element */}
      {/* <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" /> */}
    </aside>
  );
};

export default Sidebar;