import { useRef } from "react";
import SectionScroller from "@/components/ui/SectionScroller.tsx";
import '@/components/cv/button.css';
import HeroSection from "@/components/Sections/HeroSection.tsx";
import ProjectsSection from "@/components/Sections/ProjectsSection.tsx";
import AcademicsSection from "@/components/Sections/AcademicsSection.tsx";
import ExperienceSection from "@/components/Sections/ExperienceSection.tsx";
import ContactSection from "@/components/Sections/ContactSection.tsx";

export default function CVPage() {
    const scrollRef = useRef<HTMLElement>(null);

    const sections = [
        { id: "home", label: "Home" },
        { id: "experience", label: "Experience" },
        { id: "academics", label: "Academics" },
        { id: "projects", label: "Projects" },
        { id: "contact", label: "Contact" },
    ];


    return (
        <>
            <SectionScroller sections={sections} containerRef={scrollRef} />
            <main 
                ref={scrollRef}
                className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth overflow-x-hidden"
            >
                <section 
                    id="home"
                    className="relative snap-start w-full min-h-screen bg-slate-950 flex items-center justify-center px-4 overflow-hidden"
                >
                    <HeroSection/>
                </section>

                <section 
                    id="experience" 
                    className="relative snap-start w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 min-h-screen flex items-center justify-center px-6 py-16"
                >
                    <ExperienceSection/>
                </section>

                <section 
                    id="academics" 
                    className="relative snap-start w-full bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 min-h-screen flex items-center justify-center px-6 py-16"
                >
                    <AcademicsSection/>
                </section>

                <section 
                    id="projects" 
                    className="relative snap-start w-full bg-gradient-to-br from-emerald-200 to-teal-300 h-screen flex flex-col"
                >
                    <ProjectsSection />
                </section>

                <section 
                    id="contact"
                    className="relative snap-start w-full bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 min-h-screen flex items-center justify-center px-6 py-16"
                >
                    <ContactSection/>
                </section>
            </main>
        </>
    );
}
