/** @format */

// Global function to generate light random colors
export const getLightRandomColor = () => {
    const colors = [
        "#FFF0F5", // Lavender Blush
        "#F0F8FF", // Alice Blue
        "#F5FFFA", // Mint Cream
        "#FFF5EE", // Seashell
        "#F0FFF0", // Honeydew
        "#FFF0F0", // Light Pink
        "#F0F0FF", // Lavender
        "#FFFAF0", // Floral White
        "#F5F5DC", // Beige
        "#FFE4E1", // Misty Rose
        "#E0FFFF", // Light Cyan
        "#FFE4B5", // Moccasin
        "#FFDAB9", // Peach Puff
        "#EEE8AA", // Pale Goldenrod
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};
