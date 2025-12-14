import React, { useEffect, useState } from "react";
import {
  FaUpload,
  FaCheckCircle,
  FaExclamationCircle,
  FaEye,
  FaStar,
  FaTimes,
  FaRedo,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import FaceImageUpload from "../../components/AI_suggestion/FaceImageUpload";
import AnalysisResults from "../../components/AI_suggestion/AnalysisResults";
import JewelryRecommendations from "../../components/AI_suggestion/JewelryRecommendations";
import LoadingSpinner from "../../components/AI_suggestion/LoadingSpinner";
import ErrorModal from "../../components/AI_suggestion/ErrorModal";
import axios from "axios";
import FaceImageUploadModal from "../../components/ProductPreview/FaceImageUploadModal";
import AnalysisResultsModal from "../../components/ProductPreview/AnalysisResultsModal";
import JewelryRecommendationsModal from "../../components/ProductPreview/JewelryRecommendationsModal";
import { CustomizationModal } from "./CustomizationModal";
import JewelryRecommendationsModalTwo from "./JewelryRecommendationsModalTwo";

const AISuggestionModal = ({ isOpen, onClose, jewelry, onNext }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState(null);
  const [customizations, setCustomizations] = useState([]);
  const [customMaterial, setCustomMaterial] = useState('');
  const [openedViaCustomize, setOpenedViaCustomize] = useState(false);
  const product = jewelry;

  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(product.price);
  useEffect(() => {
    if (!isOpen) {
      setUploadedImage(null);
      setIsAnalyzing(false);
      setAnalysisData(null);
      setError(null);
      setCustomizations([]);
      setCustomMaterial('');
      setOpenedViaCustomize(false);
      setIsCustomizeOpen(false);
      setTotalPrice(jewelry.price);
    }
  }, [isOpen, jewelry]);

  if (!isOpen) return null;

  const handleImageUpload = async (imageFile) => {
    const imageUrl = URL.createObjectURL(imageFile);
    setUploadedImage(imageUrl);
    setIsAnalyzing(true);
    setError(null);
    console.log(jewelry)

    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/recommendations/analyze/customization`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const data = response.data;
      console.log(response.data);
      console.log("jeewry", jewelry)
      setAnalysisData({
        faceShape: data.faceShape,
        skinTone: data.skinTone,
        recommendedCustomizations: data.customizations,
      });

      if (Array.isArray(data.customizations) && Array.isArray(product.customizations)) {
        // Keep only items that exist in BOTH product.customizations and AI response
        const intersection = product.customizations.filter(prodItem =>
          data.customizations.some(aiItem => aiItem.item_id === prodItem.item_id)
        );

        setCustomizations(intersection);
        console.log("customizations", intersection);
      }
      console.log("customizations", customizations);

    } catch (err) {
      if (err.response) {
        const serverMessage = err.response.data?.message;
        if (serverMessage?.toLowerCase().includes("no face")) {
          setError("No face detected. Please upload a clear photo.");
        } else if (err.response.status === 400) {
          setError("Invalid request. Please check the image.");
        } else if (err.response.status === 415) {
          setError("Unsupported file format. Use JPG or PNG.");
        } else if (err.response.status === 500) {
          setError("Server error. Try again later.");
        } else {
          setError(serverMessage || "Something went wrong.");
        }
      } else if (err.request) {
        setError("No response from server. Check your connection.");
      } else {
        setError("Unexpected error: " + err.message);
      }
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

  const handleCustomizeClick = () => {
    setIsCustomizeOpen(true);
  };

  const handleCloseCustomize = () => {
    setIsCustomizeOpen(false);
    setCustomMaterial('');
    setTotalPrice(product.price);
  };

  const handleClose = () => {
    setSelectedOptions([]);        // Clear selected options
    setCustomMaterial('');         // Clear selected material string
    onClose();                     // Call parent onClose to close modal
  };
  const handleNext = (calculatedPrice) => {
    setOpenedViaCustomize(true);
    setTotalPrice(calculatedPrice);
    setIsCustomizeOpen(false);
  };

  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-2">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden max-h-[92vh] flex flex-col scrollbar-hide">
        {/* Simplified Header */}
        <div className="bg-gradient-to-r from-white to-white px-6 py-4 text-black">
          <div className="flex items-center justify-between">
            {/* Left side: Icon + Text */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <HiSparkles className="w-6 h-6 text-[#1b4765]" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">AI Jewelry Assistant</h1>
                <p className="text-black text-sm">Personalized recommendations for you</p>
              </div>
            </div>

            {/* Right side: Close button */}
            <button
              onClick={onClose}
              className="w-8 h-8 bg-gray-300 hover:bg-gray-500 rounded-full flex items-center justify-center transition-colors"
            >
              <FaTimes className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>


        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {!uploadedImage ? (
              <div className="max-w-2xl mx-auto">
                <FaceImageUploadModal onImageUpload={handleImageUpload} />
              </div>
            ) : (
              <div className="space-y-6">
                {/* Simple Progress Indicator */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center justify-between max-w-lg mx-auto">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full">
                        <FaCheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-green-600 font-medium text-sm">Photo Uploaded</span>
                    </div>

                    <div className="flex-1 mx-6">
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-blue-500 rounded-full transition-all duration-1000 ${isAnalyzing || analysisData ? "w-full" : "w-0"
                            }`}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${analysisData
                          ? "bg-green-500"
                          : isAnalyzing
                            ? "bg-blue-500"
                            : "bg-gray-300"
                          }`}
                      >
                        {analysisData ? (
                          <FaCheckCircle className="text-white w-4 h-4" />
                        ) : isAnalyzing ? (
                          <FaEye className="text-white w-4 h-4 animate-pulse" />
                        ) : (
                          <FaEye className="text-gray-500 w-4 h-4" />
                        )}
                      </div>
                      <span
                        className={`font-medium text-sm ${analysisData
                          ? "text-green-600"
                          : isAnalyzing
                            ? "text-blue-600"
                            : "text-gray-500"
                          }`}
                      >
                        {analysisData ? "Complete" : isAnalyzing ? "Analyzing..." : "Pending"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Layout */}
                {analysisData ? (
                  // Full width layout when analysis is complete
                  <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-xl">
                      <AnalysisResultsModal data={analysisData} />
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl">
                      <JewelryRecommendationsModalTwo
                        faceShape={analysisData.faceShape}
                        skinTone={analysisData.skinTone}
                        Customizations={customizations}
                      />
                    </div>
                  </div>
                ) : (
                  // Two column layout for analysis phase
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {error && (
                        <ErrorModal
                          error={error}
                          uploadedImage={uploadedImage}
                          handleReset={handleReset}
                        />
                      )}

                      {isAnalyzing && (
                        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                            <p className="text-blue-700 font-medium">Analyzing your features...</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <HiSparkles className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-sm">Recommendations will appear here</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        {uploadedImage && (
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                <FaRedo className="w-4 h-4" />
                <span>Try Again</span>
              </button>

              {analysisData ? (
                <button
                  onClick={() => {
                    onClose();
                    onNext(customizations);
                  }}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <HiSparkles className="w-4 h-4" />
                  <span>Continue with Recommendations</span>
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="flex items-center gap-2 px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-medium"
                >
                  <span>Close</span>
                </button>
              )}

            </div>
          </div>
        )}

        {/* Customization Modal */}
        <CustomizationModal
          isOpen={isCustomizeOpen}
          onClose={handleCloseCustomize}
          jewelry={product}
          onNext={handleNext}
          customizationOptions={customizations}
        />
      </div>
    </div>
  );
};

export default AISuggestionModal;