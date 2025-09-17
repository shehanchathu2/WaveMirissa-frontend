import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderModal from "./OrderModel"; // wrapper modal

const TrackingModal = ({ order, onClose, onSave }) => {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [estimateDate, setEstimateDate] = useState("");

    const loginUser = JSON.parse(localStorage.getItem("user"));
    const token = loginUser.jwt;

    console.log(order)

    useEffect(() => {
        if (order) {
            setTrackingNumber(order.trackingNumber || "");
            setEstimateDate(order.estimateDate || "");
        }
    }, [order]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(
                `http://localhost:8080/api/admin/orders/${order.id}/tracking`,
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

            alert("Tracking details saved successfully!");
            if (onSave) onSave();
            onClose();
        } catch (error) {
            console.error("Error saving tracking details:", error);
            alert("Failed to save tracking details.");
        }
    };

    if (!order) return null;

    return (
        <OrderModal title={`Tracking Details for Order ${order.orderId}`} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Tracking Number</label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Estimated Delivery</label>
                    <input
                        type="date"
                        className="w-full border rounded px-3 py-2"
                        value={estimateDate}
                        onChange={(e) => setEstimateDate(e.target.value)}
                        required
                    />
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
            </form>
        </OrderModal>
    );
};

export default TrackingModal;
