// src/pages/admin/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { FaUsers, FaChartLine, FaMoneyBillWave, FaFileInvoiceDollar, FaBoxes, FaLayerGroup, FaLeaf } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import axios from 'axios';
import AllOrdersTable from './ordertables/AllOrdersTable';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const Dashboard = () => {
  const stats = [
    {
      title: 'Customers',
      value: '1,456',
      change: '+6.5%',
      icon: <FaUsers />,
      trend: 'up'
    },
    {
      title: 'Revenue',
      value: '$3,345',
      change: '-0.10%',
      icon: <FaChartLine />,
      trend: 'down'
    },
    {
      title: 'Profit',
      value: '60%',
      change: '-0.2%',
      icon: <FaMoneyBillWave />,
      trend: 'down'
    },
    {
      title: 'Invoices',
      value: '1,135',
      change: '+11.5%',
      icon: <FaFileInvoiceDollar />,
      trend: 'up'
    }
  ];


  const invoices = [
    {
      id: 1,
      customer: 'Eren Yeager',
      items: '1x Black Backpack',
      date: '21/07/2022',
      time: '08:21',
      status: 'Paid',
      price: '$101'
    },
    {
      id: 2,
      customer: 'Levi Ackerman',
      items: '1x Distro Backpack',
      date: '21/07/2022',
      time: '08:21',
      status: 'Pending',
      price: '$144'
    },
    {
      id: 3,
      customer: 'Rainer Brown',
      items: '1x New Backpack',
      date: '21/07/2022',
      time: '08:21',
      status: 'Paid',
      price: '$121'
    },
    {
      id: 4,
      customer: 'Historia Reiss',
      items: '2x Black Backpack',
      date: '21/07/2022',
      time: '08:21',
      status: 'Overdue',
      price: '$300'
    }
  ];









  const brandData = {
    labels: ['Hp', 'Apple', 'lenova', 'MSI', 'Dell'],
    datasets: [
      {
        label: 'Brand Overview',
        data: [2, 2, 2, 1, 1],
        backgroundColor: ['#3B82F6', '#06B6D4', '#FACC15', '#F472B6', '#8B5CF6']
      }
    ]
  };



  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [countUsers, setCountUsers] = useState(0);

  const loginUser = JSON.parse(localStorage.getItem("user"));
  const token = loginUser?.jwt; // Safe check

  useEffect(() => {
    if (!token) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    const fetchRevenueTrends = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/admin/orders/revenue-trends",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setTrends(response.data);
        // console.log(response.data);
      } catch (err) {
        console.error("Error fetching revenue trends:", err);
        setError(err.response?.data?.message || err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueTrends();
  }, [token]);

  const productStats = [
    {
      title: 'Total Value',
      value: `Rs.${trends.totalAmount ? trends.totalAmount : '0'}`,
      icon: <FaFileInvoiceDollar />,
      color: 'border-red-500'
    },
    {
      title: 'Products',
      value: totalProducts ? totalProducts : '0',
      icon: <FaBoxes />,
      color: 'border-blue-500'
    },
    
    {
      title: 'Orders',
      value: trends.totalOrders ? trends.totalOrders : '0',
      icon: <FaLeaf />,
      color: 'border-purple-500'
    },
    {
      title: 'Users',
      value: countUsers ? countUsers : '0',
      icon: <FaUsers />,
      color: 'border-green-500'
    },
  ];

  const orderStatusCounts = {
    DELIVERED: trends?.orderStatusCounts?.DELIVERED ?? 0,
    PENDING: trends?.orderStatusCounts?.PENDDING ?? 0,
    PROCESSING: trends?.orderStatusCounts?.PROCESSING ?? 0,
    SHIPPED: trends?.orderStatusCounts?.SHIPPED ?? 0,
  };


  console.log("shehan", orderStatusCounts)

  const donutData = {
    labels: ['DELIVERED', 'PENDDING', 'PROCESSING', 'SHIPPED'],
    datasets: [
      {
        label: 'Orders',
        data: [
          orderStatusCounts.DELIVERED,
          orderStatusCounts.PENDING,
          orderStatusCounts.PROCESSING,
          orderStatusCounts.SHIPPED
        ],
        backgroundColor: ['#10B981', '#F59E0B', '#3B82F6', '#EF4444'],
        borderColor: ['#10B981', '#F59E0B', '#3B82F6', '#EF4444'],
        borderWidth: 1,
      },
    ],
  };


  useEffect(() => {
    if (!token) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    const fetchMonthlyRevenue = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/admin/orders/monthly-revenue",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setMonthlyRevenue(response.data);
        console.log("monthly revemue",response.data);
      } catch (err) {
        console.error("Error fetching revenue trends:", err);
        setError(err.response?.data?.message || err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyRevenue();
  }, [token]);


  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Assuming response is stored in monthlyRevenue
  const lineData = {
    labels: monthlyRevenue.map(item => months[item.month - 1]),
    datasets: [
      {
        label: 'Revenue',
        data: monthlyRevenue.map(item => item.total),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const [productTypeStats, setProductTypeStats] = useState([]);



  useEffect(() => {
    const fetchProductStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/product/producttype-overview"
        );

        const response1 = await axios.get(
          "http://localhost:8080/product/total-products"
        );


        setProductTypeStats(response.data);
        setTotalProducts(response1.data);
        console.log("totalProducts", response1.data);
        console.log("product", response.data);
      } catch (err) {
        console.error("Error fetching revenue trends:", err);
        setError(err.response?.data?.message || err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProductStats();
  }, []); // removed [token] dependency since token is not needed


  const categoryData = {
    labels: productTypeStats.map(item => item.productType), // ['anklet', 'neckless', 'ring', 'Bracelet', 'earring', 'wristband']
    datasets: [
      {
        label: 'Category Overview',
        data: productTypeStats.map(item => item.count),      // [1, 1, 2, 2, 1, 1]
        backgroundColor: [
          '#3B82F6',
          '#06B6D4',
          '#FACC15',
          '#F472B6',
          '#8B5CF6',
          '#6B7280'
        ]
      }
    ]
  };

  const [orders, setOrders] = useState([]);
  const [count, setCount] = useState(0);

  const getPaidOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/api/admin/orders/paid", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setOrders(res.data);
      console.log(res.data);
      setCount(res.data.length);
    } catch (err) {
      console.error("Failed to fetch paid orders", err);
      alert("Failed to fetch paid orders. Make sure you are logged in as Admin.");
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    getPaidOrders();
  }, []);



  useEffect(() => {
    if (!token) {
      setError("User not logged in");
      setLoading(false);
      return;
    }
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/total-users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setCountUsers(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching total users:", err);
        setError(err.response?.data?.message || err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTotalUsers();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store.</p>
        </div>
      </div>

      <div className="p-6">
        {/* Product Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {productStats.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${card.color === 'border-red-500' ? 'bg-red-100 text-red-600' :
                    card.color === 'border-blue-500' ? 'bg-blue-100 text-blue-600' :
                      card.color === 'border-green-500' ? 'bg-green-100 text-green-600' :
                        'bg-purple-100 text-purple-600'
                    }`}>
                    <div className="text-xl">{card.icon}</div>
                  </div>
                </div>
              </div>
              <div className={`h-1 ${card.color === 'border-red-500' ? 'bg-red-500' :
                card.color === 'border-blue-500' ? 'bg-blue-500' :
                  card.color === 'border-green-500' ? 'bg-green-500' :
                    'bg-purple-500'
                }`}></div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Invoice Statistics */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Invoice Statistics</h3>
              <p className="text-sm text-gray-600">Order status overview</p>
            </div>
            <div className="p-4">
              <div className="h-64 flex items-center justify-center">
                <Doughnut data={donutData} />
              </div>
            </div>
          </div>

          {/* Sales Analytics */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Sales Analytics</h3>
              <p className="text-sm text-gray-600">Revenue trends over time</p>
            </div>
            <div className="p-4">
              <div className="h-64">
                <Line data={lineData} />
              </div>
            </div>
          </div>
        </div>

        {/* Overview Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Category Overview */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Category Overview</h3>
              <p className="text-sm text-gray-600">Products by category</p>
            </div>
            <div className="p-4">
              <Bar data={categoryData} />
            </div>
          </div>

          {/* Brand Overview */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Brand Overview</h3>
              <p className="text-sm text-gray-600">Products by brand</p>
            </div>
            <div className="p-4">
              <Bar data={brandData} />
            </div>
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
            <button className="text-sm text-blue-600 hover:underline font-medium">
              View All
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wider">
                  <th className="px-6 py-3">No</th>
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Items</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.slice(-5).map((order, index) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    {/* No */}
                    <td className="px-6 py-4 text-gray-700">{index + 1}</td>

                    {/* Order ID */}
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {order.orderId}
                    </td>

                    {/* Customer */}
                    <td className="px-6 py-4 flex items-center gap-2">
                      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold">
                        {order.user?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <span className="text-gray-700">{order.user?.name}</span>
                    </td>

                    <td className="px-6 py-6">
                      <div className="max-w-xs">
                        {order.products?.slice(0, 2).map((p, idx) => (
                          <div key={p.productId || idx} className="text-sm text-gray-700 mb-1 flex items-center">
                            <span className="inline-block w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center mr-2 font-semibold">
                              {p.quantity ? `${p.quantity}x ` : "1x "}
                            </span>
                            <span className="truncate">{p.name}</span>
                          </div>
                        )) || <span className="text-gray-400">No items</span>}
                        {order.products?.length > 2 && (
                          <div className="text-xs text-blue-600 font-medium">
                            +{order.products.length - 2} more items
                          </div>
                        )}
                      </div>
                    </td>


                    <td className="px-6 py-6">
                      <div className="text-sm text-gray-900 font-medium">
                        {new Date(order.createdAt).toLocaleDateString("en-GB", {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true
                        })}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium
      ${order.orderStatus === "PAID"
                            ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                            : order.orderStatus === "PENDDING"
                              ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-white"
                              : order.orderStatus === "PROCESSING"
                                ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
                                : order.orderStatus === "SHIPPED"
                                  ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white"
                                  : "bg-gradient-to-r from-green-400 to-green-500 text-white"
                          }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-white/30 mr-2"></span>
                        {order.orderStatus}
                      </span>
                    </td>




                    {/* Price */}
                    <td className="px-6 py-4 font-semibold text-right text-gray-800">
                      {order.currency} {order.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;