// src/pages/Myorders.jsx
import React, { useEffect, useState } from 'react';
import { ShoppingBag, Search } from 'lucide-react';
import OrderCard from '../components/MyOrder/OrderCard';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import WaveMirissaLoader from '../components/WaveMirissaLoader';

const mockOrders = [];

function Myorders() {
  const [orders, setOrders] = useState(mockOrders);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8080/api/user/orders/my-orders/${user.id}`,
          { withCredentials: true }
        );
        setOrders(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);


  const handleReviewSubmit = async (orderId, orderItemId, rating, comment, productId, images) => {
  try {
    const payload = {
      orderId: Number(orderId),
      orderItemId: Number(orderItemId),
      productId: Number(productId),
      userId: Number(user.id),
      rating,
      comment,
      imageUrl1: images[0] || null,
      imageUrl2: images[1] || null,
      imageUrl3: images[2] || null,
      imageUrl4: images[3] || null,
      imageUrl5: images[4] || null
    };

    console.log("Submitting review payload:", payload);

    const res = await axios.post(
      "http://localhost:8080/api/reviews/submit",
      payload,
      { withCredentials: true }
    );

    toast.success("Review submitted successfully!");

    setOrders(prevOrders =>
      prevOrders.map(order => ({
        ...order,
        items: order.items.map(item =>
          item.id === orderItemId
            ? { ...item, review: { rating, comment, images, date: new Date().toISOString().split("T")[0] } }
            : item
        ),
      }))
    );

  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "Failed to submit review");
  }
};


  const filteredOrders = orders.filter(order => {
    const status = order.orderStatus?.toLowerCase() || order.status?.toLowerCase();
    const matchesStatus = filterStatus === "all" || status === filterStatus;
    const matchesSearch =
      order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items?.some(item => item.productName?.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  if (loading) {
      <WaveMirissaLoader />
    }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div>
              <h1 className="flex items-center text-2xl font-semibold text-gray-900 gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ShoppingBag size={24} className="text-blue-600" />
                </div>
                My Orders
              </h1>
              <p className="text-gray-600 mt-1">Track and manage your orders</p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search orders or products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm w-full sm:w-64 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="all">All Orders</option>
                <option value="pendding">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
        </div>

        {/* Order Count */}
        {filteredOrders.length > 0 && (
          <div className="mb-4">
            <p className="text-gray-600 text-sm">
              Showing {filteredOrders.length} of {orders.length} orders
            </p>
          </div>
        )}

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <OrderCard key={order.order_id} order={order} onReviewSubmit={handleReviewSubmit} />
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <ShoppingBag size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? "No matching orders found" : `No ${filterStatus} orders`}
                </h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm
                    ? `We couldn't find any orders matching "${searchTerm}". Try adjusting your search.`
                    : filterStatus === "all"
                      ? "You haven't placed any orders yet. Start shopping to see your orders here!"
                      : `You don't have any ${filterStatus} orders at the moment.`
                  }
                </p>
                {!searchTerm && filterStatus === "all" && (
                  <Link to="/shop">
                            <button
                                className="bg-[#1f445f] text-white px-5 py-2 rounded-md font-semibold hover:bg-[#1B4965] transition"
                            >
                                Shop Now
                            </button>
                        </Link>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Summary Card */}
        {orders.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
                <p className="text-gray-600 text-sm">Your order history at a glance</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{orders.length}</div>
                <div className="text-sm text-gray-500">Total Orders</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Myorders;