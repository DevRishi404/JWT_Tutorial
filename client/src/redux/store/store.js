import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "../slices/AuthSlice";


export const store = configureStore({
    reducer: {
        login: loginReducer
    }
})