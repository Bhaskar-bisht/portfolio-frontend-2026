/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Badge from "../components/Badge";
import Loader from "../components/Loader";
import { fetchProjects } from "../store/slices/projectSlice";
import { getLightRandomColor } from "../utils/getRendomColor";

const Projects = () => {
    const dispatch = useDispatch();
    const { projects, loading, error } = useSelector((state) => state.product);

    useEffect(() => {
        // Check if projects array is empty
        if (projects.length === 0 && !loading) {
            dispatch(fetchProjects());
        }
    }, [dispatch]);

    // Loading state
    if (loading) {
        return <Loader />;
    }

    // Error state
    if (error) {
        return (
            <div className="container mx-auto px-4 py-20">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Projects</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
                    <button
                        onClick={() => dispatch(fetchProjects())}
                        className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-20">
            {/* Header Section */}
            <div className="max-w-3xl mb-12 animate-slide-up">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                    My Projects
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                    A collection of my work showcasing various technologies and solutions.
                </p>
            </div>

            {/* Projects Grid */}
            {projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => {
                        const cardBgColor = getLightRandomColor();

                        return (
                            <div
                                key={project.id}
                                className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Project Image with Polaroid Effect */}
                                <div
                                    className="relative h-64 p-3 rounded-t-3xl"
                                    style={{ backgroundColor: cardBgColor }}
                                >
                                    <div className="relative h-full bg-white dark:bg-gray-100 rounded-3xl shadow-md p-3 pb-6 pr-4 overflow-hidden">
                                        {project.thumbnail ? (
                                            <img
                                                src={project.thumbnail}
                                                alt={project.title}
                                                className="w-full h-full rounded transition-transform duration-300 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-200 rounded">
                                                <svg
                                                    className="w-20 h-20 text-gray-400 opacity-50"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    {/* Status Badge */}
                                    <div className="absolute top-6 right-6">
                                        {/* <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                                                project.status === "completed"
                                                    ? "bg-green-500/90 text-white"
                                                    : "bg-yellow-500/90 text-white"
                                            }`}
                                        >
                                            {project.status === "completed" ? "✓ Completed" : "⚡ In Progress"}
                                        </span> */}
                                        {project.status === "completed" ? (
                                            <Badge text={"complete"} variant="green" />
                                        ) : (
                                            <Badge text={"In Progress"} variant="gray" />
                                        )}
                                    </div>

                                    {/* Featured Badge */}
                                    {/* {project.featured && (
                                        <div className="absolute top-6 left-6">
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-500/90 text-white backdrop-blur-sm">
                                                ⭐ Featured
                                            </span>
                                        </div>
                                    )} */}
                                </div>

                                {/* Content Section */}
                                <div className="p-6" style={{ backgroundColor: cardBgColor }}>
                                    {/* Title */}
                                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
                                        {project.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2 text-sm leading-relaxed">
                                        {project.short_description}
                                    </p>

                                    {/* Categories */}
                                    {project.categories && project.categories.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.categories.slice(0, 2).map((category) => (
                                                <span
                                                    key={category.id}
                                                    className="px-2 py-1 text-xs font-medium rounded-md bg-white/60 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300"
                                                >
                                                    {category.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2 mb-5">
                                        {project.technologies?.slice(0, 3).map((tech) => (
                                            <Badge key={tech.id} text={tech.name} variant="blue" size="sm" />
                                        ))}
                                        {project.technologies?.length > 3 && (
                                            <span className="px-2 py-1 text-xs font-medium rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                                                +{project.technologies.length - 3} more
                                            </span>
                                        )}
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                />
                                            </svg>
                                            <span>{project.views_count}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span>{project.likes_count}</span>
                                        </div>
                                    </div>

                                    {/* View Details Button */}
                                    <a
                                        href={`/projects/${project.slug}`}
                                        className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold group/link transition-colors"
                                    >
                                        <span>View Details</span>
                                        <svg
                                            className="w-5 h-5 transform group-hover/link:translate-x-1 transition-transform"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-20">
                    <svg
                        className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-600 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">No projects found</p>
                </div>
            )}
        </div>
    );
};

export default Projects;
