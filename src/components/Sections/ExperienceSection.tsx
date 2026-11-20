import React from "react";
import TimeLineItem from "@/components/ui/TimeLineItem.tsx";
import { experienceData } from "@/data/experience.ts";

export default function ExperienceSection() {
    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Work Experience
            </h2>

            <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/30 md:-translate-x-0.5" />

                {experienceData.map((item) => (
                    <TimeLineItem
                        key={item.id}
                        dateRange={item.dateRange}
                        title={item.title}
                        subtitle={item.subtitle}
                        description={item.shortDescription}
                        tags={item.tags}
                        to={`/experience/${item.slug}`}
                    />
                ))}
            </div>
        </div>
    );
}
