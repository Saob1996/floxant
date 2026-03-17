const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, '../app/[lang]/umzug-${data.key}');
if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
    console.log('Deleted: ' + target);
} else {
    console.log('Folder not found: ' + target);
}
