import React, { useState } from 'react';
import HeroCarousel from '../components/HomePage/HeroCarousel';
import { FaRobot, FaCamera, FaGem, FaShieldAlt, FaStar, FaHeart, FaRegHeart, FaClock } from 'react-icons/fa';
import AIRecommendation from '../assets/AIRecommendation.jpg';
import { motion } from 'framer-motion';
import { FaTools } from 'react-icons/fa';
import { FaSlidersH, FaPalette } from 'react-icons/fa';
import { Recommend } from '@mui/icons-material';
import { FaRegListAlt, FaRegGem } from 'react-icons/fa';
import { FaPlay, FaBullseye } from 'react-icons/fa';


import { FaArrowRight } from 'react-icons/fa';
import CategoryGrid from '../components/HomePage/CategoryGrid';
import StorySection from '../components/HomePage/StorySection';
import BestsellersSection from '../components/HomePage/BestsellersSection';
import VideoBanner from '../components/HomePage/VideoBanner';
import { Link } from 'react-router-dom';



const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-teal-50 to-white">
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200')] bg-cover bg-center opacity-10"></div>
    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <motion.h1
        className="text-5xl md:text-7xl font-light text-[#1B4965] mb-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Handcrafted
        <span className="block text-teal-600 font-normal">Elegance</span>
      </motion.h1>
      <motion.p
        className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Discover unique, handmade jewelry pieces that tell your story. Each creation is carefully crafted with love and attention to detail.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <button className="bg-[#1B4965] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#174b6b] transition-all duration-300 shadow-lg hover:shadow-xl">
          Shop Collection
        </button>
        <button className="border-2 border-[#1B4965] text-[#1B4965] px-8 py-4 rounded-full text-lg font-medium hover:bg-[#1B4965] hover:text-white transition-all duration-300">
          Try AI Stylist
        </button>
      </motion.div>
    </div>
  </section>
);

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


  const timelineItems = [
    {
      icon: <FaPlay className="text-white" />,
      title: "Our Beginning",
      description: "t methods in Sri Lanka are mostly static, manual, and reactive, lacking the capability to provide real-time predictions or localized"
    },
    {
      icon: <FaHeart className="text-white" />,
      title: "Our Craft",
      description: "t methods in Sri Lanka are mostly static, manual, and reactive, lacking the capability to provide real-time predictions or localized"
    },
    {
      icon: <FaBullseye className="text-white" />,
      title: "Our Mission",
      description: "t methods in Sri Lanka are mostly static, manual, and reactive, lacking the capability to provide real-time predictions or localized"
    }
  ];

  const stats = [
    { number: "5+", label: "Years of Experience" },
    { number: "5,000+", label: "Happy Customers" },
    { number: "100%", label: "Sustainable Materials" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const timelineVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

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


      {/* Features Section with better spacing */}
      <section className="py-10 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold mb-4 text-[#1B4965]">Why Choose Our Jewelry</h2>
            <div className="w-16 h-0.5 bg-[#1B4965] mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center bg-white shadow-lg p-8 rounded-2xl hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-teal-50 p-4 rounded-full mb-6 w-20 h-20 flex items-center justify-center mx-auto">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg mb-3 text-[#1B4965]">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>







      <BestsellersSection />

      <VideoBanner />

      <StorySection />

      {/* AI Recommendations Section */}
      <motion.section
        className="bg-while py-16 px-4 md:px-8 lg:px-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className="max-w-7xl mx-auto" variants={itemVariants}>
          {/* Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl font-semibold mb-2 text-[#1B4965]">
              AI-Powered Jewelry Recommendations
            </h2>
            <div className="w-16 h-0.5 bg-[#1B4965] mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-xl mx-auto mt-4">
              Experience personalized jewelry recommendations powered by advanced AI technology. Our system analyzes your unique features to suggest pieces that perfectly complement your natural beauty.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div className="space-y-8" variants={itemVariants}>
              {AIRecommendations.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex justify-center  space-x-6 bg-white shadow-xl rounded-lg pt-8 pl-6 pr-6"
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex flex-col items-center">
                    <motion.div
                      className="w-12 h-12 bg-[#1B4965] rounded-full flex items-center justify-center shadow-lg text-white text-xl"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {item.icon}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}

              {/* Try AI Assistant Button */}

              <motion.div>
                <Link to="ai_suggetions">
                  <motion.button
                    className="bg-[#1B4965] text-white px-6 py-3 rounded-sm font-medium hover:bg-[#174b6b] transition-colors duration-300 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    variants={itemVariants}
                  >
                    Try AI Assistant Now
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Image with Overlay */}
            <motion.div className="relative" variants={imageVariants}>
              <div className="relative overflow-hidden rounded-lg shadow-xl group h-[500px]">
                <img
                  src={AIRecommendation}
                  alt="AI Jewelry Recommendation"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 mb-20"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 flex flex-col items-center justify-center text-center px-6 py-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-6 transition-all duration-1000 ease-in-out"
                >
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-white text-3xl font-semibold mb-3 tracking-wide"
                  >
                    AI Jewelry Recommendation
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-gray-200 text-base mb-6 max-w-md"
                  >
                    Let our intelligent system suggest jewelry that perfectly matches your unique style and preferences. Explore curated collections made just for you!
                  </motion.p>


                  <Link to="ai_suggetions">
                  <motion.button
                    className="bg-[#1B4965] text-white px-6 py-3 rounded-3xl font-medium hover:bg-[#174b6b] transition-colors duration-300 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    variants={itemVariants}
                  >
                    Expore More
                  </motion.button>
                </Link>
     
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>


      {/* collections Section */}
      <CategoryGrid />

    </div>
  );
};

export default Home;
