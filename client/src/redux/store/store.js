import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../slices/AuthSlice";
import ProductSlice from "../slices/ProductsSlice"


export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        products: ProductSlice,
    }
})