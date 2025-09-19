import React, { useState } from 'react';
import { X, Star } from 'lucide-react';

const ReviewModal = ({ product, isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(product.review?.rating || 0);
  const [comment, setComment] = useState(product.review?.comment || '');
  const [hoveredRating, setHoveredRating] = useState(0);

  if (!isOpen) return null;

  console.log("product", product);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return;
    // ✅ product.id is the orderItemId from backend
    onSubmit(product.product_id, rating, comment);
    onClose();
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 bg-white rounded-xl">
        <button
          onClick={onClose}
          className="absolute text-gray-400 transition-colors top-4 right-4 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h3 className="mb-4 text-xl font-semibold text-gray-900">
          {product.review ? 'Edit Review' : 'Write a Review'}
        </h3>

        <div className="flex items-center gap-3 mb-6">
          <img
            src={product.productImageUrl || product.image}
            alt={product.productName || product.name}
            className="object-cover w-16 h-16 rounded-lg"
          />
          <div>
            <h4 className="font-medium text-gray-900">{product.productName || product.name}</h4>
            <p className="text-sm text-gray-500">${product.price}</p>
          </div>
        </div>



        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="p-1 transition-colors"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    size={24}
                    className={`$ {
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Review (Optional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Share your experience with this product..."
            />
          </div>

          <div className="flex gap-3">
            <button
             type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={rating === 0}
              className="flex-1 px-4 py-2 bg-[#1b4965] text-white rounded-lg hover:bg-[#0d3548] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {product.review ? 'Update Review' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
