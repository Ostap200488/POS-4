import React from "react";
import BottomNav from "../components/shared/BottomNav";
import Greetings from "../components/home/Greetings";
import MiniCard from "../components/home/MiniCard";
import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";
import RecentOrders from "../components/home/RecentOrders";
import PopularDishes from "../components/home/PopularDishes";

const Home = () => {
  return (
    <div className="bg-[#1f1f1f] min-h-screen">

      {/* MAIN CONTENT */}
      <section
        className="
          max-w-[1600px]
          mx-auto
          px-6 pt-6 pb-28
          grid grid-cols-1 xl:grid-cols-5
          gap-6
        "
      >
        {/* LEFT MAIN AREA */}
        <div className="xl:col-span-3 flex flex-col gap-6">

          {/* GREETINGS */}
          <div className="bg-[#1a1a1a] rounded-2xl p-6 shadow-lg shadow-black/30">
            <Greetings />
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MiniCard
              title="Total Earnings"
              icon={<BsCashCoin />}
              number={512}
              footerNum={1.6}
            />
            <MiniCard
              title="In Progress"
              icon={<GrInProgress />}
              number={16}
              footerNum={3.6}
            />
          </div>

          {/* RECENT ORDERS */}
          <div className="bg-[#1a1a1a] rounded-2xl p-4 shadow-lg shadow-black/30">
            <RecentOrders />
          </div>
        </div>

        {/* RIGHT SIDE PANEL */}
        <div className="xl:col-span-2 hidden xl:block">
          <div className="sticky top-24">
            <PopularDishes />
          </div>
        </div>
      </section>

      {/* BOTTOM NAV */}
      <BottomNav />
    </div>
  );
};

export default Home;
