import React from 'react';
import { Star, Heart, ShoppingBag, Sparkles } from 'lucide-react';

const JewelryRecommendations = ({ faceShape, skinTone }) => {
  // Mock data - replace with actual API call
  const recommendations = [
    {
      id: '1',
      name: 'Elegant Pearl Drops',
      type: 'Earrings',
      description: 'Classic pearl drop earrings that elongate the face beautifully',
      price: 129.99,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      matchReason: 'Perfect for oval face shapes'
    },
    {
      id: '2',
      name: 'Gold Statement Chain',
      type: 'Necklace',
      description: 'Bold gold chain that complements warm undertones',
      price: 249.99,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/1070360/pexels-photo-1070360.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      matchReason: 'Enhances warm skin tones'
    },
    {
      id: '3',
      name: 'Delicate Crystal Studs',
      type: 'Earrings',
      description: 'Sparkling crystal studs for everyday elegance',
      price: 89.99,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      matchReason: 'Subtle sparkle for balanced features'
    },
    {
      id: '4',
      name: 'Vintage Rose Gold Ring',
      type: 'Ring',
      description: 'Ornate rose gold ring with intricate detailing',
      price: 179.99,
      rating: 4.6,
      image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      matchReason: 'Rose gold flatters warm undertones'
    },
    {
      id: '5',
      name: 'Minimalist Bar Necklace',
      type: 'Necklace',
      description: 'Clean lines that complement structured jawlines',
      price: 119.99,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/1070360/pexels-photo-1070360.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      matchReason: 'Balances prominent cheekbones'
    },
    {
      id: '6',
      name: 'Bohemian Hoop Earrings',
      type: 'Earrings',
      description: 'Medium-sized hoops with intricate metalwork',
      price: 99.99,
      rating: 4.5,
      image: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      matchReason: 'Adds width to balanced face shapes'
    }
  ];

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
              Based on your {faceShape.toLowerCase()} face shape and {skinTone.toLowerCase()} skin tone
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-2xl font-bold text-[#1B4965]">{recommendations.length}</p>
          <p className="text-sm text-slate-600">Perfect matches</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((item) => (
          <div key={item.id} className="p-4 transition-shadow duration-200 bg-slate-50 rounded-xl hover:shadow-md">
            <div className="relative mb-4">
              <img
                src={item.image}
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

export default JewelryRecommendations;