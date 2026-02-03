/** @format */

// src/store/store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import blogReducer from "./slices/blogSlice";
import educationReducer from "./slices/educationSlice";
import projectDetailReducer from "./slices/projectDetailSlice";
import productReducer from "./slices/projectSlice";
import serviceReducer from "./slices/servicesSlice";
import socialLinksReducer from "./slices/socialLinkSlice";
import themeReducer from "./slices/themeSlice.";
import userReducer from "./slices/userSlice";

// Persist config
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["theme", "user"], // Ye reducers persist honge
};

// Combine reducers
const rootReducer = combineReducers({
    theme: themeReducer,
    user: userReducer,
    product: productReducer,
    blog: blogReducer,
    service: serviceReducer,
    social: socialLinksReducer,
    education: educationReducer,
    projectDetail: projectDetailReducer,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
});

export const persistor = persistStore(store);
