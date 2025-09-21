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
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-rose-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-32 h-32 bg-rose-100 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-100 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-amber-50 rounded-full opacity-40 blur-2xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-block">
            <span className="text-sm font-medium text-rose-600 bg-rose-50 px-4 py-2 rounded-full mb-6 inline-block">
              ✨ Artisan Excellence
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-rose-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Why Choose Our
            <br />
            <span className="italic font-serif">Handcrafted Jewelry</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover the artistry, quality, and passion that goes into every piece we create
          </p>
          <div className="flex justify-center mt-8">
            <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full"></div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
                {/* Gradient border effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-rose-200 via-purple-200 to-amber-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
                
                {/* Icon container */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-white to-slate-50 rounded-2xl flex items-center justify-center mx-auto shadow-md group-hover:shadow-lg transition-shadow duration-300 border border-slate-100">
                    {feature.icon}
                  </div>
                  {/* Floating sparkle effect */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="font-bold text-xl mb-4 text-slate-800 group-hover:bg-gradient-to-r group-hover:from-rose-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm lg:text-base">
                    {feature.description}
                  </p>
                </div>

                {/* Subtle bottom accent */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-20 relative">
          <div className="bg-gradient-to-r from-rose-500 to-purple-600 p-8 rounded-3xl shadow-2xl border border-white/20">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Find Your Perfect Piece?
            </h3>
            <p className="text-rose-100 mb-8 text-lg max-w-2xl mx-auto">
              Explore our curated collection of handmade jewelry or commission a custom piece that's uniquely yours
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-rose-600 font-semibold px-8 py-4 rounded-full hover:bg-rose-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Shop Collection
              </button>
              <button className="border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-rose-600 transition-all duration-300 transform hover:scale-105">
                Custom Orders
              </button>
            </div>
          </div>
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
