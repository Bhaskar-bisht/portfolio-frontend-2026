/** @format */

import { API_ROUTES } from "./apiRoutes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

// Generic API fetch function
export const fetchFromAPI = async (endpoint) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`);

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

// Specific API call functions
export const getProfileData = () => fetchFromAPI(API_ROUTES.profile);
export const getSkillsData = () => fetchFromAPI(API_ROUTES.skills);
export const getEducationData = () => fetchFromAPI(API_ROUTES.education);
export const getExperienceData = () => fetchFromAPI(API_ROUTES.experience);
export const getProjectsData = () => fetchFromAPI(API_ROUTES.projects);
export const getBlogsData = () => fetchFromAPI(API_ROUTES.blogs);
export const getServicesData = () => fetchFromAPI(API_ROUTES.services);
export const getTechnologiesData = () => fetchFromAPI(API_ROUTES.technologies);
