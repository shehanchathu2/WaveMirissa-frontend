import React from 'react';
import { motion } from 'framer-motion';
import img1 from '../../assets/story/img1.jpg'
import img2 from '../../assets/story/img2.jpg'
import img3 from '../../assets/story/img3.jpg'
import img4 from '../../assets/story/img4.jpg'

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
            className="relative overflow-hidden py-20 bg-[#f8f9fa]"
        >
            <div className="text-center mb-16 px-4">
                <h2 className="text-3xl font-semibold mb-2 text-[#1B4965]">Our Story</h2>
                <div className="w-20 h-1 bg-[#1B4965] mx-auto mt-4 rounded"></div>
                <p className="text-lg text-[#1B4965]/80 mt-4 max-w-2xl mx-auto">
                    Every piece tells a story of passion, craftsmanship, and timeless beauty.
                </p>
            </div>
            {/* Full Height Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 h-full md:h-[calc(100vh-200px)]">
                {storyItems.map((item, index) => (
                    <div
                        key={index}
                        className="group relative h-96 md:h-full overflow-hidden cursor-pointer"
                    >
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                            style={{ backgroundImage: `url(${item.image})` }}
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-[#1b4765]/30 group-hover:bg-[#1b4765]/50 transition-all duration-500" />

                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col justify-end p-8">
                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                {/* Subtitle */}
                                <span className="inline-block text-white/70 text-sm font-medium tracking-widest uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                    {item.subtitle}
                                </span>

                                {/* Title */}
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                                    {item.title}
                                </h3>

                                {/* Description */}
                                <p className="text-white/90 text-sm md:text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 transform translate-y-4 group-hover:translate-y-0">
                                    {item.description}
                                </p>

                                {/* Learn More Link */}
                                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300">
                                    <span className="inline-flex items-center text-white text-sm font-medium hover:text-white/80 transition-colors">
                                        Learn More
                                        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Number Indicator */}
                        <div className="absolute top-8 left-8 z-20">
                            <span className="text-6xl font-light text-white/20 group-hover:text-white/40 transition-colors duration-500">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                        </div>

                        {/* Bottom Border */}
                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-white group-hover:w-full transition-all duration-700 ease-out" />
                    </div>
                ))}
            </div>
        </motion.section>);
};

export default StorySection;