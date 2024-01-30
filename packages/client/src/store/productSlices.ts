import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productData: []
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
    }
})



export default productSlice.reducer