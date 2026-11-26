import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    BarChart3,
    Boxes,
    Clock,
    FileSpreadsheet,
    FileText,
    FlaskConical,
    Grape,
    GraduationCap,
    Hammer,
    Hourglass,
    KeyRound,
    Layers,
    Leaf,
    Lightbulb,
    Mail,
    MapPin,
    MessageCircle,
    MessagesSquare,
    Phone,
    Puzzle,
    Receipt,
    Rocket,
    Search,
    ShoppingCart,
    Sprout,
    Store,
    Truck,
    User,
    Wine,
    Workflow,
    Wrench,
} from "lucide-react";
import RotatingText from "@/components/ui/RotatingText.tsx";
import PulsingStatusButton from "@/components/ui/PulsingStatusButton.tsx";
import BeforeAfterDemo from "@/components/opportunities/BeforeAfterDemo.tsx";
import TimeCalculator from "@/components/opportunities/TimeCalculator.tsx";
import ProcessSnake from "@/components/opportunities/ProcessSnake.tsx";
import InfoPopover from "@/components/opportunities/InfoPopover.tsx";
import SectionScroller from "@/components/ui/SectionScroller.tsx";
import { projectsData } from "@/data/projects.ts";

type Lang = "nl" | "en";

const EMAIL = "damianojongerius@gmail.com";
const TEL = "tel:+31624529477";
const PHONE_DISPLAY = "+31 6 24 52 94 77";
const LINKEDIN = "https://www.linkedin.com/in/dami-jongerius-498430254/";

