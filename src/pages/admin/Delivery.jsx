import React, { useState } from 'react';

const Delivery = () => {
  const [deliveries, setDeliveries] = useState([
    {
      id: 1,
      orderId: 'ORD1001',
      customer: 'shehan',
      address: 'Colombo, Sri Lanka',
      trackingNumber: 'TRK123456',
      shippedDate: '2025-06-08',
      trackingVisible: true,
    },
    {
      id: 2,
      orderId: 'ORD1002',
      customer: 'yasindu',
      address: 'Badulla, Sri Lanka',
      trackingNumber: 'TRK654321',
      shippedDate: '2025-06-09',
      trackingVisible: false,
    },
  ]);

  const handleTrackingChange = (id, value) => {
    setDeliveries((prev) =>
      prev.map((d) => (d.id === id ? { ...d, trackingNumber: value } : d))
    );
  };

  const handleToggleVisibility = (id) => {
    setDeliveries((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, trackingVisible: !d.trackingVisible } : d
      )
    );
  };

  const handleSendEmail = (id) => {
    const delivery = deliveries.find((d) => d.id === id);
    alert(
      `Email sent to ${delivery.customer} with tracking info: ${delivery.trackingNumber}`
    );
  };

  return (
    <div className="p-6 bg-[#f9fbfd]">
      <h1 className="text-3xl font-bold mb-4">Manage Delivery</h1>
      <p className="text-gray-600 mb-6">
        Update shipment details, tracking visibility, and email tracking info.
      </p>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-50 text-gray-700 uppercase tracking-wide">
            <tr>
              <th className="border-b px-6 py-3 text-left">Order Num</th>
              <th className="border-b px-6 py-3 text-left">Customer</th>
              <th className="border-b px-6 py-3 text-left">Address</th>
              <th className="border-b px-6 py-3 text-left">Shipped Date</th>
              <th className="border-b px-6 py-3 text-left">Tracking #</th>
              <th className="border-b px-6 py-3 text-left">Visible to Customer</th>
              <th className="border-b px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery) => (
              <tr key={delivery.id} className="hover:bg-gray-50">
                <td className="border-b px-6 py-4">{delivery.orderId}</td>
                <td className="border-b px-6 py-4">{delivery.customer}</td>
                <td className="border-b px-6 py-4">{delivery.address}</td>
                <td className="border-b px-6 py-4">{delivery.shippedDate}</td>
                <td className="border-b px-6 py-4">
                  <input
                    type="text"
                    className="border p-1 rounded w-full"
                    value={delivery.trackingNumber}
                    onChange={(e) =>
                      handleTrackingChange(delivery.id, e.target.value)
                    }
                  />
                </td>
                <td className="border-b px-6 py-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={delivery.trackingVisible}
                      onChange={() => handleToggleVisibility(delivery.id)}
                      className="mr-2"
                    />
                    {delivery.trackingVisible ? 'Visible' : 'Hidden'}
                  </label>
                </td>
                <td className="border-b px-6 py-4 space-x-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                    onClick={() => handleSendEmail(delivery.id)}
                  >
                    Email Info
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Delivery;
