/** @format */

import { Earth } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Badge from "../components/Badge";
import { getLightRandomColor } from "../utils/getRendomColor";
// const getSocialIcon = (platform) => {
//     const icons = {
//         github: Github,
//         linkedin: Linkedin,
//         twitter: Twitter,
//         default: Globe,
//     };

//     const key = platform?.toLowerCase() || "default";
//     const Icon = icons[key] || icons.default;
//     return <Icon className="w-5 h-5" />;
// };

const SocialLink = () => {
    const { profile } = useSelector((state) => state.user);
    const [cardColors, setCardColors] = useState({});

    useEffect(() => {
        // Generate random colors for each social link on mount
        if (profile?.social_links) {
            const colors = {};
            profile.social_links.forEach((link) => {
                colors[link.id] = getLightRandomColor();
            });
            setCardColors(colors);
        }
    }, [profile?.social_links]);

    if (!profile?.social_links || profile.social_links.length === 0) {
        return (
            <div className="flex items-center justify-center py-12">
                <p className="text-gray-500">No social links available</p>
            </div>
        );
    }

    const activeSocialLinks = profile.social_links
        .filter((social) => social.is_active)
        .sort((a, b) => a.display_order - b.display_order);

    return (
        <div className="py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                    <Earth />
                    Social Links
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeSocialLinks.map((social, index) => (
                        <div
                            key={social.id}
                            className="transform hover:scale-105 transition-all duration-300 hover:shadow-xl rounded-xl overflow-hidden animate-fadeIn"
                            style={{
                                backgroundColor: cardColors[social.id] || getLightRandomColor(),
                                animationDelay: `${index * 100}ms`,
                            }}
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-white rounded-lg shadow-sm">{social.platform}</div>
                                        <div>
                                            <h3 className="font-semibold text-lg text-gray-800">{social.platform}</h3>
                                            {social.username && (
                                                <p className="text-sm text-gray-600">@{social.username}</p>
                                            )}
                                        </div>
                                    </div>
                                    {/* <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                        Active
                                    </span> */}
                                    <Badge text="Active" variant="green" size="sm" />
                                </div>

                                <a
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-3 bg-white rounded-lg text-blue-600 hover:text-blue-800 transition-colors duration-200 text-sm font-medium truncate hover:bg-blue-50"
                                >
                                    {social.url}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SocialLink;
