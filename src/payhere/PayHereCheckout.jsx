
import React from "react";
import { useNavigate } from "react-router-dom";

export default function PayHereCheckout() {
  const navigate = useNavigate();

  const payNow = () => {
    const payment = {
      sandbox: true,
      merchant_id: "1211149", // Sandbox only
      return_url: `${import.meta.env.VITE_PAYHERE_RETURN_URL}`,
      cancel_url: `${import.meta.env.VITE_PAYHERE_CANCEL_URL}`,
      notify_url: `${import.meta.env.VITE_BACKEND_URL}/api/payments/notify`,
      order_id: "ORDER123",
      items: "Gold Necklace",
      amount: "1000.00",
      currency: "LKR",
      first_name: "Jane",
      last_name: "Doe",
      email: "jane@doe.com",
      phone: "0712345678",
      address: "123 Galle Road",
      city: "Colombo",
      country: "Sri Lanka",
    };

    window.payhere.startPayment(payment);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Pay with PayHere</h2>
      <button
        onClick={payNow}
        className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700"
      >
        Pay Now
      </button>
    </div>
  );
}