const content = {
    nl: {
        back: "Portfolio",
        status: "Open voor nieuwe klanten in regio Utrecht",
        title: "Veel handmatig werk in je bedrijf?",
        rotatePrefix: "Ik automatiseer je",
        rotate: ["bestellingen.", "voorraad.", "facturen.", "rapportages.", "Excel-chaos.", "planning."],
        intro:
            "Minder handwerk, meer tijd voor je bedrijf. Ik help kleine producenten, telers en lokale bedrijven in de regio Utrecht om terugkerend werk te automatiseren: van Excel-sheets en papieren administratie tot koppelingen tussen systemen.",
        ctaCall: "Bel me",
        ctaMail: "Mail me",
        ctaNote: "Gratis kennismaking van 20 minuten",
        cardHi: "Hoi, ik ben Dami",
        cardRole: "HBO-ICT student · fullstack, data/AI & servers",
        cardText: "Je praat direct met de persoon die het bouwt. Geen bureau, geen tussenpersoon.",

        forWhoTitle: "Op zoek naar: kleine bedrijven in regio Utrecht",
        whyInfoLabel: "Waarom kleine bedrijven?",
        forWho: [
            { icon: Sprout, title: "Kleine producenten & telers", text: "Bestellingen, oogst en voorraad die nu nog in losse lijstjes staan." },
            { icon: Store, title: "Lokale bedrijven", text: "Winkels, ambachten en dienstverleners die uren kwijt zijn aan administratie." },
            { icon: Leaf, title: "Organisaties die iets goeds willen doen", text: "Initiatieven die bijdragen aan een eerlijkere, duurzamere samenleving." },
            { icon: MapPin, title: "Gewoon in de buurt", text: "Ik zit in de regio Utrecht. Even langskomen om mee te kijken op de werkvloer kan gewoon." },
        ],

        demoEyebrow: "Zo ziet dat eruit",
        demoTitle: "Van handwerk naar overzicht",
        demoText:
            "Een rommelige Excel, jaren aan data die niemand gebruikt, zes systemen die niet met elkaar praten, steeds dezelfde vragen in je mail. Kies een voorbeeld en druk op automatiseer. Elk resultaat is in de huisstijl van een (verzonnen) klant: ik pas me aan aan jouw bedrijf, niet andersom.",

        whyTitle: "Waarom kleine bedrijven?",
        why: [
            "Een nieuw systeem is net als een nieuwe wijn. Ik kan de formule maken: de druiven kiezen, de verhoudingen bepalen, de eerste versie neerzetten. Maar pas de tijd maakt er een goede wijn van.",
            "Grote bedrijven hebben gerijpte wijn nodig. Alles moet vanaf dag één perfect, getest en goedgekeurd zijn door tien afdelingen. Daar is bijna geen ruimte om te experimenteren.",
            "In een klein bedrijf kunnen we samen proeven en bijsturen. Korte lijnen, snel testen, snel verbeteren. Zo groeit een eerste formule uit tot een product dat echt bij je past, en dat daarna misschien ook anderen helpt.",
        ],
        stages: [
            { icon: FlaskConical, title: "De formule", text: "Ik bouw een eerste versie op basis van hoe jij werkt." },
            { icon: Grape, title: "Proeven", text: "Jij gebruikt het in het echt en vertelt wat schuurt." },
            { icon: Hourglass, title: "Rijpen", text: "We schaven bij, stap voor stap, tot het vanzelf gaat." },
            { icon: Wine, title: "Fijne wijn", text: "Een volwassen product dat ook anderen kan helpen." },
        ],

        fitEyebrow: "Eerlijk advies",
        fitTitle: "Ik werk voor jou, niet voor een softwarepakket",
        fitText:
            "Ik verkoop geen vast product. Ik kijk naar jouw bedrijf en zoek uit wat erbij past. Soms is dat iets op maat, maar vaak is het iets simpels: iets waar je al toegang toe hebt, maar waar je nog nooit van gehoord had of dat niemand je ooit heeft laten zien.",
        fitOptions: [
            { icon: KeyRound, title: "Al in huis", text: "Een functie in je kassasysteem, boekhoudpakket of webshop die je al betaalt, maar nog niet gebruikt. Ik zet hem aan en leg uit hoe het werkt." },
            { icon: Puzzle, title: "Bestaande tool", text: "Een betaalbare app of koppeling die precies doet wat je nodig hebt. Ik zoek uit welke en zet hem voor je op." },
            { icon: Hammer, title: "Op maat gebouwd", text: "Pas als er niets bestaat dat past, bouw ik het zelf. Klein, begrijpelijk en van jou." },
        ],
        fitHonest: "Is de oplossing gratis en heb je mij er eigenlijk niet voor nodig? Dan zeg ik dat ook gewoon.",

        howTitle: "Hoe het werkt",
        how: [
            { icon: MessageCircle, title: "Kennismaking", text: "We praten 20 minuten, vrijblijvend en gratis. Jij vertelt hoe het nu gaat." },
            { icon: Search, title: "Meekijken", text: "Ik kijk hoe je werkt, waar tijd of geld weglekt, en meet hoe lang dingen nu duren." },
            { icon: Lightbulb, title: "Zoeken wat past", text: "Al in huis, een bestaande tool of op maat: ik kies wat het beste bij jou past." },
            { icon: FileText, title: "Voorstel met duidelijke prijs", text: "Je weet vooraf wat het kost. Kleine klussen doe ik voor een vaste prijs; groter werk knippen we op in stappen, elk met een eigen prijs. Valt iets tegen, dan overleg ik eerst." },
            { icon: Hammer, title: "Opzetten & proeven", text: "Ik zet het op, jij gebruikt het in het echt en ik stuur bij." },
            { icon: BarChart3, title: "Meten & bijschaven", text: "We kijken wat het oplevert en verbeteren waar nodig." },
        ],
        whatTitle: "Wat ik automatiseer",
        what: [
            { icon: ShoppingCart, label: "Bestellingen" },
            { icon: Boxes, label: "Voorraad" },
            { icon: Receipt, label: "Facturen" },
            { icon: BarChart3, label: "Rapportages" },
            { icon: FileSpreadsheet, label: "Excel-chaos" },
            { icon: Truck, label: "Planning & routes" },
        ],

        calcEyebrow: "Reken even mee",
        calcTitle: "Hoeveel tijd kost het handwerk je nu?",

        proofTitle: "Waarom ik",
        proofLead:
            "Omdat ik het hele plaatje zie. Ik heb ervaring met websites, data, AI en servers, dus ik kan systemen met elkaar laten praten. En ik kies niet automatisch voor wat ik zelf het leukst vind om te bouwen, maar voor wat bij jou past.",
        proofPoints: [
            { icon: Workflow, title: "Van idee tot draaiend systeem", text: "Ik bouw niet alleen wat je ziet, maar ook de koppelingen en de opslag erachter, en ik zorg dat het blijft draaien." },
            { icon: MessagesSquare, title: "Je praat met de bouwer", text: "Geen accountmanager of bureau ertussen. Korte lijnen: wat jij zegt, komt direct bij mij aan." },
            { icon: Rocket, title: "Uit eigen initiatief", text: "Niemand vraagt me dit te doen. Ik doe het omdat ik het wil, en dat merk je aan de inzet." },
        ],
        proofClose:
            "Ik wil later terugkijken en weten dat ik initiatief heb getoond om de wereld een stukje makkelijker te maken. Dit is de beste manier waarop ik dat kan.",
        proofProjectsTitle: "Wat ik al gebouwd heb",
        proofProjects: {
            "ndw-data-scraping": "Grote hoeveelheden data verzamelen en opschonen: van 15 GB naar 1 GB per dag.",
            "pantheon-panel": "Mijn eigen serverpaneel: systemen die dag en nacht blijven draaien.",
            "cv-website": "Deze website: van ontwerp tot hosting volledig zelf gebouwd.",
        } as Record<string, string>,
        readMore: "Bekijk project",

        notMeTitle: "Waarom ik niet?",
        notMeIntro: "Eerlijk is eerlijk. Dit zijn de redenen om misschien níet met mij in zee te gaan:",
        notMe: [
            {
                icon: Layers,
                title: "Geen specialist, wel van alles wat",
                text: "Ik ben niet super gespecialiseerd in één ding. Ik heb eerder kennis van alles.",
                how: "Daardoor kijk ik breed. Heb je echt een specialist nodig? Dan zeg ik dat.",
            },
            {
                icon: User,
                title: "Ik ben alleen",
                text: "Ik werk op dit moment in mijn eentje. Bij projecten voor de lange termijn kan dat een risico zijn.",
                how: "Daarom houd ik het klein en begrijpelijk, en bouw ik waar het kan op bestaande tools.",
            },
            {
                icon: GraduationCap,
                title: "Ik zit nog op school",
                text: "Ik studeer nog en ben niet van plan daarmee te stoppen. Dit doe ik ernaast.",
                how: "Ik plan dus realistisch. Voor spoedklussen ben ik niet de juiste persoon.",
            },
            {
                icon: Wrench,
                title: "Onderhoud is nog een vraagteken",
                text: "Alles wat gemaakt wordt, moet onderhouden worden. Hoe ik dat goed regel, weet ik nog niet helemaal.",
                how: "Dat bespreken we per project vooraf, eerlijk. (Als ik alles al wist, zat ik nu waarschijnlijk op Mars.)",
            },
        ],
        notMeHow: "Hoe ik ermee omga",
        notMeOutro: "Kun je hiermee leven? Dan passen we waarschijnlijk goed bij elkaar.",

        valuesTitle: "Waarom ik dit doe",
        values: [
            "Ik geloof dat als ik bedrijven met een maatschappelijk doel help om hun werk makkelijker te maken, het uiteindelijk goedkoper wordt voor de mensen in dit land, en in andere landen.",
            "Veel onnodige kosten zitten in kleine, handmatige dingen: Excel-sheets, losse bestellingen, voorraden die niemand ziet. Wat daar bespaard wordt, hoeft niet doorberekend te worden.",
        ],
        bestTime: "Dit is de beste tijd voor optimalisatie.",
        bestTimeSub: "Slimme tools zijn nog nooit zo betaalbaar en toegankelijk geweest als nu, ook voor kleine bedrijven.",
        impact: [
            { icon: Leaf, title: "Minder verspilling", text: "Betere voorraad en planning betekent minder weggegooid product." },
            { icon: Truck, title: "Minder lege kilometers", text: "Slimmere routes en gebundelde leveringen betekenen minder onnodig vervoer." },
            { icon: Clock, title: "Meer tijd voor ondernemers", text: "Minder handwerk helpt kleine, lokale bedrijven overeind te blijven naast de grote spelers." },
        ],
        measure: "Per klant meet ik wat het oplevert, zodat je zelf kunt zien wat er verandert.",

        finalTitle: "Benieuwd wat er bij jou te winnen valt?",
        finalText: "Bel of mail me met een paar zinnen over je bedrijf en waar je tegenaan loopt. Dan plannen we een kennismaking.",
        mailSubject: "Kennismaking automatisering",
        mailBody: "Hoi Dami,\n\nIk heb een bedrijf in ... en ik loop tegen het volgende aan: ...\n\nGroet,\n",
        orLinkedIn: "of via LinkedIn",
        pageTitle: "Automatisering voor kleine bedrijven in regio Utrecht | Damiano Jongerius",
        nav: ["Start", "Voorbeeld", "Wat past", "Werkwijze", "Rekenen", "Waarom ik", "Waarom niet", "Waarden", "Contact"],
    },
    en: {
        back: "Portfolio",
        status: "Open to new clients in the Utrecht region",
        title: "Too much manual work in your business?",
        rotatePrefix: "I automate your",
        rotate: ["orders.", "inventory.", "invoices.", "reports.", "spreadsheets.", "planning."],
        intro:
            "Less busywork, more time for your business. I help small producers, growers and local businesses in the Utrecht region automate repetitive work: from Excel sheets and paper admin to connecting the systems you already use.",
        ctaCall: "Call me",
        ctaMail: "Email me",
        ctaNote: "Free 20-minute intro call",
        cardHi: "Hi, I'm Dami",
        cardRole: "ICT student (HBO) · full-stack, data/AI & servers",
        cardText: "You talk directly to the person who builds it. No agency, no middleman.",

        forWhoTitle: "Looking for: small businesses in the Utrecht region",
        whyInfoLabel: "Why small businesses?",
        forWho: [
            { icon: Sprout, title: "Small producers & growers", text: "Orders, harvests and stock that still live in scattered lists." },
            { icon: Store, title: "Local businesses", text: "Shops, craftspeople and service providers losing hours to admin." },
            { icon: Leaf, title: "Organisations doing good", text: "Initiatives contributing to a fairer, more sustainable society." },
            { icon: MapPin, title: "Close by", text: "I'm based in the Utrecht region. Dropping by to see how things work on the floor is no problem." },
        ],

        demoEyebrow: "What that looks like",
        demoTitle: "From manual work to overview",
        demoText:
            "A messy spreadsheet, years of data nobody uses, six systems that don't talk to each other, the same questions in your inbox. Pick an example and hit automate. Every result is in the house style of a (made-up) client: I adapt to your business, not the other way around.",

        whyTitle: "Why small businesses?",
        why: [
            "A new system is like a new wine. I can create the formula: pick the grapes, set the ratios, make the first batch. But only time turns it into a fine wine.",
            "Big companies need wine that has already aged. Everything has to be perfect from day one, tested and approved by ten departments. There's hardly any room to experiment.",
            "In a small business we can taste and adjust together. Short lines, quick tests, quick improvements. That's how a first formula grows into a product that really fits you, and that might help others later on.",
        ],
        stages: [
            { icon: FlaskConical, title: "The formula", text: "I build a first version based on how you work." },
            { icon: Grape, title: "Tasting", text: "You use it for real and tell me what rubs." },
            { icon: Hourglass, title: "Ageing", text: "We refine it step by step until it just works." },
            { icon: Wine, title: "Fine wine", text: "A mature product that can help others too." },
        ],

        fitEyebrow: "Honest advice",
        fitTitle: "I work for you, not for a software package",
        fitText:
            "I don't sell a fixed product. I look at your business and figure out what fits. Sometimes that's something custom, but often it's something simple: a tool you already have access to, but never heard of or nobody ever showed you.",
        fitOptions: [
            { icon: KeyRound, title: "Already yours", text: "A feature in your till, accounting software or web shop that you already pay for but don't use yet. I switch it on and show you how it works." },
            { icon: Puzzle, title: "Existing tool", text: "An affordable app or integration that does exactly what you need. I find the right one and set it up for you." },
            { icon: Hammer, title: "Built for you", text: "Only when nothing out there fits do I build it myself. Small, understandable and yours." },
        ],
        fitHonest: "Is the solution free and you don't really need me for it? Then I'll simply tell you.",

        howTitle: "How it works",
        how: [
            { icon: MessageCircle, title: "Intro call", text: "We talk for 20 minutes, free and without obligation. You tell me how things work today." },
            { icon: Search, title: "Looking along", text: "I see how you work, where time or money leaks away, and measure how long things take now." },
            { icon: Lightbulb, title: "Finding what fits", text: "Already yours, an existing tool or custom: I pick what suits you best." },
            { icon: FileText, title: "Proposal with a clear price", text: "You know up front what it costs. Small jobs get a fixed price; bigger work is split into steps, each with its own price. If something turns out harder, I check with you first." },
            { icon: Hammer, title: "Set up & taste", text: "I set it up, you use it for real and I adjust." },
            { icon: BarChart3, title: "Measure & refine", text: "We look at what it delivers and improve where needed." },
        ],
        whatTitle: "What I automate",
        what: [
            { icon: ShoppingCart, label: "Orders" },
            { icon: Boxes, label: "Inventory" },
            { icon: Receipt, label: "Invoices" },
            { icon: BarChart3, label: "Reports" },
            { icon: FileSpreadsheet, label: "Spreadsheet chaos" },
            { icon: Truck, label: "Planning & routes" },
        ],

        calcEyebrow: "Do the maths",
        calcTitle: "How much time does manual work cost you now?",

        proofTitle: "Why me",
        proofLead:
            "Because I see the whole picture. I have experience with websites, data, AI and servers, so I can get systems talking to each other. And I don't automatically go for what I'd most like to build, but for what fits you.",
        proofPoints: [
            { icon: Workflow, title: "From idea to running system", text: "I don't just build what you see, but also the integrations and storage behind it, and I make sure it keeps running." },
            { icon: MessagesSquare, title: "You talk to the builder", text: "No account manager or agency in between. Short lines: what you say reaches me directly." },
            { icon: Rocket, title: "On my own initiative", text: "Nobody asked me to do this. I do it because I want to, and you'll notice that in the effort." },
        ],
        proofClose:
            "Later on I want to look back and know I took the initiative to make the world a little easier. This is the best way I can do that.",
        proofProjectsTitle: "What I've already built",
        proofProjects: {
            "ndw-data-scraping": "Collecting and cleaning large amounts of data: from 15 GB down to 1 GB per day.",
            "pantheon-panel": "My own server panel: systems that keep running day and night.",
            "cv-website": "This website: designed, built and hosted by me.",
        } as Record<string, string>,
        readMore: "View project",

        notMeTitle: "Why not me?",
        notMeIntro: "Fair is fair. These are the reasons you might not want to work with me:",
        notMe: [
            {
                icon: Layers,
                title: "No specialist, a bit of everything",
                text: "I'm not highly specialised in one thing. I know a bit about everything.",
                how: "That means I look broadly. Do you really need a specialist? Then I'll tell you.",
            },
            {
                icon: User,
                title: "I'm on my own",
                text: "Right now I work alone. For long-term projects that can be a risk.",
                how: "That's why I keep things small and understandable, and build on existing tools where I can.",
            },
            {
                icon: GraduationCap,
                title: "I'm still studying",
                text: "I'm still in school and have no plans to stop. I do this alongside it.",
                how: "So I plan realistically. For rush jobs I'm not the right person.",
            },
            {
                icon: Wrench,
                title: "Maintenance is still an open question",
                text: "Everything that gets built needs maintenance. I don't fully know yet how to arrange that well.",
                how: "We discuss it honestly per project, up front. (If I knew everything, I'd probably be on Mars by now.)",
            },
        ],
        notMeHow: "How I deal with it",
        notMeOutro: "Can you live with that? Then we'll probably get along fine.",

        valuesTitle: "Why I do this",
        values: [
            "I believe that if I help businesses with a social purpose make their work easier, it ends up cheaper for the people in this country, and in other countries.",
            "A lot of unnecessary cost hides in small, manual things: spreadsheets, one-off orders, stock nobody can see. What's saved there doesn't have to be passed on.",
        ],
        bestTime: "This is the best time for optimisation.",
        bestTimeSub: "Smart tools have never been as affordable and accessible as they are now, small businesses included.",
        impact: [
            { icon: Leaf, title: "Less waste", text: "Better stock and planning means less product thrown away." },
            { icon: Truck, title: "Fewer empty miles", text: "Smarter routes and bundled deliveries mean less unnecessary transport." },
            { icon: Clock, title: "More time for owners", text: "Less manual work helps small, local businesses hold their own next to the big players." },
        ],
        measure: "For every client I measure what it delivers, so you can see for yourself what changes.",

        finalTitle: "Curious what you could gain?",
        finalText: "Call or email me with a few lines about your business and what you're running into. Then we'll schedule an intro call.",
        mailSubject: "Intro call automation",
        mailBody: "Hi Dami,\n\nI run a business in ... and I'm running into the following: ...\n\nBest,\n",
        orLinkedIn: "or via LinkedIn",
        pageTitle: "Automation for small businesses in the Utrecht region | Damiano Jongerius",
        nav: ["Start", "Example", "What fits", "Process", "Calculate", "Why me", "Why not", "Values", "Contact"],
    },
};

