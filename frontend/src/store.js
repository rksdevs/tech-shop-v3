import { configureStore } from "@reduxjs/toolkit";
import themseSliceReducer from "../src/Features/themeSlice"
import { apiSlice } from '../src/Features/apiSlice';
import cartSliceReducer from '../src/Features/cartSlice';
import authSliceReducer from '../src/Features/authSlice';
import pcBuilderSlice from '../src/Features/pcBuilderSlice';
import productFilterSlice from "../src/Features/filterSlice";
import pcConfigureSlice from "../src/Features/pcConfigureSlice";
import orderTypeSlice from "./Features/orderTypeSlice";
import selectedPrebuiltPcSlice from "./Features/selectedPrebuiltPcSlice";
import messageSlice from "./Features/messageSlice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        theme: themseSliceReducer,
        cart: cartSliceReducer,
        auth: authSliceReducer,
        customPc: pcBuilderSlice,
        filter: productFilterSlice,
        PcConfigure: pcConfigureSlice,
        orderType: orderTypeSlice,
        selectedPrebuiltPc: selectedPrebuiltPcSlice,
        messages: messageSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default store;