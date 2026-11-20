import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';

export interface ColorPalette {
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

export interface TimeLineItemProps {
    dateRange: string;
    title: string;
    subtitle?: string;
    description: string;
    tags?: string[];
    className?: string;
    Colors?: ColorPalette;
    to?: string;
    url?: string;
    isFuture?: boolean;
    /** Accepted for compatibility with callers; not rendered on the timeline */
    longDescription?: string;
    urlLabel?: string;
    /** Makes the item clickable without navigating (e.g. selecting something) */
    onSelect?: () => void;
    /** Highlights the item as the currently selected one */
    isActive?: boolean;
}

export default function TimeLineItem({
    dateRange,
    title,
    subtitle,
    description,
    tags = [],
    className = '',
    Colors,
    to,
    url,
    isFuture = false,
    onSelect,
    isActive = false,
}: TimeLineItemProps) {
    const navigate = useNavigate();

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

    const dotClass = isFuture
        ? 'bg-amber-200 border-amber-500 ring-4 ring-white/30 animate-pulse'
        : `${colors.DotBackground} ${colors.DotBorder}`;
    const dateClass = `${colors.DateText} text-sm font-medium`;
    const titleClass = `text-xl font-bold mt-1 ${colors.TitleText} inline-flex items-center gap-2`;
    const subtitleClass = colors.SubtitleText;
    const descClass = `${colors.DescriptionText} text-sm leading-relaxed`;
    const tagClass = `${colors.TagBorder} ${colors.TagBackground} ${colors.TagText}`;

    const isClickable = Boolean(to || url || onSelect);

    const handleClick = () => {
        if (onSelect) {
            onSelect();
        } else if (to) {
            navigate(to);
        } else if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div
            onClick={isClickable ? handleClick : undefined}
            className={`relative flex flex-col md:flex-row md:items-center mb-12 group rounded-xl py-2 transition-colors duration-300 hover:bg-white/[0.04] ${
                isActive ? 'bg-white/10 ring-1 ring-white/25' : ''
            } ${
                isClickable ? 'cursor-pointer' : ''
            } ${className}`}
        >
            {/* Timeline Dot */}
            <div
                className={`absolute left-4 md:left-1/2 w-4 h-4 ${dotClass} rounded-full border-4 -translate-x-1/2 z-10 transition-transform duration-300 group-hover:scale-125`}
            />

            {/* Left Column: shifts smoothly on hover */}
            <div className="md:w-1/2 md:pr-12 md:text-right pl-12 md:pl-0 transition-transform duration-300 ease-out group-hover:translate-x-2 md:group-hover:-translate-x-2">
                <span className={dateClass}>{dateRange}</span>
                <div>
                    <h3 className={titleClass}>
                        <span>{title}</span>
                        {to && (
                            <ArrowRight
                                size={16}
                                className="inline opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1"
                            />
                        )}
                        {!to && url && (
                            <ExternalLink
                                size={14}
                                className="inline opacity-50 transition-opacity duration-300 group-hover:opacity-100"
                            />
                        )}
                    </h3>
                </div>
                {subtitle && <p className={subtitleClass}>{subtitle}</p>}
            </div>

            {/* Right Column: shifts smoothly on hover */}
            <div className="md:w-1/2 md:pl-12 pl-12 mt-2 md:mt-0 transition-transform duration-300 ease-out group-hover:translate-x-2.5">
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
