import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';
import QuickViewModal from '../../components/HomePage/QuickViewModal';

export default function BestsellersSection({
  containerVariants,
  itemVariants,
  imageVariants,
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
      className="py-10 px-4 sm:px-6 lg:px-16 bg-gradient-to-br from-slate-50 to-blue-50"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div className="max-w-7xl mx-auto" variants={itemVariants}>
        <motion.div className="text-center mb-4" variants={itemVariants}>
          <h2 className="text-3xl font-bold-xs text-[#1B4965]">Our Bestsellers</h2>
          <div className="w-16 h-0.5 bg-[#1B4965] mx-auto mt-3 rounded-full"></div>
        </motion.div>

        <div className="flex justify-center mb-6 overflow-x-auto scrollbar-hide">
          <div className="inline-flex gap-3 px-2 bg-white p-2 rounded-2xl shadow-md">
            {types.map((t) => (
              <button
                key={t}
                className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeCategory === t
                    ? 'bg-[#1B4965] text-white border-transparent shadow'
                    : 'text-[#1B4965] border-[#1B4965] hover:bg-gray-100'
                }`}
                onClick={() => setActiveCategory(t)}
                aria-pressed={activeCategory === t}
              >
                 {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.product_id}
              className="bg-white rounded-xl shadow-md overflow-hidden group relative border transition"
              variants={imageVariants}
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={product.image_url1}
                alt={product.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* <button
                onClick={() => toggleLike(product.product_id)}
                className="absolute top-3 right-3 bg-white p-2 rounded-full text-[#1B4965] hover:text-red-500 shadow-sm"
                aria-label="Toggle like"
              >
                {likedProducts[product.product_id] ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              </button> */}

              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsQuickViewOpen(true);
                  }}
                  className="bg-white text-[#1B4965] px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-100"
                >
                  Quick View
                </button>
              </div>
            </motion.div>
          ))}
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