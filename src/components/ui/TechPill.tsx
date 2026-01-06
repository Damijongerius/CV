import React from "react";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {Technology} from "@/types/projects.ts";

const getIcon = (iconName?: string): LucideIcon | null => {
    if (!iconName) return null;
    const icon = (Icons as Record<string, unknown>)[iconName];
    if (typeof icon === "function" || (typeof icon === "object" && icon !== null && "$$typeof" in icon)) {
        return icon as LucideIcon;
    }
    return null;
};

export default function TechPill({ tech }: { tech: Technology }) {
    const IconComponent = getIcon(tech.icon);
    const bgColor = tech.color ? `hsl(${tech.color} / 0.15)` : undefined;
    const textColor = tech.color ? `hsl(${tech.color})` : undefined;

    return (
        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-transform hover:scale-105" style={{ backgroundColor: bgColor || "hsl(var(--primary) / 0.1)", color: textColor || "hsl(var(--primary))" }}>
      {IconComponent && <IconComponent size={14} />}
            {tech.name}
    </span>
    );
}
