import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("accessToken");

export const loginWithCredentials = createAsyncThunk("login", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post("http://localhost:8000/auth/login", JSON.stringify(data), {
            withCredentials: true
        });

        if (response.status === 200) {
            return { accessToken: response.data.accessToken }; // Return token as the payload
        } else {
            return rejectWithValue(response.data.message);
        }
    } catch ({response}) {
        if(response.status === 400) {
            console.log(response.data.message);
            return rejectWithValue(response.data.message);
        }

        return rejectWithValue(response);
    }
});

export const registerWithCredentials = createAsyncThunk("register", async (data, {rejectWithValue}) => {
    try {
        const response = await axios.post("http://localhost:8000/auth/register", JSON.stringify(data))

        if (response.status === 201) {
            return response.data.message; 
        } else {
            return rejectWithValue(response.data.message);
        }
        
    } catch ({response}) {
        return rejectWithValue(response.data.message);
    }
})

export const logoutUser = createAsyncThunk("logout", async (data, {rejectWithValue}) => {
    try {
        const response = await axios.post("http://localhost:8000/auth/logout", {}, {
            withCredentials: true
        });

        if (response.status === 200) {
            localStorage.removeItem("accessToken");
            return response.data.message;
        } else {
            return rejectWithValue(response.data.message);
        }
    } catch ({response}) {
        return rejectWithValue(response.data.message);
    }
})

const initialState = {
    isLoading: false,
    user: {},
    token: token ? token : null,
    error: null,
    success: null
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
            })
            .addCase(loginWithCredentials.fulfilled, (state, action) => {
                state.isLoading = false;
                state.token = action.payload.accessToken;
                localStorage.setItem("accessToken", action.payload.accessToken);
            })
            .addCase(loginWithCredentials.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(registerWithCredentials.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(registerWithCredentials.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = action.payload;
            })
            .addCase(registerWithCredentials.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(logoutUser.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.token = null;
                localStorage.removeItem("accessToken");
            })
        }
})

export const { loginReducer } = AuthSlice.actions;
export default AuthSlice.reducer;