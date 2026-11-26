// Runs after `vite build`. Creates a real HTML file for every route (with its own title,
// description, canonical and social tags plus crawlable text), a sitemap.xml and a 404.html,
// so every project / experience page can be indexed on its own URL.
import { build } from "esbuild";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const SITE = "https://dami.jongerius.app";
const SITE_NAME = "Damiano Jongerius";

// --- load the typed data files without running the whole app ---------------------------
const bundled = await build({
    stdin: {
        contents: `export { projectsData } from "./src/data/projects.ts";
                   export { experienceData } from "./src/data/experience.ts";`,
        resolveDir: root,
        sourcefile: "entry.ts",
        loader: "ts",
    },
    bundle: true,
    write: false,
    format: "esm",
    platform: "node",
    alias: { "@": path.join(root, "src") },
    logLevel: "silent",
});
const code = bundled.outputFiles[0].text;
const { projectsData, experienceData } = await import(
    "data:text/javascript;base64," + Buffer.from(code).toString("base64")
);

// --- helpers --------------------------------------------------------------------------
const esc = (s = "") =>
    String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const clip = (s = "", n = 155) => {
    const t = String(s).replace(/\s+/g, " ").trim();
    return t.length <= n ? t : t.slice(0, n - 1).replace(/\s+\S*$/, "") + "…";
};
const abs = (src) => (!src ? `${SITE}/dami.jpg` : /^https?:/.test(src) ? src : `${SITE}/${src.replace(/^\//, "")}`);
const url = (p) => `${SITE}${p}`;
const list = (items = []) => (items.length ? `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>` : "");

const template = await readFile(path.join(dist, "index.html"), "utf8");

