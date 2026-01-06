// File: src/types/projects.ts
export interface Technology {
    name: string;
    icon?: string;
    color?: string;
}

export interface Badge{
    text: string;
    textColor?: string;
    backgroundColor?: string;
}

export interface Project {
    title: string;
    description: string;
    longDescription?: string;
    technologies: Technology[];
    images?: string[];
    badge?: Badge[];
    image?: string;
    liveUrl?: string;
    githubUrl?: string;
}

export interface ProjectsCarouselProps {
    autoSlideInterval?: number;
}
