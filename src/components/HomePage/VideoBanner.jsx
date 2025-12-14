import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import video1 from "../../assets/videos/v1.mp4";
import video2 from "../../assets/videos/v2.mp4";
import video3 from "../../assets/videos/v3.mp4";
import video4 from "../../assets/videos/v4.mp4";

// Mock video sources for demo - replace with your actual imports


const videoSources = [video1, video2, video3, video4];

const VideoBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videoSources.length);
    }, 10000); // change video every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background Video Carousel */}
      <AnimatePresence mode="wait">
        <motion.video
          key={videoSources[currentIndex]}
          src={videoSources[currentIndex]}
          autoPlay
          muted
          loop
          playsInline
          className="absolute w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Premium Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/20 to-slate-900/50 z-5"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 via-transparent to-blue-900/30 z-5"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-white/10 to-blue-300/20 rounded-full blur-3xl animate-pulse z-5"></div>
      <div className="absolute bottom-32 left-20 w-40 h-40 bg-gradient-to-br from-teal-200/15 to-white/10 rounded-full blur-2xl animate-pulse delay-1000 z-5"></div>
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-br from-blue-300/20 to-transparent rounded-full blur-xl animate-pulse delay-500 z-5"></div>

      {/* Main Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white px-6 lg:px-4 max-w-6xl">
          
          {/* Decorative top element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-white/80 rounded-full animate-pulse delay-300"></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse delay-700"></div>
              </div>
              <div className="w-12 h-px bg-gradient-to-l from-transparent via-white/60 to-transparent"></div>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <span className="block">The Art of</span>
            <span className="block bg-gradient-to-r from-white via-blue-100 to-teal-100 bg-clip-text text-transparent">
              Handcrafted Jewelry
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl lg:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-white/90"
            style={{ fontFamily: 'Inter, sans-serif' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Watch our master artisans bring each piece to life with traditional
            techniques passed down through generations.
          </motion.p>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 lg:gap-8 mb-12"
          >
            {[
              "Traditional Techniques",
              "Master Artisans", 
              "Generations of Craft"
            ].map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
                className="relative group"
              >
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 group-hover:bg-white/20 transition-all duration-300">
                  <span className="text-white text-sm md:text-base font-medium whitespace-nowrap">
                    {feature}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-teal-400/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </motion.div>
            ))}
          </motion.div>

          {/* Play Button (Optional) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="group relative w-20 h-20 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
            >
              <FaPlay className="text-white text-xl ml-1 group-hover:scale-110 transition-transform duration-300" />
              
              {/* Ripple effect */}
              <div className="absolute inset-0 border-2 border-white/20 rounded-full animate-ping"></div>
              <div className="absolute inset-0 border border-white/10 rounded-full animate-pulse"></div>
            </motion.button>
          </motion.div>

          {/* Bottom decorative element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16"
          >
            <div className="inline-flex items-center space-x-4">
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
              <div className="w-1 h-1 bg-white/60 rounded-full"></div>
              <div className="w-8 h-px bg-gradient-to-l from-transparent via-white/40 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {videoSources.map((_, index) => (
          <div
            key={index}
            className={`relative h-1 rounded-full transition-all duration-500 ${
              index === currentIndex ? 'w-12 bg-white' : 'w-3 bg-white/40'
            }`}
          >
            {index === currentIndex && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 10, ease: "linear" }}
                key={`progress-${index}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/70 z-20"
      >
        <span className="text-sm mb-2 tracking-wide">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default VideoBanner;