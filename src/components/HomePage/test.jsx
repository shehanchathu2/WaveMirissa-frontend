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












// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { AnimatePresence } from 'framer-motion';
// import AddProductModal from '../../components/admin/AddProductModel';
// import EditProductModal from '../../components/admin/EditProductModal';
// import { toast } from 'react-toastify';
// import ProductModel from '../../components/admin/ProductModel';
// import WaveMirissaLoader from '../../components/WaveMirissaLoader';
// import ConfirmationModal from '../../components/admin/ConfirmationModal';

// const Products = () => {
//   const [modalContent, setModalContent] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editProduct, setEditProduct] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get('http://localhost:8080/product/Allproducts');
//       setProducts(res.data);
//       console.log(res.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       toast.error('Failed to fetch products.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [itemToDelete, setItemToDelete] = useState(null);

//   const openDeleteModal = (itemId) => {
//     console.log('itemId passed to openDeleteModal:', itemId);
//     setItemToDelete(itemId);
//     setIsModalOpen(true);
//   };


//   const confirmDelete = async () => {
//     if (!itemToDelete) {
//       toast.error('No product selected for deletion.');
//       return;
//     }

//     try {
//       await axios.delete(`http://localhost:8080/product/delete/${itemToDelete}`);
//       fetchProducts();
//       toast.success('Product deleted successfully!');
//     } catch (error) {
//       toast.error('Failed to delete product!');
//     } finally {
//       setIsModalOpen(false);
//       setItemToDelete(null);
//     }
//   };


//   const cancelDelete = () => {
//     setIsModalOpen(false);
//     setItemToDelete(null);
//   };


//   const handleProductAdded = (newProduct) => {
//     setProducts((prev) => [...prev, newProduct]);
//     toast.success('Product added successfully!');
//   };

//   if (loading) return <WaveMirissaLoader />;

//   return (
//     <div className="p-6 bg-[#f9fbfd]">
//       <h1 className="text-3xl font-bold mb-4">Manage Products</h1>
//       <p className="text-gray-600 mb-6">Here you can add, edit, or delete products.</p>

//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded mb-6 hover:bg-blue-600 transition"
//         onClick={() => setShowModal(true)}
//       >
//         Add Product
//       </button>

//       <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//         <thead>
//           <tr className="bg-[#f9fafb] text-gray-700 text-sm uppercase tracking-wider">
//             <th className="px-6 py-3 text-left">Num</th>
//             <th className="px-6 py-3 text-left">Name</th>
//             <th className="px-6 py-3 text-left">Category</th>
//             <th className="px-6 py-3 text-left">Price</th>
//             <th className="px-6 py-3 text-center">Type</th>
//             <th className="px-6 py-3 text-center">Product Details</th>
//             <th className="px-6 py-3 text-center">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product, index) => (
//             <tr
//               key={product.product_id}
//               className="border-b hover:bg-gray-50 transition duration-200"
//             >
//               <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
//               <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
//               <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
//               <td className="px-6 py-4 text-sm text-gray-600">Rs {product.price}</td>
//               <td className="px-6 py-4 text-sm text-center">
//                 <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${product.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                   {product.producttype}
//                 </span>
//               </td>
//               <td className="px-6 py-4 text-sm text-gray-600">
//                 <button
//                   onClick={() =>
//                     setModalContent({
//                       title: 'Product Details',
//                       content: (
//                         <div className="space-y-4">
//                           <div className="flex justify-center mb-6 gap-4">
//                             {[product.image_url1, product.image_url2, product.image_url3].map(
//                               (url, i) =>
//                                 url && (
//                                   <div key={i} className="w-24 h-24 rounded-lg overflow-hidden border-2 border-gray-200 shadow-sm">
//                                     <img
//                                       src={url}
//                                       alt={`${product.name} ${i + 1}`}
//                                       className="w-full h-full object-cover"
//                                     />
//                                   </div>
//                                 )
//                             )}
//                           </div>
//                           <div className="grid grid-cols-1 gap-3">
//                             <div className="bg-gray-50 p-3 rounded-md">
//                               <span className="text-sm font-semibold text-gray-800 block mb-1">Product Name</span>
//                               <span className="text-gray-700">{product.name}</span>
//                             </div>
//                             <div className="grid grid-cols-2 gap-3">
//                               <div className="bg-gray-50 p-3 rounded-md">
//                                 <span className="text-sm font-semibold text-gray-800 block mb-1">Category</span>
//                                 <span className="text-gray-700">{product.category}</span>
//                               </div>
//                               <div className="bg-gray-50 p-3 rounded-md">
//                                 <span className="text-sm font-semibold text-gray-800 block mb-1">Gender</span>
//                                 <span className="text-gray-700">{product.gender}</span>
//                               </div>
//                             </div>
//                             <div className="grid grid-cols-2 gap-3">
//                               <div className="bg-gray-50 p-3 rounded-md">
//                                 <span className="text-sm font-semibold text-gray-800 block mb-1">Material</span>
//                                 <span className="text-gray-700">{product.material}</span>
//                               </div>
//                              <div className="bg-gray-50 p-3 rounded-md">
//                               <span className="text-sm font-semibold text-gray-800 block mb-1">Customization</span>
//                               <span className="text-gray-700">{product.customization}</span>
//                             </div>
//                             </div>
                            
