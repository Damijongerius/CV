// File: `src/components/ConfidenceScale.tsx`
import { useState } from "react";
import ProgressBar from "@/components/ProgressBar";

export type Skill = { label: string; value: number; color?: string };

interface props {
    name: string
    current: Skill[];
    ambitions: Skill[];
}

export default function ConfidenceScale({name, current, ambitions}:props) {
    const [mode, setMode] = useState<'current' | 'ambitions'>('current');

    return (
        <div id="about-skills" className="w-full max-w-4xl mx-auto p-5 bg-white rounded-lg shadow-lg">
            <div className="mb-4">
                <h2 className="font-extrabold">{name}</h2>

                <div className="w-full flex justify-center mt-4">
                    <div className="switch-wrapper" role="presentation">
                        <div className="switch" role="tablist" aria-label="Mode">
                            <button
                                onClick={() => setMode('current')}
                                className={`switch-btn left ${mode === 'current' ? 'active' : ''}`}
                                aria-pressed={mode === 'current'}
                                role="tab"
                            >
                                Current
                            </button>
                            <button
                                onClick={() => setMode('ambitions')}
                                className={`switch-btn right ${mode === 'ambitions' ? 'active' : ''}`}
                                aria-pressed={mode === 'ambitions'}
                                role="tab"
                            >
                                Ambitions
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {current.map((s, idx) => {
                    const ambition = ambitions[idx];
                    return (
                        <div key={s.label}>
                            <p className="text-sm font-medium mb-1">{s.label}</p>
                            <ProgressBar
                                value={s.value}
                                max={100}
                                secondaryValue={mode === 'ambitions' ? ambition?.value : undefined}
                                secondaryColor="#8b5cf6"
                            />
                        </div>
                    );
                })}
            </div>

            <style jsx>{`
                .switch-wrapper {
                    position: relative;
                    margin-bottom: 10px;
                    display: flex;
                    justify-content: center;
                    width: 100%;
                }

                /* outer container provides the continuous border that "attaches" buttons together */
                .switch {
                    display: flex;
                    width: 340px;
                    gap: 8px;
                    padding: 6px;
                    border-radius: 9999px;
                    border: 1px solid rgba(17,24,39,0.08);
                    background: #ffffff;
                    box-shadow: 0 1px 0 rgba(255,255,255,0.6) inset;
                    align-items: center;
                    position: relative;
                }

                /* centered connector line to visually link the switch with the content below */
                .switch-wrapper::after {
                    content: "";
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    bottom: -10px;
                    width: 2px;
                    height: 12px;
                    background: rgba(17,24,39,0.08);
                    border-radius: 2px;
                }

                .switch-btn {
                    flex: 1;
                    padding: 10px 14px;
                    border: none;
                    background: transparent;
                    color: #111827;
                    font-weight: 600;
                    cursor: pointer;
                    -webkit-appearance: none;
                    text-align: center;
                    border-radius: 8px;
                    position: relative;
                    z-index: 1;
                }

                /* keep outer rounded look while giving buttons slight internal rounding */
                .switch-btn.left {
                    border-top-left-radius: 9999px;
                    border-bottom-left-radius: 9999px;
                }

                .switch-btn.right {
                    border-top-right-radius: 9999px;
                    border-bottom-right-radius: 9999px;
                }

                .switch-btn:focus {
                    outline: 3px solid rgba(59,130,246,0.18);
                    outline-offset: 2px;
                }

                /* active button style — immediate toggle, no animation */
                .switch-btn.active {
                    background: #111827;
                    color: #ffffff;
                }

                /* subtle separator visual (optional) */
                .switch-btn.right {
                    box-shadow: -1px 0 0 rgba(255,255,255,0.04) inset;
                }

                @media (max-width: 560px) {
                    .switch { width: 260px; gap: 6px; padding: 4px; }
                    .switch-btn { padding: 8px 10px; }
                }
                
                
            `}</style>
        </div>
    );
}
