/** @format */

// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import App from "./App";
import Loader from "./components/Loader";
import "./index.css";

// Apply initial theme
const savedTheme = localStorage.getItem("theme") || "light";
if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={<Loader />} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>,
);
