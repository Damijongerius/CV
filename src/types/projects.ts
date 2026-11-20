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

export type ProjectPostType = "update" | "problem" | "solution" | "milestone";

export interface ProjectPost {
    /** Unique within the project, used for #anchors */
    id: string;
    /** ISO date, e.g. "2026-11-19" */
    date: string;
    title: string;
    type: ProjectPostType;
    /** Paragraphs. Lines starting with "- " are rendered as bullet points, ``` blocks as code. */
    content: string[];
    tags?: string[];
}

export interface DiagramNode {
    label: string;
    /** Shown when the node is clicked */
    note?: string;
    /** Highlight as swappable / replaceable */
    swappable?: boolean;
}

export interface DiagramLayer {
    id: string;
    title: string;
    subtitle?: string;
    /** HSL triplet, e.g. "270 70% 60%" */
    color: string;
    nodes: DiagramNode[];
}

/** A layered architecture diagram - shows structure without any source code */
export interface ProjectDiagram {
    title: string;
    caption?: string;
    layers: DiagramLayer[];
    stats?: { label: string; value: string }[];
}

export interface ProjectDetails {
    /** The origin story: paragraphs shown above the goal/features grid */
    story?: string[];
    /** Why this project exists */
    goal?: string;
    /** Bullet list of key features */
    features?: string[];
    /** Short notes on how it's built */
    architecture?: string;
    /** What's next */
    roadmap?: string[];
}

export interface Project {
    /** URL slug for /projects/:slug */
    slug: string;
    title: string;
    description: string;
    longDescription?: string;
    technologies: Technology[];
    images?: string[];
    badge?: Badge[];
    image?: string;
    liveUrl?: string;
    githubUrl?: string;
    /** e.g. "2026 - Present" */
    period?: string;
    details?: ProjectDetails;
    /** Optional architecture graph shown on the project page */
    diagram?: ProjectDiagram;
    /** Dev-log / blog posts: updates, problems and solutions */
    posts?: ProjectPost[];
}

export interface ProjectsCarouselProps {
    autoSlideInterval?: number;
}
