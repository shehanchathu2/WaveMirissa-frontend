import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay } from "react-icons/fa";

// Import 4 background videos
import video1 from "../../assets/videos/v1.mp4";
import video2 from "../../assets/videos/v2.mp4";
import video3 from "../../assets/videos/v3.mp4";
import video4 from "../../assets/videos/v4.mp4";


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
    <section className="relative w-full h-screen overflow-hidden">
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
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      {/* Overlay & Content */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
        <div className="text-center text-white px-4 max-w-4xl">
          <motion.h2
            className="text-4xl md:text-6xl font-light mb-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            The Art of Handcrafted Jewelry
          </motion.h2>
          <motion.p
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Watch our master artisans bring each piece to life with traditional
            techniques passed down through generations.
          </motion.p>
         
        </div>
      </div>
    </section>
  );
};

export default VideoBanner;