const SECTION_IDS = ["start", "demo", "fit", "process", "calculator", "why-me", "why-not-me", "values", "contact"];
const PROOF_SLUGS = ["ndw-data-scraping", "pantheon-panel", "cv-website"];
const ROTATE_COLORS = ["#bef264", "#5eead4", "#bef264", "#5eead4", "#bef264"];

function initialLang(param: string | null): Lang {
    if (param === "nl" || param === "en") return param;
    try {
        const saved = localStorage.getItem("opportunities-lang");
        if (saved === "nl" || saved === "en") return saved;
    } catch {
        /* storage unavailable */
    }
    // Dutch by default: the people this page is for are mostly Dutch businesses
    return "nl";
}

const fade = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.4 },
};

/** Full-height section with its own background, like the sections on the home page. */
function Section({ id, className, children }: { id: string; className: string; children: ReactNode }) {
    return (
        <section id={id} className={`relative snap-start min-h-[100svh] flex items-center px-4 sm:px-6 py-20 md:py-24 overflow-hidden ${className}`}>
            <div className="relative z-10 max-w-5xl mx-auto w-full">{children}</div>
        </section>
    );
}

function Heading({ eyebrow, title, className = "" }: { eyebrow?: string; title: string; className?: string }) {
    return (
        <div className={`space-y-2 mb-8 ${className}`}>
            {eyebrow && <p className="text-xs font-semibold uppercase tracking-widest opacity-70">{eyebrow}</p>}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">{title}</h2>
        </div>
    );
}

