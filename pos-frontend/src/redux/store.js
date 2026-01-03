import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./slices/customerSlice";
import cartSlice from "./slices/cartSlice";
import userSlice from "./slices/userSlice"; // ✅ FIXED

const store = configureStore({
  reducer: {
    customer: customerSlice,
    cart: cartSlice,
    user: userSlice, // ✅ REAL user slice
  },
  devTools: import.meta.env.MODE !== "production",
});

export default store;
