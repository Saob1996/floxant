const fs = require('fs');
const de = require('./dictionaries/de.json');

function flatten(obj, prefix = '') {
  let res = {};
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      Object.assign(res, flatten(v, prefix + k + '.'));
    } else {
      res[prefix + k] = v;
    }
  }
  return res;
}

const flatDe = flatten(de);
const entries = Object.entries(flatDe);
const CHUNK_SIZE = 145; // Approximately 7 chunks

for (let i = 0; i < Math.ceil(entries.length / CHUNK_SIZE); i++) {
  const chunkEntries = entries.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
  const chunkObj = Object.fromEntries(chunkEntries);
  fs.writeFileSync(`de_chunk_${i + 1}.json`, JSON.stringify(chunkObj, null, 2), 'utf8');
  console.log(`Created de_chunk_${i + 1}.json with ${chunkEntries.length} items.`);
}
