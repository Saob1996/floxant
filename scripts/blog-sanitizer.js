const fs = require('fs');
const path = require('path');

const blogDir = 'app/blog';

function sanitizeFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // 1. Fix encoding artifacts (the weird characters we saw in Turn 37)
    // Common corruptions observed: entrmpelung
    content = content.replace(/entrmpelung/g, 'entrümpelung');
    content = content.replace(/Adressnderung/g, 'Adressänderung');
    content = content.replace(/Haustr/g, 'Haustür');

    // 2. Harmonize Icons: Replace CheckCircle2 with CheckCircle everywhere to ensure compatibility
    content = content.replace(/CheckCircle2/g, 'CheckCircle');

    // 3. Fix Dictionary Key Access: Property access MUST use ASCII keys
    // Patterns like dict.pages.umzug_planen_schritt_für_schritt -> dict.pages.umzug_planen_schritt_für_schritt
    content = content.replace(/\.entrümpelung/g, '.entruempelung');
    content = content.replace(/\.für/g, '.für');
    content = content.replace(/\.über/g, '.über');
    content = content.replace(/\.können/g, '.können');
    content = content.replace(/\.müssen/g, '.müssen');
    content = content.replace(/umzug_planen_schritt_für_schritt/g, 'umzug_planen_schritt_für_schritt');

    // 4. Fix Truncated CSS classes (ps-)
    content = content.replace(/ps-"/g, 'ps-4"');

    // 5. Ensure all core icons are actually imported if used
    // If CheckCircle is used but not in imports, try to add it simple way or just force-clean imports
    if (content.includes('<CheckCircle') && !content.includes('CheckCircle') && content.includes('lucide-react')) {
         content = content.replace(/import { (.*?) } from "lucide-react"/, 'import { $1, CheckCircle } from "lucide-react"');
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Sanitized: ${filePath}`);
    }
}

function walk(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (file === 'page.tsx') {
            sanitizeFile(fullPath);
        }
    }
}

walk(blogDir);
console.log("Global Blog Sanitization Complete.");
