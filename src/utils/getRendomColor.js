/** @format */

// Global function to generate light random colors
export const getLightRandomColor = () => {
    const colors = [
        "#FFE5EC", // Soft Pink
        "#E3F2FD", // Ice Blue
        "#FFF5E6", // Light Peach
        "#F1F8E9", // Mint Cream
        "#FFF0F5", // Lavender Blush
        "#E0F7FA", // Aqua Mist
        "#FFEBCD", // Blanched Almond
        "#E8F5E9", // Honeydew
        "#F3E5F5", // Lavender Mist
        "#E1F5FE", // Sky Blue
        "#FFE8D6", // Peach Cream
        "#F9FBE7", // Light Lime
        "#FCE4EC", // Light Rose
        "#B3E5FC", // Light Azure
        "#FFDAB9", // Peach Puff
        "#FFFDE7", // Lemon Chiffon
        "#E1BEE7", // Lilac
        "#E0F2F1", // Mint Ice
        "#FFF8E7", // Cream
        "#F0F4C3", // Light Yellow
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};
