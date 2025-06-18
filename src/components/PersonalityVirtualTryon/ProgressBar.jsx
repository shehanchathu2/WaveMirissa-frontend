import React from 'react';
import { CheckCircle } from 'lucide-react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const steps = [
    { number: 1, title: 'Personality Quiz', description: 'Answer questions about yourself' },
    { number: 2, title: 'Upload Photo', description: 'Share your image for virtual try-on' },
    { number: 3, title: 'See Results', description: 'Discover your perfect jewelry match' }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="relative flex flex-col items-center flex-1">
            {/* Step Circle */}
            <div className="relative">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                  step.number < currentStep
                    ? 'bg-green-500 text-white'
                    : step.number === currentStep
                    ? 'bg-teal-700 text-white ring-4 ring-teal-200'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step.number < currentStep ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  step.number
                )}
              </div>
            </div>

            {/* Step Info */}
            <div className="mt-3 text-center">
              <p
                className={`font-medium text-sm ${
                  step.number <= currentStep ? 'text-gray-900' : 'text-gray-500'
                }`}
              >
                {step.title}
              </p>
              <p className="mt-1 text-xs text-gray-500 max-w-24">{step.description}</p>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`absolute top-6 left-1/2 h-0.5 transition-all duration-300 ${
                  step.number < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`}
                style={{
                  transform: 'translateX(50%)',
                  width: `${100 / steps.length}%`,
                  zIndex: -1
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
