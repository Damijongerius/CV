import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { experienceData } from "@/data/experience.ts";

export default function ExperienceDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [photoIndex, setPhotoIndex] = useState(0);

    const currentIndex = experienceData.findIndex((item) => item.slug === slug);
    const experience = experienceData[currentIndex];

    useEffect(() => {
        setPhotoIndex(0);
        window.scrollTo(0, 0);
    }, [slug]);

    if (!experience) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 text-white flex flex-col items-center justify-center p-6">
                <h1 className="text-3xl font-bold mb-4">Experience not found</h1>
                <button
                    onClick={() => navigate("/", { state: { scrollTo: "experience" } })}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                    <ArrowLeft size={16} />
                    <span>Back to Work Experience</span>
                </button>
            </div>
        );
    }

    const prevExp = currentIndex > 0 ? experienceData[currentIndex - 1] : null;
    const nextExp =
        currentIndex < experienceData.length - 1 ? experienceData[currentIndex + 1] : null;

    const images = experience.images || [];

    const navigatePhoto = (dir: number) => {
        if (images.length <= 1) return;
        setPhotoIndex((prev) => (prev + dir + images.length) % images.length);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 text-white px-6 py-12 md:py-16">
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Top Navigation Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/15 pb-6">
                    <button
                        onClick={() => navigate("/", { state: { scrollTo: "experience" } })}
                        className="inline-flex items-center gap-2 text-purple-200 hover:text-white text-sm font-medium transition-transform duration-200 hover:-translate-x-1 cursor-pointer self-start"
                    >
                        <ArrowLeft size={16} />
                        <span>Back to Work Experience</span>
                    </button>

                    {/* Quick Experience Switcher */}
                    <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                        {experienceData.map((item) => (
                            <Link
                                key={item.id}
                                to={`/experience/${item.slug}`}
                                className={`transition-colors pb-0.5 border-b-2 ${
                                    item.slug === experience.slug
                                        ? "text-white border-purple-400 font-semibold"
                                        : "text-purple-300/60 border-transparent hover:text-purple-200"
                                }`}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Experience Header */}
                <motion.div
                    key={experience.slug}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-10"
                >
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <span className="text-purple-300 text-sm font-medium">
                                {experience.dateRange}
                            </span>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-1">
                                {experience.title}
                            </h1>
                            <p className="text-xl text-purple-200/80 mt-1">
                                {experience.subtitle}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-4">
                                {experience.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center rounded-full border border-purple-400/30 bg-purple-500/20 text-purple-200 px-3 py-0.5 text-xs font-semibold"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {experience.websiteUrl && (
                            <a
                                href={experience.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold transition-all hover:-translate-y-0.5 self-start md:self-auto"
                            >
                                <span>Visit {experience.websiteLabel || "Website"}</span>
                                <ExternalLink size={15} />
                            </a>
                        )}
                    </div>

                    {/* In-Depth Reflection Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                        <div className="space-y-2 border-l-2 border-purple-400 pl-5">
                            <h2 className="text-lg font-bold text-white">
                                What I Did
                            </h2>
                            <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                                {experience.sections.whatIDid}
                            </p>
                        </div>

                        <div className="space-y-2 border-l-2 border-purple-400 pl-5">
                            <h2 className="text-lg font-bold text-white">
                                Where My Focus Was & What I Wanted to Learn
                            </h2>
                            <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                                {experience.sections.whereIFocused}
                            </p>
                        </div>

                        <div className="space-y-2 border-l-2 border-purple-400 pl-5">
                            <h2 className="text-lg font-bold text-white">
                                What I Learned & What They Taught Me
                            </h2>
                            <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                                {experience.sections.whatILearned}
                            </p>
                        </div>

                        <div className="space-y-2 border-l-2 border-purple-400 pl-5">
                            <h2 className="text-lg font-bold text-white">
                                What I Could Have Done Better
                            </h2>
                            <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                                {experience.sections.whatCouldBeBetter}
                            </p>
                        </div>
                    </div>

                    {/* Photo Gallery (for Minor Kenya or experiences with photos) */}
                    {images.length > 0 && (
                        <div className="space-y-4 pt-4">
                            <h2 className="text-2xl font-bold text-white">
                                Photos from {experience.title}
                            </h2>

                            <div className="relative w-full h-[360px] sm:h-[440px] flex items-center justify-center bg-black/30 rounded-2xl overflow-hidden border border-white/15">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={photoIndex}
                                        src={images[photoIndex].src}
                                        alt={images[photoIndex].caption}
                                        initial={{ opacity: 0, scale: 0.97 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.97 }}
                                        transition={{ duration: 0.25 }}
                                        className="max-h-full max-w-full object-contain"
                                    />
                                </AnimatePresence>

                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => navigatePhoto(-1)}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 transition-colors cursor-pointer shadow-lg ring-1 ring-white/20"
                                            aria-label="Previous photo"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>
                                        <button
                                            onClick={() => navigatePhoto(1)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 transition-colors cursor-pointer shadow-lg ring-1 ring-white/20"
                                            aria-label="Next photo"
                                        >
                                            <ChevronRight size={20} />
                                        </button>

                                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/75 backdrop-blur-sm">
                                            {images.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setPhotoIndex(idx)}
                                                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                                        idx === photoIndex
                                                            ? "bg-purple-400 w-5"
                                                            : "bg-white/40 hover:bg-white/70 w-2"
                                                    }`}
                                                    aria-label={`View photo ${idx + 1}`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {images[photoIndex]?.caption && (
                                <p className="text-purple-200 text-sm italic text-center">
                                    {images[photoIndex].caption}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Embedded Website Preview (for Internships: Kaliber & Eelloo) */}
                    {experience.showWebsiteEmbed && experience.websiteUrl && (
                        <div className="space-y-4 pt-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-white">
                                    Company Website — {experience.subtitle}
                                </h2>
                                <a
                                    href={experience.websiteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-300 hover:text-white text-sm font-medium inline-flex items-center gap-1.5"
                                >
                                    <span>Open in new tab</span>
                                    <ExternalLink size={14} />
                                </a>
                            </div>

                            <div className="rounded-2xl overflow-hidden border border-white/20 bg-slate-950 shadow-2xl">
                                {/* Browser Top Bar */}
                                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-white/10">
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                                        <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                                        <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                                    </div>
                                    <a
                                        href={experience.websiteUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-1 rounded-md bg-white/5 hover:bg-white/10 text-xs text-gray-300 font-mono flex items-center gap-2 transition-colors"
                                    >
                                        <span>{experience.websiteUrl}</span>
                                        <ExternalLink size={11} />
                                    </a>
                                    <div className="w-12" />
                                </div>

                                {/* Live Iframe */}
                                <div className="relative w-full h-[480px] bg-white">
                                    <iframe
                                        src={experience.websiteUrl}
                                        title={`${experience.subtitle} Website`}
                                        className="w-full h-full border-0"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Prev / Next Experience Footer Navigation */}
                <div className="flex items-center justify-between pt-8 border-t border-white/15 text-sm">
                    {prevExp ? (
                        <Link
                            to={`/experience/${prevExp.slug}`}
                            className="inline-flex items-center gap-2 text-purple-200 hover:text-white transition-transform hover:-translate-x-1"
                        >
                            <ChevronLeft size={18} />
                            <div>
                                <div className="text-xs text-purple-300/70">Previous</div>
                                <div className="font-semibold">{prevExp.title}</div>
                            </div>
                        </Link>
                    ) : (
                        <div />
                    )}

                    {nextExp ? (
                        <Link
                            to={`/experience/${nextExp.slug}`}
                            className="inline-flex items-center gap-2 text-purple-200 hover:text-white text-right transition-transform hover:translate-x-1"
                        >
                            <div>
                                <div className="text-xs text-purple-300/70">Next</div>
                                <div className="font-semibold">{nextExp.title}</div>
                            </div>
                            <ChevronRight size={18} />
                        </Link>
                    ) : (
                        <div />
                    )}
                </div>
            </div>
        </div>
    );
}
