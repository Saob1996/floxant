const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../app/[lang]/blog');

const blogPages = [
    'umzug-kosten-regensburg',
    'entrumpelung-kosten-bayern',
    'umzug-checkliste',
    'umzug-tipps-bayern',
    'wohnungsaufloesung-was-tun'
];

function upgradeBlogFile(slug) {
    const pagePath = path.join(appDir, slug, 'page.tsx');
    if (!fs.existsSync(pagePath)) {
        console.log(`Missing blog page for ${slug}`);
        return;
    }

    let content = fs.readFileSync(pagePath, 'utf8');

    // Add Internal Hub Linking
    if (!content.includes('Umzug Regensburg')) {
        const linkBlock = `
            {/* Contextual Hub Interlinking Layer */}
            <div className="bg-muted/10 p-8 rounded-2xl border border-primary/20 my-12">
                <h3 className="text-xl font-bold mb-4 text-primary w-full">Regionale Ressourcen & Ratgeber</h3>
                <p className="text-muted-foreground mb-6">Sie suchen noch den passenden Partner für Ihr Projekt? FLOXANT ist in ganz Ostbayern aktiv.</p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <a href={"/" + lang + "/umzug-regensburg"} className="text-sm font-semibold hover:text-primary transition underline decoration-primary/30 underline-offset-4">Umzug Regensburg</a>
                    <a href={"/" + lang + "/umzug-neutraubling"} className="text-sm font-semibold hover:text-primary transition underline decoration-primary/30 underline-offset-4">Umzug Neutraubling</a>
                    <a href={"/" + lang + "/umzug-landshut"} className="text-sm font-semibold hover:text-primary transition underline decoration-primary/30 underline-offset-4">Umzug Landshut</a>
                    <a href={"/" + lang + "/umzug-oberpfalz"} className="text-sm font-semibold hover:text-primary transition underline decoration-primary/30 underline-offset-4">Umzug Oberpfalz</a>
                    <a href={"/" + lang + "/umzug-muenchen"} className="text-sm font-semibold hover:text-primary transition underline decoration-primary/30 underline-offset-4">Umzug München</a>
                    <a href={"/" + lang + "/umzug-nuernberg"} className="text-sm font-semibold hover:text-primary transition underline decoration-primary/30 underline-offset-4">Umzug Nürnberg</a>
                    <a href={"/" + lang + "/umzug-landkreis-regensburg"} className="text-sm font-semibold hover:text-primary transition underline decoration-primary/30 underline-offset-4">Landkreis Regensburg</a>
                    <a href={"/" + lang + "/umzug"} className="text-sm font-semibold hover:text-primary transition underline decoration-primary/30 underline-offset-4">Dienstleistungen</a>
                </div>
            </div>
        `;

        // Inject right before the article closing tag
        content = content.replace('</article>', linkBlock + '\n                </article>');
    }

    fs.writeFileSync(pagePath, content, 'utf8');
    console.log(`Upgraded Blog Hub Page: ${slug} -> Injecting heavy internal anchor tags.`);
}

blogPages.forEach(upgradeBlogFile);
console.log('Phase 5 Blog Hub Linking complete.');
