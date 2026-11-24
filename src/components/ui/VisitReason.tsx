import React, { useState } from "react";
import { analyticsEnabled, track } from "@/lib/analytics.ts";

const reasons = [
    { id: "recruiter", label: "Hiring / recruiting" },
    { id: "collaboration", label: "Want to work together" },
    { id: "projects", label: "Checking out a project" },
    { id: "curious", label: "Just curious" },
];

const STORAGE_KEY = "visit-reason-answered";

function alreadyAnswered() {
    try {
        return localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
        return false;
    }
}

/** One-click, anonymous "what brought you here?" question. Only shown when analytics is on. */
export default function VisitReason() {
    const [answered, setAnswered] = useState(alreadyAnswered);

    if (!analyticsEnabled) return null;

    const answer = (id: string) => {
        track("visit-reason", { reason: id });
        setAnswered(true);
        try {
            localStorage.setItem(STORAGE_KEY, "1");
        } catch {
            /* private mode: fine, it just may ask again */
        }
    };

    return (
        <div className="rounded-2xl border border-white/30 bg-white/10 backdrop-blur-sm px-5 py-4 text-center">
            {answered ? (
                <p className="text-white font-medium">Thanks — that helps me a lot!</p>
            ) : (
                <>
                    <p className="text-white font-semibold mb-3">What brought you here?</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {reasons.map((r) => (
                            <button
                                key={r.id}
                                onClick={() => answer(r.id)}
                                className="px-4 py-1.5 rounded-full bg-white/90 text-orange-700 text-sm font-semibold hover:bg-white transition-colors cursor-pointer"
                            >
                                {r.label}
                            </button>
                        ))}
                    </div>
                    <p className="text-white/70 text-xs mt-3">Anonymous, one click — no personal data.</p>
                </>
            )}
        </div>
    );
}
