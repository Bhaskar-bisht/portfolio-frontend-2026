/** @format */

// src/store/slices/serviceSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getServicesData } from "../../utils/api";

// Async thunk to fetch services
export const fetchServices = createAsyncThunk("service/fetchServices", async (_, { rejectWithValue }) => {
    try {
        const response = await getServicesData();
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message || "Failed to fetch services");
    }
});
const initialState = {
    services: [],
    loading: false,
    error: null,
    success: false,
};
const serviceSlice = createSlice({
    name: "service",
    initialState,
    reducers: {
        clearServiceError: (state) => {
            state.error = null;
        },
        resetServiceState: (state) => {
            state.services = [];
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchServices.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.loading = false;
                state.services = action.payload;
                state.success = true;
                state.error = null;
            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.services = [];
            });
    },
});
export const { clearServiceError, resetServiceState } = serviceSlice.actions;
export default serviceSlice.reducer;
