import React, { useState } from "react";

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // keep side effects minimal here; replace with your submission logic
        console.log("Contact form submitted:", { name, email, message });
        setName("");
        setEmail("");
        setMessage("");
    };

    return (
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
            <h3 className="text-xl font-semibold text-white mb-6">Send a Message</h3>

            <form className="space-y-4" onSubmit={onSubmit}>
                <div>
                    <label className="block text-white/90 text-sm font-medium mb-2">Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Your name"
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-white/90 text-sm font-medium mb-2">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-white/90 text-sm font-medium mb-2">Message</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        placeholder="What's on your mind?"
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent resize-none"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-white text-orange-600 font-semibold rounded-xl hover:bg-white/90 transition-colors shadow-lg"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
}