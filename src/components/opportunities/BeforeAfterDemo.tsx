import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { CheckCircle2, Database, FileSpreadsheet, FolderOpen, Inbox, Network, ShoppingCart, Sparkles, type LucideIcon } from "lucide-react";

type Lang = "nl" | "en";
const pick = <T,>(lang: Lang, v: { nl: T; en: T }) => v[lang];

/* ------------------------------------------------------------------------------------
 * Fictional brands. Every "after" view is drawn in the house style of a made-up client,
 * to show the solution adapts to their look instead of the other way around.
 * ---------------------------------------------------------------------------------- */

type Brand = {
    name: string;
    logo: ReactNode;
    font: string;
    fontLabel: string;
    vars: { bg: string; fg: string; muted: string; card: string; line: string; accent: string; accentFg: string; radius: string };
};

const BakeryLogo = (
    <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
        <circle cx="16" cy="16" r="15" fill="#c2410c" />
        <ellipse cx="16" cy="17.5" rx="10" ry="6.5" fill="#fbf3e4" />
        <path d="M11 15.5l2 4M15 14.5l2 5M19 15l2 4" stroke="#c2410c" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
);
const FarmLogo = (
    <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
        <circle cx="24" cy="8" r="4.5" fill="#facc15" />
        <path d="M4 29V15l10-8 10 8v14z" fill="#4d7c0f" />
        <rect x="11" y="19" width="6" height="10" rx="1" fill="#f7fee7" />
        <path d="M2 29h28" stroke="#365314" strokeWidth="2" strokeLinecap="round" />
    </svg>
);
const CafeLogo = (
    <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
        <path d="M6 13h15v8a6 6 0 0 1-6 6h-3a6 6 0 0 1-6-6z" fill="#f472b6" />
        <path d="M21 15h2.5a3 3 0 0 1 0 6H21" fill="none" stroke="#f472b6" strokeWidth="2.2" />
        <path d="M10 4c-1.5 2 1.5 3 0 5M15 4c-1.5 2 1.5 3 0 5" fill="none" stroke="#c4b5fd" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
);
const BikeLogo = (
    <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
        <rect width="32" height="32" fill="#111" />
        <circle cx="9" cy="20" r="5" fill="none" stroke="#fde047" strokeWidth="2.2" />
        <circle cx="23" cy="20" r="5" fill="none" stroke="#fde047" strokeWidth="2.2" />
        <path d="M9 20l5-9h7l2 9M14 11l-1.5-3H10M21 11l1-3" fill="none" stroke="#fde047" strokeWidth="2.2" strokeLinejoin="round" />
    </svg>
);

const brands: Record<string, Brand> = {
    bakery: {
        name: "Bakkerij Voorbeeld",
        logo: BakeryLogo,
        font: "Georgia, 'Times New Roman', serif",
        fontLabel: "Serif",
        vars: { bg: "#fbf3e4", fg: "#3b2412", muted: "#8a6a50", card: "#ffffff", line: "#ecdcc4", accent: "#c2410c", accentFg: "#ffffff", radius: "18px" },
    },
    farm: {
        name: "Hoeve De Proef",
        logo: FarmLogo,
        font: "'Trebuchet MS', 'Segoe UI', sans-serif",
        fontLabel: "Rounded sans",
        vars: { bg: "#f7fee7", fg: "#1f2d1a", muted: "#5b6b4f", card: "#ffffff", line: "#d9f99d", accent: "#4d7c0f", accentFg: "#ffffff", radius: "12px" },
    },
    cafe: {
        name: "Café Fictief",
        logo: CafeLogo,
        font: "system-ui, 'Segoe UI', sans-serif",
        fontLabel: "Modern sans",
        vars: { bg: "#1e1b2e", fg: "#f5f3ff", muted: "#a59fc4", card: "#2a2540", line: "#3b3456", accent: "#f472b6", accentFg: "#1e1b2e", radius: "24px" },
    },
    bike: {
        name: "Fietsenmaker De Testtrap",
        logo: BikeLogo,
        font: "'Courier New', ui-monospace, monospace",
        fontLabel: "Mono",
        vars: { bg: "#fde047", fg: "#111111", muted: "#3f3a12", card: "#fffbe0", line: "#111111", accent: "#111111", accentFg: "#fde047", radius: "0px" },
    },
};