//                             <div className="bg-gray-50 p-3 rounded-md">
//                               <span className="text-sm font-semibold text-gray-800 block mb-1">Description</span>
//                               <p className="text-gray-700 leading-relaxed">{product.description}</p>
//                             </div>

//                             <div className="grid grid-cols-2 gap-3">
//                               <div className="bg-gray-50 p-3 rounded-md">
//                                 <span className="text-sm font-semibold text-gray-800 block mb-1">Face Shape</span>
//                                 <p className="text-gray-700 leading-relaxed">{product.faceShapeTags}</p>
//                               </div>
//                                <div className="bg-gray-50 p-3 rounded-md">
//                                 <span className="text-sm font-semibold text-gray-800 block mb-1">Skine Tone</span>
//                                 <span className="text-gray-700 font-medium">{product.skinToneTags}</span>
//                               </div>
//                             </div>

//                           </div>
//                         </div>
//                       )
//                     })
//                   }
//                   className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow-sm"
//                 >
//                   See Info
//                 </button>
//               </td>
//               <td className="px-6 py-4 text-center space-x-2">
//                 <button
//                   className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
//                   onClick={() => setEditProduct(product)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
//                   onClick={() => openDeleteModal(product.product_id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <AnimatePresence>
//         {showModal && (
//           <AddProductModal
//             onClose={() => setShowModal(false)}
//             onProductAdded={handleProductAdded}
//           />
//         )}
//       </AnimatePresence>

//       {editProduct && (
//         <EditProductModal
//           isOpen={!!editProduct}
//           onClose={() => setEditProduct(null)}
//           product={editProduct}
//           onUpdate={fetchProducts}
//         />
//       )}

//       <ConfirmationModal
//         isOpen={isModalOpen}
//         title="Delete Item"
//         message="Are you sure you want to remove this item from your cart?"
//         onConfirm={confirmDelete}
//         onCancel={cancelDelete}
//       />

//       {modalContent && (
//         <ProductModel title={modalContent.title} onClose={() => setModalContent(null)}>
//           {modalContent.content}
//         </ProductModel>
//       )}
//     </div>
//   );
// };

// export default Products;



// import React, { useEffect, useState } from "react";
// import AddCustomizationModal from "../../components/admin/AddCustomizationModel";
// import EditCustomizationModal from "../../components/admin/EditCustomizationModal";
// import axios from "axios";
// import WaveMirissaLoader from "../../components/WaveMirissaLoader";

// const Customization = () => {
//   const [data, setData] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editItem, setEditItem] = useState(null);
//   const [loading,setLoading] = useState(false)

