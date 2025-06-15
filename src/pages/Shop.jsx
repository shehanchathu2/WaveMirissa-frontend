import React from 'react';
import { motion } from "framer-motion";
import { FiHeart, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import img2 from '../assets/bestSeller/img2.jpg';
import { FaThList } from 'react-icons/fa';

const products = Array(12).fill({
  title: "Ceramic Whisper",
  price: "$240.00",
  image: img2,
  rating: 4,
  reviews: 23,
  inStock: true,
});

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

const Shop = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Title Bar */}
      <div className="text-center py-10 bg-white border-b border-t border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Shop All Jewelry</h1>
        <p className="text-sm text-gray-600 mt-2">
          Discover our stunning jewelry collections. Browse and find your perfect piece.
        </p>
        <p className="text-sm text-gray-700 mt-1">Home / Shop</p>
      </div>

      {/* Main Layout */}
      <motion.div
        className="px-20 py-6 grid grid-cols-12 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        {/* Sidebar */}
        <motion.div
          className="col-span-12 lg:col-span-3 w-[18rem] space-y-8 bg-white py-6 px-8 rounded-xl shadow-md"
          variants={itemVariants}
        >
          {/* Categories */}
          <div>
            <h2 className="font-semibold text-lg text-gray-800 mb-3 border-b pb-2 mx-4">Categories</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <ul className="ml-4 space-y-1">
                <li><input type="checkbox" className="mr-2" /> Necklaces</li>
                <li><input type="checkbox" className="mr-2" /> Bracelets</li>
                <li><input type="checkbox" className="mr-2" /> Earrings</li>
                <li><input type="checkbox" className="mr-2" /> Rings</li>
              </ul>
            </ul>
          </div>

          {/* Materials */}
          <div>
            <h2 className="font-semibold text-lg text-gray-800 mb-3 border-b pb-2">Materials</h2>
            <ul className="ml-2 space-y-2 text-sm text-gray-700">
              <li><input type="checkbox" className="mr-2" /> Gold</li>
              <li><input type="checkbox" className="mr-2" /> Silver</li>
              <li><input type="checkbox" className="mr-2" /> Diamond</li>
              <li><input type="checkbox" className="mr-2" /> Pearls</li>
            </ul>
          </div>

          {/* Color Options */}
          <div>
            <p className="text-sm font-medium text-gray-800 mb-2 border-b pb-1">Color Options</p>
            <ul className="ml-2 space-y-2 text-sm text-gray-700">
              <li><input type="checkbox" className="mr-2" /> Red</li>
              <li><input type="checkbox" className="mr-2" /> Blue</li>
              <li><input type="checkbox" className="mr-2" /> Green</li>
            </ul>
          </div>

          {/* Size */}
          <div>
            <p className="text-sm font-medium text-gray-800 mb-2 border-b pb-1">Size</p>
            <ul className="ml-2 space-y-2 text-sm text-gray-700">
              <li><input type="checkbox" className="mr-2" /> Small (S)</li>
              <li><input type="checkbox" className="mr-2" /> Medium (M)</li>
              <li><input type="checkbox" className="mr-2" /> Large (L)</li>
              <li><input type="checkbox" className="mr-2" /> Extra Large (XL)</li>
            </ul>
          </div>

          {/* Price Range */}
          <div>
            <p className="text-sm font-medium text-gray-800 mb-2 border-b pb-1">Price</p>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="25"
                max="450"
                className="w-full h-2 bg-[#1b4765]/20 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="text-xs text-gray-600 mt-1 flex justify-between">
              <span>$25</span>
              <span>$450</span>
            </div>
          </div>

          <div className="flex justify-center">
            <button className="bg-transparent border border-[#1b4765] text-[#1b4765] px-6 py-2 rounded-sm hover:bg-[#1b4765] hover:text-white transition-colors duration-300">
              Clear All Filters
            </button>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div className="col-span-12 lg:col-span-9 space-y-4" variants={itemVariants}>
          {/* Sorting Bar */}
          <div className="flex justify-between items-center border bg-white rounded-md px-4 py-2">
            <div className="text-sm text-gray-700">
              Showing <strong>12</strong> products
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span>Sort by:</span>
              <select className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none">
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
              <button className="p-1">
                <FaThList className="text-gray-600 hover:text-black" />
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <Link to={`/shop/product/${index}`} key={index}>
                <motion.div
                  className="bg-white rounded shadow hover:shadow-lg transition p-0"
                  variants={itemVariants}
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-64 object-cover rounded"
                    />
                    <button className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:text-pink-600">
                      <FiHeart size={16} />
                    </button>
                  </div>
                  <div className="pt-3 px-4 py-4">
                    <h3 className="font-semibold text-gray-800 text-sm">{product.title}</h3>
                    <div className="flex items-center text-yellow-400 text-xs">
                      {[...Array(5)].map((_, i) => (
                        <AiFillStar key={i} className={i < product.rating ? '' : 'text-gray-300'} />
                      ))}
                      <span className="ml-1 text-gray-500">({product.reviews})</span>
                    </div>
                    <p className="text-sm font-bold text-[#1b4765] mt-1">{product.price}</p>
                    {product.inStock && (
                      <span className="inline-block mt-1 bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">
                        In Stock
                      </span>
                    )}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <button className="p-2 bg-white shadow rounded-full hover:bg-gray-100">
              <FiChevronLeft size={18} />
            </button>
            <button className="px-4 py-2 bg-[#1b4765]/80 text-white rounded shadow hover:bg-[#1b4765]">1</button>
            <button className="px-4 py-2 border text-gray-700 rounded shadow hover:bg-gray-100">2</button>
            <button className="px-4 py-2 border text-gray-700 rounded shadow hover:bg-gray-100">3</button>
            <button className="p-2 bg-white shadow rounded-full hover:bg-gray-100">
              <FiChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
export default Shop;