export default function OpportunitiesPage() {
    const [params, setParams] = useSearchParams();
    const [lang, setLang] = useState<Lang>(() => initialLang(params.get("lang")));
    const t = content[lang];

    const scrollRef = useRef<HTMLElement>(null);
    const navSections = SECTION_IDS.map((id, i) => ({ id, label: t.nav[i] }));

    useEffect(() => {
        document.documentElement.lang = lang;
        document.title = t.pageTitle;
        return () => {
            document.documentElement.lang = "en";
        };
    }, [lang, t.pageTitle]);

    const switchLang = (next: Lang) => {
        setLang(next);
        try {
            localStorage.setItem("opportunities-lang", next);
        } catch {
            /* storage unavailable */
        }
        const p = new URLSearchParams(params);
        p.set("lang", next);
        setParams(p, { replace: true });
    };

    const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(t.mailSubject)}&body=${encodeURIComponent(t.mailBody)}`;
    const proofProjects = PROOF_SLUGS.map((s) => projectsData.find((p) => p.slug === s)).filter((p): p is NonNullable<typeof p> => Boolean(p));

    return (
        <>
        <SectionScroller sections={navSections} containerRef={scrollRef} />
        <main ref={scrollRef} className="h-screen overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-[#04130c] text-white">
            {/* Floating top bar */}
            <div className="fixed top-3 inset-x-3 sm:inset-x-6 z-50 flex items-center justify-between pointer-events-none">
                <Link
                    to="/"
                    className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 text-sm font-medium text-emerald-50 hover:text-white transition-transform hover:-translate-x-0.5"
                >
                    <ArrowLeft size={15} />
                    {t.back}
                </Link>
                <div role="group" aria-label="Language" className="pointer-events-auto inline-flex rounded-full bg-black/40 backdrop-blur-md border border-white/10 p-1 text-xs font-semibold">
                    {(["nl", "en"] as Lang[]).map((l) => (
                        <button
                            key={l}
                            onClick={() => switchLang(l)}
                            aria-pressed={lang === l}
                            className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${lang === l ? "bg-lime-300 text-green-950" : "text-emerald-100 hover:text-white"}`}
                        >
                            {l.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* 1. Hero: dark with glowing orbs, like the home page */}
            <Section id="start" className="bg-[#04130c]">
                <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-lime-400/10 blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 -left-32 w-80 h-80 rounded-full bg-teal-400/10 blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] max-w-[100vw] rounded-full bg-gradient-to-br from-lime-400/5 to-teal-400/5 blur-[80px]" />

                <motion.div key={lang} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="relative grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center">
                    <div className="space-y-7">
                        <PulsingStatusButton label={t.status} targetId="contact" />
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1]">
                            {t.title}
                            <span className="block mt-3 text-emerald-100/90">{t.rotatePrefix}</span>
                            <RotatingText
                                texts={[...t.rotate]}
                                rotationInterval={2600}
                                gradientColors={ROTATE_COLORS}
                                mainClassName="overflow-hidden py-1"
                                splitLevelClassName="pb-1"
                            />
                        </h1>
                        <p className="text-lg text-emerald-50/80 max-w-xl leading-relaxed">{t.intro}</p>
                        <div className="space-y-3">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <a
                                    href={TEL}
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-lime-300 px-6 py-3.5 font-semibold text-green-950 shadow-lg shadow-lime-400/25 transition hover:bg-lime-200 hover:-translate-y-0.5"
                                >
                                    <Phone size={18} />
                                    {t.ctaCall}
                                </a>
                                <a
                                    href={mailto}
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-lime-300/50 px-6 py-3.5 font-semibold text-lime-200 transition hover:bg-lime-300/10 hover:-translate-y-0.5"
                                >
                                    <Mail size={18} />
                                    {t.ctaMail}
                                </a>
                            </div>
                            <p className="text-sm text-emerald-100/70">
                                {PHONE_DISPLAY} · {t.ctaNote}
                            </p>
                        </div>
                    </div>

                    {/* Personal card, same feel as the card on the home page */}
                    <div className="relative mx-auto w-full max-w-[300px] pt-16">
                        <img
                            src="/dami.jpg"
                            alt="Dami Jongerius"
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl z-10"
                        />
                        <div className="rounded-2xl bg-white text-gray-900 px-6 pb-6 pt-20 text-center shadow-2xl shadow-black/40 space-y-2">
                            <h2 className="text-2xl font-bold">{t.cardHi}</h2>
                            <p className="text-sm font-medium text-emerald-700">{t.cardRole}</p>
                            <p className="text-sm text-gray-500 pt-2">{t.cardText}</p>
                        </div>
                    </div>
                </motion.div>
            </Section>

            {/* 2. Before / after demo: light section, like Projects on the home page */}
            <Section id="demo" className="bg-gradient-to-br from-lime-100 via-emerald-100 to-teal-200 text-green-950">
                <motion.div {...fade} className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-center">
                    <div className="min-w-0">
                        <Heading eyebrow={t.demoEyebrow} title={t.demoTitle} className="mb-4" />
                        <p className="text-green-900/80 leading-relaxed">{t.demoText}</p>
                        <div className="mt-8 space-y-3">
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-bold">{t.forWhoTitle}</p>
                                <InfoPopover label={t.whyInfoLabel} title={t.whyTitle}>
                                    <div className="space-y-3 text-sm leading-relaxed">
                                        {t.why.map((p, i) => (
                                            <p key={p} className={i === 0 ? "text-rose-50" : "text-rose-100/80"}>{p}</p>
                                        ))}
                                    </div>
                                    <ol className="mt-4 grid grid-cols-4 gap-2 border-t border-rose-200/15 pt-4 text-center">
                                        {t.stages.map(({ icon: Icon, title }, i) => (
                                            <li key={title} className="space-y-1.5">
                                                <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-rose-200/30 bg-black/20">
                                                    <Icon size={16} className={i === 3 ? "text-amber-200" : "text-rose-200"} />
                                                </span>
                                                <p className="text-[11px] font-semibold leading-tight">{title}</p>
                                            </li>
                                        ))}
                                    </ol>
                                </InfoPopover>
                            </div>
                            {t.forWho.map(({ icon: Icon, title, text }) => (
                                <div key={title} className="flex gap-3">
                                    <Icon size={20} className="mt-0.5 shrink-0 text-emerald-700" />
                                    <div>
                                        <p className="font-semibold">{title}</p>
                                        <p className="text-sm text-green-900/70">{text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <BeforeAfterDemo lang={lang} />
                </motion.div>
            </Section>

            {/* 2b. I find what fits: already yours, existing tool or custom */}
            <Section id="fit" className="bg-gradient-to-br from-slate-950 via-[#06252b] to-slate-900">
                <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-cyan-400/10 blur-[110px]" />
                <motion.div {...fade} className="space-y-10">
                    <div className="max-w-3xl">
                        <Heading eyebrow={t.fitEyebrow} title={t.fitTitle} className="mb-4 text-cyan-50" />
                        <p className="text-lg text-slate-200/85 leading-relaxed">{t.fitText}</p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                        {t.fitOptions.map(({ icon: Icon, title, text }, i) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12 }}
                                className="rounded-2xl border border-cyan-200/15 bg-white/5 p-5 space-y-2"
                            >
                                <Icon size={22} className="text-cyan-300" />
                                <h3 className="text-lg font-semibold">{title}</h3>
                                <p className="text-sm text-slate-200/75 leading-relaxed">{text}</p>
                            </motion.div>
                        ))}
                    </div>
                    <p className="border-l-4 border-cyan-300 pl-4 text-lg font-medium text-cyan-50">{t.fitHonest}</p>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-300/60 mb-3">{t.whatTitle}</p>
                        <div className="flex flex-wrap gap-2">
                            {t.what.map(({ icon: Icon, label }) => (
                                <span key={label} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3.5 py-1.5 text-sm">
                                    <Icon className="text-lime-300 shrink-0" size={15} />
                                    {label}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </Section>

            {/* 4. Process: a snake from left to right and back */}
            <Section id="process" className="bg-gradient-to-br from-teal-800 via-emerald-800 to-green-900">
                <Heading title={t.howTitle} />
                <ProcessSnake steps={t.how} />
            </Section>

            {/* 5. Time calculator */}
            <Section id="calculator" className="bg-gradient-to-br from-emerald-700 via-teal-700 to-cyan-800">
                <motion.div {...fade}>
                    <Heading eyebrow={t.calcEyebrow} title={t.calcTitle} />
                    <TimeCalculator lang={lang} />
                </motion.div>
            </Section>

            {/* 6. Why me + proof from real projects */}
            <Section id="why-me" className="bg-gradient-to-br from-[#04130c] via-green-950 to-teal-950">
                <motion.div {...fade} className="space-y-8">
                    <div className="max-w-3xl">
                        <Heading title={t.proofTitle} className="mb-4" />
                        <p className="text-xl text-white leading-relaxed">{t.proofLead}</p>
                    </div>
                    <div className="grid gap-x-8 gap-y-5 md:grid-cols-3">
                        {t.proofPoints.map(({ icon: Icon, title, text }) => (
                            <div key={title} className="flex gap-3">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-300/15">
                                    <Icon size={19} className="text-lime-300" />
                                </span>
                                <div>
                                    <h3 className="font-semibold">{title}</h3>
                                    <p className="text-sm text-emerald-50/75 leading-relaxed">{text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="border-l-4 border-lime-300 pl-4 text-lg font-medium max-w-3xl">{t.proofClose}</p>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-100/60 mb-4">{t.proofProjectsTitle}</p>
                        <div className="grid gap-5 md:grid-cols-3">
                            {proofProjects.map((p) => (
                                <Link
                                    key={p.slug}
                                    to={`/projects/${p.slug}`}
                                    className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-lime-300/40"
                                >
                                    {p.image && (
                                        <div className="h-32 overflow-hidden bg-black/30">
                                            <img src={p.image.startsWith("http") ? p.image : `/${p.image}`} alt={p.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                                        </div>
                                    )}
                                    <div className="p-4 space-y-1.5">
                                        <h3 className="font-semibold">{p.title}</h3>
                                        <p className="text-sm text-emerald-50/70 leading-relaxed">{t.proofProjects[p.slug]}</p>
                                        <span className="inline-flex items-center gap-1.5 pt-1 text-sm font-semibold text-lime-300">
                                            {t.readMore}
                                            <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </Section>

            {/* 6b. Why not me: honest about the risks */}
            <Section id="why-not-me" className="bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950">
                <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-amber-400/10 blur-[110px]" />
                <motion.div {...fade} className="space-y-8">
                    <div className="max-w-3xl">
                        <Heading title={t.notMeTitle} className="mb-4 text-amber-50" />
                        <p className="text-lg text-stone-300 leading-relaxed">{t.notMeIntro}</p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        {t.notMe.map(({ icon: Icon, title, text, how }, i) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col rounded-2xl border border-amber-200/15 bg-white/5 p-5"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-300/15">
                                        <Icon size={19} className="text-amber-300" />
                                    </span>
                                    <h3 className="text-lg font-semibold text-amber-50">{title}</h3>
                                </div>
                                <p className="mt-3 text-stone-300 leading-relaxed">{text}</p>
                                <div className="mt-4 border-t border-amber-200/10 pt-3 text-sm">
                                    <span className="font-semibold text-amber-300">{t.notMeHow}: </span>
                                    <span className="text-stone-300/90">{how}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <p className="text-xl font-medium text-amber-100">{t.notMeOutro}</p>
                </motion.div>
            </Section>

            {/* 7. Values */}
            <Section id="values" className="bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900">
                <motion.div {...fade} className="space-y-8">
                    <Heading title={t.valuesTitle} className="mb-0" />
                    <div className="space-y-4 max-w-3xl">
                        {t.values.map((p, i) => (
                            <p key={p} className={`leading-relaxed ${i === 0 ? "text-xl text-white" : "text-emerald-50/85"}`}>{p}</p>
                        ))}
                    </div>
                    <div className="space-y-2">
                        <p className="bg-gradient-to-r from-lime-300 via-emerald-200 to-cyan-200 bg-clip-text text-3xl sm:text-4xl font-bold text-transparent">{t.bestTime}</p>
                        <p className="text-emerald-50/70">{t.bestTimeSub}</p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                        {t.impact.map(({ icon: Icon, title, text }) => (
                            <div key={title} className="rounded-2xl border border-lime-300/25 bg-lime-300/5 p-5 space-y-2">
                                <Icon className="text-lime-300" size={22} />
                                <h3 className="font-semibold">{title}</h3>
                                <p className="text-sm text-emerald-50/75 leading-relaxed">{text}</p>
                            </div>
                        ))}
                    </div>
                    <p className="border-l-4 border-lime-300 pl-4 text-xl font-medium">{t.measure}</p>
                </motion.div>
            </Section>

            {/* 8. Contact */}
            <Section id="contact" className="bg-gradient-to-br from-lime-300 via-emerald-300 to-teal-400 text-green-950">
                <motion.div {...fade} className="text-center space-y-6 max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold">{t.finalTitle}</h2>
                    <p className="text-lg text-green-950/80">{t.finalText}</p>
                    <div className="flex flex-col items-center gap-3 pt-2">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <a
                                href={TEL}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-950 px-7 py-4 text-lg font-semibold text-lime-200 shadow-xl shadow-green-950/30 transition hover:bg-green-900 hover:-translate-y-0.5"
                            >
                                <Phone size={20} />
                                {t.ctaCall}
                            </a>
                            <a
                                href={mailto}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-green-950 px-7 py-4 text-lg font-semibold text-green-950 transition hover:bg-green-950/10 hover:-translate-y-0.5"
                            >
                                <Mail size={20} />
                                {t.ctaMail}
                            </a>
                        </div>
                        <span className="text-sm text-green-950/80 font-medium">{PHONE_DISPLAY}</span>
                        <span className="text-sm text-green-950/70 break-all">{EMAIL}</span>
                        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-sm font-medium underline-offset-4 hover:underline">
                            {t.orLinkedIn}
                        </a>
                    </div>
                </motion.div>
            </Section>
        </main>
        </>
    );
}
