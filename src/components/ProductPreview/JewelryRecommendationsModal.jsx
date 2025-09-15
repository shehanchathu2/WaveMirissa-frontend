import React from 'react';
import { Star, Heart, ShoppingBag, Sparkles } from 'lucide-react';

const JewelryRecommendationsModal = ({ faceShape, skinTone, Customizations }) => {
  // Mock data - replace with actual API call
  
  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-[#1B4965] to-[#2563EB] rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Personalized Recommendations</h2>
            <p className="text-sm text-slate-600">
              Based on your {faceShape} face shape and {skinTone.toLowerCase()} skin tone
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-2xl font-bold text-[#1B4965]">{Customizations.length}</p>
          <p className="text-sm text-slate-600">Perfect matches</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Customizations.map((item) => (
          <div key={item.item_id} className="p-4 transition-shadow duration-200 bg-slate-50 rounded-xl hover:shadow-md">
            <div className="relative mb-4">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="object-cover w-full h-48 rounded-lg"
              />
              <button className="absolute flex items-center justify-center w-8 h-8 transition-all duration-200 bg-white rounded-full top-2 right-2 bg-opacity-90 hover:bg-opacity-100">
                <Heart className="w-4 h-4 text-slate-600 hover:text-red-500" />
              </button>
              <div className="absolute bottom-2 left-2 bg-[#1B4965] text-white px-2 py-1 rounded text-xs font-medium">
                {item.type}
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-slate-900">{item.name}</h3>
              <p className="text-sm text-slate-600">{item.description}</p>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(item.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-600">({item.rating})</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-[#1B4965]">${item.price}</span>
                <button className="px-3 py-1 bg-[#1B4965] text-white rounded-lg hover:bg-[#0f3449] transition-colors duration-200 flex items-center space-x-1 text-sm">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
              
              <div className="p-2 mt-3 border border-green-200 rounded-lg bg-green-50">
                <p className="flex items-center space-x-1 text-xs font-medium text-green-800">
                  <Sparkles className="w-3 h-3" />
                  <span>{item.matchReason}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JewelryRecommendationsModal;