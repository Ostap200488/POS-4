import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
  name: "",
  email: "",
  role: "",
  isAuth: false,
  isChecked: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const u = action.payload || {};
      state._id = u._id || null;
      state.name = u.name || "";
      state.email = u.email || "";
      state.role = u.role || "";
      state.isAuth = true;
      state.isChecked = true;
    },
    removeUser: (state) => {
      state._id = null;
      state.name = "";
      state.email = "";
      state.role = "";
      state.isAuth = false;
      state.isChecked = true;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
