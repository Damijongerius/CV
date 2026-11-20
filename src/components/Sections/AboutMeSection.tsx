import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TimeLineItem from "@/components/ui/TimeLineItem.tsx";

interface HobbyAlbum {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    caption?: string;
    images: string[];
}

const hobbyAlbums: HobbyAlbum[] = [
    {
        id: "mudmasters",
        title: "Mud Masters 2026 (16 km)",
        subtitle: "Running & Endurance",
        description:
            "I dedicated myself to running every few days and took on the 16-kilometer Mud Masters in 2026. Slogging through the mud and obstacles really showed me what I'm capable of when I commit to a goal.",
        caption: "16 km of mud, obstacles, and refusing to quit.",
        images: [
            "images/about/mudmasters-1.jpg",
            "images/about/mudmasters-3.jpg",
            "images/about/mudmasters-4.jpg",
            "images/about/mudmasters-2.jpg",
        ],
    },
    {
        id: "snowboarding",
        title: "Snowboarding",
        subtitle: "Out on the Slopes",
        description:
            "I love snowboarding and always want to get out on the snow more often—whether that's practicing indoor runs or heading up into the mountains.",
        caption: "Any excuse to trade the keyboard for a board.",
        images: [
            "images/about/snowboard-1.jpg",
            "images/about/snowboard-2.jpg",
            "images/about/snowboard-3.jpg",
        ],
    },
    {
        id: "boxing",
        title: "Boxing",
        subtitle: "Blowing Off Steam",
        description:
            "Once in a while I do boxing. After a long week of staring at code or dealing with a drained social battery, hitting the bag is the best way to blow off steam.",
        caption: "I couldn't really find an action picture, but here you go: me and my grandpa :)",
        images: ["images/about/grandpa.png"],
    },
];

// Same look as the other timeline sections, in the blue colour of this section
const blueColors = {
    DotBackground: "bg-white",
    DotBorder: "border-blue-600",
    DateText: "text-sky-100",
    TitleText: "text-white",
    SubtitleText: "text-sky-100/80",
    DescriptionText: "text-white/90",
    TagBackground: "bg-white/20",
    TagBorder: "border-white/30",
    TagText: "text-white",
};

const mindsetItems = [
    {
        id: "dev",
        dateRange: "Mindset",
        title: "Developer first",
        subtitle: "AI and data are extensions of my arsenal",
        description:
            "For me, truly knowing the fundamentals of AI would mean building models from scratch. While training my own LLM from zero is another level, I know how to fine-tune models, wire up MCPs, and build RAG workflows to bend AI to do what I want. Lately, my biggest focus is doing more with data—because 80% of AI is data. Garbage in, garbage out.",
        tags: ["Fine-tuning", "MCP", "RAG", "Data"],
    },
    {
        id: "creative",
        dateRange: "How I work",
        title: "Creative chaos & honest feedback",
        subtitle: "Always improving",
        description:
            "I always have new ideas bouncing around in my head, and AI makes it possible to actually build all of them. I like giving direct feedback, I'm completely open to receiving it, and while I know when to lock in and take things seriously, I like to keep things fun.",
        tags: ["Ideas", "Direct feedback", "Fun"],
    },
    {
        id: "battery",
        dateRange: "A fair warning",
        title: "My social battery",
        subtitle: "People drain it",
        description:
            "I can focus hard and politely power through when someone is talking my ears off—but at the end of the day, I will go home like a complete zombie. That said, if you want to talk about IT, code, or systems, we can talk all day long. :)",
        tags: ["Introvert", "IT talk welcome"],
    },
    {
        id: "company",
        dateRange: "For companies",
        title: "Looking for someone?",
        subtitle: "Hungry to learn",
        description:
            "If you want someone who claims to know it all already, go somewhere else. If you want someone who is hungry to learn it, understand how it actually works, and improve in the best interest of the company—I'm your guy.",
        tags: ["Learner", "Team player"],
    },
];

