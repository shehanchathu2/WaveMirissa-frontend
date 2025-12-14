import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderModal from "./OrderModel"; // wrapper modal
import { toast } from "react-toastify";

const TrackingModal = ({ order, onClose, onSave }) => {
    const [trackingNumber, setTrackingNumber] = useState(order?.trackingNumber || "");
    const [estimateDate, setEstimateDate] = useState(order?.estimateDate || "");


    const loginUser = JSON.parse(localStorage.getItem("user"));
    const token = loginUser.jwt;

    console.log(order)
    console.log("Tracking Number from props:", order?.trackingNumber);

    useEffect(() => {
        if (order) {
            setTrackingNumber(order.trackingNumber || "");
            setEstimateDate(order.estimateDate || "");
            console.log(trackingNumber, estimateDate);
        }
    }, [order]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${order.id}/tracking`,
                {
                    trackingNumber,
                    estimateDate,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            toast.success("Tracking details saved successfully!");
            if (onSave) onSave();
            onClose();
        } catch (error) {
            console.error("Error saving tracking details:", error);
            toast.error("Failed to save tracking details.");
        }
    };

    if (!order) return null;

    console.log(trackingNumber, estimateDate);

    return (
        <>


            <OrderModal title={`Tracking Details for Order ${order.orderId}`} onClose={onClose}>
                {trackingNumber && estimateDate && (
                    <div className="p-4 bg-gray-50 rounded-lg mb-6">
                        <h3 className="font-semibold text-gray-800 mb-2">Current Tracking Information</h3>
                        <div className="space-y-1 text-sm text-gray-700">
                            <p><span className="font-medium">Tracking Number:</span> {trackingNumber}</p>
                            <p><span className="font-medium">Estimated Delivery:</span> {new Date(estimateDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tracking Number</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={trackingNumber}
                            onChange={(e) => setTrackingNumber(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Delivery</label>
                        <input
                            type="date"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={estimateDate}
                            onChange={(e) => setEstimateDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-sm"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </OrderModal>

        </>
    );
};

export default TrackingModal;
