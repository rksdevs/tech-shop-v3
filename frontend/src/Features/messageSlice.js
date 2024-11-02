import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messageList: localStorage.getItem("messageList") 
        ? JSON.parse(localStorage.getItem("messageList")) 
        : []
}

const messageListSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messageList.push(action.payload);
            localStorage.setItem("messageList", JSON.stringify(state.messageList))
        },
        deleteMessages: (state, action) => {
            state.messageList = [];
            localStorage.removeItem("messageList");
        }
    }
})

export const {addMessage, deleteMessages} = messageListSlice.actions;

export default messageListSlice.reducer;