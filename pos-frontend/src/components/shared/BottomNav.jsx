import React, { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { IoMdReorder } from "react-icons/io";
import { MdOutlineTableRestaurant } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import { BiSolidDish } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCustomer } from "../../redux/slices/customerSlice";
import Modal from "./Modal";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestCount, setGuestCount] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  /* ======================
     HELPERS
  ====================== */
  const isActive = (path) => location.pathname === path;

  const resetModal = () => {
    setGuestCount(1);
    setName("");
    setPhone("");
    setSubmitting(false);
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    resetModal();
  };

  const increment = () => setGuestCount((p) => p + 1);
  const decrement = () => setGuestCount((p) => (p > 1 ? p - 1 : 1));

  /* ======================
     CREATE ORDER
  ====================== */
  const handleCreateOrder = () => {
    if (!name.trim() || !phone.trim()) return;

    setSubmitting(true);

    dispatch(
      setCustomer({
        customerName: name.trim(),
        customerPhone: phone.trim(),
        guests: guestCount,
      })
    );

    closeModal();
    navigate("/tables");
  };

  /* ======================
     BUTTON STYLES
  ====================== */
  const navBtnBase =
    "flex items-center justify-center w-[170px] h-12 rounded-2xl transition font-medium";

  const navBtn = (active) =>
    `${navBtnBase} ${
      active
        ? "bg-[#4a8dff] text-white shadow-lg"
        : "bg-[#343434] text-white hover:bg-[#3f3f3f]"
    }`;

  const fabDisabled =
    isActive("/tables") || isActive("/menu");

  return (
    <div
      className="
        fixed bottom-0 left-0 right-0
        bg-[#262626]
        p-3 h-20
        flex items-center justify-around
        shadow-[0_-4px_15px_rgba(0,0,0,0.35)]
        z-50
      "
    >
      {/* HOME */}
      <button
        onClick={() => navigate("/")}
        className={navBtn(isActive("/"))}
        aria-label="Home"
      >
        <FaHome className="mr-2" size={18} />
        Home
      </button>

      {/* ORDERS */}
      <button
        onClick={() => navigate("/orders")}
        className={navBtn(isActive("/orders"))}
        aria-label="Orders"
      >
        <IoMdReorder className="mr-2" size={18} />
        Orders
      </button>

      {/* TABLES */}
      <button
        onClick={() => navigate("/tables")}
        className={navBtn(isActive("/tables"))}
        aria-label="Tables"
      >
        <MdOutlineTableRestaurant className="mr-2" size={18} />
        Tables
      </button>

      {/* MORE */}
      <button
        onClick={() => navigate("/more")}
        className={navBtn(isActive("/more"))}
        aria-label="More"
      >
        <CiCircleMore className="mr-2" size={20} />
        More
      </button>

      {/* FAB */}
      <button
        onClick={openModal}
        disabled={fabDisabled}
        aria-label="Create new order"
        className="
          absolute left-1/2 -translate-x-1/2 -top-7
          bg-[#F6B100] hover:bg-[#ffbe32]
          text-white rounded-full p-4
          shadow-xl shadow-black/50
          transition
          disabled:opacity-50 disabled:cursor-not-allowed
          focus:outline-none focus:ring-2 focus:ring-[#f6b100]/60
        "
      >
        <BiSolidDish size={30} />
      </button>

      {/* MODAL */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Create New Order">
        {/* CUSTOMER NAME */}
        <div>
          <label className="block text-[#ababab] mb-2 text-sm font-medium">
            Customer Name
          </label>
          <div className="flex items-center rounded-lg px-4 py-3 bg-[#1f1f1f]">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter customer name"
              className="bg-transparent flex-1 text-white focus:outline-none"
            />
          </div>
        </div>

        {/* PHONE */}
        <div>
          <label className="block text-[#ababab] mb-2 mt-4 text-sm font-medium">
            Phone Number
          </label>
          <div className="flex items-center rounded-lg px-4 py-3 bg-[#1f1f1f]">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 709 351 3241"
              className="bg-transparent flex-1 text-white focus:outline-none"
            />
          </div>
        </div>

        {/* GUESTS */}
        <div>
          <label className="block text-[#ababab] mb-2 mt-4 text-sm font-medium">
            Guests
          </label>
          <div className="flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-lg">
            <button
              onClick={decrement}
              className="text-[#F6B100] text-3xl font-bold"
            >
              –
            </button>

            <span className="text-white text-lg font-semibold">
              {guestCount}
            </span>

            <button
              onClick={increment}
              className="text-[#F6B100] text-3xl font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={closeModal}
            className="w-1/2 bg-[#3a3a3a] hover:bg-[#4a4a4a]
                       transition text-[#dddddd] rounded-lg py-3 font-medium"
          >
            Cancel
          </button>

          <button
            onClick={handleCreateOrder}
            disabled={!name.trim() || !phone.trim() || submitting}
            className="
              w-1/2 bg-[#F6B100] hover:bg-yellow-600
              transition text-white rounded-lg py-3 font-semibold
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            Create
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BottomNav;
