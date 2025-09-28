import React, { useState, useEffect } from 'react';

export default function WaveMirissaLoader() {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage(prev => {
        const newPercentage = prev + 1;
        return newPercentage > 100 ? 0 : newPercentage;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 bg-white/10 backdrop-blur-md">
      <div className="relative w-20 h-20">
        {/* Outer static ring */}
        <div className="absolute inset-0 border-4 border-[#1b4765] border-opacity-20 rounded-full"></div>

        {/* First rotating ring */}
        <div 
          className="absolute inset-0 border-4 border-[#1b4765] border-t-transparent rounded-full animate-spin"
          style={{ animationDuration: '1.5s' }}
        ></div>

        {/* Second rotating ring (reverse) */}
        <div 
          className="absolute inset-2 border-4 border-[#1b4765] border-opacity-60 border-t-transparent rounded-full animate-spin"
          style={{ 
            animationDirection: 'reverse',
            animationDuration: '1s'
          }}
        ></div>

        {/* Center percentage display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[#1b4765] font-bold text-xs">
            {percentage}%
          </span>
        </div>
      </div>
    </div>
  );
}