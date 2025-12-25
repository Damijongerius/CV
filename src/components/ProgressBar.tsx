// File: `src/components/ProgressBar.tsx`
import React from "react";

interface Props {
    value?: number; // when omitted -> indeterminate
    max?: number;
    height?: number | string;
    color?: string;
    backgroundColor?: string;
    striped?: boolean;
    animated?: boolean;
    showLabel?: boolean;
    className?: string;
    width?: number | string;
    secondaryValue?: number; // ambition/extension value
    secondaryColor?: string; // color for the extension
}

export default function ProgressBar({
                                        value,
                                        max = 100,
                                        height = 12,
                                        color = "#0ea5e9",
                                        backgroundColor = "#e6eef8",
                                        striped = false,
                                        animated = true,
                                        showLabel = false,
                                        className,
                                        width = "100%",
                                        secondaryValue,
                                        secondaryColor = "#A78BFA",
                                    }: Props) {
    const isDeterminate = typeof value === "number";
    const safeValue = isDeterminate ? Math.max(0, Math.min(max, value as number)) : 0;
    const pct = isDeterminate ? Math.round((safeValue / max) * 100) : 0;
    const heightCss = typeof height === "number" ? `${height}px` : height;
    const widthCss = typeof width === "number" ? `${width}px` : width;

    const isSecondaryValid =
        typeof secondaryValue === "number" && isDeterminate && secondaryValue > safeValue;
    const safeSecondary = isSecondaryValid ? Math.max(0, Math.min(max, secondaryValue as number)) : 0;
    const secondaryPct = isSecondaryValid ? Math.round((safeSecondary / max) * 100) : 0;

    const rootStyle: React.CSSProperties = {
        width: widthCss,
    };

    const trackStyle: React.CSSProperties = {
        height: heightCss,
        background: backgroundColor,
        position: "relative",
    };

    return (
        <div
            className={`progress ${className ?? ""}`}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={max}
            {...(isDeterminate ? { "aria-valuenow": safeValue } : {})}
            aria-label={isDeterminate ? `Progress ${pct}%` : "Progress loading"}
            style={rootStyle}
        >
            <div className="track" style={trackStyle}>
                {isSecondaryValid ? (
                    <div
                        className="extension"
                        style={{
                            left: `${pct}%`,
                            width: `${Math.max(0, secondaryPct - pct)}%`,
                            background: secondaryColor,
                        }}
                        aria-hidden
                    />
                ) : null}

                <div
                    className={`bar ${striped ? "striped" : ""} ${!isDeterminate ? "indeterminate" : ""} ${
                        animated ? "animated" : ""
                    }`}
                    style={{
                        width: isDeterminate ? `${pct}%` : undefined,
                        backgroundColor: color,
                        position: "relative",
                        zIndex: 2,
                    }}
                >
                    {showLabel && isDeterminate ? <span className="label">{pct}%</span> : null}
                </div>
            </div>

            <style jsx>{`
                .progress {
                    width: 100%;
                }

                .track {
                    width: 100%;
                    border-radius: 9999px;
                    overflow: hidden;
                    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35);
                    position: relative;
                }

                /* Purple extension that animates left/width and shows a slanted separator */
                .extension {
                    position: absolute;
                    top: 0;
                    height: 100%;
                    z-index: 1;
                    border-radius: 0 9999px 9999px 0; /* rounded outer edge */
                    transition: left 420ms cubic-bezier(.2,.9,.2,1), width 420ms cubic-bezier(.2,.9,.2,1), background 220ms;
                    will-change: left, width;
                    overflow: visible;
                }

                /* small slanted separator at the start of the extension — animates with the extension */
                .extension::before {
                    content: "";
                    position: absolute;
                    left: -14px;
                    top: -10%;
                    width: 28px;
                    height: 120%;
                    background: rgba(255,255,255,0.12);
                    transform: rotate(18deg);
                    border-radius: 2px;
                    transition: transform 220ms ease, opacity 220ms ease;
                    opacity: 1;
                    pointer-events: none;
                }

                .bar {
                    height: 100%;
                    width: 0%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 0.75rem;
                    font-weight: 600;
                    line-height: 1;
                    transition: width 420ms cubic-bezier(.2, .9, .2, 1), transform 220ms ease;
                    will-change: width, transform;
                }

                .bar.animated:hover {
                    transform: translateY(-2px) scaleY(1.02);
                }

                /* Stripes */
                .striped {
                    background-image: linear-gradient(
                            45deg,
                            rgba(255, 255, 255, 0.12) 25%,
                            transparent 25%,
                            transparent 50%,
                            rgba(255, 255, 255, 0.12) 50%,
                            rgba(255, 255, 255, 0.12) 75%,
                            transparent 75%,
                            transparent
                    );
                    background-size: 1rem 1rem;
                }

                .striped.animated {
                    animation: stripe-move 1s linear infinite;
                }

                @keyframes stripe-move {
                    from {
                        background-position: 0 0;
                    }
                    to {
                        background-position: 1rem 0;
                    }
                }

                /* Indeterminate animation */
                .indeterminate {
                    position: relative;
                    min-width: 20%;
                    width: 40%;
                    max-width: 60%;
                    animation: indeterminate-move 1.6s cubic-bezier(.2, .7, .2, 1) infinite;
                }

                @keyframes indeterminate-move {
                    0% {
                        transform: translateX(-35%);
                    }
                    50% {
                        transform: translateX(10%);
                        width: 60%;
                    }
                    100% {
                        transform: translateX(110%);
                        width: 40%;
                    }
                }

                .label {
                    padding: 0 6px;
                    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
                }
            `}</style>
        </div>
    );
}
