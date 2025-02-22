import { createSlice } from "@reduxjs/toolkit";

// Get user data from localStorage if it exists
const storedUserData = localStorage.getItem('user');
const storedToken = localStorage.getItem('token');
let finalData = null;
if (storedUserData) {
  const jsonData = JSON.parse(storedUserData);
  finalData = { user: jsonData,token: storedToken, isAuthenticated: !!storedToken };
}

const initialState = storedUserData ? finalData : { user: null, isAuthenticated: false, token: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addToken(state, action) {
        state.token= action.payload
    },
    login(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
    },
    update(state, action) {
      state.user = { ...state.user, ...action.payload };
    }
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
