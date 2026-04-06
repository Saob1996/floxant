const fs = require('fs');
const path = require('path');

const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

const families = [
  {
    pattern: 'entruempelung-',
    cities: ['bayern', 'augsburg', 'landshut', 'muenchen', 'nuernberg', 'passau', 'regensburg'],
    dictKey: 'entruempelung_spec',
    en: {
        meta_title: "House Clearance {city} | FLOXANT", meta_desc: "Professional house clearance and disposal in {city}.",
        hero_badge: "Clearance Service", hero_h1: "Clearance", hero_p: "We clear flats, basements, and attics in {city} quickly and discretely.",
        badges: { permit: "Fast", signs: "Discrete", stressfree: "Fair Value Check" }, cta: "Request Clearance",
        service1: { title: "Complete Clearance", l1: "Flat clearance", l2: "Basement clearance", l3: "Firm price", l4: "Fast execution" },
        service2: { title: "Disposal", l1: "Eco-friendly", l2: "Heavy items", l3: "Clean handover", l4: "Charity" },
        section2_h2: "Clearance {city}", section2_p1: "Your expert in {city}.", section2_p2: "Book your free viewing now.",
        wizard_badge: "Clearance", wizard_h2: "Request {city}", wizard_p: "Tell us what you need cleared.",
        link_umzug: "Moving {city}", link_senioren: "Senior Moving {city}", link_halteverbot: "Cleaning {city}"
    },
    de: {
        meta_title: "Entrümpelung {city} | FLOXANT", meta_desc: "Professionelle Entrümpelung und Wohnungsauflösung in {city}.",
        hero_badge: "Räumungsservice", hero_h1: "Entrümpelung", hero_p: "Ob Wohnungsauflösung, Keller oder Dachboden in {city}: Wir räumen diskret und besenrein.",
        badges: { permit: "Schnell", signs: "Diskret", stressfree: "Wertanrechnung" }, cta: "Entrümpelung anfragen",
        service1: { title: "Kompletträumung", l1: "Wohnungsauflösung", l2: "Keller & Dachboden", l3: "Festpreis", l4: "Besenrein" },
        service2: { title: "Fachgerechte Entsorgung", l1: "Umweltgerecht", l2: "Sperrmüll", l3: "Aktenvernichtung", l4: "Spenden" },
        section2_h2: "Professionelle Entrümpelung {city}", section2_p1: "Wir sind Ihr Ansprechpartner in {city}.", section2_p2: "Vereinbaren Sie eine kostenlose Besichtigung.",
        wizard_badge: "Räumung", wizard_h2: "Entrümpelung {city} anfragen", wizard_p: "Senden Sie uns Bilder oder vereinbaren Sie einen Termin.",
        link_umzug: "Umzug {city}", link_senioren: "Seniorenumzug {city}", link_halteverbot: "Reinigung {city}"
    },
    ar: {
        meta_title: "تفريغ المنزل {city} | FLOXANT", meta_desc: "تفريغ احترافي للمنازل في {city}.",
        hero_badge: "خدمة التفريغ", hero_h1: "تفريغ المنازل", hero_p: "نحن نقوم بإخلاء الشقق والأقبية في {city} بسرعة وتكتم.",
        badges: { permit: "سريع", signs: "منفصل", stressfree: "التحقق من القيمة العادلة" }, cta: "اطلب التفريغ",
        service1: { title: "تخليص كامل", l1: "-", l2: "-", l3: "-", l4: "-" }, service2: { title: "تصرف", l1: "-", l2: "-", l3: "-", l4: "-" },
        section2_h2: "تخليص {city}", section2_p1: "-", section2_p2: "-", wizard_badge: "تخليص", wizard_h2: "طلب {city}", wizard_p: "-", link_umzug: "نقل {city}", link_senioren: "نقل كبار السن {city}", link_halteverbot: "تنظيف {city}"
    },
    zh: {
        meta_title: "房屋清理 {city} | FLOXANT", meta_desc: "专业房屋清理在 {city}.",
        hero_badge: "清理服务", hero_h1: "清理房屋", hero_p: "我们在 {city} 快速清理公寓和地下室.",
        badges: { permit: "快", signs: "小心", stressfree: "保值评估" }, cta: "请求清理",
        service1: { title: "清理服务", l1: "-", l2: "-", l3: "-", l4: "-" }, service2: { title: "废弃处理", l1: "-", l2: "-", l3: "-", l4: "-" },
        section2_h2: "{city}", section2_p1: "-", section2_p2: "-", wizard_badge: "清理", wizard_h2: "请求 {city}", wizard_p: "-", link_umzug: "搬家 {city}", link_senioren: "长者 {city}", link_halteverbot: "保洁 {city}"
    }
  },
  {
    pattern: 'reinigung-',
    cities: ['bayern', 'augsburg', 'landshut', 'muenchen', 'nuernberg', 'passau', 'regensburg'],
    dictKey: 'reinigung_spec',
    en: {
        meta_title: "Handover Cleaning {city} | FLOXANT", meta_desc: "Professional cleaning with handover guarantee in {city}.",
        hero_badge: "Cleaning", hero_h1: "Move-out Cleaning", hero_p: "Save yourself the stress. We clean your apartment in {city} with a 100% handover guarantee.",
        badges: { permit: "Handover Guarantee", signs: "Eco-friendly", stressfree: "Deep Clean" }, cta: "Request Cleaning",
        service1: { title: "Deep Clean", l1: "Bathroom & Kitchen", l2: "Windows", l3: "Stains", l4: "Radiators" },
        service2: { title: "Guarantee", l1: "Free rework", l2: "Landlord appoved", l3: "Transparent", l4: "Fast" },
        section2_h2: "Cleaning {city}", section2_p1: "-", section2_p2: "Book now.", wizard_badge: "Clean", wizard_h2: "Request {city}", wizard_p: "-",
        link_umzug: "Moving {city}", link_senioren: "Senior Move {city}", link_halteverbot: "Clearance {city}"
    },
    de: {
        meta_title: "Endreinigung {city} | FLOXANT", meta_desc: "Professionelle Umzugsreinigung mit Abnahmegarantie in {city}.",
        hero_badge: "Reinigungsfirma", hero_h1: "Endreinigung", hero_p: "Sparen Sie sich den Putzstress nach dem Umzug. Wir reinigen Ihre Wohnung in {city} mit 100% Abnahmegarantie.",
        badges: { permit: "Abnahmegarantie", signs: "Umweltfreundlich", stressfree: "Tiefenrein" }, cta: "Reinigung anfragen",
        service1: { title: "Intensivreinigung", l1: "Bad & Küche Entkalkung", l2: "Fenster & Rahmen", l3: "Böden", l4: "Heizkörper" },
        service2: { title: "Garantie", l1: "Kostenlose Nachbesserung", l2: "Vermietergerecht", l3: "Festpreis", l4: "Zuverlässig" },
        section2_h2: "Professionelle Reinigung in {city}", section2_p1: "Ihre alte Wohnung in {city} erstrahlt in neuem Glanz.", section2_p2: "Mit Abnahmegarantie.",
        wizard_badge: "Sauber", wizard_h2: "Reinigung {city} anfragen", wizard_p: "Geben Sie die Quadratmeterzahl ein.",
        link_umzug: "Umzug {city}", link_senioren: "Seniorenumzug {city}", link_halteverbot: "Entrümpelung {city}"
    },
    ar: {
        meta_title: "تنظيف استلام {city} | FLOXANT", meta_desc: "تنظيف احترافي في {city}.", hero_badge: "تنظيف", hero_h1: "تنظيف مغادرة", hero_p: "نوفر لك تنظيف بضمان استلام من المالك.", badges: { permit: "ضمان الاستلام", signs: "صديق للبيئة", stressfree: "تنظيف عميق" }, cta: "طلب تنظيف", service1: { title: "تنظيف عميق", l1: "-", l2: "-", l3: "-", l4: "-" }, service2: { title: "ضمان", l1: "-", l2: "-", l3: "-", l4: "-" }, section2_h2: "تنظيف {city}", section2_p1: "-", section2_p2: "-", wizard_badge: "نظيف", wizard_h2: "طلب {city}", wizard_p: "-", link_umzug: "نقل {city}", link_senioren: "نقل كبار السن {city}", link_halteverbot: "تفريغ {city}"
    },
    zh: {
        meta_title: "退房保洁 {city} | FLOXANT", meta_desc: "带有退房保证的保洁服务 {city}.", hero_badge: "保洁", hero_h1: "退房保洁", hero_p: "省去麻烦。我们为您在 {city} 彻底清洁公寓.", badges: { permit: "退租保证", signs: "环保", stressfree: "深度清洁" }, cta: "请求保洁", service1: { title: "深度清洁", l1: "-", l2: "-", l3: "-", l4: "-" }, service2: { title: "保证", l1: "-", l2: "-", l3: "-", l4: "-" }, section2_h2: "{city} 保洁", section2_p1: "-", section2_p2: "-", wizard_badge: "保洁", wizard_h2: "请求 {city}", wizard_p: "-", link_umzug: "搬家 {city}", link_senioren: "长者 {city}", link_halteverbot: "搬家 {city}"
    }
  }
];

