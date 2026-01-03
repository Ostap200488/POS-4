import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import OrderList from "./OrderList";

const MOCK_ORDERS = [1, 2, 3, 4, 5, 6];

const RecentOrders = () => {
  const [search, setSearch] = useState("");

  const filteredOrders = MOCK_ORDERS.filter(() =>
    true // placeholder for real filtering logic
  );

  return (
    <div className="px-8 mt-6">
      <div
        className="
          bg-[#1d1d1d]
          w-full
          h-[480px]
          rounded-2xl
          px-6
          py-5
          shadow-xl
          shadow-black/40
          flex
          flex-col
          border border-[#2a2a2a]
        "
      >
        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-white text-xl font-semibold tracking-wide">
              Recent Orders
            </h1>
            <p className="text-xs text-[#9b9b9b] mt-1">
              Latest customer activity
            </p>
          </div>

          <button
            type="button"
            className="
              text-[#4a8dff]
              text-sm
              font-medium
              hover:text-[#76a9ff]
              focus:outline-none
              focus:ring-2 focus:ring-[#4a8dff]/40
              rounded
              transition-colors
            "
          >
            View All
          </button>
        </div>

        {/* ================= SEARCH ================= */}
        <div
          className="
            flex
            items-center
            gap-3
            bg-[#262626]
            rounded-xl
            px-4
            py-3
            mb-4
            shadow-md
            shadow-black/20
            border border-[#2f2f2f]
            focus-within:ring-2 focus-within:ring-[#f6b100]
            transition-all
          "
        >
          <FaSearch className="text-[#cdcdcd] text-sm shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search recent orders..."
            className="
              bg-transparent
              outline-none
              text-[#f0f0f0]
              text-sm
              w-full
              placeholder-[#9e9e9e]
            "
          />
        </div>

        {/* ================= LIST ================= */}
        <div
          className="
            flex-1
            overflow-y-auto
            no-scrollbar
            space-y-3
            pr-2
          "
        >
          {filteredOrders.length > 0 ? (
            filteredOrders.map((_, i) => <OrderList key={i} />)
          ) : (
            <div className="text-center text-[#777] text-sm mt-10">
              No orders found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
