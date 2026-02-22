/** @format */

import { API_ROUTES } from "./apiRoutes";

// Development: /api (Vite proxy use karega)
// Production: full URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/portfolio";
// Generic API fetch function
export const fetchFromAPI = async (endpoint) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            headers: {
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        throw error;
    }
};

// Generic POST API function
export const postToAPI = async (endpoint, data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (!response.ok) {
            // Handle validation errors
            if (response.status === 422 && responseData.errors) {
                throw {
                    errors: responseData.errors,
                    message: responseData.message || "Validation failed",
                };
            }

            // Handle other errors
            throw {
                message: responseData.message || `API Error: ${response.statusText}`,
            };
        }

        return responseData;
    } catch (error) {
        console.error(`Error posting to ${endpoint}:`, error);
        throw error;
    }
};

// Specific API call functions
export const getProfileData = () => fetchFromAPI(API_ROUTES.profile);
export const getSkillsData = () => fetchFromAPI(API_ROUTES.skills);
export const getEducationData = () => fetchFromAPI(API_ROUTES.education);
export const getExperienceData = () => fetchFromAPI(API_ROUTES.experience);
export const getProjectsData = () => fetchFromAPI(API_ROUTES.projects);
export const getProjectDetail = (slug) => fetchFromAPI(`${API_ROUTES.projectDetail}${slug}`);
export const getBlogsData = () => fetchFromAPI(API_ROUTES.blogs);
export const getServicesData = () => fetchFromAPI(API_ROUTES.services);
export const getTechnologiesData = () => fetchFromAPI(API_ROUTES.technologies);
export const getSocialLinks = () => fetchFromAPI(API_ROUTES.socialLinks);

// Contact form submission
export const submitContactForm = (formData) => postToAPI("contact", formData);
