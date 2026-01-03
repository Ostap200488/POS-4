import React, { useState } from "react";
import BottomNav from "../components/shared/BottomNav";
import OrderCard from "../components/orders/OrderCard";
import BackButton from "../components/shared/BackButton";

const FILTERS = ["All", "In Progress", "Ready", "Complete"];

const Orders = () => {
  const [status, setStatus] = useState("All");

  return (
    <div className="bg-[#1f1f1f] min-h-screen pb-28">

      {/* HEADER */}
      <div className="sticky top-0 z-10 bg-[#1f1f1f] border-b border-[#2a2a2a]">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center gap-4">
          <BackButton />
          <h1 className="text-white text-2xl font-semibold">Orders</h1>

          <div className="ml-auto flex gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setStatus(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition
                  ${
                    status === filter
                      ? "bg-[#4a8dff] text-white"
                      : "text-[#ababab] hover:bg-[#2a2a2a] hover:text-white"
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Orders;
