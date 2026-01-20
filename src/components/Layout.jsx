/** @format */

// src/components/Layout.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="min-h-screen flex">
            <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

            {/* Main Content - Properly centered with sidebar offset */}
            <main
                className={`
          flex-1 transition-all duration-300
          ${isExpanded ? "md:ml-64" : "md:ml-20"}
        `}
            >
                <div className="w-full h-full">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
