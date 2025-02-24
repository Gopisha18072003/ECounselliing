import { createSlice } from "@reduxjs/toolkit";
// Get counselling data from localStorage if it exists
const storedCounsellingStatus = localStorage.getItem('status');

let finalCounsellingStatus = null;
if (storedCounsellingStatus) {
    finalCounsellingStatus = { status: storedCounsellingStatus};
}

const initialState = storedCounsellingStatus ? finalCounsellingStatus : { status: false };

const counsellingSlice = createSlice({
    name: "counsellingStatus",
    initialState,
    reducers: {
        update(state, action) {
            state.status = action.payload;
        }
    }
});

export const counsellingStatusActions = counsellingSlice.actions;
export default counsellingSlice.reducer;