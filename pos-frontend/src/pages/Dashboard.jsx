import React, { useState } from "react";
import { MdTableBar, MdCategory } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

import Metrics from "../components/dashboard/Metrics";
import RecentOrders from "../components/dashboard/RecentOrders";
import Modal from "../components/shared/Modal";
import api from "../https";

/* =========================
   CONFIG
========================= */
const ACTION_BUTTONS = [
  { label: "Add Table", icon: <MdTableBar />, action: "table" },
  { label: "Add Category", icon: <MdCategory />, action: "category" },
  { label: "Add Dish", icon: <BiSolidDish />, action: "dishes" },
];

const TABS = ["Metrics", "Orders"];

/* =========================
   DASHBOARD
========================= */
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Metrics");
  const [activeModal, setActiveModal] = useState(null);

  /* ======================
     ADD TABLE STATE
  ====================== */
  const [tableName, setTableName] = useState("");
  const [seats, setSeats] = useState(4);

  const closeModal = () => {
    setActiveModal(null);
    setTableName("");
    setSeats(4);
  };

  /* ======================
     ADD TABLE MUTATION
  ====================== */
  const createTableMutation = useMutation({
    mutationFn: (data) => api.post("/api/table", data),
    onSuccess: () => {
      enqueueSnackbar("Table added successfully", { variant: "success" });
      closeModal();
    },
    onError: (error) => {
      enqueueSnackbar(
        error?.response?.data?.message || "Failed to add table",
        { variant: "error" }
      );
    },
  });

  /* ======================
     SUBMIT TABLE
  ====================== */
  const handleAddTable = (e) => {
    e.preventDefault();

    if (!tableName.trim()) {
      enqueueSnackbar("Table name is required", { variant: "warning" });
      return;
    }

    if (seats < 1) {
      enqueueSnackbar("Seats must be at least 1", { variant: "warning" });
      return;
    }

    createTableMutation.mutate({
      name: tableName.trim(),
      seats: Number(seats),
    });
  };

  return (
    <>
      {/* ROOT */}
      <div className="bg-[#1f1f1f] min-h-screen pt-20">
        {/* TOP BAR */}
        <div className="container mx-auto flex flex-wrap gap-4 justify-between px-6 mb-8">
          {/* ACTION BUTTONS */}
          <div className="flex gap-3">
            {ACTION_BUTTONS.map(({ label, icon, action }) => (
              <button
                key={action}
                onClick={() => setActiveModal(action)}
                className="
                  bg-[#1a1a1a] hover:bg-[#262626]
                  px-6 py-3 rounded-lg
                  text-[#f5f5f5] font-semibold
                  flex items-center gap-2
                  transition
                  focus:outline-none focus:ring-2 focus:ring-[#f6b100]/60
                "
              >
                {icon}
                {label}
              </button>
            ))}
          </div>

          {/* TABS */}
          <div className="flex gap-2 bg-[#262626] p-1 rounded-xl">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-6 py-2 rounded-lg text-sm font-semibold transition
                  ${
                    activeTab === tab
                      ? "bg-[#1a1a1a] text-white"
                      : "text-[#ababab] hover:bg-[#1a1a1a] hover:text-white"
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="container mx-auto px-6 pb-10">
          {activeTab === "Metrics" && <Metrics />}
          {activeTab === "Orders" && <RecentOrders />}
        </div>
      </div>

      {/* =========================
         ADD TABLE MODAL
      ========================== */}
      <Modal
        isOpen={activeModal === "table"}
        title="Add Table"
        onClose={closeModal}
      >
        <form onSubmit={handleAddTable} className="space-y-5">
          {/* TABLE NAME */}
          <div>
            <label className="block text-sm text-[#ababab] mb-2">
              Table Name
            </label>
            <input
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              placeholder="Table 12"
              className="
                w-full bg-[#262626] text-white
                px-4 py-3 rounded-lg
                outline-none focus:ring-2 focus:ring-[#f6b100]/60
              "
            />
          </div>

          {/* SEATS */}
          <div>
            <label className="block text-sm text-[#ababab] mb-2">
              Number of Seats
            </label>
            <input
              type="number"
              min={1}
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              className="
                w-full bg-[#262626] text-white
                px-4 py-3 rounded-lg
                outline-none focus:ring-2 focus:ring-[#f6b100]/60
              "
            />
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="
                w-1/2 bg-[#3a3a3a] hover:bg-[#4a4a4a]
                text-[#ddd] py-3 rounded-lg transition
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={createTableMutation.isLoading}
              className="
                w-1/2 bg-[#f6b100] hover:bg-[#ffcc33]
                text-black font-semibold py-3 rounded-lg
                transition disabled:opacity-60
              "
            >
              {createTableMutation.isLoading ? "Saving..." : "Add Table"}
            </button>
          </div>
        </form>
      </Modal>

      {/* PLACEHOLDER MODALS (NEXT STEPS) */}
      <Modal
        isOpen={activeModal === "category"}
        title="Add Category"
        onClose={closeModal}
      >
        <p className="text-[#ababab] text-sm">
          Category form coming next.
        </p>
      </Modal>

      <Modal
        isOpen={activeModal === "dishes"}
        title="Add Dish"
        onClose={closeModal}
      >
        <p className="text-[#ababab] text-sm">
          Dish form coming next.
        </p>
      </Modal>
    </>
  );
};

export default Dashboard;
