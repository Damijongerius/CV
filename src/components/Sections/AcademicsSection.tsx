import React from 'react';
import TimeLineItem from '@/components/ui/TimeLineItem';

export default function AcademicsSection(): JSX.Element {
    const amberColors = {
        DotBackground: 'bg-white',
        DotBorder: 'border-amber-600',
        DateText: 'text-amber-100',
        TitleText: 'text-white',
        SubtitleText: 'text-amber-100/80',
        DescriptionText: 'text-white/90',
        TagBackground: 'bg-white/20',
        TagBorder: 'border-white/30',
        TagText: 'text-white',
    };

    const academics = [
        {
            id: '0',
            dateRange: 'Future Ambition',
            title: "Master's in Data Science",
            subtitle: 'Utrecht University',
            description:
                'After my Bachelor\'s I\'m going to follow the Master\'s in Data Science at Utrecht University.',
            longDescription:
                'Because 80% of AI comes down to good data, my next step after my Bachelor\'s is the Master\'s in Data Science at Utrecht University.',
            tags: ['Data Science', 'Artificial Intelligence', 'Utrecht University', 'Future Ambition'],
            url: 'https://www.uu.nl/en/masters/data-science',
            urlLabel: 'View UU Master Program',
            isFuture: true,
        },
        {
            id: '1',
            dateRange: '2023 - Present',
            title: "Open ICT Bachelor's Degree",
            subtitle: 'Hogeschool Utrecht',
            description:
                'Currently pursuing a Bachelor\'s degree in Open ICT, focusing on artificial intelligence and data science. In an environment that encourages self-directed learning, I am enhancing my skills in AI, machine learning, and data analysis through various projects and research.',
            tags: ['Scrum', 'Teamwork', 'Research-Methods', 'Linux', 'Teaching', 'AI'],
            url: 'https://www.hu.nl/voltijd-opleidingen/open-ict',
            urlLabel: 'Visit HU Open-ICT',
        },
        {
            id: '2',
            dateRange: '2021 - 2023',
            title: 'Software Development MBO-4',
            subtitle: 'ROC Almere-Buiten',
            description:
                'Focused on web and game development. Created web full-stacks using HTML, CSS, JavaScript, Node.js, and SQL. Developed games with Unity and C#.',
            tags: ['HTML', 'CSS', 'JavaScript', 'Unity/C#', 'Node.js', 'SQL', 'Scrum', 'Java', 'Fullstack', 'Game-Dev'],
            url: 'https://www.rocvanflevoland.nl',
            urlLabel: 'Visit ROC',
        },
        {
            id: '3',
            dateRange: '2018 - 2021',
            title: 'Middelbare school (Havo)',
            subtitle: 'Ichthus College Dronten',
            description:
                'General secondary education — Favorite topics: Natuurkunde, Lichamelijke opvoeding, Aardrijkskunde, Geschiedenis.',
            tags: ['Natuurkunde', 'Lichamelijke opvoeding', 'Aardrijkskunde', 'Geschiedenis'],
            url: 'https://ichthusdronten.nl',
            urlLabel: 'Visit Ichthus College',
        },
    ];

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Academics</h2>

            <div className="relative">
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/30 md:-translate-x-0.5" />

                {academics.map((item) => (
                    <TimeLineItem
                        key={item.id}
                        dateRange={item.dateRange}
                        title={item.title}
                        subtitle={item.subtitle}
                        description={item.description}
                        longDescription={item.longDescription}
                        tags={item.tags}
                        Colors={amberColors}
                        url={item.url}
                        urlLabel={item.urlLabel}
                        isFuture={item.isFuture}
                    />
                ))}
            </div>
        </div>
    );
}
