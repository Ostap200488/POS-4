import React from "react";
import { FaCheck, FaCircle } from "react-icons/fa";

const STATUS_CONFIG = {
  ready: {
    label: "Ready",
    sub: "Ready to Serve",
    color: "text-green-400",
    dot: "text-green-400",
    accent: "bg-green-500",
    icon: FaCheck,
  },
  preparing: {
    label: "Preparing",
    sub: "In Kitchen",
    color: "text-yellow-400",
    dot: "text-yellow-400",
    accent: "bg-yellow-500",
    icon: FaCircle,
  },
};

const OrderList = ({
  orderType = "AM",
  customer = "Ostap Demchuk",
  items = 8,
  service = "Dine In",
  table = "Table 3",
  status = "ready",
  onClick,
}) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.ready;
  const StatusIcon = config.icon;

  return (
    <div
      onClick={onClick}
      tabIndex={0}
      className="
        flex items-center justify-between
        bg-[#262626]
        px-5 py-4
        rounded-2xl
        shadow-md shadow-black/30
        mb-4
        hover:bg-[#2d2d2d]
        focus:outline-none focus:ring-2 focus:ring-[#f6b100]
        transition-all duration-200
        relative
        cursor-pointer
      "
    >
      {/* STATUS ACCENT */}
      <div className={`absolute left-0 top-0 h-full w-1 rounded-l-2xl ${config.accent}`} />

      {/* ORDER TYPE */}
      <div
        className="
          bg-gradient-to-br
          from-[#f6b100]
          to-[#d99a00]
          text-black
          px-4 py-2
          text-sm
          font-extrabold
          rounded-xl
          shadow-sm
          tracking-wide
          min-w-[48px]
          text-center
        "
      >
        {orderType}
      </div>

      {/* CUSTOMER */}
      <div className="flex flex-col flex-1 ml-5">
        <h1 className="text-[#f5f5f5] text-base font-semibold truncate">
          {customer}
        </h1>
        <p className="text-[#c4c4c4] text-xs mt-1 tracking-wide">
          {items} Items • {service}
        </p>
      </div>

      {/* TABLE */}
      <div className="mx-4">
        <span
          className="
            text-[#f6b100]
            font-semibold
            border border-[#f6b100]/60
            rounded-xl
            px-4 py-1.5
            text-xs
            tracking-wide
          "
        >
          {table}
        </span>
      </div>

      {/* STATUS */}
      <div className="flex flex-col items-start gap-1 min-w-[140px]">
        <p className={`${config.color} font-semibold flex items-center text-sm`}>
          <StatusIcon className="mr-2 text-xs" />
          {config.label}
        </p>
        <p className="text-[#cfcfcf] text-xs flex items-center tracking-wide">
          <FaCircle className={`mr-2 ${config.dot}`} />
          {config.sub}
        </p>
      </div>
    </div>
  );
};

export default OrderList;
