import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import WaveMirissaLoader from "../../../components/WaveMirissaLoader";
import { Search, Filter, Download, Eye, Edit, Trash2, User, Package, CreditCard, Phone, Mail } from 'lucide-react';

const DeliveredOrdersTable = ({ setModalContent }) => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Delivered');
  const [trackingModalOrder, setTrackingModalOrder] = useState(null);


  const loginUser = JSON.parse(localStorage.getItem("user"));
  const token = loginUser.jwt;

  const getPaidOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/paid`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch paid orders", err);
      alert("Failed to fetch paid orders. Make sure you are logged in as Admin.");
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(
    (order) => order.orderStatus.toLowerCase() === activeTab.toLowerCase()
  );

  console.log(filteredOrders)

  useEffect(() => {
    getPaidOrders();
  }, []);

  if (loading) return <WaveMirissaLoader />;
  return (
    <>
      {filteredOrders.map((order, index) => (
        <motion.tr
          key={order.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="hover:bg-gray-50 border-b border-gray-100"
        >
          <td className="px-6 py-4 text-sm font-medium text-gray-900">
            {order.orderId}
            <div className="text-xs text-gray-500 mt-1">
              {new Date(order.createdAt).toLocaleDateString()}
            </div>
          </td>

          <td className="px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{order.user?.name || order.customerName}</div>
                <div className="text-sm text-gray-500 flex items-center mt-1">
                  <Mail className="w-3 h-3 mr-1" />
                  {order.user?.email || 'customer@email.com'}
                </div>
                <div className="text-sm text-gray-500 flex items-center">
                  <Phone className="w-3 h-3 mr-1" />
                  {order.user.address.phone}
                </div>
              </div>
            </div>
          </td>

          <td className="px-6 py-4">
            <div className="text-sm text-gray-900">
              {order.products ? `${order.products.length} item(s)` : '1 item(s)'}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {order.products.map(p => p.name).join(', ').substring(0, 50)}
            </div>
          </td>

          <td className="px-6 py-4">
            <div className="text-sm font-semibold text-gray-900">{order.total || `${order.amount}`}</div>
            <div className="text-xs text-gray-500">Payhere</div>
          </td>

          <td className="px-6 py-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              ✅ Delivered
            </span>
          </td>

          <td className="px-6 py-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() =>
                  setModalContent({
                    title: "Order Details",
                    content: (
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-gray-900 mb-3">Customer Information</h3>
                          <div className="space-y-2">
                            <p><strong>Name:</strong> {order.user.name}</p>
                            <p><strong>Email:</strong> {order.user.email}</p>
                            <strong>Address:</strong>{" "}
                            {order.user.address.street}, {order.user.address.city}, {order.user.address.state}                            <p><strong>Phone:</strong> {order.user.address.phone}</p>
                          </div>
                        </div>
                        {order.products.map((p, i) => (
                          <div key={i} className="border rounded p-3 mb-2 bg-gray-50 shadow">
                            <h3 className="font-semibold">{p.name}</h3>
                            <p>{p.price.toLocaleString()} LKR</p>
                            {p.customizations.length > 0 && (
                              <div className="mt-2">
                                <span className="font-medium">Customizations:</span>
                                <div className="flex gap-2 flex-wrap mt-1">
                                  {p.customizations.map((c, j) => (
                                    <span key={j} className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-sm">
                                      {c}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ),
                  })
                }
                className="px-4 py-1 bg-blue-600 text-white text-xs rounded-lg shadow hover:bg-blue-700 transition"
                title="See info"
              >
                See info
              </button>
            </div>
          </td>
        </motion.tr>
      ))}
    </>
  );
};

export default DeliveredOrdersTable;
