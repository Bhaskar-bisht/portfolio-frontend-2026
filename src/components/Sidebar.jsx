/** @format */

// src/components/Sidebar.jsx
import {
    Computer,
    Cuboid,
    Home,
    Menu,
    MonitorUp,
    Moon,
    Newspaper,
    PanelLeft,
    PanelRight,
    Sun,
    User,
    X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { toggleTheme } from "../store/slices/themeSlice.";

const Sidebar = ({ isExpanded, setIsExpanded }) => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const theme = useSelector((state) => state.theme.mode);
    const dispatch = useDispatch();

    // Close mobile sidebar on route change
    useEffect(() => {
        setIsMobileOpen(false);
    }, [window.location.pathname]);

    const navItems = [
        { name: "Home", path: "/", icon: Home },
        { name: "Projects", path: "/projects", icon: Cuboid },
        { name: "About", path: "/about", icon: User },
        { name: "Blog", path: "/blog", icon: Newspaper },
        { name: "Services", path: "/services", icon: Computer },
        { name: "Contact", path: "/contact", icon: MonitorUp },
    ];

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700"
                aria-label="Toggle menu"
            >
                {isMobileOpen ? (
                    <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                ) : (
                    <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                )}
            </button>

            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed left-0 top-0 h-screen z-40
          bg-white dark:bg-gray-900 
          border-r border-gray-200 dark:border-gray-800
          transition-all duration-300 ease-in-out
          shadow-xl md:shadow-none
          flex flex-col
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          ${isExpanded ? "w-64" : "w-20"}
        `}
            >
                {/* Header - Fixed, no scroll */}
                <div
                    className={`
            flex items-center h-16 
            border-b border-gray-200 dark:border-gray-800 
            flex-shrink-0
            ${isExpanded ? "px-4 justify-between" : "px-0 justify-center"}
          `}
                >
                    {/* Collapsed State - Only Toggle Button */}
                    {!isExpanded && (
                        <button
                            onClick={() => setIsExpanded(true)}
                            className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                            aria-label="Expand sidebar"
                        >
                            <PanelRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </button>
                    )}

                    {/* Expanded State - Logo + Brand + Close Button */}
                    {isExpanded && (
                        <>
                            <Link to="/" className="flex items-center space-x-3" onClick={() => setIsMobileOpen(false)}>
                                {/* Logo */}
                                {/* <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-600 dark:to-primary-800 flex items-center justify-center shadow-lg flex-shrink-0">
                                    <span className="text-white font-bold text-xl">B</span>
                                </div> */}

                                {/* Brand Name */}
                                <span className="font-bold text-lg text-gray-900 dark:text-white whitespace-nowrap">
                                    bhaskar
                                </span>
                            </Link>

                            {/* Close Button */}
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 flex-shrink-0"
                                aria-label="Collapse sidebar"
                            >
                                <PanelLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </button>
                        </>
                    )}
                </div>

                {/* Navigation - Scrollable area */}
                <nav className="flex-1 p-3 space-y-1 overflow-y-auto overflow-x-hidden">
                    {navItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileOpen(false)}
                                className={({ isActive }) => `
                  group relative flex items-center rounded-xl
                  transition-all duration-200
                  ${isExpanded ? "gap-3 p-3" : "justify-center p-3"}
                  ${
                      isActive
                          ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 shadow-sm"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }
                `}
                            >
                                {/* Icon */}
                                <Icon
                                    className={`
                    w-5 h-5 flex-shrink-0 transition-transform duration-200
                    ${!isExpanded && "mx-auto"}
                  `}
                                />

                                {/* Label */}
                                {isExpanded && (
                                    <span className="font-medium text-sm whitespace-nowrap">{item.name}</span>
                                )}

                                {/* Tooltip */}
                                {!isExpanded && (
                                    <div
                                        className="
                    absolute left-full ml-2 px-3 py-1.5 
                    bg-gray-900 dark:bg-gray-700 text-white text-sm 
                    rounded-lg shadow-lg
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible
                    transition-all duration-200 whitespace-nowrap z-50
                    pointer-events-none
                  "
                                    >
                                        {item.name}
                                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900 dark:border-r-gray-700" />
                                    </div>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Theme Toggle Footer - Fixed at bottom */}
                <div className="p-3 border-t border-gray-200 dark:border-gray-800 flex-shrink-0">
                    <button
                        onClick={() => dispatch(toggleTheme())}
                        className={`
              group relative flex items-center w-full rounded-xl
              transition-all duration-200
              text-gray-700 dark:text-gray-300
              hover:bg-gray-100 dark:hover:bg-gray-800
              ${isExpanded ? "gap-3 px-3 py-2.5" : "justify-center p-3"}
            `}
                    >
                        {/* Theme Icon */}
                        {theme === "dark" ? (
                            <Sun
                                className={`w-5 h-5 text-yellow-500 flex-shrink-0 transition-transform group-hover:rotate-45 duration-300 ${!isExpanded && "mx-auto"}`}
                            />
                        ) : (
                            <Moon
                                className={`w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0 transition-transform group-hover:-rotate-12 duration-300 ${!isExpanded && "mx-auto"}`}
                            />
                        )}

                        {/* Label */}
                        {isExpanded && (
                            <span className="font-medium text-sm whitespace-nowrap">
                                {theme === "dark" ? "Light Mode" : "Dark Mode"}
                            </span>
                        )}

                        {/* Tooltip */}
                        {!isExpanded && (
                            <div
                                className="
                absolute left-full ml-2 px-3 py-1.5 
                bg-gray-900 dark:bg-gray-700 text-white text-sm 
                rounded-lg shadow-lg
                opacity-0 invisible group-hover:opacity-100 group-hover:visible
                transition-all duration-200 whitespace-nowrap z-50
                pointer-events-none
              "
                            >
                                {theme === "dark" ? "Light Mode" : "Dark Mode"}
                                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900 dark:border-r-gray-700" />
                            </div>
                        )}
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
