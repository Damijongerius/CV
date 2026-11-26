import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ContactMethod } from "@/types/contact.ts";
import ContactMethods from "@/components/ui/ContactMethods.tsx";
import VisitReason from "@/components/ui/VisitReason.tsx";
import { analyticsEnabled } from "@/lib/analytics.ts";

export default function ContactSection() {
    const methods: ContactMethod[] = [
        {
            id: "email",
            title: "damianojongerius@gmail.com",
            subtitle: "Send me an email",
            href: "mailto:damianojongerius@gmail.com",
            iconSrc: "gmail.webp",
        },
        {
            id: "linkedin",
            title: "Dami Jongerius",
            subtitle: "Connect with me",
            href: "https://www.linkedin.com/in/dami-jongerius-498430254/",
            target: "_blank",
            rel: "noopener noreferrer",
            iconSrc: "linkedin.png",
        },
        {
            id: "github",
            title: "DamiJongerius",
            subtitle: "Check out my code/projects",
            href: "https://github.com/Damijongerius",
            target: "_blank",
            rel: "noopener noreferrer",
            iconSrc: "github.png",
        },
    ];

    return (
        <div className="max-w-4xl mx-auto w-full">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Let's Connect</h2>
                <p className="text-white/80 text-lg max-w-md mx-auto">
                    Have a project in mind or just want to chat? I'd love to hear from you.
                </p>
            </div>

            <div className="grid md:grid-cols-1 gap-10">
                <ContactMethods methods={methods} />
                <VisitReason />
            </div>

            <Link
                to="/opportunities"
                className="group mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl bg-black/20 border border-white/20 px-6 py-5 text-white backdrop-blur-sm transition hover:bg-black/30 hover:-translate-y-0.5"
            >
                <span>
                    <span className="block font-semibold text-lg">Run a small business in the Utrecht region?</span>
                    <span className="block text-sm text-white/80">I help automate the manual work: orders, stock, invoices and spreadsheets.</span>
                </span>
                <span className="inline-flex items-center gap-2 font-semibold whitespace-nowrap">
                    See how I can help
                    <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </span>
            </Link>

            {analyticsEnabled && (
                <p className="text-white/70 text-xs text-center mt-8">
                    This site uses privacy-friendly analytics without cookies: I only see anonymous totals like page views and
                    clicks, never who you are.
                </p>
            )}
        </div>
    );
}