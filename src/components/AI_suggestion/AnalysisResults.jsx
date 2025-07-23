import React from 'react';
import { User, Palette } from 'lucide-react';

const AnalysisResults = ({ data }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Analysis Results</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Face Shape */}
        <div className="bg-gradient-to-r from-[#1B4965] to-[#2563EB] rounded-xl p-6 text-white">
          <div className="flex items-center mb-4 space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-lg bg-opacity-20">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">Face Shape</h3>
              <p className="text-sm text-blue-100">Primary classification</p>
            </div>
          </div>
          <p className="text-2xl font-bold">{data.faceShape}</p>
        </div>

        {/* Skin Tone */}
        <div className="p-6 text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl">
          <div className="flex items-center mb-4 space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-lg bg-opacity-20">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">Skin Tone</h3>
              <p className="text-sm text-orange-100">Undertone analysis</p>
            </div>
          </div>
          <p className="text-2xl font-bold">{data.skinTone}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;