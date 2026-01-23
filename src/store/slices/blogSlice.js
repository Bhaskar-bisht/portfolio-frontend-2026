/** @format */

// src/store/slices/blogSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBlogsData } from "../../utils/api";

// Async thunk to fetch blogs
export const fetchBlogs = createAsyncThunk("blog/fetchBlogs", async (_, { rejectWithValue }) => {
    try {
        const response = await getBlogsData();
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message || "Failed to fetch blogs");
    }
});

const initialState = {
    blogs: [],
    loading: false,
    error: null,
    success: false,
};

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        clearBlogError: (state) => {
            state.error = null;
        },
        resetBlogState: (state) => {
            state.blogs = [];
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload;
                state.success = true;
                state.error = null;
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.blogs = [];
            });
    },
});

export const { clearBlogError, resetBlogState } = blogSlice.actions;
export default blogSlice.reducer;
