import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Repeat } from "lucide-react";
import type { ProjectDiagram } from "@/types/projects.ts";
import { track } from "@/lib/analytics.ts";

/** Layered architecture graph. Click a node to read what it does. */
export default function ArchitectureDiagram({ diagram }: { diagram: ProjectDiagram }) {
    const [active, setActive] = useState<{ layer: string; label: string } | null>(null);

    return (
        <div className="space-y-5">
            {diagram.stats && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {diagram.stats.map((s) => (
                        <div key={s.label} className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-center">
                            <div className="text-2xl font-bold text-white">{s.value}</div>
                            <div className="text-xs text-purple-200/80">{s.label}</div>
                        </div>
                    ))}
                </div>
            )}

            <div className="space-y-2">
                {diagram.layers.map((layer, li) => {
                    const selected = layer.nodes.find((n) => active?.layer === layer.id && n.label === active.label);
                    return (
                        <React.Fragment key={layer.id}>
                            <div
                                className="rounded-2xl border p-4 sm:p-5"
                                style={{
                                    borderColor: `hsl(${layer.color} / 0.5)`,
                                    background: `linear-gradient(135deg, hsl(${layer.color} / 0.14), hsl(${layer.color} / 0.04))`,
                                }}
                            >
                                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-3">
                                    <h3 className="font-bold" style={{ color: `hsl(${layer.color})` }}>{layer.title}</h3>
                                    {layer.subtitle && <span className="text-xs text-purple-100/70">{layer.subtitle}</span>}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {layer.nodes.map((n) => {
                                        const isActive = active?.layer === layer.id && active.label === n.label;
                                        return (
                                            <button
                                                key={n.label}
                                                onClick={() => {
                                                    setActive(isActive ? null : { layer: layer.id, label: n.label });
                                                    if (!isActive) track("diagram-node", { node: n.label });
                                                }}
                                                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                                                    isActive ? "bg-white text-indigo-950 border-white" : "bg-black/25 text-white hover:bg-white/15"
                                                } ${n.swappable && !isActive ? "border-dashed" : ""}`}
                                                style={!isActive ? { borderColor: `hsl(${layer.color} / 0.7)` } : undefined}
                                                aria-pressed={isActive}
                                            >
                                                {n.swappable && <Repeat size={12} aria-hidden />}
                                                {n.label}
                                            </button>
                                        );
                                    })}
                                </div>
                                <AnimatePresence initial={false}>
                                    {selected?.note && (
                                        <motion.p
                                            key={selected.label}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="mt-3 text-sm text-gray-100 leading-relaxed overflow-hidden"
                                        >
                                            <span className="font-semibold">{selected.label}: </span>
                                            {selected.note}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                            {li < diagram.layers.length - 1 && (
                                <div className="flex justify-center text-purple-300/60" aria-hidden>
                                    <ArrowDown size={18} />
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            <p className="text-xs text-purple-200/70 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="inline-flex items-center gap-1.5"><Repeat size={12} /> dashed = swappable module</span>
                <span>Click any block for details.</span>
                {diagram.caption && <span>{diagram.caption}</span>}
            </p>
        </div>
    );
}
