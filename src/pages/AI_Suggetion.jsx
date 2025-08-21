// src/pages/AI_Suggestion.jsx
import React, { useState } from 'react';
import { FaUpload, FaCheckCircle, FaExclamationCircle, FaEye, FaStar } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import FaceImageUpload from '../components/AI_suggestion/FaceImageUpload';
import AnalysisResults from '../components/AI_suggestion/AnalysisResults';
import JewelryRecommendations from '../components/AI_suggestion/JewelryRecommendations';
import LoadingSpinner from '../components/AI_suggestion/LoadingSpinner';

function AI_Suggestion() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState(null);

  const handleImageUpload = async (imageFile) => {
    const imageUrl = URL.createObjectURL(imageFile);
    setUploadedImage(imageUrl);
    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await fetch('http://localhost:8080/api/recommendations/analyze', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errMsg = await response.text();
        throw new Error(errMsg || 'Failed to analyze image.');
      }

      const data = await response.json(); // { faceShape, skinTone, products[] }

      setAnalysisData({
        faceShape: data.faceShape,
        skinTone: data.skinTone,
        recommendedProducts: data.products
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setUploadedImage(null);
    setAnalysisData(null);
    setError(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm border-slate-200">
        <div className="px-6 py-4 mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#1B4965] to-[#2563EB] rounded-xl flex items-center justify-center">
                <HiSparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">AI Facial Analysis</h1>
                <p className="text-sm text-slate-600">Personalized jewelry recommendations</p>
              </div>
            </div>

            {uploadedImage && (
              <button
                onClick={handleReset}
                className="flex items-center px-4 py-2 space-x-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                <FaUpload className="w-4 h-4" />
                <span>New Analysis</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8 mx-auto max-w-7xl">
        {!uploadedImage ? (
          <FaceImageUpload onImageUpload={handleImageUpload} />
        ) : (
          <div className="space-y-8">
            {/* Progress Indicator */}
            <div className="flex items-center justify-center mb-8 space-x-8">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full">
                  <FaCheckCircle className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium text-green-600">Photo Uploaded</span>
              </div>

              <div className="w-16 h-1 rounded bg-slate-200">
                <div className={`h-1 bg-[#1B4965] rounded transition-all duration-1000 ${
                  isAnalyzing || analysisData ? 'w-full' : 'w-0'
                }`}></div>
              </div>

              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  analysisData ? 'bg-green-500' : isAnalyzing ? 'bg-[#1B4965]' : 'bg-slate-300'
                }`}>
                  {analysisData ? (
                    <FaCheckCircle className="w-5 h-5 text-white" />
                  ) : isAnalyzing ? (
                    <FaEye className="w-5 h-5 text-white animate-pulse" />
                  ) : (
                    <FaEye className="w-5 h-5 text-slate-500" />
                  )}
                </div>
                <span className={`font-medium ${
                  analysisData ? 'text-green-600' : isAnalyzing ? 'text-[#1B4965]' : 'text-slate-500'
                }`}>
                  {analysisData ? 'Analysis Complete' : isAnalyzing ? 'Analyzing...' : 'Analysis Pending'}
                </span>
              </div>

              <div className="w-16 h-1 rounded bg-slate-200">
                <div className={`h-1 bg-[#1B4965] rounded transition-all duration-1000 delay-500 ${
                  analysisData ? 'w-full' : 'w-0'
                }`}></div>
              </div>

              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  analysisData ? 'bg-green-500' : 'bg-slate-300'
                }`}>
                  {analysisData ? (
                    <FaCheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <FaStar className="w-5 h-5 text-slate-500" />
                  )}
                </div>
                <span className={`font-medium ${
                  analysisData ? 'text-green-600' : 'text-slate-500'
                }`}>
                  Recommendations
                </span>
              </div>
            </div>

            {/* Image and Analysis */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="p-6 bg-white shadow-lg rounded-2xl">
                <h2 className="mb-4 text-xl font-semibold text-slate-900">Your Photo</h2>
                <div className="relative">
                  <img
                    src={uploadedImage}
                    alt="Uploaded face"
                    className="object-cover w-full h-80 rounded-xl"
                  />
                  {isAnalyzing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
                      <div className="text-center">
                        <LoadingSpinner size="large" />
                        <p className="mt-4 font-medium text-white">Analyzing facial features...</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                {error && (
                  <div className="flex items-center p-6 space-x-3 border border-red-200 bg-red-50 rounded-xl">
                    <FaExclamationCircle className="w-6 h-6 text-red-500" />
                    <p className="text-red-700">{error}</p>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="p-6 border border-blue-200 bg-blue-50 rounded-xl">
                    <div className="flex items-center mb-4 space-x-3">
                      <LoadingSpinner size="small" />
                      <div>
                        <p className="font-medium text-blue-900">Analyzing facial features...</p>
                        <p className="text-sm text-blue-700">This may take a few moments</p>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-blue-200 rounded-full">
                      <div className="h-2 bg-blue-600 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                )}

                {analysisData && (
                  <AnalysisResults data={analysisData} />
                )}
              </div>
            </div>

            {analysisData && (
              <JewelryRecommendations
                faceShape={analysisData.faceShape}
                skinTone={analysisData.skinTone}
                products={analysisData.recommendedProducts}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AI_Suggestion;
