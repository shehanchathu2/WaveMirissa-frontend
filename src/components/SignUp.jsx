import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

const SignUp = ({ open, onClose, onSwitchToLogin }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validatePassword(form.password)) {
      setError('Password must be at least 8 characters and include uppercase, lowercase, number, and special character.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, {
        username: form.name,
        email: form.email,
        password: form.password,
      });

      if (response.status === 201) {
        setSuccess("Account created successfully! You can now login.");

        // Clear form fields immediately
        setForm({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });

        // Wait 1.5 seconds, then clear success, close modal and switch to login
        setTimeout(() => {
          setSuccess('');
          onClose();
          onSwitchToLogin();
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data || "Registration failed. Try again.");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-black/40 backdrop-blur-sm flex items-center justify-center"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="bg-white/80 backdrop-blur-lg rounded-lg shadow-lg p-8 w-[500px] relative"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-3 right-4 text-black text-4xl font-bold"
              onClick={onClose}
            >
              &times;
            </button>

            <h2 className="text-4xl font-bold text-center mb-2">Create Account</h2>
            <p className="text-center text-gray-600 mb-4">
              Join our exclusive jewelry collection
            </p>

            {error && <p className="text-red-600 text-center mb-3">{error}</p>}
            {success && <p className="text-green-600 text-center mb-3">{success}</p>}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${error.includes('Password') ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10`}
                  required
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/3 right-3 text-gray-600 cursor-pointer"
                >
                  {showPassword ? <VisibilityOff className='mb-20' /> : <Visibility className='mb-20' />}
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 8 characters with uppercase, lowercase, number, and special character.
                </p>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
                  required
                />
                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute top-8 right-3 text-gray-600 cursor-pointer"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1B4965] text-white py-2 rounded-lg font-semibold hover:bg-[#00426b] transition"
              >
                Create Account
              </button>
            </form>

            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="px-2 text-sm text-gray-500">Or continue with</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* <div className="flex space-x-3 mb-6">
              <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition">
                <GoogleIcon style={{ color: '#DB4437' }} />
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition">
                <FacebookIcon style={{ color: '#1877F2' }} />
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition">
                <AppleIcon style={{ color: 'black' }} />
              </button>
            </div> */}

            <p className="text-sm text-center text-gray-600">
              Already have an account?{' '}
              <button
                className="text-blue-600 hover:underline"
                onClick={() => {
                  onClose();
                  onSwitchToLogin();
                }}
              >
                Login
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignUp;
