import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project, ProjectsCarouselProps } from "@/types/projects.ts";
import ProjectSlide from "@/components/ui/ProjectSlide.tsx";

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? "100%" : "-100%",
        opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
        x: direction < 0 ? "100%" : "-100%",
        opacity: 0,
    }),
};

const projects: Project[] = [
    {
        title: "Minecraft EpicKingdom Manager",
        description: "a minecraft plugin for managing extensions",
        longDescription: "I am building a Minecraft plugin called EpicKingdom using Java and the Paper API. This plugin is designed for managing kingdoms and adding kingdom content in an easy manor where you don't have to repeat yourself",
        technologies: [
            { name: "Java", icon: "Coffee", color: "30 85% 45%" },
            { name: "SQL", icon: "Database", color: "210 90% 42%" },
            { name: "Pterodactyl", icon: "Server", color: "170 65% 40%" },
        ],
        badge: [
            { text: "Work in progress", backgroundColor: "hsl(30 100% 50% / 0.75)", textColor: "hsl(0 0% 100%)" },
            { text: "V.0.4.0", backgroundColor: "hsl(0 0% 100% / 0.75)", textColor: "hsl(220 15% 20%)" },
        ],
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop",
    },
    {
        title: "My-CV",
        description: "My personal CV website",
        longDescription: "Developed a personal CV website using React, Tailwind CSS, and Vite.js. The site features a clean, responsive design and showcases my skills, projects, and experience effectively.",
        technologies: [
            { name: "React", icon: "Atom", color: "190 90% 62%" },
            { name: "HTML", icon: "Code", color: "14 78% 52%" },
            { name: "Tailwind", icon: "FlaskConical", color: "174 57% 47%" },
            { name: "Vite.js", icon: "Triangle", color: "245 70% 60%" },
            { name: "TypeScript", icon: "Code", color: "210 68% 46%" },
        ],
        badge: [
            { text: "Live", backgroundColor: "hsl(140 100% 40% / 0.75)", textColor: "hsl(0 0% 100%)" },
            { text: "V.1.0.0", backgroundColor: "hsl(0 0% 100% / 0.75)", textColor: "hsl(220 15% 20%)" }
        ],
        image: "images/cv-website.png",
        githubUrl: "https://github.com/Damijongerius/CV",
    },
    {
        title: "MediaBase",
        description: "My webProject for storing all familly images",
        longDescription: "MediaBase is a web application designed to store and manage family photos and videos. Built with Go for the backend and React for the frontend, it offers features like face recognition, easy organization, and secure storage using Postgres and Docker on a Raspberry Pi server.",
        technologies: [
            { name: "Go", icon: "Hexagon", color: "197 78% 45%" },
            { name: "React", icon: "Atom", color: "200 92% 56%" },
            { name: "Face-Recognition", icon: "Brain", color: "260 60% 58%" },
            { name: "Postgress", icon: "Database", color: "210 90% 40%" },
            { name: "Docker", icon: "Container", color: "198 95% 37%" },
            { name: "Raspberry-PI", icon: "Grape", color: "344 65% 45%" },
        ],
        badge: [
            { text: "Work in progress", backgroundColor: "hsl(30 100% 50% / 0.75)", textColor: "hsl(0 0% 100%)" },
            { text: "V.0.2.1", backgroundColor: "hsl(0 0% 100% / 0.75)", textColor: "hsl(220 15% 20%)" }
        ],
        image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop",
    },
    {
        title: "HU Planner",
        description: "A Planner for projects implementing HBO-I standards",
        longDescription: "HU Planner is a project management tool tailored for HBO-I standards, developed using React and Go. It features task tracking, team collaboration, and progress visualization to streamline project workflows in educational settings.",
        technologies: [
            { name: "Go", icon: "Hexagon", color: "197 78% 45%" },
            { name: "React", icon: "Atom", color: "200 92% 56%" },
            { name: "SQLite", icon: "Database", color: "210 90% 42%" },
        ],
        badge: [
            { text: "Work in progress", backgroundColor: "hsl(30 100% 50% / 0.75)", textColor: "hsl(0 0% 100%)" },
            { text: "V.0.1.5", backgroundColor: "hsl(0 0% 100% / 0.75)", textColor: "hsl(220 15% 20%)" }
        ],
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop",
    }
];

