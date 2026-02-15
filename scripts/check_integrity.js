const fs = require('fs'), path = require('path');
const D = path.join(__dirname, '..', 'dictionaries');
const de = JSON.parse(fs.readFileSync(path.join(D, 'de.json'), 'utf8'));
const en = JSON.parse(fs.readFileSync(path.join(D, 'en.json'), 'utf8'));
function getType(v) { if (Array.isArray(v)) return 'array'; if (v === null) return 'null'; return typeof v }
function flat(o, p = '', acc = {}) { for (const k in o) { const fp = p ? `${p}.${k}` : k; acc[fp] = getType(o[k]); if (getType(o[k]) === 'object') flat(o[k], fp, acc) } return acc }
const deT = flat(de);
const enT = flat(en);
const files = fs.readdirSync(D).filter(f => f.endsWith('.json'));
let error = false;
files.forEach(f => {
    if (f === 'de.json' || f === 'en.json') return;
    const d = JSON.parse(fs.readFileSync(path.join(D, f), 'utf8'));
    const dT = flat(d);
    const errs = [];
    let missingCount = 0;
    for (const k in enT) {
        if (dT[k] === undefined) {
            // console.log(`  MISSING: ${k}`);
            missingCount++;
        }
        else {
            if (enT[k] === 'string' && (dT[k] === 'object' || dT[k] === 'array')) errs.push(`Conflict with EN at ${k}: exp string, got ${dT[k]}`);
            if (enT[k] === 'array' && (dT[k] === 'object' || dT[k] === 'string')) errs.push(`Conflict with EN at ${k}: exp array, got ${dT[k]}`);
        }
    }
    if (missingCount > 0) { console.log(`\n${f}: ${missingCount} MISSING keys from EN (Likely Stale)`); error = true }
    if (errs.length) { console.log(`\n${f} ERRORS:`); errs.forEach(e => console.log('  ' + e)); error = true }
});
if (!error) console.log('Integrity Check PASSED.');
else console.log('Integrity Check FAILED.');
