// TypeScript
"use client";

import { useEffect, useState } from "react";

type Section = {
    id: string;
    label: string;
};

interface Props {
    sections: Section[];
}

export default function SectionScroller({ sections }: Props) {
    const [active, setActive] = useState(sections[0].id);

    useEffect(() => {
        const container = document.querySelector("main") as HTMLElement | null;
        if (!container) return;

        const handleScroll = () => {
            const scrollTop = container.scrollTop;
            const viewport = container.clientHeight;
            const index = Math.round(scrollTop / viewport);
            const sec = sections[index];
            if (sec) setActive(sec.id);
        };

        // initialize
        handleScroll();

        container.addEventListener("scroll", handleScroll, { passive: true });
        return () => container.removeEventListener("scroll", handleScroll);
    }, [sections]);

    const scrollToSection = (id: string) => {
        const container = document.querySelector("main") as HTMLElement | null;
        const el = document.getElementById(id) as HTMLElement | null;
        if (!container || !el) return;

        // scroll the container to the element's offset within that container
        container.scrollTo({
            top: el.offsetTop,
            behavior: "smooth",
        });
    };

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col space-y-4 z-50">
            {sections.map((section) => (
                <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="group relative flex items-center"
                >
                    <div
                        className="
              absolute right-8 px-3 py-1 rounded-md bg-black/70 text-white text-xs opacity-0
              group-hover:opacity-100 transition-opacity whitespace-nowrap
            "
                    >
                        {section.label}
                    </div>

                    <div
                        className={`
              w-3 h-3 rounded-full transition-all duration-300
              ${active === section.id
                            ? "bg-blue-400 scale-125 shadow-md shadow-blue-400/60"
                            : "bg-white/40 hover:bg-white/70"}
            `}
                    />
                </button>
            ))}
        </div>
    );
}
