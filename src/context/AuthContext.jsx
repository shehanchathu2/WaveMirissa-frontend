import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [initializing, setInitializing] = useState(true); // for checking localStorage on load
  const [loading, setLoading] = useState(false); // for login/logout actions
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    // Simulate re-authentication delay if needed
    setTimeout(() => {
      setInitializing(false); // done checking localStorage
    }, 200); // Optional delay for smoother UI
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/authentication`, {
        email,
        password,
      });

      const loggedInUser = response.data;
      setUser(loggedInUser);
      console.log(loggedInUser)
      localStorage.setItem('user', JSON.stringify(loggedInUser));

      if (loggedInUser.role === 'ADMIN') {
        navigate('/admin');
        toast.success('Admin login successful!');
      } else if(loggedInUser.role === 'USER'){
        navigate('/');
        toast.success('Login successful!');
      } else {
        navigate('/suspend');
        toast.success('Login successful!');
      }

      return true;
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password');
      toast.error('Invalid email or password');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = user?.role === 'ADMIN';

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
    toast.success('Logout successful!');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        initializing,
        isAdmin,
        isAuthenticated: !!user,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);