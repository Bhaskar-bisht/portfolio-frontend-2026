/** @format */

// src/pages/ProjectDetail.jsx
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const ProjectDetail = () => {
    const { slug } = useParams();

    return (
        <div className="container mx-auto px-4 py-20">
            <Link
                to="/projects"
                className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline mb-8"
            >
                <ArrowLeft className="mr-2 w-5 h-5" />
                Back to Projects
            </Link>

            {/* Project detail will go here */}
            <div className="min-h-[400px]">
                <p className="text-gray-500">Project detail for: {slug}</p>
            </div>
        </div>
    );
};

export default ProjectDetail;
