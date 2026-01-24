/** @format */

// src/store/slices/projectSlice.js (rename from productSlice.js)
/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSocialLinks } from "../../utils/api";

// Async thunk to fetch projects
export const fetchSocialLinks = createAsyncThunk("socialLinks/fetchProjects", async (_, { rejectWithValue }) => {
    try {
        const response = await getSocialLinks();
        console.log("Projects API Response:", response); // Debug
        return response.data;
    } catch (error) {
        console.error("Projects API Error:", error); // Debug
        return rejectWithValue(error.message || "Failed to fetch projects");
    }
});

const initialState = {
    socialLinks: [],
    loading: false,
    error: null,
    success: false,
};

const socialSlice = createSlice({
    name: "social-link",
    initialState,
    reducers: {
        clearSocialLinkError: (state) => {
            state.error = null;
        },
        resetSocialLinkState: (state) => {
            state.projects = [];
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSocialLinks.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(fetchSocialLinks.fulfilled, (state, action) => {
                state.loading = false;
                state.socialLinks = action.payload;
                state.success = true;
                state.error = null;
            })
            .addCase(fetchSocialLinks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.socialLinks = [];
            });
    },
});

export const { clearSocialLinkError, resetSocialLinkState } = socialSlice.actions;
export default socialSlice.reducer;
