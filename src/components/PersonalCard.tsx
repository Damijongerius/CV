// src/components/PersonalCard.tsx
import React from 'react';
import Image from "next/image";

type PersonalCardProps = {
    size?: number; // diameter of the sphere in px
    image: string; // image JSX element (e.g. <Image ... />)
    color?: string; // sphere background color
    className?: string;
    children?: React.ReactNode;
};

export default function PersonalCard({
                                         size = 180,
                                         image,
                                         color = '#2563eb',
                                         className = '',
                                         children,
                                     }: PersonalCardProps) {
    const id = React.useId();

    const width = 320;
    const height = 500;
    const cornerRadius = 12;
    const sphereRadius = size / 2;
    const notchPadding = 40;
    const notchRadius = sphereRadius + notchPadding;

    // Move the notch (and thus sphere) higher within the SVG:
    const notchCenterY = Math.max(notchRadius * 0.35, notchRadius * 0.2);

    // Build a smooth bezier notch path (two cubic curves forming a "U" dip)
    const cx = width / 2;
    const startX = cx - notchRadius - 30; // left shoulder of notch
    const endX = cx + notchRadius + 30; // right shoulder of notch
    const dipY = notchCenterY + notchRadius * 0.25; // deepest point y (a bit below circle center)
    const cpOffset = notchRadius * 0.85; // horizontal control offset for smoothness

    const notchPath = [
        `M ${startX} 0`, // start at top edge left of dip
        `C ${startX + cpOffset} 0 ${cx - cpOffset} ${dipY} ${cx} ${dipY}`, // left cubic into dip
        `C ${cx + cpOffset} ${dipY} ${endX - cpOffset} 0 ${endX} 0`, // right cubic out of dip
        `L ${endX} ${-1}`, // tiny extension to ensure proper closure
        `L ${startX} ${-1}`,
        'Z',
    ].join(' ');

    const wrapperStyle: React.CSSProperties = {
        width,
        maxWidth: '100%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
    };

    const sphereStyle: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        left: '50%',
        // move sphere higher so it sits more into the SVG notch
        transform: 'translate(-50%, -15%)',
        width: size,
        height: size,
        borderRadius: '50%',
        boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
        border: '3px solid rgba(255,255,255,0.95)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: Math.max(14, Math.floor(size / 3.5)),
        userSelect: 'none',
        zIndex: 3,
    };

    const cardContainerStyle: React.CSSProperties = {
        marginTop: size / 2,
        width: '100%',
        minHeight: height,
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
    };

    const contentStyle: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        paddingTop: notchRadius / 2 + 20,
        gap: 8,
        boxSizing: 'border-box',
    };

    const nameStyle: React.CSSProperties = { margin: 0, fontSize: 20, fontWeight: 800 };
    const titleStyle: React.CSSProperties = { margin: 0, fontSize: 14, color: '#6b7280' };

    return (
        <div style={wrapperStyle} className={className}>
            <div style={sphereStyle} aria-hidden>
                <Image src={image} alt={"profile"} fill style={{ objectFit: "cover", borderRadius: "50%" }} />
            </div>

            <div style={cardContainerStyle} aria-hidden={false}>
                <svg
                    width="100%"
                    viewBox={`0 0 ${width} ${height}`}
                    preserveAspectRatio="xMidYMid meet"
                    style={{ display: 'block' }}
                    aria-hidden
                >
                    <defs>
                        {/* mask: white = visible, black = cutout (we use a bezier path for the notch) */}
                        <mask id={`cutout-mask-${id}`}>
                            <rect x="0" y="0" width={width} height={height} rx={cornerRadius} ry={cornerRadius} fill="white" />
                            <path d={notchPath} fill="black" />
                        </mask>

                        {/* subtle shadow under the card */}
                        <filter id={`shadow-${id}`} x="-50%" y="-50%" width="200%" height="200%">
                            <feDropShadow dx="0" dy="10" stdDeviation="18" floodColor="rgba(0,0,0)" floodOpacity="0.08" />
                        </filter>
                    </defs>

                    {/* card rect with bezier notch mask applied */}
                    <rect
                        x="0"
                        y="0"
                        width={width}
                        height={height}
                        rx={cornerRadius}
                        ry={cornerRadius}
                        fill="#ffffff"
                        mask={`url(#cutout-mask-${id})`}
                        filter={`url(#shadow-${id})`}
                    />

                    {/* subtle stroke */}
                    <rect
                        x="0.5"
                        y="0.5"
                        width={width - 1}
                        height={height - 1}
                        rx={cornerRadius}
                        ry={cornerRadius}
                        fill="none"
                        stroke="rgba(0,0,0,0.04)"
                        mask={`url(#cutout-mask-${id})`}
                    />
                </svg>

                <div style={contentStyle}>
                    <div style={{width: '100%', height: '100%' }}>{children}</div>
                </div>
            </div>
        </div>
    );
}
