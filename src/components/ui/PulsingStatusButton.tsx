export default function PulsingStatusButton() {
    return (
        <>
            {/* Available badge - clickable */}
            <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 backdrop-blur-sm hover:bg-emerald-500/20 hover:border-emerald-400/50 transition-all duration-300 cursor-pointer group"
            >
                    <span className="relative flex h-3 w-3">
                        <span
                            className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
                    </span>
                <span className="text-sm text-emerald-300 font-medium group-hover:text-emerald-200 transition-colors">Available for opportunities</span>
            </button>
        </>
    );
}