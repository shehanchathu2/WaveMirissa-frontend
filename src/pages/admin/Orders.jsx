import React, { useEffect, useState } from 'react';
import OrderModal from '../../components/admin/OrderModel';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import SendEmailModal from '../../components/admin/SendEmailModel';
import axios from 'axios';
import WaveMirissaLoader from '../../components/WaveMirissaLoader';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from "framer-motion"; // ✅ add import
import PendingOrdersTable from './ordertables/PendingOrdersTable';
import ProcessingOrdersTable from './ordertables/ProcessingOrdersTable';
import ShippedOrdersTable from './ordertables/ShippedOrdersTable';
import DeliveredOrdersTable from './ordertables/DeliveredOrdersTable';

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

          <tbody>
            {activeTab === "Pendding" && (
              <PendingOrdersTable
                setModalContent={setModalContent}
                handleAccept={handleAccept}
              />
            )}
            {activeTab === "Processing" && (
              <ProcessingOrdersTable
                filteredOrders={filteredOrders}
                setModalContent={setModalContent}
                handleReadyToShipped={handleReadyToShipped}
              />
            )}
            {activeTab === "Shipped" && (
              <ShippedOrdersTable
                setModalContent={setModalContent}
                setIsEmailModalOpen={setIsEmailModalOpen}
                setConfimationModalCon={setConfimationModalCon}
                setSelectedOrderId={setSelectedOrderId}
                setShowConfirmModal={setShowConfirmModal}
              />
            )}
            {activeTab === "Delivered" && (
              <DeliveredOrdersTable filteredOrders={filteredOrders} />
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
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



      {/* Confimation model */}
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
