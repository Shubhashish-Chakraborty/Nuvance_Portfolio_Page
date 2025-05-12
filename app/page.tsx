"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from "next/navigation";

import Image from 'next/image';
import { BACKEND_URL } from './config';

interface Project {
    id: number;
    title: string;
    description: string;
    testimonial: string;
    videoUrl: string;
    websiteUrl: string;
    createdAt: string;
}

export default function Home() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const [isHovering, setIsHovering] = useState(false);



    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/portfolio`);
                setProjects(response.data);
            } catch (err) {
                setError('Something is Up with the Server!. Please try again later.');
                console.error('Error fetching projects:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="relative min-h-screen bg-mainBgColor overflow-hidden">
            {/* Background effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ duration: 1 }}
                    className="absolute animate-pulse bottom-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-cyan-300/80 blur-[80px] md:blur-[150px]"
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1.2 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="absolute animate-pulse top-0 left-0 w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full bg-blue-500/40 blur-[60px] md:blur-[120px]"
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 2.4 }}
                    transition={{ duration: 2, delay: 1 }}
                    className="absolute animate-pulse top-1/2 left-1/2 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full bg-red-500/40 blur-[50px] md:blur-[100px] transform -translate-x-1/2 -translate-y-1/2"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex items-center justify-center mt-10">
                    <div onClick={() => router.push("/")} className="cursor-pointer">
                        <Image src="/NuvanceLogo.png" alt="CompanyLogo" width={42} height={52} />
                    </div>
                    <div
                        className="text-xl md:text-2xl cursor-pointer font-bold ml-3 text-black relative"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        onClick={() => router.push("/")}
                    >
                        Nuvance Technologies
                        <span className={`absolute bottom-0 left-0 h-0.5 bg-black transition-all duration-300 ease-in-out ${isHovering ? 'w-full' : 'w-0'}`}></span>
                    </div>
                </div>

                <div className="mt-20 text-center animate-bounce">
                    <span className="bg-gradient-to-r text-2xl md:text-4xl font-extrabold from-black via-blue-600 to-slate-800 bg-clip-text text-transparent decoration-cyan-800 cursor-pointer hover:underline">
                        Turning Ideas into Impact: Explore Our Innovative Creations
                    </span>
                </div>

                {/* Loading State - Replace this with your Loader component */}
                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-10 text-red-500 font-medium">
                        {error}
                    </div>
                )}

                {/* Projects List */}
                <div className="py-10 space-y-20">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
                        >
                            {/* Video - Left/Right Alternating */}
                            <div className="w-full md:w-1/2">
                                <video
                                    controls
                                    className="w-full rounded-lg shadow-xl"
                                // poster={`${project.videoUrl}?thumbnail=1`}
                                >
                                    <source src={project.videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>

                            {/* Project Details - Right/Left Alternating */}
                            <div className="w-full md:w-1/2 cursor-pointer space-y-4">
                                <h2 className="text-2xl md:text-3xl text-center md:text-left font-bold text-gray-800">
                                    {project.title}
                                </h2>

                                <p className="text-gray-600 md:text-left text-center font-bold">
                                    {project.description}
                                </p>

                                <blockquote className="p-4 bg-gray-100 rounded-lg border-l-4 border-blue-500">
                                    <p className="italic text-gray-700">&quot;{project.testimonial}&quot;</p>
                                </blockquote>

                                <div className="pt-4 flex justify-center md:justify-start">
                                    <Link
                                        href={project.websiteUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        Visit Project
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}