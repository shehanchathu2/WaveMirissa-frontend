import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import bg1 from '../../assets/bg1.jpg';
import bg2 from '../../assets/bg2.jpg';
import bg3 from '../../assets/bg3.jpg';
import bg4 from '../../assets/bg4.jpg';
import { FaHandHoldingHeart } from "react-icons/fa";
import { MdEco } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import { FaGift } from 'react-icons/fa';//Special Occasions

import { FaBoxOpen } from 'react-icons/fa'; //Gift-Ready Packaging
import { FaPencilRuler } from 'react-icons/fa';//Thoughtfully Designed

import { FaPenFancy } from 'react-icons/fa';
// import { FaHeart } from 'react-icons/fa';
import { FaCogs } from 'react-icons/fa';

import { FaLeaf } from 'react-icons/fa';
import { FaTree } from 'react-icons/fa';
import { FaRecycle } from 'react-icons/fa';

import { FaHourglassHalf } from 'react-icons/fa';
import { FaGem } from 'react-icons/fa';
import { FaSearchPlus } from 'react-icons/fa';


import { Link } from 'react-router-dom';



const HeroImages = [
    {
        src: bg1,
        alt: 'Hero Image 1',
        title: 'Handcrafted Jewelry for Your Unique Style',
        description: 'Each piece is uniquely handcrafted using natural materials and traditional techniques. Discover our one-of-a-kind collections that tell stories of artisanal craftsmanship.',
        icons: [
            <FaHandHoldingHeart key="handmade" size={30} color="#0A3D62" />,
            <MdEco key="eco" size={30} color="#0A3D62" />,
            <FaHeart key="heart" size={25} color="#0A3D62" />
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
        title: 'Custom Jewelry Made Just for You ',
        description: ' Celebrate your uniqueness with personalized, handcrafted pieces that speak your story. Name engravings, birthstones, or your own design-made with heart..',
        icons: [
            <FaGift key="gift" size={30} color="#0A3D62" />,
            <FaHeart key="packaging" size={30} color="#0A3D62" />,
            <FaCogs key="design" size={30} color="#0A3D62" />
        ],
        iconsinfo: [
            'Engraved by Hand ',
            'Perfect Gift',
            'Fully Customizable'
        ]
    },
    {
        src: bg3,
        alt: 'Hero Image 3',
        title: 'Jewelry Inspired by the Beauty of Nature',
        description: ' Our collections echo the colors, textures, and magic of the natural world. Crafted for those who find beauty in every leaf, stone, and breeze find beauty in every leaf, stone, and breeze..',
        icons: [
            <FaLeaf key="nature" size={30} color="#0A3D62" />,
            <FaTree key="tree" size={30} color="#0A3D62" />,
            <FaRecycle key="recycle" size={30} color="#0A3D62" />
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
        title: ' Timeless Jewelry That Tells Your Story ',
        description: 'Discover elegant pieces inspired by timeless beauty and designed to become cherished heirlooms. Your journey deserves sparkle that lasts forever..',
        icons: [
            <FaHourglassHalf key="timeless" size={30} color="#0A3D62" />,
            <FaGem key="gem" size={30} color="#0A3D62" />,
            <FaSearchPlus key="search" size={30} color="#0A3D62" />
        ],
        iconsinfo: [
            'Timeless Appeal ',
            'Elegant Finishes ',
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
        <div className="relative w-full h-[650px] overflow-hidden">

            {/* Background image with animation */}
            <AnimatePresence>
                <motion.img
                    key={HeroImages[currentIndex].src}
                    src={HeroImages[currentIndex].src}
                    alt={HeroImages[currentIndex].alt}
                    className="absolute w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1 }}
                />
            </AnimatePresence>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-black/50 to-transparent z-10"></div>







            {/* Left text and buttons */}
            <div className="absolute z-20 left-40 top-[400px] transform -translate-y-1/2 text-left max-w-xl p-6">

                <p className="text-sm  text-gray-500 italic mb-1">Wave Mirissa</p>

                <AnimatePresence mode="wait">
                    <motion.h1
                        key={HeroImages[currentIndex].title}
                        className="text-5xl font-lily  text-[#0A3D62] leading-tight mb-3 "
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8 }}
                    >
                        {HeroImages[currentIndex].title}
                    </motion.h1>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    <motion.p
                        key={HeroImages[currentIndex].description}
                        className="text-gray-900 text-base mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {HeroImages[currentIndex].description}
                    </motion.p>
                </AnimatePresence>

                {/* Action Buttons */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex} // optional if you want to animate on slide change
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex space-x-4 mb-10"
                    >
                        <Link to="/shop">
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="bg-[#1f445f] text-white px-5 py-2 rounded-md font-semibold hover:bg-[#1B4965] transition"
                            >
                                Shop Now
                            </motion.button>
                        </Link>

                        <Link to="/virtual_try_on">
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="border border-[#2a4f64] text-[#25495e] px-5 py-2 rounded-md font-semibold hover:bg-[#1B4965] hover:text-white transition"
                            >
                                Virtual Try-On
                            </motion.button>
                        </Link>
                    </motion.div>
                </AnimatePresence>


                {/* Feature Icons */}
                {/* <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex} // Important: triggers animation when hero changes
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex space-x-10 mt-10"
                    >
                        {HeroImages[currentIndex].icons.map((iconElement, index) => (
                            <motion.div
                                key={iconElement.key || index} // Use icon key if defined, fallback to index
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }} // Stagger effect
                                className="flex items-center text-center text-sm text-gray-700 gap-4"
                            >
                                {iconElement}
                                <span>
                                    {HeroImages[currentIndex].iconsinfo[index]}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence> */}


            </div>






            {/* Manual controls */}
            <button
                onClick={prevSlide}
                className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition z-20"
            >
                &#10094;
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition z-20"
            >
                &#10095;
            </button>

            {/* Dots */}
            <div className="absolute bottom-5 w-full flex justify-center gap-2 z-20">
                {HeroImages.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full cursor-pointer ${index === currentIndex ? 'bg-white' : 'bg-gray-400'
                            }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
