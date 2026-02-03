/** @format */

// src/store/slices/projectDetailSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProjectDetail } from "../../utils/api";

// Async thunk to fetch project detail by slug
export const fetchProjectDetail = createAsyncThunk(
    "projectDetail/fetchProjectDetail",
    async (slug, { rejectWithValue }) => {
        try {
            const response = await getProjectDetail(slug);
            console.log("Project Detail API Response:", response);
            return response.data;
        } catch (error) {
            console.error("Project Detail API Error:", error);
            return rejectWithValue(error.message || "Failed to fetch project details");
        }
    },
);

const initialState = {
    projectDetail: null,
    loading: false,
    error: null,
    success: false,
};

const projectDetailSlice = createSlice({
    name: "projectDetail",
    initialState,
    reducers: {
        clearProjectDetailError: (state) => {
            state.error = null;
        },
        resetProjectDetailState: (state) => {
            state.projectDetail = null;
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjectDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(fetchProjectDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.projectDetail = action.payload;
                state.success = true;
                state.error = null;
            })
            .addCase(fetchProjectDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.projectDetail = null;
            });
    },
});

export const { clearProjectDetailError, resetProjectDetailState } = projectDetailSlice.actions;
export default projectDetailSlice.reducer;
