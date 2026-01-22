/** @format */

// src/components/MagneticButton.jsx
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const MagneticButton = ({
    children,
    variant = "filled", // filled | outline | text
    to,
    href,
    onClick,
    className = "",
    disabled = false,
    magneticStrength = 0.3, // 0 to 1
    ...props
}) => {
    const buttonRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!buttonRef.current || disabled) return;

        const rect = buttonRef.current.getBoundingClientRect();
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

    // Variant styles
    const variantStyles = {
        filled: `
      bg-primary-600 hover:bg-primary-700 
      text-white 
      shadow-lg hover:shadow-xl
      dark:bg-primary-600 dark:hover:bg-primary-700
    `,
        outline: `
      border-2 border-gray-300 dark:border-gray-700 
      hover:border-primary-600 dark:hover:border-primary-400 
      text-gray-900 dark:text-gray-100
      hover:bg-primary-50 dark:hover:bg-primary-900/20
    `,
        text: `
      text-primary-600 dark:text-primary-400 
      hover:underline
      font-medium
    `,
    };

    const baseStyles = `
    inline-flex items-center justify-center
    rounded-lg font-medium
    transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variantStyles[variant]}
    ${className}
  `;

    const buttonContent = (
        <span
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                transition: isHovered ? "transform 0.2s ease-out" : "transform 0.5s ease-out",
            }}
            className={baseStyles}
            {...props}
        >
            {children}
        </span>
    );

    // Render as Link (React Router)
    if (to) {
        return (
            <Link to={to} onClick={onClick} className="inline-block">
                {buttonContent}
            </Link>
        );
    }

    // Render as anchor tag
    if (href) {
        return (
            <a href={href} onClick={onClick} className="inline-block" target="_blank" rel="noopener noreferrer">
                {buttonContent}
            </a>
        );
    }

    // Render as button
    return (
        <button onClick={onClick} disabled={disabled} className="inline-block">
            {buttonContent}
        </button>
    );
};

export default MagneticButton;
