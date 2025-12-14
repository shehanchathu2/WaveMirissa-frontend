import React from 'react';
import { motion } from 'framer-motion';
import img1 from '../../assets/story/img1.jpg'
import img2 from '../../assets/story/img2.jpg'
import img3 from '../../assets/story/img3.jpg'
import img4 from '../../assets/story/img4.jpg'

// Mock images for demo - replace with your actual imports

const StorySection = () => {
    const storyItems = [
        {
            image: img1,
            title: "Our Beginning",
            subtitle: "Founded 2019",
            description: "Started with a passion for preserving traditional craftsmanship while embracing modern design sensibilities."
        },
        {
            image: img3,
            title: "Master Craftsmanship",
            subtitle: "Handcrafted Excellence",
            description: "Each piece meticulously created by skilled artisans using time-honored techniques passed down through generations."
        },
        {
            image: img2,
            title: "Premium Materials",
            subtitle: "Sustainable & Ethical",
            description: "We source only the finest materials, ensuring every piece meets our highest standards of quality and ethics."
        },
        {
            image: img4,
            title: "Your Story",
            subtitle: "Timeless Moments",
            description: "Creating jewelry that tells your unique story, celebrates life's precious moments, and connects you with timeless beauty."
        }
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden lg:py-32 bg-gradient-to-b from-slate-50 via-white to-blue-50/30"
        >
            {/* Decorative background elements */}
            <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-blue-100/30 to-teal-100/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-32 right-20 w-32 h-32 bg-gradient-to-br from-slate-100/40 to-blue-100/40 rounded-full blur-2xl animate-pulse delay-1000"></div>

            {/* Section Header */}
            <div className="text-center px-6 lg:px-4 relative z-10">
                {/* Decorative line */}
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 80 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent mx-auto mb-8"
                ></motion.div>

                <motion.h2
                    className="text-4xl lg:text-5xl font-light text-slate-900 mb-6"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Our Story
                </motion.h2>

                <motion.p
                    className="text-lg lg:text-xl text-slate-600 mt-6 max-w-3xl mx-auto leading-relaxed"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    Every piece tells a story of passion, craftsmanship, and timeless beauty.
                </motion.p>

                {/* Bottom decorative element */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6 }}
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
            </div>

            {/* Story Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-full lg:h-[calc(100vh-200px)] gap-2">
                {storyItems.map((item, index) => (
                    <motion.div
                        key={index}
                        className="group relative h-96 lg:h-full overflow-hidden cursor-pointer"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.8 }}
                        whileHover={{ y: -4 }}
                    >
                        {/* Background Image with premium overlay */}
                        <div
                            className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                            style={{ backgroundImage: `url(${item.image})` }}
                        />

                        {/* Premium gradient overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent group-hover:from-slate-900/90 group-hover:via-slate-900/50 transition-all duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-teal-900/20 group-hover:from-blue-900/30 group-hover:to-teal-900/30 transition-all duration-500" />

                        {/* Glass morphism overlay */}
                        <div className="absolute inset-0 backdrop-blur-[0.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Floating decorative elements */}
                        <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-white/10 to-blue-200/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                        <div className="absolute bottom-20 left-6 w-6 h-6 bg-gradient-to-br from-teal-200/20 to-white/10 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200 animate-pulse"></div>

                        {/* Content Container */}
                        <div className="relative z-10 h-full flex flex-col justify-end p-8 lg:p-10">
                            <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">

                                {/* Subtitle */}
                                <motion.span
                                    className="inline-block text-white/70 text-xs lg:text-sm font-medium tracking-widest uppercase mb-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100"
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                >
                                    {item.subtitle}
                                </motion.span>

                                {/* Title */}
                                <h3
                                    className="text-2xl lg:text-3xl xl:text-4xl font-light text-white mb-4 lg:mb-6 leading-tight"
                                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                >
                                    {item.title}
                                </h3>

                                {/* Description */}
                                <p
                                    className="text-white/90 text-sm lg:text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 transform translate-y-4 group-hover:translate-y-0 mb-6"
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                >
                                    {item.description}
                                </p>

                                {/* Learn More Link */}
                                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300 transform translate-y-2 group-hover:translate-y-0">
                                    <span
                                        className="inline-flex items-center text-white text-sm font-medium hover:text-blue-200 transition-colors duration-300 group/link"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    >
                                        Learn More
                                        <svg className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Number Indicator with premium styling */}
                        <div className="absolute top-8 left-8 z-20">
                            <span
                                className="text-5xl lg:text-6xl font-light text-white/20 group-hover:text-white/40 transition-colors duration-500"
                                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                            >
                                {String(index + 1).padStart(2, '0')}
                            </span>
                        </div>

                        {/* Premium bottom accent */}
                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-400 via-teal-400 to-blue-500 group-hover:w-full transition-all duration-700 ease-out shadow-lg" />

                        {/* Side accent line */}
                        <div className="absolute right-0 bottom-0 w-1 h-0 bg-gradient-to-t from-teal-300 via-blue-300 to-white/50 group-hover:h-32 transition-all duration-500 delay-200" />

                        {/* Corner decorative element */}
                        <div className="absolute bottom-4 right-4 w-2 h-2 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-400 animate-pulse"></div>
                    </motion.div>
                ))}
            </div>

            {/* Bottom section decorative element */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8 }}
                className="text-center mt-6 relative z-10"
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
        </motion.section>
    );
};

export default StorySection;