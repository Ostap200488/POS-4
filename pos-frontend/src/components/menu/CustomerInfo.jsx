import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAvatarName, formatDate } from "../../utils";

const CustomerInfo = () => {
  const customerData = useSelector((state) => state.customer);
  const [dateTime, setDateTime] = useState(new Date());

  // Optional: keep date fresh (minute precision, low cost)
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const customerName = customerData.customerName || "Guest";
  const orderId = customerData.orderId || "N/A";

  return (
    <div className="flex items-center justify-between px-4 py-3">
      {/* LEFT */}
      <div className="flex flex-col items-start">
        <h1 className="text-md text-[#f5f5f5] font-semibold tracking-wide">
          {customerName}
        </h1>

        <p className="text-xs text-[#ababab] font-medium mt-1">
          Order {orderId} • Dine In
        </p>

        <p className="text-xs text-[#9a9a9a] font-medium mt-2">
          {formatDate(dateTime)}
        </p>
      </div>

      {/* AVATAR */}
      <button
        className="
          bg-[#f6b100]
          p-3
          text-lg
          font-bold
          rounded-lg
          text-black
          shadow-md
          hover:brightness-95
          transition
        "
        aria-label={`Customer avatar for ${customerName}`}
        title={customerName}
      >
        {getAvatarName(customerName)}
      </button>
    </div>
  );
};

export default CustomerInfo;
