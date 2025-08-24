import React, { useState } from 'react';

const Payment = () => {
  const [payments] = useState([
    {
      id: 1,
      orderId: 'ORD1001',
      customer: 'shehan',
      amount: '$120.00',
      method: 'PayHere',
      status: 'Confirmed',
      date: '2025-06-08',
    },
    {
      id: 2,
      orderId: 'ORD1002',
      customer: 'yasindu',
      amount: '$89.50',
      method: 'PayHere',
      status: 'Failed',
      date: '2025-06-09',
    },
    {
      id: 3,
      orderId: 'ORD1003',
      customer: 'hansi',
      amount: '$49.99',
      method: 'PayHere',
      status: 'Pending',
      date: '2025-06-10',
    },
  ]);

  return (
    <div className="p-6 bg-[#f9fbfd]">
      <h1 className="text-3xl font-bold mb-4">Manage Payment</h1>
      <p className="text-gray-600 mb-6">View payment confirmations and handle issues. (Payments processed via PayHere)</p>

      {/* Payment Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg mb-8">
        <table className="min-w-full text-sm border border-gray-200">
          <thead className="bg-gray-50 text-gray-700 uppercase">
            <tr>
              <th className="border-b px-6 py-3 text-left">Order ID</th>
              <th className="border-b px-6 py-3 text-left">Customer</th>
              <th className="border-b px-6 py-3 text-left">Amount</th>
              <th className="border-b px-6 py-3 text-left">Method</th>
              <th className="border-b px-6 py-3 text-left">Status</th>
              <th className="border-b px-6 py-3 text-left">Date</th>
              <th className="border-b px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="border-b px-6 py-4">{payment.orderId}</td>
                <td className="border-b px-6 py-4">{payment.customer}</td>
                <td className="border-b px-6 py-4">{payment.amount}</td>
                <td className="border-b px-6 py-4">{payment.method}</td>
                <td
                  className={`border-b px-6 py-4 font-medium ${
                    payment.status === 'Confirmed'
                      ? 'text-green-600'
                      : payment.status === 'Failed'
                      ? 'text-red-500'
                      : 'text-yellow-500'
                  }`}
                >
                  {payment.status}
                </td>
                <td className="border-b px-6 py-4">{payment.date}</td>
                <td className="border-b px-6 py-4">
                  {payment.status !== 'Confirmed' ? (
                    <button
                      className="text-sm text-blue-600 hover:underline"
                      onClick={() =>
                        alert(
                          `Marking issue for ${payment.orderId}. Please follow up manually.`
                        )
                      }
                    >
                      Resolve
                    </button>
                  ) : (
                    <span className="text-gray-400 text-sm">No action</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Refund Request Placeholder */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Refund Requests</h2>
        <p className="text-gray-600 text-sm">
          Refund request handling is not yet implemented. This section will list refund claims once supported.
        </p>
      </div>
    </div>
  );
};

export default Payment;
