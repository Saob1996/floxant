const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'app', '[lang]');

const serviceMap = {
    'umzug': 'Umzug',
    'entruempelung': 'Entrümpelung',
    'reinigung': 'Reinigung',
    'kleintransporte': 'Kleintransporte'
};

function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const folders = fs.readdirSync(localesDir).filter(f => fs.statSync(path.join(localesDir, f)).isDirectory());

let updatedCount = 0;

for (const folder of folders) {
    const parts = folder.split('-');
    if (parts.length >= 2) {
        const serviceKey = parts[0];
        // Allow umzug-muenchen, umzug-regensburg
        // But what about entruempelung-kosten-regensburg? We skip that.
        // We only want Service + City (2 parts normally, except maybe something like umzug-bad-abbach).
        // Let's check if the first part is in our service Map
        if (serviceMap[serviceKey] && parts[1] !== 'kosten') {
            const serviceName = serviceMap[serviceKey];
            const cityKey = parts.slice(1).join('-'); // e.g. muenchen, bad-abbach
            // quick format for city name:
            const cityName = cityKey.split('-').map(capitalizeFirstLetter).join(' ');
            
            const realCityName = cityName.replace('Muenchen', 'München')
                                         .replace('Nuernberg', 'Nürnberg')
                                         .replace('Wuerzburg', 'Würzburg')
                                         .replace('Fuerth', 'Fürth')
                                         .replace('Erlangen', 'Erlangen'); // Add more mapping if needed
            
            const pagePath = path.join(localesDir, folder, 'page.tsx');
            
            if (fs.existsSync(pagePath)) {
                let content = fs.readFileSync(pagePath, 'utf8');

                // We want to replace title: '...' and description: '...' inside generatePageSEO
                const newTitle = `${serviceName} ${realCityName} ✓ Festpreis ✓ Versicherung | FLOXANT`;
                const newDesc = `Professionelles Umzugsunternehmen in ${realCityName}. Umzug, Entrümpelung und Reinigung mit Festpreis und Versicherung. Jetzt Angebot bei FLOXANT anfragen.`;

                // Use simple regex to replace the strings
                const titleRegex = /title:\s*(['"`]).*?\1(,?)/g;
                const descRegex = /description:\s*(['"`]).*?\1(,?)/g;

                let modified = content;
                modified = modified.replace(titleRegex, `title: '${newTitle}'$2`);
                modified = modified.replace(descRegex, `description: '${newDesc}'$2`);

                if (content !== modified) {
                    fs.writeFileSync(pagePath, modified, 'utf8');
                    console.log(`Updated CTR SEO for: ${folder}`);
                    updatedCount++;
                }
            }
        }
    }
}

console.log(`\n✅ CTR Optimization completed: ${updatedCount} pages updated with new formulas.`);