const locales = ['ar', 'bg', 'de', 'en', 'es', 'fa', 'fr', 'it', 'ja', 'ko', 'pl', 'ro', 'ru', 'tr', 'uk', 'vi', 'zh'];

families.forEach(f => {
    locales.forEach(loc => {
        const file = `dictionaries/${loc}.json`;
        if (fs.existsSync(file)) {
            const dict = JSON.parse(fs.readFileSync(file, 'utf8'));
            if (!dict.pages) dict.pages = {};
            const source = f[loc] || f['en'];
            dict.pages[f.dictKey] = source; 
            fs.writeFileSync(file, JSON.stringify(dict, null, 2));
        }
    });

    const pageTemplate = fs.readFileSync('family_template.tsx', 'utf8');

    f.cities.forEach(city => {
        let slug = f.pattern + city;
        const filePath = path.join('app/[lang]', slug, 'page.tsx');
        
        let cityName = capitalize(city);
        if(city === 'muenchen') cityName = 'München';
        if(city === 'nuernberg') cityName = 'Nürnberg';
        
        let gen = pageTemplate
            .replace(/DICT_KEY/g, f.dictKey)
            .replace(/CITY_NAME/g, cityName)
            .replace(/URL_PATH/g, slug)
            .replace(/CITY_LOWER/g, city);
            
        if(fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, gen);
            console.log("Updated", filePath);
        }
    });

});
