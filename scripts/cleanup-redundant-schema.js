const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname, '..', 'app', '[lang]');

/**
 * Professional SEO Engineering Cleanup Script - V4 (Master Polishing)
 * Fixes orphaned fragments and trailing garbage.
 */
function cleanupFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Remove jsonLd and faqItems remnants
    content = content.replace(/const (jsonLd|faqItems) = [\s\S]*?;/g, '');
    content = content.replace(/const faqItems = \([\s\S]*?as Array<\{ q: string; a: string \}>;\r?\n?/g, '');
    content = content.replace(/\s+a: string \}>;\r?\n?/g, '');

    // 2. Remove legacy Regional SEO Gating remnant (the comment and empty space)
    content = content.replace(/\{\/\* Regional SEO Gating \(DE-only\) \*\/\}\s+/g, '');

    // 3. Fix the entire return block structure
    // Standardize to: 
    // return (
    //     <SpecialtyPageLayout
    //         ...
    //     />
    // );
    const returnBlockRegex = /return \(\s*(<>\s*)?(<script[\s\S]*?\/>\s*)?(<SpecialtyPageLayout[\s\S]*?\/>)\s*(<\/?>\s*)*\);/g;
    if (returnBlockRegex.test(content)) {
        content = content.replace(returnBlockRegex, 'return (\n        $3\n    );');
    }

    // 4. Secondary pass for orphaned closing fragments at the end of functions
    content = content.replace(/\/>\s+<\/?>\s+\);/g, '/>\n    );');

    // 5. Clean up triple newlines or trailing whitespace before the final brace
    content = content.replace(/\n\s+\n\s+\n/g, '\n\n');
    content = content.replace(/\s+\n\}/g, '\n}');

    fs.writeFileSync(filePath, content);
}

function walkDir(dir) {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            walkDir(fullPath);
        } else if (file === 'page.tsx' && (
            fullPath.includes('umzug-') || 
            fullPath.includes('klaviertransport-') || 
            fullPath.includes('entruempelung-') || 
            fullPath.includes('reinigung-') ||
            fullPath.includes('halteverbotszone-') ||
            fullPath.includes('rechner') ||
            fullPath.includes('service-area') ||
            fullPath.includes('angebote')
        )) {
            cleanupFile(fullPath);
        }
    });
}

console.log('Starting Master Polishing Cleanup...');
walkDir(BASE_DIR);
console.log('Cleanup Complete.');
