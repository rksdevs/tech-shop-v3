import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: localStorage.getItem("userTheme") ? localStorage.getItem("userTheme") : "system"
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setUserTheme: (state, action) => {
            state.theme = action.payload;
            localStorage.setItem("userTheme", action.payload);
        }
    }
})

export default themeSlice.reducer;

export const {setUserTheme} = themeSlice.actions;