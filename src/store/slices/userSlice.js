/** @format */

// src/store/slices/userSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfileData } from "../../utils/api";

// Async thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk("user/fetchProfile", async (_, { rejectWithValue }) => {
    try {
        const response = await getProfileData();
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message || "Failed to fetch profile");
    }
});

const initialState = {
    profile: null,
    loading: false,
    error: null,
    success: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUserError: (state) => {
            state.error = null;
        },
        resetUserState: (state) => {
            state.profile = null;
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
                state.success = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.profile = null;
            });
    },
});

export const { clearUserError, resetUserState } = userSlice.actions;
export default userSlice.reducer;
