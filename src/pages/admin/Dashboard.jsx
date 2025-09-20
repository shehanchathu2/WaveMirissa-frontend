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
      value: '8',
      icon: <FaBoxes />,
      color: 'border-blue-500'
    },
    {
      title: 'Categories',
      value: '6',
      icon: <FaLayerGroup />,
      color: 'border-green-500'
    },
    {
      title: 'Orders',
      value: trends.totalOrders ? trends.totalOrders : '0',
      icon: <FaLeaf />,
      color: 'border-purple-500'
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
        // console.log(response.data);
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
      setProductTypeStats(response.data);
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
              <p className="text-sm text-gray-600">Payment status overview</p>
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
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Recent Invoices</h3>
                <p className="text-sm text-gray-600">Latest customer orders</p>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
                View All
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{inv.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">#065499</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                          {inv.customer.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{inv.customer}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{inv.items}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      <div>
                        <p>{inv.date}</p>
                        <p className="text-xs text-gray-400">{inv.time}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${inv.status === 'Paid'
                        ? 'bg-green-100 text-green-800'
                        : inv.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                        }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{inv.price}</td>
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