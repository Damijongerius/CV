import TimeLineItem from "@/components/ui/TimeLineItem.tsx";

export default function ExperienceSection() {
    const experience = [
        {
            id: "1",
            dateRange: "2025/October - 2025/December",
            title: "Minor Kenya",
            subtitle: "HU Open-ICT",
            description:
                "I have taught a group of students how to use computers and basic programming of websites with a group of fellow students in Kenya. ",
            tags: ["Teaching", "Teamwork", "Communication", "Community"],
        },
        {
            id: "2",
            dateRange: "2024/February - 2024/August",
            title: "All-Around Employee",
            subtitle: "Total Energies",
            description: "Worked at a gas station performing a range of duties including inventory management, cashiering, and general site maintenance.",
            tags: ["Cashiering", "Inventory Management", "Time-Management"],
        },
        {
            id: "3",
            dateRange: "2022/Mei - 2023/January",
            title: "Intern Developer",
            subtitle: "Eelloo/Assessio Bloom",
            description:
                "Worked on improving and maintaining internal tools. Gained experience in communication and working in a professional environment.",
            tags: ["Java", "Spring Boot"],
        },
    ];

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Work Experience
            </h2>

            <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/30 md:-translate-x-0.5" />

                {experience.map((item) => (
                    <TimeLineItem
                        key={item.id}
                        dateRange={item.dateRange}
                        title={item.title}
                        subtitle={item.subtitle}
                        description={item.description}
                        tags={item.tags}
                    />
                ))}
            </div>
        </div>
    );
}
