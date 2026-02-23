/** @format */

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

// Light pastel color palette for skill cards
const SKILL_COLORS = [
    { bg: "#FFE5E5", border: "#FFB3B3" }, // Light Pink
    { bg: "#E5F3FF", border: "#B3D9FF" }, // Light Blue
    { bg: "#FFF5E5", border: "#FFE0B3" }, // Light Peach
    { bg: "#E5FFE5", border: "#B3FFB3" }, // Light Mint
    { bg: "#F5E5FF", border: "#D9B3FF" }, // Light Lavender
    { bg: "#FFEBE5", border: "#FFD1B3" }, // Light Coral
    { bg: "#E5FFFF", border: "#B3FFFF" }, // Light Cyan
    { bg: "#FFF0E5", border: "#FFD9B3" }, // Light Orange
    { bg: "#F0FFE5", border: "#D9FFB3" }, // Light Lime
    { bg: "#FFE5F5", border: "#FFB3D9" }, // Light Rose
    { bg: "#E5F0FF", border: "#B3D1FF" }, // Light Sky
    { bg: "#FFFFE5", border: "#FFFFB3" }, // Light Yellow
];

const SkillsJourney = ({ skills }) => {
    const containerRef = useRef(null);
    const theme = useSelector((state) => state.theme.mode);

    if (!skills || skills.length === 0) return null;

    // Predefined positions for different screen sizes with random colors
    const cardPositions = [
        { top: "15%", left: "20%", rotate: "6deg", className: "w-32 md:w-48 lg:w-56", color: SKILL_COLORS[0] },
        { top: "45%", left: "60%", rotate: "12deg", className: "w-28 md:w-40 lg:w-48", color: SKILL_COLORS[1] },
        { top: "25%", left: "45%", rotate: "-6deg", className: "w-36 md:w-52 lg:w-64", color: SKILL_COLORS[2] },
        { top: "55%", left: "35%", rotate: "8deg", className: "w-32 md:w-44 lg:w-56", color: SKILL_COLORS[3] },
        { top: "20%", left: "70%", rotate: "18deg", className: "w-28 md:w-40 lg:w-52", color: SKILL_COLORS[4] },
        { top: "40%", left: "50%", rotate: "-3deg", className: "w-24 md:w-36 lg:w-48", color: SKILL_COLORS[5] },
        { top: "65%", left: "65%", rotate: "-8deg", className: "w-32 md:w-48 lg:w-60", color: SKILL_COLORS[6] },
        { top: "10%", left: "35%", rotate: "15deg", className: "w-28 md:w-40 lg:w-52", color: SKILL_COLORS[7] },
        { top: "50%", left: "20%", rotate: "-12deg", className: "w-30 md:w-44 lg:w-56", color: SKILL_COLORS[8] },
        { top: "30%", left: "80%", rotate: "5deg", className: "w-26 md:w-38 lg:w-48", color: SKILL_COLORS[9] },
    ];

    return (
        <div className="relative w-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl overflow-hidden">
            {/* Background text */}
            <div className="relative z-0 flex items-center justify-center py-12 md:py-16 lg:py-20">
                <h2 className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-black text-gray-200 dark:text-gray-700 select-none">
                    SKILLS<span className="text-primary-500">.</span>
                </h2>
            </div>

            {/* Draggable cards container */}
            <div ref={containerRef} className="absolute inset-0 z-10 p-4 md:p-8" style={{ minHeight: "500px" }}>
                {skills.slice(0, cardPositions.length).map((skill, index) => (
                    <SkillCard
                        key={skill.id}
                        skill={skill}
                        containerRef={containerRef}
                        position={cardPositions[index]}
                    />
                ))}
            </div>

            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <svg width="100%" height="100%">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <circle cx="20" cy="20" r="1" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>
        </div>
    );
};

const SkillCard = ({ skill, containerRef, position }) => {
    const [zIndex, setZIndex] = useState(0);
    const theme = useSelector((state) => state.theme.mode);

    const updateZIndex = () => {
        const els = document.querySelectorAll(".drag-skill-card");
        let maxZIndex = -Infinity;

        els.forEach((el) => {
            let currentZIndex = parseInt(window.getComputedStyle(el).getPropertyValue("z-index"));
            if (!isNaN(currentZIndex) && currentZIndex > maxZIndex) {
                maxZIndex = currentZIndex;
            }
        });

        setZIndex(maxZIndex + 1);
    };

    const technology = skill.technologyId;
    const cardColor = position.color;
    const lightBgColor = cardColor.bg;
    const lightBorderColor = cardColor.border;
    const accentColor = technology?.color_code || "#3B82F6";

    return (
        <motion.div
            onMouseDown={updateZIndex}
            style={{
                top: position.top,
                left: position.left,
                rotate: position.rotate,
                zIndex,
                borderColor: theme === "dark" ? "#4B5563" : lightBorderColor,
                backgroundColor: theme === "dark" ? "#1f2937" : lightBgColor,
            }}
            className={twMerge(
                "drag-skill-card absolute cursor-grab active:cursor-grabbing rounded-2xl shadow-xl hover:shadow-2xl transition-shadow",
                "border-4 p-4 md:p-6",
                position.className,
            )}
            drag
            dragConstraints={containerRef}
            dragElastic={0.65}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Logo */}
            <div className="flex justify-center mb-3 md:mb-4">
                <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl flex items-center justify-center overflow-hidden bg-white/60 dark:bg-gray-700/60">
                    {technology?.logo_url ? (
                        <img
                            src={technology.logo_url}
                            alt={technology.name}
                            className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain"
                        />
                    ) : (
                        <div
                            className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-lg"
                            style={{ backgroundColor: accentColor }}
                        />
                    )}
                </div>
            </div>

            {/* Skill Name */}
            <h3
                className="text-center font-bold text-sm md:text-base lg:text-lg mb-2 truncate"
                style={{ color: accentColor }}
            >
                {technology?.name || "Skill"}
            </h3>

            {/* Stats */}
            <div className="space-y-1 md:space-y-2">
                {/* Proficiency */}
                <div className="flex items-center justify-between text-xs md:text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Proficiency</span>
                    <span className="font-semibold" style={{ color: accentColor }}>
                        {skill.proficiencyPercentage}%
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 md:h-2">
                    <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: accentColor }}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.proficiency_percentage}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    />
                </div>

                {/* Experience */}
                <div className="flex items-center justify-between text-xs md:text-sm pt-1">
                    <span className="text-gray-600 dark:text-gray-400">Experience</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? "year" : "years"}
                    </span>
                </div>
            </div>

            {/* Category Badge */}
            {technology?.category && (
                <div className="mt-3 md:mt-4 flex justify-center">
                    <span
                        className="px-2 md:px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                            backgroundColor: `${accentColor}20`,
                            color: accentColor,
                        }}
                    >
                        {technology.category}
                    </span>
                </div>
            )}
        </motion.div>
    );
};

export default SkillsJourney;
