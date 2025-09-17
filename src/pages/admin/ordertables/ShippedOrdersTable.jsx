import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import WaveMirissaLoader from "../../../components/WaveMirissaLoader";
import axios from "axios";
import TrackingModal from "../../../components/admin/TrackingModal";

const ShippedOrdersTable = ({ setModalContent, setIsEmailModalOpen, setConfimationModalCon, setSelectedOrderId, setShowConfirmModal }) => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('shipped');
    const [trackingModalOrder, setTrackingModalOrder] = useState(null);

    const handleSaveTracking = (orderId, trackingData) => {
        console.log("Save tracking for:", orderId, trackingData);
        // TODO: API call or state update here
        setTrackingModalOrder(null); // close modal after save
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

    if (loading) return <WaveMirissaLoader />;

    return (
        <>
            {filteredOrders.map((order,index) => (
                <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-orange-50 hover:bg-gray-50 transition"
                >
                    <td className="border-b px-6 py-4">{index + 1}</td>
                    <td className="border-b px-6 py-4">
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                            onClick={() =>
                                setModalContent({
                                    title: "Customer Detail",
                                    content: (
                                        <div className="p-4 border rounded bg-gray-50 shadow">
                                            <h2 className="font-bold mb-2">Customer Info</h2>
                                            <p><strong>Name:</strong> {order.user.name}</p>
                                            <p><strong>Email:</strong> {order.user.email}</p>
                                            <p><strong>Address:</strong> 123 Main Street, Colombo</p>
                                            <p><strong>Phone:</strong> +94 77 123 4567</p>
                                        </div>
                                    ),
                                })
                            }
                        >
                            See Info
                        </button>
                    </td>

                    <td className="border-b px-6 py-4 ">
                        <button
                            onClick={() =>
                                setModalContent({
                                    title: "Order Detail",
                                    content: (
                                        <>
                                            {order.products.map((p, i) => (
                                                <div key={i} className="border rounded p-3 mb-2 bg-gray-50 shadow ">
                                                    <h3 className="font-semibold">{p.name}</h3>
                                                    <p>{p.price.toLocaleString()} LKR</p>
                                                    {p.customizations.length > 0 && (
                                                        <div className="mt-2">
                                                            <span className="font-medium">Customizations:</span>
                                                            <div className="flex gap-2 flex-wrap mt-1">
                                                                {p.customizations.map((c, j) => (
                                                                    <span
                                                                        key={j}
                                                                        className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-sm"
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
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                        >
                            View Details
                        </button>
                    </td>




                    <td className="border-b px-6 py-4">
                        <button
                            onClick={() => setTrackingModalOrder(order)}
                            className="text-blue-600 hover:underline"
                        >
                            Add Tracking Number
                        </button>
                    </td>



                    <td className="border-b px-6 py-4">2025-06-22</td>
                    <td className="border-b px-6 py-4 space-x-2">
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                            onClick={() => setIsEmailModalOpen(true)}
                        >
                            Send Email
                        </button>
                        <button
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                            onClick={() => {
                                setConfimationModalCon({
                                    title: "Mark as Delivered",
                                    message: "Are you sure you want to mark this order as Delivered?",
                                });
                                setSelectedOrderId(order.id);
                                setShowConfirmModal(true);
                            }}
                        >
                            Mark as Delivered
                        </button>
                    </td>
                    {/* Tracking Modal */}
                    {trackingModalOrder && (
                        <TrackingModal
                            order={trackingModalOrder}
                            onClose={() => setTrackingModalOrder(null)}
                            onSave={handleSaveTracking}
                        />
                    )}
                </motion.tr>
            ))}
        </>
    );
};

export default ShippedOrdersTable;
