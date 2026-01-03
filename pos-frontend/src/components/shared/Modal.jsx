import React, { useEffect, useRef } from "react";

const Modal = ({ title, onClose, isOpen, children }) => {
  const modalRef = useRef(null);

  /* ======================
     ESC KEY CLOSE
  ====================== */
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // ✅ SAFE EARLY RETURN (AFTER HOOKS)
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/50
        flex items-center justify-center
      "
      onMouseDown={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* MODAL CONTAINER */}
      <div
        ref={modalRef}
        onMouseDown={(e) => e.stopPropagation()}
        className="
          bg-[#1a1a1a]
          w-full max-w-lg
          mx-4
          rounded-lg
          shadow-xl shadow-black/40
          overflow-hidden
        "
      >
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#333]">
          <h2 className="text-xl text-[#f5f5f5] font-semibold">
            {title}
          </h2>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="
              text-[#ababab]
              text-2xl
              hover:text-white
              transition
            "
          >
            &times;
          </button>
        </div>

        {/* BODY */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
