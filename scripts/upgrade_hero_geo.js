const fs = require('fs');
const path = require('path');

const topCities = [
    { id: 'regensburg', name: 'Regensburg', region: 'Oberpfalz' },
    { id: 'muenchen', name: 'München', region: 'Oberbayern' },
    { id: 'nuernberg', name: 'Nürnberg', region: 'Mittelfranken' },
    { id: 'augsburg', name: 'Augsburg', region: 'Schwaben' },
    { id: 'passau', name: 'Passau', region: 'Niederbayern' },
    { id: 'ingolstadt', name: 'Ingolstadt', region: 'Oberbayern' },
    { id: 'landshut', name: 'Landshut', region: 'Niederbayern' },
    { id: 'neutraubling', name: 'Neutraubling', region: 'Landkreis Regensburg (Oberpfalz)' },
    { id: 'schwandorf', name: 'Schwandorf', region: 'Oberpfalz' },
    { id: 'amberg', name: 'Amberg', region: 'Oberpfalz' },
    { id: 'weiden', name: 'Weiden', region: 'Oberpfalz' },
    { id: 'straubing', name: 'Straubing', region: 'Niederbayern' }
];

const appDir = path.join(__dirname, '../app/[lang]');

topCities.forEach(city => {
    const pagePath = path.join(appDir, `umzug-\${city.id}`, 'page.tsx');
    if (!fs.existsSync(pagePath)) return;

    let content = fs.readFileSync(pagePath, 'utf8');

    // Upgrade CTA (Phase 6: Conversion Signal Boost)
    const oldCta = '<span className="px-4 py-2 glass rounded-full text-sm font-semibold flex items-center gap-2"><ArrowRight className="w-4 h-4 text-primary" /> Kostenlose Besichtigung</span>';
    const newCta = '<span className="px-4 py-2 bg-primary/20 text-primary border border-primary/40 rounded-full text-sm font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(var(--primary),0.3)]"><ArrowRight className="w-4 h-4" /> Kostenlose Besichtigung (Heute möglich)</span>';

    if (content.includes(oldCta)) {
        content = content.replace(oldCta, newCta);
        fs.writeFileSync(pagePath, content, 'utf8');
        console.log(`Hero CTA upgraded in: umzug-\${city.id}`);
    } else if (!content.includes('Kostenlose Besichtigung (Heute möglich)')) {
        console.log(`Could not find target CTA in: umzug-\${city.id}`);
    }
});
