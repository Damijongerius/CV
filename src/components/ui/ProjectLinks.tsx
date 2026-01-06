import React from "react";
import { ExternalLink, Github } from "lucide-react";

export default function ProjectLinks({ liveUrl, githubUrl }: { liveUrl?: string; githubUrl?: string }) {
    return (
        <>
            {liveUrl && (
                <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="group relative flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300">
                    <ExternalLink size={20} />
                    Live Demo
                    <span className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
            )}
            {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="group relative flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-semibold ring-2 ring-border hover:ring-primary/50 hover:-translate-y-0.5 transition-all duration-300">
                    <Github size={20} />
                    Source Code
                </a>
            )}
        </>
    );
}
