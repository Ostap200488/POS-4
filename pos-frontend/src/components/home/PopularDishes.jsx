import React from "react";
import { POPULAR_DISHES } from "../../constants/PopularDishes";

const PopularDishes = () => {
  return (
    <div className="mt-6 pr-6">
      <div
        className="
          bg-[#1a1a1a]
          rounded-2xl
          shadow-xl shadow-black/40
          p-8
          w-[450px]
          xl:w-[500px]
          2xl:w-[560px]
          h-[850px]
          flex flex-col
        "
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-white text-3xl font-semibold tracking-wide">
              Popular Dishes
            </h1>
            <p className="text-[#9b9b9b] text-sm mt-1">
              Most ordered items today
            </p>
          </div>

          <button
            className="text-[#4a8dff] text-sm font-semibold hover:underline
                       focus:outline-none focus:ring-2 focus:ring-[#4a8dff]/50 rounded"
          >
            View All
          </button>
        </div>

        {/* LIST */}
        <div
          className="
            flex-1
            overflow-y-scroll
            no-scrollbar
            grid
            grid-cols-1
            gap-6
            pr-2
          "
        >
          {POPULAR_DISHES.map((dish, index) => (
            <div
              key={dish.id}
              tabIndex={0}
              className="
                bg-[#232323]
                rounded-2xl
                px-6 py-5
                shadow-md shadow-black/30
                hover:bg-[#2d2d2d]
                focus:outline-none focus:ring-2 focus:ring-[#f6b100]
                transition-all duration-200
                flex items-center justify-between
                cursor-pointer
              "
            >
              {/* LEFT */}
              <div className="flex items-start gap-4">
                {/* RANK */}
                <div className="text-[#f6b100] font-bold text-lg w-6">
                  {index + 1}
                </div>

                <div>
                  <h2 className="text-white text-xl font-semibold leading-tight">
                    {dish.name}
                  </h2>
                  <span className="text-[#9b9b9b] text-sm mt-1 block">
                    {dish.category}
                  </span>

                  {index < 3 && (
                    <span className="inline-block mt-2 text-[11px]
                                     text-red-400 bg-red-500/10
                                     px-2 py-0.5 rounded-full">
                      🔥 Hot item
                    </span>
                  )}
                </div>
              </div>

              {/* PRICE */}
              <p className="text-white font-bold text-2xl">
                ${Number(dish.price).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularDishes;
