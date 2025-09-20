import React, { useEffect, useState } from 'react';
import OrderModal from '../../components/admin/OrderModel';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import SendEmailModal from '../../components/admin/SendEmailModel';
import axios from 'axios';
import WaveMirissaLoader from '../../components/WaveMirissaLoader';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from "framer-motion";
import PendingOrdersTable from './ordertables/PendingOrdersTable';
import ProcessingOrdersTable from './ordertables/ProcessingOrdersTable';
import ShippedOrdersTable from './ordertables/ShippedOrdersTable';
import DeliveredOrdersTable from './ordertables/DeliveredOrdersTable';
import { Search, Filter, Download, Eye, Edit, Trash2, User, Package, CreditCard, Phone, Mail } from 'lucide-react';
import AllOrdersTable from './ordertables/AllOrdersTable';
import OrderConfirmationModal from '../../components/admin/OrderConfirmationModal';

const Orders = () => {
  const [modalContent, setModalContent] = useState(null);
  const [confimationModalCon, setConfimationModalCon] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("Are you sure you want to update this order status?");

  const [showOrderConfirmModal, setShowOrderConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const confirmAccept = (orderId) => {
    setConfirmAction(() => () => handleAccept(orderId));
    setShowOrderConfirmModal(true);
    setMessage("Are you sure you want to accept this order and move it to Processing?");
  };

  const confirmReadyToShipped = (orderId) => {
    setConfirmAction(() => () => handleReadyToShipped(orderId));
    setShowOrderConfirmModal(true);
    setMessage("Are you sure you want to mark this order as Ready to Shipped?");
  };

  const confirmMarkAsDelivered = (orderId) => {
    setConfirmAction(() => () => markAsDelivered(orderId));
    setShowOrderConfirmModal(true);
    setMessage("Are you sure you want to mark this order as Delivered?");
  };

  const statusTabs = [
    { key: 'All', label: 'All', count: count, color: 'bg-blue-600' },
    { key: 'Pendding', label: 'Pendding', color: 'bg-gray-200' },
    { key: 'Processing', label: 'Processing', color: 'bg-gray-200' },
    { key: 'Shipped', label: 'Shipped', color: 'bg-gray-200' },
    { key: 'Delivered', label: 'Delivered', color: 'bg-gray-200' },
  ];

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleMarkAsCompleted = () => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === selectedOrderId ? { ...order, status: 'Shipped' } : order
      )
    );
    setShowConfirmModal(false);
  };

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
      console.log(res.data);
      setCount(res.data.length);
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
  }, [activeTab]);

  const handleAccept = async (orderId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/admin/orders/${orderId}/status?status=PROCESSING`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const updatedOrder = response.data;
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
      toast.success("Order status updated to Processing!");
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
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const updatedOrder = response.data;
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
      toast.success("Order status updated to Shipped!");
      await getPaidOrders();
    } catch (err) {
      console.error("Error updating order status:", err);
      toast.error("Failed to update order status.");
    }
  };


  const markAsDelivered = async (orderId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/admin/orders/${orderId}/status?status=DELIVERED`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const updatedOrder = response.data;
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
      toast.success("Order status updated to Delivered!");
      await getPaidOrders();
    } catch (err) {
      console.error("Error updating order status:", err);
      toast.error("Failed to update order status.");
    }
  };

  if (loading) return <WaveMirissaLoader />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600 mt-1">Manage and track all customer orders</p>
        </div>

       
      </div>

      {/* Search and Filter
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search orders by order number, customer name, or email..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button className="ml-4 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg font-medium flex items-center space-x-2 hover:bg-gray-50 transition-colors">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div> */}

      {/* Status Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-2 rounded-lg w-min overflow-x-auto">
        {statusTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center space-x-2 transition-colors ${activeTab === tab.key
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
          >
            <span>{tab.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${activeTab === tab.key
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600'
              }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Num
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Detail
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total(Rs.)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              <AnimatePresence>

                {activeTab === "All" && (
                  <AllOrdersTable
                    setModalContent={setModalContent}
                    handleAccept={handleAccept}
                    handleReadyToShipped={handleReadyToShipped}
                    setIsEmailModalOpen={setIsEmailModalOpen}
                    setConfimationModalCon={setConfimationModalCon}
                    setSelectedOrderId={setSelectedOrderId}
                    setShowConfirmModal={setShowConfirmModal}
                    filteredOrders={orders}
                  />
                )}
                {activeTab === "Pendding" && (
                  <PendingOrdersTable
                    setModalContent={setModalContent}
                    handleAccept={confirmAccept}
                  />
                )}
                {activeTab === "Processing" && (
                  <ProcessingOrdersTable
                    filteredOrders={filteredOrders}
                    setModalContent={setModalContent}
                    handleReadyToShipped={confirmReadyToShipped}
                  />

                )}
                {activeTab === "Shipped" && (
                  <ShippedOrdersTable
                    setModalContent={setModalContent}
                    setConfimationModalCon={setConfimationModalCon}
                    setShowConfirmModal={setShowConfirmModal}
                    markAsDelivered={confirmMarkAsDelivered}
                  />
                )}
                {activeTab === "Delivered" && (
                  <DeliveredOrdersTable
                    filteredOrders={filteredOrders}
                    setModalContent={setModalContent}
                  />
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {modalContent && (
        <OrderModal
          title={modalContent.title}
          onClose={() => setModalContent(null)}
        >
          {modalContent.content}
        </OrderModal>
      )}

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

      {isEmailModalOpen && (
        <SendEmailModal
          isOpen={isEmailModalOpen}
          onClose={() => setIsEmailModalOpen(false)}
        />
      )}

      <OrderConfirmationModal
        isOpen={showOrderConfirmModal}
        onClose={() => setShowOrderConfirmModal(false)}
        onConfirm={() => {
          if (confirmAction) confirmAction();
          setShowOrderConfirmModal(false);
        }}
        title="Confirm Order Action"
        message={message}
        confirmText="Yes, Confirm"
        cancelText="Cancel"
        type="warning"
      />
    </div>
  );
};

export default Orders;