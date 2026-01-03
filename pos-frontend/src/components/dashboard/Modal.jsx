import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";

const Modal = ({ onClose }) => {
  const inputRef = useRef(null);
  const modalRef = useRef(null);

  const [tableNumber, setTableNumber] = useState("");

  const handleCloseModal = () => {
    onClose?.();
  };

  // ESC to close + focus trap
  useEffect(() => {
    inputRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") handleCloseModal();

      // Focus trap
      if (e.key === "Tab") {
        const focusable = modalRef.current.querySelectorAll(
          "button, input"
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tableNumber.trim()) return;

    console.log("TABLE NUMBER:", tableNumber);
    handleCloseModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      onMouseDown={handleCloseModal}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        ref={modalRef}
        onMouseDown={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="bg-[#262626] p-6 rounded-xl shadow-xl w-96"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#f5f5f5] text-lg font-semibold">
            Add Table
          </h2>

          <button
            onClick={handleCloseModal}
            className="text-[#aaa] hover:text-red-500 transition"
            aria-label="Close modal"
          >
            <IoMdClose size={22} />
          </button>
        </div>

        {/* BODY */}
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div>
            <label className="block text-sm text-[#ababab] mb-2">
              Table Number
            </label>

            <div className="flex items-center rounded-lg px-4 py-3 bg-[#1f1f1f]
                            focus-within:ring-2 focus-within:ring-[#f6b100]">
              <input
                ref={inputRef}
                type="text"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="e.g. 12"
                className="bg-transparent flex-1 text-white placeholder-[#666] outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!tableNumber.trim()}
            className={`w-full py-2 rounded-lg font-semibold transition
              ${
                tableNumber.trim()
                  ? "bg-[#f6b100] text-black hover:bg-[#ffcc33]"
                  : "bg-[#333] text-[#777] cursor-not-allowed"
              }`}
          >
            Save Table
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Modal;
