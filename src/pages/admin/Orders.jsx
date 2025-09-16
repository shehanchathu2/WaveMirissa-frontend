import React, { useEffect, useState } from 'react';
import OrderModal from '../../components/admin/OrderModel';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import SendEmailModal from '../../components/admin/SendEmailModel';
import axios from 'axios';
import WaveMirissaLoader from '../../components/WaveMirissaLoader';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from "framer-motion"; // ✅ add import

const Orders = () => {
  const [modalContent, setModalContent] = useState(null);
  const [confimationModalCon, setConfimationModalCon] = useState(null);
  const [activeTab, setActiveTab] = useState('Pendding');
  const [orders, setOrders] = useState([]);

  const statusTabs = ['Pendding', 'Processing', 'Shipped', 'Delivered'];


  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleMarkAsCompleted = () => {
    // You can update status or make an API call here
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === selectedOrderId ? { ...order, status: 'Shipped' } : order
      )
    );
    setShowConfirmModal(false);
  };



  const loginUser = JSON.parse(localStorage.getItem("user"));
  const token = loginUser.jwt;
  const newRole = loginUser.role;

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
      console.log("Pendding orders", res.data);
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




  const handleAccept = async (orderId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/admin/orders/${orderId}/status?status=PROCESSING`,
        {}, // empty request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const updatedOrder = response.data;

      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
      toast.success("Order status updated successfully!");
      await getPaidOrders();
    } catch (err) {
      console.error("Error updating order status:", err);
      toast.error("Failed to update order status.");
    }
  };




  const handleReadyToShipped = async (orderId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/admin/orders/${orderId}/status?status=SHIPPED`,
        {}, // empty request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const updatedOrder = response.data;

      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
      toast.success("Order status updated successfully!");
      await getPaidOrders();
    } catch (err) {
      console.error("Error updating order status:", err);
      toast.error("Failed to update order status.");
    }
  };



  console.log('Active Tab:', activeTab);
  console.log('Orders:', orders);
  console.log('Filtered Orders:', filteredOrders);




  if (loading) return <WaveMirissaLoader />;

  return (
    <div className="p-6 bg-[#f9fbfd] h-full">
      <h1 className="text-3xl font-bold mb-4">Manage Orders</h1>
      <p className="text-gray-600 mb-6">View and process customer orders here.</p>

      <div className="flex gap-4 mb-6">
        {statusTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full font-semibold ${activeTab === tab
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
          >
            {tab} Orders
          </button>
        ))}
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wide">
            <tr className="bg-[#f1f5f9] text-gray-700 text-sm uppercase tracking-wider">
              {activeTab === 'Pendding' && (
                <>
                  <th className="px-6 py-3 text-left">Order Num</th>
                  <th className="px-6 py-3 text-left">Customer Detail</th>
                  <th className="px-6 py-3 text-left">Order Details</th>
                  <th className="px-6 py-3 text-left">Total</th>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </>
              )}
              {activeTab === 'Processing' && (
                <>
                  <th className="px-6 py-3 text-left">Order Num</th>
                  <th className="px-6 py-3 text-left">Customer</th>
                  <th className="px-6 py-3 text-left">Order Details</th>

                  <th className="px-6 py-3 text-left">Total</th>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Action</th>
                </>
              )}
              {activeTab === 'Shipped' && (
                <>
                  <th className="px-6 py-3 text-left">Order Num</th>
                  <th className="px-6 py-3 text-left">Customer</th>
                  <th className="px-6 py-3 text-left">Order Details</th>
                  <th className="px-6 py-3 text-left">Tracking #</th>
                  <th className="px-6 py-3 text-left">Est. Delivery</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </>
              )}
              {activeTab === 'Delivered' && (
                <>
                  <th className="px-6 py-3 text-left">Order Num</th>
                  <th className="px-6 py-3 text-left">Customer</th>
                  <th className="px-6 py-3 text-left">Order Details</th>
                  <th className="px-6 py-3 text-left">Delivery Date</th>
                  <th className="px-6 py-3 text-left">Total</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </>
              )}
            </tr>
          </thead>

          <tbody className="text-gray-800 text-sm">

            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`hover:bg-gray-50 transition 
                ${activeTab === "Pendding" ? "bg-gray-100" : ""}
                ${activeTab === "Processing" ? "bg-blue-50" : ""}
                ${activeTab === "Shipped" ? "bg-orange-50" : ""}
                ${activeTab === "Delivered" ? "bg-green-50" : ""}`}
                >

                  {activeTab === 'Pendding' && (
                    <>
                      <td className="border-b px-6 py-4">{index + 1}</td>
                      <td className="border-b px-6 py-4">
                        <button
                          onClick={() =>
                            setModalContent({
                              title: 'Customer Detail',
                              content: (
                                <div
                                  style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    padding: '1rem',
                                    marginBottom: '1rem',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                    backgroundColor: '#fafafa',
                                  }}
                                >
                                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2c3e50', marginBottom: '0.5rem' }}>
                                    Customer Information
                                  </div>

                                  <div style={{ marginBottom: '0.25rem' }}>
                                    <strong style={{ color: '#34495e' }}>Name:</strong>{' '}
                                    <span style={{ color: '#2c3e50' }}>{order.user.name}</span>
                                  </div>
                                  <div style={{ marginBottom: '0.25rem' }}>
                                    <strong style={{ color: '#34495e' }}>Email:</strong>{' '}
                                    <span style={{ color: '#2c3e50' }}>{order.user.email}</span>
                                  </div>
                                  <div style={{ marginBottom: '0.25rem' }}>
                                    <strong style={{ color: '#34495e' }}>Address:</strong>{' '}
                                    <span style={{ color: '#2c3e50' }}>123 Main Street, Colombo</span>
                                  </div>
                                  <div>
                                    <strong style={{ color: '#34495e' }}>Phone:</strong>{' '}
                                    <span style={{ color: '#2c3e50' }}>+94 77 123 4567</span>
                                  </div>
                                </div>

                              ),
                            })
                          }
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          See Info
                        </button>
                      </td>

                      <td className="border-b px-6 py-4">
                        <button
                          onClick={() =>
                            setModalContent({
                              title: 'Order Detail',
                              content: (
                                <>
                                  {order.products.map((p, index) => (
                                    <div
                                      key={index}
                                      style={{
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        padding: '1rem',
                                        marginBottom: '1rem',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                        backgroundColor: '#fafafa',
                                      }}
                                    >
                                      {/* Header: Product Name & Price */}
                                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
                                        <div>
                                          <div style={{ fontSize: "0.85rem", color: "#7f8c8d" }}>
                                            Order #{order.orderId} • Item {index + 1}
                                          </div>
                                          <div style={{ fontSize: "1.1rem", fontWeight: "600", color: "#2c3e50", marginTop: "4px" }}>
                                            {p.name}
                                          </div>
                                        </div>
                                        <div style={{ fontWeight: "600", color: "#27ae60", fontSize: "1rem" }}>
                                          {p.price.toLocaleString()} LKR
                                        </div>
                                      </div>

                                      {/* Customizations */}
                                      {p.customizations.length > 0 && (
                                        <div style={{ marginTop: '0.75rem' }}>
                                          <em style={{ fontSize: '0.9rem', color: '#34495e' }}>Customizations items:</em>
                                          <div
                                            style={{
                                              marginTop: '0.25rem',
                                              display: 'flex',
                                              flexWrap: 'wrap',
                                              gap: '0.5rem',
                                            }}
                                          >
                                            {p.customizations.map((c, i) => (
                                              <span
                                                key={i}
                                                style={{
                                                  backgroundColor: '#e0f7fa',
                                                  padding: '0.25rem 0.5rem',
                                                  borderRadius: '12px',
                                                  fontSize: '0.85rem',
                                                  color: '#00796b',
                                                }}
                                              >
                                                {c}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </>

                              ),
                            })
                          }
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          View Details
                        </button>
                      </td>


                      <td className="border-b px-6 py-4">{order.amount}</td>
                      <td className="border-b px-6 py-4">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </td>



                      <td className="border-b px-6 py-4 space-x-2">
                        <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => handleAccept(order.id)}>
                          Accept
                        </button>
                      </td>
                    </>
                  )}

                  {activeTab === 'Processing' && (
                    <>
                      <td className="border-b px-6 py-4">{order.id}</td>
                      <td className="border-b px-6 py-4">
                        <button
                          onClick={() =>
                            setModalContent({
                              title: 'Customer Detail',
                              content: (
                                <div
                                  style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    padding: '1rem',
                                    marginBottom: '1rem',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                    backgroundColor: '#fafafa',
                                  }}
                                >
                                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2c3e50', marginBottom: '0.5rem' }}>
                                    Customer Information
                                  </div>

                                  <div style={{ marginBottom: '0.25rem' }}>
                                    <strong style={{ color: '#34495e' }}>Name:</strong>{' '}
                                    <span style={{ color: '#2c3e50' }}>{order.user.name}</span>
                                  </div>
                                  <div style={{ marginBottom: '0.25rem' }}>
                                    <strong style={{ color: '#34495e' }}>Email:</strong>{' '}
                                    <span style={{ color: '#2c3e50' }}>{order.user.email}</span>
                                  </div>
                                  <div style={{ marginBottom: '0.25rem' }}>
                                    <strong style={{ color: '#34495e' }}>Address:</strong>{' '}
                                    <span style={{ color: '#2c3e50' }}>123 Main Street, Colombo</span>
                                  </div>
                                  <div>
                                    <strong style={{ color: '#34495e' }}>Phone:</strong>{' '}
                                    <span style={{ color: '#2c3e50' }}>+94 77 123 4567</span>
                                  </div>
                                </div>

                              ),
                            })
                          }
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          See Info
                        </button>
                      </td>

                      <td className="border-b px-6 py-4">
                        <button
                          onClick={() =>
                            setModalContent({
                              title: 'Order Detail',
                              content: (
                                <>
                                  {order.products.map((p, index) => (
                                    <div
                                      key={index}
                                      style={{
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        padding: '1rem',
                                        marginBottom: '1rem',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                        backgroundColor: '#fafafa',
                                      }}
                                    >
                                      {/* Header: Product Name & Price */}
                                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
                                        <div>
                                          <div style={{ fontSize: "0.85rem", color: "#7f8c8d" }}>
                                            Order #{order.orderId} • Item {index + 1}
                                          </div>
                                          <div style={{ fontSize: "1.1rem", fontWeight: "600", color: "#2c3e50", marginTop: "4px" }}>
                                            {p.name}
                                          </div>
                                        </div>
                                        <div style={{ fontWeight: "600", color: "#27ae60", fontSize: "1rem" }}>
                                          {p.price.toLocaleString()} LKR
                                        </div>
                                      </div>

                                      {/* Customizations */}
                                      {p.customizations.length > 0 && (
                                        <div style={{ marginTop: '0.75rem' }}>
                                          <em style={{ fontSize: '0.9rem', color: '#34495e' }}>Customizations items:</em>
                                          <div
                                            style={{
                                              marginTop: '0.25rem',
                                              display: 'flex',
                                              flexWrap: 'wrap',
                                              gap: '0.5rem',
                                            }}
                                          >
                                            {p.customizations.map((c, i) => (
                                              <span
                                                key={i}
                                                style={{
                                                  backgroundColor: '#e0f7fa',
                                                  padding: '0.25rem 0.5rem',
                                                  borderRadius: '12px',
                                                  fontSize: '0.85rem',
                                                  color: '#00796b',
                                                }}
                                              >
                                                {c}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </>

                              ),
                            })
                          }
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          View Details
                        </button>
                      </td>


                      <td className="border-b px-6 py-4">{order.amount}</td>
                      <td className="border-b px-6 py-4">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </td>



                      <td className="border-b px-6 py-4 space-x-2">
                        <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => handleReadyToShipped(order.id)}>
                          Ready to shipped
                        </button>
                      </td>
                    </>
                  )}

                  {activeTab === 'Shipped' && (
                    <>
                      <td className="border-b px-6 py-4">{order.id}</td>
                      <td className="border-b px-6 py-4">
                        <button
                          onClick={() =>
                            setModalContent({
                              title: 'Customer Detail',
                              content: (
                                <div
                                  style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    padding: '1rem',
                                    marginBottom: '1rem',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                    backgroundColor: '#fafafa',
                                  }}
                                >
                                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2c3e50', marginBottom: '0.5rem' }}>
                                    Customer Information
                                  </div>

                                  <div style={{ marginBottom: '0.25rem' }}>
                                    <strong style={{ color: '#34495e' }}>Name:</strong>{' '}
                                    <span style={{ color: '#2c3e50' }}>{order.user.name}</span>
                                  </div>
                                  <div style={{ marginBottom: '0.25rem' }}>
                                    <strong style={{ color: '#34495e' }}>Email:</strong>{' '}
                                    <span style={{ color: '#2c3e50' }}>{order.user.email}</span>
                                  </div>
                                  <div style={{ marginBottom: '0.25rem' }}>
                                    <strong style={{ color: '#34495e' }}>Address:</strong>{' '}
                                    <span style={{ color: '#2c3e50' }}>123 Main Street, Colombo</span>
                                  </div>
                                  <div>
                                    <strong style={{ color: '#34495e' }}>Phone:</strong>{' '}
                                    <span style={{ color: '#2c3e50' }}>+94 77 123 4567</span>
                                  </div>
                                </div>

                              ),
                            })
                          }
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          See Info
                        </button>
                      </td>
               

                  <td className="border-b px-6 py-4">
                    <button
                          onClick={() =>
                            setModalContent({
                              title: 'Order Detail',
                              content: (
                                <>
                                  {order.products.map((p, index) => (
                                    <div
                                      key={index}
                                      style={{
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        padding: '1rem',
                                        marginBottom: '1rem',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                        backgroundColor: '#fafafa',
                                      }}
                                    >
                                      {/* Header: Product Name & Price */}
                                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
                                        <div>
                                          <div style={{ fontSize: "0.85rem", color: "#7f8c8d" }}>
                                            Order #{order.orderId} • Item {index + 1}
                                          </div>
                                          <div style={{ fontSize: "1.1rem", fontWeight: "600", color: "#2c3e50", marginTop: "4px" }}>
                                            {p.name}
                                          </div>
                                        </div>
                                        <div style={{ fontWeight: "600", color: "#27ae60", fontSize: "1rem" }}>
                                          {p.price.toLocaleString()} LKR
                                        </div>
                                      </div>

                                      {/* Customizations */}
                                      {p.customizations.length > 0 && (
                                        <div style={{ marginTop: '0.75rem' }}>
                                          <em style={{ fontSize: '0.9rem', color: '#34495e' }}>Customizations items:</em>
                                          <div
                                            style={{
                                              marginTop: '0.25rem',
                                              display: 'flex',
                                              flexWrap: 'wrap',
                                              gap: '0.5rem',
                                            }}
                                          >
                                            {p.customizations.map((c, i) => (
                                              <span
                                                key={i}
                                                style={{
                                                  backgroundColor: '#e0f7fa',
                                                  padding: '0.25rem 0.5rem',
                                                  borderRadius: '12px',
                                                  fontSize: '0.85rem',
                                                  color: '#00796b',
                                                }}
                                              >
                                                {c}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </>

                              ),
                            })
                          }
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          View Details
                        </button>
                  </td>

                  <td className="border-b px-6 py-4">{order.trackingNumber || 'TRK000000'}</td>

                  <td className="border-b px-6 py-4">2025-06-22</td>

                  <td className="border-b px-6 py-4 space-x-2">


                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onClick={() => setIsEmailModalOpen(true)}
                    >
                      Send Email
                    </button>

                    <button
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold px-2 py-2 rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onClick={() => {
                        setConfimationModalCon({
                          'title': "Mark as Delivered",
                          'message': "Are you sure you want to mark this order as Delivered?",
                        })
                        setSelectedOrderId(order.id);
                        setShowConfirmModal(true);
                      }}
                    >
                      Mark as Delivered
                    </button>
                  </td>
                </>
              )}

            {activeTab === 'Delivered' && (
              <>
                <td className="border-b px-6 py-4">{order.id}</td>
                <td className="border-b px-6 py-4">{order.customerName}</td>
                <td className="border-b px-6 py-4">Diamond bracelet</td>
                <td className="border-b px-6 py-4">{order.date}</td>
                <td className="border-b px-6 py-4">{order.total}</td>
                <td className="border-b px-6 py-4">Delivered</td>
              </>
            )}
          </motion.tr>
          ))
          ) : (
          <motion.tr
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <td colSpan="7" className="text-center py-6 text-gray-500">
              No orders found in this category.
            </td>
          </motion.tr>
              )}

        </tbody>
      </table>
    </div>

      {/* Modal */ }
  {
    modalContent && (
      <OrderModal
        title={modalContent.title}
        onClose={() => setModalContent(null)}
      >
        {modalContent.content}
      </OrderModal>
    )
  }



  {/* Confimation model */ }
  {
    confimationModalCon && (
      <ConfirmationModal
        isOpen={showConfirmModal}
        title="Mark as Completed"
        message="Are you sure you want to mark this order as completed?"
        onCancel={() => setShowConfirmModal(false)}
        onConfirm={handleMarkAsCompleted}
      >
        {confimationModalCon.content}
      </ConfirmationModal>
    )
  }


    </div >
  );
};

export default Orders;
