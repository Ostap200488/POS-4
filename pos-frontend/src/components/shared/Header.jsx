import React, { useState } from "react";
import { FaSearch, FaUserCircle, FaBell } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import logo from "../../assets/logo.png";
import { logout } from "../../https";
import { removeUser } from "../../redux/slices/userSlice";

const Header = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      dispatch(removeUser());
      navigate("/auth", { replace: true });
    },
  });

  return (
    <header
      className="
        sticky top-0 z-40
        h-20 max-h-20
        flex justify-between items-center
        px-8
        bg-[#1a1a1a]
        border-b border-[#2a2a2a]
      "
    >
      {/* LEFT: LOGO */}
      <div className="flex items-center gap-3">
        <img src={logo} className="h-8 w-8" alt="Five Guys Logo" />
        <h1 className="text-lg font-semibold text-[#f5f5f5] tracking-wide">
          Five Guys
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        {/* SEARCH */}
        <div
          className="
            flex items-center
            bg-[#262626]
            px-4 py-2
            rounded-lg gap-2
            border border-[#2f2f2f]
            focus-within:ring-2 focus-within:ring-[#f6b100]/60
            transition
          "
        >
          <FaSearch className="text-[#ababab] text-sm" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders..."
            className="
              bg-transparent outline-none
              text-[#f5f5f5] text-sm
              placeholder-[#9a9a9a]
              w-40
            "
          />
        </div>

        {/* NOTIFICATIONS */}
        <button
          aria-label="Notifications"
          className="relative text-[#f5f5f5] hover:text-[#f6b100] transition"
        >
          <FaBell className="text-xl" />
          {/* badge placeholder */}
          {/* <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" /> */}
        </button>

        {/* DASHBOARD */}
        <button
          aria-label="Dashboard"
          onClick={() => navigate("/dashboard")}
          className="text-[#f5f5f5] hover:text-[#f6b100] transition"
        >
          <MdDashboard className="text-xl" />
        </button>

        {/* USER */}
        <div className="flex items-center gap-3 pl-4 border-l border-[#2a2a2a]">
          <FaUserCircle className="text-[#f5f5f5] text-4xl" />

          <div className="leading-tight">
            <h2 className="text-sm text-[#f5f5f5] font-semibold">
              {userData?.name || "Guest"}
            </h2>
            <p className="text-xs text-[#ababab] capitalize">
              {userData?.role || "User"}
            </p>
          </div>

          <button
            aria-label="Logout"
            disabled={logoutMutation.isLoading}
            onClick={() => logoutMutation.mutate()}
            className="
              ml-1
              text-[#f5f5f5]
              hover:text-red-400
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            <IoLogOut size={22} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
