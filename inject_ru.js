const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'dictionaries', 'ru.json');
let targetData = {};
try {
  targetData = JSON.parse(fs.readFileSync(targetFile, 'utf8'));
} catch (e) {
  console.log("Could not read " + targetFile + " - it might not exist or is invalid.");
  process.exit(1);
}

let injectedCount = 0;

for (let i = 1; i <= 13; i++) {
  const chunkFile = path.join(__dirname, `ru_chunk_${i}_done.json`);
  if (fs.existsSync(chunkFile)) {
    const chunkData = JSON.parse(fs.readFileSync(chunkFile, 'utf8'));
    for (const [key, value] of Object.entries(chunkData)) {
      // Traverse the key path and set the value
      const keyParts = key.split('.');
      let currentObj = targetData;
      for (let j = 0; j < keyParts.length; j++) {
        const part = keyParts[j];
        if (j === keyParts.length - 1) {
          currentObj[part] = value;
          injectedCount++;
        } else {
          if (!currentObj[part]) {
            currentObj[part] = {};
          }
          currentObj = currentObj[part];
        }
      }
    }
    console.log(`Injected chunk ${i}`);
  } else {
    console.warn(`Chunk ${i} not found: ${chunkFile}`);
  }
}

fs.writeFileSync(targetFile, JSON.stringify(targetData, null, 2), 'utf8');
console.log(`Done. Injected ${injectedCount} keys into ${targetFile}`);
