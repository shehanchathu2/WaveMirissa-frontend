import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaHeart, FaCogs, FaSignOutAlt, FaBoxOpen } from 'react-icons/fa';

const UserDropdown = () => {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex items-center space-x-4" ref={dropdownRef}>
      <div
        className="w-10 h-10 bg-[#1B4965] text-white rounded-full flex items-center justify-center text-lg font-semibold cursor-pointer"
        onClick={() => setShowMenu((prev) => !prev)}
      >
        {user?.username?.charAt(0).toUpperCase()}
      </div>

      {showMenu && (
        <div className="absolute right-0 top-12 mt-2 w-56 bg-white border rounded-lg shadow-xl z-50">
          <ul className="py-2 text-gray-700 text-sm">
            <li>
              <button
                className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  navigate('/profile');
                  setShowMenu(false);
                }}
              >
                <FaUser className="text-[#1B4965]" /> My Profile
              </button>
            </li>
            <li>
              <button
                className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  navigate('/orders');
                  setShowMenu(false);
                }}
              >
                <FaBoxOpen className="text-[#1B4965]" /> My Orders
              </button>
            </li>
            <li>
              <button
                className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  navigate('/wishlist');
                  setShowMenu(false);
                }}
              >
                <FaHeart className="text-[#1B4965]" /> Wishlist
              </button>
            </li>
            <li>
              <button
                className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  navigate('/settings');
                  setShowMenu(false);
                }}
              >
                <FaCogs className="text-[#1B4965]" /> Settings
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 text-red-600"
              >
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
