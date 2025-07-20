import React, { useState, useEffect} from 'react';
import { X, ShoppingCart } from 'lucide-react';

const necklaceLengths = [
  { value: '16', label: '16" - Choker' },
  { value: '18', label: '18" - Princess' },
  { value: '20', label: '20" - Matinee' },
  { value: '24', label: '24" - Opera' },
  { value: '30', label: '30" - Rope' },
  { value: 'custom', label: 'Custom Length' }
];

const ringSizes = [
  { value: '4', label: 'Size 4' },
  { value: '4.5', label: 'Size 4.5' },
  { value: '5', label: 'Size 5' },
  { value: '5.5', label: 'Size 5.5' },
  { value: '6', label: 'Size 6' },
  { value: '6.5', label: 'Size 6.5' },
  { value: '7', label: 'Size 7' },
  { value: '7.5', label: 'Size 7.5' },
  { value: '8', label: 'Size 8' },
  { value: '8.5', label: 'Size 8.5' },
  { value: '9', label: 'Size 9' },
  { value: '9.5', label: 'Size 9.5' },
  { value: '10', label: 'Size 10' },
  { value: '10.5', label: 'Size 10.5' },
  { value: '11', label: 'Size 11' },
  { value: '11.5', label: 'Size 11.5' },
  { value: '12', label: 'Size 12' }
];

export const SizeSelectionModal = ({
  isOpen,
  onClose,
  onBack,
  jewelry,
  totalPrice,
  onCheckout,
  showBackButton,
  hideCheckoutButton
}) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [customLength, setCustomLength] = useState('');

  useEffect(() => {
  if (isOpen) {
    setSelectedSize('');
    setCustomLength('');
    
    
  }
}, [isOpen]);

  if (!isOpen) return null;

  


  const getSizeOptions = () => {
    if (jewelry.producttype === 'neckless') return necklaceLengths;
    if (jewelry.producttype === 'ring') return ringSizes;
    return [];
  };

  const getSizeLabel = () => {
    if (jewelry.producttype === 'neckless') return 'Necklace Length';
    if (jewelry.producttype === 'ring') return 'Ring Size';
    return 'Size';
  };

  const handleCheckout = () => {
    const finalSize = selectedSize === 'custom' ? `${customLength}"` : selectedSize;
    if (finalSize) {
      onCheckout(finalSize);
    }
  };

  const isCheckoutDisabled = () => {
    if (!selectedSize) return true;
    if (selectedSize === 'custom' && !customLength.trim()) return true;
    return false;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between flex-shrink-0 p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#1b5565]">Select Size</h2>
          <button
            onClick={onClose}
            className="p-2 transition duration-200 rounded-full hover:bg-gray-100"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Jewelry Summary */}
          <div className="p-4 mb-6 bg-gradient-to-r from-gray-50 to-white rounded-xl">
            <div className="flex items-center space-x-4">
              <img
                src={jewelry.image_url1}
                alt={jewelry.name}
                className="object-cover w-20 h-20 rounded-lg shadow-md"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#1b4965] mb-1">
                  {jewelry.name}
                </h3>
                <p className="mb-2 text-gray-600">{jewelry.description}</p>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-bold text-teal-600">
                    LKR {totalPrice.toLocaleString()}
                  </span>
                  <span className="px-2 py-1 text-sm text-gray-500 bg-gray-100 rounded-full">
                    Total Price
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-[#1b4965] mb-3">
              {getSizeLabel()}
            </label>

            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#1b4965] focus:outline-none transition duration-200 text-lg"
            >
              <option value="">Select {getSizeLabel()}</option>
              {getSizeOptions().map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {selectedSize === "custom" && jewelry.producttype === "neckless" && (
              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Enter Custom Length (inches)
                </label>
                <input
                  type="number"
                  value={customLength}
                  onChange={(e) => setCustomLength(e.target.value)}
                  placeholder="e.g., 22"
                  min="12"
                  max="36"
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#1b4965] focus:outline-none transition duration-200"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Custom lengths available from 12" to 36"
                </p>
              </div>
            )}

            <div className="p-4 mt-6 border border-teal-200 rounded-lg bg-teal-50">
              <h4 className="mb-2 font-semibold text-teal-800">
                {jewelry.producttype === "neckless" ? "Length Guide" : "Size Guide"}
              </h4>
              <p className="text-sm text-teal-700">
                {jewelry.producttype === "neckless"
                  ? 'Not sure about the length? A 18" necklace sits at the base of the neck, while a 20" necklace falls just below the collarbone.'
                  : "Need help finding your ring size? Visit our size guide or use a ring sizer for the most accurate measurement."}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ready to purchase</p>
              <p className="text-2xl font-bold text-[#1b4965]">
                LKR {totalPrice.toLocaleString()}
              </p>
            </div>
            <div className="flex space-x-4">
              {showBackButton && (
                <button
                  onClick={onBack}
                  className="px-6 py-3 text-[#1b4965] border-2 border-[#1b4965] rounded-xl font-semibold transition hover:bg-[#1b4965]/10"
                >
                  Back
                </button>
              )}
              {!hideCheckoutButton && (
                <button
                  onClick={handleCheckout}
                  disabled={isCheckoutDisabled()}
                  className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold transition duration-300 shadow-lg ${
                    isCheckoutDisabled()
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#1b4965] hover:bg-[#1b4965]/90 text-white hover:shadow-xl transform hover:scale-105"
                  }`}
                >
                  <ShoppingCart size={20} />
                  <span>Checkout</span>
                </button>
              )}

              {hideCheckoutButton && (
                <button
                  onClick={handleCheckout}
                  disabled={isCheckoutDisabled()}
                  className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold transition duration-300 shadow-lg ${
                    isCheckoutDisabled()
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#1b4965] hover:bg-[#1b4965]/90 text-white hover:shadow-xl transform hover:scale-105"
                  }`}
                >
                  <ShoppingCart size={20} />
                  <span>Add to Cart</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
