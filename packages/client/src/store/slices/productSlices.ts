import { createSlice } from "@reduxjs/toolkit"
import { ProductDataSlice } from "./type"

export const initialState: ProductDataSlice = {
    productData: []
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {}
})

export default productSlice.reducer