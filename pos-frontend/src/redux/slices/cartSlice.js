import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems: (state, action) => {
      const existingItem = state.find(item => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.price = existingItem.quantity * existingItem.pricePerQuantity;
      } else {
        state.push(action.payload);
      }
    },

    removeItem: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    }
  }
});
export const getTotalPrice = (state) => state.cart.reduce((total, item) => total+ item.price, 0  );
export const { addItems, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
