const fs = require('fs');
const path = require('path');

const chunk5Raw = fs.readFileSync(path.join(__dirname, 'de_chunk_5.json'), 'utf8');
const chunk6Raw = fs.readFileSync(path.join(__dirname, 'de_chunk_6.json'), 'utf8');

const chunk5 = JSON.parse(chunk5Raw);
const chunk6 = JSON.parse(chunk6Raw);

function translateDict(dict) {
  const result = {};

  for (const [key, value] of Object.entries(dict)) {
    if (Array.isArray(value)) {
      result[key] = value.map(item => {
        let q = item.q;
        let a = item.a;

        // ------------------
        // UMZUG
        // ------------------
        // Typ 1
        if (q.startsWith("Was kostet ein Umzug in ") && a.includes("Ein Transporter mit Helfern ist oft schon ab günstigen Einstiegspreisen verfügbar.")) {
          let stadt = q.replace("Was kostet ein Umzug in ", "").replace("?", "");
          q = `What financial volume absorbs a relocation traversing ${stadt}?`;
          a = `A foundational vehicle complemented by ground forces usually initiates at highly accessible brackets. Standard-sized households unlock fully localized fixed parameters, generally occupying 400€ to 1,500€ boundaries tightly dependent upon room quantities and total transport spans.`;
        }

        else if (q.startsWith("Wie kurzfristig ist ein Umzugstermin in ") && a.includes("Da sich unsere Disposition im nahen Regensburg befindet")) {
          let stadt = q.replace("Wie kurzfristig ist ein Umzugstermin in ", "").replace(" verfügbar?", "");
          q = `How aggressively fast can a relocation timeline trigger inside ${stadt}?`;
          a = `Benefiting from our deeply anchored disposition network stationed merely in Regensburg, we effortlessly manifest intensely compressed jumps or urgent emergency deployments touching ${stadt} steadily.`;
        }

        else if (q.startsWith("Kümmern Sie sich um Halteverbotszonen in ") && a.includes("Wenn Parkraum vor Ihrer Haustür knapp ist")) {
          let stadt = q.replace("Kümmern Sie sich um Halteverbotszonen in ", "").replace("?", "");
          q = `Do you actively govern no-parking barriers framing ${stadt}?`;
          a = `Irrefutably. Should loading bays face critical scarcity bordering your entrance, we orchestrate legitimate bureaucratic permit processes directly mounting authorized municipal signage.`;
        }

        else if (q.startsWith("Bieten Sie auch Küchenmontage in ") && a.includes("Wir demontieren Ihre Küche fachmännisch")) {
          let stadt = q.replace("Bieten Sie auch Küchenmontage in ", "").replace(" an?", "");
          q = `Is structural kitchen assembly provided throughout ${stadt}?`;
          a = `We expertly unwire and dismantle kitchen geometries, packaging modules highly securely. Furthermore, executing masterful reconstruction tasks upon arrival operates smoothly assuming objective technical feasibilities align.`;
        }

        else if (q === "Muss ich die Umzugskartons selbst besorgen?" && a.includes("Nein. Sie können stabile Umzugskartons")) {
          q = `Must I manually procure protective moving cartons independently?`;
          a = `Negative. You can seamlessly provision heavily stabilized moving bins, specialized wardrobe units, and impact-shielding wraps via our rental or permanent acquisition streams.`;
        }

        // Typ 2
        else if (q.startsWith("Was kostet ein Umzug in ") && a.includes("Die Kosten hängen von Wohnungsgröße, Etage und Entfernung ab.")) {
          let stadt = q.replace("Was kostet ein Umzug in ", "").replace("?", "");
          q = `What financial parameters bind a relocation inside ${stadt}?`;
          a = `Pricing dynamics adapt natively surrounding apartment scale, vertical ascents, and lateral distances. Student transits unlock extremely accessible floors. Broader families obtain intensely structured fixed-valuations exclusively post-free assessments.`;
        }

        else if (q.startsWith("Wie schnell ist FLOXANT in ") && a.includes("Da unsere Teams täglich auf der Strecke")) {
          let stadt = q.replace("Wie schnell ist FLOXANT in ", "").replace(" verfügbar?", "");
          let streckeMatch = a.match(/Da unsere Teams täglich auf der Strecke (.*?) unterwegs sind/);
          let strecke = streckeMatch ? streckeMatch[1] : "Bayern";
          q = `How rapidly does FLOXANT mobilize targeting ${stadt}?`;
          a = `Considering our units continuously patrol the ${strecke} conduits day-to-day, commanding rapid operational thresholds spanning ${stadt} within merely days turns easily feasible.`;
        }

        else if (q === "Ist mein Umzugsgut bei FLOXANT versichert?" && a.includes("Ja. Jeder Transport ist über unsere Betriebshaftpflicht")) {
          q = `Does FLOXANT securely insure moving loads?`;
          a = `Decisively. Absolute transport volumes ride safeguarded crossing stringent operational liabilities interlocking the rigid §451g HGB commercial transit law.`;
        }

        else if (q.startsWith("Bieten Sie auch Entrümpelung in ") && a.includes("Wir kombinieren Umzug, Entrümpelung und Endreinigung zu einem Paket")) {
          let stadt = q.replace("Bieten Sie auch Entrümpelung in ", "").replace(" an?", "");
          q = `Is deep clearance/Entrümpelung available facing ${stadt}?`;
          a = `Assuredly. We interlock relocation, sweeping Entrümpelung protocols, framing terminal sanitation loops forming one dense packet. Supreme for estate dissolving or satisfying strict broom-clean obligations.`;
        }

        // Typ 3 (Altstadt)
        else if (q.startsWith("Was kostet ein Umzug in ") && a.includes("Ein lokaler Umzug in ")) {
          let stadt = q.replace("Was kostet ein Umzug in ", "").replace("?", "");
          q = `What financial volume absorbs a relocation traversing ${stadt}?`;
          a = `A strictly localized transit dissecting ${stadt} ranges generally between 400 pushing 2,000 Euros mapped natively upon unit dimension. FLOXANT deliberately offers unyielding fixed-valuations upon free visual appraisals.`;
        }

        else if ((q.startsWith("Macht FLOXANT auch Umzüge in der Altstadt von ") || q.startsWith("Macht FLOXANT auch Umzüge in der Regensburger Altstadt")) && a.includes("Logistik wie enge Gassen")) {
            let stadt = q.replace("Macht FLOXANT auch Umzüge in der Altstadt von ", "").replace("?", "");
            if (stadt === "Regensburger Altstadt") stadt = "Regensburg";
            q = `Does FLOXANT comfortably navigate old-town logistics surrounding ${stadt}?`;
            a = `Affirmative, we heavily specialize cracking intensive logistical frictions mimicking bottleneck alleyways or punishing vertical steps – completely commandeering valid parking zone authorizations.`;
        }
        else if (q.startsWith("Macht FLOXANT auch Umzüge in der Regensburger Altstadt?") && a.includes("Fußgängerzonen, denkmalgeschützte Gebäude")) {
            let stadt = "Regensburg";
            q = `Does FLOXANT comfortably navigate old-town logistics surrounding ${stadt}?`;
            a = `Affirmative, we intimately specialize dissecting historical layouts: heavily bottlenecked alleys, strict pedestrian networks, heavily protected heritage structures. Completely orchestrating municipal access permits natively.`;
        }

        else if (q.startsWith("Bieten Sie Fernumzüge ab ") && a.includes("Wir organisieren Fernumzüge von")) {
          let stadt = q.replace("Bieten Sie Fernumzüge ab ", "").replace(" an?", "");
          q = `Are long-distance jumps dispatched leaving ${stadt}?`;
          if (a.includes("insbesondere NRW")) {
             a = `Absolutely. We architect massive long-range jumps originating from Regensburg actively connecting the entire German republic, intensely targeting NRW. Cyclical weekly conduits unlock supremely dominant pricing efficiencies.`;
          } else {
             a = `Absolutely. We architect massive long-range jumps originating from ${stadt} actively connecting the entire German republic.`;
          }
        }

        // ------------------
        // ENTRÜMPELUNG GERICHTET (Augsburg, Landshut etc)
        // ------------------
        else if (q.startsWith("Was kostet eine Entrümpelung in ") && a.includes("30 bis 80 Euro pro Kubikmeter")) {
          let stadt = q.replace("Was kostet eine Entrümpelung in ", "").replace("?", "");
          q = `What does an Entrümpelung cost inside ${stadt}?`;
          a = `Roughly scaling 30 up to 80 Euros spanning per cubic meter, tightly bounded upon material composition combined with operational proximity. Iron-clad Fixed Value unlocked upon evaluation.`;
        }

        else if (q === "Wie schnell können Sie entrümpeln?" && a.includes("Express-Entrümpelung innerhalb von 24 bis 48 Stunden")) {
          q = `How rapid is your Entrümpelung clearance velocity?`;
          a = `Express Entrümpelung operations realistically mature inside 24 to 48 hours. Habitual loops execute efficiently within seven days.`;
        }

        // ------------------
        // REINIGUNG GERICHTET (Augsburg, Landshut etc)
        // ------------------
        else if (q.startsWith("Was kostet eine Reinigung in ") && a.includes("3 bis 5 Euro pro Quadratmeter")) {
          let stadt = q.replace("Was kostet eine Reinigung in ", "").replace("?", "");
          q = `What is the financial volume of a cleaning sweep traversing ${stadt}?`;
          a = `Generally sweeping from 3 hitting 5 Euros bound by per-square-meter calculations covering specialized finish sanitation. Iron-clad Fixed Value unlocked upon evaluation.`;
        }

        else if (q === "Gibt es eine Abnahmegarantie?" && a.includes("Falls der Vermieter Nachbesserungen verlangt")) {
          q = `Is a terminal handover assurance embedded?`;
          a = `Undoubtedly. Assuming any landlord invokes secondary refinements remotely attached to the sanitation grid, our squad physically loops back eliminating costs.`;
        }

        // ------------------
        // SENIORENUMZUG
        // ------------------
        else if (q === "Was unterscheidet einen Seniorenumzug vom normalen Umzug?" && a.includes("Komplettes Einpacken, Aussortieren")) {
          q = `What systematically separates Senior relocations against conventional shifts?`;
          a = `Navigating a Senior transition mandates vastly expanded intervention grids: Complete bounding, aggressive decluttering, structural furniture reconstruction, administrative hurdles, advancing optionally towards executing the final housing setup. Subsystems comprise exclusively trained personnel demonstrating absolute patience and empathy.`;
        }

        else if (q.startsWith("Wie viel kostet ein Seniorenumzug in ") && a.includes("Die Kosten richten sich nach Wohnungsgröße und gewünschten Zusatzleistungen")) {
          let stadt = q.replace("Wie viel kostet ein Seniorenumzug in ", "").replace("?", "");
          q = `What fiscal boundaries frame a Senior relocation inside ${stadt}?`;
          a = `Fiscal structures securely anchor spanning spatial scopes mixed into expanded peripheral directives. True Full-Service Elderly transitions typically exceed basic operational loops mapping 30-50% upticks, functionally erasing all associated panic dynamically.`;
        }

        else if (q === "Helfen Sie auch bei der Wohnungsauflösung?" && a.includes("Wir kombinieren Seniorenumzug mit fachgerechter Entrümpelung")) {
          q = `Do you coordinate full residential liquidations as well?`;
          a = `Affirmative. We bond Senior transits seamlessly intersecting master-level Entrümpelung coupled to broom-clean sanitation finishings. Strikingly ideal bridging into assisted living or institutional care facilities.`;
        }
        
        else {
           // Not caught by templates, just return them as they are and we can manually review if any
        }
        
        return { q, a };
      });
    } else if (typeof value === 'string') {
        let text = value;
        // META TITLES
        if (text.startsWith("Umzug in ") && text.includes("ab 79€ – Sofort verfügbar | FLOXANT")) {
            let stadt = text.replace("Umzug in ", "").replace(" ab 79€ – Sofort verfügbar | FLOXANT", "");
            text = `Relocation in ${stadt} starting at 79€ – Instantly Dispatchable | FLOXANT`;
        }
        else if (text.startsWith("Umzugsunternehmen ") && text.includes("✓ Festpreis ✓ Versichert | FLOXANT")) {
            let stadt = text.replace("Umzugsunternehmen ", "").replace(" ✓ Festpreis ✓ Versichert | FLOXANT", "");
            text = `Moving Company ${stadt} ✓ Fixed Price ✓ Fully Insured | FLOXANT`;
        }
        else if (text.startsWith("Umzugsunternehmen ") && text.includes("✓ Festpreis ✓ Versicherung | FLOXANT")) {
            let stadt = text.replace("Umzugsunternehmen ", "").replace(" ✓ Festpreis ✓ Versicherung | FLOXANT", "");
            text = `Moving Company ${stadt} ✓ Fixed Price ✓ Full Insurance | FLOXANT`;
        }
        else if (text.startsWith("Halteverbotszone ") && text.includes("– Beantragung & Aufstellung | FLOXANT")) {
            let stadt = text.replace("Halteverbotszone ", "").replace(" – Beantragung & Aufstellung | FLOXANT", "");
            text = `No-Parking Zone ${stadt} – Procurement & Signage Mounting | FLOXANT`;
        }
        else if (text.startsWith("Halteverbotszone in ") && text.includes("beantragen: Wir übernehmen die behördliche Genehmigung")) {
            let stadt = text.replace("Halteverbotszone in ", "").split(" ")[0];
            text = `Requesting a no-parking zone in ${stadt}: We secure municipal permits alongside deploying authoritative barricades. Legally binding, strictly punctual, stress-free. Immediately calculate online pricing or effortlessly connect via WhatsApp / Phone: +49 1577 1105087.`;
        }
        else if (text.startsWith("Klaviertransport & Tresortransport ") && text.includes("| FLOXANT Schwertransporte")) {
            let stadt = text.replace("Klaviertransport & Tresortransport ", "").replace(" | FLOXANT Schwertransporte", "");
            text = `Piano Transport & Safe Relocation ${stadt} | FLOXANT Heavy-Duty Transit`;
        }
        else if (text.startsWith("Klaviertransport, Flügeltransport und Tresortransport in ") && text.includes("Jetzt anfragen! Sofortpreis")) {
            let stadt = text.replace("Klaviertransport, Flügeltransport und Tresortransport in ", "").split(".")[0];
            text = `Heavy-haul piano, concert grand, and secure safe relocation inside ${stadt}. Highly targeted hardware, elite team dynamics, absolute liability coverage. Engage immediately! Compute live rates or connect smoothly via WhatsApp / Call: +49 1577 1105087.`;
        }
        else if (text.startsWith("Seniorenumzug ") && text.includes("– Einfühlsam & Sicher | FLOXANT")) {
            let stadt = text.replace("Seniorenumzug ", "").replace(" – Einfühlsam & Sicher | FLOXANT", "");
            text = `Senior Relocation ${stadt} – Profoundly Tactful & Secure | FLOXANT`;
        }
        else if (text.startsWith("Seniorenumzug in ") && text.includes("Kompletter Einpackservice, Möbelmontage")) {
            let stadt = text.replace("Seniorenumzug in ", "").split(":")[0];
            text = `Elderly transitions actively targeting ${stadt}: Absolute packing routines, assembly protocols, bureaucratic navigation. Deeply empathetic personnel, strictly fixed evaluations, absolute insurance covers. Secure immediate consultations! Compute online metrics or directly chat WhatsApp / Call: +49 1577 1105087.`;
        }
        else if (text === "Umzugsunternehmen Landkreis Regensburg – Ihr regionaler Partner | FLOXANT") {
            text = "Moving Company Landkreis Regensburg – Your Ultimate Regional Authority | FLOXANT";
        }
        else if (text === "Umzugsunternehmen Oberpfalz – Ihr regionaler Partner | FLOXANT") {
            text = "Moving Company Oberpfalz – Your Ultimate Regional Authority | FLOXANT";
        }
        
        result[key] = text;
    } else {
        result[key] = value;
    }
  }
  return result;
}

const engChunk5 = translateDict(chunk5);
const engChunk6 = translateDict(chunk6);

fs.writeFileSync(path.join(__dirname, 'en_chunk_5_done.json'), JSON.stringify(engChunk5, null, 2));
fs.writeFileSync(path.join(__dirname, 'en_chunk_6_done.json'), JSON.stringify(engChunk6, null, 2));

console.log("Translation done for chunk 5 & 6!");