//   const fetchData = async () => {
//     setLoading(true)
//     try {
//       const res = await axios.get("http://localhost:8080/AllCustomizations");
//       setData(res.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       alert("Failed to fetch products.");
//     } finally {
//       setLoading(false)
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   if(loading) return <WaveMirissaLoader/>


//   const handleModalSubmit = async () => {
//     await fetchData();
//     setIsModalOpen(false);
//   };

//   const handleEdit = (item) => {
//     setEditItem(item);
//     setIsEditModalOpen(true);
//   };

//   const handleUpdateComplete = async () => {
//     await fetchData();
//     setIsEditModalOpen(false);
//     setEditItem(null);
//   };

//   const handleDeleteProduct = async (item_id) => {
//     if (!window.confirm("Are you sure you want to delete this customization?")) return;

//     try {
//       await axios.delete(`http://localhost:8080/Customizations/delete/${item_id}`);
//       fetchData();
//       alert("Deleted the customization.");
//     } catch (error) {
//       console.error("Error deleting item:", error);
//       alert("Failed to delete the customization.");
//     }
//   };

//   return (
//     <div className="p-6 bg-[#f9fbfd]">
//       <h1 className="text-3xl font-bold mb-4">Customization</h1>
//       <p className="text-gray-600 mb-6">
//         Here you can add, edit, or delete products.
//       </p>

//       <button
//         onClick={() => setIsModalOpen(true)}
//         className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition"
//       >
//         Add Customization
//       </button>

//       <div className="mt-8 overflow-x-auto">
//         <table className="min-w-full border border-gray-200 shadow-sm rounded-lg overflow-hidden">
//           <thead className="bg-gray-100 text-sm font-semibold text-gray-700">
//             <tr>
//               <th className="px-4 py-3 text-left">Num</th>
//               <th className="px-4 py-3 text-left">Image</th>
//               <th className="px-4 py-3 text-left">Name</th>
//               <th className="px-4 py-3 text-left">Price (Rs)</th>
//               <th className="px-4 py-3 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200 bg-white">
//             {data.map((item, index) => (
//               <tr key={item.item_id} className="hover:bg-gray-50 transition">
//                 <td className="px-4 py-3 text-sm text-gray-700">{++index}</td>
//                 <td className="px-4 py-3">
//                   <img
//                     src={item.imageUrl}
//                     alt={item.name}
//                     className="h-12 w-12 rounded-md object-cover border"
//                   />
//                 </td>
//                 <td className="px-4 py-3 text-sm text-gray-800">{item.name}</td>
//                 <td className="px-4 py-3 text-sm text-gray-800">Rs. {item.price}</td>
//                 <td className="px-4 py-3">
//                   <div className="flex justify-center space-x-2">
//                     <button
//                       className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm shadow"
//                       onClick={() => handleEdit(item)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm shadow"
//                       onClick={() => handleDeleteProduct(item.item_id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <AddCustomizationModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSubmit={handleModalSubmit}
//       />

//       <EditCustomizationModal
//         isOpen={isEditModalOpen}
//         customization={editItem}
//         onClose={() => setIsEditModalOpen(false)}
//         onUpdate={handleUpdateComplete}
//       />
//     </div>
//   );
// };

// export default Customization;


// // src/pages/admin/Users.jsx
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import EditUserModal from '../../components/admin/EditUserModal';
// import WaveMirissaLoader from '../../components/WaveMirissaLoader';

// const Users = () => {

//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [users, setUsers] = useState([])
//   const [loading, setLoading] = useState(false)


//   // const getAllUsers = async () => {
//   //   setLoading(true)
//   //   try {
//   //     const res = await axios.get("http://localhost:8080/users");
//   //     const onlyUsers = res.data.filter((u) => u.role === "USER");
//   //     setUsers(res.data);
//   //     console.log(onlyUsers);
//   //   } catch (error) {
//   //     console.error('Error fetching users:', error);
//   //     alert('Failed to fetch users.');
//   //   } finally {
//   //     setLoading(false)
//   //   }
//   // };


