import { Routes, Route, useLocation } from 'react-router-dom';
import React from 'react';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Orders from './pages/admin/Orders';
import Users from './pages/admin/Users';
import Settings from './pages/admin/Settings';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import AI_Suggetion from './pages/AI_Suggetion';
import VirtualTryOn from './pages/VirtualTryOn';
import Cart from './pages/Cart';

const App = () => {
  const location = useLocation();

  // Hide Navbar on admin pages
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/ai_suggetions" element={<AI_Suggetion />} />
        <Route path="/virtual_try_on" element={<VirtualTryOn />} />
        <Route path="/cart" element={<Cart />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
