import React from 'react'

const CategoryGrid = () => {
    const categories2 = [
        {
            label: "Men's Collection",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=face",
            link: "/mens",
            description: "Discover premium men's fashion"
        },
        {
            label: "Women's Collection",
            image: "https://images.unsplash.com/photo-1494790108755-2616c6d1e3b0?w=800&h=600&fit=crop&crop=face",
            link: "/womens",
            description: "Elegant styles for every occasion"
        },
        {
            label: "Accessories",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop",
            link: "/accessories",
            description: "Complete your perfect look"
        },
        {
            label: "New Arrivals",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
            link: "/new-arrivals",
            description: "Fresh styles just for you"
        }
    ];

    return (
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-[90vh] p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-semibold mb-2 text-[#1B4965]">
                        Shop Our Collections
                    </h2>
                    <div className="w-16 h-0.5 bg-[#1B4965] mx-auto mt-4"></div>
                    <p className="text-gray-600 max-w-xl mx-auto mt-4">
                        Find exactly what you're looking for in our carefully selected categories
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {categories2.map((category, index) => (
                        <a
                            key={index}
                            href={category.link}
                            className="group relative h-64 md:h-80 rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-200"
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500 ease-out"
                                style={{ backgroundImage: `url(${category.image})` }}
                            />

                            {/* Gradient Overlay - More accessible */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1b4765]/90 via-[#1b4765]/20 to-transparent" />
                            <div className="absolute inset-0 bg-[#1b4765]/0 group-hover:bg-[#1b4765]/10 transition-all duration-300" />

                            {/* Content Container */}
                            <div className="relative z-10 flex flex-col justify-end h-full p-6">
                                {/* Category Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="inline-block bg-white/90 text-[#1b4765] px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                                        COLLECTION
                                    </span>
                                </div>

                                {/* Main Content */}
                                <div className="transform group-hover:translate-y-0 translate-y-1 transition-transform duration-300">
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                                        {category.label}
                                    </h3>
                                    <p className="text-slate-200 text-sm mb-4 leading-relaxed">
                                        {category.description}
                                    </p>

                                    {/* CTA Button */}
                                    <div className="flex items-center justify-between">
                                        <button className="bg-white text-[#1b4765] px-4 py-2 rounded-lg font-medium text-sm hover:bg-slate-50 transition-colors duration-200 shadow-sm">
                                            Shop Now
                                        </button>

                                        {/* Arrow Icon */}
                                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-200 backdrop-blur-sm">
                                            <svg
                                                className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform duration-300"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Accessibility Focus Ring */}
                            <div className="absolute inset-0 rounded-xl ring-2 ring-[#1b4765] ring-opacity-0 group-focus:ring-opacity-50 transition-all duration-200" />
                        </a>
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="text-center mt-12 md:mt-16">
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 max-w-md mx-auto">
                        <h3 className="text-lg font-semibold text-[#1b4765] mb-2">
                            Can't find what you're looking for?
                        </h3>
                        <p className="text-slate-600 text-sm mb-6">
                            Browse our complete product catalog
                        </p>
                        <button className="bg-[#1b4765] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1b4765]/90 transition-colors duration-200 shadow-sm hover:shadow-md w-full md:w-auto">
                            View All Products
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryGrid