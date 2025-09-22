import React from 'react';
import { motion } from 'framer-motion';
import img2 from '../../assets/about us/img2.jpg'
import img3 from '../../assets/story/img2.jpg'
import img4 from '../../assets/bridal/w.jpg'

// Mock Link component for demo
const Link = ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>;

// Mock images for demo - replace with your actual imports

const CategoryGrid = () => {
    const categories2 = [
        {
            label: "Men's Collection",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=face",
            link: "/shop",
            description: "Discover premium men's fashion"
        },
        {
            label: "Women's Collection",
            image: img2,
            link: "/shop",
            description: "Elegant styles for every occasion"
        },
        {
            label: "Bridal Collection",
            image: img4,
            link: "/shop",
            description: "Complete your perfect look"
        },
        {
            label: "New Arrivals",
            image: img3,
            link: "/shop",
            description: "Fresh styles just for you"
        }
    ];

    return (
        <div className="relative overflow-hidden py-12 lg:py-16 bg-gradient-to-b from-slate-50 via-white to-blue-50/30">
            {/* Decorative background elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-100/30 to-teal-100/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-32 right-20 w-40 h-40 bg-gradient-to-br from-slate-100/40 to-blue-100/40 rounded-full blur-2xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-teal-100/20 to-white/10 rounded-full blur-xl animate-pulse delay-500"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
                
                {/* Section Header */}
                <div className="text-center mb-20">
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
                        Shop Our Collections
                    </motion.h2>
                    
                    <motion.p 
                        className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed" 
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Find exactly what you're looking for in our carefully curated collections
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

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
                    {categories2.map((category, index) => (
                        <motion.a
                            key={index}
                            href={category.link}
                            className="group relative h-80 lg:h-96 rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-200/50 hover:border-slate-300/50"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-out"
                                style={{ backgroundImage: `url(${category.image})` }}
                            />

                            {/* Premium gradient overlays */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent group-hover:from-slate-900/95 group-hover:via-slate-900/50" />
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-teal-900/20 group-hover:from-blue-900/30 group-hover:to-teal-900/30 transition-all duration-500" />

                            {/* Glass morphism overlay */}
                            <div className="absolute inset-0 backdrop-blur-[0.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Floating decorative elements */}
                            <div className="absolute top-6 right-6 w-8 h-8 bg-gradient-to-br from-white/10 to-blue-200/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                            <div className="absolute bottom-24 left-6 w-6 h-6 bg-gradient-to-br from-teal-200/20 to-white/10 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200 animate-pulse"></div>

                            {/* Content Container */}
                            <div className="relative z-10 flex flex-col justify-between h-full p-8 lg:p-10">
                                
                                {/* Category Badge */}
                                <div className="self-start">
                                    <span className="inline-block bg-white/90 backdrop-blur-sm text-slate-700 px-4 py-2 rounded-full text-xs font-medium tracking-wide uppercase border border-white/20 shadow-sm">
                                        Collection
                                    </span>
                                </div>

                                {/* Main Content */}
                                <div className="transform group-hover:translate-y-0 translate-y-2 transition-transform duration-500">
                                    <h3 
                                        className="text-2xl lg:text-3xl xl:text-4xl font-light text-white mb-4 leading-tight"
                                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                    >
                                        {category.label}
                                    </h3>
                                    <p 
                                        className="text-white/90 text-base lg:text-lg mb-8 leading-relaxed"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    >
                                        {category.description}
                                    </p>

                                    {/* CTA Section */}
                                    <div className="flex items-center justify-between">
                                        <motion.button 
                                            className="bg-white/90 backdrop-blur-sm text-slate-900 px-6 py-3 rounded-full font-semibold text-sm hover:bg-white transition-all duration-300 shadow-lg border border-white/20"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Shop Now
                                        </motion.button>

                                        {/* Arrow Icon */}
                                        <motion.div 
                                            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 border border-white/10"
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                        >
                                            <svg
                                                className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform duration-300"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>

                            {/* Premium accent lines */}
                            <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-400 via-teal-400 to-blue-500 group-hover:w-full transition-all duration-700 ease-out shadow-lg" />
                            <div className="absolute right-0 bottom-0 w-1 h-0 bg-gradient-to-t from-teal-300 via-blue-300 to-white/50 group-hover:h-24 transition-all duration-500 delay-200" />

                            {/* Corner decorative element */}
                            <div className="absolute top-4 left-4 w-2 h-2 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300 animate-pulse"></div>
                            <div className="absolute bottom-4 right-4 w-3 h-3 bg-gradient-to-br from-blue-300/50 to-teal-300/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-400 animate-pulse"></div>

                            {/* Focus ring for accessibility */}
                            <div className="absolute inset-0 rounded-3xl ring-2 ring-slate-700 ring-opacity-0 group-focus:ring-opacity-50 transition-all duration-200" />
                        </motion.a>
                    ))}
                </div>

                {/* Bottom Call-to-Action Section */}
                <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-xl border border-slate-200/50 max-w-2xl mx-auto">
                        {/* Floating decorative elements */}
                        <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-blue-100/30 to-teal-100/30 rounded-full blur-xl animate-pulse"></div>
                        <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-br from-slate-100/40 to-blue-100/40 rounded-full blur-lg animate-pulse delay-700"></div>

                        <div className="relative z-10">
                            <h3 
                                className="text-2xl lg:text-3xl font-light text-slate-900 mb-4"
                                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                            >
                                Can't find what you're looking for?
                            </h3>
                            <p 
                                className="text-slate-600 text-base lg:text-lg mb-8 leading-relaxed"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                                Browse our complete product catalog for more exquisite pieces
                            </p>
                            
                            <Link to="shop">
                                <motion.button
                                    className="group relative overflow-hidden bg-gradient-to-r from-slate-900 to-blue-900 text-white px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-wide shadow-xl hover:shadow-2xl transition-all duration-300"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="relative z-10">Shop Now</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-teal-800 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                                </motion.button>
                            </Link>

                            {/* Bottom accent line */}
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: 60 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.8 }}
                                className="h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-auto mt-8"
                            ></motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Final decorative element */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 1 }}
                    className="text-center mt-16"
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
            </div>
        </div>
    );
};

export default CategoryGrid;