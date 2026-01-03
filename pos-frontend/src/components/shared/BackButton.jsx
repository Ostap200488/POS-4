import React from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Safe back navigation
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/"); // fallback (home/dashboard)
    }
  };

  return (
    <button
      onClick={handleBack}
      aria-label="Go back"
      title="Go back"
      className="
        bg-[#025cca]
        p-3
        rounded-lg
        text-white
        shadow-md shadow-black/30
        hover:bg-[#0373f3]
        active:scale-95
        focus:outline-none
        focus:ring-2 focus:ring-[#4a8dff]/60
        transition-all
      "
    >
      <IoArrowBackCircleSharp className="text-2xl" />
    </button>
  );
};

export default BackButton;
