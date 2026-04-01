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
let baseTemplates = new Set();
let baseKeys = new Set();
for (const [key, val] of Object.entries(flatDe)) {
   if (key.startsWith('pages.umzug_')) {
      // Find the city part (e.g. abensberg)
      const parts = key.split('.');
      const cityKey = parts[1].replace('umzug_', '');
      
      const regex = new RegExp(cityKey, 'ig');
      const valTemplate = val.replace(regex, '{CITY}');
      const keyTemplate = key.replace('.' + parts[1] + '.', '.{KEY}.');
      
      baseTemplates.add(valTemplate);
      baseKeys.add(keyTemplate);
   }
}

console.log('Unique templates for pages:', baseTemplates.size);
console.log('Unique keys for pages:', baseKeys.size);

const cities = new Set();
for (const [key] of Object.entries(flatDe)) {
   if (key.startsWith('pages.umzug_')) {
      const parts = key.split('.');
      cities.add(parts[1].replace('umzug_', ''));
   }
}
console.log('City count:', cities.size);
console.log('Cities:', Array.from(cities).slice(0, 10).join(', ') + '...');
