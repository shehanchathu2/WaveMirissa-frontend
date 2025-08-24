import React, { useState } from 'react';

const Reports = () => {
  // Sample report data (you can later fetch this from backend)
  const [salesReport] = useState([
    { month: 'June 2025', totalSales: '$2,500', orders: 42 },
    { month: 'May 2025', totalSales: '$3,100', orders: 50 },
    { month: 'April 2025', totalSales: '$1,800', orders: 30 },
  ]);

  const [topProducts] = useState([
    { name: 'Diamond Necklace', sold: 25 },
    { name: 'Gold Ring', sold: 18 },
    { name: 'Silver Bracelet', sold: 15 },
  ]);

  const [engagementStats] = useState([
    { item: 'Custom Gold Pendant', customizations: 12 },
    { item: 'Engraved Ring', customizations: 9 },
    { item: 'Birthstone Necklace', customizations: 7 },
  ]);

  return (
    <div className="p-6 bg-[#f9fbfd]">
      <h1 className="text-3xl font-bold mb-4">Reports & Analytics</h1>
      <p className="text-gray-600 mb-6">
        View monthly/yearly sales, product performance, and user engagement statistics.
      </p>

      {/* Sales Report Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Monthly Sales Report</h2>
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full text-sm border border-gray-200">
            <thead className="bg-gray-50 text-gray-700 uppercase">
              <tr>
                <th className="border-b px-6 py-3 text-left">Month</th>
                <th className="border-b px-6 py-3 text-left">Total Sales</th>
                <th className="border-b px-6 py-3 text-left">Number of Orders</th>
              </tr>
            </thead>
            <tbody>
              {salesReport.map((report, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border-b px-6 py-4">{report.month}</td>
                  <td className="border-b px-6 py-4">{report.totalSales}</td>
                  <td className="border-b px-6 py-4">{report.orders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Selling Products Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Top Selling Products</h2>
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full text-sm border border-gray-200">
            <thead className="bg-gray-50 text-gray-700 uppercase">
              <tr>
                <th className="border-b px-6 py-3 text-left">Product</th>
                <th className="border-b px-6 py-3 text-left">Units Sold</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border-b px-6 py-4">{product.name}</td>
                  <td className="border-b px-6 py-4">{product.sold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Engagement Stats */}
      <div>
        <h2 className="text-xl font-semibold mb-2">User Engagement - Most Customized Items</h2>
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full text-sm border border-gray-200">
            <thead className="bg-gray-50 text-gray-700 uppercase">
              <tr>
                <th className="border-b px-6 py-3 text-left">Item</th>
                <th className="border-b px-6 py-3 text-left">Customizations</th>
              </tr>
            </thead>
            <tbody>
              {engagementStats.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border-b px-6 py-4">{item.item}</td>
                  <td className="border-b px-6 py-4">{item.customizations}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
