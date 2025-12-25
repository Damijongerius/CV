'use client';

import Image from "next/image";

import PersonalCard from "@/components/PersonalCard";
import RotatingText from "@/components/rotatingText";

import './button.css';
import SectionScroller from "@/components/SectionScroller";
import {useRef} from "react";
import ContactDetail from "@/components/ContactDetail";
import ProgressBar from "@/components/ProgressBar";
import ConfidenceScale, {Skill} from "@/components/ConfidenceScale";
import RotatingCarousel from "@/components/RotatingCarousel";

export default function Home() {

    const scrollRef = useRef<HTMLDivElement>(null);

    const sections = [
        {id: "home", label: "Home"},
        {id: "about", label: "About"},
        {id: "projects", label: "Projects"},
        {id: "contact", label: "Contact"},
    ];

    const languageSkills: Skill[] = [
        { label: "Java", value: 90 },
        { label: "C#", value: 80 },
        { label: "Html & Css(Scss)", value: 75 },
        { label: "JavaScript/TypeScript", value: 55 },
        { label: "go", value: 40 },
        { label: "Python", value: 35 },
        { label: "c++", value: 10 },
    ];

    const languageAmbitions: Skill[] = [
        { label: "Java", value: 95 },
        { label: "C#", value: 85 },
        { label: "Html & Css(Scss)", value: 75 },
        { label: "JavaScript/TypeScript", value: 65 },
        { label: "go", value: 50 },
        { label: "Python", value: 70 },
        { label: "c++", value: 20 },
    ];

    const itSkills: Skill[] = [
        { label: "Artificial intelligence", value: 20 },
        { label: "Fullstack development", value: 60 },
        { label: "Cyber security", value: 10 },
        { label: "Scrum Agile", value: 55 },
        { label: "Cloud", value: 15 },
        { label: "DevOps", value: 20 },
        { label: "Databases", value: 40 },
    ];

    const itAmbitions: Skill[] = [
        { label: "Artificial intelligence", value: 60 },
        { label: "Fullstack development", value: 70 },
        { label: "Cyber security", value: 20 },
        { label: "Scrum Agile", value: 60 },
        { label: "Cloud", value: 30 },
        { label: "DevOps", value: 40 },
        { label: "Databases", value: 60 },
    ];

    const softSkills: Skill[] = [
        { label: "Communication", value: 70 },
        { label: "Teamwork", value: 70 },
        { label: "Problem-solving", value: 75 },
        { label: "Adaptability", value: 65 },
        { label: "Time management", value: 50 },
        { label: "Creativity", value: 60 },
        { label: "human", value: 100 },
    ];

    const softAmbitions: Skill[] = [
        { label: "Communication", value: 70 },
        { label: "Teamwork", value: 70 },
        { label: "Problem-solving", value: 75 },
        { label: "Adaptability", value: 65 },
        { label: "Time management", value: 50 },
        { label: "Creativity", value: 60 },
        { label: "eagerness", value: 100 },
    ];


    return (
        <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth overflow-x-hidden">
            <SectionScroller sections={sections}/>
            <section id="home"
                     className="relative snap-start w-full h-screen bg-[#073642] flex items-center justify-center">
                <PersonalCard image={"/dami.jpg"}>
                    <div className="p-4 pt-8">
                        <h2 className="text-3xl font-bold mb-2 text-black">Dami Jongerius</h2>
                        <RotatingText
                            texts={['Software Developer', 'Ai Engineer', 'Software Solution Architect']}
                            mainClassName="text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center"
                            staggerFrom={"last"}
                            staggerDuration={0.025}
                            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                            rotationInterval={4000}
                        />
                        <p className="text-gray-400 text-sm pt-8">
                            Passionate about solving problems through innovative software and AI; curious across the
                            stack
                            with strong backend expertise and hands-on full-stack and AI experience.
                        </p>


                        <button className="button absolute bottom-6 sm:bottom-8 w-56">
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">

                                <path d="M12 3V16M12 16L16 11.625M12 16L8 11.625" stroke="#ffffff" strokeWidth="2.4"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                                <path
                                    d="M15 21H9C6.17157 21 4.75736 21 3.87868 20.1213C3 19.2426 3 17.8284 3 15M21 15C21 17.8284 21 19.2426 20.1213 20.1213C19.8215 20.4211 19.4594 20.6186 19 20.7487"
                                    stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>

                            </svg>
                            <p className="text">Download CV</p>
                        </button>
                    </div>
                </PersonalCard>
            </section>

            <section id="about" className="relative snap-start w-full bg-red-300 h-screen flex flex-col items-center justify-center px-4">
                <div id="about-contact" className="flex items-center justify-center bg-white rounded-lg m-5 p-5 gap-10" >
                    <ContactDetail icon={"/linkedin.png"} name={"linkedin"} backgroundColor={"#ffffff"}/>
                    <ContactDetail icon={"/gmail.webp"} name={"gmail"} backgroundColor={"#ffffff"}/>
                    <ContactDetail icon={"/github.png"} name={"Github"} backgroundColor={"#ffffff"}/>
                </div>

                <RotatingCarousel className="w-full max-w-4xl mx-auto my-6">
                    <ConfidenceScale name={"Language Skills"} current={languageSkills} ambitions={languageAmbitions}/>
                    <ConfidenceScale name={"General IT Skills"} current={itSkills} ambitions={itAmbitions}/>
                    <ConfidenceScale name={"soft skills"} current={softSkills} ambitions={softAmbitions}/>
                </RotatingCarousel>
            </section>

            <section id="projects" className="relative snap-start w-full bg-green-300 h-screen flex items-center justify-center">

                <RotatingCarousel className="w-full max-w-4xl mx-auto my-6">

                </RotatingCarousel>
            </section>

            <section id="contact"
                     className="relative snap-start w-full bg-orange-300 h-screen flex items-center justify-center">
            </section>

        </main>
    );
}
