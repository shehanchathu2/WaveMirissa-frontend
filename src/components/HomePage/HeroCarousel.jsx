import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import bg1 from '../../assets/bg1.jpg';
import bg2 from '../../assets/bg2.jpg';
import bg3 from '../../assets/bg3.jpg';
import bg4 from '../../assets/bg4.jpg';
import { FaHandHoldingHeart } from "react-icons/fa";
import { MdEco } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import { FaGift } from 'react-icons/fa';
import { FaBoxOpen } from 'react-icons/fa';
import { FaPencilRuler } from 'react-icons/fa';
import { FaPenFancy } from 'react-icons/fa';
import { FaCogs } from 'react-icons/fa';
import { FaLeaf } from 'react-icons/fa';
import { FaTree } from 'react-icons/fa';
import { FaRecycle } from 'react-icons/fa';
import { FaHourglassHalf } from 'react-icons/fa';
import { FaGem } from 'react-icons/fa';
import { FaSearchPlus } from 'react-icons/fa';
// import { Link } from 'react-router-dom'; // Mock Link component for demo
const Link = ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>;

// Mock images for demonstration - replace with your actual imports


const HeroImages = [
    {
        src: bg1,
        alt: 'Hero Image 1',
        title: 'Handcrafted Jewelry for Your Unique Style',
        description: 'Each piece is uniquely handcrafted using natural materials and traditional techniques. Discover our one-of-a-kind collections that tell stories of artisanal craftsmanship.',
        icons: [
            <FaHandHoldingHeart key="handmade" size={24} color="#0F4C75" />,
            <MdEco key="eco" size={24} color="#0F4C75" />,
            <FaHeart key="heart" size={20} color="#0F4C75" />
        ],
        iconsinfo: [
            'Handmade with Love',
            'Natural Materials',
            'Made to Order'
        ]
    },
    {
        src: bg2,
        alt: 'Hero Image 2',
        title: 'Custom Jewelry Made Just for You',
        description: 'Celebrate your uniqueness with personalized, handcrafted pieces that speak your story. Name engravings, birthstones, or your own design-made with heart.',
        icons: [
            <FaGift key="gift" size={24} color="#0F4C75" />,
            <FaHeart key="packaging" size={24} color="#0F4C75" />,
            <FaCogs key="design" size={24} color="#0F4C75" />
        ],
        iconsinfo: [
            'Engraved by Hand',
            'Perfect Gift',
            'Fully Customizable'
        ]
    },
    {
        src: bg3,
        alt: 'Hero Image 3',
        title: 'Jewelry Inspired by the Beauty of Nature',
        description: 'Our collections echo the colors, textures, and magic of the natural world. Crafted for those who find beauty in every leaf, stone, and breeze.',
        icons: [
            <FaLeaf key="nature" size={24} color="#0F4C75" />,
            <FaTree key="tree" size={24} color="#0F4C75" />,
            <FaRecycle key="recycle" size={24} color="#0F4C75" />
        ],
        iconsinfo: [
            'Eco-Friendly',
            'Nature Inspired',
            'Sustainable Choice'
        ]
    },
    {
        src: bg4,
        alt: 'Hero Image 4',
        title: 'Timeless Jewelry That Tells Your Story',
        description: 'Discover elegant pieces inspired by timeless beauty and designed to become cherished heirlooms. Your journey deserves sparkle that lasts forever.',
        icons: [
            <FaHourglassHalf key="timeless" size={24} color="#0F4C75" />,
            <FaGem key="gem" size={24} color="#0F4C75" />,
            <FaSearchPlus key="search" size={24} color="#0F4C75" />
        ],
        iconsinfo: [
            'Timeless Appeal',
            'Elegant Finishes',
            'Fine Detailing'
        ]
    }
];

const HeroCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % HeroImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % HeroImages.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? HeroImages.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Background image with animation */}
            <AnimatePresence>
                <motion.div
                    key={HeroImages[currentIndex].src}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                >
                    <img
                        src={HeroImages[currentIndex].src}
                        alt={HeroImages[currentIndex].alt}
                        className="w-full h-full object-cover"
                    />
                    {/* Premium overlay with sophisticated gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/10"></div>
                </motion.div>
            </AnimatePresence>

            {/* Main content container */}
            <div className="relative z-20 min-h-screen flex items-center">
                <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        
                        {/* Left content */}
                        <div className="space-y-8 lg:pr-8">
                            {/* Brand tag */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="inline-flex items-center space-x-2"
                            >
                                <div className="w-8 h-0.5 bg-gradient-to-r from-blue-800 to-teal-600"></div>
                                <span className="text-sm font-medium tracking-widest text-slate-600 uppercase">
                                    Wave Mirissa
                                </span>
                            </motion.div>

                            {/* Main headline */}
                            <AnimatePresence mode="wait">
                                <motion.h1
                                    key={HeroImages[currentIndex].title}
                                    className="text-4xl md:text-5xl xl:text-6xl font-light leading-tight text-slate-900"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}
                                    transition={{ duration: 0.9, ease: "easeOut" }}
                                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                >
                                    {HeroImages[currentIndex].title}
                                </motion.h1>
                            </AnimatePresence>

                            {/* Description */}
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={HeroImages[currentIndex].description}
                                    className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                >
                                    {HeroImages[currentIndex].description}
                                </motion.p>
                            </AnimatePresence>

                            {/* Feature highlights */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                    className="flex flex-wrap gap-6 py-4"
                                >
                                    {HeroImages[currentIndex].icons.map((iconElement, index) => (
                                        <motion.div
                                            key={iconElement.key || index}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
                                            className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-200/50 hover:bg-white/80 transition-all duration-300"
                                        >
                                            {iconElement}
                                            <span className="text-sm font-medium text-slate-700 whitespace-nowrap">
                                                {HeroImages[currentIndex].iconsinfo[index]}
                                            </span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>

                            {/* CTA Buttons */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                    className="flex flex-col sm:flex-row gap-4"
                                >
                                    <Link to="/shop">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="group relative overflow-hidden bg-gradient-to-r from-slate-900 to-blue-900 text-white px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-wide shadow-xl hover:shadow-2xl transition-all duration-300"
                                        >
                                            <span className="relative z-10">Shop Collection</span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-teal-800 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                                        </motion.button>
                                    </Link>

                                    <Link to="/virtual_try_on">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="group border-2 border-slate-900 text-slate-900 px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-wide hover:bg-slate-900 hover:text-white transition-all duration-300 relative overflow-hidden"
                                        >
                                            <span className="relative z-10">Virtual Try-On</span>
                                        </motion.button>
                                    </Link>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        
                        {/* Right side - decorative element */}
                        <div className="hidden lg:block relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.6 }}
                                className="w-64 h-64 bg-gradient-to-br from-blue-100/50 to-teal-100/50 rounded-full blur-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            ></motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation controls */}
            <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm text-slate-700 rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg border border-slate-200/50 z-30 flex items-center justify-center"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm text-slate-700 rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg border border-slate-200/50 z-30 flex items-center justify-center"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Pagination dots */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
                {HeroImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentIndex 
                                ? 'bg-slate-900 w-8' 
                                : 'bg-slate-400 hover:bg-slate-600'
                        }`}
                    ></button>
                ))}
            </div>

            {/* Decorative elements */}
            <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-teal-200/30 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-40 left-10 w-24 h-24 bg-gradient-to-br from-slate-200/40 to-blue-200/40 rounded-full blur-xl animate-pulse delay-1000"></div>
        </div>
    );
};

export default HeroCarousel;