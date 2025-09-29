// ActiveBanner.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ActiveBanner = () => {
    const [activeBanner, setActiveBanner] = useState(null);

    // Fetch active banner from backend
    const fetchActiveBanner = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/banners/active");
            setActiveBanner(response.data);
        } catch (error) {
            console.error("Failed to fetch active banner:", error);
            setActiveBanner(null);
            // toast.error("Failed to fetch active banner."); // optional if you don’t want a toast
        }
    };

    useEffect(() => {
        fetchActiveBanner();
    }, []);

    // If no active banner → render nothing
    if (!activeBanner) {
        return null;
    }

    return (
        <div className="w-full mb-8">
            {/* Hero Banner Section */}
            <div className="relative overflow-hidden">
                {/* Background with gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent z-10"></div>
                
                {/* Main Banner Image */}
                <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px]">
                    <img
                        src={activeBanner.imageUrl}
                        alt={activeBanner.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="max-w-2xl">
                            {/* Banner Title */}
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                                {activeBanner.title}
                            </h1>
                            
                            {/* Call to Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mt-8">
                                <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                                    Shop Now
                                </button>
                                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 z-30">
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                        FEATURED
                    </div>
                </div>

                {/* Bottom fade effect */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
            </div>

            {/* Additional Promotional Strip */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center space-x-8 text-sm font-medium">
                        <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            <span>Free Shipping</span>
                        </div>
                        <div className="hidden sm:flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Quality Guarantee</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            <span>Best Prices</span>
                        </div>
                        <div className="hidden md:flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>24/7 Support</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActiveBanner;
