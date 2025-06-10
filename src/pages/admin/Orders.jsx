// src/pages/admin/Orders.jsx
import React, { useState } from 'react';

const Orders = () => {
  const [filter, setFilter] = useState('All');
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: 'shehan',
      status: 'Pending',
      trackingNumber: '',
      date: '2025-06-10',
      total: '$120.00',
    },
    {
      id: 2,
      customerName: 'yasindu',
      status: 'Shipped',
      trackingNumber: 'TRK123456',
      date: '2025-06-09',
      total: '$89.50',
    },
    {
      id: 3,
      customerName: 'hansi',
      status: 'Delivered',
      trackingNumber: 'TRK789101',
      date: '2025-06-08',
      total: '$49.99',
    },
  ]);

  const statusOptions = ['All', 'Pending', 'Shipped', 'Delivered', 'Canceled'];

  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleTrackingChange = (id, value) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, trackingNumber: value } : order
      )
    );
  };

  const handleDownload = (id) => {
    const order = orders.find((o) => o.id === id);
    const data = `Order ID: ${order.id}\nCustomer: ${order.customerName}\nStatus: ${order.status}\nTracking: ${order.trackingNumber}\nDate: ${order.date}\nTotal: ${order.total}`;
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `order_${order.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredOrders =
    filter === 'All'
      ? orders
      : orders.filter((order) => order.status === filter);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Manage Orders</h1>
      <p className="text-gray-600 mb-6">View and process customer orders here.</p>

      {/* Filter by Status */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Status:</label>
        <select
          className="border p-2 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {statusOptions.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
      </div>

      {/* Orders Table */}
       <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wide">
            <tr>
              <th className="border-b px-6 py-3 text-left">Order ID</th>
              <th className="border-b px-6 py-3 text-left">Customer</th>
              <th className="border-b px-6 py-3 text-left">Date</th>
              <th className="border-b px-6 py-3 text-left">Total</th>
              <th className="border-b px-6 py-3 text-left">Status</th>
              <th className="border-b px-6 py-3 text-left">Tracking #</th>
              <th className="border-b px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition">
                <td className="border-b px-6 py-4">{order.id}</td>
                <td className="border-b px-6 py-4">{order.customerName}</td>
                <td className="border-b px-6 py-4">{order.date}</td>
                <td className="border-b px-6 py-4">{order.total}</td>
                <td className="border-b px-6 py-4">
                  <select
                    className="border rounded p-1 w-full"
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                  >
                    {statusOptions
                      .filter((opt) => opt !== 'All')
                      .map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                  </select>
                </td>
                <td className="border-b px-6 py-4">
                  <input
                    type="text"
                    className="border rounded p-1 w-full"
                    placeholder="Enter tracking #"
                    value={order.trackingNumber}
                    onChange={(e) =>
                      handleTrackingChange(order.id, e.target.value)
                    }
                  />
                </td>
                <td className="border-b px-6 py-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-sm"
                    onClick={() => handleDownload(order.id)}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No orders found for this status.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
