import React from "react";
import type { ContactMethod } from "../../types/contact";
import ContactMethodItem from "./ContactMethodItem";

export default function ContactMethods({ methods }: { methods: ContactMethod[] }) {
    return (
        <div className="space-y-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <h3 className="text-xl font-semibold text-white mb-6">Get in Touch</h3>
                <div className="space-y-4">
                    {methods.map((m) => (
                        <ContactMethodItem key={m.id} method={m} />
                    ))}
                </div>
            </div>
        </div>
    );
}