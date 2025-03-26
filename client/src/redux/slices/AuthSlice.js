import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginWithCredentials = createAsyncThunk("login", async (data) => {
    try {
        const response = await axios.post("http://localhost:8000/auth/login", JSON.stringify(data), {
            headers: {
                "Content-Type" : "application/json"
            }
        });
        if (response.status === 200) {
            debugger
            console.log(response);
        } else {
            debugger
            console.log(response);
        }
    } catch (e) {
        debugger
        console.log(e);
    }
})

const initialState = {
    isLoading: false,
    user: null,
}

export const AuthSlice = createSlice({
    name: "AuthSlice",
    initialState,
    reducers: {
        loginReducer: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginWithCredentials.pending, (state, action) => {
                state.isLoading = true;
                state.user = null;
            })
            .addCase(loginWithCredentials.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
    }
})

export const { loginReducer } = AuthSlice.actions;
export default AuthSlice.reducer;