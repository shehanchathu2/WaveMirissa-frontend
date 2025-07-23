import React, { useState } from 'react';
import { Upload, Camera, CheckCircle, AlertCircle, Sparkles, User, Palette, Eye, Star } from 'lucide-react';
import FaceImageUpload from '../components/AI_suggestion/FaceImageUpload';
import AnalysisResults from '../components/AI_suggestion/AnalysisResults';
import JewelryRecommendations from '../components/AI_suggestion/JewelryRecommendations';
import LoadingSpinner from '../components/AI_suggestion/LoadingSpinner';


  function AI_Suggetion() {
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
      // Simulate API call - replace with actual backend integration
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock analysis results - replace with actual API response
      const mockData = {
        faceShape: 'Oval',
        skinTone: 'Warm',
        confidence: 0.89,
        features: {
          jawline: 'Soft',
          cheekbones: 'Prominent',
          foreheadWidth: 'Balanced'
        }
      };
      
      setAnalysisData(mockData);
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
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
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">AI Facial Analysis</h1>
                <p className="text-sm text-slate-600">Personalized jewelry recommendations</p>
              </div>
            </div>
            
            {uploadedImage && (
              <button
                onClick={handleReset}
                className="flex items-center px-4 py-2 space-x-2 transition-colors duration-200 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                <Upload className="w-4 h-4" />
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
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium text-green-600">Photo Uploaded</span>
              </div>
              
              <div className="w-16 h-1 rounded bg-slate-200">
                <div className={`h-1 bg-[#1B4965] rounded transition-all duration-1000 ${
                  isAnalyzing || analysisData ? 'w-full' : 'w-0'
                }`}></div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  analysisData ? 'bg-green-500' : isAnalyzing ? 'bg-[#1B4965]' : 'bg-slate-300'
                }`}>
                  {analysisData ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : isAnalyzing ? (
                    <Eye className="w-5 h-5 text-white animate-pulse" />
                  ) : (
                    <Eye className="w-5 h-5 text-slate-500" />
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
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  analysisData ? 'bg-green-500' : 'bg-slate-300'
                }`}>
                  {analysisData ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <Star className="w-5 h-5 text-slate-500" />
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
              {/* Uploaded Image */}
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

              {/* Analysis Status */}
              <div className="space-y-6">
                {error && (
                  <div className="flex items-center p-6 space-x-3 border border-red-200 bg-red-50 rounded-xl">
                    <AlertCircle className="flex-shrink-0 w-6 h-6 text-red-500" />
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
                      <div className="h-2 bg-blue-600 rounded-full animate-pulse" style={{width: '60%'}}></div>
                    </div>
                  </div>
                )}

                {analysisData && (
                  <AnalysisResults data={analysisData} />
                )}
              </div>
            </div>

            {/* Jewelry Recommendations */}
            {analysisData && (
              <JewelryRecommendations 
                faceShape={analysisData.faceShape}
                skinTone={analysisData.skinTone}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AI_Suggetion;
