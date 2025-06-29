import React, { useState } from 'react';
import HeroCarousel from '../components/HomePage/HeroCarousel';
import { FaRobot, FaCamera, FaGem, FaShieldAlt, FaStar, FaHeart, FaRegHeart, FaClock } from 'react-icons/fa';
import img1 from '../assets/bestSeller/img1.jpg';
import img2 from '../assets/bestSeller/img2.jpg';
import img3 from '../assets/bestSeller/img3.jpg';
import img4 from '../assets/bestSeller/img4.jpg';
import aboutImg1 from '../assets/about us/img1.jpg';
import aboutImg2 from '../assets/about us/img2.jpg';
import aboutImg from '../assets/aboutImg.jpg';
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



// const VideoBanner = () => (
//   <section className="relative w-full h-screen overflow-hidden">
//     <div className="absolute inset-0 bg-black">
//       {/* Video placeholder - replace with your actual video */}
//       <div className="w-full h-full bg-gradient-to-r from-teal-900 to-[#1B4965] flex items-center justify-center">
//         <div className="text-center text-white">
//           <FaPlay className="text-6xl mb-4 mx-auto opacity-80" />
//           <p className="text-lg opacity-80">Craftsmanship Video</p>
//         </div>
//       </div>
//     </div>

//     <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//       <div className="text-center text-white px-4 max-w-4xl">
//         <motion.h2
//           className="text-4xl md:text-6xl font-light mb-6"
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//         >
//           The Art of Handcrafted Jewelry
//         </motion.h2>
//         <motion.p
//           className="text-xl mb-8 max-w-2xl mx-auto"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//         >
//           Watch our master artisans bring each piece to life with traditional techniques passed down through generations
//         </motion.p>
//         <motion.button
//           className="bg-white text-[#1B4965] px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           whileHover={{ scale: 1.05 }}
//         >
//           <FaPlay className="inline mr-2" />
//           Watch Our Story
//         </motion.button>
//       </div>
//     </div>
//   </section>
// );
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

  const categories1 = [
    {
      label: 'Shop Earrings',
      image: img1,
      link: '/earrings',
    },
    {
      label: 'Shop Rings',
      image: img2,
      link: '/rings',
    },
    {
      label: 'Shop Bracelets',
      image: img3,
      link: '/bracelets',
    },
    {
      label: 'Shop Necklaces',
      image: img4,
      link: '/necklaces',
    },
  ];



  const categories2 = [
    {
      label: "Men's Collection",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=face",
      link: "/mens"
    },
    {
      label: "Women's Collection",
      image: "https://images.unsplash.com/photo-1494790108755-2616c6d1e3b0?w=800&h=600&fit=crop&crop=face",
      link: "/womens"
    },
    {
      label: "Accessories",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop",
      link: "/accessories"
    },
    {
      label: "New Arrivals",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      link: "/new-arrivals"
    }
  ];


  // about
  // const storyPoints = [
  //   {
  //     icon: <FaTools />,
  //     title: 'Master Craftsmanship',
  //     description:
  //       'Each piece is meticulously handcrafted by our skilled artisans using traditional techniques and premium materials',
  //   },
  //   {
  //     icon: <FaHeart />,
  //     title: 'Master Craftsmanship',
  //     description:
  //       'Each piece is meticulously handcrafted by our skilled artisans using traditional techniques and premium materials',
  //   },
  //   {
  //     icon: <FaGem />,
  //     title: 'Master Craftsmanship',
  //     description:
  //       'Each piece is meticulously handcrafted by our skilled artisans using traditional techniques and premium materials',
  //   },
  // ];
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
      {/* <HeroSection /> */}

      {/* Features Section */}
      {/* <section className="py-12 bg-white">
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
              className="flex flex-col items-center bg-white shadow-2xl p-6 rounded-lg"
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
      </section> */}

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






      {/* Best Selling Products Section */}
      {/* <motion.section
        className="py-10 px-4 sm:px-6 lg:px-16 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className="max-w-7xl mx-auto" variants={itemVariants}>
          <motion.div className="text-center mb-14" variants={itemVariants}>
            <h2 className="text-3xl font-bold-xs text-[#1B4965]">Our Bestsellers</h2>
            <div className="w-16 h-0.5 bg-[#1B4965] mx-auto mt-3 rounded-full"></div>
          </motion.div>

          <div className="flex justify-center mb-12 overflow-x-auto scrollbar-hide">
            <div className="inline-flex gap-3 px-2 bg-white p-2 rounded-2xl shadow-md">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeCategory === cat
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

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden group relative border  transition"
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

                <div className="p-4 text-sm">
                  <h3 className="font-semibold text-gray-900 text-base mb-1 truncate">{product.title}</h3>
                  <div className="flex items-center gap-1 text-yellow-500 mb-1">
                    {Array.from({ length: product.rating }).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                    <span className="text-gray-500 ml-2">({product.reviews} reviews)</span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-lg font-semibold text-[#1B4965]">${product.price.toFixed(2)}</p>
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: '#1B4965',
                        color: '#fff',
                        boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className="bg-[#264d65] text-white text-sm px-4 py-2 rounded-xs hover:bg-[#1B4965]"
                    >
                      Add to Cart →
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section> */}

      <BestsellersSection/>
      {/* <VideoBanner /> */}
      <VideoBanner/>
      {/* <CategoryGrid /> */}


      {/* About Section */}
      {/* <div className="bg-gray-50 py-16 px-4 md:px-8 lg:px-16">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="text-center mb-16"
            variants={itemVariants}
          >
     
            <h2 className="text-3xl font-semibold mb-2 text-[#1B4965]">
              Our Story
            </h2>

            <div className="w-16 h-0.5 bg-[#1B4965] mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-xl mx-auto mt-4">
              Every piece in our collection tells a story — designed with passion, shaped by skilled artisans, and crafted to add meaning to your moments.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              className="space-y-8"
              variants={timelineVariants}
            >
              {timelineItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-6"
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex flex-col items-center">
                    <motion.div
                      className="w-12 h-12 bg-[#1B4965] rounded-full flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {item.icon}
                    </motion.div>
                    {index < timelineItems.length - 1 && (
                      <div className="w-0.5 h-16 bg-teal-200 mt-4"></div>
                    )}
                  </div>

                  <div className="flex-1 pb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}

              <motion.button
                className="bg-[#1B4965] text-white px-6 py-3 rounded-sm font-medium hover:bg-[#174b6b] transition-colors duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                Our Full Story
              </motion.button>
            </motion.div>

            <motion.div
              className="relative"
              variants={imageVariants}
            >
              <div className="grid grid-cols-2 gap-4 h-96">
                <motion.div
                  className="relative overflow-hidden rounded-lg shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={aboutImg1}
                    alt="Artisan crafting"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </motion.div>

                <motion.div
                  className="relative overflow-hidden rounded-lg shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={aboutImg2}
                    alt="Chocolate crafting process"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="mt-16 bg-white rounded-2xl shadow-xl p-8 mx-auto max-w-4xl"
            variants={statsVariants}
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="group"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.h3
                    className="text-4xl md:text-5xl font-light text-[#1B4965] mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      delay: index * 0.2,
                      type: "spring",
                      stiffness: 200
                    }}
                    viewport={{ once: true }}
                  >
                    {stat.number}
                  </motion.h3>
                  <p className="text-gray-700 font-medium group-hover:text-[#1B4965] transition-colors duration-300">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div> */}

      <StorySection />



      {/* our story */}

      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold mb-4 text-[#1B4965]">Our Story</h2>
            <div className="w-16 h-0.5 bg-[#1B4965] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every piece in our collection tells a story — designed with passion, shaped by skilled artisans, and crafted to add meaning to your moments.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {[
                {
                  icon: <FaPlay className="text-white" />,
                  title: "Our Beginning",
                  description: "Founded with a passion for preserving traditional craftsmanship while embracing modern design sensibilities. Our journey began in a small workshop with a dream to create meaningful jewelry."
                },
                {
                  icon: <FaHeart className="text-white" />,
                  title: "Our Craft",
                  description: "Each piece is meticulously handcrafted by our skilled artisans using time-honored techniques passed down through generations, combined with contemporary design innovation."
                },
                {
                  icon: <FaBullseye className="text-white" />,
                  title: "Our Mission",
                  description: "To create jewelry that tells your unique story, celebrates life's precious moments, and connects you with the timeless art of handcrafted beauty."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-6 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  whileHover={{ x: 10 }}
                >
                  <div className="flex flex-col items-center">
                    <motion.div
                      className="w-16 h-16 bg-[#1B4965] rounded-full flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.icon}
                    </motion.div>
                    {index < 2 && (
                      <div className="w-0.5 h-12 bg-teal-200 mt-4"></div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[#1B4965] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}

              <motion.button
                className="bg-[#1B4965] text-white px-8 py-4 rounded-full font-medium hover:bg-[#174b6b] transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Read Our Full Story
                <FaArrowRight className="inline ml-2" />
              </motion.button>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="relative">
                <motion.div
                  className="relative overflow-hidden rounded-2xl shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400"
                    alt="Master artisan at work"
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h4 className="text-lg font-semibold mb-1">Master Craftsmanship</h4>
                    <p className="text-sm opacity-90">Where tradition meets innovation</p>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -top-6 -right-6 w-32 h-32 overflow-hidden rounded-2xl shadow-xl bg-white p-2"
                  initial={{ opacity: 0, x: 50, y: -50 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=200&h=200"
                    alt="Jewelry detail"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -left-6 w-28 h-28 overflow-hidden rounded-2xl shadow-xl bg-white p-2"
                  initial={{ opacity: 0, x: -50, y: 50 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=200&h=200"
                    alt="Crafting tools"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="mt-20 bg-white rounded-3xl shadow-2xl p-12 mx-auto max-w-5xl relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-50 to-transparent rounded-full transform translate-x-32 -translate-y-32"></div>

            <div className="grid md:grid-cols-3 gap-12 text-center relative z-10">
              {[
                { number: "5+", label: "Years of Experience", icon: <FaClock /> },
                { number: "5,000+", label: "Happy Customers", icon: <FaHeart /> },
                { number: "100%", label: "Sustainable Materials", icon: <FaGem /> }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="bg-teal-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#1B4965] transition-all duration-300">
                    <span className="text-2xl text-teal-600 group-hover:text-white transition-colors duration-300">
                      {stat.icon}
                    </span>
                  </div>
                  <motion.h3
                    className="text-4xl md:text-5xl font-light text-[#1B4965] mb-3"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      delay: index * 0.2 + 0.3,
                      type: "spring",
                      stiffness: 200
                    }}
                    viewport={{ once: true }}
                  >
                    {stat.number}
                  </motion.h3>
                  <p className="text-gray-700 font-medium text-lg group-hover:text-[#1B4965] transition-colors duration-300">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
 */}

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
              <motion.button
                className="bg-[#1B4965] text-white px-6 py-3 rounded-sm font-medium hover:bg-[#174b6b] transition-colors duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                Try AI Assistant Now
              </motion.button>
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

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-[#35586e] to-[#0a4367] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:from-[#1b4961] hover:to-[#1b4970] transition-all duration-500"
                  >
                    Explore Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>


      {/* collections Section */}
      <CategoryGrid />
      {/* <motion.section
        className="bg-gray-50 py-16 px-4 md:px-8 lg:px-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className="max-w-7xl mx-auto" variants={itemVariants}>
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl font-semibold mb-2 text-[#1B4965]">Our Collections</h2>
            <div className="w-16 h-0.5 bg-[#1B4965] mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-xl mx-auto mt-4">
              Explore our carefully curated collection of handmade jewelry, each designed with passion and attention to detail.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[img1, img2, img3, img4].map((img, index) => (
              <motion.div
                key={index}
                className="relative group overflow-hidden rounded-lg shadow-xl"
                variants={imageVariants}
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src={img}
                  alt={`Collection ${index + 1}`}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div
                  className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-700 ease-in-out"
                >
                  <h3 className="text-white text-2xl font-semibold mb-2">
                    {index === 0
                      ? 'Earth Elements'
                      : index === 1
                        ? 'Elegant Bracelets'
                        : index === 2
                          ? 'Timeless Necklaces'
                          : 'Colorful Bracelets'}
                  </h3>
                  <p className="text-gray-200 text-sm mb-4">
                    {index === 0
                      ? 'Discover our handcrafted pieces designed for everyday elegance.'
                      : index === 1
                        ? 'Perfectly crafted bracelets for all occasions.'
                        : index === 2
                          ? 'A collection of timeless and elegant necklaces.'
                          : 'Vibrant and colorful bracelets to match your style.'}
                  </p>
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: '#1B4965',
                      color: '#fff',
                      boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="flex items-center justify-center bg-white text-black font-semibold px-5 py-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300"
                  >
                    Explore
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section> */}
    </div>
  );
};

export default Home;
