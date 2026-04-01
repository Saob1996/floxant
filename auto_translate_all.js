const fs = require('fs');
const path = require('path');

const lang = process.argv[2];
if (!lang) {
  console.error("Please provide a language code (e.g. 'ar')");
  process.exit(1);
}

const deJsonPath = path.join(__dirname, 'dictionaries', 'de.json');
const deJson = JSON.parse(fs.readFileSync(deJsonPath, 'utf8'));

const uniquePath = path.join(__dirname, `unique_${lang}.json`);
const templatesPath = path.join(__dirname, `templates_${lang}.json`);

if (!fs.existsSync(uniquePath) || !fs.existsSync(templatesPath)) {
  console.error(`Missing translation files for ${lang}. Please ensure unique_${lang}.json and templates_${lang}.json exist.`);
  process.exit(1);
}

const uniqueStrings = JSON.parse(fs.readFileSync(uniquePath, 'utf8'));
const templates = JSON.parse(fs.readFileSync(templatesPath, 'utf8'));

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

function processTemplates(key, value, lang) {
    if (typeof value === 'string') {
        let text = value;

        // Meta Titles & Descriptions
        if (text.startsWith("Umzug in ") && text.includes("ab 79€ – Sofort verfügbar | FLOXANT")) {
            let stadt = text.replace("Umzug in ", "").replace(" ab 79€ – Sofort verfügbar | FLOXANT", "");
            return templates.umzug_meta_title_1.replace("{stadt}", stadt);
        }
        if (text.startsWith("Umzugsunternehmen ") && text.includes("✓ Festpreis ✓ Versichert | FLOXANT")) {
            let stadt = text.replace("Umzugsunternehmen ", "").replace(" ✓ Festpreis ✓ Versichert | FLOXANT", "");
            return templates.umzug_meta_title_2.replace("{stadt}", stadt);
        }
        if (text.startsWith("Umzugsunternehmen ") && text.includes("✓ Festpreis ✓ Versicherung | FLOXANT")) {
            let stadt = text.replace("Umzugsunternehmen ", "").replace(" ✓ Festpreis ✓ Versicherung | FLOXANT", "");
            return templates.umzug_meta_title_3.replace("{stadt}", stadt);
        }
        if (text.startsWith("Halteverbotszone ") && text.includes("– Beantragung & Aufstellung | FLOXANT")) {
            let stadt = text.replace("Halteverbotszone ", "").replace(" – Beantragung & Aufstellung | FLOXANT", "");
            return templates.halteverbot_meta_title.replace("{stadt}", stadt);
        }
        if (text.startsWith("Halteverbotszone in ") && text.includes("beantragen: Wir übernehmen die behördliche Genehmigung")) {
            let stadt = text.replace("Halteverbotszone in ", "").split(" ")[0];
            return templates.halteverbot_meta_desc.replace("{stadt}", stadt);
        }
        if (text.startsWith("Klaviertransport & Tresortransport ") && text.includes("| FLOXANT Schwertransporte")) {
            let stadt = text.replace("Klaviertransport & Tresortransport ", "").replace(" | FLOXANT Schwertransporte", "");
            return templates.klavier_meta_title.replace("{stadt}", stadt);
        }
        if (text.startsWith("Klaviertransport, Flügeltransport und Tresortransport in ") && text.includes("Jetzt anfragen! Sofortpreis")) {
            let stadt = text.replace("Klaviertransport, Flügeltransport und Tresortransport in ", "").split(".")[0];
            return templates.klavier_meta_desc.replace("{stadt}", stadt);
        }
        if (text.startsWith("Seniorenumzug ") && text.includes("– Einfühlsam & Sicher | FLOXANT")) {
            let stadt = text.replace("Seniorenumzug ", "").replace(" – Einfühlsam & Sicher | FLOXANT", "");
            return templates.senior_meta_title.replace("{stadt}", stadt);
        }
        if (text.startsWith("Seniorenumzug in ") && text.includes("Kompletter Einpackservice, Möbelmontage")) {
            let stadt = text.replace("Seniorenumzug in ", "").split(":")[0];
            return templates.senior_meta_desc.replace("{stadt}", stadt);
        }
        if (text === "Umzugsunternehmen Landkreis Regensburg – Ihr regionaler Partner | FLOXANT") {
            return templates.regensburg_landkreis_meta_title;
        }
        if (text === "Umzugsunternehmen Oberpfalz – Ihr regionaler Partner | FLOXANT") {
            return templates.oberpfalz_meta_title;
        }

        // It means it's a unique string, pull from uniqueStrings if exists
        // Wait, here in deJson, value could just be mapped directly
        return uniqueStrings[key] || value; // fallback to german if missing
    }

    if (Array.isArray(value)) {
        return value.map((item, index) => {
            if (typeof item === 'string') {
               // Look up in uniqueStrings array if available
               if (uniqueStrings[key] && Array.isArray(uniqueStrings[key])) {
                   return uniqueStrings[key][index] || item;
               }
               return item;
            }

            let q = item.q || "";
            let a = item.a || "";

            // UMZUG Typ 1
            if (q.startsWith("Was kostet ein Umzug in ") && a.includes("Ein Transporter mit Helfern ist oft schon ab günstigen Einstiegspreisen verfügbar.")) {
                let stadt = q.replace("Was kostet ein Umzug in ", "").replace("?", "");
                return {
                    q: templates.umzug_typ1_q1.replace("{stadt}", stadt),
                    a: templates.umzug_typ1_a1.replace("{stadt}", stadt)
                };
            }
            if (q.startsWith("Wie kurzfristig ist ein Umzugstermin in ") && a.includes("Da sich unsere Disposition im nahen Regensburg befindet")) {
                let stadt = q.replace("Wie kurzfristig ist ein Umzugstermin in ", "").replace(" verfügbar?", "");
                return {
                    q: templates.umzug_typ1_q2.replace("{stadt}", stadt),
                    a: templates.umzug_typ1_a2.replace("{stadt}", stadt)
                };
            }
            if (q.startsWith("Kümmern Sie sich um Halteverbotszonen in ") && a.includes("Wenn Parkraum vor Ihrer Haustür knapp ist")) {
                let stadt = q.replace("Kümmern Sie sich um Halteverbotszonen in ", "").replace("?", "");
                return {
                    q: templates.umzug_typ1_q3.replace("{stadt}", stadt),
                    a: templates.umzug_typ1_a3.replace("{stadt}", stadt)
                };
            }
            if (q.startsWith("Bieten Sie auch Küchenmontage in ") && a.includes("Wir demontieren Ihre Küche fachmännisch")) {
                let stadt = q.replace("Bieten Sie auch Küchenmontage in ", "").replace(" an?", "");
                return {
                    q: templates.umzug_typ1_q4.replace("{stadt}", stadt),
                    a: templates.umzug_typ1_a4.replace("{stadt}", stadt)
                };
            }
            if (q === "Muss ich die Umzugskartons selbst besorgen?" && a.includes("Nein. Sie können stabile Umzugskartons")) {
                return {
                    q: templates.umzug_typ1_q5,
                    a: templates.umzug_typ1_a5
                };
            }

            // UMZUG Typ 2
            if (q.startsWith("Was kostet ein Umzug in ") && a.includes("Die Kosten hängen von Wohnungsgröße, Etage und Entfernung ab.")) {
                let stadt = q.replace("Was kostet ein Umzug in ", "").replace("?", "");
                return {
                    q: templates.umzug_typ2_q1.replace("{stadt}", stadt),
                    a: templates.umzug_typ2_a1.replace("{stadt}", stadt)
                };
            }
            if (q.startsWith("Wie schnell ist FLOXANT in ") && a.includes("Da unsere Teams täglich auf der Strecke")) {
                let stadt = q.replace("Wie schnell ist FLOXANT in ", "").replace(" verfügbar?", "");
                let streckeMatch = a.match(/Da unsere Teams täglich auf der Strecke (.*?) unterwegs sind/);
                let strecke = streckeMatch ? streckeMatch[1] : "Bayern";
                return {
                    q: templates.umzug_typ2_q2.replace("{stadt}", stadt),
                    a: templates.umzug_typ2_a2.replace("{stadt}", stadt).replace("{strecke}", strecke)
                };
            }
            if (q === "Ist mein Umzugsgut bei FLOXANT versichert?" && a.includes("Ja. Jeder Transport ist über unsere Betriebshaftpflicht")) {
                return {
                    q: templates.umzug_typ2_q3,
                    a: templates.umzug_typ2_a3
                };
            }
            if (q.startsWith("Bieten Sie auch Entrümpelung in ") && a.includes("Wir kombinieren Umzug, Entrümpelung und Endreinigung zu einem Paket")) {
                let stadt = q.replace("Bieten Sie auch Entrümpelung in ", "").replace(" an?", "");
                return {
                    q: templates.umzug_typ2_q4.replace("{stadt}", stadt),
                    a: templates.umzug_typ2_a4.replace("{stadt}", stadt)
                };
            }

            // UMZUG Typ 3 (Altstadt)
            if (q.startsWith("Was kostet ein Umzug in ") && a.includes("Ein lokaler Umzug in ")) {
                let stadt = q.replace("Was kostet ein Umzug in ", "").replace("?", "");
                return {
                    q: templates.umzug_typ3_q1.replace("{stadt}", stadt),
                    a: templates.umzug_typ3_a1.replace("{stadt}", stadt)
                };
            }
            if ((q.startsWith("Macht FLOXANT auch Umzüge in der Altstadt von ") || q.startsWith("Macht FLOXANT auch Umzüge in der Regensburger Altstadt")) && a.includes("Logistik wie enge Gassen")) {
                let stadt = q.replace("Macht FLOXANT auch Umzüge in der Altstadt von ", "").replace("?", "");
                if (stadt === "Regensburger Altstadt" || stadt.includes("Regensburger")) stadt = "Regensburg";
                return {
                    q: templates.umzug_typ3_q2.replace("{stadt}", stadt),
                    a: templates.umzug_typ3_a2.replace("{stadt}", stadt)
                };
            }
            if (q.startsWith("Macht FLOXANT auch Umzüge in der Regensburger Altstadt?") && a.includes("Fußgängerzonen, denkmalgeschützte Gebäude")) {
                let stadt = "Regensburg";
                return {
                    q: templates.umzug_typ3_q2_regensburg.replace("{stadt}", stadt),
                    a: templates.umzug_typ3_a2_regensburg.replace("{stadt}", stadt)
                };
            }
            if (q.startsWith("Bieten Sie Fernumzüge ab ") && a.includes("Wir organisieren Fernumzüge von")) {
                let stadt = q.replace("Bieten Sie Fernumzüge ab ", "").replace(" an?", "");
                if (a.includes("insbesondere NRW")) {
                    return {
                        q: templates.umzug_typ3_q3.replace("{stadt}", stadt),
                        a: templates.umzug_typ3_a3_regensburg.replace("{stadt}", stadt)
                    };
                } else {
                    return {
                        q: templates.umzug_typ3_q3.replace("{stadt}", stadt),
                        a: templates.umzug_typ3_a3.replace("{stadt}", stadt)
                    };
                }
            }

            // ENTRÜMPELUNG GERICHTET
            if (q.startsWith("Was kostet eine Entrümpelung in ") && a.includes("30 bis 80 Euro pro Kubikmeter")) {
                let stadt = q.replace("Was kostet eine Entrümpelung in ", "").replace("?", "");
                return {
                    q: templates.entruempelung_q1.replace("{stadt}", stadt),
                    a: templates.entruempelung_a1.replace("{stadt}", stadt)
                };
            }
            if (q === "Wie schnell können Sie entrümpeln?" && a.includes("Express-Entrümpelung innerhalb von 24 bis 48 Stunden")) {
                return {
                    q: templates.entruempelung_q2,
                    a: templates.entruempelung_a2
                };
            }

            // REINIGUNG GERICHTET
            if (q.startsWith("Was kostet eine Reinigung in ") && a.includes("3 bis 5 Euro pro Quadratmeter")) {
                let stadt = q.replace("Was kostet eine Reinigung in ", "").replace("?", "");
                return {
                    q: templates.reinigung_q1.replace("{stadt}", stadt),
                    a: templates.reinigung_a1.replace("{stadt}", stadt)
                };
            }
            if (q === "Gibt es eine Abnahmegarantie?" && a.includes("Falls der Vermieter Nachbesserungen verlangt")) {
                return {
                    q: templates.reinigung_q2,
                    a: templates.reinigung_a2
                };
            }

            // SENIORENUMZUG
            if (q === "Was unterscheidet einen Seniorenumzug vom normalen Umzug?" && a.includes("Komplettes Einpacken, Aussortieren")) {
                return {
                    q: templates.senior_q1,
                    a: templates.senior_a1
                };
            }
            if (q.startsWith("Wie viel kostet ein Seniorenumzug in ") && a.includes("Die Kosten richten sich nach Wohnungsgröße und gewünschten Zusatzleistungen")) {
                let stadt = q.replace("Wie viel kostet ein Seniorenumzug in ", "").replace("?", "");
                return {
                    q: templates.senior_q2.replace("{stadt}", stadt),
                    a: templates.senior_a2.replace("{stadt}", stadt)
                };
            }
            if (q === "Helfen Sie auch bei der Wohnungsauflösung?" && a.includes("Wir kombinieren Seniorenumzug mit fachgerechter Entrümpelung")) {
                return {
                    q: templates.senior_q3,
                    a: templates.senior_a3
                };
            }

            // Try to look up unique array item in uniqueStrings (stringify and match)
            // But actually we can just look up uniqueStrings[key] if we stored the whole array!
            if (uniqueStrings[key] && Array.isArray(uniqueStrings[key])) {
                let match = uniqueStrings[key].find(uItem => uItem.original_q === item.q);
                if (match) {
                    return { q: match.q, a: match.a };
                }
            }

            // fallback
            return { q, a };
        });
    }

    return value;
}

// Since de.json is flat structurally via dictionaries
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
const resultObj = {};

for (const [key, value] of Object.entries(flatDe)) {
    resultObj[key] = processTemplates(key, value, lang);
}

// Convert flat back to nested
const finalResult = {};
for (const [k, v] of Object.entries(resultObj)) {
    setNestedValue(finalResult, k, v);
}

fs.writeFileSync(path.join(__dirname, 'dictionaries', `${lang}.json`), JSON.stringify(finalResult, null, 2));
console.log(`Language ${lang} fully assembled and saved to dictionaries/${lang}.json!`);
