import React from "react";
import { motion } from "framer-motion";
import ImageGallery from "./ImageGallery";
import TechPill from "./TechPill";
import ProjectLinks from "./ProjectLinks";
import type {Badge, Project} from "@/types/projects.ts";

interface Props {
    project: Project;
    projectImages: string[];
    imageIndex: number;
    setImageIndex: React.Dispatch<React.SetStateAction<number>>;
    navigateImage: (dir: number) => void;
    hasMultipleImages: boolean;
}

export default function ProjectSlide({ project, projectImages, imageIndex, setImageIndex, navigateImage, hasMultipleImages }: Props) {
    return (
        <div className="flex flex-col lg:flex-row h-full">
            <div
                className="w-full lg:w-1/2 h-[40vh] lg:h-full relative flex items-center justify-center p-6 lg:p-16 min-h-[240px]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"/>
                <ImageGallery
                    projectImages={projectImages}
                    imageIndex={imageIndex}
                    setImageIndex={setImageIndex}
                    navigateImage={navigateImage}
                    hasMultipleImages={hasMultipleImages}
                    projectTitle={project.title}
                />
            </div>

            <div
                className="w-full lg:w-1/2 h-auto lg:h-full flex flex-col justify-center p-4 lg:p-12 bg-white/10 backdrop-blur-sm">
                <div className="w-full max-h-[56vh] lg:max-h-none overflow-y-auto pr-2 pb-12">
                    <motion.div>
                        {project.badge && project.badge.length > 0 && (
                            <motion.div initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}}
                                        transition={{delay: 0.1}}
                                        className="flex flex-wrap gap-2 mb-4">
                                {project.badge.map((badge: Badge) => (
                                    <span
                                        key={badge.text}
                                        className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent"
                                        style={(badge.textColor || badge.backgroundColor) ? {
                                            color: badge.textColor,
                                            backgroundColor: badge.backgroundColor
                                        } : undefined}
                                    >
                            {badge.text}
                        </span>
                                ))}
                            </motion.div>
                        )}

                    </motion.div>
                    <motion.h2 initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.2}}
                               className="text-2xl sm:text-3xl lg:text-5xl font-bold text-foreground mb-3">
                        {project.title}
                    </motion.h2>

                    <motion.p initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.3}}
                              className="text-muted-foreground text-sm sm:text-base lg:text-lg mb-8 leading-relaxed">
                        {project.longDescription || project.description}
                    </motion.p>

                    <motion.div initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.4}}
                                className="flex flex-wrap gap-2 mb-8">
                        {project.technologies.map((tech) => (
                            <TechPill key={tech.name} tech={tech}/>
                        ))}
                    </motion.div>

                    <motion.div initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.5}}
                                className="flex flex-wrap gap-4 mt-2">
                        <ProjectLinks liveUrl={project.liveUrl} githubUrl={project.githubUrl}/>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
