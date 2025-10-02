import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Eye, Edit, Trash2, User, Package, Mail, Phone } from 'lucide-react';
import TrackingModal from '../../../components/admin/TrackingModal';

const AllOrdersTable = ({
    setModalContent,
    handleAccept,
    handleReadyToShipped,
    setIsEmailModalOpen,
    setConfimationModalCon,
    setSelectedOrderId,
    setShowConfirmModal,
    filteredOrders
}) => {
    const [trackingModalOrder, setTrackingModalOrder] = useState(null);

    const handleSaveTracking = (orderId, trackingData) => {
        console.log("Save tracking for:", orderId, trackingData);
        setTrackingModalOrder(null);
    };

    console.log(filteredOrders)

    const getStatusBadge = (status) => {
        const statusLower = status.toLowerCase();
        switch (statusLower) {
            case 'pendding':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        🔄 Pending
                    </span>
                );
            case 'processing':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        📦 Processing
                    </span>
                );
            case 'shipped':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        🚚 Shipped
                    </span>
                );
            case 'delivered':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ✅ Delivered
                    </span>
                );
            case 'cancelled':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        ❌ Cancelled
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        📋 {status}
                    </span>
                );
        }
    };

    const getActionButtons = (order, index) => {
        const statusLower = order.orderStatus.toLowerCase();

        switch (statusLower) {
            case 'pendding':
                return (
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
                                                    <strong>Address:</strong>{order.user.address.street}, {order.user.address.city}, {order.user.address.state} <span>province</span>
                                                    <p><strong>Phone:</strong>{order.user.address.phone}</p>
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
                            className="px-4 py-1 bg-blue-600 text-white text-xs rounded-lg shadow hover:bg-blue-700 transition"
                            title="See info"
                        >
                            See info
                        </button>




                    </div>
                );

            case 'processing':
                return (
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
                                                    <p><strong>Address:</strong> {order.user.address.street}, {order.user.address.city}, {order.user.address.state} </p>
                                                    <p><strong>Phone:</strong> {order.user.address.phone}</p>
                                                </div>
                                            </div>
                                            {order.products.map((p, i) => (
                                                <div key={i} className="border rounded p-3 mb-2 bg-gray-50 shadow-sm">
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
                );

            case 'shipped':
                return (
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
                                                    <p><strong>Address:</strong> {order.user.address.street}, {order.user.address.city}, {order.user.address.state} </p>
                                                    <p><strong>Phone:</strong>{order.user.address.phone}</p>
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



                        {/* <button
              className="inline-flex items-center px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-full transition-colors shadow-sm"
              onClick={() => {
                setConfimationModalCon({
                  title: "Mark as Delivered",
                  message: "Are you sure you want to mark this order as Delivered?",
                });
                setSelectedOrderId(order.id);
                setShowConfirmModal(true);
              }}
              title="Mark as Delivered"
            >
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Delivered
            </button> */}
                    </div>
                );

            case 'delivered':
                return (
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
                                                    <p><strong>Name:</strong> {order.user?.name || 'N/A'}</p>
                                                    <p><strong>Email:</strong> {order.user?.email || 'N/A'}</p>
                                                    <p><strong>Address:</strong> {order.user.address.street}, {order.user.address.city}, {order.user.address.state} </p>
                                                    <p><strong>Phone:</strong> {order.user.address.phone}</p>
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                                                {order.products ? order.products.map((p, i) => (
                                                    <div key={i} className="border rounded p-3 mb-2 bg-white shadow-sm">
                                                        <h4 className="font-semibold">{p.name}</h4>
                                                        <p className="text-gray-600">{p.price.toLocaleString()} LKR</p>
                                                    </div>
                                                )) : (
                                                    <div className="border rounded p-3 mb-2 bg-white shadow-sm">
                                                        <h4 className="font-semibold">Diamond bracelet</h4>
                                                        <p className="text-gray-600">Completed order</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ),
                                })
                            }
                            className="px-4 py-1 bg-blue-600 text-white text-xs rounded-lg shadow hover:bg-blue-700 transition"
                            title="See info"
                        >
                            See info
                        </button>

                        {/* <button 
              className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors" 
              title="Edit (Disabled)"
              disabled
            >
              <Edit className="w-4 h-4" />
            </button> */}


                    </div>
                );

            case 'cancelled':
                return (
                    <div className="flex items-center space-x-2">
                        <button
                            className="px-4 py-1 bg-blue-600 text-white text-xs rounded-lg shadow hover:bg-blue-700 transition"
                            title="See info"
                        >
                            See info
                        </button>
                        <button
                            className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors"
                            title="Edit (Disabled)"
                            disabled
                        >
                            <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                );

            default:
                return (
                    <div className="flex items-center space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors" title="View Details">
                            <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors" title="Edit">
                            <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                );
        }
    };

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
                                <div className="text-sm font-medium text-gray-900">{order.user?.name || order.customerName || 'N/A'}</div>
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
                            {order.products
                                ? order.products.map(p => p.name).join(', ').substring(0, 50) + '...'
                                : 'Diamond bracelet'
                            }
                        </div>
                    </td>

                    <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900">
                            {order.amount || order.total}
                        </div>
                        <div className="text-xs text-gray-500">PayHere</div>
                    </td>

                    <td className="px-6 py-4">
                        {getStatusBadge(order.orderStatus)}
                    </td>

                    <td className="px-6 py-4">
                        {getActionButtons(order, index)}
                    </td>
                </motion.tr>
            ))}

            {/* Tracking Modal */}
            {trackingModalOrder && (
                <TrackingModal
                    order={trackingModalOrder}
                    onClose={() => setTrackingModalOrder(null)}
                    onSave={handleSaveTracking}
                />
            )}
        </>
    );
};

export default AllOrdersTable;