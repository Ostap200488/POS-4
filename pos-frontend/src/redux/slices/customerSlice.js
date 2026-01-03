import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderId: "",
  customerName: "",
  customerPhone: "",
  guests: 1,
  tableNo: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      const { customerName, customerPhone, guests } = action.payload;

      state.orderId = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 7)}`;

      state.customerName = customerName;
      state.customerPhone = customerPhone;
      state.guests = guests;
    },

    updateTable: (state, action) => {
      // payload MUST be table number or name (string)
      state.tableNo = action.payload;
    },

    removeCustomer: () => initialState,
  },
});

export const { setCustomer, updateTable, removeCustomer } =
  customerSlice.actions;

export default customerSlice.reducer;
