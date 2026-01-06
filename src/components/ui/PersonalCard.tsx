import React, { useId, useEffect, useState } from 'react';

type PersonalCardProps = {
    size?: number;
    image: string;
    color?: string;
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
    const id = useId();


    const width = 320;

    const defaultHeight = 500;
    const minScreenThreshold = 800;

    const [height, setHeight] = useState<number>(() => {
        if (typeof window === 'undefined') return defaultHeight;
        const h = window.innerHeight;
        return h < minScreenThreshold ? Math.max(360, h - 200) : defaultHeight;
    });

    useEffect(() => {
        function onResize() {
            const h = window.innerHeight;
            setHeight(h < minScreenThreshold ? Math.max(360, h - 200) : defaultHeight);
        }
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const cornerRadius = 12;
    const sphereRadius = size / 2;
    const notchPadding = 40;
    const notchRadius = sphereRadius + notchPadding;

    const notchCenterY = Math.max(notchRadius * 0.35, notchRadius * 0.2);

    const cx = width / 2;
    const startX = cx - notchRadius - 30;
    const endX = cx + notchRadius + 30;
    const dipY = notchCenterY + notchRadius * 0.25;
    const cpOffset = notchRadius * 0.85;

    const notchPath = [
        `M ${startX} 0`,
        `C ${startX + cpOffset} 0 ${cx - cpOffset} ${dipY} ${cx} ${dipY}`,
        `C ${cx + cpOffset} ${dipY} ${endX - cpOffset} 0 ${endX} 0`,
        `L ${endX} ${-1}`,
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
        overflow: 'hidden',
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

    return (
        <div style={wrapperStyle} className={className}>
            <div style={sphereStyle} aria-hidden>
                <img 
                    src={image} 
                    alt="profile" 
                    style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        borderRadius: '50%' 
                    }} 
                />
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
                        <mask id={`cutout-mask-${id}`}>
                            <rect x="0" y="0" width={width} height={height} rx={cornerRadius} ry={cornerRadius} fill="white" />
                            <path d={notchPath} fill="black" />
                        </mask>

                        <filter id={`shadow-${id}`} x="-50%" y="-50%" width="200%" height="200%">
                            <feDropShadow dx="0" dy="10" stdDeviation="18" floodColor="rgba(0,0,0)" floodOpacity="0.08" />
                        </filter>
                    </defs>

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
