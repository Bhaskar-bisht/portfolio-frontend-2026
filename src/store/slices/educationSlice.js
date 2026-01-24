/** @format */

// src/store/slices/projectSlice.js (rename from productSlice.js)
/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getEducationData } from "../../utils/api";

// Async thunk to fetch projects
export const fetchEducation = createAsyncThunk("education/fetchProjects", async (_, { rejectWithValue }) => {
    try {
        const response = await getEducationData();
        console.log("Projects API Response:", response); // Debug
        return response.data;
    } catch (error) {
        console.error("Projects API Error:", error); // Debug
        return rejectWithValue(error.message || "Failed to fetch projects");
    }
});

const initialState = {
    education: [],
    loading: false,
    error: null,
    success: false,
};

const educationSlice = createSlice({
    name: "education",
    initialState,
    reducers: {
        clearEducationError: (state) => {
            state.error = null;
        },
        resetEducationState: (state) => {
            state.education = [];
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEducation.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(fetchEducation.fulfilled, (state, action) => {
                state.loading = false;
                state.education = action.payload;
                state.success = true;
                state.error = null;
            })
            .addCase(fetchEducation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.education = [];
            });
    },
});

export const { clearEducationError, resetEducationState } = educationSlice.actions;
export default educationSlice.reducer;
