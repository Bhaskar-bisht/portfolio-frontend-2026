/** @format */

// src/pages/Home.jsx
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import MagneticButton from "../components/MagneticButton";
import { fetchUserProfile } from "../store/slices/userSlice";

const Home = () => {
    const dispatch = useDispatch();
    const { profile, loading, error } = useSelector((state) => state.user);

    // Fetch profile data on component mount
    useEffect(() => {
        if (!profile) {
            dispatch(fetchUserProfile());
        }
    }, [dispatch, profile]);

    // Loading state
    if (loading && !profile) {
        return <Loader />;
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Profile</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
                    <button
                        onClick={() => dispatch(fetchUserProfile())}
                        className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4">
            {/* Hero Section */}
            <section className="min-h-[100vh] flex items-center justify-center py-20">
                <div className="text-center max-w-4xl">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 mb-6 animate-fade-in">
                        <Sparkles className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">
                            {profile?.availability_status === "available"
                                ? "Available for work"
                                : "Currently unavailable"}
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
                        Hi, I'm{" "}
                        <span className="text-primary-600 dark:text-primary-400">
                            {profile?.name || "Bhaskar Bisht"}
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 animate-slide-up delay-100">
                        {profile?.tagline || "Full Stack Developer specializing in Laravel & React"}
                    </p>

                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto animate-slide-up delay-200">
                        {profile?.bio ||
                            "I build scalable web applications with modern technologies. Passionate about creating digital experiences that matter."}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up delay-300">
                        <MagneticButton variant="filled" to="/projects" className="px-8 py-4">
                            View My Work
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </MagneticButton>

                        <MagneticButton variant="outline" to="/contact" className="px-8 py-4">
                            Get In Touch
                        </MagneticButton>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 border-t border-gray-200 dark:border-gray-800">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center group">
                        <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2 group-hover:scale-110 transition-transform">
                            {profile?.years_of_experience || "1"}+
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">Years Experience</div>
                    </div>
                    <div className="text-center group">
                        <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2 group-hover:scale-110 transition-transform">
                            20+
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">Projects Completed</div>
                    </div>
                    <div className="text-center group">
                        <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2 group-hover:scale-110 transition-transform">
                            15+
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">Happy Clients</div>
                    </div>
                    <div className="text-center group">
                        <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2 group-hover:scale-110 transition-transform">
                            10+
                        </div>
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
                    <MagneticButton variant="text" to="/projects" className="inline-flex items-center">
                        View All Projects
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </MagneticButton>
                </div>
            </section>
        </div>
    );
};

export default Home;
