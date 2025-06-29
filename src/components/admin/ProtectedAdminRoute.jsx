import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import WaveMirissaLoader from '../WaveMirissaLoader'; // Your custom loader

const ProtectedAdminRoute = ({ children }) => {
  const { user, initializing } = useAuth();

  // Wait for AuthContext to finish loading user from localStorage
  if (initializing) {
    return <WaveMirissaLoader />;
  }

  // Redirect non-admin users
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
