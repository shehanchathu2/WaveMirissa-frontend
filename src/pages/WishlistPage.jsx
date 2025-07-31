import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiTrash2 } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ConfirmationModal from "../components/admin/ConfirmationModal";

const WishlistPage = () => {
    const { user } = useAuth();
    const [wishlist, setWishlist] = useState([]);
      const [showModal, setShowModal] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                if (!user?.id) return;
                const res = await axios.get(`http://localhost:8080/wishlist/${user.id}/products`);
                setWishlist(res.data);
            } catch (err) {
                console.error("Failed to fetch wishlist", err);
            }
        };

        fetchWishlist();
    }, [user?.id]);

     const confirmRemove = (productId) => {
    setPendingDeleteId(productId);
    setShowModal(true);
  };


   const handleRemove = async () => {
    try {
      await axios.delete("http://localhost:8080/wishlist/remove", {
        params: { userId: user.id, productId: pendingDeleteId },
      });
      setWishlist((prev) => prev.filter((item) => item.product_id !== pendingDeleteId));
      toast.success("Removed from wishlist!");
    } catch (err) {
      console.error("Remove failed", err);
      toast.error("Error removing item");
    } finally {
      setShowModal(false);
      setPendingDeleteId(null);
    }
    };
    
      const cancelRemove = () => {
    setShowModal(false);
    setPendingDeleteId(null);
  };


    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.12,
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.96 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    };

    if (!user?.id) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#1b4765] to-[#2e6a91] rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Authentication Required</h2>
                    <p className="text-gray-600">Please log in to view your wishlist and saved items.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
        

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
                    <div className="absolute top-20 -left-20 w-60 h-60 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/3 w-32 h-32 bg-white rounded-full blur-2xl" />
                </div>


                <div className="text-center py-5 bg-white border-b border-t border-gray-200">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Your Wishlist
                        </h1>
                        <p className="text-sm text-gray-600 mt-2">
                            Curate your dreams, save your favorites, and never lose track of what makes your heart skip a beat ✨
                        </p>
                        <div className="flex justify-center space-x-2">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                        </div>
                    </div>
                </div>

            </div>

            {/* Wishlist Content */}
            <div className="max-w-7xl mx-auto px-6 py-2">
                {wishlist.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center py-20"
                    >
                        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-16 shadow-2xl border border-white/20 max-w-2xl mx-auto">
                            <div className="w-24 h-24 bg-gradient-to-br from-[#1b4765]/20 to-[#2e6a91]/20 rounded-full flex items-center justify-center mx-auto mb-8">

                            </div>
                            <h3 className="text-3xl font-bold text-gray-800 mb-4">Your Wishlist is Empty</h3>
                            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                Start building your dream collection by adding products you love. Every great journey begins with a single step.
                            </p>
                            <Link
                                to="/shop"
                                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#1b4765] to-[#2e6a91] text-white font-semibold rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                            >
                                Explore Products
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </motion.div>
                ) : (
                    <div>
                        {/* Stats Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-12"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#1b4765] to-[#2e6a91] rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">
                                            {wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'} Saved
                                        </h3>
                                        <p className="text-gray-600">Your curated collection</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Total Value</p>
                                    <p className="text-lg font-bold text-[#1b4765]">
                                        LKR {wishlist.reduce((sum, item) => sum + parseFloat(item.price), 0).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Products Grid */}
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {wishlist.map((product) => (
                                <motion.div
                                    key={product.product_id}
                                    variants={cardVariants}
                                    className="group relative bg-white/80 backdrop-blur-sm border border-white/30 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                                >
                                    {/* Product Image */}
                                    <Link to={`/shop/product/${product.product_id}`}>
                                        <div className="relative overflow-hidden rounded-t-3xl">
                                            <motion.img
                                                whileHover={{ scale: 1.08 }}
                                                transition={{ duration: 0.4 }}
                                                src={product.image_url1}
                                                alt={product.name}
                                                className="w-full h-64 object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                    </Link>

                                    {/* Product Info */}
                                    <div className="p-6">
                                        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#1b4765] transition-colors">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center justify-between">
                                            <p className="text-2xl font-bold text-[#1b4765]">
                                                LKR {parseFloat(product.price).toLocaleString()}
                                            </p>
                                            <div className="flex items-center space-x-1 text-yellow-500">
                                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="text-sm text-gray-600">4.5</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Remove Button */}
                                     <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => confirmRemove(product.product_id)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-600 hover:text-red-500 hover:bg-red-50 p-3 rounded-full shadow-lg border border-white/20 transition-all duration-200"
                  title="Remove from wishlist"
                >
                  <FiTrash2 size={18} />
                </motion.button>

                                    {/* Wishlist Badge */}
                                    <div className="absolute top-4 left-4 bg-gradient-to-r from-[#1b4765] to-[#2e6a91] text-white text-xs font-semibold px-3 py-1 rounded-full">
                                        Saved
                                    </div>
                                </motion.div>
                            ))}
                            </motion.div>
                             <ConfirmationModal
        isOpen={showModal}
        title="Remove From Wishlist"
        message="Are you sure you want to remove this item from your wishlist?"
        onConfirm={handleRemove}
        onCancel={cancelRemove}
      />
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;