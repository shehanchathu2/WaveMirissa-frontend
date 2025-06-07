import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsSignupOpen(false);
  };

  const openSignup = () => {
    setIsSignupOpen(true);
    setIsLoginOpen(false);
  };

  const closeModals = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(false);
  };

  const location = useLocation(); // get current path

  const links = [
    { to: '/', label: 'Home', exact: true },
    { to: '/shop', label: 'Shop' },
    { to: '/ai_suggetions', label: 'AI-Suggestions' },
    { to: '/virtual_try_on', label: 'VirtualTryOn' },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-9xl mx-auto px-8 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Tagline */}
          <div className="flex items-center space-x-2">
            <span className="text-blue-900 text-lg font-bold">Wave Mirrissa</span>
            <span className="text-gray-500 text-xs tracking-widest">
              | HANDCRAFTED JEWELRY
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8 relative">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.exact}
                className={({ isActive }) =>
                  isActive
                    ? 'relative text-teal-700 font-semibold'
                    : 'relative text-gray-700 hover:text-blue-600'
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="underline"
                        className="absolute left-0 right-0 -bottom-1 h-[2px] bg-teal-900 rounded"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Auth Buttons and Cart */}
          <div className="flex items-center space-x-4">
            <button
              onClick={openLogin}
              className="text-gray-700 hover:text-[#1b4765] focus:outline-none"
            >
              Login
            </button>

            <button
              onClick={openSignup}
              className="bg-[#1B4965] text-white rounded-md px-4 py-1 hover:bg-[#003e64] focus:outline-none"
            >
              Sign Up
            </button>

            <NavLink to="/cart" className="relative text-gray-700 hover:text-blue-600">
              <span className="absolute -top-1 -right-1 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
              <ShoppingCartOutlinedIcon className="text-gray-700 hover:text-gray-900" />
            </NavLink>
          </div>
        </div>
      </div>

      <Login open={isLoginOpen} onClose={closeModals} onSwitchToSignup={openSignup} />
      <SignUp open={isSignupOpen} onClose={closeModals} onSwitchToLogin={openLogin} />
    </nav>
  );
};

export default Navbar;
