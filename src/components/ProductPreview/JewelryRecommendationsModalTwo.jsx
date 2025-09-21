import React from 'react';
import { Star, Heart, Sparkles } from 'lucide-react';

const JewelryRecommendationsModalTwo = ({ faceShape, skinTone, Customizations }) => {
  return (
    <div className="p-6 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">AI Recommendations</h2>
            <p className="text-sm text-gray-600 mt-0.5">
              Perfect for your <span className="font-medium text-blue-600">{faceShape}</span> face shape and{' '}
              <span className="font-medium text-blue-600">{skinTone?.toLowerCase()}</span> skin tone
            </p>
          </div>
        </div>
       
        <div className="text-center bg-blue-50 px-4 py-2 rounded-lg">
          <p className="text-2xl font-bold text-blue-600">{Customizations?.length || 0}</p>
          <p className="text-xs text-gray-600 mt-0.5">Perfect matches</p>
        </div>
      </div>

      {/* Content */}
      {Customizations && Customizations.length > 0 ? (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Here are the jewelry pieces that complement your unique features:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Customizations.map((item, index) => (
              <div 
                key={item.item_id || index} 
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:border-blue-200"
              >
                {/* Image */}
                <div className="relative mb-4 group">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name || 'Jewelry item'}
                      className="object-cover w-full h-40 rounded-lg bg-gray-50"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-40 bg-gray-100 rounded-lg">
                      <Sparkles className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-sm">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </div>
                  </div>
                  
                  {item.type && (
                    <div className="absolute bottom-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-medium">
                      {item.type}
                    </div>
                  )}
                </div>
               
                {/* Content */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base leading-tight">
                      {item.name || 'Custom Jewelry'}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                 
                  {/* Rating */}
                  {item.rating && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(item.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({item.rating})</span>
                    </div>
                  )}
                 
                  {/* Price */}
                  {item.price && (
                    <div className="text-center py-1">
                      <span className="text-lg font-bold text-blue-600">
                        ${item.price}
                      </span>
                    </div>
                  )}
                 
                  {/* Match Reason */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-green-800 leading-relaxed">
                        {item.matchReason || 
                         `Perfectly complements your ${faceShape} face shape and ${skinTone?.toLowerCase()} skin tone`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Recommendations Available
          </h3>
          <p className="text-gray-600 max-w-md leading-relaxed">
            We're still analyzing your features to provide the best personalized recommendations. 
            Please try uploading a clearer photo or wait a moment for the analysis to complete.
          </p>
        </div>
      )}
    </div>
  );
};

export default JewelryRecommendationsModalTwo;