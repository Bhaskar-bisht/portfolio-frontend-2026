/** @format */

// src/store/slices/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Get initial theme from localStorage or system preference
const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

// Apply initial theme
const initialTheme = getInitialTheme();
if (initialTheme === "dark") {
    document.documentElement.classList.add("dark");
} else {
    document.documentElement.classList.remove("dark");
}

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        mode: initialTheme,
        isAnimating: false,
    },
    reducers: {
        toggleTheme: (state, action) => {
            state.mode = state.mode === "light" ? "dark" : "light";
            localStorage.setItem("theme", state.mode);

            // Animation trigger - coordinates from button click
            state.isAnimating = true;
            state.animationOrigin = action.payload; // { x, y }
        },
        setTheme: (state, action) => {
            state.mode = action.payload.mode;
            localStorage.setItem("theme", action.payload.mode);
            state.isAnimating = true;
            state.animationOrigin = action.payload.origin;
        },
        finishAnimation: (state) => {
            state.isAnimating = false;

            // Update document class after animation
            if (state.mode === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        },
    },
});

export const { toggleTheme, setTheme, finishAnimation } = themeSlice.actions;
export default themeSlice.reducer;
