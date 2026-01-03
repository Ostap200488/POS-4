import React from "react";

const MiniCard = ({ title, icon, number, footerNum }) => {
  const isEarnings = title === "Total Earnings";
  const isPositive = footerNum >= 0;

  return (
    <div
      className="bg-[#1a1a1a] rounded-xl p-5 flex flex-col gap-4
                 shadow-md shadow-black/30
                 hover:shadow-lg hover:-translate-y-[1px]
                 transition-all duration-200"
    >
      {/* TOP */}
      <div className="flex justify-between items-center">
        <h1 className="text-[#ababab] text-xs font-semibold tracking-wider uppercase">
          {title}
        </h1>

        <div
          className={`p-3 rounded-lg text-2xl
            ${
              isEarnings
                ? "bg-green-500/20 text-green-400"
                : "bg-yellow-500/20 text-yellow-400"
            }`}
        >
          {icon}
        </div>
      </div>

      {/* VALUE */}
      <h2 className="text-[#f5f5f5] text-3xl font-bold leading-tight">
        {isEarnings ? `CAD ${number}` : number}
      </h2>

      {/* FOOTER */}
      <p className="text-xs text-[#9a9a9a]">
        <span
          className={`font-semibold mr-1 ${
            isPositive ? "text-green-400" : "text-red-400"
          }`}
        >
          {isPositive ? "▲" : "▼"} {Math.abs(footerNum)}%
        </span>
        compared to yesterday
      </p>
    </div>
  );
};

export default MiniCard;
