/** @format */

// src/pages/BlogDetail.jsx
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const BlogDetail = () => {
    const { slug } = useParams();

    return (
        <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto">
                <Link
                    to="/blog"
                    className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline mb-8"
                >
                    <ArrowLeft className="mr-2 w-5 h-5" />
                    Back to Blog
                </Link>

                {/* Blog detail will go here */}
                <div className="min-h-[400px]">
                    <p className="text-gray-500">Blog post: {slug}</p>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
