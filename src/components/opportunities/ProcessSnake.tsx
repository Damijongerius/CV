import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type Step = { icon: LucideIcon; title: string; text: string };

// Desktop: row 1 runs left -> right, row 2 runs right -> left (a snake).
const positions = [
    "md:col-start-1 md:row-start-1",
    "md:col-start-2 md:row-start-1",
    "md:col-start-3 md:row-start-1",
    "md:col-start-3 md:row-start-2",
    "md:col-start-2 md:row-start-2",
    "md:col-start-1 md:row-start-2",
];

type Pt = { x: number; y: number };

/** Polyline with rounded corners. */
function roundedPath(points: Pt[], radius: number) {
    if (points.length < 2) return "";
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length - 1; i++) {
        const a = points[i - 1], p = points[i], b = points[i + 1];
        const la = Math.hypot(p.x - a.x, p.y - a.y), lb = Math.hypot(b.x - p.x, b.y - p.y);
        const r = Math.min(radius, la / 2, lb / 2);
        const p1 = { x: p.x - ((p.x - a.x) / la) * r, y: p.y - ((p.y - a.y) / la) * r };
        const p2 = { x: p.x + ((b.x - p.x) / lb) * r, y: p.y + ((b.y - p.y) / lb) * r };
        d += ` L ${p1.x} ${p1.y} Q ${p.x} ${p.y} ${p2.x} ${p2.y}`;
    }
    const last = points[points.length - 1];
    return d + ` L ${last.x} ${last.y}`;
}

export default function ProcessSnake({ steps }: { steps: Step[] }) {
    const wrap = useRef<HTMLDivElement>(null);
    const cards = useRef<(HTMLLIElement | null)[]>([]);
    const [size, setSize] = useState({ w: 0, h: 0 });
    const [d, setD] = useState("");

    useLayoutEffect(() => {
        const el = wrap.current;
        if (!el) return;
        const measure = () => {
            // offsetLeft/Top ignore the fade-in transforms, so the line lands in the right place
            const boxes = cards.current.filter(Boolean).map((c) => ({
                x: c!.offsetLeft, y: c!.offsetTop, w: c!.offsetWidth, h: c!.offsetHeight,
            }));
            if (boxes.length < 2) return;
            const badge = (b: (typeof boxes)[number]): Pt => ({ x: b.x + 42, y: b.y + 42 });
            const stacked = boxes[1].y > boxes[0].y + 10 && Math.abs(boxes[1].x - boxes[0].x) < 10;

            let pts: Pt[];
            if (stacked) {
                pts = boxes.map(badge);
            } else {
                // Through the number badges; the turn swings out to the right of the 3rd and 4th card
                const out = Math.max(boxes[2].x + boxes[2].w, boxes[3].x + boxes[3].w) + 28;
                const b = boxes.map(badge);
                pts = [b[0], b[1], b[2], { x: out, y: b[2].y }, { x: out, y: b[3].y }, ...b.slice(3)];
            }
            setSize({ w: el.offsetWidth, h: el.offsetHeight });
            setD(roundedPath(pts, 36));
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        return () => ro.disconnect();
    }, [steps]);

    return (
        <div ref={wrap} className="relative">
            {d && (
                <svg className="pointer-events-none absolute inset-0 overflow-visible" width={size.w} height={size.h} aria-hidden>
                    <motion.path
                        d={d}
                        fill="none"
                        stroke="rgba(190,242,100,0.25)"
                        strokeWidth={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2.2, ease: "easeInOut" }}
                    />
                    <motion.path
                        d={d}
                        fill="none"
                        stroke="#bef264"
                        strokeWidth={3}
                        strokeLinecap="round"
                        strokeDasharray="2 14"
                        animate={{ strokeDashoffset: [0, -32] }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                    />
                    <circle r={7} fill="#bef264" style={{ filter: "drop-shadow(0 0 8px #bef264)" }}>
                        <animateMotion dur="7s" repeatCount="indefinite" path={d} />
                    </circle>
                </svg>
            )}

            <ol className="relative grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-14 md:gap-y-16 md:pr-16">
                {steps.map(({ icon: Icon, title, text }, i) => (
                    <motion.li
                        key={title}
                        ref={(el) => { cards.current[i] = el; }}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ delay: i * 0.25, duration: 0.4 }}
                        className={`relative rounded-2xl border border-white/15 bg-[#0c3b2f] p-5 shadow-xl shadow-black/20 ${positions[i] ?? ""}`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lime-300 text-lg font-bold text-green-950 ring-4 ring-[#0c3b2f]">
                                {i + 1}
                            </span>
                            <Icon size={20} className="text-emerald-100/80" />
                        </div>
                        <h3 className="mt-3 text-lg font-semibold">{title}</h3>
                        <p className="mt-1 text-sm text-emerald-50/75 leading-relaxed">{text}</p>
                    </motion.li>
                ))}
            </ol>
        </div>
    );
}
