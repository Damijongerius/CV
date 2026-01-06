interface Props {
    icon: string;
    name: string;
    backgroundColor?: string;
    href?: string;
    compact?: boolean;
}

export default function ContactDetail({ icon, name, backgroundColor, href, compact = false }: Props) {
    const bg = backgroundColor ?? "transparent";

    const content = (
        <div 
            className="inline-flex flex-col items-center gap-1.5 p-1.5 cursor-pointer select-none outline-none group"
            role="button" 
            tabIndex={0}
        >
            <div 
                className={`${compact ? 'w-20 h-12' : 'w-16 h-16'} rounded-xl overflow-hidden flex items-center justify-center transition-all duration-200 ease-out group-hover:translate-y-[-4px] group-hover:scale-110 group-focus:translate-y-[-4px] group-focus:scale-110`}
                style={{ backgroundColor: bg }}
            >
                <img src={icon} alt={`${name} icon`} className={`${compact ? 'w-12 h-12' : 'w-10 h-10'} object-contain`} />
            </div>
            <p className={`m-0 ${compact ? 'text-xs' : 'text-sm'} text-gray-700 font-medium text-center leading-none`}>{name}</p>
        </div>
    );

    if (href) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className="no-underline">
                {content}
            </a>
        );
    }

    return content;
}
