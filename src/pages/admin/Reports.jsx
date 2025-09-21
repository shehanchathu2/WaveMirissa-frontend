import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Calendar, DollarSign, Package, Users, Eye } from 'lucide-react';
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Reports = () => {
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

  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loginUser = JSON.parse(localStorage.getItem("user"));
  const token = loginUser?.jwt;

  const [salesReport, setSalesReport] = useState([]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    if (!token) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    const fetchMonthlyRevenue = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/admin/orders/monthly-revenue",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        const formattedData = data.map((item) => {
          const monthName = monthNames[item.month - 1];
          return {
            month: `${monthName} ${new Date().getFullYear()}`,
            totalSales: `LKR ${item.total.toFixed(2)}`,
            orders: item.orderCount,
          };
        });

        setSalesReport(formattedData);
      } catch (err) {
        console.error("Error fetching revenue trends:", err);
        setError(err.response?.data?.message || err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyRevenue();
  }, [token]);

  // PDF Export
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Monthly Sales Report", 14, 20);
    doc.autoTable({
      startY: 30,
      head: [["Month", "Total Sales", "Number of Orders"]],
      body: salesReport.map((report) => [
        report.month,
        report.totalSales,
        report.orders,
      ]),
    });
    doc.save("monthly_sales_report.pdf");
  };

  // Excel Export
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(salesReport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "monthly_sales_report.xlsx");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate totals
  const totalSales = salesReport.reduce((sum, report) => {
    const amount = parseFloat(report.totalSales.replace('LKR ', ''));
    return sum + amount;
  }, 0);

  const totalOrders = salesReport.reduce((sum, report) => sum + report.orders, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <BarChart3 className="text-blue-600" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
              <p className="text-gray-600 mt-1">
                View monthly/yearly sales, product performance, and user engagement statistics.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Sales */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <DollarSign className="text-green-600" size={20} />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">
                LKR {totalSales.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="text-green-500" size={16} />
            <span className="text-sm text-green-600 font-medium">Revenue Generated</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Package className="text-blue-600" size={20} />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Package className="text-blue-500" size={16} />
            <span className="text-sm text-blue-600 font-medium">Orders Processed</span>
          </div>
        </div>

        {/* Active Months */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Calendar className="text-purple-600" size={20} />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Active Months</p>
              <p className="text-2xl font-bold text-gray-900">{salesReport.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="text-purple-500" size={16} />
            <span className="text-sm text-purple-600 font-medium">Reporting Period</span>
          </div>
        </div>
      </div>

      {/* Monthly Sales Report */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <BarChart3 className="text-blue-600" size={18} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Monthly Sales Report</h2>
              <p className="text-sm text-gray-600 mt-1">Detailed breakdown of monthly performance</p>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="flex gap-2">
            {/* <button
              onClick={exportPDF}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Download PDF
            </button> */}
            <button
              onClick={exportExcel}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Download Excel
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                  MONTH
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                  TOTAL SALES
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                  NUMBER OF ORDERS
                </th>
              </tr>
            </thead>
            <tbody>
              {salesReport.map((report, index) => (
                <tr 
                  key={index} 
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="text-blue-600" size={14} />
                      </div>
                      <span className="font-medium text-gray-900">{report.month}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-green-600">{report.totalSales}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{report.orders}</span>
                      <span className="text-xs text-gray-500">orders</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {salesReport.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="text-gray-400" size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No sales data available</h3>
            <p className="text-gray-600">Sales reports will appear here once orders are processed.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
