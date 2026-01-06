import React, { useEffect, useState } from "react";

type Section = {
    id: string;
    label: string;
};

interface Props {
    sections: Section[];
    containerRef: React.RefObject<HTMLElement>;
}

export default function SectionScroller({ sections, containerRef }: Props) {
    const [active, setActive] = useState(sections[0].id);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollTop = container.scrollTop;
            const viewport = container.clientHeight;
            const mid = scrollTop + viewport / 2;

            let closestId: string | null = null;
            let closestDist = Infinity;

            for (const sec of sections) {
                const el = document.getElementById(sec.id);
                if (!el) continue;
                const elTop = el.offsetTop;
                const elMid = elTop + el.offsetHeight / 2;
                const dist = Math.abs(mid - elMid);
                if (dist < closestDist) {
                    closestDist = dist;
                    closestId = sec.id;
                }
            }

            if (closestId) setActive(closestId);
        };

        handleScroll();

        container.addEventListener("scroll", handleScroll, {passive: true});
        return () => container.removeEventListener("scroll", handleScroll);
    }, [sections, containerRef]);

    const scrollToSection = (id: string) => {
        const container = containerRef.current;
        const el = document.getElementById(id);
        if (!container || !el) return;

        container.scrollTo({
            top: el.offsetTop,
            behavior: "smooth",
        });
    };

    return (
        <div className="fixed right-2 sm:right-6 top-1/2 -translate-y-1/2 flex flex-col space-y-4 z-50">
            {sections.map((section) => (
                <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="group relative flex items-center bg-transparent border-none cursor-pointer p-0"
                >
                    <div
                        className="absolute right-2 sm:right-8 px-3 py-1 rounded-md bg-black/70 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {section.label}
                    </div>

                    <div
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            active === section.id
                                ? "bg-blue-400 scale-125 shadow-md shadow-blue-400/60"
                                : "bg-white/40 hover:bg-white/70"
                        }`}
                    />
                </button>
            ))}
        </div>
    );
}
