/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProjectsData } from "../../utils/api";

// Async thunk to fetch projects
export const fetchProjects = createAsyncThunk("project/fetchProjects", async (_, { rejectWithValue }) => {
    try {
        const response = await getProjectsData();
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message || "Failed to fetch projects");
    }
});

const initialState = {
    projects: [],
    loading: false,
    error: null,
    success: false,
};

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        clearProjectError: (state) => {
            state.error = null;
        },
        resetProjectState: (state) => {
            state.projects = [];
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload;
                state.success = true;
                state.error = null;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.projects = [];
            });
    },
});

export const { clearProjectError, resetProjectState } = projectSlice.actions;
export default projectSlice.reducer;
