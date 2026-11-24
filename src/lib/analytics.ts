// Privacy-friendly, cookieless analytics (Umami).
//
// Turned on by two build-time variables (see .env.example):
//   VITE_UMAMI_SRC         e.g. https://analytics.jongerius.app/script.js
//   VITE_UMAMI_WEBSITE_ID  the website id from the Umami dashboard
// When they are empty nothing is loaded and track() does nothing.
//
// What gets recorded: page views (Umami follows route changes on its own), the referrer,
// country/device as Umami reports them, and the events below. No cookies, no personal data.

type UmamiData = Record<string, string | number | boolean>;

declare global {
    interface Window {
        umami?: { track: (event: string, data?: UmamiData) => void };
    }
}

const SRC = import.meta.env.VITE_UMAMI_SRC as string | undefined;
const WEBSITE_ID = import.meta.env.VITE_UMAMI_WEBSITE_ID as string | undefined;
const SITE_HOST = "dami.jongerius.app";

export const analyticsEnabled = Boolean(SRC && WEBSITE_ID);

// Events fired before the Umami script has loaded are queued and sent once it's ready.
const queue: [string, UmamiData | undefined][] = [];

export function track(event: string, data?: UmamiData) {
    if (!analyticsEnabled) return;
    if (window.umami) window.umami.track(event, data);
    else queue.push([event, data]);
}

function flushQueue() {
    while (queue.length && window.umami) {
        const [event, data] = queue.shift()!;
        window.umami.track(event, data);
    }
}

/** Tracks CV downloads, email clicks and links to other sites, without touching every component. */
function trackClicks(e: MouseEvent) {
    const link = (e.target as HTMLElement | null)?.closest?.("a");
    if (!link) return;
    const href = link.getAttribute("href") || "";
    const from = window.location.pathname;

    if (/\.pdf$/i.test(href)) {
        track("cv-download", { from });
    } else if (href.startsWith("mailto:")) {
        track("contact-email", { from });
    } else if (/^https?:/i.test(href)) {
        const url = new URL(href);
        if (url.hostname !== window.location.hostname) {
            track("outbound", { host: url.hostname, url: url.hostname + url.pathname, from });
        }
    }
}

export function initAnalytics() {
    if (!analyticsEnabled || typeof document === "undefined") return;

    const script = document.createElement("script");
    script.defer = true;
    script.src = SRC!;
    script.dataset.websiteId = WEBSITE_ID!;
    // Only count the real site, never localhost or previews
    script.dataset.domains = SITE_HOST;
    script.onload = flushQueue;
    document.head.appendChild(script);

    document.addEventListener("click", trackClicks, { capture: true });

    // Links I share can carry ?ref=linkedin, ?ref=cv-pdf ... (utm_source works too and shows in Umami's UTM report)
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) track("ref", { source: ref.slice(0, 40) });
}
