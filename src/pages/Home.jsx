import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import ActiveBanner from '../components/HomePage/ActiveBanner';



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
      <section className="py-12 lg:py-20 relative overflow-hidden">
        {/* Background with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-white to-blue-50/30"></div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-100/40 to-teal-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-slate-100/50 to-blue-100/50 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative line */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent mx-auto mb-8"
            ></motion.div>

            <h2 className="text-4xl lg:text-5xl font-light text-slate-900 mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Why Choose Our Jewelry
            </h2>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Discover the artistry and passion behind every piece in our collection
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
                whileHover={{ y: -8 }}
              >
                {/* Card Background */}
                <div className="relative bg-white/80 backdrop-blur-sm border border-slate-200/50 p-8 lg:p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:bg-white group-hover:border-slate-300/50">

                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-transparent to-teal-50/0 group-hover:from-blue-50/30 group-hover:to-teal-50/20 rounded-3xl transition-all duration-500"></div>

                  <div className="relative z-10 text-center">
                    {/* Icon Container */}
                    <motion.div
                      className="relative mb-8"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto group-hover:from-blue-100 group-hover:to-teal-100 transition-all duration-500 shadow-inner">
                        <div className="transform group-hover:scale-110 transition-transform duration-300">
                          {feature.icon}
                        </div>
                      </div>

                      {/* Floating decoration */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-blue-200/60 to-teal-200/60 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </motion.div>

                    {/* Title */}
                    <h3 className="font-semibold text-xl lg:text-2xl mb-4 text-slate-900 group-hover:text-slate-800 transition-colors duration-300" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 leading-relaxed text-sm lg:text-base group-hover:text-slate-700 transition-colors duration-300" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {feature.description}
                    </p>

                    {/* Bottom accent line */}
                    <motion.div
                      className="w-0 h-0.5 bg-gradient-to-r from-blue-400 to-teal-400 mx-auto mt-6 group-hover:w-12 transition-all duration-500"
                    ></motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom decorative element */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-center mt-2"
          >
            <div className="inline-flex items-center space-x-4">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-slate-300"></div>
              <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
              <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
              <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-slate-300"></div>
            </div>
          </motion.div> */}
        </div>
      </section>





      <ActiveBanner />


      <BestsellersSection />

      <VideoBanner />

      <StorySection />

      {/* AI Recommendations Section */}
      <motion.section
        className="relative overflow-hidden py-12 lg:py-16 bg-gradient-to-b from-white via-slate-50/50 to-blue-50/30"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Decorative background elements */}
        <div className="absolute top-20 right-10 w-40 h-40 bg-gradient-to-br from-blue-100/30 to-teal-100/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 left-20 w-32 h-32 bg-gradient-to-br from-slate-100/40 to-blue-100/40 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-br from-teal-100/20 to-white/10 rounded-full blur-xl animate-pulse delay-500"></div>

        <motion.div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12" variants={itemVariants}>

          {/* Section Header */}
          <motion.div className="text-center" variants={itemVariants}>
            {/* Decorative line */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent mx-auto mb-8"
            ></motion.div>

            <h2 className="text-4xl lg:text-5xl font-light text-slate-900 mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              AI-Powered Jewelry Recommendations
            </h2>

            <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Experience personalized jewelry recommendations powered by advanced AI technology. Our system analyzes your unique features to suggest pieces that perfectly complement your natural beauty.
            </p>

            {/* Bottom decorative element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-8"
            >
              <div className="inline-flex items-center space-x-4">
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-slate-300"></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-slate-300"></div>
              </div>
            </motion.div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

            {/* Left Content */}
            <motion.div className="space-y-8" variants={itemVariants}>
              {AIRecommendations.map((item, index) => (
                <motion.div
                  key={index}
                  className="group relative bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:border-slate-300/50 transition-all duration-500"
                  variants={itemVariants}
                  whileHover={{ x: 12, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-transparent to-teal-50/0 group-hover:from-blue-50/30 group-hover:to-teal-50/20 rounded-3xl transition-all duration-500"></div>

                  <div className="relative z-10 flex items-start space-x-6">
                    {/* Icon Container */}
                    <motion.div
                      className="relative flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-[#1b4765] to-[#1b4769] rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                        {item.icon}
                      </div>

                      {/* Floating decoration */}
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-blue-200/60 to-teal-200/60 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-semibold text-slate-900 mb-4 group-hover:text-slate-800 transition-colors duration-300" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        {item.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <motion.div
                    className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-400 to-teal-400 rounded-b-3xl group-hover:w-full transition-all duration-700"
                  ></motion.div>

                  {/* Side accent */}
                  <div className="absolute right-0 top-0 w-1 h-0 bg-gradient-to-b from-teal-300 to-blue-300 rounded-tr-3xl group-hover:h-20 transition-all duration-500 delay-200"></div>
                </motion.div>
              ))}

              {/* Try AI Assistant Button */}
              <motion.div variants={itemVariants}>
                <Link to="ai_suggetions">
                  <motion.button
                    className="group relative overflow-hidden bg-gradient-to-r from-[#1b4765] to-[#1b4769] text-white px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-wide shadow-xl hover:shadow-2xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    variants={itemVariants}
                  >
                    <span className="relative z-10">Try AI Assistant Now</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1b4765] to-[#1b4769] translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  </motion.button>
                </Link>
              </motion.div>

            </motion.div>

            {/* Right Image with Overlay */}
            <motion.div className="relative" variants={imageVariants}>
              <div className="relative overflow-hidden rounded-3xl shadow-2xl group h-[500px] lg:h-[600px]">
                <img
                  src={AIRecommendation}
                  alt="AI Jewelry Recommendation"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Premium gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-transparent to-teal-900/20"></div>

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 py-12 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-8 transition-all duration-700 ease-out">

                  {/* Floating decorative elements */}
                  <div className="absolute top-8 right-8 w-8 h-8 bg-gradient-to-br from-white/20 to-blue-200/30 rounded-full blur-sm animate-pulse"></div>
                  <div className="absolute bottom-12 left-8 w-6 h-6 bg-gradient-to-br from-teal-200/30 to-white/20 rounded-full blur animate-pulse delay-500"></div>

                  <motion.h3
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-white text-3xl lg:text-4xl font-light mb-6 leading-tight"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    AI Jewelry Recommendation
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-white/90 text-base lg:text-lg mb-8 max-w-md leading-relaxed"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Let our intelligent system suggest jewelry that perfectly matches your unique style and preferences. Explore curated collections made just for you!
                  </motion.p>

                  <Link to="ai_suggetions">
                    <motion.button
                      className="group/btn relative overflow-hidden bg-white/90 backdrop-blur-sm text-slate-900 px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-wide hover:bg-white transition-all duration-300 shadow-lg border border-white/20"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      <span className="relative z-10">Explore More</span>
                    </motion.button>
                  </Link>
                </div>

                {/* Corner decorative elements */}
                <div className="absolute top-4 left-4 w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 right-4 w-3 h-3 bg-gradient-to-br from-blue-300/50 to-teal-300/50 rounded-full animate-pulse delay-1000"></div>
              </div>

              {/* Floating decoration around image */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-100/30 to-teal-100/30 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-slate-100/40 to-blue-100/40 rounded-full blur-lg animate-pulse delay-700"></div>
            </motion.div>
          </div>

          {/* Bottom decorative element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-center mt-20"
          >
            <div className="inline-flex items-center space-x-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
              <div className="flex space-x-3">
                <div className="w-3 h-3 bg-slate-300 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-300"></div>
                <div className="w-3 h-3 bg-slate-300 rounded-full animate-pulse delay-600"></div>
              </div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent via-slate-300 to-transparent"></div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>


      {/* collections Section */}
      <CategoryGrid />

    </div>
  );
};

export default Home;
