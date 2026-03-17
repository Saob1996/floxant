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
    { id: 'neutraubling', name: 'Neutraubling', region: 'Landkreis Regensburg' },
    { id: 'schwandorf', name: 'Schwandorf', region: 'Oberpfalz' },
    { id: 'amberg', name: 'Amberg', region: 'Oberpfalz' },
    { id: 'weiden', name: 'Weiden', region: 'Oberpfalz' },
    { id: 'straubing', name: 'Straubing', region: 'Niederbayern' },
    // Bridge Pages
    { id: 'oberpfalz', name: 'Oberpfalz', region: 'Nordbayern' },
    { id: 'landkreis-regensburg', name: 'Landkreis Regensburg', region: 'Ostbayern' }
];

const appDir = path.join(__dirname, '../app/[lang]');

topCities.forEach(city => {
    const pagePath = path.join(appDir, `umzug-\${city.id}`, 'page.tsx');
    if (!fs.existsSync(pagePath)) return;

    let content = fs.readFileSync(pagePath, 'utf8');

    // Add import if missing
    if (!content.includes('import { AuthorityMagnet }')) {
        if (content.includes('import { TrustStack }')) {
            content = content.replace(
                'import { TrustStack } from "@/components/TrustStack";',
                'import { TrustStack } from "@/components/TrustStack";\nimport { AuthorityMagnet } from "@/components/AuthorityMagnet";'
            );
        } else {
            // bridge pages don't have TrustStack, just inject it below MapPin
            content = content.replace(
                'import { MapPin',
                'import { AuthorityMagnet } from "@/components/AuthorityMagnet";\nimport { MapPin'
            );
        }
    }

    // Force inject Magnet
    if (!content.includes('<AuthorityMagnet')) {
        const payload = `\n            <AuthorityMagnet city="\${city.name}" region="\${city.region}" />\n`;
        
        if (content.includes('<TrustStack className="my-16" />')) {
            content = content.replace(
                '<TrustStack className="my-16" />',
                '<TrustStack className="my-16" />' + payload
            );
            fs.writeFileSync(pagePath, content, 'utf8');
            console.log(`Force Injected AuthorityMagnet into: \${city.id}`);
        } else if (content.includes('<SmartBookingWizard')) {
            // fallback inject before smartbookingwizard
            content = content.replace(
                '<SmartBookingWizard',
                payload + '            <SmartBookingWizard'
            );
            fs.writeFileSync(pagePath, content, 'utf8');
            console.log(`Force Injected AuthorityMagnet before Wizard into: \${city.id}`);
        }
    }
});
