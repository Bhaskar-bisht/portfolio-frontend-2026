/** @format */

// src/components/Loader.jsx

const Loader = ({ fullScreen = true }) => {
    if (fullScreen) {
        return (
            // fixed inset-0 ki jagah ye classes use karo
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
                <div className="relative">
                    {/* Outer rotating ring */}
                    <div className="w-20 h-20 border-4 border-primary-200 dark:border-primary-900 rounded-full"></div>

                    {/* Spinning gradient ring */}
                    <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-primary-600 dark:border-t-primary-400 rounded-full animate-spin"></div>

                    {/* Inner pulsing dot */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-3 h-3 bg-primary-600 dark:bg-primary-400 rounded-full animate-pulse"></div>
                    </div>
                </div>

                {/* Loading text */}
                <div className="absolute mt-32">
                    <p className="text-gray-600 dark:text-gray-400 font-medium animate-pulse">Loading...</p>
                </div>
            </div>
        );
    }

    // Inline loader
    return (
        <div className="flex items-center justify-center p-8">
            <div className="relative">
                <div className="w-12 h-12 border-3 border-primary-200 dark:border-primary-900 rounded-full"></div>
                <div className="absolute top-0 left-0 w-12 h-12 border-3 border-transparent border-t-primary-600 dark:border-t-primary-400 rounded-full animate-spin"></div>
            </div>
        </div>
    );
};

export default Loader;
