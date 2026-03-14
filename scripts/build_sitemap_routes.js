const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../app');

const segments = [
    'sitemap-de.xml',
    'sitemap-en.xml',
    'sitemap-ar.xml',
    'sitemap-tr.xml',
    'sitemap-ru.xml',
    'sitemap-uk.xml',
    'sitemap-pl.xml',
    'sitemap-other.xml',
    'sitemap-core.xml',
    'sitemap-signature.xml',
    'sitemap-legal.xml',
];

segments.forEach(seg => {
    const dir = path.join(appDir, seg);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    // e.g. 'de', 'core', 'signature'
    const id = seg.replace('sitemap-', '').replace('.xml', '');
    
    const content = `import { generateSitemapSegmentResponse } from '@/lib/sitemap-xml';

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function GET() {
    return generateSitemapSegmentResponse('${id}');
}
`;
    fs.writeFileSync(path.join(dir, 'route.ts'), content, 'utf8');
});

const indexDir = path.join(appDir, 'sitemap.xml');
if (!fs.existsSync(indexDir)) fs.mkdirSync(indexDir, { recursive: true });
const indexContent = `import { generateSitemapIndexResponse } from '@/lib/sitemap-xml';

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function GET() {
    return generateSitemapIndexResponse();
}
`;
fs.writeFileSync(path.join(indexDir, 'route.ts'), indexContent, 'utf8');

console.log('Sitemap routes built successfully.');