//   const getAllUsers = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("http://localhost:8080/users");
//       const onlyUsers = res.data.filter((u) => u.role === "USER" || u.role === "ADMIN");

//       // Preserve order by id (or any stable key)
//       setUsers((prev) => {
//         const prevOrder = prev.map((u) => u.id);
//         return onlyUsers.sort(
//           (a, b) => prevOrder.indexOf(a.id) - prevOrder.indexOf(b.id)
//         );
//       });
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       alert("Failed to fetch users.");
//     } finally {
//       setLoading(false);
//     }
//   };



//   useEffect(() => {
//     getAllUsers();
//   }, []);

//   const handleDeleteUser = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this User?");
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`http://localhost:8080/user/${id}`);
//       setUsers((prev) => prev.filter((u) => u.id !== id));
//       getAllUsers();
//       toast.success("User deleted successfully!");
//     } catch (error) {
//       toast.error("Failed to delete user!");
//       // alert("Failed to delete product.");
//     }
//   };

//   if (loading) return <WaveMirissaLoader />;
//   return (
//     <div className="p-6 bg-[#f9fbfd]">
//       <h1 className="text-3xl font-bold mb-4">Manage Users</h1>
//       <p className="text-gray-600">View and manage registered users here.</p>

//       <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//         <thead>
//           <tr className="bg-[#f1f5f9] text-gray-700 text-sm uppercase tracking-wider">
//             <th className="px-6 py-3 text-left">Num</th>
//             <th className="px-6 py-3 text-left">Name</th>
//             <th className="px-6 py-3 text-left">Email</th>
//             <th className="px-6 py-3 text-left">Role</th>
//             <th className="px-6 py-3 text-center">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u, index) => (
//             <tr
//               key={u.id}
//               className="border-b hover:bg-gray-50 transition duration-200"
//             >
//               <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
//               <td className="px-6 py-4 text-sm font-medium text-gray-900">{u.username}</td>
//               <td className="px-6 py-4 text-sm text-gray-600">{u.email}</td>
//               <td className="px-6 py-4 text-sm text-gray-600">{u.role}</td>
//               <td className="px-6 py-4 text-center space-x-2">
//                 <button
//                   className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md text-sm"
//                   onClick={() => {
//                     setSelectedUser(u);
//                     setShowEditModal(true);
//                   }}
//                 >
//                   Edit
//                 </button>

//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <EditUserModal
//         isOpen={showEditModal}
//         onClose={() => setShowEditModal(false)}
//         user={selectedUser}
//         onUpdated={() => {
//           setShowEditModal(false);
//           getAllUsers(); //
//         }}
//       />
//     </div>
//   );
// };

// export default Users;








// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Payment = ({
//   firstname,
//   lastname,
//   email,
//   paymentTitle,
//   amount,
//   setPaymentSuccess,
//   setOrderID,
//   selectedItems,
// }) => {
//   const [payData, setPayData] = useState(null);
//   const [scriptLoaded, setScriptLoaded] = useState(false);

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://www.payhere.lk/lib/payhere.js';
//     script.onload = () => setScriptLoaded(true);
//     document.body.appendChild(script);
//     return () => document.body.removeChild(script);
//   }, []);

//   useEffect(() => {
//     const fetchHash = async () => {
//       try {
//         const res = await axios.get('http://localhost:8080/api/payhere/hash', {
//           params: { amount: parseFloat(amount).toFixed(2) },
//         });
//         setPayData(res.data);
//       } catch (err) {
//         console.error('Error fetching payment hash', err);
//       }
//     };
//     fetchHash();
//   }, [amount]);

//   useEffect(() => {
//     if (scriptLoaded && window.payhere) {
//       window.payhere.onCompleted = (orderId) => {
//         console.log('Payment completed:', orderId);
//         setPaymentSuccess(true);
//         setOrderID(orderId);
//       };

//       window.payhere.onDismissed = () => {
//         console.log('Payment dismissed');
//       };

//       window.payhere.onError = (error) => {
//         console.error('Payment error:', error);
//       };
//     }
//   }, [scriptLoaded]);

