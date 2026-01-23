/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { fetchServices } from "../store/slices/servicesSlice";

const Services = () => {
    const dispatch = useDispatch();
    const { services, loading, error } = useSelector((state) => state.service);

    useEffect(() => {
        if (services.length === 0 && !loading) {
            dispatch(fetchServices());
        }
    }, [dispatch]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-20">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Services</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
                    <button
                        onClick={() => dispatch(fetchServices())}
                        className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-20">
            <div className="max-w-3xl mb-12 animate-slide-up">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Services</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                    Professional web development services tailored to your needs.
                </p>
            </div>

            {services.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all animate-scale-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="text-4xl mb-4">{service.icon || "💼"}</div>
                            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">{service.description}</p>
                            <div className="mb-6">
                                <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                                    ${service.starting_price}
                                </span>
                                <span className="text-gray-600 dark:text-gray-400 ml-2">
                                    {service.pricing_type === "hourly" ? "/hour" : "starting"}
                                </span>
                            </div>
                            {service?.features && (
                                <ul className="space-y-2 mb-6">
                                    {service?.features.slice(0, 4).map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="text-primary-600 dark:text-primary-400">✓</span>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <button className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors">
                                Get Started
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">No services available</p>
                </div>
            )}
        </div>
    );
};

export default Services;
