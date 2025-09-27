import React from "react";
import { Sparkles, RotateCcw, Download, User, Gem } from "lucide-react";





const ResultsStep = ({
  personalityType,
  jewelry,
  setShowSizeModal,
  processedImage,
  onReset,
  goToStep, // <-- add this prop
}) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 mr-2 text-teal-700" />
          <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-teal-700 to-cyan-600 bg-clip-text">
            Your Perfect Match
          </h2>
        </div>
        <p className="text-lg text-gray-600">
          Discover how your personality shines through your jewelry choice
        </p>
      </div>

      {/* Main Results Grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Processed Image */}
        <div className="overflow-hidden bg-white shadow-xl rounded-2xl">
          <div className="p-6 border-b border-gray-100">
            <h3 className="flex items-center text-xl font-bold text-gray-900">
              <Gem className="w-5 h-5 mr-2 text-teal-700" />
              Virtual Try-On
            </h3>
          </div>
          <div className="p-6">
            {processedImage ? (
              <div className="relative">
                <img
                  src={processedImage}
                  alt="Virtual jewelry try-on"
                  className="w-full shadow-lg rounded-xl"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center bg-gray-100 aspect-square rounded-xl">
                <p className="text-gray-500">Processing image...</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex mt-4 space-x-3">
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = processedImage + "?dl=1"; // add query param to hint "download"
                  link.setAttribute("download", "virtual_tryon.png");
                  link.setAttribute("target", "_blank"); // open in new window
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="flex items-center justify-center flex-1 py-3 space-x-2 font-semibold text-white transition-all duration-200 bg-gradient-to-r from-teal-700 to-cyan-600 rounded-xl hover:from-teal-800 hover:to-cyan-700"
              >
                <Download className="w-4 h-4" />
                <span>Save Image</span>
              </button>
            </div>
          </div>
        </div>

        {/* Jewelry Details */}
        <div className="space-y-6">
          <div className="p-6 bg-white shadow-xl rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 capitalize">
                {jewelry?.name || "Unknown Jewelry"}
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-semibold text-gray-900 capitalize">
                  {jewelry?.type || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Material:</span>
                <span className="font-semibold text-gray-900">
                  {jewelry?.material || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="font-semibold text-gray-900">
                  {jewelry?.basePrice ? `LKR ${jewelry.basePrice}` : "N/A"}
                </span>
              </div>
            </div>

            <div className="p-4 mt-6 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl">
              <h4 className="mb-2 font-semibold text-teal-900">
                Why This Matches You
              </h4>
              <p className="text-sm leading-relaxed text-teal-800">
                {jewelry?.description}
              </p>
            </div>
          </div>

          {/* Personality Traits */}
          <div className="p-6 bg-white shadow-xl rounded-2xl">
            <div className="flex items-center mb-4">
              <User className="w-5 h-5 mr-2 text-teal-700" />
              <h3 className="text-xl font-bold text-gray-900">
                Your Personality
              </h3>
            </div>

            <div className="space-y-4">
              {personalityType ? (
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">
                      {personalityType.personality || "Unknown"}
                    </span>
                  </div>
                  <div className="bg-gray-50 rounded-xl">
                    <p className="mt-2 text-sm text-gray-600">
                      {personalityType.description}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No personality data available.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <button
          onClick={() => goToStep("upload")}
          className="flex items-center justify-center px-8 py-3 space-x-2 font-semibold text-teal-700 transition-all duration-200 bg-white border-2 border-teal-700 rounded-xl hover:bg-teal-50"
        >
          Re-upload Image
        </button>

        <button
          onClick={onReset}
          className="flex items-center justify-center px-8 py-3 space-x-2 font-semibold text-teal-700 transition-all duration-200 bg-white border-2 border-teal-700 rounded-xl hover:bg-teal-50"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Start New Journey</span>
        </button>

        <button
          onClick={() => setShowSizeModal(true)}
          className="flex items-center justify-center space-x-2 px-8 py-3 bg-gradient-to-r from-teal-700 to-cyan-600 text-white rounded-xl font-semibold hover:from-teal-800 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Sparkles className="w-4 h-4" />
          <span>Buy this</span>
        </button>
      </div>
    </div>
  );
};

export default ResultsStep;
