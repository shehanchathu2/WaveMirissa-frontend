import React from 'react';
import { motion } from "framer-motion";
import { FiHeart, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaFilter } from "react-icons/fa";
import { Link } from 'react-router-dom';

import { AiFillStar } from 'react-icons/ai';
import img2 from '../assets/bestSeller/img2.jpg';

// Dummy data for products
const products = Array(12).fill({
  title: "Ceramic Whisper",
  price: "$240.00",
  image: img2,
  rating: 4,
  reviews: 23,
  inStock: true,
});

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Shop Component
const Shop = () => {
  return (
    <motion.div
      className="h-screen overflow-hidden px-8 bg-gray-50 flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Page Header */}
      <motion.div
        className="px-10 py-4 bg-white shadow rounded-md w-full top-2 z-10 border-t border-gray-200 mb-4"
        variants={itemVariants}
      >
        <h1 className="text-3xl text-center font-bold text-gray-800 mb-1">Shop All Jewelry</h1>
        <p className="text-gray-600 max-w-2xl m-auto text-center">
          Discover our stunning jewelry collections. Browse and find your perfect piece.
        </p>
        <p className="text-gray-600 max-w-2xl m-auto text-center">Home / Shop</p>
      </motion.div>

      {/* <div className='bg-white shadow rounded-md w-full mt-2 top-2 z-10 px-10 py-4'>
        <h1 className="text-md text-gray-800 mb-1">Shop All Jewelry</h1>
      </div> */}



      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar Filters */}
        <motion.aside
          className="hidden mt-8 lg:block flex-shrink-0 w-72 bg-gradient-to-br from-[#ffffff] via-[#ffffff] to-[#fff] p-6 shadow-inner sticky top-[100px] h-[calc(100vh-100px)] overflow-y-auto scrollbar-hide"
          variants={itemVariants}
        >
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-[#1B4965]">
            <FaFilter /> Filters
          </h3>

          {/* Categories */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Categories</h4>
            <ul className="space-y-2 text-gray-700">
              {["Necklaces (24)", "Bracelets (12)", "Earrings (43)", "Rings (43)"].map((category, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <input type="checkbox" className="accent-[#1B4965] w-4 h-4" />
                  <span>{category}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Price Range</h4>
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>$8</span>
              <span>$800</span>
            </div>
            <input type="range" min="8" max="800" className="w-full accent-[#1B4965]" />
          </div>

          {/* Materials */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Materials</h4>
            <ul className="space-y-2 text-gray-700">
              {["Gold", "Silver", "Diamond", "Pearls"].map((material, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <input type="checkbox" className="accent-[#1B4965] w-4 h-4" />
                  <span>{material}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Clear Filters Button */}
          <div className="mt-6">
            <button className="w-full border border-gray-400 text-gray-700 py-2 rounded hover:bg-gray-100 transition">
              Clear All Filters
            </button>
          </div>
        </motion.aside>

        {/* Product Grid Section */}
        <motion.section
          className="flex-1 overflow-y-auto px-6 py-8 mb-2 scrollbar-hide"
          variants={containerVariants}
        >
          {/* Product Count Header */}
          <motion.div
            className="px-6 py-2 bg-white rounded-md shadow top-2 z-10"
            variants={itemVariants}
          >
            <p className="text-2xs text-gray-800 mb-1">Showing 12 products</p>
          </motion.div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <Link to={`/shop/product/${index}`}>
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-xl overflow-hidden group cursor-pointer hover:shadow-2xl transition-shadow duration-300"
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Wishlist Button */}
                    <button className="absolute top-3 right-3 text-gray-600 hover:text-red-500 bg-white p-2 rounded-full shadow transition-colors">
                      <FiHeart size={18} />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {product.title}
                    </h3>

                    {/* Ratings */}
                    <div className="flex items-center text-yellow-400 text-base mb-2">
                      {[...Array(5)].map((_, i) => (
                        <AiFillStar
                          key={i}
                          className={i < product.rating ? '' : 'text-gray-300'}
                        />
                      ))}
                      <span className="ml-2 text-gray-500 text-sm">
                        ({product.reviews} reviews)
                      </span>
                    </div>

                    {/* Price */}
                    <p className="text-xl font-bold text-[#1B4965] mb-2">
                      {product.price}
                    </p>

                    {/* Stock Badge */}
                    {product.inStock && (
                      <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                        In Stock
                      </span>
                    )}
                  </div>
                </motion.div>
              </Link>

            ))}
          </div>

          {/* Pagination */}
          <motion.div
            className="flex justify-center mt-12 gap-4 items-center"
            variants={itemVariants}
          >
            <button className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition-colors">
              <FiChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-[#1B4965] text-white rounded shadow font-medium hover:bg-[#174b6b] transition-colors">
                1
              </button>
              <button className="px-4 py-2 bg-white text-gray-700 border rounded shadow hover:bg-gray-100 transition-colors">
                2
              </button>
              <button className="px-4 py-2 bg-white text-gray-700 border rounded shadow hover:bg-gray-100 transition-colors">
                3
              </button>
            </div>
            <button className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition-colors">
              <FiChevronRight size={20} />
            </button>
          </motion.div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default Shop;