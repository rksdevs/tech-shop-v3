import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderType: localStorage.getItem("orderType") ? localStorage.getItem("orderType") : "Regular"
}

const orderTypeSlice = createSlice({
    name: "orderType",
    initialState,
    reducers: {
        setOrderType: (state, action) => {
            state.orderType = action.payload;
            localStorage.setItem("orderType", action.payload);
        }
    }
})

export const {setOrderType} = orderTypeSlice.actions;

export default orderTypeSlice.reducer;