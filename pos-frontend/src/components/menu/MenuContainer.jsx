import React, { useMemo, useState } from "react";
import { POPULAR_DISHES } from "../../constants/PopularDishes";
import { GrRadialSelected } from "react-icons/gr";
import { FaSearch, FaCheckCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItems } from "../../redux/slices/cartSlice";

const MenuContainer = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  /* ======================
     ADD TO CART
  ====================== */
  const handleAddToCart = (item) => {
    if (!item) return;

    dispatch(
      addItems({
        id: item.id,
        name: item.name,
        pricePerQuantity: item.price,
        quantity: 1,
        price: item.price,
      })
    );

    // auto-unselect after add (prevents double tap)
    setSelectedItems((prev) => prev.filter((i) => i !== item.id));
  };

  /* ======================
     CATEGORIES
  ====================== */
  const categories = useMemo(
    () => ["All", ...new Set(POPULAR_DISHES.map((d) => d.category))],
    []
  );

  /* ======================
     FILTERED MENU
  ====================== */
  const filteredMenu = useMemo(() => {
    return POPULAR_DISHES.filter((item) => {
      const categoryMatch =
        category === "All" || item.category === category;
      const searchMatch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [category, search]);

  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col gap-6 px-6 py-4 w-full">

      {/* SEARCH */}
      <div className="flex items-center bg-[#141414] px-4 py-3 rounded-xl gap-3 border border-[#2a2a2a]
                      focus-within:ring-2 focus-within:ring-[#4a8dff]/60">
        <FaSearch className="text-[#6f6f6f]" size={14} />
        <input
          type="text"
          placeholder="Search menu items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none text-[#f5f5f5] w-full placeholder-[#7d7d7d]"
        />
      </div>

      {/* CATEGORIES */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition
              ${
                category === cat
                  ? "bg-[#4a8dff] text-white"
                  : "bg-[#1a1a1a] text-[#bdbdbd] hover:bg-[#232323]"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* MENU GRID */}
      <div className="grid grid-cols-4 gap-6 w-full">
        {filteredMenu.map((menu) => {
          const isSelected = selectedItems.includes(menu.id);

          return (
            <div
              key={menu.id}
              onClick={() => toggleSelect(menu.id)}
              tabIndex={0}
              className={`relative p-4 rounded-2xl cursor-pointer transition-all
                border shadow-sm h-[160px] flex flex-col justify-between
                focus:outline-none focus:ring-2 focus:ring-[#4a8dff]/60
                ${
                  isSelected
                    ? "bg-gradient-to-br from-[#2d2d2d] to-[#3a3a3a] border-[#4a8dff]"
                    : "bg-[#1a1a1a] border-[#2f2f2f] hover:bg-[#222]"
                }
              `}
            >
              {/* TOP */}
              <div className="flex items-start justify-between">
                <h1 className="text-[#f5f5f5] text-[13px] font-semibold leading-snug w-[75%]">
                  {menu.name}
                </h1>

                {isSelected ? (
                  <FaCheckCircle className="text-[#4a8dff] text-lg shrink-0" />
                ) : (
                  <GrRadialSelected className="text-[#6f6f6f] text-lg shrink-0" />
                )}
              </div>

              {/* FOOTER */}
              <div className="flex justify-between items-center mt-auto">
                <span className="text-[#9d9d9d] text-xs">
                  {menu.category}
                </span>
                <span className="text-sm font-bold bg-[#4a8dff] text-white px-2 py-1 rounded-lg">
                  ${menu.price.toFixed(2)}
                </span>
              </div>

              {/* ADD BUTTON */}
              {isSelected && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(menu);
                  }}
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2
                             w-[80%] bg-[#4a8dff] text-white rounded-xl py-1
                             text-xs font-semibold hover:bg-[#3b7de0] transition"
                >
                  Add to Order +
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* EMPTY STATE */}
      {filteredMenu.length === 0 && (
        <p className="text-[#8a8a8a] text-center mt-10 text-sm">
          No items match your search or category.
        </p>
      )}
    </div>
  );
};

export default MenuContainer;
