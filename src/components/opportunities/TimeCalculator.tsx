import { useState } from "react";
import { motion } from "framer-motion";

type Lang = "nl" | "en";

const WEEKS = 46; // working weeks per year

const text = {
    nl: {
        hours: "Uren per week aan handwerk",
        hoursHint: "Overtypen, lijstjes bijhouden, nabellen, Excel...",
        rate: "Wat is een uur van jou of je personeel waard?",
        perYear: "uur per jaar",
        days: "volle werkdagen",
        money: "aan tijd per jaar",
        note: `Dit is wat het handwerk je nu kost (${WEEKS} werkweken), geen belofte van wat ik bespaar. In de kennismaking kijken we samen welk deel echt te automatiseren is.`,
        perWeek: "u/week",
    },
    en: {
        hours: "Hours per week spent on manual work",
        hoursHint: "Retyping, keeping lists, chasing people, spreadsheets...",
        rate: "What is an hour of your (or your staff's) time worth?",
        perYear: "hours per year",
        days: "full working days",
        money: "worth of time per year",
        note: `This is what the manual work costs you today (${WEEKS} working weeks), not a promise of what I'll save. In the intro call we look at which part can really be automated.`,
        perWeek: "h/week",
    },
} as const;

export default function TimeCalculator({ lang }: { lang: Lang }) {
    const t = text[lang];
    const [hours, setHours] = useState(6);
    const [rate, setRate] = useState(35);

    const locale = lang === "nl" ? "nl-NL" : "en-GB";
    const perYear = hours * WEEKS;
    const days = Math.round(perYear / 8);
    const money = new Intl.NumberFormat(locale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(perYear * rate);

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center">
            <div className="space-y-8 rounded-2xl border border-white/15 bg-black/15 p-5 sm:p-7">
                <label className="block space-y-3">
                    <div className="flex items-baseline justify-between gap-3">
                        <span className="font-semibold">{t.hours}</span>
                        <span className="text-2xl font-bold text-lime-300 tabular-nums">{hours} <span className="text-sm font-medium">{t.perWeek}</span></span>
                    </div>
                    <input type="range" min={1} max={30} value={hours} onChange={(e) => setHours(+e.target.value)} className="w-full accent-lime-300 cursor-pointer" />
                    <p className="text-xs text-emerald-50/60">{t.hoursHint}</p>
                </label>
                <label className="block space-y-3">
                    <div className="flex items-baseline justify-between gap-3">
                        <span className="font-semibold">{t.rate}</span>
                        <span className="text-2xl font-bold text-lime-300 tabular-nums">€{rate}</span>
                    </div>
                    <input type="range" min={15} max={100} step={5} value={rate} onChange={(e) => setRate(+e.target.value)} className="w-full accent-lime-300 cursor-pointer" />
                </label>
            </div>

            <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-white/10 p-5">
                        <motion.div key={perYear} initial={{ scale: 0.9, opacity: 0.5 }} animate={{ scale: 1, opacity: 1 }} className="text-4xl sm:text-5xl font-bold tabular-nums">
                            {perYear}
                        </motion.div>
                        <div className="text-sm text-emerald-50/75">{t.perYear}</div>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-5">
                        <motion.div key={days} initial={{ scale: 0.9, opacity: 0.5 }} animate={{ scale: 1, opacity: 1 }} className="text-4xl sm:text-5xl font-bold tabular-nums">
                            {days}
                        </motion.div>
                        <div className="text-sm text-emerald-50/75">{t.days}</div>
                    </div>
                </div>
                <div className="rounded-2xl bg-lime-300 p-5 text-green-950">
                    <motion.div key={money} initial={{ scale: 0.95, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }} className="text-4xl sm:text-5xl font-bold tabular-nums">
                        {money}
                    </motion.div>
                    <div className="text-sm font-medium">{t.money}</div>
                </div>
                <p className="text-sm text-emerald-50/70 leading-relaxed">{t.note}</p>
            </div>
        </div>
    );
}
