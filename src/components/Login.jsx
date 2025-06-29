import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import WaveMirissaLoader from '../components/WaveMirissaLoader';


const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

const Login = ({ open, onClose, onSwitchToSignup }) => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
     const success = await login(email, password);
    if (success) {
    setEmail('');
    setPassword('');
    onClose(); // ✅ Close only if login is successful
  }// Close the modal after login
  };



  if (loading) return <WaveMirissaLoader />

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl p-10 w-[500px] relative"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-4 text-black text-3xl font-bold"
              onClick={onClose}
            >
              &times;
            </button>

            {/* Title */}
            <h2 className="text-4xl font-bold text-center mb-2">Login</h2>
            <p className="text-center text-gray-600 mb-6">
              Sign in to continue your jewelry journey
            </p>

            {error && (
              <div className="text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded mb-4 text-sm">
                {error}
              </div>
            )}
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <div className="flex justify-between items-center text-sm text-gray-500 mt-1">
                  <div>
                    <input type="checkbox" className="mr-1" />
                    Must be at least 8 characters
                  </div>
                  <button type="button" className="text-blue-600 hover:underline">
                    Forgot password?
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1B4965] text-white py-2 rounded-lg font-semibold hover:bg-[#024169] transition"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="px-2 text-sm text-gray-500">Or continue with</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Social Buttons */}
            <div className="flex space-x-3">
              <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition">
                <GoogleIcon style={{ color: '#DB4437' }} />
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition">
                <FacebookIcon style={{ color: '#1877F2' }} />
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition">
                <AppleIcon style={{ color: 'black' }} />
              </button>
            </div>

            {/* Sign up link */}
            <p className="text-sm text-center text-gray-600 mt-6">
              Not a member?{' '}
              <button
                className="text-blue-600 hover:underline"
                onClick={() => {
                  onClose();
                  onSwitchToSignup();
                }}
              >
                Create an account
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Login;
