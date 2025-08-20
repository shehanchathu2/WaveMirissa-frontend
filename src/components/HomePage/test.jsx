// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FaMoneyCheckAlt } from 'react-icons/fa';
// import { FaMoneyCheckAlt } from 'react-icons/fa';
// import AddAddressModal from '../components/AddAddressModal ';
// import axios from 'axios';


// import Payment from '../components/Payment';




// const CheckoutPage = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const [orderID, setOrderID] = useState('');

//   const amount = 665.33;

//   return (
//     <div className="pb-10 bg-gray-100">
//       {/* Header */}
//       <div className="flex items-center justify-center px-10 py-6 mb-3 bg-white border-t border-gray-200">
//         <div className="text-center">
//           <h1 className="mb-2 text-2xl font-bold text-gray-800">Checkout</h1>
//           <p className="text-sm text-gray-600">You're just one step away from owning something special</p>
//         </div>
//       </div>
//       {/* Content */}
//       {/* ... keep your structured checkout UI here ... */}
//       {/* Payment Integration */}
//       <Payment
//         firstname="John"
//         lastname="Doe"
//         email="john@example.com"
//         paymentTitle="Car Luminous Tire Valve Caps"
//         amount={amount}
//         setPaymentSuccess={setPaymentSuccess}
//         setOrderID={setOrderID}
//       />
//     </div>
//   );
// };





// import React, { useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { FaArrowLeft } from 'react-icons/fa'; 
// import {
//   FaTachometerAlt,
//   FaBoxOpen,
//   FaShoppingCart,
//   FaPaintBrush,
//   FaTruck,
//   FaCreditCard,
//   FaChartBar,
//   FaUsers,
//   FaSignOutAlt,
//   FaChevronRight,
//   FaBars
// } from 'react-icons/fa';

// const Sidebar = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   const links = [
//     { to: '/admin', label: 'Dashboard', exact: true, icon: <FaTachometerAlt /> },
//     { to: '/admin/products', label: 'Products', icon: <FaBoxOpen /> },
//     { to: '/admin/orders', label: 'Orders', icon: <FaShoppingCart /> },
//     { to: '/admin/customization', label: 'Customization', icon: <FaPaintBrush /> },
//     { to: '/admin/delivery', label: 'Delivery & Tracking', icon: <FaTruck /> },
//     { to: '/admin/payment', label: 'Payment', icon: <FaCreditCard /> },
//     { to: '/admin/reports', label: 'Reports & Analytics', icon: <FaChartBar /> },
//     { to: '/admin/users', label: 'Users', icon: <FaUsers /> },
//   ];

//   const { logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const GoToHomePage = () => navigate('/');

//   return (
//     <aside
//       className={`relative flex-shrink-0 h-screen bg-gradient-to-br from-[#1b4765] via-[#1a4461] to-[#163b54] text-white flex flex-col shadow-2xl border-r border-[#2d5a7b]/30 overflow-scroll scrollbar-hide
//         transition-all duration-300 ${isCollapsed ? 'w-28' : 'w-72'}`}
//     >
//       {/* Toggle button */}
//       <button
//         className="absolute top-4 right-4 text-white p-1 hover:text-green-400 transition"
//         onClick={() => setIsCollapsed((prev) => !prev)}
//       >
//         <FaBars />
//       </button>

//       {/* Header */}
//       <div className={`px-8 py-8 flex items-center gap-3 mb-2 ${isCollapsed ? 'justify-center' : ''}`}>
//         <div className="w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center shadow-lg">
//           <span className="text-white font-bold text-lg">W</span>
//         </div>
//         {!isCollapsed && (
//           <div>
//             <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
//               Wave Mirrissa
//             </h2>
//             <p className="text-xs text-[#8bb5d1] font-medium">Admin Panel</p>
//           </div>
//         )}
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 px-2 space-y-1 mt-4">
//         {links.map((link, index) => (
//           <NavLink
//             key={link.to}
//             to={link.to}
//             end={link.exact}
//             className={({ isActive }) =>
//               `group relative flex items-center ${
//                 isCollapsed ? 'justify-center px-0' : 'gap-4 px-4'
//               } py-3.5 rounded-2xl transition-all duration-300 ease-out transform hover:scale-[1.02] ${
//                 isActive
//                   ? 'bg-gradient-to-r from-[#10B981] to-[#059669] text-white'
//                   : 'hover:bg-white/10 text-[#b8d4e6] hover:text-white backdrop-blur-sm'
//               }`
//             }
//             style={{ animationDelay: `${index * 100}ms` }}
//           >
//             <div className="flex items-center justify-center w-10 h-4">
//               <span className="text-lg transition-transform duration-300">{link.icon}</span>
//             </div>
//             {!isCollapsed && <span className="font-medium flex-1 transition-all duration-300">{link.label}</span>}
//             {!isCollapsed && <FaChevronRight className="text-xs transition-all duration-300" />}
//           </NavLink>
//         ))}
//       </nav>

//       {/* Footer */}
//       <div className={`px-6 py-8 border-t border-[#2d5a7b]/50 ${isCollapsed ? 'px-2' : ''}`}>
//         {!isCollapsed && (
//           <>
//             <button
//               className="group w-full flex items-center gap-3 px-4 py-3 mb-6 text-[#b8d4e6] hover:text-white transition-all duration-300 hover:bg-white/10 rounded-xl"
//               onClick={GoToHomePage}
//             >
//               <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors duration-300">
//                 <FaArrowLeft className="text-sm text-blue-600" />
//               </div>
//               Back to User Site
//             </button>

//             <button
//               className="group w-full flex items-center gap-3 px-4 py-3 mb-6 text-[#b8d4e6] hover:text-white transition-all duration-300 hover:bg-white/10 rounded-xl"
//               onClick={handleLogout}
//             >
//               <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/20 group-hover:bg-red-500/30 transition-colors duration-300">
//                 <FaSignOutAlt className="text-sm text-red-400" />
//               </div>
//               Logout
//             </button>

//             <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer group">
//               <div className="relative">
//                 <div className="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-2xl flex items-center justify-center shadow-lg">
//                   <span className="text-white font-bold text-lg">A</span>
//                 </div>
//                 <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-[#1b4765] rounded-full" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="font-semibold text-white truncate">Admin</p>
//               </div>
//             </div>
//           </>
//         )}
//         {isCollapsed && (
//           <div className="flex flex-col items-center gap-6">
//             <button onClick={GoToHomePage} className="text-[#b8d4e6] hover:text-white">
//               <FaArrowLeft className="text-lg" />
//             </button>
//             <button onClick={handleLogout} className="text-[#b8d4e6] hover:text-white">
//               <FaSignOutAlt className="text-lg" />
//             </button>
//             <div className="relative">
//               <div className="w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center shadow-lg">
//                 <span className="text-white font-bold">A</span>
//               </div>
//               <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-[#1b4765] rounded-full" />
//             </div>
//           </div>
//         )}
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;


// export default CheckoutPage;