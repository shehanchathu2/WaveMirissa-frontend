import React, { useState, useEffect } from 'react';
import { X, Check, ShoppingCart } from 'lucide-react';
import cus1 from '../../assets/CustomizationSamples/Black-round beads.jpeg';
import cus2 from '../../assets/CustomizationSamples/Blue-round beads.jpeg';
import cus3 from '../../assets/CustomizationSamples/Oval seashells.jpeg';
import cus4 from '../../assets/CustomizationSamples/starfish-white.jpeg';
import cus5 from '../../assets/CustomizationSamples/Turtle bead.jpeg';
import cus6 from '../../assets/CustomizationSamples/Turtle-steel pendant.jpeg';

const customizationOptions = [
  {
    id: 'Black-round beads',
    name: 'Black-round beads',
    price: 299,
    image: cus1
  },
  {
    id: 'Blue-round beads',
    name: 'Blue-round beads',
    price: 149,
    image: cus2
  },
  {
    id: 'Oval seashells',
    name: 'Oval seashells',
    price: 89,
    image: cus3
  },
  {
    id: 'starfish-white',
    name: 'starfish-white',
    price: 199,
    image: cus4
  },
  {
    id: 'Turtle bead',
    name: 'Turtle bead',
    price: 179,
    image: cus5
  },
  {
    id: 'Turtle-steel pendant',
    name: 'Turtle-steel pendant',
    price: 129,
    image: cus6
  }
];

export const CustomizationModal = ({ 
    isOpen,
    onClose, 
    jewelry, 
    onNext,
    openedViaCustomize
 }) => {
  const [selectedOptions, setSelectedOptions] = useState(new Set());

  useEffect(() => {
    if (isOpen && !openedViaCustomize) {
      setSelectedOptions(new Set()); // Reset selected options when modal opens
      
    }
  }, [isOpen, openedViaCustomize]);

  if (!isOpen) return null;

  const handleOptionToggle = (optionId) => {
    const newSelected = new Set(selectedOptions);
    if (newSelected.has(optionId)) {
      newSelected.delete(optionId);
    } else {
      newSelected.add(optionId);
    }
    setSelectedOptions(newSelected);
  };

  const calculateTotalPrice = () => {
    const addOnPrice = Array.from(selectedOptions).reduce((total, optionId) => {
      const option = customizationOptions.find(opt => opt.id === optionId);
      return total + (option?.price || 0);
    }, 0);
    return jewelry.price + addOnPrice;
  };
  const handleNext = () => {
    onNext(calculateTotalPrice());
  };
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">

      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full h-[95vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between flex-shrink-0 p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#1b5565]">Customize Your Jewelry</h2>

      

          <button
            onClick={onClose}
            className="p-2 transition duration-200 rounded-full hover:bg-gray-100"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Basic Jewelry Info */}

          <div className="pt-2 pl-6 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center space-x-10">

              <div className="relative">
                <img
                  src={jewelry.image_url1}
                  alt={jewelry.name}
                  className="object-cover w-32 h-32 shadow-lg rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
              </div>
              <div className="flex-1">

                <h4 className="text-2xl font-semibold text-[#1b4965] mb-2">{jewelry.name}</h4>
                <p className="mb-3 text-base text-gray-600 ">{jewelry.description}</p>
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-teal-600">
                    LKR {jewelry.price.toLocaleString()}

                  </span>
                  <span className="px-3 py-1 text-sm text-gray-500 bg-gray-100 rounded-full">
                    Base Price
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Customization Options */}
          <div className="p-6">
            <h4 className="text-xl font-semibold text-[#1b4965] mb-6">Available Customizations</h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {customizationOptions.map((option) => (
                <div
                  key={option.id}
                  className={`relative rounded-xl border-2 transition-all duration-300 cursor-pointer group ${
                    selectedOptions.has(option.id)
                      ? 'border-teal-500 bg-teal-50 shadow-lg transform scale-105'
                      : 'border-gray-200 bg-white hover:border-[#1b4965] hover:shadow-md'
                  }`}
                  onClick={() => handleOptionToggle(option.id)}
                >
                  <div className="p-4">
                    <div className="relative mb-3">
                      <img
                        src={option.image}
                        alt={option.name}
                        className="object-cover w-full h-24 rounded-lg"
                      />
                      <div className="absolute top-2 right-2">
                        <div
                          className={`w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                            selectedOptions.has(option.id)
                              ? 'bg-teal-500 border-teal-500'
                              : 'bg-white border-gray-300 group-hover:border-[#1b4965]'
                          }`}
                        >
                          {selectedOptions.has(option.id) && (
                            <Check size={16} className="text-white" />
                          )}
                        </div>
                      </div>
                    </div>
                    <h5 className="font-semibold text-[#1b4965] mb-2">{option.name}</h5>

                    {/*<p className="text-lg font-bold text-teal-600">+${option.price}</p>*/}

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* Footer with Total Price and Continue Button */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-gray-50">

          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm text-gray-600">Total Price</p>
              <p className="text-3xl font-bold text-[#1b4965]">
                LKR {calculateTotalPrice().toLocaleString()}
              </p>

              
            </div>
            {(jewelry.producttype !== "neckless" && jewelry.producttype !== "ring") ? (
              <button
                
                
                className={"flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold transition duration-300 shadow-lg bg-[#1b4965] hover:bg-[#1b4965]/90 text-white hover:shadow-xl transform hover:scale-105"}
              >
                <ShoppingCart size={20} />
                <span>Checkout</span>
              </button>
            ):(<button
              onClick={handleNext}
              className="bg-[#1b4965] hover:bg-[#1b4965]/90 text-white font-semibold px-8 py-3 rounded-md transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Next
            </button>)}
          </div>
        </div>
      </div>
    </div>
  );
};
