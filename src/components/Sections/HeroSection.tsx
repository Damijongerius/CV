import ContactDetail from "@/components/ui/ContactDetail.tsx";
import PersonalCard from "@/components/ui/PersonalCard.tsx";
import RotatingText from "@/components/ui/RotatingText.tsx";
import PulsingStatusButton from "@/components/ui/PulsingStatusButton.tsx";

export default function HeroSection() {
    return (
        <>
            {/* Decorative background elements */}
            <div
                className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-cyan-500/10 blur-[100px] animate-pulse"/>
            <div
                className="absolute bottom-1/4 -left-32 w-80 h-80 rounded-full bg-purple-500/10 blur-[100px] animate-pulse"
                style={{animationDelay: '1s'}}/>
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-cyan-500/5 to-purple-500/5 blur-[80px]"/>

            <div className="relative z-10 flex flex-col items-center justify-center gap-8">

                <div className="m-4">
                    <PulsingStatusButton></PulsingStatusButton>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                    {/* Socials - Left side on desktop */}
                    <div
                        className="hidden md:flex flex-col gap-3 p-3 bg-white/95 rounded-2xl shadow-xl shadow-black/20">
                        <ContactDetail
                            icon="linkedin.png"
                            name="LinkedIn"
                            backgroundColor="transparent"
                            href="https://www.linkedin.com/in/dami-jongerius-498430254/"
                        />
                        <ContactDetail
                            icon="gmail.webp"
                            name="Gmail"
                            backgroundColor="transparent"
                            href="mailto:damianojongerius@gmail.com"
                        />
                        <ContactDetail
                            icon="github.png"
                            name="Github"
                            backgroundColor="transparent"
                            href="https://github.com/Damijongerius"
                        />
                    </div>

                    <PersonalCard image="dami.jpg">
                        <div className="p-4 pt-8">
                            <h2 className="text-3xl font-bold mb-2 text-black">Dami Jongerius</h2>
                            <RotatingText
                                texts={['Software Developer', 'AI Engineer', 'Software Solution Architect']}
                                mainClassName="text-black overflow-hidden py-0.5 sm:py-1 md:py-2 flex justify-center"
                                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                                rotationInterval={4000}
                            />
                            <p
                                className="text-gray-400 text-sm pt-8"

                            >
                                Passionate about solving problems through innovative software and AI; curious across the
                                stack with strong backend expertise and hands-on full-stack and AI experience.
                            </p>

                            <a
                                href="Damiano Jongerius.pdf"
                                download
                                className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 inline-flex items-center justify-center gap-3 w-64 py-3 bg-blue-500 text-white font-semibold rounded-lg border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
                            >
                                <img src="icons/download.svg" alt="Download icon" className="w-5 h-5" />
                                <span>Download CV</span>
                            </a>
                        </div>
                    </PersonalCard>
                </div>

                {/* Socials - Below card on mobile */}
                <div
                    className="flex md:hidden items-center justify-center gap-3 p-3 bg-white/95 rounded-2xl shadow-xl shadow-black/20 mb-4">
                    <ContactDetail
                        icon="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                        name="LinkedIn"
                        backgroundColor="transparent"
                        href="https://linkedin.com"
                        compact
                    />
                    <ContactDetail
                        icon="https://cdn-icons-png.flaticon.com/512/281/281769.png"
                        name="Gmail"
                        backgroundColor="transparent"
                        href="mailto:example@gmail.com"
                        compact
                    />
                    <ContactDetail
                        icon="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                        name="Github"
                        backgroundColor="transparent"
                        href="https://github.com"
                        compact
                    />
                </div>

            </div>
        </>
    );
}