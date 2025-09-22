import React, { useState, useRef } from 'react';
import { Upload, Camera, AlertCircle, User, ArrowLeft, Loader } from 'lucide-react';

const ImageUploadStep = ({ onImageUpload, onBack, isLoading, personalityType }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleChange = e => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
  };

  const handleFile = f => {
    if (!f?.type?.startsWith('image/')) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = e => setPreview(e.target?.result);
    reader.readAsDataURL(f);
  };

  const handleSubmit = () => {
    if (file) onImageUpload(file); // only send file
  };

  const openFileSelector = () => fileInputRef.current?.click();

  return (
    <div className="space-y-8">
      {personalityType && (
        <div className="p-6 bg-gradient-to-r from-teal-100 to-cyan-100 rounded-2xl">
          <div className="flex items-center mb-4 space-x-3">
            <User className="w-6 h-6 text-teal-700" />
            <h3 className="text-xl font-bold text-gray-900">Your Personality Profile</h3>
          </div>
          <div className="gap-4 md:grid-cols-2">
            <div className="flex items-center ">
              <span className="pl-4 mb-2 text-base font-medium text-teal-600 capitalize">
                {personalityType.personality}
              </span>
            </div>
            <p className="pl-4 mb-1 text-sm font-medium text-gray-700">
              {personalityType.description}
            </p>
          </div>
        </div>
      )}

      <div className="p-8 bg-white shadow-xl rounded-2xl">
        <div className="mb-8 text-center">
          <Camera className="w-12 h-12 mx-auto mb-4 text-teal-700" />
          <h2 className="mb-2 text-3xl font-bold text-gray-900">Upload Your Photo</h2>
          <p className="text-gray-600">
            We'll create a virtual try-on with jewelry that matches your personality
          </p>
        </div>

        <div className="p-4 mb-8 border border-blue-200 bg-blue-50 rounded-xl">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="mb-2 font-semibold text-blue-900">Photo Guidelines</h4>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• Face clearly visible and well-lit</li>
                <li>• Shoulders and neck area visible</li>
                <li>• Neutral background preferred</li>
                <li>• High resolution (at least 800x600px)</li>
                <li>• No existing jewelry on neck area</li>
              </ul>
            </div>
          </div>
        </div>

        <div
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
            dragActive ? "border-teal-600 bg-teal-50" : preview ? "border-green-300 bg-green-50" : "border-gray-300 hover:border-teal-500 hover:bg-teal-25"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />

          {preview ? (
            <div className="space-y-4">
              <img src={preview} alt="Preview" className="max-w-xs mx-auto rounded-lg shadow-md max-h-64" />
              <div className="flex items-center justify-center space-x-4">
                <button onClick={openFileSelector} className="font-medium text-teal-700 hover:text-teal-800">
                  Choose Different Photo
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="w-16 h-16 mx-auto text-gray-400" />
              <div>
                <p className="mb-2 text-xl font-semibold text-gray-700">Drag and drop your photo here</p>
                <p className="mb-4 text-gray-500">or</p>
                <button
                  onClick={openFileSelector}
                  className="bg-gradient-to-r from-teal-700 to-cyan-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-teal-800 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Browse Files
                </button>
              </div>
              <p className="text-sm text-gray-400">Supports: JPG, PNG, GIF (max 10MB)</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-8">
          <button
            onClick={onBack}
            className="flex items-center px-6 py-3 space-x-2 text-gray-600 transition-all duration-200 hover:text-teal-700 hover:bg-teal-50 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Questions</span>
          </button>

          <button
            onClick={handleSubmit}
            disabled={!file || isLoading}
            className={`px-8 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all duration-200 ${
              file && !isLoading
                ? "bg-gradient-to-r from-teal-700 to-cyan-600 text-white hover:from-teal-800 hover:to-cyan-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Generate Virtual Try-On</span>
                <Camera className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadStep;
