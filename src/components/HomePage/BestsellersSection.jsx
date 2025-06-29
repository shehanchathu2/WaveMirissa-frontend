import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import img1 from '../../assets/bestSeller/img1.jpg';
import img2 from '../../assets/bestSeller/img2.jpg';
import img3 from '../../assets/bestSeller/img3.jpg';
import img4 from '../../assets/bestSeller/img4.jpg';

const defaultProducts = [
  { id: 1, title: 'Ceramic Whispers', price: 89, reviews: 24, rating: 5, img: img1, liked: false },
  { id: 2, title: 'Ceramic Whispers', price: 89, reviews: 24, rating: 5, img: img2, liked: false },
  { id: 3, title: 'Ceramic Whispers', price: 89, reviews: 24, rating: 5, img: img3, liked: false },
  { id: 4, title: 'Ceramic Whispers', price: 89, reviews: 24, rating: 5, img: img4, liked: false },
  { id: 5, title: 'Ceramic Whispers', price: 89, reviews: 24, rating: 5, img: img1, liked: false },
  { id: 6, title: 'Ceramic Whispers', price: 89, reviews: 24, rating: 5, img: img2, liked: false },
  { id: 7, title: 'Ceramic Whispers', price: 89, reviews: 24, rating: 5, img: img3, liked: false },
  { id: 8, title: 'Ceramic Whispers', price: 89, reviews: 24, rating: 5, img: img4, liked: false },
];

export default function BestsellersSection({
  categories = [],
  activeCategory,
  setActiveCategory,
  products = defaultProducts,
  likedProducts = {},
  toggleLike,
  containerVariants,
  itemVariants,
  imageVariants,
}) {
  return (
    <motion.section
      className="py-10 px-4 sm:px-6 lg:px-16 bg-gradient-to-br from-slate-50 to-blue-50"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div className="max-w-7xl mx-auto" variants={itemVariants}>
        {/* Header */}
        <motion.div className="text-center mb-4" variants={itemVariants}>
          <h2 className="text-3xl font-bold-xs text-[#1B4965]">Our Bestsellers</h2>
          <div className="w-16 h-0.5 bg-[#1B4965] mx-auto mt-3 rounded-full"></div>
        </motion.div>

        {/* Categories */}
        <div className="flex justify-center mb-6 overflow-x-auto scrollbar-hide">
          <div className="inline-flex gap-3 px-2 bg-white p-2 rounded-2xl shadow-md">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeCategory === cat
                    ? 'bg-[#1B4965] text-white border-transparent shadow'
                    : 'text-[#1B4965] border-[#1B4965] hover:bg-gray-100'
                }`}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden group relative border transition"
              variants={imageVariants}
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={product.img}
                alt={product.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <button
                onClick={() => toggleLike(product.id)}
                className="absolute top-3 right-3 bg-white p-2 rounded-full text-[#1B4965] hover:text-red-500 shadow-sm"
                aria-label="Toggle like"
              >
                {likedProducts[product.id] ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              </button>

              {/* Quick View Button */}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-white text-[#1B4965] px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-100">
                  Quick View
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
