import React, { useState } from 'react';
import { Package, CheckCircle, Star, Truck, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import ReviewModal from './ReviewModal';

const OrderCard = ({ order, onReviewSubmit }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const status = order.orderStatus?.toLowerCase() || order.status?.toLowerCase();

  // User-friendly texts
  const statusTextMap = {
    pendding: "Waiting for admin review",
    processing: "Being processed for you",
    shipped: "On the way",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };

  // Status UI mapping
  const statusMap = {
    pendding: {
      text: statusTextMap.pendding,
      icon: Package,
      color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      dotColor: 'bg-yellow-400'
    },
    processing: {
      text: statusTextMap.processing,
      icon: Package,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      dotColor: 'bg-blue-400'
    },
    shipped: {
      text: statusTextMap.shipped,
      icon: Truck,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      dotColor: 'bg-purple-400'
    },
    delivered: {
      text: statusTextMap.delivered,
      icon: CheckCircle,
      color: 'bg-green-50 text-green-700 border-green-200',
      dotColor: 'bg-green-400'
    },
    cancelled: {
      text: statusTextMap.cancelled,
      icon: Package,
      color: 'bg-gray-50 text-gray-700 border-gray-200',
      dotColor: 'bg-gray-400'
    },
  };

  const statusConfig = statusMap[status] || statusMap.processing;
  const StatusIcon = statusConfig.icon;

  const openReviewModal = (product) => {
    setSelectedProduct(product);
    console.log(order)
    console.log(product)
    setIsReviewModalOpen(true);
  };
  
  const handleReviewSubmit = (orderItemId, rating, comment) => {
    const productId = selectedProduct.product_id || selectedProduct.id; 
    onReviewSubmit(orderItemId, rating, comment, productId);
  };


   const renderStars = (rating) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={12} className={s <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
      ))}
    </div>
  );


  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      {/* Order Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">Order #{order.orderId}</h3>
              <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${statusConfig.color}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${statusConfig.dotColor}`}></div>
                {statusConfig.text}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>Ordered {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="text-gray-400">•</div>
              <span>{order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? 's' : ''}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900">${order.amount}</div>
            <div className="text-sm text-gray-500">Total</div>
          </div>
        </div>
      </div>

      {status === 'shipped' && order.trackingNumber && order.estimateDate && (
        <div className="mx-6 mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-100 border border-blue-200 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Truck size={16} className="text-blue-600" />
            </div>
            <h4 className="font-semibold text-blue-900">Your Package is On the Way!</h4>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white/70 rounded-lg p-3 border border-blue-100">
              <div className="flex items-center gap-2 mb-1">
                <Truck size={14} className="text-blue-600" />
                <span className="text-xs font-medium text-blue-700">TRACKING NUMBER</span>
              </div>
              <p className="font-mono text-sm font-semibold text-blue-900">{order.trackingNumber}</p>
            </div>
            
            <div className="bg-white/70 rounded-lg p-3 border border-blue-100">
              <div className="flex items-center gap-2 mb-1">
                <Calendar size={14} className="text-blue-600" />
                <span className="text-xs font-medium text-blue-700">ESTIMATED DELIVERY</span>
              </div>
              <p className="text-sm font-semibold text-blue-900">
                {new Date(order.estimateDate).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Order Items */}
      <div className="p-6">
        <div className="space-y-4">
          {order.items?.map((item, index) => (
            <div key={item.id} className={`flex items-center gap-4 ${index !== order.items.length - 1 ? 'pb-4 border-b border-gray-100' : ''}`}>
              {/* Product Image */}
              <div className="flex-shrink-0">
                <img
                  src={item.productImageUrl || item.image}
                  alt={item.productName}
                  className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">{item.productName}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                  <div className="text-gray-400">•</div>
                  <span className="text-sm font-medium text-gray-900">${item.price}</span>
                </div>

                {/* Review Section */}
                {status === 'delivered' && (
                  <div className="mt-2">
                    {item.review ? (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {renderStars(item.review.rating)}
                          <span className="text-xs text-gray-500">Your review</span>
                        </div>
                        {item.review.comment && (
                          <p className="text-sm text-gray-600 italic">"{item.review.comment}"</p>
                        )}
                        <button
                          onClick={() => openReviewModal(item)}
                          className="text-xs text-blue-600 hover:text-blue-700 underline"
                        >
                          Edit Review
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => openReviewModal(item)}
                        className="inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors"
                      >
                        <Star size={12} className="mr-1" />
                        Write Review
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Order Details Toggle */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={() => setShowOrderDetails(!showOrderDetails)}
            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            {showOrderDetails ? (
              <>
                <ChevronUp size={16} />
                Hide Order Details
              </>
            ) : (
              <>
                <ChevronDown size={16} />
                View Order Details
              </>
            )}
          </button>

          {/* Expanded Order Details */}
          {showOrderDetails && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Order Breakdown</h4>
              <div className="space-y-2">
                {order.items?.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.productName} × {item.quantity}
                    </span>
                    <span className="font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="pt-2 mt-2 border-t border-gray-200">
                  <div className="flex justify-between font-semibold text-gray-900">
                    <span>Order Total</span>
                    <span>${order.amount}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
       {/* Review Modal */}
      {selectedProduct && (
        <ReviewModal
          product={selectedProduct}
          isOpen={isReviewModalOpen}
          onClose={() => {
            setIsReviewModalOpen(false);
            setSelectedProduct(null);
          }}
          onSubmit={handleReviewSubmit}
        />
      )}
    </div>
  );
};

export default OrderCard;
