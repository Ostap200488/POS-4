import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import MenuContainer from "../components/menu/MenuContainer";
import CustomerInfo from "../components/menu/CustomerInfo";
import CartInfo from "../components/menu/CartInfo";
import Bill from "../components/menu/Bill";

const Menu = () => {
  const customer = useSelector((state) => state.customer);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  /* ======================
     GUARD: TABLE REQUIRED
  ====================== */
  useEffect(() => {
    if (!customer.tableNo) {
      navigate("/tables", { replace: true });
    }
  }, [customer.tableNo, navigate]);

  return (
    <div className="bg-[#1f1f1f] min-h-screen pb-28">

      {/* MAIN WORKSPACE */}
      <section
        className="
          max-w-[1600px]
          mx-auto
          px-6 pt-6
          grid grid-cols-1 xl:grid-cols-5
          gap-6
        "
      >
        {/* LEFT — MENU */}
        <div className="xl:col-span-3 bg-[#1a1a1a] rounded-2xl p-5 flex flex-col">

          {/* MENU SEARCH */}
          <div className="flex items-center bg-[#141414] px-4 py-3 rounded-xl gap-3 mb-4 border border-[#2a2a2a]">
            <FaSearch className="text-[#6f6f6f]" size={14} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search menu..."
              className="bg-transparent outline-none text-[#f5f5f5] w-full"
            />
          </div>

          {/* MENU GRID */}
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <MenuContainer searchQuery={search} />
          </div>
        </div>

        {/* RIGHT — ORDER SUMMARY */}
        <div className="xl:col-span-2 bg-[#232323] rounded-2xl p-5 flex flex-col gap-4">

          {/* HEADER */}
          <div className="flex justify-between items-center">
            <BackButton />
            <div className="flex gap-3 items-center">
              <FaUserCircle className="text-white text-3xl" />
              <div>
                <h1 className="text-white font-semibold">
                  {customer.customerName || "Guest"}
                </h1>
                <p className="text-xs text-[#ababab]">
                  Table {customer.tableNo}
                </p>
              </div>
            </div>
          </div>

          {/* CUSTOMER INFO */}
          <CustomerInfo />

          {/* CART (SCROLLABLE) */}
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <CartInfo />
          </div>

          {/* BILL (STICKY FEEL) */}
          <div className="pt-2 border-t border-[#2a2a2a]">
            <Bill />
          </div>
        </div>
      </section>

      {/* BOTTOM NAV */}
      <BottomNav />
    </div>
  );
};

export default Menu;
