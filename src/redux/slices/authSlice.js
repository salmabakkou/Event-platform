import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: localStorage.getItem("isAuth") === "true",
  role: localStorage.getItem("role"), // "admin" | "user"
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.role = action.payload.role;

      localStorage.setItem("isAuth", "true");
      localStorage.setItem("role", action.payload.role);
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.role = null;

      localStorage.removeItem("isAuth");
      localStorage.removeItem("role");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
