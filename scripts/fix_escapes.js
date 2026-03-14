const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('c:/Users/Admin/.gemini/antigravity/scratch/FLOXANTENDE/app/[lang]', function(filePath) {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // This regex looks for \` and \$ and replaces them with ` and $
        let newContent = content.replace(/\\`/g, '`').replace(/\\\$/g, '$');
        
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log('Fixed escaped strings in:', filePath);
        }
    }
});
