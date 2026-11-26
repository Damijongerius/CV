import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Info, X } from "lucide-react";

const GAP = 12;
const MARGIN = 16;

/**
 * Small (i) button that opens a card with extra explanation.
 * The card is rendered in a portal so the full-screen sections (overflow hidden) can't clip it.
 * Closes on outside click, Escape or scrolling.
 */
export default function InfoPopover({ label, title, children }: { label: string; title: string; children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const [style, setStyle] = useState<CSSProperties>({ visibility: "hidden" });
    const btn = useRef<HTMLButtonElement>(null);
    const card = useRef<HTMLDivElement>(null);
    const id = useId();

    // Place the card under the button, or above it when there's no room below
    useLayoutEffect(() => {
        if (!open || !btn.current || !card.current) return;
        const r = btn.current.getBoundingClientRect();
        const w = card.current.offsetWidth;
        const h = card.current.offsetHeight;
        const left = Math.min(Math.max(r.left - 8, MARGIN), window.innerWidth - w - MARGIN);
        const below = r.bottom + GAP;
        const top = below + h <= window.innerHeight - MARGIN ? below : Math.max(MARGIN, r.top - GAP - h);
        setStyle({ left, top });
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const onDown = (e: PointerEvent) => {
            const t = e.target as Node;
            if (!btn.current?.contains(t) && !card.current?.contains(t)) setOpen(false);
        };
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        const onScroll = (e: Event) => {
            if (!card.current?.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("pointerdown", onDown);
        document.addEventListener("keydown", onKey);
        document.addEventListener("scroll", onScroll, true);
        window.addEventListener("resize", onScroll);
        return () => {
            document.removeEventListener("pointerdown", onDown);
            document.removeEventListener("keydown", onKey);
            document.removeEventListener("scroll", onScroll, true);
            window.removeEventListener("resize", onScroll);
        };
    }, [open]);

    const toggle = () => {
        setStyle({ visibility: "hidden" });
        setOpen((o) => !o);
    };

    return (
        <>
            <button
                ref={btn}
                type="button"
                onClick={toggle}
                aria-expanded={open}
                aria-controls={id}
                aria-label={label}
                className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors cursor-pointer ${
                    open ? "bg-green-950 text-lime-200" : "bg-green-950/10 text-green-900 hover:bg-green-950/20"
                }`}
            >
                <Info size={15} />
            </button>
            {createPortal(
                <AnimatePresence>
                    {open && (
                        <motion.div
                            ref={card}
                            id={id}
                            role="dialog"
                            aria-label={title}
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.97 }}
                            transition={{ duration: 0.18 }}
                            style={style}
                            className="fixed z-[60] w-[min(420px,calc(100vw-2rem))] max-h-[calc(100vh-2rem)] overflow-y-auto rounded-2xl bg-gradient-to-br from-[#2a0a14] via-[#4a1024] to-[#1a0a0e] p-5 text-left text-rose-50 shadow-2xl shadow-black/50"
                        >
                            <div className="mb-3 flex items-start justify-between gap-3">
                                <p className="text-lg font-bold">{title}</p>
                                <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="text-rose-200/70 hover:text-white cursor-pointer">
                                    <X size={18} />
                                </button>
                            </div>
                            {children}
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}
