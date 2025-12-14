// src/components/ProtectedUserRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import WaveMirissaLoader from '../components/WaveMirissaLoader'

const ProtectedUserRoute = ({ children }) => {
  const { user, initializing } = useAuth();
  const location = useLocation();

  if (initializing) return <WaveMirissaLoader />;

  if (user?.role === 'SUSPEND' && location.pathname !== '/suspend') {
    return <Navigate to="/suspend" replace />;
  }

  return children;
};

export default ProtectedUserRoute;
