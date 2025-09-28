import React, { useEffect, useState } from 'react';
import { X, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const CLOUDINARY_UPLOAD_PRESET = 'ml_default';
const CLOUDINARY_CLOUD_NAME = 'dlvhmit8p';
const CLOUDINARY_API = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

const ReviewModal = ({ product, isOpen, onClose, onSubmit, order }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewUrls, setPreviewUrls] = useState([]);

  if (!isOpen) return null;

  const productId = product.product_id || product.id;
  const userId = user?.id;

  // Fetch existing review
  useEffect(() => {
    if (!userId || !productId) return;

    const fetchReview = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:8080/api/reviews/user/${userId}/product/${productId}/order/${order.order_id}`
        );
        setReview(res.data);
        if (res.data?.images) setPreviewUrls(res.data.images);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [userId, productId, order.order_id]);

  // Prefill rating/comment
  useEffect(() => {
    if (review) {
      setRating(review.rating);
      setComment(review.comment);
      setPreviewUrls(review.images || []);
    } else {
      setRating(0);
      setComment('');
      setPreviewUrls([]);
    }
  }, [review]);

  // Handle multiple image uploads
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (previewUrls.length + files.length > 3) {
      toast.error('You can upload a maximum of 3 images.');
      return;
    }

    for (const file of files) {
      const formDataCloud = new FormData();
      formDataCloud.append('file', file);
      formDataCloud.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      try {
        const response = await axios.post(CLOUDINARY_API, formDataCloud);
        setPreviewUrls((prev) => [...prev, response.data.secure_url]);
        toast.success('Image uploaded!');
      } catch (err) {
        console.error(err);
        toast.error('Image upload failed.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a rating.');
      return;
    }

    // Send rating, comment, and images
    onSubmit(order.order_id, rating, comment, previewUrls);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      {loading && <p className="absolute top-4 text-white">Loading...</p>}
      <div className="relative w-full max-w-md p-6 bg-white rounded-xl overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute text-gray-400 transition-colors top-4 right-4 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h3 className="mb-4 text-xl font-semibold text-gray-900">
          {review ? 'Edit Review' : 'Write a Review'}
        </h3>

        <div className="flex items-center gap-3 mb-6">
          <img
            src={product.productImageUrl || product.imageUrl1 || product.image}
            alt={product.productName || product.name}
            className="object-cover w-16 h-16 rounded-lg"
          />
          <div>
            <h4 className="font-medium text-gray-900">{product.productName || product.name}</h4>
            <p className="text-sm text-gray-500">Rs.{product.price}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Rating */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 transition-colors"
                >
                  <Star
                    size={24}
                    className={`${
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Review (Optional)</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Share your experience with this product..."
            />
          </div>

          {/* Image Upload */}
          <label
            htmlFor="image-upload"
            className="flex items-center justify-center gap-2 w-full p-3 border border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition mb-2"
          >
            <span className="text-blue-700 font-medium">Add Images ({previewUrls.length}/3)</span>
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageChange}
          />

          {/* Preview uploaded images */}
          {previewUrls.length > 0 && (
            <div className="mt-2 flex gap-2 overflow-x-auto">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-16 h-16 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setPreviewUrls(previewUrls.filter((_, i) => i !== index))
                    }
                    className="absolute top-0 right-0 text-red-500 hover:text-red-700 text-sm bg-white rounded-full p-0.5"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-3 mt-6">
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
              {review ? 'Update Review' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
