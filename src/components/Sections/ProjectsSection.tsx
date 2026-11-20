import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import type { Project, ProjectsCarouselProps } from "@/types/projects.ts";
import { projectsData } from "@/data/projects.ts";
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

const projects: Project[] = projectsData;

export default function ProjectsSection({ autoSlideInterval = 15000 }: ProjectsCarouselProps) {
    const location = useLocation();
    // When coming back from a project page, reopen the carousel on that project
    const [currentIndex, setCurrentIndex] = useState(() => {
        const slug = (location.state as { projectSlug?: string } | null)?.projectSlug;
        const idx = slug ? projects.findIndex((p) => p.slug === slug) : -1;
        return idx >= 0 ? idx : 0;
    });
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