export default function ProjectsSection({ autoSlideInterval = 15000 }: ProjectsCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [imageIndex, setImageIndex] = useState(0);

    const [manualPause, setManualPause] = useState(false);
    const [showGuidance, setShowGuidance] = useState(true);

    const resumeTimerRef = useRef<number | null>(null);
    const autoTimerRef = useRef<number | null>(null);

    const registerUserInteraction = useCallback(() => {
        setManualPause(true);
        // hide the guidance on first interaction
        setShowGuidance(false);
        if (resumeTimerRef.current) {
            window.clearTimeout(resumeTimerRef.current);
        }
        resumeTimerRef.current = window.setTimeout(() => {
            setManualPause(false);
            resumeTimerRef.current = null;
        }, 15000); // 15 seconds pause after user interaction
    }, []);

    const navigate = useCallback(
        (newDirection: number) => {
            setDirection(newDirection);
            setCurrentIndex((prev) => {
                if (newDirection > 0) return prev === projects.length - 1 ? 0 : prev + 1;
                return prev === 0 ? projects.length - 1 : prev - 1;
            });
            setImageIndex(0);
        },
        []
    );

    useEffect(() => {
        if (manualPause) {
            if (autoTimerRef.current) {
                clearInterval(autoTimerRef.current);
                autoTimerRef.current = null;
            }
            return;
        }

        autoTimerRef.current = window.setInterval(() => navigate(1), autoSlideInterval);
        return () => {
            if (autoTimerRef.current) {
                clearInterval(autoTimerRef.current);
                autoTimerRef.current = null;
            }
        };
    }, [navigate, autoSlideInterval, manualPause]);

    useEffect(() => {
        return () => {
            if (resumeTimerRef.current) {
                window.clearTimeout(resumeTimerRef.current);
                resumeTimerRef.current = null;
            }
            if (autoTimerRef.current) {
                window.clearInterval(autoTimerRef.current);
                autoTimerRef.current = null;
            }
        };
    }, []);

    const goToSlide = (index: number) => {
        registerUserInteraction();
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
        setImageIndex(0);
    };

    if (projects.length === 0) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">No projects to display</p>
            </div>
        );
    }

    const project = projects[currentIndex];
    const projectImages = project.images?.length ? project.images : project.image ? [project.image] : [];
    const hasMultipleImages = projectImages.length > 1;

    const navigateImage = (dir: number) => {
        registerUserInteraction();
        setImageIndex((prev) => {
            if (dir > 0) return prev === projectImages.length - 1 ? 0 : prev + 1;
            return prev === 0 ? projectImages.length - 1 : prev - 1;
        });
    };

    return (
        <div className="relative w-full h-full flex flex-col">
            <div className="flex-1 relative overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{type: "tween", duration: 0.4, ease: "easeInOut"}}
                        className="absolute inset-0 flex flex-col lg:flex-row"
                        drag="x"
                        dragConstraints={{left: 0, right: 0}}
                        dragElastic={0.25}
                        onDragEnd={(_, info) => {
                            const threshold = 100;
                            if (info.offset.x < -threshold) {
                                registerUserInteraction();
                                navigate(1);
                            } else if (info.offset.x > threshold) {
                                registerUserInteraction();
                                navigate(-1);
                            }
                        }}
                    >
                        <ProjectSlide
                            project={project}
                            projectImages={projectImages}
                            imageIndex={imageIndex}
                            setImageIndex={(i: number) => {
                                setImageIndex(i);
                                registerUserInteraction();
                            }}
                            navigateImage={navigateImage}
                            hasMultipleImages={hasMultipleImages}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Guidance cursor shown only until first interaction */}
                {showGuidance && (
                    <div
                        className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 lg:px-12">
                        <motion.div
                            aria-hidden
                            className="pointer-events-none flex items-center gap-3"
                            initial={{opacity: 0}}
                            animate={{opacity: [0, 1, 0.9]}}
                            transition={{duration: 0.6}}
                        >
                            <motion.img
                                src="icons/mouse.svg"
                                alt=""
                                className="w-14 h-14"
                                animate={{x: [-56, 56, -56], rotate: [-8, 8, -8], opacity: [0.6, 1, 0.9]}}
                                transition={{repeat: Infinity, duration: 1.6, ease: "easeInOut"}}
                            />
                        </motion.div>
                    </div>
                )}
            </div>

            { /* Pagination Dots */}
            <div className="flex justify-center gap-2 py-6 bg-background/10">
                {projects.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-foreground w-8" : "bg-muted-foreground/50 hover:bg-muted-foreground"}`}
                        aria-label={`Go to project ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
