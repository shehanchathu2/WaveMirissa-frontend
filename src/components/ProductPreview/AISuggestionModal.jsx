import React, { useState } from "react";
import {
  FaUpload,
  FaCheckCircle,
  FaExclamationCircle,
  FaEye,
  FaStar,
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
        "http://localhost:8080/api/recommendations/analyze/customization",
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


  const handleNext = (calculatedPrice) => {
    setOpenedViaCustomize(true);
    setTotalPrice(calculatedPrice);
    setIsCustomizeOpen(false);

    // if (product.producttype === 'neckless' || product.producttype === 'ring') {
    //   setIsSizeModalOpen(true);
    // }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-full max-w-5xl p-6 bg-white rounded-2xl shadow-lg overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#1B4965] to-[#2563EB] rounded-xl flex items-center justify-center">
              <HiSparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">AI Jewelry Customization</h1>
              <p className="text-sm text-slate-600">
                Tailored designs based on your face shape & skin tone
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 text-sm bg-slate-100 rounded-lg hover:bg-slate-200"
          >
            Close
          </button>
        </div>

        {/* Main Content */}
        {!uploadedImage ? (
          <FaceImageUploadModal onImageUpload={handleImageUpload} />
        ) : (
          <div className="space-y-6">
            {/* Progress */}
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full">
                  <FaCheckCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-green-600 font-medium">Photo Uploaded</span>
              </div>
              <div className="w-16 h-1 bg-slate-200 rounded">
                <div
                  className={`h-1 bg-[#1B4965] rounded transition-all duration-1000 ${isAnalyzing || analysisData ? "w-full" : "w-0"
                    }`}
                ></div>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${analysisData
                    ? "bg-green-500"
                    : isAnalyzing
                      ? "bg-[#1B4965]"
                      : "bg-slate-300"
                    }`}
                >
                  {analysisData ? (
                    <FaCheckCircle className="text-white w-5 h-5" />
                  ) : isAnalyzing ? (
                    <FaEye className="text-white w-5 h-5 animate-pulse" />
                  ) : (
                    <FaEye className="text-slate-500 w-5 h-5" />
                  )}
                </div>
                <span
                  className={`font-medium ${analysisData
                    ? "text-green-600"
                    : isAnalyzing
                      ? "text-[#1B4965]"
                      : "text-slate-500"
                    }`}
                >
                  {analysisData
                    ? "Analysis Complete"
                    : isAnalyzing
                      ? "Analyzing..."
                      : "Analysis Pending"}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* <div className="bg-slate-50 p-4 rounded-xl"> */}
              {/* <h2 className="font-semibold text-slate-900 mb-2">Your Photo</h2> */}
              {/* <div className="relative"> */}
              {/* <img
                    src={uploadedImage}
                    alt="Uploaded face"
                    className="w-full h-80 object-cover rounded-xl"
                  /> */}
              {/* {isAnalyzing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
                      <LoadingSpinner size="large" />
                    </div>
                  )}
                </div> */}
              {/* </div> */}
              <div>
                {error && (
                  <ErrorModal
                    error={error}
                    uploadedImage={uploadedImage}
                    handleReset={handleReset}
                  />
                )}
                {isAnalyzing && (
                  <div className="p-4 border bg-blue-50 rounded-xl">
                    <p className="text-blue-700 font-medium">Analyzing facial features...</p>
                  </div>
                )}
                {analysisData && <AnalysisResultsModal data={analysisData} />}
              </div>
            </div>

            {analysisData && (
              <JewelryRecommendationsModal
                faceShape={analysisData.faceShape}
                skinTone={analysisData.skinTone}
                Customizations={analysisData.recommendedCustomizations}
              />
            )}

            <div className="flex justify-end">
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-slate-100 rounded-lg hover:bg-slate-200"
              >
                New Analysis
              </button>
            </div>

            <button
              onClick={() => {
                onClose();
                onNext(customizations); // now only items in both sets
              }}
              className="px-4 py-2 bg-[#1b4965] text-white rounded-lg hover:bg-[#1b4965]/90"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <CustomizationModal
        isOpen={isCustomizeOpen}
        onClose={handleCloseCustomize}
        jewelry={product}
        onNext={handleNext}
        // onCheckout={handleDirectCheckout}
        // openedViaCustomize={openedViaCustomize}
        // setCustomMaterial={setCustomMaterial}
        customizationOptions={customizations}
      />


    </div>
  );
};

export default AISuggestionModal;
