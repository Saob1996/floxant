const fs = require('fs');
const path = require('path');

const enJsonPath = path.join(__dirname, 'dictionaries', 'en.json');
let enJson = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));

// Nested obj helper
function setNestedValue(obj, path, value) {
  const parts = path.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!(part in current)) {
      current[part] = {};
    }
    current = current[part];
  }
  current[parts[parts.length - 1]] = value;
}

// Inject chunks 1 to 7
for (let i = 1; i <= 7; i++) {
  const chunkPath = path.join(__dirname, `en_chunk_${i}_done.json`);
  if (fs.existsSync(chunkPath)) {
    console.log(`Injecting chunk ${i}...`);
    const chunk = JSON.parse(fs.readFileSync(chunkPath, 'utf8'));
    for (const [key, value] of Object.entries(chunk)) {
      setNestedValue(enJson, key, value);
    }
  } else {
    console.log(`Chunk ${i} not found!`);
  }
}

fs.writeFileSync(enJsonPath, JSON.stringify(enJson, null, 2));
console.log('All chunks injected successfully into en.json!');
