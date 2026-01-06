import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import '../cv/GradientText.css';

type RotatingTextProps = {
    texts: string[];
    mainClassName?: string;
    rotationInterval?: number;
    splitLevelClassName?: string;
    gradientColors?: string[];
    gradientSpeed?: number;
};

const RotatingText: React.FC<RotatingTextProps> = ({
    texts,
    mainClassName,
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
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
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
