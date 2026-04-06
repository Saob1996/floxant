const fs = require('fs');

const data = {
  fr: {
    klaviertransport: { meta_title: "Transport de Piano {city} | FLOXANT", meta_desc: "Transport sécurisé.", hero_badge: "Spécial", hero_h1: "Transport de Pianos", hero_p: "Assurance complète.", badges: { piano: "-", safe: "-", insurance: "-" }, cta: "-", service1: { title: "-", l1: "-", l2: "-", l3: "-", l4: "-" }, service2: { title: "-", l1: "-", l2: "-", l3: "-", l4: "-" }, section2_h2: "-", section2_p1: "-", section2_p2: "-", wizard_badge: "-", wizard_h2: "-", wizard_p: "-", link_umzug: "-", link_senioren: "-", link_halteverbot: "-" },
    halteverbotszone: { meta_title: "Zone de stationnement {city}", meta_desc: "-", hero_badge: "-", hero_h1: "Zone", hero_p: "-", badges: { permit: "-", signs: "-", stressfree: "-" }, cta: "-", service1: { title: "-", l1: "-", l2: "-", l3: "-", l4: "-" }, service2: { title: "-", l1: "-", l2: "-", l3: "-", l4: "-" }, section2_h2: "-", section2_p1: "-", section2_p2: "-", wizard_badge: "-", wizard_h2: "-", wizard_p: "-", link_umzug: "-", link_senioren: "-", link_halteverbot: "-" },
    seniorenumzug: { meta_title: "Déménagement Seniors {city}", meta_desc: "-", hero_badge: "-", hero_h1: "Seniors", hero_p: "-", badges: { permit: "-", signs: "-", stressfree: "-" }, cta: "-", service1: { title: "-", l1: "-", l2: "-", l3: "-", l4: "-" }, service2: { title: "-", l1: "-", l2: "-", l3: "-", l4: "-" }, section2_h2: "-", section2_p1: "-", section2_p2: "-", wizard_badge: "-", wizard_h2: "-", wizard_p: "-", link_umzug: "-", link_senioren: "-", link_halteverbot: "-" },
    studentenumzug: { meta_title: "Étudiants {city}", meta_desc: "-", hero_badge: "-", hero_h1: "Étudiants", hero_p: "-", badges: { permit: "-", signs: "-", stressfree: "-" }, cta: "-", service1: { title: "-", l1: "-", l2: "-", l3: "-", l4: "-" }, service2: { title: "-", l1: "-", l2: "-", l3: "-", l4: "-" }, section2_h2: "-", section2_p1: "-", section2_p2: "-", wizard_badge: "-", wizard_h2: "-", wizard_p: "-", link_umzug: "-", link_senioren: "-", link_halteverbot: "-" },
    familienumzug: { meta_title: "Déménagement Famille {city}", meta_desc: "-", hero_badge: "-", hero_h1: "Famille", hero_p: "-", badges: { permit: "-", signs: "-", stressfree: "-" }, cta: "-", service1: { title: "-", l1: "-", l2: "-", l3: "-", l4: "-" }, service2: { title: "-", l1: "-", l2: "-", l3: "-", l4: "-" }, section2_h2: "-", section2_p1: "-", section2_p2: "-", wizard_badge: "-", wizard_h2: "-", wizard_p: "-", link_umzug: "-", link_senioren: "-", link_halteverbot: "-" },
    entruempelung_spec: { meta_title: "Débarras {city}", meta_desc: "-", hero_badge: "-", hero_h1: "Débarras", hero_p: "-", badges: { permit: "-", signs: "-", stressfree: "-" }, cta: "-", service1: { title: "-", l1: "-", l2: "-", l3: "-", l4: "-" }, service2: { title: "-", l1: "-", l2: "-", l3: "-", l4: "-" }, section2_h2: "-", section2_p1: "-", section2_p2: "-", wizard_badge: "-", wizard_h2: "-", wizard_p: "-", link_umzug: "-", link_senioren: "-", link_halteverbot: "-" },
    reinigung_spec: { meta_title: "Nettoyage {city}", meta_desc: "-", hero_badge: "-", hero_h1: "Nettoyage", hero_p: "-", badges: { permit: "-", signs: "-", stressfree: "-" }, cta: "-", service1: { title: "-", l1: "-", l2: "-", l3: "-", l4: "-" }, service2: { title: "-", l1: "-", l2: "-", l3: "-", l4: "-" }, section2_h2: "-", section2_p1: "-", section2_p2: "-", wizard_badge: "-", wizard_h2: "-", wizard_p: "-", link_umzug: "-", link_senioren: "-", link_halteverbot: "-" },
    umzug24: { meta_title: "24h {city}", meta_desc: "-", hero_badge: "-", hero_h1: "24h", hero_p: "-", badges: { permit: "-", signs: "-", stressfree: "-" }, cta: "-", service1: { title: "-", l1: "-", l2: "-", l3: "-", l4: "-" }, service2: { title: "-", l1: "-", l2: "-", l3: "-", l4: "-" }, section2_h2: "-", section2_p1: "-", section2_p2: "-", wizard_badge: "-", wizard_h2: "-", wizard_p: "-", link_umzug: "-", link_senioren: "-", link_halteverbot: "-" },
    kleintransport: { meta_title: "Petit fret {city}", meta_desc: "-", hero_badge: "-", hero_h1: "Petit", hero_p: "-", badges: { permit: "-", signs: "-", stressfree: "-" }, cta: "-", service1: { title: "-", l1: "-", l2: "-", l3: "-", l4: "-" }, service2: { title: "-", l1: "-", l2: "-", l3: "-", l4: "-" }, section2_h2: "-", section2_p1: "-", section2_p2: "-", wizard_badge: "-", wizard_h2: "-", wizard_p: "-", link_umzug: "-", link_senioren: "-", link_halteverbot: "-" },
    bueroumzug: { meta_title: "Bureau {city}", meta_desc: "-", hero_badge: "-", hero_h1: "Bureau", hero_p: "-", badges: { permit: "-", signs: "-", stressfree: "-" }, cta: "-", service1: { title: "-", l1: "-", l2: "-", l3: "-", l4: "-" }, service2: { title: "-", l1: "-", l2: "-", l3: "-", l4: "-" }, section2_h2: "-", section2_p1: "-", section2_p2: "-", wizard_badge: "-", wizard_h2: "-", wizard_p: "-", link_umzug: "-", link_senioren: "-", link_halteverbot: "-" }
  }
};

const locales = ['fr'];

locales.forEach(loc => {
    const file = `dictionaries/${loc}.json`;
    if (fs.existsSync(file)) {
        const dict = JSON.parse(fs.readFileSync(file, 'utf8'));
        if (!dict.pages) dict.pages = {};
        
        Object.keys(data[loc]).forEach(namespace => {
            dict.pages[namespace] = data[loc][namespace];
        });
        
        fs.writeFileSync(file, JSON.stringify(dict, null, 2));
        console.log("Updated", loc);
    }
});
