/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { fetchProjects } from "../store/slices/projectSlice";

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
                        className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
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
                <h1 className="text-4xl md:text-5xl font-bold mb-4">My Projects</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                    A collection of my work showcasing various technologies and solutions.
                </p>
            </div>

            {/* Projects Grid */}
            {projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all animate-fade-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {project.thumbnail && (
                                <img
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                            )}
                            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                                {project.short_description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.technologies?.slice(0, 3).map((tech) => (
                                    <span
                                        key={tech.id}
                                        className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full text-sm"
                                    >
                                        {tech.name}
                                    </span>
                                ))}
                            </div>
                            <a
                                href={`/projects/${project.slug}`}
                                className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
                            >
                                View Details →
                            </a>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">No projects found</p>
                </div>
            )}
        </div>
    );
};

export default Projects;
