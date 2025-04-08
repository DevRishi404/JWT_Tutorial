import { createSlice, createAsyncThunk, combineSlices } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductsList = createAsyncThunk("getProductsList", async ({ rejectWithValue }) => {
    try {
        const response = await axios.get("http://localhost:8000/products/getProductsList");

        if(response.status === 200) {
            return response.data.list;
        } else {
            return rejectWithValue(response.data.message);
        }
    } catch (error) {
        return rejectWithValue(response.data.message);
        debugger
    }
})


const initialState = {
    isLoading: false,
    productsList: null,
    error: null,
}

const productsSlice = createSlice({
    name: "productsSlice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductsList.pending, (state) => {
                state.isLoading = true;
                state.productsList = null;
            })
            .addCase(getProductsList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productsList = action.payload;
            })
            .addCase(getProductsList.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }

})

export default productsSlice.reducer;