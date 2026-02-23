/** @format */

// src/pages/Home.jsx
import { ArrowRight, Briefcase, Calendar, Code2, MapPin, Sparkles, Zap } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import MagneticButton from "../components/MagneticButton";
import SkillsJourney from "../components/SkillsJourney";
import { fetchBlogs } from "../store/slices/blogSlice";
import { fetchProjects } from "../store/slices/projectSlice";
import { fetchUserProfile } from "../store/slices/userSlice";

const Home = () => {
    const dispatch = useDispatch();
    const { profile, loading, error } = useSelector((state) => state.user);
    const { projects } = useSelector((state) => state.product);
    const { blogs } = useSelector((state) => state.blog);

    // Fetch profile AND projects data on component mount
    useEffect(() => {
        if (!profile) {
            dispatch(fetchUserProfile());
        }
        if (projects.length === 0) {
            dispatch(fetchProjects());
        }
        if (blogs.length === 0 && !loading) {
            dispatch(fetchBlogs());
        }
    }, [dispatch, profile, projects.length, blogs.length]);

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
                        className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
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
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 mb-6 opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]">
                        <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                        <span className="text-sm font-medium">
                            {profile?.availability_status === "available"
                                ? "Available for work"
                                : "Currently unavailable"}
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-[slideUp_0.8s_ease-out_0.2s_forwards]">
                        Hi, I'm{" "}
                        <span className="text-primary-600 dark:text-primary-400 inline-block hover:scale-105 transition-transform duration-300">
                            {profile?.name || "Bhaskar Bisht default"}
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 opacity-0 animate-[slideUp_0.8s_ease-out_0.4s_forwards]">
                        {profile?.currentPosition || "Full Stack Developer specializing in Laravel & React default"}
                    </p>

                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto opacity-0 animate-[slideUp_0.8s_ease-out_0.6s_forwards]">
                        {profile?.bio ||
                            " default I build scalable web applications with modern technologies. Passionate about creating digital experiences that matter."}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-[slideUp_0.8s_ease-out_0.8s_forwards]">
                        <MagneticButton variant="filled" to="/projects" className="px-8 py-4 group">
                            View My Work
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </MagneticButton>

                        <MagneticButton variant="outline" to="/contact" className="px-8 py-4">
                            Get In Touch
                        </MagneticButton>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 border-t border-gray-200 dark:border-gray-800">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                    <div className="text-center group cursor-pointer">
                        <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2 group-hover:scale-125 transition-all duration-300">
                            {profile?.yearsOfExperience || "1"}+
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 group-hover:text-primary-500 transition-colors">
                            Years Experience
                        </div>
                    </div>
                    <div className="text-center group cursor-pointer">
                        <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2 group-hover:scale-125 transition-all duration-300">
                            10+
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 group-hover:text-primary-500 transition-colors">
                            Projects Completed
                        </div>
                    </div>
                    <div className="text-center group cursor-pointer">
                        <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2 group-hover:scale-125 transition-all duration-300">
                            10+
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 group-hover:text-primary-500 transition-colors">
                            Technologies
                        </div>
                    </div>
                </div>
            </section>

            {/* Bio & Current Position Section */}
            <section className="py-20 border-t border-gray-200 dark:border-gray-800">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {/* Main Bio Section */}
                    <div className="lg:col-span-2 opacity-0 animate-[slideUp_0.8s_ease-out_0.2s_forwards]">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <span className="w-1 h-8 bg-primary-500 rounded-full animate-pulse"></span>
                                Who I Am
                            </h2>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                {profile?.bio || "Passionate developer creating amazing web experiences."}
                            </p>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex flex-col group cursor-pointer">
                                    <span className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        Location
                                    </span>
                                    <span className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                                        {profile?.location || "N/A"}
                                    </span>
                                </div>
                                <div className="flex flex-col group cursor-pointer">
                                    <span className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
                                        <Zap className="w-3 h-3" />
                                        Experience
                                    </span>
                                    <span className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                                        {profile?.yearsOfExperience || 0}+ years
                                    </span>
                                </div>
                                <div className="flex flex-col group cursor-pointer">
                                    <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">Status</span>
                                    <span
                                        className={`text-base font-semibold flex items-center gap-2 ${
                                            profile?.availabilityStatus === "available"
                                                ? "text-green-600 dark:text-green-400"
                                                : "text-yellow-600 dark:text-yellow-400"
                                        }`}
                                    >
                                        <span
                                            className={`w-2 h-2 rounded-full animate-pulse ${
                                                profile?.availabilityStatus === "available"
                                                    ? "bg-green-600"
                                                    : "bg-yellow-600"
                                            }`}
                                        ></span>
                                        {profile?.availabilityStatus === "available" ? "Available" : "Busy"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Current Position Card */}
                    <div className="lg:col-span-1 opacity-0 animate-[slideUp_0.8s_ease-out_0.4s_forwards]">
                        <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-3xl p-8 shadow-lg border border-primary-200 dark:border-primary-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4 hover:rotate-12 transition-transform duration-300">
                                    <Briefcase className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                                    Current Role
                                </h3>
                                <p className="text-xl font-bold text-gray-900 dark:text-white">
                                    {profile?.currentPosition || "Full Stack Developer"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Journey Section */}
            {profile?.skills && profile.skills.filter((skill) => skill.isPrimarySkill).length > 0 && (
                <section className="py-20 border-t border-gray-200 dark:border-gray-800">
                    <div className="mb-12 text-center opacity-0 animate-[fadeIn_0.8s_ease-out_0.2s_forwards]">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Code2 className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                                My Skills Journey
                            </h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Drag and explore my technical skills. Each card represents a technology I've mastered over
                            the years.
                        </p>
                    </div>

                    <div className="opacity-0 animate-[slideUp_0.8s_ease-out_0.4s_forwards]">
                        <SkillsJourney skills={profile.skills.filter((skill) => skill.isPrimarySkill)} />
                    </div>
                </section>
            )}

            {/* Work Experience Section */}
            {profile?.experiences && profile.experiences.length > 0 && (
                <section className="py-20 border-t border-gray-200 dark:border-gray-800">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900 dark:text-white opacity-0 animate-[fadeIn_0.8s_ease-out_0.2s_forwards]">
                        Work Experience
                    </h2>
                    <div className="space-y-6">
                        {profile.experiences
                            .filter(
                                (exp) =>
                                    exp.is_current ||
                                    new Date(exp.end_date) > new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
                            )
                            .slice(0, 2)
                            .map((exp, index) => (
                                <div
                                    key={exp.id}
                                    className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 opacity-0"
                                    style={{
                                        animation: `slideUp 0.8s ease-out ${0.3 + index * 0.15}s forwards`,
                                    }}
                                >
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-primary-500 transition-colors">
                                                {exp.position}
                                            </h3>
                                            <p className="text-lg text-primary-600 dark:text-primary-400 font-semibold mb-2">
                                                {exp.company_name}
                                            </p>
                                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {new Date(exp.start_date).getFullYear()} -{" "}
                                                    {exp.is_current ? "Present" : new Date(exp.end_date).getFullYear()}
                                                </span>
                                                {exp.is_remote && (
                                                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md text-xs font-medium">
                                                        Remote
                                                    </span>
                                                )}
                                                {exp.is_current && (
                                                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md text-xs font-medium animate-pulse">
                                                        Current
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                        {exp.description}
                                    </p>
                                    {exp.technologies && exp.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                                            {exp.technologies.slice(0, 6).map((tech) => (
                                                <span
                                                    key={tech.id}
                                                    className="px-3 py-1 text-xs font-medium rounded-full hover:scale-110 transition-transform duration-200 cursor-pointer"
                                                    style={{
                                                        backgroundColor: `${tech.color_code}20`,
                                                        color: tech.color_code,
                                                    }}
                                                >
                                                    {tech.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                </section>
            )}

            {/* Featured Projects Preview */}
            <section className="py-20 border-t border-gray-200 dark:border-gray-800">
                <div className="text-center mb-12 opacity-0 animate-[fadeIn_0.8s_ease-out_0.2s_forwards]">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                    <p className="text-gray-600 dark:text-gray-400">Check out some of my recent work</p>
                </div>

                <div className="text-center mt-12 opacity-0 animate-[slideUp_0.8s_ease-out_0.4s_forwards]">
                    <MagneticButton variant="text" to="/projects" className="inline-flex items-center group">
                        View All Projects
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </MagneticButton>
                </div>
            </section>
        </div>
    );
};

export default Home;
