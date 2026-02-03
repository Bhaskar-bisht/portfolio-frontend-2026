/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import SkillsJourney from "../components/SkillsJourney";
import { fetchUserProfile } from "../store/slices/userSlice";

const About = () => {
    const dispatch = useDispatch();
    const { profile, loading } = useSelector((state) => state.user);

    useEffect(() => {
        if (!profile) {
            dispatch(fetchUserProfile());
        }
    }, [dispatch, profile]);

    if (loading && !profile) {
        return <Loader />;
    }

    return (
        <div className="container mx-auto px-4 py-20">
            {/* Header Section */}
            <div className="mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                    About Me
                </h1>
                <p className="text-2xl text-gray-700 dark:text-gray-300 font-medium">
                    {profile?.tagline || "Full Stack Developer"}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                {/* Main Bio Section - Takes 2 columns */}
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <span className="w-1 h-8 bg-primary-500 rounded-full"></span>
                            Who I Am
                        </h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                            {profile?.bio || "Passionate developer creating amazing web experiences."}
                        </p>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex flex-col">
                                <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">Location</span>
                                <span className="text-base font-semibold text-gray-900 dark:text-white">
                                    {profile?.location || "N/A"}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">Experience</span>
                                <span className="text-base font-semibold text-gray-900 dark:text-white">
                                    {profile?.years_of_experience || 0}+ years
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">Status</span>
                                <span
                                    className={`text-base font-semibold ${
                                        profile?.availability_status === "available"
                                            ? "text-green-600 dark:text-green-400"
                                            : "text-yellow-600 dark:text-yellow-400"
                                    }`}
                                >
                                    {profile?.availability_status === "available" ? "Available" : "Busy"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Current Position Card */}
                <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-3xl p-8 shadow-lg border border-primary-200 dark:border-primary-800">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    className="w-8 h-8 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Current Role</h3>
                            <p className="text-xl font-bold text-gray-900 dark:text-white">
                                {profile?.current_position || "Full Stack Developer"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Skills Journey Section - Now with more height */}
            {profile?.skills && profile.skills.filter((skill) => skill.is_primary_skill).length > 0 && (
                <div className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">My Skills Journey</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 text-center max-w-2xl mx-auto">
                        Drag and explore my technical skills. Each card represents a technology I've mastered over the
                        years.
                    </p>

                    <SkillsJourney skills={profile.skills.filter((skill) => skill.is_primary_skill)} />
                </div>
            )}

            {/* Work Experience Section */}
            {profile?.experiences && profile.experiences.length > 0 && (
                <div className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Work Experience</h2>
                    <div className="space-y-6">
                        {profile.experiences
                            .filter(
                                (exp) =>
                                    exp.is_current ||
                                    new Date(exp.end_date) > new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
                            )
                            .slice(0, 2)
                            .map((exp) => (
                                <div
                                    key={exp.id}
                                    className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow"
                                >
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                                {exp.position}
                                            </h3>
                                            <p className="text-lg text-primary-600 dark:text-primary-400 font-semibold mb-2">
                                                {exp.company_name}
                                            </p>
                                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                                <span className="flex items-center gap-1">
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
                                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                    {new Date(exp.start_date).getFullYear()} -{" "}
                                                    {exp.is_current ? "Present" : new Date(exp.end_date).getFullYear()}
                                                </span>
                                                {exp.is_remote && (
                                                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md text-xs font-medium">
                                                        Remote
                                                    </span>
                                                )}
                                                {exp.is_current && (
                                                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md text-xs font-medium">
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
                                                    className="px-3 py-1 text-xs font-medium rounded-full"
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
                </div>
            )}
        </div>
    );
};

export default About;
