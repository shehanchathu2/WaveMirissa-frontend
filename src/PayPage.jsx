import React, { useState } from "react";
import Payhere from "payhere-embed-sdk/dist/react";
import "payhere-embed-sdk/dist/react.css";

const PayPage = () => {
  const [showPayhere, setShowPayhere] = useState(false);

  return (
    <div>
      <button onClick={() => setShowPayhere(true)}>Pay with PayHere</button>

      <Payhere
        selector="#payhere-modal"
        embedURL="https://app.payhere.co/your-merchant-slug/your-plan-id"
        open={showPayhere}
        amountInCents={1000} // Optional: pass dynamic amount
        customerName="John Doe"
        customerEmail="john@doe.com"
        disableCustomer="yes"
        hideAmount="yes"
        onSuccess={(data) => {
          console.log("Success:", data);
        }}
        onFailure={(err) => {
          console.log("Failed:", err);
        }}
        onClose={() => {
          setShowPayhere(false);
        }}
      />
    </div>
  );
};

export default PayPage;
