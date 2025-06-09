// src/pages/admin/Dashboard.jsx
import React from 'react';
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

  const productStats = [
    {
      title: 'Total Value',
      value: '$3,066,200.00',
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
      title: 'Brands',
      value: '5',
      icon: <FaLeaf />,
      color: 'border-purple-500'
    },
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

  const donutData = {
    labels: ['Paid', 'Pending', 'Overdue'],
    datasets: [
      {
        label: 'Invoices',
        data: [50, 25, 25],
        backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
        borderColor: ['#10B981', '#F59E0B', '#EF4444'],
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [3000, 3200, 2800, 3500, 3700, 4000],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const categoryData = {
    labels: ['Laptops', 'Mouse', 'Harddisk', 'MotherBoard', 'Graphics Card', 'Monitor'],
    datasets: [
      {
        label: 'Category Overview',
        data: [2, 1, 1, 1, 1, 2],
        backgroundColor: ['#3B82F6', '#06B6D4', '#FACC15', '#F472B6', '#8B5CF6', '#6B7280']
      }
    ]
  };

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

  return (
    <>
      {/* <div className='bg-[#1b4967] p-6 rounded-lg shadow-xl mb-2'>
        <header className="mb-1">
        <h1 className="text-2xl text-white font-semibold">Dashboard</h1>
      </header>
      </div> */}





    <div className="p-6 bg-[#f9fbfd]">
      {/* Stats */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-4 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                {stat.icon}
              </div>
              <div>
                <h4 className="text-sm text-gray-500">{stat.title}</h4>
                <h2 className="text-xl font-bold">{stat.value}</h2>
                <p className={`text-xs ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>{stat.change} Since last week</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div> */}

      {/* Product Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {productStats.map((card, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`border-l-4 ${card.color} bg-white shadow-sm p-4 rounded-xl flex items-center gap-4`}
          >
            <div className="text-2xl text-gray-500">{card.icon}</div>
            <div>
              <h4 className="text-sm text-gray-600">{card.title}</h4>
              <p className="text-xl font-semibold">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h4 className="text-sm text-gray-500 mb-2">Invoice Statistics</h4>
          <div className="h-64 flex items-center justify-center">
            <Doughnut data={donutData} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h4 className="text-sm text-gray-500 mb-2">Sales Analytics</h4>
          <div className="h-64 flex items-center justify-center">
            <Line data={lineData} />
          </div>
        </div>
      </div>

      {/* Overview Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h4 className="text-sm text-gray-500 mb-2">Category Overview</h4>
          <Bar data={categoryData} />
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h4 className="text-sm text-gray-500 mb-2">Brand Overview</h4>
          <Bar data={brandData} />
        </div>
      </div>

      {/* Recent Invoices */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-sm text-gray-500">Recent Invoices</h4>
          <button className="text-sm text-gray-400">Filter</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-2">No</th>
                <th className="py-2">ID Customers</th>
                <th className="py-2">Customer Name</th>
                <th className="py-2">Items</th>
                <th className="py-2">Order Date</th>
                <th className="py-2">Status</th>
                <th className="py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b">
                  <td className="py-2">{inv.id}</td>
                  <td className="py-2">#065499</td>
                  <td className="py-2">{inv.customer}</td>
                  <td className="py-2">{inv.items}</td>
                  <td className="py-2">{inv.date} {inv.time}</td>
                  <td className="py-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      inv.status === 'Paid'
                        ? 'bg-green-100 text-green-600'
                        : inv.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-red-100 text-red-600'
                    }`}>{inv.status}</span>
                  </td>
                  <td className="py-2">{inv.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
      </>
  );
};

export default Dashboard;