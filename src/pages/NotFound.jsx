/** @format */

// src/pages/NotFound.jsx
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="container mx-auto px-4 py-20">
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
                <h1 className="text-9xl font-bold text-primary-600 dark:text-primary-400 mb-4">404</h1>
                <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                >
                    <Home className="mr-2 w-5 h-5" />
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
