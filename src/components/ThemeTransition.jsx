/** @format */

// src/components/ThemeTransition.jsx
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { finishAnimation } from "../store/slices/themeSlice.";

const ThemeTransition = () => {
    const { mode, isAnimating, animationOrigin } = useSelector((state) => state.theme);
    const dispatch = useDispatch();
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!isAnimating || !animationOrigin) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        // Set canvas size to window size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const { x, y } = animationOrigin;

        // Calculate max radius (diagonal of screen from origin point)
        const maxRadius = Math.hypot(Math.max(x, canvas.width - x), Math.max(y, canvas.height - y));

        let currentRadius = 0;
        const duration = 2000; // 800ms animation
        const startTime = Date.now();

        // Color based on theme
        const color =
            mode === "dark"
                ? "rgb(17, 24, 39)" // dark mode color (gray-900)
                : "rgb(255, 255, 255)"; // light mode color (white)

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            currentRadius = maxRadius * easeOutCubic;

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw expanding circle
            ctx.beginPath();
            ctx.arc(x, y, currentRadius, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Animation complete
                dispatch(finishAnimation());
            }
        };

        animate();

        return () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, [isAnimating, animationOrigin, mode, dispatch]);

    if (!isAnimating) return null;

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[9999] pointer-events-none"
            style={{ isolation: "isolate" }}
        />
    );
};

export default ThemeTransition;
