import React, { useEffect, useRef } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaNotesMedical } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../../redux/slices/cartSlice";

const CartInfo = () => {
  const cartData = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  // Auto-scroll to bottom on cart update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [cartData]);

  const handleRemove = (id, name) => {
    const ok = window.confirm(`Remove "${name}" from cart?`);
    if (ok) dispatch(removeItem(id));
  };

  return (
    <div>
      <h1 className="text-lg text-[#e4e4e4] font-semibold tracking-wide">
        Order Details
      </h1>

      {/* SCROLL AREA */}
      <div
        ref={scrollRef}
        className="mt-4 overflow-y-scroll scrollbar-hide h-[380px] pr-1"
      >
        {cartData.length === 0 ? (
          <div className="text-[#ababab] text-sm flex flex-col justify-center items-center h-[380px] gap-2">
            <span className="text-lg">🛒</span>
            <p>Your cart is empty</p>
            <p className="text-xs text-[#777]">
              Start adding items to create an order
            </p>
          </div>
        ) : (
          cartData.map((item) => {
            const lineTotal = item.price * item.quantity;

            return (
              <div
                key={item.id}
                className="
                  bg-[#1f1f1f]
                  rounded-lg
                  px-4 py-4
                  mb-2
                  hover:bg-[#242424]
                  transition
                "
              >
                {/* HEADER */}
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <h2 className="text-[#f5f5f5] font-semibold text-sm">
                      {item.name}
                    </h2>
                    <span className="text-[#9a9a9a] text-xs mt-1">
                      Quantity: {item.quantity}
                    </span>
                  </div>

                  <span className="text-[#f5f5f5] font-semibold text-sm">
                    ${lineTotal.toFixed(2)}
                  </span>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleRemove(item.id, item.name)}
                      className="text-[#ababab] hover:text-red-400 transition"
                      aria-label="Remove item"
                    >
                      <RiDeleteBin2Fill size={18} />
                    </button>

                    <button
                      className="text-[#ababab] hover:text-[#f6b100] transition"
                      aria-label="Add note"
                      title="Add note (coming soon)"
                    >
                      <FaNotesMedical size={18} />
                    </button>
                  </div>

                  <span className="text-[#ababab] text-xs">
                    ${item.price.toFixed(2)} each
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CartInfo;