//   const pay = () => {
//     if (!payData || !scriptLoaded || !window.payhere) {
//       console.error('Payment data or script not ready');
//       return;
//     }

//    const payment = {
//       sandbox: true,
//       merchant_id: '1231066',
//       return_url: 'https://www.example.com/success',
//       cancel_url: 'https://www.example.com/cancel',
//       notify_url: 'https://e3e4-192-248-93-25.ngrok-free.app/auth/notify',
//       order_id: payData.orderId,
//       items: paymentTitle,
//       amount: payData.amount,
//       currency: 'LKR',
//       hash: payData.hash,
//       first_name: firstname,
//       last_name: lastname,
//       email: email,
//       phone: '0765424122',
//       address: 'No.1, Galle Road',
//       city: 'Colombo',
//       country: 'Sri Lanka',
//     };

//     window.payhere.startPayment(payment);
//   };

//   return (
//     <button
//       onClick={pay}
//       disabled={!payData || !scriptLoaded}
//       className={`w-full py-3 rounded-xl font-medium transition-colors ${!payData || !scriptLoaded
//         ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
//         : 'bg-blue-600 text-white hover:bg-blue-700'
//         }`}
//     >
//       Pay with PayHere
//     </button>
//   );
// };


// export default Payment;






// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Payment = ({
//   firstname,
//   lastname,
//   email,
//   paymentTitle,
//   amount,
//   setPaymentSuccess,
//   setOrderID,
//   selectedItems,
// }) => {
//   const [payData, setPayData] = useState(null);
//   const [scriptLoaded, setScriptLoaded] = useState(false);

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://www.payhere.lk/lib/payhere.js';
//     script.onload = () => setScriptLoaded(true);
//     document.body.appendChild(script);
//     return () => document.body.removeChild(script);
//   }, []);

//   useEffect(() => {
//     const fetchHash = async () => {
//       try {
//         const res = await axios.get('http://localhost:8080/api/payhere/hash', {
//           params: { amount: parseFloat(amount).toFixed(2) },
//         });
//         setPayData(res.data);
//       } catch (err) {
//         console.error('Error fetching payment hash', err);
//       }
//     };
//     fetchHash();
//   }, [amount]);

//   useEffect(() => {
//     if (scriptLoaded && window.payhere) {
//       window.payhere.onCompleted = (orderId) => {
//         console.log('Payment completed:', orderId);
//         setPaymentSuccess(true);
//         setOrderID(orderId);
//       };

//       window.payhere.onDismissed = () => {
//         console.log('Payment dismissed');
//       };

//       window.payhere.onError = (error) => {
//         console.error('Payment error:', error);
//       };
//     }
//   }, [scriptLoaded]);

//   const pay = () => {
//     if (!payData || !scriptLoaded || !window.payhere) {
//       console.error('Payment data or script not ready');
//       return;
//     }

//    const payment = {
//       sandbox: true,
//       merchant_id: '1231066',
//       return_url: 'https://www.example.com/success',
//       cancel_url: 'https://www.example.com/cancel',
//       notify_url: 'https://e3e4-192-248-93-25.ngrok-free.app/auth/notify',
//       order_id: payData.orderId,
//       items: paymentTitle,
//       amount: payData.amount,
//       currency: 'LKR',
//       hash: payData.hash,
//       first_name: firstname,
//       last_name: lastname,
//       email: email,
//       phone: '0765424122',
//       address: 'No.1, Galle Road',
//       city: 'Colombo',
//       country: 'Sri Lanka',
//     };

//     window.payhere.startPayment(payment);
//   };

//   return (
//     <button
//       onClick={pay}
//       disabled={!payData || !scriptLoaded}
//       className={`w-full py-3 rounded-xl font-medium transition-colors ${!payData || !scriptLoaded
//         ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
//         : 'bg-blue-600 text-white hover:bg-blue-700'
//         }`}
//     >
//       Pay with PayHere
//     </button>
//   );
// };

// export default Payment;