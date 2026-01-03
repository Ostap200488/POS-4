import React from "react";

/* =========================
   TOP BUSINESS METRICS
========================= */
const metricsData = [
  {
    title: "Total Revenue",
    value: "$12,450",
    isIncrease: true,
    percentage: "+12.4%",
  },
  {
    title: "Orders",
    value: "1,248",
    isIncrease: true,
    percentage: "+8.1%",
  },
  {
    title: "Customers",
    value: "860",
    isIncrease: false,
    percentage: "-3.2%",
  },
  {
    title: "Avg. Order",
    value: "$18.40",
    isIncrease: true,
    percentage: "+2.6%",
  },
];

/* =========================
   POS ITEM METRICS (COMPACT)
========================= */
const itemsData = [
  {
    title: "Best Seller",
    name: "Cheeseburger",
    value: "342 sold",
    trend: "+18%",
    isIncrease: true,
  },
  {
    title: "Least Sold",
    name: "Veggie Wrap",
    value: "27 sold",
    trend: "-6%",
    isIncrease: false,
  },
  {
    title: "Top Category",
    name: "Burgers",
    value: "1,024 items",
    trend: "+9%",
    isIncrease: true,
  },
  {
    title: "Avg Prep Time",
    name: "Kitchen",
    value: "6.4 min",
    trend: "-1.2%",
    isIncrease: true,
  },
];

const Metrics = () => {
  return (
    <div className="container mx-auto py-2 px-6 md:px-4">

      {/* ================= HEADER (TOP) ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-[#f5f5f5] text-xl">
            Overall Performance
          </h2>
          <p className="text-sm text-[#ababab]">
            Overview of business performance for the selected period
          </p>
        </div>

        <button className="flex items-center gap-1 px-4 py-2 rounded-md text-[#f5f5f5] bg-[#1a1a1a]">
          Last 1 Month
          <svg
            className="w-3 h-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* ================= TOP METRIC CARDS ================= */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricsData.map((metric, index) => (
          <div
            key={index}
            className="bg-[#1a1a1a] rounded-lg p-4 shadow-sm"
          >
            <div className="flex justify-between items-center">
              <p className="font-medium text-xs text-[#ababab]">
                {metric.title}
              </p>
              <span
                className={`text-xs font-semibold ${
                  metric.isIncrease ? "text-green-400" : "text-red-400"
                }`}
              >
                {metric.percentage}
              </span>
            </div>

            <h3 className="mt-2 text-xl font-bold text-[#f5f5f5]">
              {metric.value}
            </h3>
          </div>
        ))}
      </div>

      {/* ================= DUPLICATE HEADER (BOTTOM) ================= */}
      <div className="mt-10">
        <h2 className="font-semibold text-[#f5f5f5] text-xl">
          Item Details
        </h2>
        <p className="text-sm text-[#ababab]">
          Performance insights for menu items and kitchen operations
        </p>
      </div>

      {/* ================= ITEM METRICS (SMALLER) ================= */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {itemsData.map((item, index) => (
          <div
            key={index}
            className="bg-[#1a1a1a] rounded-md p-3 shadow-sm"
          >
            <div className="flex justify-between items-center">
              <p className="text-[11px] text-[#ababab] font-medium">
                {item.title}
              </p>
              <span
                className={`text-[11px] font-semibold ${
                  item.isIncrease ? "text-green-400" : "text-red-400"
                }`}
              >
                {item.trend}
              </span>
            </div>

            <h3 className="mt-1 text-sm font-semibold text-[#f5f5f5]">
              {item.name}
            </h3>

            <p className="text-[12px] text-[#ababab]">
              {item.value}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Metrics;
