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
import Customization from './pages/admin/Customization';
import Delivery from './pages/admin/Delivery';
import Payment from './pages/admin/Payment';
import Reports from './pages/admin/Reports';
import Content from './pages/admin/Content';
import ScrollToTopButton from './components/ScrollToTopButton';
import ProductDetail from './pages/ProductDetail';
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute';
import Footer from './components/Footer';
import CheckoutPage from './pages/CheckoutPage';
import { ToastContainer } from 'react-toastify';
import SuspendPage from './pages/SuspendPage';

const App = () => {
  const location = useLocation();

  // Hide Navbar on admin pages
  const isAdminRoute = location.pathname.startsWith('/admin');



  return (

    <>
      <ToastContainer position="top-right" autoClose={1000} />
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/product/:productId" element={<ProductDetail />} />
        <Route path="/ai_suggetions" element={<AI_Suggetion />} />
        <Route path="/virtual_try_on" element={<VirtualTryOn />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/suspend" element={<SuspendPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="customization" element={<Customization />} />
          <Route path="delivery" element={<Delivery />} />
          <Route path="payment" element={<Payment />} />
          <Route path="Reports" element={<Reports />} />
          <Route path="Content" element={<Content />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>

      {!isAdminRoute && <ScrollToTopButton />}
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
