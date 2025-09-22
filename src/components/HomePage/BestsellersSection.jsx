import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import QuickViewModal from '../../components/HomePage/QuickViewModal';
import axios from 'axios';




export default function BestsellersSection({
  containerVariants = {},
  itemVariants = {},
  imageVariants = {},
}) {
  const [products, setProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState({});
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:8080/product/Allproducts');
        setProducts(res.data);
        console.log(res.data);
        const uniqueType = ['All', ...new Set(res.data.map(p => p.producttype))];
        setTypes(uniqueType);
      } catch (err) {
        console.error('Error loading products:', err);
      }
    };
    fetchProducts();
  }, []);

  const toggleLike = (id) => {
    setLikedProducts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.producttype === activeCategory);

  return (
    <motion.section
      className="py-12 lg:py-20 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/30 to-blue-50/50"></div>

      {/* Decorative elements */}
      <div className="absolute top-32 right-20 w-40 h-40 bg-gradient-to-br from-blue-100/30 to-teal-100/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-32 left-20 w-32 h-32 bg-gradient-to-br from-slate-100/40 to-blue-100/40 rounded-full blur-2xl animate-pulse delay-1000"></div>

      <motion.div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12" variants={itemVariants}>

        {/* Section Header */}
        <motion.div className="text-center" variants={itemVariants}>
          {/* Decorative line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent mx-auto"
          ></motion.div>

          <h2 className="text-4xl lg:text-5xl font-light text-slate-900 mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Our Bestsellers
          </h2>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            Discover our most loved pieces, handpicked by jewelry enthusiasts
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12 overflow-x-auto scrollbar-hide">
          <div className="inline-flex gap-2 p-1 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50">
            {types.map((t) => (
              <button
                key={t}
                className={`relative whitespace-nowrap px-6 py-3 rounded-xl text-sm font-medium transition-all duration-500 ${activeCategory === t
                  ? 'text-white shadow-lg'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                onClick={() => setActiveCategory(t)}
                aria-pressed={activeCategory === t}
              >
                {/* Active background */}
                {activeCategory === t && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-gradient-to-r from-slate-900 to-blue-900 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.product_id}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-slate-200/50 hover:border-slate-300/50 transition-all duration-500"
              variants={imageVariants}
              whileHover={{ y: -8 }}
              layout
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image_url1}
                  alt={product.name}
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Like Button */}
                {/* <motion.button
                  onClick={() => toggleLike(product.product_id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-600 hover:text-red-500 shadow-lg border border-slate-200/50 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Toggle like"
                >
                  {likedProducts[product.product_id] ?
                    <FaHeart className="text-red-500 w-4 h-4" /> :
                    <FaRegHeart className="w-4 h-4" />
                  }
                </motion.button> */}

                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <motion.button
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsQuickViewOpen(true);
                    }}
                    className="bg-white/95 backdrop-blur-sm text-slate-900 px-6 py-3 rounded-full text-sm font-semibold hover:bg-white transition-all duration-300 shadow-lg border border-slate-200/50"
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ scale: 1.05 }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      transition: { delay: 0.2 }
                    }}
                  >
                    Quick View
                  </motion.button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="font-semibold text-lg text-slate-900 mb-2 group-hover:text-slate-800 transition-colors duration-300" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {product.name}
                </h3>

                {product.price && (
                  <p className="text-slate-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <span className='font-semibold text-blue-600'>LKR</span> {product.price}
                  </p>
                )}

                {/* Bottom accent line */}
                <motion.div
                  className="w-0 h-0.5 bg-gradient-to-r from-blue-400 to-teal-400 mt-4 group-hover:w-full transition-all duration-500"
                ></motion.div>
              </div>

              {/* Floating decoration */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-blue-200/40 to-teal-200/40 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center space-x-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-slate-300"></div>
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
              <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
              <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
            </div>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-slate-300"></div>
          </div>
        </motion.div>
      </motion.div>

      <QuickViewModal
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        product={selectedProduct}
      />
    </motion.section>
  );
}