function render({ title, description, path: routePath, image, body }) {
    const fullUrl = url(routePath);
    let html = template;
    const setTag = (re, replacement) => {
        if (!re.test(html)) throw new Error(`prerender: template is missing ${re}`);
        html = html.replace(re, replacement);
    };
    setTag(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
    setTag(/<meta\s+name="description"\s+content="[\s\S]*?"\s*\/>/, `<meta name="description" content="${esc(description)}" />`);
    setTag(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${fullUrl}" />`);
    setTag(/<meta property="og:title"\s+content="[^"]*"\s*\/>/, `<meta property="og:title" content="${esc(title)}" />`);
    setTag(/<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/>/, `<meta property="og:description" content="${esc(description)}" />`);
    setTag(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${fullUrl}" />`);
    setTag(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${esc(image)}" />`);
    setTag(/<meta name="twitter:title"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${esc(title)}" />`);
    setTag(/<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/>/, `<meta name="twitter:description" content="${esc(description)}" />`);
    setTag(/<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${esc(image)}" />`);
    setTag(/<div id="root"><\/div>/, `<div id="root"><div class="prerender">${body}</div></div>`);
    return html;
}

async function write(routePath, html) {
    const dir = path.join(dist, routePath);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, "index.html"), html);
}

const pages = [];

// --- home -----------------------------------------------------------------------------
pages.push({
    path: "/",
    title: null, // keep the title/description from index.html
});

// --- experience pages -----------------------------------------------------------------
for (const e of experienceData) {
    const p = `/experience/${e.slug}/`;
    const s = e.sections || {};
    pages.push({
        path: p,
        title: `${e.title} at ${e.subtitle} | ${SITE_NAME}`,
        description: clip(e.shortDescription),
        image: abs((e.images && e.images[0] && e.images[0].src) || null),
        body: `<h1>${esc(e.title)} – ${esc(e.subtitle)}</h1>
<p>${esc(e.dateRange)}</p>
<p>${esc(e.shortDescription)}</p>
<h2>What I did</h2><p>${esc(s.whatIDid)}</p>
<h2>Where my focus was</h2><p>${esc(s.whereIFocused)}</p>
<h2>What I learned</h2><p>${esc(s.whatILearned)}</p>
<h2>What I could have done better</h2><p>${esc(s.whatCouldBeBetter)}</p>
<p><a href="/">Back to ${SITE_NAME}</a></p>`,
    });
}

// --- project pages --------------------------------------------------------------------
for (const pr of projectsData) {
    const p = `/projects/${pr.slug}/`;
    const d = pr.details || {};
    const posts = (pr.posts || [])
        .map(
            (post) =>
                `<h3>${esc(post.title)}</h3><p><small>${esc(post.date)} · ${esc(post.type)}</small></p>${post.content
                    .map((c) => `<p>${esc(c.replace(/^- /, "• "))}</p>`)
                    .join("")}`
        )
        .join("");
    pages.push({
        path: p,
        title: `${pr.title} – project & dev log | ${SITE_NAME}`,
        description: clip(pr.description + ". " + (pr.longDescription || "")),
        image: abs(pr.image),
        body: `<h1>${esc(pr.title)}</h1>
<p>${esc(pr.description)}</p>
<p>${esc(pr.longDescription || "")}</p>
${(d.story || []).map((t) => `<p>${esc(t)}</p>`).join("")}
${d.goal ? `<h2>Goal</h2><p>${esc(d.goal)}</p>` : ""}
${d.features ? `<h2>Features</h2>${list(d.features)}` : ""}
${d.architecture ? `<h2>How it's built</h2><p>${esc(d.architecture)}</p>` : ""}
${d.roadmap ? `<h2>Roadmap</h2>${list(d.roadmap)}` : ""}
${posts ? `<h2>Dev log</h2>${posts}` : ""}
<p><a href="/">Back to ${SITE_NAME}</a></p>`,
    });
}

// --- opportunities (automation for small businesses, NL + EN) ---------------------------
pages.push({
    path: "/opportunities/",
    title: `Automatisering voor kleine bedrijven in regio Utrecht | ${SITE_NAME}`,
    description:
        "Veel handmatig werk in je bedrijf? Ik automatiseer bestellingen, voorraad, facturen en Excel-chaos voor kleine producenten, telers en lokale bedrijven in de regio Utrecht. Gratis kennismaking.",
    image: abs(null),
    body: `<h1>Veel handmatig werk in je bedrijf? Ik automatiseer het.</h1>
<p>Ik help kleine producenten, telers en lokale bedrijven in de regio Utrecht om terugkerend handwerk te automatiseren: van Excel-sheets en papieren administratie tot koppelingen tussen systemen.</p>
<h2>Ik werk voor jou, niet voor een softwarepakket</h2>
<p>Ik zoek uit wat bij jouw bedrijf past: soms een functie in software die je al hebt, soms een bestaande tool, en alleen als niets past iets op maat.</p>
<h2>Hoe het werkt</h2>${list([
        "We praten 20 minuten, vrijblijvend.",
        "Ik kijk waar je de meeste tijd of geld verliest en meet hoe lang dingen nu duren.",
        "Je weet vooraf wat het kost: kleine klussen voor een vaste prijs, groter werk in stappen met elk een eigen prijs.",
    ])}
<h2>Wat ik automatiseer</h2>${list(["Bestellingen", "Voorraad", "Facturen", "Rapportages", "Excel-chaos", "Planning & routes"])}
<h2>Waarom kleine bedrijven?</h2>
<p>Een nieuw systeem is net als een nieuwe wijn: ik kan de formule maken, maar pas de tijd maakt er een goede wijn van. Grote bedrijven hebben gerijpte wijn nodig; in een klein bedrijf kunnen we samen proeven, bijsturen en er een beter product van maken.</p>
<h2>Waarom ik dit doe</h2>
<p>Ik geloof dat als ik bedrijven met een maatschappelijk doel help om hun werk makkelijker te maken, het uiteindelijk goedkoper wordt voor de mensen in dit land en in andere landen. Dit is de beste tijd voor optimalisatie. Per klant meet ik wat het oplevert.</p>
<h2>Waarom ik</h2>
<p>Ik zie het hele plaatje: websites, data, AI en servers. Je praat direct met de bouwer, ik zit in de regio Utrecht en ik doe dit uit eigen initiatief.</p>
<h2>Waarom ik niet?</h2>
<p>Eerlijk is eerlijk: ik ben geen specialist maar weet van alles wat, ik werk alleen, ik studeer nog en hoe ik onderhoud goed regel bespreken we per project vooraf.</p>
<h2>Automation for small businesses (English)</h2>
<p>Too much manual work in your business? I automate orders, inventory, invoices and spreadsheets for small producers, growers and local businesses. Free 20-minute intro call.</p>
<p><a href="tel:+31624529477">Bel me / Call me: +31 6 24 52 94 77</a> · <a href="mailto:damianojongerius@gmail.com">Mail me / Email me</a></p>
<p><a href="/">Back to ${SITE_NAME}</a></p>`,
});

// --- home page body (crawlable links to every page) -------------------------------------
const homeBody = `<h1>${SITE_NAME} – Software Developer, AI &amp; Data</h1>
<p>Portfolio and CV with work experience, studies and projects, including a dev log per project.</p>
<h2>Work experience</h2>
<ul>${experienceData
    .map((e) => `<li><a href="/experience/${e.slug}/">${esc(e.title)} – ${esc(e.subtitle)}</a>: ${esc(e.shortDescription)}</li>`)
    .join("")}</ul>
<h2>Projects</h2>
<ul>${projectsData
    .map((p) => `<li><a href="/projects/${p.slug}/">${esc(p.title)}</a>: ${esc(p.description)}</li>`)
    .join("")}</ul>`;

for (const page of pages) {
    if (page.path === "/") {
        let html = template.replace(/<div id="root"><\/div>/, `<div id="root"><div class="prerender">${homeBody}</div></div>`);
        await writeFile(path.join(dist, "index.html"), html);
        continue;
    }
    await write(page.path, render(page));
}

// --- 404 fallback (unknown URLs still load the app) -------------------------------------
await writeFile(path.join(dist, "404.html"), template);

// --- sitemap ---------------------------------------------------------------------------
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
    .map((p) => `  <url>\n    <loc>${url(p.path)}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
    .join("\n")}
</urlset>
`;
await writeFile(path.join(dist, "sitemap.xml"), sitemap);

console.log(`prerender: ${pages.length} pages + 404.html + sitemap.xml`);
