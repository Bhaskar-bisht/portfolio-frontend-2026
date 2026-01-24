/** @format */

// src/App.jsx
import { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Loader from "./components/Loader";
import ThemeTransition from "./components/ThemeTransition";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const SocialLink = lazy(() => import("./pages/SocialLink"));
const Education = lazy(() => import("./pages/Education"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
    return (
        <Router>
            <ThemeTransition />
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="projects" element={<Projects />} />
                        <Route path="projects/:slug" element={<ProjectDetail />} />
                        <Route path="about" element={<About />} />
                        <Route path="blog" element={<Blog />} />
                        <Route path="blog/:slug" element={<BlogDetail />} />
                        <Route path="services" element={<Services />} />
                        <Route path="social-links" element={<SocialLink />} />
                        <Route path="education" element={<Education />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
