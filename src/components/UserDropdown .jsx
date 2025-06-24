import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserDropdown = () => {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Close dropdown if clicked outside
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
      {/* Clickable circle */}
      <div
        className="w-10 h-10 bg-[#1B4965] text-white rounded-full flex items-center justify-center text-lg font-semibold cursor-pointer"
        onClick={() => setShowMenu((prev) => !prev)}
      >
        {user?.username?.charAt(0).toUpperCase()}
      </div>

      {/* Dropdown Menu */}
      {showMenu && (
        <div className="absolute right-0 top-12 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
          <ul className="py-2 text-gray-700">
            <li>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  navigate('/profile');
                  setShowMenu(false);
                }}
              >
                My Profile
              </button>
            </li>
            <li>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  navigate('/orders');
                  setShowMenu(false);
                }}
              >
                My Orders
              </button>
            </li>
            <li>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  navigate('/wishlist');
                  setShowMenu(false);
                }}
              >
                Wishlist
              </button>
            </li>
            <li>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  navigate('/settings');
                  setShowMenu(false);
                }}
              >
                Settings
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
