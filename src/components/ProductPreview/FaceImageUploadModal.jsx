import React, { useRef, useState, useEffect } from 'react';
import { Upload, Camera, CheckCircle, AlertTriangle, User, Palette, Eye, Sparkles, Play } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';


const FaceImageUpload = ({ onImageUpload }) => {
    const { user } = useAuth();
    const fileInputRef = useRef(null);
    const [dragActive, setDragActive] = useState(false);
    const [demoStep, setDemoStep] = useState(0);
    const [showDemo, setShowDemo] = useState(true);

    // Demo animation cycle
    useEffect(() => {
        if (!showDemo) return;

        const interval = setInterval(() => {
            setDemoStep((prev) => (prev + 1) % 4);
        }, 3000);

        return () => clearInterval(interval);
    }, [showDemo]);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = e.dataTransfer.files;
        if (files && files[0]) {
            handleFile(files[0]);
        }
    };

    const handleFileInput = (e) => {
        const files = e.target.files;
        if (files && files[0]) {
            handleFile(files[0]);
        }
    };

    const handleFile = (file) => {
        if (file.type.startsWith('image/')) {
            setShowDemo(false);
            onImageUpload(file);
        } else {
            alert('Please upload an image file');
        }
    };

    const openFileDialog = () => {
        if (!user) {
            toast.error("Please log in first.");
            return;
        }

        fileInputRef.current?.click();
    };

    const getDemoContent = () => {
        const baseImageUrl = "https://i.pinimg.com/1200x/7c/38/5d/7c385d6ba79b31e28880af9a3ed2f898.jpg";

        return (
            <div className="relative">
                {/* Demo Image */}
                <div className="relative mx-auto overflow-hidden shadow-2xl w-80 h-80 rounded-2xl">
                    <img
                        src={baseImageUrl}
                        alt="Demo face analysis"
                        className="object-cover w-full h-full"
                    />

                    {/* Overlay animations based on demo step */}
                    {demoStep >= 1 && (
                        <>
                            {/* Scanning animation */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1B4965] to-transparent opacity-30 animate-pulse">
                                <div className="w-full h-1 bg-[#1B4965] shadow-lg animate-bounce" style={{
                                    marginTop: `${(demoStep * 25) % 100}%`,
                                    transition: 'margin-top 0.5s ease-in-out'
                                }}></div>
                            </div>

                            {/* Face detection grid */}
                            <div className="absolute inset-0 border-2 border-[#1B4965] animate-pulse">
                                <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-[#1B4965]"></div>
                                <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-[#1B4965]"></div>
                                <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-[#1B4965]"></div>
                                <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-[#1B4965]"></div>
                            </div>
                        </>
                    )}

                    {/* Face shape detection */}
                    {demoStep >= 2 && (
                        <>
                            {/* Face outline */}
                            <svg className="absolute inset-0 w-full h-full animate-pulse" viewBox="0 0 400 400">
                                <ellipse
                                    cx="200"
                                    cy="180"
                                    rx="120"
                                    ry="160"
                                    fill="none"
                                    stroke="#1B4965"
                                    strokeWidth="3"
                                    strokeDasharray="10,5"
                                    className="animate-pulse"
                                />
                            </svg>

                            {/* Face shape label */}
                            <div className="absolute top-2 left-2 bg-[#1B4965] text-white px-3 py-1 rounded-full text-sm font-semibold animate-bounce">
                                <User className="inline w-4 h-4 mr-1" />
                                Oval Face
                            </div>
                        </>
                    )}

                    {/* Skin tone detection */}
                    {demoStep >= 3 && (
                        <>
                            {/* Color sampling points */}
                            <div className="absolute w-3 h-3 border-2 border-white rounded-full top-20 left-32 bg-amber-400 animate-ping"></div>
                            <div className="absolute w-3 h-3 border-2 border-white rounded-full top-32 right-28 bg-amber-400 animate-ping" style={{ animationDelay: '0.5s' }}></div>
                            <div className="absolute w-3 h-3 border-2 border-white rounded-full bottom-32 left-36 bg-amber-400 animate-ping" style={{ animationDelay: '1s' }}></div>

                            {/* Skin tone label */}
                            <div className="absolute px-3 py-1 text-sm font-semibold text-white rounded-full top-2 right-2 bg-amber-500 animate-bounce" style={{ animationDelay: '1s' }}>
                                <Palette className="inline w-4 h-4 mr-1" />
                                Warm Tone
                            </div>

                            {/* Color palette */}
                            <div className="absolute flex space-x-1 bottom-2 left-2 animate-fadeIn">
                                <div className="w-6 h-6 border-2 border-white rounded bg-amber-200"></div>
                                <div className="w-6 h-6 border-2 border-white rounded bg-amber-300"></div>
                                <div className="w-6 h-6 border-2 border-white rounded bg-amber-400"></div>
                            </div>
                        </>
                    )}

                    {/* Analysis complete */}
                    {demoStep === 3 && (
                        <div className="absolute p-2 text-white bg-green-500 rounded-full bottom-2 right-2 animate-bounce">
                            <CheckCircle className="w-5 h-5" />
                        </div>
                    )}
                </div>

                {/* Demo status text */}
                <div className="mt-6 text-center">
                    {demoStep === 0 && (
                        <div className="space-y-2">
                            <p className="text-xl font-semibold text-slate-900">AI-Powered Facial Analysis Demo</p>
                            <p className="text-slate-600">Watch how our AI analyzes facial features</p>
                        </div>
                    )}
                    {demoStep === 1 && (
                        <div className="space-y-2">
                            <p className="text-xl font-semibold text-[#1B4965]">Detecting Face...</p>
                            <p className="text-slate-600">Scanning and identifying facial boundaries</p>
                        </div>
                    )}
                    {demoStep === 2 && (
                        <div className="space-y-2">
                            <p className="text-xl font-semibold text-[#1B4965]">Analyzing Face Shape</p>
                            <p className="text-slate-600">Measuring proportions and contours</p>
                        </div>
                    )}
                    {demoStep === 3 && (
                        <div className="space-y-2">
                            <p className="text-xl font-semibold text-amber-600">Detecting Skin Tone</p>
                            <p className="text-slate-600">Analyzing undertones and color palette</p>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                    Customize Your Jewelry with AI
                </h2>
                <p className="max-w-xl mx-auto text-base leading-relaxed text-slate-600">
                    Upload your photo and let our AI detect your face shape and skin tone
                    to suggest personalized customizations for your selected jewelry piece.
                </p>
            </div>
            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
            />

            {/* Main Demo Section */}
            <div className="grid items-start grid-cols-1 gap-12 lg:grid-cols-2">
                {/* Demo Section */}
                <div className="flex flex-col items-center justify-center">
                    {getDemoContent()}

                    {/* Try Myself Button */}
                    <button
                        onClick={openFileDialog}
                        className="mt-8 px-8 py-4 bg-gradient-to-r from-[#1B4965] to-[#2563EB] text-white rounded-2xl hover:from-[#0f3449] hover:to-[#1d4ed8] transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 text-lg font-semibold shadow-xl"
                    >
                        <Play className="w-6 h-6" />
                        <span>Try It Myself</span>
                    </button>
                </div>

                {/* Guidelines Section */}
                <div className="p-6 bg-white shadow-lg rounded-2xl">
                    <h3 className="flex items-center justify-center mb-4 space-x-2 text-xl font-bold text-slate-900">
                        <CheckCircle className="w-6 h-6 text-[#1B4965]" />
                        <span>Photo Guidelines</span>
                    </h3>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-[#1B4965] rounded-full"></div>
                            <span className="text-slate-700">Make sure your Face is clearly visible</span>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-[#1B4965] rounded-full"></div>
                            <span className="text-slate-700">Upload a Front-facing photo</span>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-[#1B4965] rounded-full"></div>
                            <span className="text-slate-700">Make sure to have Good lighting for image</span>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-[#1B4965] rounded-full"></div>
                            <span className="text-slate-700">No accessories should be worn in image</span>
                        </div>
                    </div>

                    <div className="p-4 mt-4 border rounded-lg bg-amber-50 border-amber-200">
                        <div className="flex items-center justify-center mb-2 space-x-2">
                            <AlertTriangle className="w-5 h-5 text-amber-600" />
                            <p className="font-medium text-amber-900">Privacy Protected</p>
                        </div>
                        <p className="text-sm text-center text-amber-800">
                            Your photos are processed securely and never stored permanently.
                        </p>
                    </div>

                    <div className="flex items-center justify-center mt-4 space-x-6 text-sm text-slate-500">
                        <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Secure & Private</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Sparkles className="w-4 h-4 text-[#1B4965]" />
                            <span>AI-Powered</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Eye className="w-4 h-4 text-purple-500" />
                            <span>Instant Results</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaceImageUpload;