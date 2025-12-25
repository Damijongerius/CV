// typescriptreact
import path from "path";
import React, { useRef, useState, useEffect, Children } from "react";

type Props = {
    children: React.ReactNode;
    className?: string;
};

export default function RotatingCarousel({ children, className }: Props) {
    const [index, setIndex] = useState(1);
    const [transitioning, setTransitioning] = useState(false);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const outerRef = useRef<HTMLDivElement | null>(null);

    const startX = useRef<number | null>(null);
    const deltaX = useRef(0);

    const [popOut, setPopOut] = useState(false);

    const childrenArray = Children.toArray(children);
    const slides = childrenArray.length
        ? [
            childrenArray[childrenArray.length - 1],
            ...childrenArray,
            childrenArray[0],
        ]
        : [];

    useEffect(() => {
        if (!trackRef.current || slides.length === 0) return;

        const node = trackRef.current;
        const onTransitionEnd = () => {
            setTransitioning(false);
            if (index === 0) {
                node.style.transition = "none";
                setIndex(slides.length - 2);
                requestAnimationFrame(() => (node.style.transition = ""));
            } else if (index === slides.length - 1) {
                node.style.transition = "none";
                setIndex(1);
                requestAnimationFrame(() => (node.style.transition = ""));
            }
        };

        node.addEventListener("transitionend", onTransitionEnd);
        return () => node.removeEventListener("transitionend", onTransitionEnd);
    }, [index, slides.length]);

    useEffect(() => {
        const updatePopOut = () => {
            const el = outerRef.current;
            if (!el) return;
            // decide threshold for "space" — here when container width >= 640px
            // adjust as needed
            setPopOut(el.clientWidth >= 640);
        };

        updatePopOut();
        window.addEventListener("resize", updatePopOut);
        return () => window.removeEventListener("resize", updatePopOut);
    }, []);

    if (childrenArray.length === 0) return null;

    const go = (next: number) => {
        if (transitioning) return;
        setTransitioning(true);
        setIndex(next);
    };
    const next = () => go(index + 1);
    const prev = () => go(index - 1);

    const onTouchStart = (e: React.TouchEvent) => {
        startX.current = e.touches[0].clientX;
        deltaX.current = 0;
    };
    const onTouchMove = (e: React.TouchEvent) => {
        if (startX.current == null) return;
        deltaX.current = e.touches[0].clientX - startX.current;
    };
    const onTouchEnd = () => {
        if (startX.current == null) return;
        if (deltaX.current < -40) next();
        else if (deltaX.current > 40) prev();
        startX.current = null;
        deltaX.current = 0;
    };

    const outerWrapperStyle: React.CSSProperties = {
        overflow: "visible", // allow buttons to pop out
        position: "relative",
    };

    const windowStyle: React.CSSProperties = {
        overflow: "hidden", // keep track clipped
        position: "relative",
    };

    const trackStyle: React.CSSProperties = {
        display: "flex",
        width: `${slides.length * 100}%`,
        transform: `translateX(-${index * (100 / slides.length)}%)`,
        transition: transitioning ? "transform 320ms cubic-bezier(.2,.9,.2,1)" : undefined,
    };

    const slideStyle: React.CSSProperties = {
        width: `${100 / slides.length}%`,
        flexShrink: 0,
        display: "flex",
        justifyContent: "center",
    };

    const buttonSize = popOut ? 56 : 44;
    const sideOffset = popOut ? -(buttonSize / 2) : 8; // negative offsets pop out
    const buttonBase: React.CSSProperties = {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: buttonSize,
        height: buttonSize,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.22)", // see-through until hover
        color: "white",
        border: "none",
        borderRadius: buttonSize / 6,
        padding: 0,
        cursor: "pointer",
        zIndex: 20,
        fontSize: Math.round(buttonSize * 0.55),
        transition: "background 160ms ease, transform 160ms ease, opacity 160ms ease",
        opacity: 0.95,
        boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
    };

    const leftButtonStyle: React.CSSProperties = {
        ...buttonBase,
        left: popOut ? sideOffset : 8,
    };

    const rightButtonStyle: React.CSSProperties = {
        ...buttonBase,
        right: popOut ? sideOffset : 8,
    };

    const buttonHoverProps = {
        onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => {
            const t = e.currentTarget;
            t.style.background = "rgba(0,0,0,0.9)";
            t.style.transform = "translateY(-50%) scale(1.06)";
        },
        onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => {
            const t = e.currentTarget;
            t.style.background = "rgba(0,0,0,0.22)";
            t.style.transform = "translateY(-50%) scale(1)";
        },
        onFocus: (e: React.FocusEvent<HTMLButtonElement>) => {
            const t = e.currentTarget;
            t.style.background = "rgba(0,0,0,0.9)";
            t.style.transform = "translateY(-50%) scale(1.06)";
        },
        onBlur: (e: React.FocusEvent<HTMLButtonElement>) => {
            const t = e.currentTarget;
            t.style.background = "rgba(0,0,0,0.22)";
            t.style.transform = "translateY(-50%) scale(1)";
        },
    };

    return (
        <div ref={outerRef} style={outerWrapperStyle} className={className}>
            <div style={windowStyle}>
                <div
                    ref={trackRef}
                    style={trackStyle}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    aria-live="polite"
                >
                    {slides.map((child, i) => {
                        const isHidden = i !== index;
                        if (!React.isValidElement(child)) {
                            return <div key={i} style={slideStyle} aria-hidden={isHidden} />;
                        }

                        return (
                            <div key={i} style={slideStyle} aria-hidden={isHidden}>
                                <div style={{ width: "100%" }}>{child}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <button
                aria-label="Previous"
                onClick={prev}
                style={leftButtonStyle}
                {...buttonHoverProps}
            >
                <svg
                    width="60%"
                    height="60%"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M15 18l-6-6 6-6"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                    />
                </svg>
            </button>

            <button
                aria-label="Next"
                onClick={next}
                style={rightButtonStyle}
                {...buttonHoverProps}
            >
<svg
    width="60%"
    height="60%"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
>
    <path
        d="M15 18l-6-6 6-6"
        transform="rotate(180 12 12)"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
    />
</svg>
            </button>
        </div>
    );
}