export default function AboutMeSection() {
    const [page, setPage] = useState<0 | 1>(0);
    const [activeAlbumId, setActiveAlbumId] = useState<string>("mudmasters");
    const [photoIndex, setPhotoIndex] = useState<number>(0);
    const galleryRef = useRef<HTMLDivElement>(null);

    const activeAlbum = hobbyAlbums.find((a) => a.id === activeAlbumId) || hobbyAlbums[0];

    const selectAlbum = (id: string, scroll = false) => {
        setActiveAlbumId(id);
        setPhotoIndex(0);
        if (scroll) galleryRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    const navigatePhoto = (dir: number) => {
        const len = activeAlbum.images.length;
        if (len <= 1) return;
        setPhotoIndex((prev) => (prev + dir + len) % len);
    };

    return (
        <div className="max-w-3xl mx-auto w-full text-white space-y-8">
            {/* Heading + page switcher */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white">About Me</h2>

                <div className="flex items-center gap-6 text-sm">
                    <button
                        onClick={() => setPage(0)}
                        className={`pb-1 border-b-2 transition-colors cursor-pointer ${
                            page === 0 ? "text-white border-white font-semibold" : "text-sky-100/70 border-transparent hover:text-white"
                        }`}
                    >
                        Mindset & AI
                    </button>
                    <button
                        onClick={() => setPage(1)}
                        className={`pb-1 border-b-2 transition-colors cursor-pointer ${
                            page === 1 ? "text-white border-white font-semibold" : "text-sky-100/70 border-transparent hover:text-white"
                        }`}
                    >
                        Hobbies & Photos
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {page === 0 ? (
                    <motion.div
                        key="page-mindset"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-10"
                    >
                        <div className="relative">
                            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/30 md:-translate-x-0.5" />
                            {mindsetItems.map((item) => (
                                <TimeLineItem
                                    key={item.id}
                                    dateRange={item.dateRange}
                                    title={item.title}
                                    subtitle={item.subtitle}
                                    description={item.description}
                                    tags={item.tags}
                                    Colors={blueColors}
                                />
                            ))}
                        </div>

                        <blockquote className="rounded-xl border border-white/30 bg-white/10 px-5 py-4 text-white/95 text-sm sm:text-base italic leading-relaxed">
                            "Knowing everything isn't the most important skill anymore—being open to any idea, creative enough to bring your own, and keeping the balance between the two is what takes real skill. AI is only the solution when you make it do what you want in a way that gets your character, instead of you getting AI's."
                        </blockquote>
                    </motion.div>
                ) : (
                    <motion.div
                        key="page-hobbies"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-10"
                    >
                        {/* Photo viewer */}
                        <div ref={galleryRef} className="flex flex-col items-center">
                            <div className="relative group w-full h-[300px] sm:h-[360px] flex items-center justify-center rounded-2xl bg-black/20 ring-1 ring-white/20 overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={`${activeAlbum.id}-${photoIndex}`}
                                        src={activeAlbum.images[photoIndex]}
                                        alt={`${activeAlbum.title} ${photoIndex + 1}`}
                                        initial={{ opacity: 0, scale: 0.97 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.97 }}
                                        transition={{ duration: 0.25 }}
                                        className="max-h-full w-auto max-w-full object-contain"
                                    />
                                </AnimatePresence>

                                {activeAlbum.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => navigatePhoto(-1)}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 text-white shadow-lg ring-1 ring-white/20 hover:bg-slate-900 transition-all cursor-pointer"
                                            aria-label="Previous photo"
                                        >
                                            <ChevronLeft size={18} />
                                        </button>
                                        <button
                                            onClick={() => navigatePhoto(1)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 text-white shadow-lg ring-1 ring-white/20 hover:bg-slate-900 transition-all cursor-pointer"
                                            aria-label="Next photo"
                                        >
                                            <ChevronRight size={18} />
                                        </button>
                                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/70 backdrop-blur-sm">
                                            {activeAlbum.images.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setPhotoIndex(idx)}
                                                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                                        idx === photoIndex ? "bg-white w-5" : "bg-white/40 hover:bg-white/70 w-2"
                                                    }`}
                                                    aria-label={`View photo ${idx + 1}`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                            {activeAlbum.caption && (
                                <p className="text-sky-100 text-xs sm:text-sm italic text-center mt-3 max-w-md">{activeAlbum.caption}</p>
                            )}
                        </div>

                        {/* Hobby timeline */}
                        <div className="relative">
                            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/30 md:-translate-x-0.5" />
                            {hobbyAlbums.map((album) => (
                                <TimeLineItem
                                    key={album.id}
                                    dateRange={album.subtitle}
                                    title={album.title}
                                    description={album.description}
                                    tags={[`${album.images.length} ${album.images.length === 1 ? "photo" : "photos"}`]}
                                    Colors={blueColors}
                                    onSelect={() => selectAlbum(album.id, true)}
                                    isActive={album.id === activeAlbum.id}
                                />
                            ))}
                            <TimeLineItem
                                dateRange="With friends"
                                title="Minecraft PvP Network & Data"
                                description="Working on a Minecraft server with friends—building a competitive PvP network focused on data and player improvement, grabbing every single piece of telemetry I can get."
                                tags={["Minecraft", "Data"]}
                                Colors={blueColors}
                            />
                            <TimeLineItem
                                dateRange="For fun"
                                title="Piano & IT Rabbit Holes"
                                description="I sometimes play piano (though not enough lately), and I love diving into random problems all around the IT field just to learn something new."
                                tags={["Piano", "Curiosity"]}
                                Colors={blueColors}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
