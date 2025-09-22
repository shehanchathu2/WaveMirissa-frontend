
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

//import { Toaster } from 'react-hot-toast';


import { Toaster } from "react-hot-toast";

import { ToastContainer } from 'react-toastify';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Orders from './pages/admin/Orders';
import Users from './pages/admin/Users';
import Settings from './pages/admin/Settings';
import Customization from './pages/admin/Customization';
import Delivery from './pages/admin/Delivery';
import Payment from './pages/admin/Payment';
import Reports from './pages/admin/Reports';
import Content from './pages/admin/Content';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute';
import ProtectedUserRoute from './pages/ProtectedUserRoute';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import AI_Suggetion from './pages/AI_Suggetion';
import VirtualTryOn from './pages/VirtualTryOn';
import Cart from './pages/Cart';
import CheckoutPage from './pages/CheckoutPage';


import Myorders from './pages/Myorders';

import SuspendPage from './pages/SuspendPage';
import UserProfile from './pages/UserProfile';
import WishlistPage from './pages/WishlistPage';




const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <Toaster position="top-center" reverseOrder={false} />
      {!isAdminRoute && <Navbar />}
      <main className={!isAdminRoute ? "pt-16" : ""}>

        <Routes>


          {/* Public Routes */}
          <Route
            path="/"
            element={
              <ProtectedUserRoute>
                <Home />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/shop"
            element={
              <ProtectedUserRoute>
                <Shop />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/shop/product/:productId"
            element={
              <ProtectedUserRoute>
                <ProductDetail />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/ai_suggetions"
            element={
              <ProtectedUserRoute>
                <AI_Suggetion />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/virtual_try_on"
            element={
              <ProtectedUserRoute>
                <VirtualTryOn />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedUserRoute>
                <Cart />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedUserRoute>
                <CheckoutPage />
              </ProtectedUserRoute>
            }
          />

          <Route
            path="/wishlist"
            element={
              <ProtectedUserRoute>
                <WishlistPage />
              </ProtectedUserRoute>
            }
          />


          <Route path="/myorders" element={
            <ProtectedUserRoute>
              <Myorders />
            </ProtectedUserRoute>
          }
          />
          <Route path="/profile"
            element={
              <ProtectedUserRoute>
                <UserProfile />
              </ProtectedUserRoute>
            }
          />

          {/* Always accessible for suspended users */}
          <Route path="/suspend" element={<SuspendPage />} />

          {/* Admin Routes (Protected) */}
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminLayout />
              </ProtectedAdminRoute>
            }
          >

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
      </main>


      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
