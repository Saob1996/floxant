const fs = require('fs');
const path = require('path');

const topCities = [
    { id: 'regensburg', name: 'Regensburg' },
    { id: 'muenchen', name: 'München', region: 'Oberbayern' },
    { id: 'nuernberg', name: 'Nürnberg', region: 'Mittelfranken' },
    { id: 'augsburg', name: 'Augsburg', region: 'Schwaben' },
    { id: 'passau', name: 'Passau', region: 'Niederbayern' },
    { id: 'ingolstadt', name: 'Ingolstadt', region: 'Oberbayern' },
    { id: 'landshut', name: 'Landshut', region: 'Niederbayern' },
    { id: 'neutraubling', name: 'Neutraubling', region: 'Oberpfalz' },
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

    // Add import if missing
    if (!content.includes('import { AuthorityMagnet }')) {
        content = content.replace(
            /import \{ TrustStack \} from "@\/components\/TrustStack";/,
            `$&
import { AuthorityMagnet } from "@/components/AuthorityMagnet";`
        );
    }

    // Inject before SmartBookingWizard
    if (!content.includes('<AuthorityMagnet')) {
        const regionProp = city.region ? ` region="\${city.region}"` : '';
        content = content.replace(
            /<TrustStack className="my-16" \/>/,
            `$&
            
            {/* Global Authority Magnet Injection */}
            <AuthorityMagnet city="\${city.name}"\${regionProp} />`
        );
        fs.writeFileSync(pagePath, content, 'utf8');
        console.log(`Injected AuthorityMagnet into: umzug-\${city.id}`);
    }
});
