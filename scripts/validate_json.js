const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'dictionaries');

function validateDictionaries() {
    console.log('--- STARTING JSON VALIDATION ---');
    if (!fs.existsSync(dir)) {
        console.error(`Directory not found: ${dir}`);
        process.exit(1);
    }

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
    let invalidCount = 0;
    const invalidFiles = [];

    for (const file of files) {
        const filePath = path.join(dir, file);
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            JSON.parse(content);
            console.log(`[OK] ${file}`);
        } catch (e) {
            console.error(`[INVALID] ${file} - ${e.message}`);
            invalidFiles.push(file);
            invalidCount++;
        }
    }

    console.log('--- VALIDATION SUMMARY ---');
    console.log(`Total files checked: ${files.length}`);
    console.log(`Invalid files: ${invalidCount}`);

    if (invalidCount > 0) {
        console.error('Invalid files list:');
        invalidFiles.forEach(f => console.error(` - ${f}`));
        // We do not fail the process, we just report
    } else {
        console.log('All JSON dictionaries are valid.');
    }
}

validateDictionaries();
