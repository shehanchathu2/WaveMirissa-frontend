import React from 'react'
import { motion } from "framer-motion";
import { FiHeart, FiShoppingCart, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaFilter } from "react-icons/fa";
import { AiFillStar } from 'react-icons/ai';
import img1 from '../assets/bestSeller/img1.jpg'

// Dummy data for products
const products = Array(12).fill({
  title: "Ceramic Whisper",
  price: "$240.00",
  image:img1, // Example jewelry image
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Shop = () => {
  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-12 px-4 md:px-8 lg:px-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Page Header */}
      <motion.div className="text-center mb-12" variants={itemVariants}>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Shop All Jewelry</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Discover our stunning jewelry collections. Browse and find your perfect piece.
        </p>
      </motion.div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <motion.aside
          className="bg-white p-6 rounded-lg shadow-md w-full lg:w-64"
          variants={itemVariants}
        >
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <FaFilter /> Filters
          </h3>

          {/* Categories */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Categories</h4>
            <ul className="space-y-2 text-gray-700">
              {["Necklaces (24)", "Bracelets (12)", "Earrings (43)", "Rings (43)", "Necklaces (24)"].map((category, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <input type="checkbox" className="accent-pink-500 w-4 h-4" />
                  <span>{category}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Price Range</h4>
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>8$</span>
              <span>800$</span>
            </div>
            <input
              type="range"
              min="8"
              max="800"
              className="w-full accent-[#1B4965]"
            />
          </div>

          {/* Materials */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Materials</h4>
            <ul className="space-y-2 text-gray-700">
              {["Necklaces (24)", "Bracelets (12)", "Earrings (43)", "Rings (43)", "Necklaces (24)"].map((material, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <input type="checkbox" className="accent-pink-500 w-4 h-4" />
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


        {/* Product Grid */}
        <motion.section
          className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
        >
          {products.map((product, index) => (
  <motion.div
    key={index}
    className="bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer hover:shadow-xl transition-shadow duration-300 w-[230px]"
    variants={itemVariants}
    whileHover={{ scale: 1.02 }}
  >
    {/* Image Section */}
    <div className="relative h-52 overflow-hidden">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Badge */}
      {product.badge && (
        <span className="absolute top-2 left-2 bg-blue-800 text-white text-xs font-semibold px-2 py-1 rounded-full">
          {product.badge}
        </span>
      )}

      {/* Wishlist Button */}
      <button className="absolute top-2 right-2 text-gray-600 hover:text-red-500 bg-white p-2 rounded-full shadow transition-colors">
        <FiHeart size={18} />
      </button>
    </div>

    {/* Product Info */}
    <div className="p-4">
      <h3 className="text-md font-semibold text-gray-800 mb-1">
        {product.title}
      </h3>

      {/* Ratings */}
      <div className="flex items-center text-yellow-500 text-sm mb-1">
        {[...Array(5)].map((_, i) => (
          <AiFillStar
            key={i}
            className={i < product.rating ? '' : 'text-gray-300'}
          />
        ))}
        <span className="ml-2 text-gray-500 text-xs">
          ({product.reviews} reviews)
        </span>
      </div>

      {/* Price */}
      <p className="text-xl font-semibold text-gray-800 mb-1">
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
))}

        </motion.section>
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
    </motion.div>
  )
}

export default Shop
