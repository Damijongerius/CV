import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    Github,
    Megaphone,
    Bug,
    Wrench,
    Flag,
    CalendarDays,
} from "lucide-react";
import { projectsData } from "@/data/projects.ts";
import TechPill from "@/components/ui/TechPill.tsx";
import ArchitectureDiagram from "@/components/ui/ArchitectureDiagram.tsx";
import type { ProjectPost, ProjectPostType } from "@/types/projects.ts";

const postTypeMeta: Record<ProjectPostType, { label: string; icon: typeof Bug; className: string }> = {
    update: { label: "Update", icon: Megaphone, className: "bg-sky-500/20 text-sky-200 border-sky-400/40" },
    problem: { label: "Problem", icon: Bug, className: "bg-rose-500/20 text-rose-200 border-rose-400/40" },
    solution: { label: "Solution", icon: Wrench, className: "bg-emerald-500/20 text-emerald-200 border-emerald-400/40" },
    milestone: { label: "Milestone", icon: Flag, className: "bg-amber-500/20 text-amber-200 border-amber-400/40" },
};

type Filter = "all" | ProjectPostType;

function formatDate(iso: string) {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/** Renders post paragraphs: "- " lines become bullet lists, ``` fenced blocks become code. */
function PostContent({ content }: { content: string[] }) {
    const blocks: React.ReactNode[] = [];
    let bullets: string[] = [];
    let code: string[] | null = null;

    const flushBullets = () => {
        if (bullets.length) {
            blocks.push(
                <ul key={`ul-${blocks.length}`} className="list-disc pl-6 space-y-1 text-gray-200">
                    {bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
            );
            bullets = [];
        }
    };

    content.forEach((line) => {
        if (line.trim().startsWith("```")) {
            if (code) {
                blocks.push(
                    <pre key={`pre-${blocks.length}`} className="bg-black/40 border border-white/10 rounded-lg p-4 overflow-x-auto text-xs sm:text-sm font-mono text-purple-100">
                        {code.join("\n")}
                    </pre>
                );
                code = null;
            } else {
                flushBullets();
                code = [];
            }
            return;
        }
        if (code) {
            code.push(line);
            return;
        }
        if (line.startsWith("- ")) {
            bullets.push(line.slice(2));
            return;
        }
        flushBullets();
        blocks.push(<p key={`p-${blocks.length}`} className="text-gray-200 leading-relaxed">{line}</p>);
    });
    flushBullets();

    return <div className="space-y-3 text-sm sm:text-base">{blocks}</div>;
}

function PostCard({ post }: { post: ProjectPost }) {
    const meta = postTypeMeta[post.type];
    const Icon = meta.icon;
    return (
        <article id={post.id} className="relative pl-8 scroll-mt-8">
            {/* timeline dot */}
            <span className="absolute left-0 top-1.5 w-4 h-4 -translate-x-1/2 rounded-full bg-purple-400 ring-4 ring-purple-900" />
            <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-5 sm:p-6 space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-semibold ${meta.className}`}>
                        <Icon size={13} />
                        {meta.label}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-purple-300">
                        <CalendarDays size={13} />
                        {formatDate(post.date)}
                    </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                    <a href={`#${post.id}`} onClick={(e) => { e.preventDefault(); document.getElementById(post.id)?.scrollIntoView({ behavior: "smooth" }); }} className="hover:text-purple-200">
                        {post.title}
                    </a>
                </h3>
                <PostContent content={post.content} />
                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                        {post.tags.map((t) => (
                            <span key={t} className="text-xs text-purple-300/80">#{t}</span>
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
}

export default function ProjectDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [imageIndex, setImageIndex] = useState(0);
    const [filter, setFilter] = useState<Filter>("all");

    const currentIndex = projectsData.findIndex((p) => p.slug === slug);
    const project = projectsData[currentIndex];

    useEffect(() => {
        setImageIndex(0);
        setFilter("all");
        window.scrollTo(0, 0);
    }, [slug]);

    const posts = useMemo(
        () => [...(project?.posts ?? [])].sort((a, b) => b.date.localeCompare(a.date)),
        [project]
    );
    const visiblePosts = filter === "all" ? posts : posts.filter((p) => p.type === filter);
    const availableTypes = (Object.keys(postTypeMeta) as ProjectPostType[]).filter((t) => posts.some((p) => p.type === t));

    const goBack = () => navigate("/", { state: { scrollTo: "projects", projectSlug: project?.slug } });

    if (!project) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 text-white flex flex-col items-center justify-center p-6">
                <h1 className="text-3xl font-bold mb-4">Project not found</h1>
                <button
                    onClick={() => navigate("/", { state: { scrollTo: "projects" } })}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                    <ArrowLeft size={16} />
                    <span>Back to Projects</span>
                </button>
            </div>
        );
    }

    const images = project.images?.length ? project.images : project.image ? [project.image] : [];
    const prev = currentIndex > 0 ? projectsData[currentIndex - 1] : null;
    const next = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null;
    const d = project.details;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 text-white px-4 sm:px-6 py-12 md:py-16">
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Top bar */}
                <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-6">
                    <button
                        onClick={goBack}
                        className="inline-flex items-center gap-2 text-purple-200 hover:text-white text-sm font-medium transition-transform duration-200 hover:-translate-x-1 cursor-pointer"
                    >
                        <ArrowLeft size={16} />
                        <span>Back to Projects</span>
                    </button>
                    {posts.length > 0 && (
                        <a
                            href="#devlog"
                            onClick={(e) => { e.preventDefault(); document.getElementById("devlog")?.scrollIntoView({ behavior: "smooth" }); }}
                            className="text-sm text-purple-300 hover:text-white"
                        >
                            Dev log ({posts.length})
                        </a>
                    )}
                </div>

                <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-12"
                >
                    {/* Header */}
                    <header className="space-y-5">
                        {project.badge && project.badge.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {project.badge.map((b) => (
                                    <span
                                        key={b.text}
                                        className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                                        style={{ color: b.textColor, backgroundColor: b.backgroundColor }}
                                    >
                                        {b.text}
                                    </span>
                                ))}
                            </div>
                        )}
                        <div>
                            {project.period && <span className="text-purple-300 text-sm font-medium">{project.period}</span>}
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-1">{project.title}</h1>
                            <p className="text-lg text-purple-200/80 mt-2">{project.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 brightness-[1.8] saturate-150">
                            {project.technologies.map((t) => <TechPill key={t.name} tech={t} />)}
                        </div>
                        {(project.liveUrl || project.githubUrl) && (
                            <div className="flex flex-wrap gap-3 pt-1">
                                {project.liveUrl && (
                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-sm font-semibold transition-all hover:-translate-y-0.5">
                                        <ExternalLink size={15} /> Live Demo
                                    </a>
                                )}
                                {project.githubUrl && (
                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/20 text-sm font-semibold transition-all hover:-translate-y-0.5">
                                        <Github size={15} /> Source Code
                                    </a>
                                )}
                            </div>
                        )}
                    </header>

                    {/* Image */}
                    {images.length > 0 && (
                        <div className="relative w-full h-[260px] sm:h-[400px] flex items-center justify-center bg-black/30 rounded-2xl overflow-hidden border border-white/15">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={imageIndex}
                                    src={images[imageIndex]}
                                    alt={project.title}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="w-full h-full object-contain"
                                />
                            </AnimatePresence>
                            {images.length > 1 && (
                                <>
                                    <button onClick={() => setImageIndex((i) => (i - 1 + images.length) % images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 ring-1 ring-white/20 cursor-pointer" aria-label="Previous image"><ChevronLeft size={20} /></button>
                                    <button onClick={() => setImageIndex((i) => (i + 1) % images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 ring-1 ring-white/20 cursor-pointer" aria-label="Next image"><ChevronRight size={20} /></button>
                                </>
                            )}
                        </div>
                    )}

                    {/* Overview */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold">About this project</h2>
                        {project.longDescription && (
                            <p className="text-gray-200 leading-relaxed">{project.longDescription}</p>
                        )}
                        {d?.story && d.story.length > 0 && (
                            <div className="space-y-3 rounded-2xl border border-white/15 bg-white/5 p-5 sm:p-6">
                                <h3 className="text-lg font-bold">The story</h3>
                                {d.story.map((para, i) => (
                                    <p key={i} className="text-gray-200 text-sm sm:text-base leading-relaxed">{para}</p>
                                ))}
                            </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {d?.goal && (
                                <div className="space-y-2 border-l-2 border-purple-400 pl-5">
                                    <h3 className="text-lg font-bold">Goal</h3>
                                    <p className="text-gray-200 text-sm sm:text-base leading-relaxed">{d.goal}</p>
                                </div>
                            )}
                            {d?.architecture && (
                                <div className="space-y-2 border-l-2 border-purple-400 pl-5">
                                    <h3 className="text-lg font-bold">How it's built</h3>
                                    <p className="text-gray-200 text-sm sm:text-base leading-relaxed">{d.architecture}</p>
                                </div>
                            )}
                            {d?.features && d.features.length > 0 && (
                                <div className="space-y-2 border-l-2 border-purple-400 pl-5">
                                    <h3 className="text-lg font-bold">Features</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-200 text-sm sm:text-base">
                                        {d.features.map((f) => <li key={f}>{f}</li>)}
                                    </ul>
                                </div>
                            )}
                            {d?.roadmap && d.roadmap.length > 0 && (
                                <div className="space-y-2 border-l-2 border-purple-400 pl-5">
                                    <h3 className="text-lg font-bold">Roadmap</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-200 text-sm sm:text-base">
                                        {d.roadmap.map((r) => <li key={r}>{r}</li>)}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Architecture graph */}
                    {project.diagram && (
                        <section id="architecture" className="space-y-4 scroll-mt-8">
                            <h2 className="text-2xl font-bold">{project.diagram.title}</h2>
                            <ArchitectureDiagram diagram={project.diagram} />
                        </section>
                    )}

                    {/* Dev log / blog */}
                    <section id="devlog" className="space-y-6 scroll-mt-8">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-bold">Dev log</h2>
                                <p className="text-purple-200/70 text-sm mt-1">Updates, problems I ran into and how I solved them.</p>
                            </div>
                            {availableTypes.length > 1 && (
                                <div className="flex flex-wrap gap-2 text-xs">
                                    {(["all", ...availableTypes] as Filter[]).map((f) => (
                                        <button
                                            key={f}
                                            onClick={() => setFilter(f)}
                                            className={`px-3 py-1 rounded-full border transition-colors cursor-pointer ${filter === f ? "bg-white text-indigo-950 border-white font-semibold" : "border-white/25 text-purple-200 hover:bg-white/10"}`}
                                        >
                                            {f === "all" ? "All" : postTypeMeta[f].label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {visiblePosts.length === 0 ? (
                            <p className="text-purple-200/70 italic">No posts yet — stay tuned.</p>
                        ) : (
                            <div className="relative space-y-6 ml-2 border-l border-white/15">
                                {visiblePosts.map((post) => <PostCard key={post.id} post={post} />)}
                            </div>
                        )}
                    </section>
                </motion.div>

                {/* Prev / next */}
                <div className="flex items-center justify-between pt-8 border-t border-white/15 text-sm gap-4">
                    {prev ? (
                        <Link to={`/projects/${prev.slug}`} className="inline-flex items-center gap-2 text-purple-200 hover:text-white transition-transform hover:-translate-x-1">
                            <ChevronLeft size={18} />
                            <div>
                                <div className="text-xs text-purple-300/70">Previous</div>
                                <div className="font-semibold">{prev.title}</div>
                            </div>
                        </Link>
                    ) : <div />}
                    {next ? (
                        <Link to={`/projects/${next.slug}`} className="inline-flex items-center gap-2 text-purple-200 hover:text-white text-right transition-transform hover:translate-x-1">
                            <div>
                                <div className="text-xs text-purple-300/70">Next</div>
                                <div className="font-semibold">{next.title}</div>
                            </div>
                            <ChevronRight size={18} />
                        </Link>
                    ) : <div />}
                </div>
            </div>
        </div>
    );
}
