const { execSync } = require('child_process');

const languages = ['zh', 'vi', 'ko', 'ja'];

for (const lang of languages) {
    console.log(`\n\n======================`);
    console.log(`PROCESSING LANGUAGE: ${lang.toUpperCase()}`);
    console.log(`======================`);
    
    try {
        console.log(`[1] Running bulk translate for ${lang}...`);
        execSync(`node bulk_translate.js ${lang}`, { stdio: 'inherit' });
        
        console.log(`[2] Assembling full JSON for ${lang}...`);
        execSync(`node auto_translate_all.js ${lang}`, { stdio: 'inherit' });
    } catch (e) {
        console.error(`FAILED ON ${lang}:`, e.message);
    }
}

console.log('Final batch of languages pipeline finished!');
