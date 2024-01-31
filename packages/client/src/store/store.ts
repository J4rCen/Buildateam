import { configureStore } from '@reduxjs/toolkit'
import productReducer, {initialState} from './slices/productSlices'
import {ProductDataSlice} from  './slices/type'


export type initialStoreType = {
  product: ProductDataSlice
}

export const initialStore: initialStoreType = {
  product: initialState,
}

const createStore = (preloadedState = initialStore) => {

  console.log(preloadedState)
  return configureStore({
    preloadedState,
    reducer: {
        product: productReducer,
    },
  })
}

export const store = createStore()

export default createStore
