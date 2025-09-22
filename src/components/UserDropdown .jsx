import { FaSignOutAlt } from 'react-icons/fa';
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import { User, ClipboardList, Heart, LogOut } from 'lucide-react';




const UserDropdown = () => {
  const { user, logout, isAdmin } = useAuth();
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
    <div className="relative flex items-center space-x-4 z-50" ref={dropdownRef}>

      {/* Clickable circle */}
      <div className='flex items-center p-2 space-x-1 cursor-pointer hover:bg-teal-100 rounded-3xl' onClick={() => setShowMenu((prev) => !prev)}>


      <div
        className="w-8 h-8 bg-[#1B4965] text-white rounded-full flex items-center justify-center text-lg font-semibold "
        
      >
        {user?.username?.charAt(0).toUpperCase()}
        
      </div>
       <span className="text-xs text-black " >▼</span>
      </div>

      {showMenu && (

        <div className="absolute right-0 z-50 w-56 bg-white border rounded-lg shadow-lg top-12">
         <div className='flex items-center px-4 py-1 space-x-1 border-b bg-teal-50'>
            <div
        className="w-8 h-8 bg-[#1B4965] text-white rounded-full flex items-center justify-center text-lg font-semibold "
        
      >
        {user?.username?.charAt(0).toUpperCase()}
        
      </div>
      <div>
          <span
               className="block w-full px-2 font-semibold text-left text-teal-800">
                {user?.username}</span>
                
                <span className='block w-full px-2 text-xs font-light text-left text-gray-500'>{user?.email}
              
              
            </span>
            </div>
            </div>
            
          <ul className="py-2 text-gray-700">
            
                
            <li>
              <button className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100" onClick={() => {
                  navigate('/profile');
                  setShowMenu(false);
                }}>
                <User className="w-5 h-5 mr-2 text-teal-700 " />
                My Profile

              </button>
              
            </li>
            <li>
              <button

                className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"

                onClick={() => {
                  navigate('/myorders');
                  setShowMenu(false);
                }}
              >

                <ClipboardList className="w-5 h-5 mr-2 text-teal-700 "/>
                My Orders

              </button>
            </li>
            <li>
              <button

                className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"

                onClick={() => {
                  navigate('/wishlist');
                  setShowMenu(false);
                }}
              >

                <Heart className="w-5 h-5 mr-2 text-teal-700 "/>
                Wishlist
              </button>
              <br></br>

            </li>
            <li>
              {isAdmin && (
                <button
                  onClick={() => navigate('/admin')}
                  className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 text-blue-600"
                >
                  <FaSignOutAlt /> Admin Panel
                </button>
              )}
            </li>
            <li>
              <button
                onClick={handleLogout}

                className="flex items-center w-full px-4 py-2 text-left border-t hover:bg-gray-100"
              >
                <LogOut className="w-5 h-5 mr-2 text-teal-700 "/>
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
