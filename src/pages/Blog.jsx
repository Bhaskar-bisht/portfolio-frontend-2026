/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { fetchBlogs } from "../store/slices/blogSlice";

const Blog = () => {
    const dispatch = useDispatch();
    const { blogs, loading, error } = useSelector((state) => state.blog);

    useEffect(() => {
        if (blogs.length === 0 && !loading) {
            dispatch(fetchBlogs());
        }
    }, [dispatch]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-20">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Blogs</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
                    <button
                        onClick={() => dispatch(fetchBlogs())}
                        className="px-6 py-3 bg-primary-600 text-white rounded-3xl hover:bg-primary-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-20">
            <div className="max-w-3xl mb-12 animate-slide-up">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                    Thoughts, tutorials, and insights on web development.
                </p>
            </div>

            {blogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {blogs.map((blog, index) => (
                        <article
                            key={blog.id}
                            className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all animate-fade-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {blog.featured_image && (
                                <img src={blog.featured_image} alt={blog.title} className="w-full h-56 object-cover" />
                            )}
                            <div className="p-6">
                                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                                    <span>{blog.published_at}</span>
                                    <span>•</span>
                                    <span>{blog.reading_time} min read</span>
                                </div>
                                <h2 className="text-2xl font-bold mb-3 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                    <a href={`/blog/${blog.slug}`}>{blog.title}</a>
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{blog.excerpt}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {blog.tags?.slice(0, 3).map((tag) => (
                                        <span
                                            key={tag.slug}
                                            className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full text-sm"
                                        >
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                                <a
                                    href={`/blog/${blog.slug}`}
                                    className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
                                >
                                    Read More →
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">No blog posts found</p>
                </div>
            )}
        </div>
    );
};

export default Blog;
