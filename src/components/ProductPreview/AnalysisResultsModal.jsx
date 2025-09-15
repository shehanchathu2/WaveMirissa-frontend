import React from 'react';
import { User, Palette } from 'lucide-react';

const AnalysisResultsModal = ({ data }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Analysis Results</h2>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
  {/* Face Shape */}
  <div className="flex items-center px-4 py-2 bg-gradient-to-r from-[#1B4965] to-[#2563EB] rounded-lg text-white shadow">
    <div className="flex items-center justify-center w-8 h-8 mr-3 bg-white bg-opacity-20 rounded-md">
      <User className="w-4 h-4" />
    </div>
    <div>
      <p className="text-xs text-blue-100">Face Shape</p>
      <p className="text-sm font-semibold">{data.faceShape}</p>
    </div>
  </div>

  {/* Skin Tone */}
  <div className="flex items-center px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg text-white shadow">
    <div className="flex items-center justify-center w-8 h-8 mr-3 bg-white bg-opacity-20 rounded-md">
      <Palette className="w-4 h-4" />
    </div>
    <div>
      <p className="text-xs text-orange-100">Skin Tone</p>
      <p className="text-sm font-semibold">{data.skinTone}</p>
    </div>
  </div>
</div>

    </div>
  );
};

export default AnalysisResultsModal;