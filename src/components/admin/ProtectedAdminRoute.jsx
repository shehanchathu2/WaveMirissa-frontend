import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import WaveMirissaLoader from '../WaveMirissaLoader';

const ProtectedAdminRoute = ({ children }) => {
  const { user, initializing } = useAuth();

  // Wait until AuthContext finishes restoring user
  if (initializing) {
    return <WaveMirissaLoader />;
  }

  // If no user → redirect to login instead of "/" 
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If user exists but is not ADMIN → block
  if (user.role?.toUpperCase() !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;