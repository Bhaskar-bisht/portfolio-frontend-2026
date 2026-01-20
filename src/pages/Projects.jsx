/** @format */

// src/pages/Projects.jsx

const Projects = () => {
    return (
        <div className="container mx-auto px-4 py-20">
            <div className="max-w-3xl mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">My Projects</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                    A collection of my work showcasing various technologies and solutions.
                </p>
            </div>

            {/* Filters and project grid will go here */}
            <div className="min-h-[400px] flex items-center justify-center">
                <p className="text-gray-500">Projects will be loaded here...</p>
            </div>
        </div>
    );
};

export default Projects;
