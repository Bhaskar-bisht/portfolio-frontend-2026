/** @format */

import { useRef, useState } from "react";

const Badge = ({ text, icon: Icon, variant = "default", size = "md", magneticStrength = 0.2 }) => {
    const badgeRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!badgeRef.current) return;

        const rect = badgeRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * magneticStrength;
        const deltaY = (e.clientY - centerY) * magneticStrength;

        setPosition({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const variants = {
        blue: "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 hover:from-blue-200 hover:to-blue-300 border border-blue-300/50 shadow-blue-100",
        purple: "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 hover:from-purple-200 hover:to-purple-300 border border-purple-300/50 shadow-purple-100",
        green: "bg-gradient-to-r from-green-100 to-green-200 text-green-700 hover:from-green-200 hover:to-green-300 border border-green-300/50 shadow-green-100",
        yellow: "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700 hover:from-yellow-200 hover:to-yellow-300 border border-yellow-300/50 shadow-yellow-100",
        gray: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 border border-gray-300/50 shadow-gray-100",
        default:
            "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 border border-gray-300/50 shadow-gray-100",
    };

    const sizes = {
        sm: "px-2.5 py-1 text-xs",
        md: "px-3.5 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
    };

    return (
        <span
            ref={badgeRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${isHovered ? 1.05 : 1})`,
                transition: isHovered ? "transform 0.2s ease-out" : "transform 0.5s ease-out",
            }}
            className={`
                ${variants[variant] || variants.default} 
                ${sizes[size]} 
                font-semibold rounded-full 
                flex items-center gap-1.5 w-fit
                shadow-sm hover:shadow-md
                transition-all duration-300
                cursor-default
                backdrop-blur-sm
            `}
        >
            {Icon && (
                <Icon
                    className={`
                        ${size === "sm" ? "w-3 h-3" : size === "lg" ? "w-5 h-5" : "w-4 h-4"}
                        ${isHovered ? "rotate-12" : "rotate-0"}
                        transition-transform duration-300
                    `}
                />
            )}
            <span className="relative">
                {text}
                <span
                    className={`
                    absolute -bottom-0.5 left-0 w-0 h-0.5 bg-current
                    ${isHovered ? "w-full" : "w-0"}
                    transition-all duration-300
                `}
                />
            </span>
        </span>
    );
};

export default Badge;
