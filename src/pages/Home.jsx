/** @format */

// src/pages/Home.jsx
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="container mx-auto px-4">
            {/* Hero Section */}
            <section className="min-h-[80vh] flex items-center justify-center py-20">
                <div className="text-center max-w-4xl">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 mb-6">
                        <Sparkles className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">Available for freelance work</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        Hi, I'm <span className="text-primary-600 dark:text-primary-400">Bhaskar Bisht</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8">
                        Full Stack Developer specializing in Laravel & React
                    </p>

                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                        I build scalable web applications with modern technologies. Passionate about creating digital
                        experiences that matter.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/projects"
                            className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                        >
                            View My Work
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>

                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 dark:border-gray-700 hover:border-primary-600 dark:hover:border-primary-400 rounded-lg font-medium transition-colors"
                        >
                            Get In Touch
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 border-t border-gray-200 dark:border-gray-800">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">3+</div>
                        <div className="text-gray-600 dark:text-gray-400">Years Experience</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">20+</div>
                        <div className="text-gray-600 dark:text-gray-400">Projects Completed</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">15+</div>
                        <div className="text-gray-600 dark:text-gray-400">Happy Clients</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">10+</div>
                        <div className="text-gray-600 dark:text-gray-400">Technologies</div>
                    </div>
                </div>
            </section>

            {/* Featured Projects Preview */}
            <section className="py-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                    <p className="text-gray-600 dark:text-gray-400">Check out some of my recent work</p>
                </div>

                {/* Project cards will go here */}
                <div className="text-center mt-12">
                    <Link
                        to="/projects"
                        className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline font-medium"
                    >
                        View All Projects
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
