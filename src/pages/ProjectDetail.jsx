/** @format */

import {
    ArrowLeft,
    Calendar,
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    Eye,
    Github,
    Grid3x3,
    Heart,
    Layers,
    Users,
    X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Badge from "../components/Badge";
import MagneticButton from "../components/MagneticButton";
import { fetchProjectDetail, resetProjectDetailState } from "../store/slices/projectDetailSlice";

const ProjectDetail = () => {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const { projectDetail, loading, error } = useSelector((state) => state.projectDetail);

    const [currentSlide, setCurrentSlide] = useState(0);
    const [viewMode, setViewMode] = useState("preview");
    const [selectedImage, setSelectedImage] = useState(null);
    const sliderRef = useRef(null);

    // Get all images (banner + gallery)
    const allImages = projectDetail
        ? [
              { id: "banner", url: projectDetail.banner, thumb: projectDetail.banner, name: "Banner" },
              ...(projectDetail.gallery || []),
          ]
        : [];

    useEffect(() => {
        if (slug) {
            dispatch(fetchProjectDetail(slug));
        }

        return () => {
            dispatch(resetProjectDetailState());
        };
    }, [slug, dispatch]);

    // Scroll to active slide
    useEffect(() => {
        if (sliderRef.current && viewMode === "preview") {
            const activeThumb = sliderRef.current.children[currentSlide];
            if (activeThumb) {
                activeThumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
            }
        }
    }, [currentSlide, viewMode]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % allImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + allImages.length) % allImages.length);
    };

    const getOpacity = (index) => {
        const diff = Math.abs(index - currentSlide);
        if (diff === 0) return 1;
        if (diff === 1) return 0.7;
        if (diff === 2) return 0.4;
        return 0.2;
    };

    const getScale = (index) => {
        const diff = Math.abs(index - currentSlide);
        if (diff === 0) return 1.1;
        if (diff === 1) return 0.95;
        return 0.85;
    };

    const openModal = (image, index) => {
        setSelectedImage(image);
        setCurrentSlide(index);
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        setSelectedImage(null);
        document.body.style.overflow = "unset";
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedImage) return;
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowRight") nextSlide();
            if (e.key === "ArrowLeft") prevSlide();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedImage, currentSlide]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-20">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400"></div>
                        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading project details...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-20">
                <Link
                    to="/projects"
                    className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline mb-8"
                >
                    <ArrowLeft className="mr-2 w-5 h-5" />
                    Back to Projects
                </Link>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
                    <p className="text-red-600 dark:text-red-400">Error: {error}</p>
                </div>
            </div>
        );
    }

    if (!projectDetail) {
        return (
            <div className="container mx-auto px-4 py-20">
                <Link
                    to="/projects"
                    className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline mb-8"
                >
                    <ArrowLeft className="mr-2 w-5 h-5" />
                    Back to Projects
                </Link>
                <div className="text-center text-gray-500 dark:text-gray-400 min-h-[400px] flex items-center justify-center">
                    <p>Project not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        to="/projects"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
                    >
                        <ArrowLeft className="mr-2 w-5 h-5" />
                        Back to Projects
                    </Link>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {projectDetail.categories?.map((category) => (
                            <Badge
                                key={category.id}
                                text={category.name}
                                variant="custom"
                                customColor={category.color_code}
                            />
                        ))}
                        <Badge
                            text={projectDetail.status}
                            variant={projectDetail.status === "completed" ? "green" : "yellow"}
                        />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        {projectDetail.title}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">{projectDetail.short_description}</p>

                    <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            <span>{projectDetail.views_count} views</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Heart className="w-4 h-4" />
                            <span>{projectDetail.likes_count} likes</span>
                        </div>
                    </div>
                </div>

                {/* View Mode Toggle */}
                <div className="mb-8 flex items-center gap-3">
                    <div className="relative inline-flex bg-gray-200 dark:bg-gray-800 rounded-xl p-1 shadow-inner">
                        <div
                            className="absolute top-1 bottom-1 bg-white dark:bg-gray-700 rounded-lg shadow-md transition-all duration-300 ease-in-out"
                            style={{
                                left: viewMode === "preview" ? "4px" : "50%",
                                width: "calc(50% - 4px)",
                            }}
                        />
                        <button
                            onClick={() => setViewMode("preview")}
                            className={`relative z-10 flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-300 ${
                                viewMode === "preview"
                                    ? "text-blue-600 dark:text-blue-400"
                                    : "text-gray-600 dark:text-gray-400"
                            }`}
                        >
                            <Layers className="w-5 h-5" />
                            <span className="font-medium">Preview</span>
                        </button>
                        <button
                            onClick={() => setViewMode("gallery")}
                            className={`relative z-10 flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-300 ${
                                viewMode === "gallery"
                                    ? "text-blue-600 dark:text-blue-400"
                                    : "text-gray-600 dark:text-gray-400"
                            }`}
                        >
                            <Grid3x3 className="w-5 h-5" />
                            <span className="font-medium">Gallery</span>
                        </button>
                    </div>
                </div>

                {/* Image Display */}
                {viewMode === "preview" ? (
                    <div className="mb-12">
                        {/* Main Image with Overlay */}
                        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl group">
                            <img
                                src={allImages[currentSlide]?.url || projectDetail.banner}
                                alt={allImages[currentSlide]?.name || projectDetail.title}
                                className="w-full h-[500px] md:h-[600px] object-cover transition-transform duration-700"
                            />

                            {/* Navigation Arrows */}
                            {allImages.length > 1 && (
                                <>
                                    <button
                                        onClick={prevSlide}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={nextSlide}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </>
                            )}

                            {/* Bottom Overlay with Thumbnails */}
                            {allImages.length > 1 && (
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-32 pb-6">
                                    <div className="relative px-4 overflow-hidden">
                                        <div
                                            ref={sliderRef}
                                            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-[calc(50%-80px)] py-2"
                                        >
                                            {allImages.map((image, index) => (
                                                <button
                                                    key={image.id}
                                                    onClick={() => setCurrentSlide(index)}
                                                    className="flex-shrink-0 relative transition-all duration-500 ease-out rounded-lg"
                                                    style={{
                                                        opacity: getOpacity(index),
                                                        transform: `scale(${getScale(index)})`,
                                                    }}
                                                >
                                                    <div
                                                        className={`relative rounded-lg overflow-hidden ${
                                                            index === currentSlide
                                                                ? "ring-4 ring-white shadow-2xl"
                                                                : "ring-2 ring-white/30"
                                                        }`}
                                                    >
                                                        <img
                                                            src={image.thumb}
                                                            alt={image.name}
                                                            className="w-32 h-20 md:w-40 md:h-24 object-cover rounded-lg"
                                                        />
                                                    </div>
                                                </button>
                                            ))}
                                        </div>

                                        {/* Image Counter */}
                                        <div className="text-center mt-4">
                                            <span className="text-white/90 text-sm font-medium bg-black/40 px-4 py-1 rounded-full backdrop-blur-sm">
                                                {currentSlide + 1} / {allImages.length}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="mb-12 w-full lg:w-[60%] mx-auto">
                        <div className="columns-1 sm:columns-2 gap-4 space-y-4">
                            {allImages.map((image, index) => (
                                <div
                                    key={image.id}
                                    className="break-inside-avoid group cursor-pointer"
                                    onClick={() => openModal(image, index)}
                                >
                                    <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                                        <img
                                            src={image.url}
                                            alt={image.name}
                                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                                <p className="text-white font-medium">{image.name}</p>
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                                                <Eye className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Modal */}
                {selectedImage && (
                    <div
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fadeIn"
                        onClick={closeModal}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        {allImages.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        prevSlide();
                                    }}
                                    className="absolute left-4 text-white hover:text-gray-300 transition-colors z-50 bg-black bg-opacity-50 rounded-full p-2"
                                >
                                    <ChevronLeft className="w-8 h-8" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        nextSlide();
                                    }}
                                    className="absolute right-4 text-white hover:text-gray-300 transition-colors z-50 bg-black bg-opacity-50 rounded-full p-2"
                                >
                                    <ChevronRight className="w-8 h-8" />
                                </button>
                            </>
                        )}

                        <div className="relative max-w-7xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                            <img
                                src={selectedImage.url}
                                alt={selectedImage.name}
                                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                            />
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full">
                                {currentSlide + 1} / {allImages.length}
                            </div>
                        </div>
                    </div>
                )}

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About the Project</h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                {projectDetail.full_description}
                            </p>
                        </div>

                        {/* Features */}
                        {projectDetail.features && projectDetail.features.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Features</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {projectDetail.features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg hover:shadow-lg transition-all duration-300"
                                        >
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                                {feature.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                {feature.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Technologies */}
                        {projectDetail.technologies && projectDetail.technologies.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Technologies</h2>
                                <div className="flex flex-wrap gap-3">
                                    {projectDetail.technologies.map((tech, index) => (
                                        <div
                                            key={index}
                                            // className="bg-purple-50 dark:bg-purple-900/20 px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Badge text={`${tech.name}`} variant="blue" size="md" />
                                                {/* <span className="font-medium text-gray-900 dark:text-white">
                                                    {tech.name}
                                                </span> */}
                                                {/* <Badge text={`${tech.usage_percentage}%`} variant="blue" size="sm" /> */}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Testimonials */}
                        {/* {projectDetail.testimonials && projectDetail.testimonials.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    Client Feedback
                                </h2>
                                {projectDetail.testimonials.map((testimonial, index) => (
                                    <div
                                        key={index}
                                        className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg mb-4"
                                    >
                                        <div className="flex items-center gap-1 mb-3">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                                            "{testimonial.content}"
                                        </p>
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                {testimonial.name}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {testimonial.position} at {testimonial.company}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )} */}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Project Details</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                                        <p className="text-gray-900 dark:text-white font-medium">
                                            {projectDetail.started_at} {" to "}
                                            {projectDetail.completed_at}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Users className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Team Size</p>
                                        <p className="text-gray-900 dark:text-white font-medium">
                                            {projectDetail.team_size} members
                                        </p>
                                    </div>
                                </div>
                                {/* <div className="flex items-start gap-3">
                                    <DollarSign className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Budget</p>
                                        <p className="text-gray-900 dark:text-white font-medium">
                                            {projectDetail.budget_range}
                                        </p>
                                    </div>
                                </div> */}
                                {projectDetail.client_name && (
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Client</p>
                                        <p className="text-gray-900 dark:text-white font-medium">
                                            {projectDetail.client_name}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Links */}
                        <div className="space-y-3">
                            {projectDetail.project_url && (
                                <MagneticButton
                                    href={projectDetail.project_url}
                                    variant="filled"
                                    className="w-full px-6 py-3 gap-2"
                                    magneticStrength={0.4}
                                >
                                    <ExternalLink className="w-5 h-5" />
                                    View Live Project
                                </MagneticButton>
                            )}

                            {projectDetail.github_url && (
                                <MagneticButton
                                    href={projectDetail.github_url}
                                    variant="outline"
                                    className="w-full px-6 py-3 gap-2 bg-gray-900 dark:bg-gray-800 text-white border-gray-900 dark:border-gray-700 hover:bg-gray-800 dark:hover:bg-gray-700"
                                    magneticStrength={0.4}
                                >
                                    <Github className="w-5 h-5" />
                                    View on GitHub
                                </MagneticButton>
                            )}

                            {projectDetail.demo_url && (
                                <MagneticButton
                                    href={projectDetail.demo_url}
                                    variant="outline"
                                    className="w-full px-6 py-3 gap-2"
                                    magneticStrength={0.4}
                                >
                                    <ExternalLink className="w-5 h-5" />
                                    View Demo
                                </MagneticButton>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default ProjectDetail;
