const fs = require('fs');
const path = require('path');

const deFile = path.join(__dirname, 'dictionaries', 'de.json');
const zhFile = path.join(__dirname, 'dictionaries', 'zh.json');

const deData = JSON.parse(fs.readFileSync(deFile, 'utf8'));
const zhData = JSON.parse(fs.readFileSync(zhFile, 'utf8'));

let totalStrings = 0;
let missingTranslations = 0;

function isChinese(text) {
    // Check if text contains at least one Chinese character
    return /[\u4e00-\u9fff]/.test(text);
}

function traverse(deVal, zhVal, pathStr) {
    if (typeof deVal === 'string') {
        totalStrings++;
        if (!zhVal || (!isChinese(zhVal) && !deVal.match(/^[\d\s\W]+$/))) {
            // Does not contain Chinese, and is not just numbers/symbols
            
            // Wait, some SEO meta strings might contain mostly English variables or German city names (e.g., "München"), but the prompt says 
            // "Übersetze die komplette JSON-Sprachdatei für Chinesisch". So we need to translate them.
            // If the Chinese target string contains NO Chinese characters, but the German string contains letters, it's untranslated!
            if (deVal.match(/[a-zA-ZäöüßÄÖÜ]/)) {
                missingTranslations++;
            }
        }
    } else if (Array.isArray(deVal)) {
        for (let i = 0; i < deVal.length; i++) {
            traverse(deVal[i], zhVal ? zhVal[i] : null, `${pathStr}[${i}]`);
        }
    } else if (typeof deVal === 'object' && deVal !== null) {
        for (let k of Object.keys(deVal)) {
            traverse(deVal[k], zhVal ? zhVal[k] : null, `${pathStr}.${k}`);
        }
    }
}

traverse(deData, zhData, 'root');
console.log(`Total Strings: ${totalStrings}`);
console.log(`Missing Translations (no Chinese chars): ${missingTranslations}`);
