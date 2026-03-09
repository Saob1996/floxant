const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'dictionaries');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

let updatedCount = 0;

for (const file of files) {
    const p = path.join(dir, file);
    try {
        const content = fs.readFileSync(p, 'utf8');
        const data = JSON.parse(content);
        let modified = false;

        if (data.home && data.home.seo) {
            if (data.home.seo.description && typeof data.home.seo.description === 'string' && data.home.seo.description.includes('Regensburg')) {
                data.home.seo.description = data.home.seo.description.replace('Regensburg', 'Regensburg').replace('Regensburg. Unser operativer Schwerpunkt liegt in Regensburg', 'Regensburg');
                modified = true;
            }
            if (data.home.seo.hub_note && typeof data.home.seo.hub_note === 'string' && data.home.seo.hub_note.includes('Regensburg')) {
                data.home.seo.hub_note = data.home.seo.hub_note.replace('Regensburg', 'Regensburg').replace('Regensburg. Unser operativer', 'Regensburg. Operativer').replace('Regensburg. Nasze centrum operacyjne to Regensburg', 'Regensburg. Nasze centrum operacyjne to Regensburg');
                modified = true;
            }
        }

        if (data.about) {
            if (data.about.transparency_text && typeof data.about.transparency_text === 'string' && data.about.transparency_text.includes('Regensburg')) {
                data.about.transparency_text = data.about.transparency_text.replace('Regensburg', 'Regensburg');
                modified = true;
            }
            if (data.about.remote_text && typeof data.about.remote_text === 'string' && data.about.remote_text.includes('Regensburg')) {
                data.about.remote_text = data.about.remote_text.replace('Regensburg', 'Regensburg');
                modified = true;
            }
        }

        if (modified) {
            fs.writeFileSync(p, JSON.stringify(data, null, 2));
            updatedCount++;
        }
    } catch (e) {
        console.error(`Error processing ${file}:`, e);
    }
}

console.log(`Successfully updated ${updatedCount} dictionary files.`);
