import React from 'react';

interface ColorPalette {
    DotBackground: string;
    DotBorder: string;
    DateText: string;
    TitleText: string;
    SubtitleText: string;
    DescriptionText: string;
    TagBackground: string;
    TagBorder: string;
    TagText: string;
}

interface TimeLineItemProps {
    dateRange: string;
    title: string;
    subtitle?: string;
    description: string;
    tags?: string[];
    className?: string;
    Colors?: ColorPalette;
}

export default function TimeLineItem({
                                         dateRange,
                                         title,
                                         subtitle,
                                         description,
                                         tags = [],
                                         className = '',
                                         Colors,
                                     }: TimeLineItemProps) {
    const defaultColors: ColorPalette = {
        DotBackground: 'bg-purple-400',
        DotBorder: 'border-indigo-900',
        DateText: 'text-purple-300',
        TitleText: 'text-white',
        SubtitleText: 'text-gray-400',
        DescriptionText: 'text-gray-300',
        TagBackground: 'bg-purple-500/20',
        TagBorder: 'border-purple-400/30',
        TagText: 'text-purple-200',
    };

    const colors: ColorPalette = { ...defaultColors, ...(Colors || {}) };

    const dotClass = `${colors.DotBackground} ${colors.DotBorder}`;
    const dateClass = `${colors.DateText} text-sm font-medium`;
    const titleClass = `text-xl font-bold mt-1 ${colors.TitleText}`;
    const subtitleClass = colors.SubtitleText;
    const descClass = `${colors.DescriptionText} text-sm leading-relaxed`;
    const tagClass = `${colors.TagBorder} ${colors.TagBackground} ${colors.TagText}`;

    return (
        <div className={`relative flex flex-col md:flex-row md:items-center mb-12 ${className}`}>
            <div
                className={`absolute left-4 md:left-1/2 w-4 h-4 ${dotClass} rounded-full border-4 -translate-x-1/2 z-10`}
            />
            <div className="md:w-1/2 md:pr-12 md:text-right pl-12 md:pl-0">
                <span className={dateClass}>{dateRange}</span>
                <h3 className={titleClass}>{title}</h3>
                {subtitle && <p className={subtitleClass}>{subtitle}</p>}
            </div>
            <div className="md:w-1/2 md:pl-12 pl-12 mt-2 md:mt-0">
                <p className={descClass}>{description}</p>
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {tags.map((t, i) => (
                            <span
                                key={`${t}-${i}`}
                                className={`inline-flex items-center rounded-full ${tagClass} px-2.5 py-0.5 text-xs font-semibold`}
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
