const fs = require('fs');
const path = require('path');

const deJsonPath = path.join(__dirname, 'dictionaries', 'de.json');
const deJson = JSON.parse(fs.readFileSync(deJsonPath, 'utf8'));

// Nested obj helper
function flatten(obj, prefix = '') {
  let res = {};
  for (const [k, v] of Object.entries(obj)) {
    const newK = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      Object.assign(res, flatten(v, newK));
    } else {
      res[newK] = v;
    }
  }
  return res;
}

const flatDe = flatten(deJson);
const unique = {};

// We want to skip empty arrays entirely
// We want to skip all meta_title, meta_desc, faqs if they match the city patterns (umzug_<stadt>, entruempelung_<stadt>, reinigung_<stadt>, etc)
// Actually, it's simpler to just define which prefixes are templates:
const templateKeys = [
    "pages.umzug_",
    "pages.entruempelung_",
    "pages.reinigung_",
    "pages.halteverbotszone_",
    "pages.klaviertransport_",
    "pages.seniorenumzug_",
    // wait, pages.umzug_faq.faqs isn't a city template.
];

const pureCityKeys = [
    "abensberg", "altdorf_bei_nuernberg", "alteglofsheim", "altenthann", "amberg", "aufhausen", "augsburg",
    "bad_abbach", "barbing", "beratzhausen", "berching", "bernhardswald", "brennberg", "brunn", "burglengenfeld",
    "dachau", "deuerling", "dietfurt", "donaustauf", "duggendorf", "erding", "ergoldsbach", "erlangen", "feucht",
    "freising", "freystadt", "friedberg", "fuerstenfeldbruck", "fuerth", "geiselhoering", "geisenfeld", "hagelstadt",
    "hemau", "herzogenaurach", "hohenfels", "holzheim_am_forst", "ingolstadt", "kallmuenz", "kelheim", "kissing",
    "koefering", "koenigsbrunn", "laaber", "landshut", "langquaid", "lappersdorf", "lauf_an_der_pegnitz", "lupburg",
    "mainburg", "mallersdorf_pfaffenberg", "mammendorf", "maxhuette_haidhof", "mering", "mintraching", "moetzing",
    "moosburg", "neufahrn_in_niederbayern", "neumarkt", "neustadt_an_der_donau", "neutraubling", "nittenau", "nittendorf",
    "nuernberg", "oberasbach", "obertraubling", "olching", "parsberg", "passau", "pentling", "pettendorf", "pfaffenhofen",
    "pfatter", "pfeffenhausen", "pielenhofen", "postbauer_heng", "regensburg", "regenstauf", "riekofen", "roth",
    "rottenburg_an_der_laaber", "saal_an_der_donau", "schierling", "schwabach", "schwandorf", "seubersdorf", "sinzing",
    "straubing", "suenching", "tegernheim", "teublitz", "thalmassing", "velburg", "vohburg", "weiden", "wendelstein",
    "wenzenbach", "wiesent", "woerth_an_der_donau", "wolfsegg", "wolnzach", "zeitlarn", "zirndorf", "muenchen",
    "landkreis_regensburg", "oberpfalz"
];

function isCityTemplateKey(k) {
  for (const prefix of ["pages.umzug_", "pages.entruempelung_", "pages.reinigung_", "pages.halteverbotszone_", "pages.klaviertransport_", "pages.seniorenumzug_"]) {
      if (k.startsWith(prefix)) {
          let stadt = k.split(".")[1].replace(prefix.replace("pages.", ""), "");
          if (pureCityKeys.includes(stadt)) {
              return true;
          }
      }
  }
  return false;
}

for (const [key, value] of Object.entries(flatDe)) {
    // If it's a known city template key AND it's a structural field
    if (isCityTemplateKey(key)) {
        continue;
    }
    
    // Ignore empty arrays
    if (Array.isArray(value) && value.length === 0) {
        continue;
    }

    // Now push to unique
    unique[key] = value;
}

fs.writeFileSync(path.join(__dirname, 'unique_de.json'), JSON.stringify(unique, null, 2));
console.log(`Extracted ${Object.keys(unique).length} unique keys!`);
