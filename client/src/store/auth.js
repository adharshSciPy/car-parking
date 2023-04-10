import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",

  initialState: {
    isAuthenticated: false,
    role: "role",
  },
  reducers: {
    setLoggedIn: (state) => {
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.role = "";
      state.isAuthenticated = false;
    },
  },
});

export const { setLoggedIn, logout } = authSlice.actions;
export default authSlice.reducer;
