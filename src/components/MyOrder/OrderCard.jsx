import React, { useState } from 'react';
import {
  Package,
  CheckCircle,
  Star,
  MessageCircle,
  Truck,
  ExternalLink,
  Calendar,
  MapPin,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import ReviewModal from './ReviewModal';

const OrderCard = ({ order, onReviewSubmit }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const getStatusIcon = () => {
    switch (order.status) {
      case 'processing':
        return <Package className="text-orange-500" size={20} />;
      case 'shipped':
        return <Truck className="text-blue-500" size={20} />;
      case 'delivered':
        return <CheckCircle className="text-green-500" size={20} />;
      default:
        return <Package className="text-gray-500" size={20} />;
    }
  };

  const getStatusText = () => {
    const status = order.orderStatus?.toLowerCase(); // convert to lowercase
    switch (status) {
      case 'processing':
        return 'Processing';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = () => {
    const status = order.orderStatus?.toLowerCase(); // convert to lowercase
    switch (status) {
      case 'processing':
        return 'text-orange-600 bg-orange-50';
      case 'shipped':
        return 'text-blue-600 bg-blue-50';
      case 'delivered':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  console.log("order card ", order);

  const openReviewModal = (product) => {
    setSelectedProduct(product);
    setIsReviewModalOpen(true);
  };

  const handleReviewSubmit = (productId, rating, comment) => {
    onReviewSubmit(order.id, productId, rating, comment);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={`${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const totalItems = order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  return (
    <>
      <div className="overflow-hidden transition-shadow duration-200 border border-gray-100 shadow-sm bg-stone-100 rounded-xl hover:shadow-md">
        {/* Order Header */}
        <div className="p-6 border-b bg-stone-100 border-stone-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Order #{order.orderId}</h3>
              <p className="text-sm text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-[#1b4965] mb-1">${order.amount}</div>
              <div className="text-sm text-gray-600">{totalItems} item{totalItems !== 1 ? 's' : ''}</div>
            </div>
          </div>
        </div>

        {/* Processing Orders - Table Layout */}
        {(order.orderStatus === 'PROCESSING' || order.orderStatus === 'SHIPPED') && (
          <div className="p-6">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-6 pb-3 mb-4 border-b border-stone-200">
              <div className="flex items-center gap-2 font-medium text-gray-900">
                <Package size={18} className="text-[#1b4965]" />
                {order.orderStatus === 'PROCESSING' ? 'Processing Items' : 'Shipped Items'} 
              </div>
              <div className="font-medium text-center text-gray-900">Status</div>
              <div className="font-medium text-center text-gray-900">Tracking</div>
            </div>

            {/* Table Content */}
            <div className="grid items-start grid-cols-3 gap-6">
              {/* Column 1: Items with Review Buttons */}
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="p-4 border rounded-lg bg-stone-50 border-stone-200">
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={item.productImageUrl}
                        alt={item.productName}
                        className="object-cover w-20 h-20 rounded-lg shadow-sm"
                      />
                      <div className="flex-1">
                        <h5 className="text-sm font-medium text-gray-900">{item.productName}</h5>
                        <div className="flex items-center gap-3 mt-1">
                          <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                          <p className="text-xs font-semibold text-[#1b4965]">${item.price}</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => openReviewModal(product)}
                      className="w-full inline-flex items-center justify-center gap-2 text-xs text-[#1b4965] hover:text-white hover:bg-[#1b4965] font-medium transition-colors bg-white border border-[#1b4965] px-3 py-2 rounded-lg"
                    >
                      <MessageCircle size={12} />
                      Add Review
                    </button>
                  </div>
                ))}
              </div>

              {/* Column 2: Status */}
              <div className="flex justify-center">
                <div className="min-w-full p-6 text-center ">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    {getStatusIcon()}
                  </div>
                  <div className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor()} inline-block`}>
                    {getStatusText()}
                  </div>
                  <p className="mt-2 text-xs text-gray-600">Current Status</p>
                </div>
              </div>

              {/* Column 3: Tracking */}
              <div className="flex justify-center">
                {order.status === 'shipped' && order.trackingNumber ? (
                  <div className="min-w-full p-4 text-center border border-blue-200 rounded-lg bg-blue-50">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Truck className="text-blue-600" size={18} />
                    </div>
                    <p className="mb-2 text-sm font-medium text-blue-900">Tracking Number</p>
                    <p className="px-2 py-1 mb-3 font-mono text-xs text-blue-800 bg-blue-100 rounded">
                      {order.trackingNumber}
                    </p>
                    <p className="mb-3 text-xs text-blue-700">Courier: {order.courierService}</p>
                    {order.courierUrl && (
                      <a
                        href={order.courierUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-blue-600 transition-colors bg-blue-100 rounded-lg hover:text-blue-800 hover:bg-blue-200"
                      >
                        <ExternalLink size={12} />
                        Track
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="min-w-full p-6 text-center border rounded-lg bg-stone-50 border-stone-200">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Package className="text-stone-400" size={18} />
                    </div>
                    <p className="text-sm text-stone-600">No tracking</p>
                    <p className="mt-1 text-xs text-stone-500">available yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Delivered Orders Layout */}
        {order.status === 'delivered' && (
          <>
            {/* Products Section */}
            <div className="p-6">
              <h4 className="flex items-center gap-2 mb-4 font-medium text-gray-900">
                <Package size={18} className="text-[#1b4965]" />
                Items ({order.items.length})
              </h4>
              <div className="pl-2 space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg bg-stone-50 border-stone-200">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="object-cover w-20 h-20 rounded-lg shadow-sm"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        {/* Left Side: Product Info */}
                        <div>
                          <h5 className="font-medium text-gray-900">{product.productName}</h5>
                          <div className="flex items-center gap-4 mt-1">
                            <p className="text-sm text-gray-600">Qty: {product.quantity}</p>
                            <p className="text-sm font-semibold text-[#1b4965]">${product.price}</p>
                          </div>
                        </div>

                        {/* Right Side: Review Section */}
                        <div className="pr-8 mt-1 text-right">
                          {product.review ? (
                            <div className="space-y-2">
                              <div className="flex items-center justify-end gap-2">
                                {renderStars(product.review.rating)}
                                <span className="text-xs text-gray-500">
                                  {new Date(product.review.date).toLocaleDateString()}
                                </span>
                              </div>
                              {product.review.comment && (
                                <p className="text-xs text-gray-700 bg-white p-2 rounded border-l-4 border-[#1b4965]">
                                  "{product.review.comment}"
                                </p>
                              )}
                              <button
                                onClick={() => openReviewModal(product)}
                                className="text-xs text-[#1b4965] hover:text-[#0d3548] font-medium transition-colors"
                              >
                                Edit Review
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => openReviewModal(product)}
                              className="inline-flex items-center gap-2 text-sm text-[#1b4965] hover:text-[#0d3548] font-medium transition-colors"
                            >
                              <MessageCircle size={14} />
                              Write a Review
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Delivered Date Section */}
            <div className="px-6 pb-4">
              <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="text-green-600" size={18} />
                  <span className="font-medium text-green-900">Delivered</span>
                </div>
                <p className="font-medium text-green-800">
                  {new Date(order.deliveryDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </>
        )}

        {/* View Order Details Button */}
        <div className="px-6 pb-6">
          <button
            onClick={() => setShowOrderDetails(!showOrderDetails)}
            className="flex items-center justify-center w-full gap-2 px-4 py-3 font-medium text-gray-700 transition-colors border rounded-lg bg-stone-100 hover:bg-stone-200 border-stone-300"
          >
            View Order Details
            {showOrderDetails ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>

        {/* Order Details (Collapsible) */}
        {showOrderDetails && (
          <div className="px-6 pt-6 pb-6 border-t border-stone-200">
            <div className="p-4 border rounded-lg bg-stone-50 border-stone-200">
              <h5 className="mb-4 font-medium text-gray-900">Order Details</h5>

              {/* Shipping Address */}
              <div className="mb-4">
                <div className="flex items-start gap-2 mb-2">
                  <MapPin className="text-gray-600 mt-0.5" size={16} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Shipping Address</p>
                    <div className="mt-1 text-sm text-gray-700">
                      {/* <p>{order.shippingAddress.name}</p> */}
                      {/* <p>{order.shippingAddress.street}</p>
                      <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p> */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="pt-4 border-t border-stone-300">
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.productName} × {item.quantity}</span>
                      <span className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="pt-2 mt-3 border-t border-stone-300">
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-900">Total</span>
                      <span className="text-[#1b4965] text-lg">${order.amount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

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
    </>
  );
};

export default OrderCard;
