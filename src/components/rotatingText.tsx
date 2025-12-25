// src/components/rotatingText.tsx
'use client';

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import './GradientText.css';

type RotatingTextProps = {
    texts: string[];
    mainClassName?: string;
    staggerFrom?: "first" | "last";
    initial?: never;
    animate?: never;
    exit?: never;
    staggerDuration?: number;
    splitLevelClassName?: string;
    transition?: never;
    rotationInterval?: number;
    // New gradient props:
    gradientColors?: string[];
    gradientSpeed?: number;
};

const RotatingText: React.FC<RotatingTextProps> = ({
                                                       texts,
                                                       mainClassName,
                                                       initial,
                                                       animate,
                                                       exit,
                                                       transition,
                                                       rotationInterval = 2000,
                                                       splitLevelClassName,
                                                       gradientColors = ['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa'],
                                                       gradientSpeed = 8,
                                                   }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (!texts || texts.length === 0) return;
        const id = setInterval(() => {
            setIndex((i) => (i + 1) % texts.length);
        }, rotationInterval);
        return () => clearInterval(id);
    }, [texts, rotationInterval]);

    if (!texts || texts.length === 0) return null;

    const gradientStyle: React.CSSProperties = {
        backgroundImage: `linear-gradient(to right, ${gradientColors.join(', ')})`,
        animationDuration: `${gradientSpeed}s`,
    };

    return (
        <div className={mainClassName}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={texts[index]}
                    initial={initial ?? { y: "100%" }}
                    animate={animate ?? { y: 0 }}
                    exit={exit ?? { y: "-120%" }}
                    transition={transition ?? { type: "spring", damping: 30, stiffness: 400 }}
                    // apply gradient styles and the text-content class that uses background-clip
                    className={`inline-block ${splitLevelClassName ?? ''} text-content`}
                    style={gradientStyle}
                >
                    {texts[index]}
                </motion.span>
            </AnimatePresence>
        </div>
    );
};

export default RotatingText;
