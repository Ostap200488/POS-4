import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateTable } from "../../redux/slices/customerSlice";
import { getRandomBG } from "../../utils";
import { FaChair, FaLock } from "react-icons/fa";

const TableCard = ({ id, name, status, initials, seats }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isBooked = status === "Booked";

  const handleClick = () => {
    if (isBooked) return;

    // ✅ IMPORTANT FIX:
    // updateTable expects a STRING (table number / name)
    dispatch(updateTable(name));

    // ✅ Navigate ONLY after table is set
    navigate("/menu");
  };

  return (
    <div
      onClick={handleClick}
      tabIndex={isBooked ? -1 : 0}
      aria-disabled={isBooked}
      className={`
        w-[500px]
        bg-[#262626]
        p-4
        rounded-xl
        mb-4
        border border-[#2f2f2f]
        transition-all duration-200
        flex flex-col
        ${
          isBooked
            ? "opacity-60 cursor-not-allowed"
            : "cursor-pointer hover:bg-[#1f1f1f] hover:shadow-lg hover:shadow-black/30"
        }
        focus:outline-none focus:ring-2 focus:ring-[#f6b100]/60
      `}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-white text-lg font-semibold tracking-wide">
          {name}
        </h1>

        <span
          className={`
            px-3 py-1 rounded-full text-xs font-semibold
            ${
              isBooked
                ? "bg-red-500/20 text-red-400"
                : "bg-green-500/20 text-green-400"
            }
          `}
        >
          {isBooked ? "Booked" : "Available"}
        </span>
      </div>

      {/* AVATAR */}
      <div className="flex justify-center my-6 relative">
        <div
          className={`
            ${getRandomBG()}
            w-16 h-16
            rounded-full
            flex items-center justify-center
            text-white text-xl font-bold
            shadow-md
          `}
        >
          {initials}
        </div>

        {isBooked && (
          <FaLock className="absolute bottom-0 right-[38%] text-red-400 text-lg" />
        )}
      </div>

      {/* FOOTER */}
      <div className="flex justify-center items-center gap-2 text-[#ababab] text-sm">
        <FaChair />
        <span>{seats} seats</span>
      </div>
    </div>
  );
};

export default TableCard;
