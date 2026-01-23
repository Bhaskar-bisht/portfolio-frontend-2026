/** @format */

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../store/slices/userSlice";
import Loader from "../components/Loader";

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
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 animate-slide-up">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        {profile?.tagline || "Full Stack Developer"}
                    </p>
                </div>

                {/* Bio Section */}
                <div className="mb-16 animate-fade-in delay-100">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Who I Am</h2>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            {profile?.bio || "Passionate developer creating amazing web experiences."}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-4">
                            <div>
                                <span className="text-gray-600 dark:text-gray-400">Location:</span>
                                <span className="ml-2 font-medium">{profile?.location || "N/A"}</span>
                            </div>
                            <div>
                                <span className="text-gray-600 dark:text-gray-400">Experience:</span>
                                <span className="ml-2 font-medium">{profile?.years_of_experience || 0}+ years</span>
                            </div>
                            <div>
                                <span className="text-gray-600 dark:text-gray-400">Status:</span>
                                <span className="ml-2 font-medium text-green-600 dark:text-green-400">
                                    {profile?.availability_status === "available" ? "Available for work" : "Busy"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Skills Section */}
                {profile?.skills && profile.skills.length > 0 && (
                    <div className="mb-16 animate-slide-up delay-200">
                        <h2 className="text-3xl font-bold mb-8">Technical Skills</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {profile.skills
                                .filter((skill) => skill.is_primary_skill)
                                .map((skill, index) => (
                                    <div
                                        key={skill.id}
                                        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg animate-scale-in"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <h3 className="text-lg font-semibold">{skill.technology?.name}</h3>
                                            <span className="text-primary-600 dark:text-primary-400 font-bold">
                                                {skill.proficiency_percentage}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                                            <div
                                                className="bg-gradient-to-r from-primary-500 to-primary-600 h-full rounded-full transition-all duration-1000 ease-out"
                                                style={{
                                                    width: `${skill.proficiency_percentage}%`,
                                                    animation: `slideRight 1s ease-out ${index * 0.1}s`,
                                                }}
                                            />
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                            {skill.years_of_experience} years experience
                                        </p>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}

                {/* Education Section */}
                {profile?.educations && profile.educations.length > 0 && (
                    <div className="mb-16 animate-slide-up delay-300">
                        <h2 className="text-3xl font-bold mb-8">Education</h2>
                        <div className="space-y-6">
                            {profile.educations.map((edu, index) => (
                                <div
                                    key={edu.id}
                                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all animate-fade-in"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                                            <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                                                {edu.institution_name}
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-400 mb-2">
                                                {edu.field_of_study} {edu.grade && `• ${edu.grade}`}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {new Date(edu.start_date).getFullYear()} -{" "}
                                                {edu.is_current ? "Present" : new Date(edu.end_date).getFullYear()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Experience Section */}
                {profile?.experiences && profile.experiences.length > 0 && (
                    <div className="animate-slide-up delay-400">
                        <h2 className="text-3xl font-bold mb-8">Work Experience</h2>
                        <div className="space-y-6">
                            {profile.experiences.map((exp, index) => (
                                <div
                                    key={exp.id}
                                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all animate-fade-in"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <h3 className="text-xl font-bold mb-2">{exp.position}</h3>
                                    <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                                        {exp.company_name}
                                    </p>
                                    <p className="text-sm text-gray-500 mb-4">
                                        {new Date(exp.start_date).toLocaleDateString()} -{" "}
                                        {exp.is_current ? "Present" : new Date(exp.end_date).toLocaleDateString()}
                                        {exp.is_remote && " • Remote"}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default About;
