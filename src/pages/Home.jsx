import React, { useState } from 'react';
import HeroCarousel from '../components/HomePage/HeroCarousel';
import { FaRobot, FaCamera, FaGem, FaShieldAlt, FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';
import img1 from '../assets/bestSeller/img1.jpg';
import img2 from '../assets/bestSeller/img2.jpg';
import img3 from '../assets/bestSeller/img3.jpg';
import img4 from '../assets/bestSeller/img4.jpg';
import aboutImg from '../assets/aboutImg.jpg';
import AIRecommendation from '../assets/AIRecommendation.jpg';
import { motion } from 'framer-motion';
import { FaTools } from 'react-icons/fa';
import { FaSlidersH, FaPalette } from 'react-icons/fa';
import { Recommend } from '@mui/icons-material';

const Home = () => {



  // Icons
  const features = [
    {
      icon: <FaRobot className="text-3xl text-teal-700" />,
      title: 'AI Suggestions',
      description: 'Get personalized jewelry recommendations based on your style preferences',
    },
    {
      icon: <FaCamera className="text-3xl text-teal-700" />,
      title: 'Virtual Try-On',
      description: 'Try on jewelry virtually using our advanced AR technology',
    },
    {
      icon: <FaGem className="text-3xl text-teal-700" />,
      title: 'Custom Jewelry',
      description: 'Create your own unique pieces with our customization tools',
    },
    {
      icon: <FaShieldAlt className="text-3xl text-teal-700" />,
      title: 'Secure Shopping',
      description: 'Shop with confidence with our secure payment system',
    },
  ];

  // Best selling products
  const categories = ['All', 'Earrings', 'Necklaces', 'Bracelets', 'Rings'];
  const [activeCategory, setActiveCategory] = useState('All');
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const products = [
    {
      id: 1,
      title: 'Ceramic Whispers',
      price: 89,
      reviews: 24,
      rating: 5,
      img: img1,
      liked: false,
    },
    {
      id: 2,
      title: 'Ceramic Whispers',
      price: 89,
      reviews: 24,
      rating: 5,
      img: img2,
      liked: false,
    },
    {
      id: 3,
      title: 'Ceramic Whispers',
      price: 89,
      reviews: 24,
      rating: 5,
      img: img3,
      liked: false,
    },
    {
      id: 4,
      title: 'Ceramic Whispers',
      price: 89,
      reviews: 24,
      rating: 5,
      img: img4,
      liked: false,
    },
    {
      id: 5,
      title: 'Ceramic Whispers',
      price: 89,
      reviews: 24,
      rating: 5,
      img: img1,
      liked: false,
    },
    {
      id: 6,
      title: 'Ceramic Whispers',
      price: 89,
      reviews: 24,
      rating: 5,
      img: img2,
      liked: false,
    },
    {
      id: 7,
      title: 'Ceramic Whispers',
      price: 89,
      reviews: 24,
      rating: 5,
      img: img3,
      liked: false,
    },
    {
      id: 8,
      title: 'Ceramic Whispers',
      price: 89,
      reviews: 24,
      rating: 5,
      img: img4,
      liked: false,
    },
  ];

  const [likedProducts, setLikedProducts] = useState({});

  const toggleLike = (id) => {
    setLikedProducts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };




  // about 
  const storyPoints = [
    {
      icon: <FaTools />,
      title: 'Master Craftsmanship',
      description:
        'Each piece is meticulously handcrafted by our skilled artisans using traditional techniques and premium materials',
    },
    {
      icon: <FaHeart />,
      title: 'Master Craftsmanship',
      description:
        'Each piece is meticulously handcrafted by our skilled artisans using traditional techniques and premium materials',
    },
    {
      icon: <FaGem />,
      title: 'Master Craftsmanship',
      description:
        'Each piece is meticulously handcrafted by our skilled artisans using traditional techniques and premium materials',
    },
  ];



  // AI Recommend
  const AIRecommendations = [
    {
      icon: <FaCamera />,
      title: 'FaceShape Analysis',
      description:
        'Upload your photo to receive earring and necklace suggestions that complement your face shape.',
    },
    {
      icon: <FaPalette />,
      title: 'Skin Tone Matching',
      description:
        'Get personalized metal and gemstone recommendations based on your skin undertone.',
    },
    {
      icon: <FaSlidersH />,
      title: 'Style preferences',
      description:
        'Our AI learns your style preferences to make increasingly accurate suggestions.',
    },
  ];


  return (
    <div>
      <HeroCarousel />

      {/* Features Section */}
      <section className="py-12 bg-white">
        <motion.div
          className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="bg-teal-50 p-4 rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-md mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Best Selling Products Section */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold mb-2 text-[#1B4965]">Our Bestsellers</h2>
          <div className="w-20 h-[3px] mx-auto bg-[#1B4965] rounded"></div>
        </div>

        <div className="flex justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              className="px-4 py-1 border-[2px] rounded-[8px] border-[#1B4965] text-sm hover:bg-[#1B4965] hover:text-white transition"
              onClick={() => handleCategoryChange(cat)}
              style={{
                backgroundColor: activeCategory === cat ? '#1B4965' : 'transparent',
                color: activeCategory === cat ? 'white' : '#1B4965',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <img
                src={product.img}
                alt={product.title}
                className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
              />

              <span className="absolute top-3 left-3 bg-[#1B4965] text-white text-xs px-2 py-0.5 rounded-[4px]">
                Bestsellers
              </span>

              <button
                onClick={() => toggleLike(product.id)}
                className="absolute top-3 bg-white p-2  rounded-full right-3 text-md text-[#1b4965] hover:text-red-500 transition"
              >
                {likedProducts[product.id] ? <FaHeart className='text-red-500' /> : <FaRegHeart />}
              </button>

              <div className="p-4 text-sm">
                <h3 className="font-semibold text-gray-900">{product.title}</h3>
                <div className="flex items-center gap-1 text-yellow-500 my-1">
                  {Array.from({ length: product.rating }).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                  <span className="text-gray-500 ml-2">
                    ({product.reviews} reviews)
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1.2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="bg-[#264d65] text-white text-sm px-3 py-1 rounded hover:bg-[#1B4965] "
                  >
                    Add to Cart →
                  </motion.button>
                </div>
              </div>


            </motion.div>
          ))}


        </motion.div>
      </section>






      {/* About Section */}
      <motion.section
        className="relative bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${aboutImg})` }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center">
          {/* Left Content */}
          <div className="md:w-1/2 mb-12 md:mb-0">
            <motion.h2
              className="text-4xl font-semibold mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Our Story
            </motion.h2>

            <motion.p
              className="text-lg mb-8 text-gray-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Crafting unique pieces with passion and precision since 2020
            </motion.p>

            <div className="space-y-6">
              {storyPoints.map((point, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-[#94b5d1] text-[#1b4965] p-2 rounded-full text-xl">
                    {point.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{point.title}</h4>
                    <p className="text-gray-300 text-sm">{point.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              className="mt-8 px-5 py-2 bg-white text-black rounded shadow hover:bg-gray-100 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More About Us →
            </motion.button>
          </div>

          {/* Optional Image Area (Right side) */}
          <div className="hidden md:block md:w-1/2">
            {/* Image already in background, or you can add here */}
          </div>
        </div>
      </motion.section>

      {/* AI Recommendations Section */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-4">
              AI-Powered Jewelry Recommendations
            </h2>
            <p className="text-gray-600 mb-8">
              Experience personalized jewelry recommendations powered by advanced AI technology. Our system analyzes your unique features to suggest pieces that perfectly complement your natural beauty.
            </p>

            <div className="space-y-6">
              {AIRecommendations.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-[#c7c4c3] text-[#1b4965] p-2 rounded-full text-xl">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              className="mt-8 px-6 py-2 bg-[#2d5066] text-white rounded hover:bg-[#1b4965] transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try AI Assistant Now
            </motion.button>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="lg:w-1/2 w-full relative group overflow-hidden rounded-lg shadow-2xl"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            {/* Image */}
            <img
              src={AIRecommendation}
              alt="AI Jewelry Recommendation"
              className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 
    flex flex-col items-center justify-center text-center px-6 py-8
    opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-6
    transition-all duration-1000 ease-in-out"
            >
              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white text-3xl font-semibold mb-3 tracking-wide"
              >
                AI Jewelry Recommendation
              </motion.h3>

              {/* Sub Text */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-gray-200 text- mb-6 max-w-md"
              >
                Let our intelligent system suggest jewelry that perfectly matches your unique style and preferences. Explore curated collections made just for you!
              </motion.p>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#35586e] to-[#0a4367] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:from-[#1b4961] hover:to-[#1b4970] transition-all duration-500"
              >
                Explore Now
              </motion.button>
            </div>
          </motion.div>



        </div>
      </motion.section>

    </div>
  );
};

export default Home;
