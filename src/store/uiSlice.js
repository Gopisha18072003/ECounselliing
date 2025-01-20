import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: { successNotification: null, errorNotification: null },
    reducers: {
        showSuccessNotification(state, action) {
            state.successNotification = {
                status: action.payload.status,
                message: action.payload.message,
            };
        },
        showErrorNotification(state, action) {
            state.errorNotification = {
                status: action.payload.status,
                message: action.payload.message,
            };
        },
        hideSuccessNotification(state){
            state.successNotification = null
        },
        hideErrorNotification(state){
            state.errorNotification = null
        }
    },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;