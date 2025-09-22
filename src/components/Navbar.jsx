import React, { useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import UserDropdown from './UserDropdown ';
import { useCart } from '../context/CartProvider';
import { Shell } from 'lucide-react';
import { useEffect } from 'react';

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  const { itemCount } = useCart();

  const { user } = useAuth();

  const lastScrollY = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        // scrolling down
        setShowNavbar(false);
      } else {
        // scrolling up
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <motion.nav
      className="bg-white shadow-sm fixed top-0 left-0 right-0 z-40 border-b border-gray-200"
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : -100 }} // hide on scroll down
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-9xl mx-10 px-8 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Tagline */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="group flex items-center space-x-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-10 h-10 bg-gradient-to-br from-slate-800 to-blue-900 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Shell className="w-6 h-6 text-white" />
                </div>
              </div>
              <span
                className="text-blue-900 text-xl font-bold group-hover:text-slate-800 transition-colors duration-300"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                Wave Mirrissa
              </span>
            </Link>
            {/* <span className="text-gray-500 text-xs tracking-widest">
              | HANDCRAFTED JEWELRY
            </span> */}
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
            {user ? (
              // If user is logged in, show user icon
              <UserDropdown />
            ) : (
              // If not logged in, show Login & Sign Up buttons
              <div className="flex items-center space-x-4">
                <button
                  onClick={openLogin}
                  className="text-gray-700 hover:text-[#1B4965] focus:outline-none cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={openSignup}
                  className="bg-[#1B4965] text-white rounded-xs px-4 py-1 hover:bg-[#003e64] focus:outline-none cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            )}

            <NavLink to="/cart" className="relative text-gray-700 hover:text-blue-600">
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center 
                     w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
                  {itemCount}
                </span>
              )}
              <ShoppingCartOutlinedIcon className="text-gray-700 hover:text-gray-900" />
            </NavLink>
          </div>
        </div>
      </div>

      <Login open={isLoginOpen} onClose={closeModals} onSwitchToSignup={openSignup} />
      <SignUp open={isSignupOpen} onClose={closeModals} onSwitchToLogin={openLogin} />
    </motion.nav>
  );
};

export default Navbar;
