const fs = require('fs');
const path = require('path');

const source = 'app';
const target = 'app/[lang]';

const dirsToMove = [
    'agb',
    'buchungsbedingungen',
    'dashboard',
    'datenschutz',
    'impressum',
    'login',
    'umzug-augsburg',
    'umzug-bayern',
    'umzug-muenchen',
    'umzug-nuernberg',
    'umzug-regensburg',
    'widerruf'
];

if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
}

dirsToMove.forEach(dir => {
    const srcPath = path.join(source, dir);
    const destPath = path.join(target, dir);

    if (fs.existsSync(srcPath)) {
        console.log(`Moving ${srcPath} to ${destPath}`);
        // fs.renameSync is atomic on same volume, effectively a move
        try {
            fs.renameSync(srcPath, destPath);
        } catch (e) {
            console.error(`Error moving ${dir}:`, e);
        }
    } else {
        console.log(`Skipping ${dir} (not found)`);
    }
});

// Also delete old root page and layout if they exist (safe because we created new ones)
const oldPage = path.join(source, 'page.tsx');
if (fs.existsSync(oldPage)) {
    console.log('Deleting old app/page.tsx');
    fs.unlinkSync(oldPage);
}

const oldLayout = path.join(source, 'layout.tsx');
if (fs.existsSync(oldLayout)) {
    console.log('Deleting old app/layout.tsx');
    fs.unlinkSync(oldLayout);
}

const olderPage2 = path.join(source, 'loading.tsx'); // Optional: move loading to [lang] too?
// Loading at root might not be used if root redirects. 
// But internal navigation needs loading.
// Better move loading.tsx, not-found.tsx, error.tsx to [lang] too.
const filesToMove = ['loading.tsx', 'not-found.tsx'];
// robots.ts and sitemap.ts STAY at root.
// globals.css STAYS at root.

filesToMove.forEach(file => {
    const srcPath = path.join(source, file);
    const destPath = path.join(target, file);
    if (fs.existsSync(srcPath)) {
        fs.renameSync(srcPath, destPath);
    }
});

console.log('Migration complete.');
