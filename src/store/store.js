/** @format */

// src/store/store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import productReducer from "./slices/productSlice";
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
