/** @format */

// src/components/Sidebar.jsx
import { Cuboid, Home, Library, Menu, Moon, PanelLeft, PanelRight, Send, Sun, Waypoints, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { toggleTheme } from "../store/slices/themeSlice.";

const Sidebar = ({ isExpanded, setIsExpanded }) => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const theme = useSelector((state) => state.theme.mode);
    const dispatch = useDispatch();
    const themeButtonRef = useRef(null);

    // Close mobile sidebar on route change
    useEffect(() => {
        setIsMobileOpen(false);
    }, [window.location.pathname]);

    const navItems = [
        { name: "Home", path: "/", icon: Home },
        { name: "Products", path: "/projects", icon: Cuboid },
        // { name: "About", path: "/about", icon: User },
        // { name: "Blog", path: "/blog", icon: Newspaper },
        // { name: "Services", path: "/services", icon: Computer },
        { name: "Social Links", path: "/social-links", icon: Waypoints },
        { name: "Education", path: "/education", icon: Library },
        { name: "Contact", path: "/contact", icon: Send },
    ];

    const handleThemeToggle = (e) => {
        const button = themeButtonRef.current;
        if (!button) return;

        // Get button position
        const rect = button.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        // Dispatch with coordinates
        dispatch(toggleTheme({ x, y }));
    };

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
                {/* Header */}
                <div
                    className={`
            flex items-center h-16 
            border-b border-gray-200 dark:border-gray-800 
            flex-shrink-0
            ${isExpanded ? "px-4 justify-between" : "px-0 justify-center"}
          `}
                >
                    {!isExpanded && (
                        <div className="relative group">
                            <button
                                onClick={() => setIsExpanded(true)}
                                className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                                aria-label="Expand sidebar"
                            >
                                <PanelRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </button>

                            {/* Tooltip for Expand Button */}
                            <div className="absolute left-full ml-4 px-3 py-1.5 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none top-1/2 -translate-y-1/2">
                                Expand Sidebar
                                <div className="absolute right-full top-1/2 -translate-y-1/2 mr-[-4px] w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-gray-900 dark:border-r-gray-700" />
                            </div>
                        </div>
                    )}

                    {isExpanded && (
                        <>
                            <Link to="/" className="flex items-center gap-1" onClick={() => setIsMobileOpen(false)}>
                                <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">&lt;</span>
                                <span className="font-bold text-lg text-gray-900 dark:text-white whitespace-nowrap">
                                    bhaskar
                                </span>
                                <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">/&gt;</span>
                            </Link>

                            <div className="relative group">
                                <button
                                    onClick={() => setIsExpanded(false)}
                                    className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 flex-shrink-0"
                                    aria-label="Collapse sidebar"
                                >
                                    <PanelLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </button>

                                {/* Tooltip for Collapse Button */}
                                <div className="absolute left-full ml-4 px-3 py-1.5 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none top-1/2 -translate-y-1/2">
                                    Collapse Sidebar
                                    <div className="absolute right-full top-1/2 -translate-y-1/2 mr-[-4px] w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-gray-900 dark:border-r-gray-700" />
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Navigation */}
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
                                <Icon
                                    className={`
                    w-5 h-5 flex-shrink-0 transition-transform duration-200
                    ${!isExpanded && "mx-auto"}
                  `}
                                />

                                {isExpanded && (
                                    <span className="font-medium text-sm whitespace-nowrap">{item.name}</span>
                                )}

                                {/* Tooltip - Show when sidebar is collapsed */}
                                {!isExpanded && (
                                    <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                                        {item.name}
                                        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-[-4px] w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-gray-900 dark:border-r-gray-700" />
                                    </div>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Theme Toggle Footer */}
                <div className="p-3 border-t border-gray-200 dark:border-gray-800 flex-shrink-0">
                    <button
                        ref={themeButtonRef}
                        onClick={handleThemeToggle}
                        className={`
              group relative flex items-center w-full rounded-xl
              transition-all duration-200
              text-gray-700 dark:text-gray-300
              hover:bg-gray-100 dark:hover:bg-gray-800
              ${isExpanded ? "gap-3 px-3 py-2.5" : "justify-center p-3"}
            `}
                    >
                        {theme === "dark" ? (
                            <Sun
                                className={`w-5 h-5 text-yellow-500 flex-shrink-0 transition-transform group-hover:rotate-45 duration-300 ${!isExpanded && "mx-auto"}`}
                            />
                        ) : (
                            <Moon
                                className={`w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0 transition-transform group-hover:-rotate-12 duration-300 ${!isExpanded && "mx-auto"}`}
                            />
                        )}

                        {isExpanded && (
                            <span className="font-medium text-sm whitespace-nowrap">
                                {theme === "dark" ? "Light Mode" : "Dark Mode"}
                            </span>
                        )}

                        {/* Tooltip for Theme Toggle */}
                        {!isExpanded && (
                            <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                                {theme === "dark" ? "Light Mode" : "Dark Mode"}
                                <div className="absolute right-full top-1/2 -translate-y-1/2 mr-[-4px] w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-gray-900 dark:border-r-gray-700" />
                            </div>
                        )}
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
