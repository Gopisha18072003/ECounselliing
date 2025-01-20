import { configureStore } from "@reduxjs/toolkit";
import uiReducer from './uiSlice';
import authReducer from './authSlice';
const store = configureStore({
  reducer: { auth: authReducer, ui: uiReducer},
});

export default store;