export interface ExperienceItem {
    id: string;
    slug: string;
    dateRange: string;
    title: string;
    subtitle: string;
    shortDescription: string;
    tags: string[];
    websiteUrl?: string;
    websiteLabel?: string;
    showWebsiteEmbed?: boolean;
    images?: { src: string; caption: string }[];
    sections: {
        whatIDid: string;
        whereIFocused: string;
        whatILearned: string;
        whatCouldBeBetter: string;
    };
}

export const experienceData: ExperienceItem[] = [
    {
        id: "1",
        slug: "kaliber",
        dateRange: "2026/February - Present",
        title: "AI Intern",
        subtitle: "Kaliber (Utrecht)",
        shortDescription:
            "At Kaliber I tried to solve the (nearly) impossible: migrating codebases with local AI models. I failed—and learned more from that than from any success. In my final weeks I built a prototype for smarter linting to help AI (and developers) catch mistakes faster.",
        tags: ["Local LLMs", "GPU / MoE", "Linting", "Security", "Python", "Utrecht"],
        websiteUrl: "https://kaliber.net",
        websiteLabel: "kaliber.net",
        // kaliber.net blocks being embedded in an iframe
        showWebsiteEmbed: false,
        sections: {
            whatIDid:
                "To be honest: I tried to solve the impossible, and I failed. My assignment was a tool that transfers (migrates) codebases using local AI models. I knew the basics of running a normal model on a GPU, but I didn't have the experience to push much larger models—for example by offloading Mixture-of-Experts (MoE) models to the SSD. Towards the end I looked for people within the company to optimize the tool for, but it still didn't get to where it needed to be.",
            whereIFocused:
                "While working on the migration tool I ran into a problem that is still very real in modern development and AI development: linting and security. AI happily repeats simple mistakes that have already been made a thousand times. So in my last weeks I focused on perfecting a prototype for smarter linting—something that can correct code and helps a lot further than a classic linter. Smarter linting helps AI become smarter, or at least find those simple mistakes faster.",
            whatILearned:
                "The failure is the lesson. I learned first-hand how hard this problem really is—and that if it's this hard for me, others won't be able to easily solve it either. I also learned that I have to be adaptive and creative: when the original goal isn't reachable, find the part of the problem where you can still deliver real value.",
            whatCouldBeBetter:
                "I should have validated much earlier whether the goal was realistic with the hardware and experience I had, and scoped it down sooner. Asking colleagues for input and finding concrete users to build for earlier—instead of near the end—would have given the project a better chance.",
        },
    },
    {
        id: "2",
        slug: "minor-kenya",
        dateRange: "2025/October - 2025/December",
        title: "Minor Kenya",
        subtitle: "HU Open-ICT",
        shortDescription:
            "I taught a group of students how to use computers and basic programming of websites with a group of fellow students in Kenya.",
        tags: ["Teaching", "Teamwork", "Communication", "Community"],
        websiteUrl: "https://github.com/Damijongerius/Minor-Kenya-Website",
        websiteLabel: "github.com/Damijongerius/Minor-Kenya-Website",
        showWebsiteEmbed: false,
        images: [
            {
                src: "images/about/kenya-teaching.jpeg",
                caption: "Teaching basic computer skills and website building in the classroom.",
            },
            {
                src: "images/about/kenya-teaching-2.jpeg",
                caption: "Explaining web fundamentals in front of the class.",
            },
            {
                src: "images/about/kenya-group.jpeg",
                caption: "Group photo with the students and community in Kenya.",
            },
            {
                src: "images/about/kenya-students.jpg",
                caption: "Hanging out with the students between lessons.",
            },
            {
                src: "images/about/kenya-maasai.jpg",
                caption: "Meeting the Maasai community with Mount Kilimanjaro in the background.",
            },
            {
                src: "images/about/kenya-bridge.jpg",
                caption: "Exploring Kenya with my fellow HU Open-ICT students.",
            },
        ],
        sections: {
            whatIDid:
                "Together with a group of fellow HU Open-ICT students, I traveled to Kenya for a full semester to teach local students how to use computers from scratch and how to build basic websites using HTML and CSS.",
            whereIFocused:
                "I focused on explaining technical concepts in the simplest, most practical way possible—without assuming prior computer knowledge. We also built a dedicated learning platform so the students could follow along at their own pace.",
            whatILearned:
                "This experience taught me patience, adaptability, and how to communicate clearly when things don't go according to plan. The students and local community showed me how much enthusiasm and drive people have when given the tools to learn.",
            whatCouldBeBetter:
                "In the beginning, it was easy to underestimate how big the gap in basic computer familiarity could be from student to student. We could have structured the first week with even more hands-on fundamentals before jumping into code.",
        },
    },
    {
        id: "3",
        slug: "total-energies",
        dateRange: "2024/February - 2024/August",
        title: "All-Around Employee",
        subtitle: "Total Energies",
        shortDescription:
            "Worked at a gas station performing a range of duties including inventory management, cashiering, and general site maintenance.",
        tags: ["Cashiering", "Inventory Management", "Time-Management"],
        websiteUrl: "https://totalenergies.nl",
        websiteLabel: "totalenergies.nl",
        showWebsiteEmbed: false,
        sections: {
            whatIDid:
                "Worked at a Total Energies station handling day-to-day operations: running the cash register, helping customers, managing store inventory, restocking deliveries, and keeping the entire site clean and safe.",
            whereIFocused:
                "My focus was on time management and reliability—making sure everything stayed organized during rush hours when you're responsible for multiple tasks at the same time.",
            whatILearned:
                "Working in customer service taught me how to deal with all kinds of people, stay polite and calm under pressure, and keep pushing through even when my social battery was running on empty.",
            whatCouldBeBetter:
                "Learning how to pace my social energy better during long, busy shifts so I wouldn't head home feeling like a complete zombie at the end of the day.",
        },
    },
    {
        id: "4",
        slug: "eelloo",
        dateRange: "2022/Mei - 2023/January",
        title: "Intern Developer",
        subtitle: "Eelloo/Assessio Bloom",
        shortDescription:
            "Worked on improving and maintaining internal tools. Gained experience in communication and working in a professional environment.",
        tags: ["Java", "Spring Boot"],
        websiteUrl: "https://assessiobloom.com/nl/",
        websiteLabel: "assessiobloom.com",
        // assessiobloom.com blocks being embedded in an iframe
        showWebsiteEmbed: false,
        sections: {
            whatIDid:
                "During my MBO-4 Software Development study, I worked as an Intern Developer at Eelloo (Assessio Bloom). I helped maintain, debug, and improve internal software tools built with Java and Spring Boot.",
            whereIFocused:
                "I was trying to bridge the gap between school assignments and a real production codebase—learning how Spring Boot applications are structured in practice and how to write clean, maintainable backend code.",
            whatILearned:
                "The team taught me what working in a professional software environment actually looks like: participating in stand-ups, reading existing code before changing it, working with version control in a team, and communicating clearly with senior developers.",
            whatCouldBeBetter:
                "Because it was my first real developer internship, I sometimes spent too long trying to solve a problem all by myself before asking a teammate. I learned that asking good questions early on is a strength, not a weakness.",
        },
    },
];
