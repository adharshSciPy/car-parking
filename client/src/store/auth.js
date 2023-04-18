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
  },
});

export const { setLoggedIn } = authSlice.actions;
export default authSlice.reducer;
