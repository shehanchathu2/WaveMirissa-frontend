import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 'medium', text }) => {
  const sizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <Loader2 className={`${sizeClasses[size]} text-[#1B4965] animate-spin`} />
      {text && (
        <p className="text-sm text-slate-600">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;