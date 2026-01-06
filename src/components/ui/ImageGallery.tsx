import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
    projectImages: string[];
    imageIndex: number;
    setImageIndex: React.Dispatch<React.SetStateAction<number>>;
    navigateImage: (dir: number) => void;
    hasMultipleImages: boolean;
    projectTitle: string;
}

export default function ImageGallery({ projectImages, imageIndex, setImageIndex, navigateImage, hasMultipleImages, projectTitle }: Props) {
    const [isHovered, setIsHovered] = React.useState(false);

    React.useEffect(() => {
        if (!hasMultipleImages || isHovered || projectImages.length <= 1) return;
        const id = setInterval(() => navigateImage(1), 4000);
        return () => clearInterval(id);
    }, [hasMultipleImages, isHovered, navigateImage, projectImages.length, imageIndex]);

    return projectImages.length > 0 ? (
        <div
            className="relative group w-full h-full flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

            <div className="relative max-w-full max-h-full">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={imageIndex}
                        src={projectImages[imageIndex]}
                        alt={`${projectTitle} - Image ${imageIndex + 1}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="relative max-w-full max-h-full object-contain rounded-xl shadow-2xl ring-1 ring-white/10"
                    />
                </AnimatePresence>
            </div>

            {hasMultipleImages && (
                <>
                    <button onClick={() => navigateImage(-1)} className="absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm text-foreground shadow-lg ring-1 ring-border hover:bg-background transition-all opacity-0 group-hover:opacity-100" aria-label="Previous image">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={() => navigateImage(1)} className="absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm text-foreground shadow-lg ring-1 ring-border hover:bg-background transition-all opacity-0 group-hover:opacity-100" aria-label="Next image">
                        <ChevronRight size={20} />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 p-2 rounded-full bg-background/60 backdrop-blur-sm">
                        {projectImages.map((_, idx) => (
                            <button key={idx} onClick={() => setImageIndex(idx)} className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === imageIndex ? "bg-primary w-4" : "bg-muted-foreground/50 hover:bg-muted-foreground"}`} aria-label={`View image ${idx + 1}`} />
                        ))}
                    </div>
                </>
            )}
        </div>
    ) : (
        <div className="relative w-full h-full max-w-lg max-h-80">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-50" />
            <div className="relative w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 rounded-xl flex items-center justify-center ring-1 ring-white/10">
                <span className="text-muted-foreground text-xl">Project Preview</span>
            </div>
        </div>
    );
}