function brandStyle(b: Brand): CSSProperties {
    const v = b.vars;
    return {
        fontFamily: b.font,
        "--b-bg": v.bg,
        "--b-fg": v.fg,
        "--b-muted": v.muted,
        "--b-card": v.card,
        "--b-line": v.line,
        "--b-accent": v.accent,
        "--b-accent-fg": v.accentFg,
        "--b-radius": v.radius,
    } as CSSProperties;
}

// Shared class helpers for brand-styled pieces
const bCard = "bg-[var(--b-card)] border border-[color:var(--b-line)] rounded-[var(--b-radius)]";
const bMuted = "text-[color:var(--b-muted)]";

function BrandFrame({ brand, children, example }: { brand: Brand; children: ReactNode; example: string }) {
    return (
        <div style={brandStyle(brand)} className="overflow-hidden rounded-[var(--b-radius)] border-2 border-[color:var(--b-line)] bg-[var(--b-bg)] text-[color:var(--b-fg)] shadow-2xl shadow-green-950/25">
            <div className="flex items-center gap-2.5 border-b border-[color:var(--b-line)] px-4 py-3">
                {brand.logo}
                <span className="font-bold text-base">{brand.name}</span>
                <span className={`ml-auto rounded-full border border-[color:var(--b-line)] px-2 py-0.5 text-[11px] ${bMuted}`}>{example}</span>
            </div>
            <div className="p-4 space-y-4">{children}</div>
        </div>
    );
}

function Stat({ label, value, sub, delay = 0 }: { label: string; value: string; sub?: string; delay?: number }) {
    return (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} className={`${bCard} p-3`}>
            <div className={`text-xs ${bMuted}`}>{label}</div>
            <div className="text-2xl font-bold text-[color:var(--b-accent)]">{value}</div>
            {sub && <div className={`text-xs ${bMuted}`}>{sub}</div>}
        </motion.div>
    );
}

function DoneList({ items }: { items: string[] }) {
    return (
        <ul className="space-y-1.5 text-sm">
            {items.map((d, i) => (
                <motion.li key={d} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.12 }} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[color:var(--b-accent)]" />
                    <span>{d}</span>
                </motion.li>
            ))}
        </ul>
    );
}

/* ------------------------------------------------------------------------------------
 * "Before" views: four different kinds of mess
 * ---------------------------------------------------------------------------------- */

function Notes({ notes }: { notes: string[] }) {
    return (
        <div className="flex flex-wrap gap-2 p-3">
            {notes.map((n, i) => (
                <span key={n} className="rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-900 shadow-sm" style={{ transform: `rotate(${i % 2 ? 2 : -2}deg)` }}>
                    {n}
                </span>
            ))}
        </div>
    );
}

const RED = "bg-red-500 text-white font-bold";
const PINK = "bg-red-200 text-red-700 font-bold";
const YEL = "bg-yellow-200";
const ORA = "bg-orange-200";

