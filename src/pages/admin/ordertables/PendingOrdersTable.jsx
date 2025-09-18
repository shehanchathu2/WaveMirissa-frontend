import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import WaveMirissaLoader from "../../../components/WaveMirissaLoader";
import { Search, Filter, Download, Eye, Edit, Trash2, User, Package, CreditCard, Phone, Mail } from 'lucide-react';


// Updated Table Components with new design
const PendingOrdersTable = ({ setModalContent, handleAccept }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Pendding');
  
  const loginUser = JSON.parse(localStorage.getItem("user"));
  const token = loginUser.jwt;
  
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

  useEffect(() => {
    getPaidOrders();
  }, []);

    
      console.log("orders", orders);
      console.log("filteredOrders", filteredOrders);
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
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{order.user.name}</div>
                <div className="text-sm text-gray-500 flex items-center mt-1">
                  <Mail className="w-3 h-3 mr-1" />
                  {order.user.email}
                </div>
                <div className="text-sm text-gray-500 flex items-center">
                  <Phone className="w-3 h-3 mr-1" />
                  +94 77 123 4567
                </div>
              </div>
            </div>
          </td>

          <td className="px-6 py-4">
            <div className="text-sm text-gray-900">
              {order.products.length} item(s)
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {order.products.map(p => p.name).join(', ').substring(0, 50)}...
            </div>
          </td>

          <td className="px-6 py-4">
            <div className="text-sm font-semibold text-gray-900">{order.amount}</div>
            <div className="text-xs text-gray-500">Pay Here</div>
          </td>

          <td className="px-6 py-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              🔄 Pendding
            </span>
          </td>

          <td className="px-6 py-4 ">
            <div className="flex items-center space-x-2">
              <button
                onClick={() =>
                  setModalContent({ 
                    title: "Order Details",
                    content: (
                      <div className="space-y-4 ">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-gray-900 mb-3">Customer Information</h3>
                          <div className="space-y-2">
                            <p><strong>Name:</strong> {order.user.name}</p>
                            <p><strong>Email:</strong> {order.user.email}</p>
                            <p><strong>Address:</strong> 123 Main Street, Colombo</p>
                            <p><strong>Phone:</strong> +94 77 123 4567</p>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                          {order.products.map((p, i) => (
                            <div key={i} className="border rounded p-3 mb-2 bg-white shadow-sm">
                              <h4 className="font-semibold">{p.name}</h4>
                              <p className="text-gray-600">{p.price.toLocaleString()} LKR</p>
                              {p.customizations.length > 0 && (
                                <div className="mt-2">
                                  <span className="font-medium text-sm text-gray-700">Customizations:</span>
                                  <div className="flex gap-2 flex-wrap mt-1">
                                    {p.customizations.map((c, j) => (
                                      <span key={j} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                                        {c}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ),
                  })
                }
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              >
                <Eye className="w-4 h-4" />
              </button>
              
              <button
                className="inline-flex items-center px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-full transition-colors shadow-sm"
                onClick={() => handleAccept(order.id)}
                title="Accept Order"
              >
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Accept
              </button>
              
             
            </div>
          </td>
        </motion.tr>
      ))}
    </>
  );
};

export default PendingOrdersTable;

