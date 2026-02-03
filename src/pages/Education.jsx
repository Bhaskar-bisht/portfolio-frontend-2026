/** @format */

import { Award, BookOpen, Calendar, GraduationCap, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Badge from "../components/Badge";
import { getLightRandomColor } from "../utils/getRendomColor";

export const Education = () => {
    const { profile } = useSelector((state) => state.user);
    const [cardColors, setCardColors] = useState({});

    useEffect(() => {
        if (profile?.education) {
            const colors = {};
            profile.education.forEach((edu) => {
                colors[edu.id] = getLightRandomColor();
            });
            setCardColors(colors);
        }
    }, [profile?.education]);

    if (!profile?.education || profile.education.length === 0) {
        return (
            <div className="flex items-center justify-center py-12">
                <p className="text-gray-500">No education details available</p>
            </div>
        );
    }

    const sortedEducation = [...profile.education].sort((a, b) => a.display_order - b.display_order);

    return (
        <div className="py-8 px-4">
            <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>

            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                    <GraduationCap className="w-8 h-8 text-purple-600" />
                    Education
                </h2>

                <div className="space-y-6">
                    {sortedEducation.map((edu, index) => (
                        <div
                            key={edu.id}
                            className="transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl rounded-3xl overflow-hidden animate-fadeIn"
                            style={{
                                backgroundColor: cardColors[edu.id] || getLightRandomColor(),
                                animationDelay: `${index * 100}ms`,
                            }}
                        >
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                            {edu.institution_name}
                                        </h3>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full flex items-center gap-1">
                                                <BookOpen className="w-4 h-4" />
                                                {edu.degree}
                                            </span>
                                            {edu.field_of_study && <Badge text={edu.field_of_study} variant="purple" />}
                                            {edu.grade && <Badge text={`Grade: ${edu.grade}`} variant="green" />}
                                            {edu.is_current ? (
                                                <Badge text="Current" variant="yellow" />
                                            ) : (
                                                <Badge text="Completed" variant="gray" />
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-3xl">
                                        <Calendar className="w-4 h-4" />
                                        <span>
                                            {new Date(edu.start_date).getFullYear()} -{" "}
                                            {edu.end_date ? new Date(edu.end_date).getFullYear() : "Present"}
                                        </span>
                                    </div>
                                </div>

                                {edu.location && (
                                    <div className="flex items-center gap-2 text-gray-700 mb-3">
                                        <MapPin className="w-4 h-4 text-red-500" />
                                        <span className="text-sm">{edu.location}</span>
                                    </div>
                                )}

                                {edu.description && (
                                    <div className="bg-white p-4 rounded-3xl mb-3">
                                        <p className="text-gray-700 text-sm leading-relaxed">{edu.description}</p>
                                    </div>
                                )}

                                {edu.achievements && (
                                    <div className="bg-white p-4 rounded-3xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Award className="w-5 h-5 text-yellow-600" />
                                            <h4 className="font-semibold text-gray-800">Achievements</h4>
                                        </div>
                                        <p className="text-gray-700 text-sm leading-relaxed">{edu.achievements}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Education;
