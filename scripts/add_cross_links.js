/**
 * Add cross-links between city pages for maximum internal linking.
 * Each city's umzug page gets links to its reinigung + entrümpelung pages
 * and vice versa.
 */
const fs = require('fs');
const path = require('path');

const baseDir = path.join(process.cwd(), 'app', '[lang]');

const crossLinks = [
    { slug: 'umzug-muenchen', links: ['reinigung-muenchen', 'entruempelung-muenchen'], labels: ['Reinigung München', 'Entrümpelung München'] },
    { slug: 'umzug-nuernberg', links: ['reinigung-nuernberg', 'entruempelung-nuernberg', 'umzug-feucht'], labels: ['Reinigung Nürnberg', 'Entrümpelung Nürnberg', 'Umzug Feucht'] },
    { slug: 'umzug-augsburg', links: ['reinigung-augsburg', 'entruempelung-augsburg'], labels: ['Reinigung Augsburg', 'Entrümpelung Augsburg'] },
    { slug: 'umzug-passau', links: ['reinigung-passau', 'entruempelung-passau', 'umzug-landshut'], labels: ['Reinigung Passau', 'Entrümpelung Passau', 'Umzug Landshut'] },
    { slug: 'umzug-landshut', links: ['reinigung-landshut', 'entruempelung-landshut', 'umzug-passau'], labels: ['Reinigung Landshut', 'Entrümpelung Landshut', 'Umzug Passau'] },
    { slug: 'umzug-straubing', links: ['entruempelung-bayern', 'reinigung-bayern', 'umzug-passau'], labels: ['Entrümpelung Bayern', 'Reinigung Bayern', 'Umzug Passau'] },
];

let updated = 0;

console.log('=== ADDING CROSS-LINKS ===\\n');

for (const config of crossLinks) {
    const filePath = path.join(baseDir, config.slug, 'page.tsx');
    if (!fs.existsSync(filePath)) {
        console.log(`[SKIP] ${config.slug} — not found`);
        continue;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let added = false;

    for (let i = 0; i < config.links.length; i++) {
        const linkSlug = config.links[i];
        const label = config.labels[i];

        // Check if this link already exists
        if (content.includes(linkSlug)) {
            continue;
        }

        // Add after the last </Link> in the internal links section
        // Find the closing div of the flex flex-wrap gap-4 section
        const searchString = '</Link>\\n                        </div>\\n                    </div>';
        const insertPoint = content.lastIndexOf(searchString);

        if (insertPoint > -1) {
            const linkJsx = `</Link>\\n                            <Link href={\`/\${lang}/${linkSlug}\`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">${label}</Link>\\n                        </div>\\n                    </div>`;
            content = content.slice(0, insertPoint) + linkJsx + content.slice(insertPoint + searchString.length);
            added = true;
        }
    }

    if (added) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`[LINKED] ${config.slug} — cross-links added`);
        updated++;
    } else {
        console.log(`[OK] ${config.slug} — all links already present`);
    }
}

console.log(`\\n=== SUMMARY: ${updated} pages updated ===`);
