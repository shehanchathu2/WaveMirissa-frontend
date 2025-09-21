import React from 'react';
import { User, Palette } from 'lucide-react';

const AnalysisResultsModal = ({ data }) => {
  return (
    <div className="p-6 bg-gray-50 rounded-2xl shadow-lg">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Analysis Results</h2>
        <p className="text-sm text-gray-500 mt-1">Your personalized recommendations</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Face Shape */}
        <div className="flex items-center p-4 bg-white rounded-xl shadow hover:shadow-md transition-shadow">
          <div className="flex items-center justify-center w-12 h-12 mr-4 bg-blue-100 text-blue-600 rounded-full">
            <User className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Face Shape</p>
            <p className="text-lg font-semibold text-gray-800">{data.faceShape}</p>
          </div>
        </div>

        {/* Skin Tone */}
        <div className="flex items-center p-4 bg-white rounded-xl shadow hover:shadow-md transition-shadow">
          <div className="flex items-center justify-center w-12 h-12 mr-4 bg-orange-100 text-orange-600 rounded-full">
            <Palette className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Skin Tone</p>
            <p className="text-lg font-semibold text-gray-800">{data.skinTone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResultsModal;
