/** @format */

// src/pages/Contact.jsx
import { CheckCircle, Github, Linkedin, Loader2, Mail, MapPin, Phone, Send, Twitter } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { submitContactForm } from "../utils/api";

const Contact = () => {
    const { profile } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleFocus = (fieldName) => {
        setFocusedField(fieldName);
    };

    const handleBlur = (fieldName) => {
        if (!formData[fieldName]) {
            setFocusedField(null);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!formData.subject.trim()) {
            newErrors.subject = "Subject is required";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        } else if (formData.message.trim().length < 10) {
            newErrors.message = "Message must be at least 10 characters";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        setErrors({});

        try {
            const response = await submitContactForm(formData);

            if (response.success) {
                setIsSuccess(true);
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: "",
                });
                setFocusedField(null);
            }
        } catch (error) {
            if (error.errors) {
                setErrors(error.errors);
            } else {
                setErrors({
                    submit: error.message || "Something went wrong. Please try again.",
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-20">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                        Get In Touch
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Have a project in mind? Let's work together to create something amazing!
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Contact Info - Left Side */}
                    <div className="lg:col-span-2 space-y-6 opacity-0 animate-[slideUp_0.8s_ease-out_0.2s_forwards]">
                        {/* Contact Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                                Contact Information
                            </h3>

                            <div className="space-y-5">
                                {/* Email */}
                                <a
                                    href={`mailto:${profile?.email || "bhaskar.s.bist@gmail.com"}`}
                                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 group"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Email</p>
                                        <p className="text-gray-900 dark:text-white font-medium break-all">
                                            {profile?.email || "bhaskar.s.bist@gmail.com"}
                                        </p>
                                    </div>
                                </a>

                                {/* Phone */}
                                <div className="flex items-start gap-4 p-4 rounded-xl">
                                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Phone</p>
                                        <p className="text-gray-900 dark:text-white font-medium">+91 98765 43210</p>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-start gap-4 p-4 rounded-xl">
                                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Location</p>
                                        <p className="text-gray-900 dark:text-white font-medium">
                                            {profile?.location || "Delhi, India"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Connect on social media</p>
                                <div className="flex gap-3">
                                    {profile?.github_url && (
                                        <a
                                            href={profile.github_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:scale-110 transition-all duration-200"
                                        >
                                            <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                        </a>
                                    )}
                                    {profile?.linkedin_url && (
                                        <a
                                            href={profile.linkedin_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:scale-110 transition-all duration-200"
                                        >
                                            <Linkedin className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                        </a>
                                    )}
                                    {profile?.twitter_url && (
                                        <a
                                            href={profile.twitter_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:scale-110 transition-all duration-200"
                                        >
                                            <Twitter className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Availability Badge */}
                            {profile?.availability_status === "available" && (
                                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                        <span className="text-green-700 dark:text-green-400 font-medium text-sm">
                                            Available for work
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contact Form - Right Side */}
                    <div className="lg:col-span-3 opacity-0 animate-[slideUp_0.8s_ease-out_0.4s_forwards]">
                        {!isSuccess ? (
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                                    Send me a message
                                </h3>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name */}
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            onFocus={() => handleFocus("name")}
                                            onBlur={() => handleBlur("name")}
                                            className={`w-full px-4 pt-6 pb-2 rounded-lg border ${
                                                errors.name
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "border-gray-300 dark:border-gray-600"
                                            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent transition-all duration-200 peer outline-none`}
                                            placeholder=" "
                                            disabled={isSubmitting}
                                        />
                                        <label
                                            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                                                focusedField === "name" || formData.name
                                                    ? "top-2 text-xs text-primary-600 dark:text-primary-400"
                                                    : "top-4 text-base text-gray-500 dark:text-gray-400"
                                            }`}
                                        >
                                            Your Name <span className="text-red-500">*</span>
                                        </label>
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-500 animate-[fadeIn_0.3s_ease-out]">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div className="relative">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            onFocus={() => handleFocus("email")}
                                            onBlur={() => handleBlur("email")}
                                            className={`w-full px-4 pt-6 pb-2 rounded-lg border ${
                                                errors.email
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "border-gray-300 dark:border-gray-600"
                                            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent transition-all duration-200 peer outline-none`}
                                            placeholder=" "
                                            disabled={isSubmitting}
                                        />
                                        <label
                                            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                                                focusedField === "email" || formData.email
                                                    ? "top-2 text-xs text-primary-600 dark:text-primary-400"
                                                    : "top-4 text-base text-gray-500 dark:text-gray-400"
                                            }`}
                                        >
                                            Your Email <span className="text-red-500">*</span>
                                        </label>
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-500 animate-[fadeIn_0.3s_ease-out]">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Phone */}
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            onFocus={() => handleFocus("phone")}
                                            onBlur={() => handleBlur("phone")}
                                            className="w-full px-4 pt-6 pb-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent transition-all duration-200 peer outline-none"
                                            placeholder=" "
                                            disabled={isSubmitting}
                                        />
                                        <label
                                            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                                                focusedField === "phone" || formData.phone
                                                    ? "top-2 text-xs text-primary-600 dark:text-primary-400"
                                                    : "top-4 text-base text-gray-500 dark:text-gray-400"
                                            }`}
                                        >
                                            Phone Number (Optional)
                                        </label>
                                    </div>

                                    {/* Subject */}
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            onFocus={() => handleFocus("subject")}
                                            onBlur={() => handleBlur("subject")}
                                            className={`w-full px-4 pt-6 pb-2 rounded-lg border ${
                                                errors.subject
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "border-gray-300 dark:border-gray-600"
                                            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent transition-all duration-200 peer outline-none`}
                                            placeholder=" "
                                            disabled={isSubmitting}
                                        />
                                        <label
                                            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                                                focusedField === "subject" || formData.subject
                                                    ? "top-2 text-xs text-primary-600 dark:text-primary-400"
                                                    : "top-4 text-base text-gray-500 dark:text-gray-400"
                                            }`}
                                        >
                                            Subject <span className="text-red-500">*</span>
                                        </label>
                                        {errors.subject && (
                                            <p className="mt-1 text-sm text-red-500 animate-[fadeIn_0.3s_ease-out]">
                                                {errors.subject}
                                            </p>
                                        )}
                                    </div>

                                    {/* Message */}
                                    <div className="relative">
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            onFocus={() => handleFocus("message")}
                                            onBlur={() => handleBlur("message")}
                                            rows="5"
                                            className={`w-full px-4 pt-6 pb-2 rounded-lg border ${
                                                errors.message
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "border-gray-300 dark:border-gray-600"
                                            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent transition-all duration-200 resize-none peer`}
                                            placeholder=" "
                                            disabled={isSubmitting}
                                        />
                                        <label
                                            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                                                focusedField === "message" || formData.message
                                                    ? "top-2 text-xs text-primary-600 dark:text-primary-400"
                                                    : "top-4 text-base text-gray-500 dark:text-gray-400"
                                            }`}
                                        >
                                            Message <span className="text-red-500">*</span>
                                        </label>
                                        {errors.message && (
                                            <p className="mt-1 text-sm text-red-500 animate-[fadeIn_0.3s_ease-out]">
                                                {errors.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Submit Error */}
                                    {errors.submit && (
                                        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg animate-[fadeIn_0.3s_ease-out]">
                                            <p className="text-sm text-red-600 dark:text-red-400">{errors.submit}</p>
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 animate-[fadeIn_0.5s_ease-out]">
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-[scale-in_0.5s_ease-out]">
                                        <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        Thank You! 🎉
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                                        Your message has been sent successfully! I'll get back to you as soon as
                                        possible.
                                    </p>
                                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg mb-6">
                                        <p className="text-sm text-blue-700 dark:text-blue-400">
                                            📧 A confirmation email has been sent to your inbox with a copy of your
                                            message.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setIsSuccess(false)}
                                        className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
