import React from "react";
import type { ContactMethod } from "@/types/contact.ts";
import ContactMethods from "@/components/ui/ContactMethods.tsx";

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
            </div>
        </div>
    );
}