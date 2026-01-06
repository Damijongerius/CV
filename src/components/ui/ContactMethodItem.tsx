import React from "react";
import type { ContactMethod } from "../../types/contact";

export default function ContactMethodItem({ method }: { method: ContactMethod }) {
    return (
        <a
            href={method.href}
            target={method.target}
            rel={method.rel}
            className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors group md:gap-4 md:p-4"
        >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center md:w-12 md:h-12">
                {method.iconSrc ? (
                    <img src={method.iconSrc} alt={method.title} className="w-5 h-5 md:w-6 md:h-6"/>
                ) : (
                    <span className="w-5 h-5 bg-white/50 rounded-full md:w-6 md:h-6"/>
                )}
            </div>
            <div>
                <p className="text-white font-medium group-hover:underline text-sm md:text-base">{method.title}</p>
                {method.subtitle && <p className="text-white/70 text-xs md:text-sm">{method.subtitle}</p>}
            </div>
        </a>
    );
}