function SheetBefore({ lang, example }: { lang: Lang; example: string }) {
    const t = pick(lang, {
        nl: {
            file: "bestellingen_DEFINITIEF_v3 (2).xlsx",
            cols: ["Datum", "Klant", "Product", "Aantal", "Status"],
            rows: [
                ["3-11", "Lunchroom Proef", "Spelt 5kg", "12", "betaald?"],
                ["04/11/2026", "lunchroom proef ", "spelt", "12", ""],
                ["5 nov", "Hotel Fictief", "Croissant", "#REF!", "BELLEN!!"],
                ["", "Café Fictief", "Appeltaart", "6", "zie mail"],
                ["11-6", "Hotel Fictief", "Croissant ", "30", "factuur??"],
            ],
            notes: ["dubbel?", "welke datum?", "formule kapot", "wie heeft dit?"],
        },
        en: {
            file: "orders_FINAL_v3 (2).xlsx",
            cols: ["Date", "Customer", "Product", "Qty", "Status"],
            rows: [
                ["3-11", "Test Lunchroom", "Spelt 5kg", "12", "paid?"],
                ["04/11/2026", "test lunchroom ", "spelt", "12", ""],
                ["5 Nov", "Hotel Fictief", "Croissant", "#REF!", "CALL!!"],
                ["", "Café Fictief", "Apple pie", "6", "see email"],
                ["11-6", "Hotel Fictief", "Croissant ", "30", "invoice??"],
            ],
            notes: ["duplicate?", "which date?", "broken formula", "who has this?"],
        },
    });
    const messy: Record<string, string> = { "1-1": YEL, "1-2": YEL, "2-3": PINK, "2-4": RED, "3-0": ORA, "4-4": YEL };
    return (
        <div className="rounded-xl border border-green-950/20 bg-white shadow-2xl shadow-green-950/20 overflow-hidden">
            <div className="flex items-center gap-2 bg-[#1f7244] px-3 py-2 text-xs text-white">
                <FileSpreadsheet size={14} />
                <span className="truncate">{t.file}</span>
                <span className="ml-auto rounded bg-white/20 px-1.5">{example}</span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full min-w-[460px] border-collapse text-xs sm:text-sm text-gray-800 font-mono">
                    <thead>
                        <tr className="bg-gray-100 text-gray-500">
                            <th className="w-8 border border-gray-200" />
                            {t.cols.map((c) => (
                                <th key={c} className="border border-gray-200 px-2 py-1 text-left font-semibold">{c}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {t.rows.map((row, r) => (
                            <tr key={r}>
                                <td className="border border-gray-200 bg-gray-100 text-center text-gray-400">{r + 2}</td>
                                {row.map((cell, c) => (
                                    <td key={c} className={`border border-gray-200 px-2 py-1.5 whitespace-nowrap ${messy[`${r}-${c}`] ?? ""}`}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Notes notes={t.notes} />
        </div>
    );
}

function DataDumpBefore({ lang, example }: { lang: Lang; example: string }) {
    const t = pick(lang, {
        nl: {
            path: "Gedeelde schijf › exports › oud › NIET_WISSEN",
            cols: ["Naam", "Grootte", "Laatst geopend"],
            never: "nooit",
            notes: ["5 jaar aan data", "niemand kijkt ernaar", "staat in losse bestanden"],
        },
        en: {
            path: "Shared drive › exports › old › DO_NOT_DELETE",
            cols: ["Name", "Size", "Last opened"],
            never: "never",
            notes: ["5 years of data", "nobody looks at it", "stuck in loose files"],
        },
    });
    const files: [string, string, string | null][] = [
        ["kassa_export_2021.csv", "48 MB", null],
        ["kassa_export_2022 (1).csv", "51 MB", null],
        ["kasklimaat_ruw_ALLES.csv", "2,1 GB", null],
        ["weegschaal_log.txt", "310 MB", "2023"],
        ["webshop_backup.json", "96 MB", null],
    ];
    const raw = [
        "2023-07-14;08:12;KAS2;21.4;68;;ERR",
        "2023-07-14;08:13;KAS2;21.5;67;0;",
        "1873;AARDB-500;2;4.95;PIN;;;",
        "1874;AARDB-500;1;4.95;CASH;;KORTING?",
        '{"id":88121,"sku":"EI-12","qty":3,"zip":"3991',
        "2023-07-14;08:14;KAS2;;;;ERR",
    ];
    return (
        <div className="rounded-xl border border-green-950/20 bg-white shadow-2xl shadow-green-950/20 overflow-hidden">
            <div className="flex items-center gap-2 bg-slate-700 px-3 py-2 text-xs text-white">
                <FolderOpen size={14} />
                <span className="truncate">{t.path}</span>
                <span className="ml-auto rounded bg-white/20 px-1.5">{example}</span>
            </div>
            <table className="w-full text-xs sm:text-sm text-gray-700">
                <thead>
                    <tr className="bg-gray-50 text-left text-gray-400">
                        {t.cols.map((c) => <th key={c} className="px-3 py-1.5 font-medium">{c}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {files.map(([name, size, opened]) => (
                        <tr key={name} className="border-t border-gray-100">
                            <td className="px-3 py-1.5 font-mono truncate max-w-[180px]">{name}</td>
                            <td className={`px-3 py-1.5 whitespace-nowrap ${size.includes("GB") ? "font-bold text-red-600" : ""}`}>{size}</td>
                            <td className="px-3 py-1.5 text-gray-400">{opened ?? t.never}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <pre className="mx-3 mt-1 max-h-[72px] overflow-hidden rounded bg-slate-900 p-2 text-[10px] leading-snug text-slate-400">{raw.join("\n")}</pre>
            <Notes notes={t.notes} />
        </div>
    );
}

function SpaghettiBefore({ lang, example }: { lang: Lang; example: string }) {
    const t = pick(lang, {
        nl: {
            title: "Hoe het nu gaat bij Café Fictief",
            nodes: ["Webshop", "Kassa", "Excel", "Boekhouding", "Mail", "WhatsApp"],
            edges: ["overtypen", "kopiëren", "screenshot", "handmatig", "nabellen"],
            notes: ["alles 3x overtypen", "wie heeft de laatste versie?", "6 plekken om te kijken"],
        },
        en: {
            title: "How it works today at Café Fictief",
            nodes: ["Web shop", "Till", "Excel", "Accounting", "Email", "WhatsApp"],
            edges: ["retype", "copy", "screenshot", "by hand", "call"],
            notes: ["retype everything 3x", "who has the latest version?", "6 places to look"],
        },
    });
    const pos = [
        { x: 50, y: 30 },
        { x: 270, y: 30 },
        { x: 160, y: 95 },
        { x: 50, y: 165 },
        { x: 270, y: 165 },
        { x: 160, y: 180 },
    ];
    const links: [number, number, number][] = [
        [0, 2, 0], [1, 2, 1], [2, 3, 0], [0, 4, 2], [4, 3, 3], [5, 1, 4], [5, 2, 1], [1, 3, 3], [0, 5, 4],
    ];
    return (
        <div className="rounded-xl border border-green-950/20 bg-white shadow-2xl shadow-green-950/20 overflow-hidden">
            <div className="flex items-center gap-2 bg-rose-700 px-3 py-2 text-xs text-white">
                <Network size={14} />
                <span className="truncate">{t.title}</span>
                <span className="ml-auto rounded bg-white/20 px-1.5">{example}</span>
            </div>
            <svg viewBox="0 0 320 210" className="w-full h-auto" aria-hidden>
                {links.map(([a, b, label], i) => {
                    const p = pos[a], q = pos[b];
                    const mx = (p.x + q.x) / 2 + (i % 2 ? 30 : -30), my = (p.y + q.y) / 2 + (i % 3 ? -20 : 20);
                    return (
                        <g key={i}>
                            <path d={`M ${p.x} ${p.y} Q ${mx} ${my} ${q.x} ${q.y}`} fill="none" stroke="#e11d48" strokeOpacity="0.55" strokeWidth="1.3" strokeDasharray="4 3" />
                            {i < 5 && (
                                <text x={(p.x + 2 * mx + q.x) / 4} y={(p.y + 2 * my + q.y) / 4} fontSize="8" fill="#be123c" textAnchor="middle" fontStyle="italic">
                                    {t.edges[label]}
                                </text>
                            )}
                        </g>
                    );
                })}
                {pos.map((p, i) => (
                    <g key={i}>
                        <rect x={p.x - 34} y={p.y - 11} width="68" height="22" rx="5" fill="#f8fafc" stroke="#94a3b8" />
                        <text x={p.x} y={p.y + 3.5} fontSize="9.5" fontWeight="600" fill="#334155" textAnchor="middle">{t.nodes[i]}</text>
                    </g>
                ))}
            </svg>
            <Notes notes={t.notes} />
        </div>
    );
}

function InboxBefore({ lang, example }: { lang: Lang; example: string }) {
    const t = pick(lang, {
        nl: {
            title: "Inbox (47 ongelezen)",
            from: "Klant",
            mails: ["Zijn jullie zaterdag open?", "Openingstijden zaterdag??", "Kan mijn fiets vandaag nog klaar?", "Wat kost een nieuwe band", "Fiets nog steeds niet klaar!!", "Doen jullie ook e-bikes?"],
            notes: ["elke dag dezelfde vragen", "±3 uur per week", "vergeten te antwoorden"],
        },
        en: {
            title: "Inbox (47 unread)",
            from: "Customer",
            mails: ["Are you open on Saturday?", "Saturday opening hours??", "Can my bike be ready today?", "How much is a new tyre", "Bike STILL not ready!!", "Do you do e-bikes too?"],
            notes: ["same questions every day", "±3 hours a week", "forgot to reply"],
        },
    });
    return (
        <div className="rounded-xl border border-green-950/20 bg-white shadow-2xl shadow-green-950/20 overflow-hidden">
            <div className="flex items-center gap-2 bg-[#1a56b0] px-3 py-2 text-xs text-white">
                <Inbox size={14} />
                <span className="truncate font-semibold">{t.title}</span>
                <span className="ml-auto rounded bg-white/20 px-1.5">{example}</span>
            </div>
            <ul className="divide-y divide-gray-100 text-sm text-gray-800">
                {t.mails.map((m, i) => (
                    <li key={m} className="flex items-center gap-3 px-3 py-2">
                        <span className="h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                        <span className="w-16 shrink-0 font-semibold text-gray-600">{t.from}</span>
                        <span className={`truncate ${i % 2 ? "" : "font-semibold"}`}>{m}</span>
                    </li>
                ))}
            </ul>
            <Notes notes={t.notes} />
        </div>
    );
}

/* ------------------------------------------------------------------------------------
 * "After" views: each in its own client style
 * ---------------------------------------------------------------------------------- */

function BakeryAfter({ lang, example }: { lang: Lang; example: string }) {
    const t = pick(lang, {
        nl: {
            stats: [["Bestellingen morgen", "23", "automatisch verzameld"], ["Bakplan klaar", "05:00", "in je mail"], ["Facturen", "12", "verstuurd · 1 open"]],
            plan: "Bakplan voor morgen",
            items: [["Speltbrood", 48], ["Croissant", 30], ["Appeltaart", 6]] as [string, number][],
            done: ["Dubbele bestelling samengevoegd", "Datums gelijkgetrokken", "Hotel Fictief krijgt een herinnering"],
        },
        en: {
            stats: [["Orders tomorrow", "23", "collected automatically"], ["Baking plan ready", "05:00", "in your inbox"], ["Invoices", "12", "sent · 1 open"]],
            plan: "Baking plan for tomorrow",
            items: [["Spelt bread", 48], ["Croissant", 30], ["Apple pie", 6]] as [string, number][],
            done: ["Duplicate order merged", "Dates normalised", "Hotel Fictief gets a reminder"],
        },
    });
    return (
        <BrandFrame brand={brands.bakery} example={example}>
            <div className="grid gap-3 sm:grid-cols-3">
                {t.stats.map(([l, v, s], i) => <Stat key={l} label={l} value={v} sub={s} delay={0.1 + i * 0.1} />)}
            </div>
            <div className="grid gap-4 sm:grid-cols-[1.2fr_1fr]">
                <div className={`${bCard} p-3 space-y-2`}>
                    <div className="font-bold italic">{t.plan}</div>
                    {t.items.map(([name, n], i) => (
                        <div key={name} className="space-y-1">
                            <div className="flex justify-between text-sm"><span>{name}</span><span className="font-bold">{n}</span></div>
                            <div className="h-2 rounded-full bg-[var(--b-line)]">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${(n / 48) * 100}%` }} transition={{ delay: 0.3 + i * 0.1 }} className="h-2 rounded-full bg-[var(--b-accent)]" />
                            </div>
                        </div>
                    ))}
                </div>
                <DoneList items={t.done} />
            </div>
        </BrandFrame>
    );
}

function FarmAfter({ lang, example }: { lang: Lang; example: string }) {
    const t = pick(lang, {
        nl: {
            title: "Wat je data je vertelt",
            insights: [
                ["Zaterdag is je beste dag", "34% van je omzet komt op zaterdag. Zet daar je extra hulp in."],
                ["In juli gooi je 18% aardbeien weg", "Plant in week 27 minder, of zet ze eerder in de aanbieding."],
                ["Klanten uit Houten komen vaker terug", "Een vaste bezorgdag daar kan de moeite waard zijn."],
            ],
            footer: "Elke maandag een kort rapport in je mail",
        },
        en: {
            title: "What your data is telling you",
            insights: [
                ["Saturday is your best day", "34% of your revenue comes in on Saturday. Put your extra help there."],
                ["In July you throw away 18% of strawberries", "Plant fewer in week 27, or put them on offer sooner."],
                ["Customers from Houten come back more often", "A fixed delivery day there could be worth it."],
            ],
            footer: "A short report in your inbox every Monday",
        },
    });
    const sparks = ["2,14 10,12 18,13 26,9 34,10 42,3", "2,4 10,6 18,5 26,12 34,14 42,8", "2,12 10,11 18,9 26,8 34,6 42,5"];
    return (
        <BrandFrame brand={brands.farm} example={example}>
            <div className="font-bold text-lg">{t.title}</div>
            <div className="space-y-2.5">
                {t.insights.map(([head, body], i) => (
                    <motion.div key={head} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.15 }} className={`${bCard} flex items-center gap-3 p-3`}>
                        <svg viewBox="0 0 44 16" className="h-8 w-16 shrink-0" aria-hidden>
                            <polyline points={sparks[i]} fill="none" stroke="var(--b-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div>
                            <div className="font-bold">{head}</div>
                            <div className={`text-sm ${bMuted}`}>{body}</div>
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="inline-flex rounded-[var(--b-radius)] bg-[var(--b-accent)] px-3 py-1.5 text-sm font-semibold text-[color:var(--b-accent-fg)]">{t.footer}</div>
        </BrandFrame>
    );
}

function CafeAfter({ lang, example }: { lang: Lang; example: string }) {
    const t = pick(lang, {
        nl: {
            inputs: ["Kassa", "Webshop"],
            hub: "1 koppeling",
            outputs: ["Boekhouding", "Voorraad", "Nieuwsbrief"],
            stats: [["Overtypen", "0×"], ["Plekken om te kijken", "6 → 1"], ["Terug per week", "±4 uur"]],
        },
        en: {
            inputs: ["Till", "Web shop"],
            hub: "1 connection",
            outputs: ["Accounting", "Stock", "Newsletter"],
            stats: [["Retyping", "0×"], ["Places to look", "6 → 1"], ["Back per week", "±4 hours"]],
        },
    });
    const chip = `${bCard} px-3 py-1.5 text-sm font-semibold text-center`;
    return (
        <BrandFrame brand={brands.cafe} example={example}>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div className="space-y-2">
                    {t.inputs.map((x, i) => (
                        <motion.div key={x} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.1 }} className={chip}>{x}</motion.div>
                    ))}
                </div>
                <div className="relative flex flex-col items-center gap-1 px-2">
                    <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, type: "spring" }} className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--b-accent)] shadow-lg shadow-pink-500/30">
                        <svg viewBox="0 0 32 32" className="h-9 w-9" aria-hidden>
                            <path d="M6 13h15v8a6 6 0 0 1-6 6h-3a6 6 0 0 1-6-6z" fill="#1e1b2e" />
                            <path d="M21 15h2.5a3 3 0 0 1 0 6H21" fill="none" stroke="#1e1b2e" strokeWidth="2.2" />
                        </svg>
                    </motion.div>
                    <span className="text-xs font-semibold text-[color:var(--b-accent)]">{t.hub}</span>
                    <motion.div className="absolute top-8 -left-3 -right-3 h-0.5 -z-0 bg-gradient-to-r from-transparent via-[var(--b-accent)] to-transparent" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.6, repeat: Infinity }} />
                </div>
                <div className="space-y-2">
                    {t.outputs.map((x, i) => (
                        <motion.div key={x} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 + i * 0.1 }} className={chip}>{x}</motion.div>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
                {t.stats.map(([l, v], i) => <Stat key={l} label={l} value={v} delay={0.6 + i * 0.1} />)}
            </div>
        </BrandFrame>
    );
}

function BikeAfter({ lang, example }: { lang: Lang; example: string }) {
    const t = pick(lang, {
        nl: {
            stats: [["Vragen deze week", "47"], ["Vanzelf beantwoord", "31"], ["Voor jou", "16"]],
            auto: "AUTO",
            you: "VOOR JOU",
            items: [["Zijn jullie zaterdag open?", true], ["Wat kost een nieuwe band", true], ["Fiets nog steeds niet klaar!!", false]] as [string, boolean][],
            note: "Antwoorden in jouw eigen woorden · klachten gaan altijd naar jou",
        },
        en: {
            stats: [["Questions this week", "47"], ["Answered automatically", "31"], ["For you", "16"]],
            auto: "AUTO",
            you: "FOR YOU",
            items: [["Are you open on Saturday?", true], ["How much is a new tyre", true], ["Bike STILL not ready!!", false]] as [string, boolean][],
            note: "Answers in your own words · complaints always go to you",
        },
    });
    return (
        <BrandFrame brand={brands.bike} example={example}>
            <div className="grid grid-cols-3 gap-3">
                {t.stats.map(([l, v], i) => <Stat key={l} label={l} value={v} delay={0.1 + i * 0.1} />)}
            </div>
            <ul className="space-y-2">
                {t.items.map(([q, auto], i) => (
                    <motion.li key={q} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + i * 0.12 }} className={`${bCard} flex items-center justify-between gap-3 border-2 px-3 py-2 text-sm`}>
                        <span className="truncate">{q}</span>
                        <span className={`shrink-0 border-2 border-[color:var(--b-fg)] px-2 py-0.5 text-[11px] font-bold ${auto ? "bg-[var(--b-fg)] text-[color:var(--b-bg)]" : "bg-white"}`}>
                            {auto ? t.auto : t.you}
                        </span>
                    </motion.li>
                ))}
            </ul>
            <div className="text-xs font-bold uppercase tracking-wide">{t.note}</div>
        </BrandFrame>
    );
}

/* ------------------------------------------------------------------------------------ */

type Scenario = {
    id: string;
    icon: LucideIcon;
    tab: { nl: string; en: string };
    brand: Brand;
    Before: (p: { lang: Lang; example: string }) => JSX.Element;
    After: (p: { lang: Lang; example: string }) => JSX.Element;
};

const scenarios: Scenario[] = [
    { id: "orders", icon: ShoppingCart, tab: { nl: "Bestellingen", en: "Orders" }, brand: brands.bakery, Before: SheetBefore, After: BakeryAfter },
    { id: "data", icon: Database, tab: { nl: "Ongebruikte data", en: "Unused data" }, brand: brands.farm, Before: DataDumpBefore, After: FarmAfter },
    { id: "complex", icon: Network, tab: { nl: "Ingewikkeld proces", en: "Complex process" }, brand: brands.cafe, Before: SpaghettiBefore, After: CafeAfter },
    { id: "questions", icon: Inbox, tab: { nl: "Klantvragen", en: "Customer questions" }, brand: brands.bike, Before: InboxBefore, After: BikeAfter },
];

const ui = {
    nl: { before: "Voor", after: "Na", run: "Automatiseer", example: "Voorbeeld", style: "In de huisstijl van" },
    en: { before: "Before", after: "After", run: "Automate", example: "Example", style: "In the house style of" },
} as const;

export default function BeforeAfterDemo({ lang }: { lang: Lang }) {
    const t = ui[lang];
    const [index, setIndex] = useState(0);
    const [after, setAfter] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-120px" });
    const touched = useRef(false);
    const s = scenarios[index];

    // Play the "automation" a moment after an example is shown, unless the visitor already clicked Before/After
    useEffect(() => {
        if (!inView) return;
        touched.current = false;
        const id = setTimeout(() => {
            if (!touched.current) setAfter(true);
        }, 2400);
        return () => clearTimeout(id);
    }, [inView, index]);

    const choose = (v: boolean) => {
        touched.current = true;
        setAfter(v);
    };

    const select = (i: number) => {
        setAfter(false);
        setIndex(i);
    };

    const { Before, After } = s;

    return (
        <div ref={ref} className="min-w-0 space-y-4">
            <div role="tablist" className="flex flex-wrap gap-2">
                {scenarios.map((sc, i) => {
                    const Icon = sc.icon;
                    const active = i === index;
                    return (
                        <button
                            key={sc.id}
                            role="tab"
                            aria-selected={active}
                            onClick={() => select(i)}
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors cursor-pointer ${
                                active ? "border-green-950 bg-green-950 text-lime-200" : "border-green-950/20 bg-white/50 text-green-900 hover:bg-white/80"
                            }`}
                        >
                            <Icon size={15} />
                            {sc.tab[lang]}
                        </button>
                    );
                })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 min-h-[36px]">
                <div role="group" className="inline-flex rounded-full bg-green-950/10 p-1 text-sm font-semibold">
                    {[false, true].map((v) => (
                        <button
                            key={String(v)}
                            onClick={() => choose(v)}
                            aria-pressed={after === v}
                            className={`px-4 py-1.5 rounded-full transition-colors cursor-pointer ${after === v ? "bg-green-950 text-lime-200" : "text-green-900 hover:text-green-950"}`}
                        >
                            {v ? t.after : t.before}
                        </button>
                    ))}
                </div>
                {!after ? (
                    <button onClick={() => choose(true)} className="inline-flex items-center gap-2 rounded-full bg-green-950 px-4 py-1.5 text-sm font-semibold text-lime-200 hover:bg-green-900 cursor-pointer">
                        <Sparkles size={15} />
                        {t.run}
                    </button>
                ) : (
                    // Shows that the result follows the client's look: name, colours and font
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs text-green-950">
                        <span>{t.style} <b>{s.brand.name}</b></span>
                        <span className="flex gap-1">
                            {[...new Set([s.brand.vars.bg, s.brand.vars.accent, s.brand.vars.fg, s.brand.vars.card])].slice(0, 3).map((c) => (
                                <span key={c} className="h-3.5 w-3.5 rounded-full border border-black/15" style={{ background: c }} />
                            ))}
                        </span>
                        <span className="opacity-70">· {s.brand.fontLabel}</span>
                    </motion.div>
                )}
            </div>

            <div className="relative min-h-[420px] sm:min-h-[380px]">
                <AnimatePresence mode="wait">
                    {!after ? (
                        <motion.div
                            key={`before-${s.id}`}
                            initial={{ opacity: 0, rotate: -1 }}
                            animate={{ opacity: 1, rotate: -0.6 }}
                            exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
                            transition={{ duration: 0.35 }}
                        >
                            <Before lang={lang} example={t.example} />
                        </motion.div>
                    ) : (
                        <motion.div key={`after-${s.id}`} initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                            <After lang={lang} example={t.example} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
