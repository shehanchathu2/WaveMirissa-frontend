import React, { useEffect, useState } from 'react';
import OrderModal from '../../components/admin/OrderModel';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import SendEmailModal from '../../components/admin/SendEmailModel';
import axios from 'axios';

const Orders = () => {
  const [modalContent, setModalContent] = useState(null);
  const [confimationModalCon, setConfimationModalCon] = useState(null);
  const [activeTab, setActiveTab] = useState('Pending');
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
    {
      id: 4,
      customerName: 'hansi',
      status: 'Processing',
      trackingNumber: 'TRK789101',
      date: '2025-06-08',
      total: '$49.99',
    },
  ]);

  const statusTabs = ['Pending', 'Processing', 'Shipped', 'Delivered'];

  const filteredOrders = orders.filter((order) => order.status === activeTab);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const Data = {
    name: 'shehan chathu',
    email: 'shehan@gmail.com',
    id: '2222222222222222',
    details: ' Ring,Gold Bracelet',
  };


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
  console.log(token)
  const newRole = loginUser.role;

  const getPaidOrders = async () => {
    // setLoading(true);
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
      // setLoading(false);
    }
  };

  useEffect(() => {
    getPaidOrders();
  }, []);










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
              {activeTab === 'Pending' && (
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
                  <th className="px-6 py-3 text-left">Estimation Date</th>
                  <th className="px-6 py-3 text-left">Total</th>
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
              filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition">
                  {activeTab === 'Pending' && (
                    <>
                      <td className="border-b px-6 py-4">{order.id}</td>
                      <td className="border-b px-6 py-4">
                        <button
                          onClick={() =>
                            setModalContent({
                              title: 'Customer Detail',
                              content: (
                                <>
                                  <p><strong>Name:</strong> {order.customerName}</p>
                                  <p><strong>Email:</strong> shehan@email.com</p>
                                  <p><strong>Address:</strong> 123 Main Street, Colombo</p>
                                  <p><strong>Phone:</strong> +94 77 123 4567</p>
                                </>
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
                                  <p><strong>Item:</strong> Gold ring</p>
                                  <p><strong>Size:</strong> 7</p>
                                  <p><strong>Material:</strong> 24K</p>
                                  <p><strong>Engraving:</strong> "Forever Yours"</p>
                                </>
                              ),
                            })
                          }
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          View Details
                        </button>
                      </td>


                      <td className="border-b px-6 py-4">{order.total}</td>
                      <td className="border-b px-6 py-4">{order.date}</td>
                      <td className="border-b px-6 py-4 space-x-2">
                        <button className="bg-green-500 text-white px-3 py-1 rounded">
                          Accept
                        </button>
                        <button className="bg-red-500 text-white px-3 py-1 rounded">
                          Reject
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
                                <>
                                  <p><strong>Name:</strong> {order.customerName}</p>
                                  <p><strong>Email:</strong> shehan@email.com</p>
                                  <p><strong>Address:</strong> 123 Main Street, Colombo</p>
                                  <p><strong>Phone:</strong> +94 77 123 4567</p>
                                </>
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
                                  <p><strong>Item:</strong> Gold ring</p>
                                  <p><strong>Size:</strong> 7</p>
                                  <p><strong>Material:</strong> 24K</p>
                                  <p><strong>Engraving:</strong> "Forever Yours"</p>
                                </>
                              ),
                            })
                          }
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          View Details
                        </button>
                      </td>
                      <td className="border-b px-6 py-4">
                        {new Date(new Date(order.date).getTime() + 14 * 24 * 60 * 60 * 1000)
                          .toISOString()
                          .split('T')[0]}
                      </td>
                      <td className="border-b px-6 py-4">
                        {order.total}
                      </td>
                      <td className="border-b px-6 py-4">
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          onClick={() => {
                            setConfimationModalCon({
                              'title': "Mark as Completed",
                              'message': "Are you sure you want to mark this order as completed?",
                            })
                            setSelectedOrderId(order.id);
                            setShowConfirmModal(true);
                          }}
                        >
                          Mark as Completed
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
                                <>
                                  <p><strong>Name:</strong> {order.customerName}</p>
                                  <p><strong>Email:</strong> shehan@email.com</p>
                                  <p><strong>Address:</strong> 123 Main Street, Colombo</p>
                                  <p><strong>Phone:</strong> +94 77 123 4567</p>
                                </>
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
                                  <p><strong>Item:</strong> Gold ring</p>
                                  <p><strong>Size:</strong> 7</p>
                                  <p><strong>Material:</strong> 24K</p>
                                  <p><strong>Engraving:</strong> "Forever Yours"</p>
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No orders found in this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalContent && (
        <OrderModal
          title={modalContent.title}
          onClose={() => setModalContent(null)}
        >
          {modalContent.content}
        </OrderModal>
      )}



      {/* Confimation model */}
      {confimationModalCon && (
        <ConfirmationModal
          isOpen={showConfirmModal}
          title="Mark as Completed"
          message="Are you sure you want to mark this order as completed?"
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={handleMarkAsCompleted}
        >
          {confimationModalCon.content}
        </ConfirmationModal>
      )}

      <SendEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        data={Data}
      />
    </div>
  );
};

export default Orders;
