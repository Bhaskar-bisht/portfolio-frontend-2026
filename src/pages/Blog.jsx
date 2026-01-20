/** @format */

// src/pages/Blog.jsx

const Blog = () => {
    return (
        <div className="container mx-auto px-4 py-20">
            <div className="max-w-3xl mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                    Thoughts, tutorials, and insights on web development.
                </p>
            </div>

            {/* Blog posts will go here */}
            <div className="min-h-[400px]">
                <p className="text-gray-500">Blog posts will be loaded here...</p>
            </div>
        </div>
    );
};

export default Blog;
