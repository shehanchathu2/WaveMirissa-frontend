// src/components/SuspendedRedirect.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // adjust path to your auth context

const SuspendedRedirect = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  // If user is suspended and not already on /suspend page, redirect to it
  if (user?.role === 'suspended' && location.pathname !== '/suspend') {
    return <Navigate to="/suspend" replace />;
  }

  return children;
};

export default SuspendedRedirect;
