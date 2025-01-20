import { createSlice } from "@reduxjs/toolkit";

// Get user data from localStorage if it exists
const storedUserData = localStorage.getItem('user');
let finalData = null;
if (storedUserData) {
  const jsonData = JSON.parse(storedUserData);
  finalData = { user: jsonData, isAuthenticated: true };
}

const initialState = storedUserData ? finalData : { user: null, isAuthenticated: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    update(state, action) {
      state.user = { ...state.user, ...action.payload };
    }
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
