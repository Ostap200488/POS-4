import React from "react";
import { FaCheck, FaCircle, FaClock, FaTimes } from "react-icons/fa";

const STATUS_CONFIG = {
  Ready: {
    color: "text-green-400",
    dot: "text-green-400",
    icon: FaCheck,
  },
  Preparing: {
    color: "text-yellow-400",
    dot: "text-yellow-400",
    icon: FaClock,
  },
  Pending: {
    color: "text-blue-400",
    dot: "text-blue-400",
    icon: FaCircle,
  },
  Cancelled: {
    color: "text-red-400",
    dot: "text-red-400",
    icon: FaTimes,
  },
};

const TYPE_GRADIENT = {
  AM: "from-[#f6b100] to-[#d99a00]",
  PM: "from-[#4a8dff] to-[#3067d1]",
  DEL: "from-[#66cdaa] to-[#38a27f]",
};

const OrderCard = ({
  type = "AM",
  customer = "Ostap Demchuk",
  orderId = "#101",
  mode = "Dine In",
  status = "Ready",
  subStatus = "Ready to Serve",
  time = "January 18, 2025 • 08:32 PM",
  items = 8,
  total = 250,
  onClick = () => {},
}) => {
  const statusCfg = STATUS_CONFIG[status] || STATUS_CONFIG.Pending;
  const StatusIcon = statusCfg.icon;
  const typeColor = TYPE_GRADIENT[type] || TYPE_GRADIENT.AM;

  return (
    <div
      onClick={onClick}
      tabIndex={0}
      className="
        bg-[#262626]
        w-[430px]
        px-5 py-6
        rounded-xl
        border border-[#333333]
        shadow-md shadow-black/30
        hover:bg-[#2e2e2e]
        hover:shadow-black/40
        focus:outline-none
        focus:ring-2 focus:ring-[#f6b100]/60
        transition-all duration-200
        cursor-pointer
        flex flex-col
      "
    >
      {/* ORDER TYPE */}
      <div
        className={`bg-gradient-to-br ${typeColor}
                    text-black px-3 py-1 text-xs font-bold
                    rounded-md w-fit mb-3 shadow-sm`}
      >
        {type}
      </div>

      {/* CUSTOMER */}
      <h1 className="text-white text-base font-semibold leading-snug truncate">
        {customer}
      </h1>

      {/* META */}
      <p className="text-[#c9c9c9] text-xs mt-1">
        {orderId} • {mode}
      </p>

      {/* STATUS */}
      <div className="flex flex-col gap-1 mt-3">
        <p
          className={`font-semibold flex items-center text-xs ${statusCfg.color}`}
        >
          <StatusIcon className="mr-1 text-[11px]" />
          {status}
        </p>

        <p className="text-[#d6d6d6] text-[11px] flex items-center">
          <FaCircle className={`mr-1 text-[8px] ${statusCfg.dot}`} />
          {subStatus}
        </p>
      </div>

      {/* FOOTER */}
      <div className="pt-3 mt-4 border-t border-[#3a3a3a]">
        <p className="text-[#b6b6b6] text-[11px]">{time}</p>
        <p className="text-[#b6b6b6] text-[11px] mt-0.5">
          {items} Items
        </p>

        {/* TOTAL */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-[#cfcfcf] text-sm font-medium">
            Total
          </span>
          <span className="text-white text-base font-semibold">
            CAD ${Number(total).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
