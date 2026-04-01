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
const chunkSize = Math.ceil(entries.length / 3);

for (let i = 0; i < 3; i++) {
  const chunkEntries = entries.slice(i * chunkSize, (i + 1) * chunkSize);
  const chunkObj = Object.fromEntries(chunkEntries);
  fs.writeFileSync(`de_flat_${i + 1}.json`, JSON.stringify(chunkObj, null, 2), 'utf8');
  console.log(`Created de_flat_${i + 1}.json with ${chunkEntries.length} items.`);
}
