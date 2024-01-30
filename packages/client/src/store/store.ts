import { configureStore } from "@reduxjs/toolkit";
import productSlices from "./productSlices";

const store = configureStore({
    reducer: {
        product: productSlices
    }
})

export default store;


