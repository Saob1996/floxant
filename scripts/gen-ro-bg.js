/**
 * Batch generator for remaining 10 locales: ro, bg, es, fr, it, fa, zh, vi, ko, ja
 * Uses EN pages as structural base, applies locale-specific translations to key fields.
 */
const fs = require('fs');
const path = require('path');
const DICT_DIR = path.join(__dirname, '..', 'dictionaries');
const enDict = JSON.parse(fs.readFileSync(path.join(DICT_DIR, 'en.json'), 'utf8'));
function clone(o) { return JSON.parse(JSON.stringify(o)); }
// Helper to enforce structure
function enforceStructure(base, ext) {
    if (typeof base !== 'object' || base === null || Array.isArray(base)) {
        return (ext !== undefined && typeof ext === typeof base) ? ext : base;
    }
    const res = {};
    for (const k in base) {
        res[k] = enforceStructure(base[k], ext ? ext[k] : undefined);
    }
    return res;
}

function gen(locale, area, pages) {
    const filePath = path.join(DICT_DIR, `${locale}.json`);
    let existing = {};
    try { existing = JSON.parse(fs.readFileSync(filePath, 'utf8')); } catch (e) { }

    const en = JSON.parse(fs.readFileSync(path.join(DICT_DIR, 'en.json'), 'utf8'));
    const merged = enforceStructure(en, existing);

    merged.area = { ...merged.area, ...area };
    merged.pages = pages;

    fs.writeFileSync(filePath, JSON.stringify(merged, null, 2), 'utf8');
    console.log(`${locale}.json: ${fs.readFileSync(filePath, 'utf8').split('\n').length} lines`);
}

// Reusable translation applier
function applyTranslations(L) {
    const p = clone(enDict.pages);
    const m = p.umzug_muenchen;
    m.hero_title_prefix = L.move_in; m.hero_title_highlight = L.munich; m.hero_desc = L.muc_hero; m.badge = L.muc_badge;
    m.intro_title = L.muc_intro_title; m.intro_text_1 = L.muc_intro1; m.intro_text_2 = L.muc_intro2;
    m.transparency_title = L.transp_title; m.transparency_text = L.transp_text; m.portfolio_title = L.portfolio;
    m.services.city.title = L.city_move; m.services.city.desc = L.city_desc;
    m.services.remote.title = L.remote_move; m.services.remote.desc = L.remote_desc;
    m.services.clearance.title = L.clearance; m.services.clearance.desc = L.clearance_desc;
    m.details_title = L.details_title; m.details_text = L.details_text;
    m.remote_title = L.long_title; m.remote_text = L.long_text;
    m.pricing_title = L.pricing_title; m.pricing_text = L.pricing_text;
    m.features.inspection = L.feat_insp; m.features.insurance = L.feat_ins; m.features.staff = L.feat_staff;
    m.links_title = L.links; m.cta_title = L.muc_cta; m.cta_text = L.muc_cta_text;

    // Core services
    const fields = [
        ['service_umzug', 'su'], ['service_buero_umzug', 'sb'], ['service_fernumzug', 'sf'],
        ['service_reinigung', 'sr'], ['service_entruempelung', 'se'], ['service_montage', 'sm'],
        ['service_halteverbotszone', 'sh']
    ];
    for (const [key, pre] of fields) {
        const s = p[key];
        s.meta_title = L[pre + '_mt']; s.meta_desc = L[pre + '_md']; s.badge = L[pre + '_badge'] || L.core_badge;
        s.hero_title = L[pre + '_ht']; s.hero_desc = L[pre + '_hd'];
        s.intro_title = L[pre + '_it']; s.intro_p1 = L[pre + '_ip1']; s.intro_p2 = L[pre + '_ip2'];
        s.for_whom_title = L.for_whom; s.for_whom_items = L[pre + '_fw'];
        s.process_title = L.process; s.process_steps = L[pre + '_steps'];
        s.guarantees_title = L.guarantees; s.guarantees = L[pre + '_guar'];
        s.cta_title = L[pre + '_ct']; s.cta_text = L[pre + '_ctxt'];
    }

    // Regensburg
    const rr = p.reinigung_regensburg; rr.meta_title = L.rr_mt; rr.meta_desc = L.rr_md; rr.badge = "Regensburg";
    rr.hero_title_prefix = L.rr_htp; rr.hero_title_highlight = "Regensburg"; rr.hero_desc = L.rr_hd;
    rr.intro_title = L.rr_it; rr.intro_p1 = L.rr_ip1; rr.intro_p2 = L.rr_ip2; rr.services_title = L.rr_st;
    rr.services.end_cleaning = { title: L.rr_ec, desc: L.rr_ecd }; rr.services.construction_cleaning = { title: L.rr_cc, desc: L.rr_ccd };
    rr.services.office_cleaning = { title: L.rr_oc, desc: L.rr_ocd }; rr.cta_title = L.rr_ct; rr.cta_text = L.rr_ctxt;

    const etr = p.entruempelung_regensburg; etr.meta_title = L.etr_mt; etr.meta_desc = L.etr_md; etr.badge = "Regensburg";
    etr.hero_title_prefix = L.etr_htp; etr.hero_title_highlight = "Regensburg"; etr.hero_desc = L.etr_hd;
    etr.intro_title = L.etr_it; etr.intro_p1 = L.etr_ip1; etr.intro_p2 = L.etr_ip2; etr.services_title = L.etr_st;
    etr.services.household = { title: L.etr_hh, desc: L.etr_hhd }; etr.services.commercial = { title: L.etr_com, desc: L.etr_comd };
    etr.services.partial = { title: L.etr_par, desc: L.etr_pard }; etr.cta_title = L.etr_ct; etr.cta_text = L.etr_ctxt;

    const bur = p.buero_umzug_regensburg; bur.meta_title = L.bur_mt; bur.meta_desc = L.bur_md; bur.badge = "Regensburg";
    bur.hero_title_prefix = L.bur_htp; bur.hero_title_highlight = "Regensburg"; bur.hero_desc = L.bur_hd;
    bur.intro_title = L.bur_it; bur.intro_p1 = L.bur_ip1; bur.intro_p2 = L.bur_ip2; bur.services_title = L.bur_st;
    bur.services.full_move = { title: L.bur_fm, desc: L.bur_fmd }; bur.services.it_relocation = { title: L.bur_itr, desc: L.bur_itrd };
    bur.services.weekend_move = { title: L.bur_wm, desc: L.bur_wmd }; bur.cta_title = L.bur_ct; bur.cta_text = L.bur_ctxt;

    // Signatures
    const sigKeys = ['sig_ritual_exit', 'sig_clean_start', 'sig_neighbour_kit', 'sig_first_48h', 'sig_bureaucracy', 'sig_furniture_opt', 'sig_cleaning_guarantee', 'sig_storage_rot', 'sig_kids_box', 'sig_service_24h', 'sig_ladies_team', 'sig_memory_capsule', 'sig_maybe_box', 'sig_key_handover'];
    for (const k of sigKeys) {
        const s = p[k], t = L.sigs[k];
        if (t) {
            s.badge = L.sig_badge; s.hero_title = t.ht; s.hero_desc = t.hd;
            if (t.mt) s.meta_title = t.mt; if (t.md) s.meta_desc = t.md; if (t.st) s.story_title = t.st;
            if (t.pt_label) s.purpose_title = t.pt_label; if (t.pt) s.purpose_text = t.pt;
            if (t.sp1) s.story_p1 = t.sp1; if (t.sp2) s.story_p2 = t.sp2;
            if (t.fw_label) s.for_whom_title = t.fw_label; if (t.fw) s.for_whom_text = t.fw;
            if (t.ct) s.cta_title = t.ct; if (t.ctxt) s.cta_text = t.ctxt;
        }
    }
    return p;
}

// Common sig builder for Romance/other languages
function buildSigs(badge, fwLabel, sigs) {
    const result = {};
    for (const [k, v] of Object.entries(sigs)) {
        result[k] = { ...v, fw_label: fwLabel };
    }
    return result;
}

// =========== ROMANIAN ===========
gen('ro', {
    title: "Zone de servicii", hub_note: "Sediul FLOXANT se află în Düsseldorf. Centrul nostru operațional este în Regensburg și Oberpfalz. De aici deservim clienți în toată Bavaria și oferim mutări la distanță lungă în toată Germania.",
    description: "Sediul FLOXANT se află în Düsseldorf. Centrul nostru operațional este în Regensburg și Oberpfalz.",
    cities: { regensburg: "Regensburg", bavaria: "Bavaria", munich: "München", nuremberg: "Nürnberg", augsburg: "Augsburg", germany: "Toată Germania" }
}, applyTranslations({
    move_in: "Mutarea dvs. în", munich: "München", muc_hero: "Fără stres către capitala Bavariei. FLOXANT oferă servicii premium de mutare cu garanție de preț fix.", muc_badge: "München și împrejurimi",
    muc_intro_title: "Mutare în München – cu plan și precizie", muc_intro1: "München este o metropolă dinamică. Mutarea în capitala Bavariei reprezintă adesea o provocare logistică. Scări înguste, lipsa locurilor de parcare – condițiile necesită experiență și planificare.", muc_intro2: "FLOXANT este serviciul de mutări care gestionează exact aceste provocări. Nu doar începem – planificăm detaliat mutarea dvs.",
    transp_title: "Transparență privind sediul", transp_text: "Sediul legal FLOXANT se află în Düsseldorf. Cu toate acestea, echipa noastră lucrează regulat la mutări în München.",
    portfolio: "Portofoliul nostru pentru München", city_move: "Mutări urbane München", city_desc: "Rapid și eficient în oraș.",
    remote_move: "Mutări la distanță din München", remote_desc: "De la Isar la Rin. Optimizat logistic.",
    clearance: "Golire", clearance_desc: "Eliminarea profesională a mobilierului vechi.",
    details_title: "Specific München", details_text: "Fiecare oraș are particularitățile sale.", long_title: "Din Bavaria în toată Germania", long_text: "Mulți clienți se mută din München în alte metropole.",
    pricing_title: "Prețuri transparente fără surprize", pricing_text: "München este deja destul de scump. La FLOXANT mizăm pe transparența absolută a costurilor.",
    feat_insp: "Inspecție gratuită: evaluare anticipată prin apel video.", feat_ins: "Asigurare inclusă: mobilierul dvs. este complet asigurat.", feat_staff: "Personal calificat: experimentat, prietenos și atent.",
    links: "Alte locații în regiune", muc_cta: "Oferta dvs. pentru München", muc_cta_text: "Începeți solicitarea acum.",
    su_mt: "Mutare privată", su_md: "FLOXANT vă însoțește mutarea privată cu precizie.", core_badge: "Serviciu de bază",
    su_ht: "Mutare privată", su_hd: "Mutarea este mai mult decât transport. Este o tranziție. FLOXANT însoțește acest proces cu discreție și fiabilitate.",
    su_it: "Mutarea dvs. – gândită până la ultimul detaliu", su_ip1: "O mutare privată atinge toate aspectele vieții. Obiecte personale, amintiri prețioase, mobilier delicat – totul necesită atenție individuală.", su_ip2: "Echipa noastră lucrează cu un proces clar care asigură transparență completă în fiecare etapă.",
    for_whom: "Pentru cine este acest serviciu?", su_fw: ["Persoane și familii care apreciază grija", "Mutări rezidențiale în oraș sau regiune", "Mutări care necesită protecție specială"],
    process: "Procesul nostru", su_steps: [{ title: "Evaluare", desc: "Inspecție gratuită – la fața locului sau video." }, { title: "Preț fix", desc: "Ofertă transparentă fără costuri ascunse." }, { title: "Execuție", desc: "Ambalare profesională, transport sigur, livrare la timp." }, { title: "Predare", desc: "Montaj, amplasare și curățenie." }],
    guarantees: "Garanțiile noastre", su_guar: ["Garanție preț fix fără suplimente", "Asigurare completă", "Personal calificat profesional"],
    su_ct: "Trimiteți o solicitare neobligatorie", su_ctxt: "Începeți mutarea cu o ofertă personalizată.",
    sb_mt: "Mutare birou", sb_md: "FLOXANT organizează mutarea biroului cu timp minim de nefuncționare.", sb_badge: "Comercial",
    sb_ht: "Mutare birou", sb_hd: "Continuitatea afacerii necesită planificare.", sb_it: "Mutări corporative cu precizie",
    sb_ip1: "Mutarea biroului intervine în procesele active. Infrastructura IT, documentele confidențiale – fiecare detaliu contează.", sb_ip2: "Coordonăm toate lucrările: de la deconectarea IT la transport și reinstalare.",
    sb_fw: ["Companii de orice dimensiune", "Cabinete juridice, cabinete medicale", "Companii care trebuie să minimizeze inactivitatea"],
    sb_steps: [{ title: "Planificare", desc: "Analiza detaliată a biroului." }, { title: "Coordonare", desc: "Colaborare cu echipa IT." }, { title: "Execuție", desc: "Mutare în intervale de timp definite." }, { title: "Punere în funcțiune", desc: "Configurarea stațiilor de lucru." }],
    sb_guar: ["Intervale de timp garantate", "Acoperire asigurare IT", "Procesare discretă"], sb_ct: "Planificați mutarea biroului", sb_ctxt: "Să structurăm mutarea corporativă împreună.",
    sf_mt: "Mutare la distanță lungă", sf_md: "FLOXANT organizează mutări la distanță lungă din Bavaria.", sf_badge: "Distanță lungă",
    sf_ht: "Mutare la distanță lungă", sf_hd: "Distanța nu este un obstacol.", sf_it: "Distanță lungă cu precizie",
    sf_ip1: "Mutarea la distanță lungă necesită planificare specială.", sf_ip2: "Din Regensburg la Hamburg, din München la Berlin.",
    sf_fw: ["Persoane care schimbă locul de muncă", "Familii care se mută în alt oraș", "Companii care transferă angajați"],
    sf_steps: [{ title: "Planificarea rutei", desc: "Rută optimală." }, { title: "Ambalare", desc: "Ambalare profesională cu materiale speciale." }, { title: "Transport", desc: "Monitorizare GPS cu șoferi experimentați." }, { title: "Livrare", desc: "Livrare la timp, montaj și amplasare." }],
    sf_guar: ["Preț fix pentru întreaga distanță", "Asigurare completă", "Garanție de livrare la timp"], sf_ct: "Solicitați mutare la distanță", sf_ctxt: "Unde doriți să mergeți?",
    sr_mt: "Curățenie profesională", sr_md: "FLOXANT oferă curățenie finală profesională.", sr_badge: "Curățenie",
    sr_ht: "Curățenie", sr_hd: "Curățenia nu este un detaliu – este baza încheierii și a unui nou început.", sr_it: "Curățenie finală sistematică",
    sr_ip1: "Curățenia finală este factorul decisiv pentru returnarea garanției.", sr_ip2: "Echipa noastră lucrează meticulos și rapid.",
    sr_fw: ["Chiriași înainte de predare", "Proprietari înainte de vânzare", "Spații comerciale"],
    sr_steps: [{ title: "Inspecție", desc: "Evaluarea stării." }, { title: "Execuție", desc: "Curățenie sistematică." }, { title: "Control calitate", desc: "Recepție cu documentare foto." }, { title: "Predare", desc: "Predare curată." }],
    sr_guar: ["Curățenie la standarde de proprietar", "Documentare foto inclusă", "Recurățenie la reclamații justificate"], sr_ct: "Comandați curățenie", sr_ctxt: "Comandați curățenie finală profesională.",
    se_mt: "Golire – curățare profesională", se_md: "FLOXANT golește profesional proprietăți.", se_badge: "Eliminare",
    se_ht: "Golire", se_hd: "A renunța necesită încredere. Golim profesional și ecologic.", se_it: "Golire cu responsabilitate",
    se_ip1: "Golirea este mai mult decât eliminarea obiectelor.", se_ip2: "Sortăm profesional și eliminăm ecologic.",
    se_fw: ["Lichidări de locuințe", "Goliri comerciale", "Persoane private"],
    se_steps: [{ title: "Tur", desc: "Inventar comun." }, { title: "Golire", desc: "Golire sistematică." }, { title: "Eliminare", desc: "Sortare și eliminare profesională." }, { title: "Stare finală", desc: "Predare curată." }],
    se_guar: ["Eliminare ecologică documentată", "Procesare discretă", "Predare curată garantată"], se_ct: "Solicitați golire", se_ctxt: "Contactați-ne.",
    sm_mt: "Montaj profesional", sm_md: "FLOXANT montează profesional mobilier și bucătării.", sm_badge: "Montaj",
    sm_ht: "Montaj", sm_hd: "Precizie în detaliu.", sm_it: "Montaj cu expertiză", sm_ip1: "Mobilierul de calitate merită montaj profesional.", sm_ip2: "De la rafturi IKEA la bucătării de designer.",
    sm_fw: ["După mutare sau achiziție", "Clienți comerciali", "Montaj bucătării"],
    sm_steps: [{ title: "Pregătire", desc: "Verificarea instrucțiunilor." }, { title: "Montaj", desc: "Instalare profesională." }, { title: "Test funcții", desc: "Testarea pieselor mobile." }, { title: "Control final", desc: "Curățarea zonei de lucru." }],
    sm_guar: ["Montaj profesional", "Grijă pentru suprafețe", "Zonă de lucru curată"], sm_ct: "Comandați montaj", sm_ctxt: "Montaj profesional fără compromis.",
    sh_mt: "Zonă de interdicție parcare", sh_md: "FLOXANT amenajează zone de interdicție parcare.", sh_badge: "Logistică",
    sh_ht: "Zonă de interdicție parcare", sh_hd: "Acces liber – baza fiecărei mutări reușite.", sh_it: "Zone de interdicție – la timp și legal",
    sh_ip1: "În multe zone urbane, o zonă oficială de interdicție este necesară.", sh_ip2: "FLOXANT se ocupă de întregul proces.",
    sh_fw: ["Mutări în centrul orașului", "Mutări comerciale", "Orice mutare care necesită acces garantat"],
    sh_steps: [{ title: "Cerere", desc: "Depunere la autoritate." }, { title: "Aprobare", desc: "Urmărire și confirmare." }, { title: "Instalare", desc: "Amplasarea indicatoarelor." }, { title: "Demontare", desc: "Îndepărtarea indicatoarelor." }],
    sh_guar: ["Procesare oficială completă", "Instalare la timp", "Serviciu complet"], sh_ct: "Depuneți cerere", sh_ctxt: "Asigurați acces liber.",
    rr_mt: "Curățenie Regensburg", rr_md: "FLOXANT oferă curățenie profesională în Regensburg.", rr_htp: "Curățenie profesională în", rr_hd: "Regensburg este centrul nostru operațional.", rr_it: "Curățenie finală în Regensburg", rr_ip1: "Ca bază operațională FLOXANT, Regensburg este centrul serviciilor noastre de curățenie.", rr_ip2: "Curățenia noastră finală urmează un proces documentat.", rr_st: "Serviciile noastre de curățenie în Regensburg", rr_ec: "Curățenie finală", rr_ecd: "Curățenie completă la standarde de proprietar.", rr_cc: "Curățenie post-construcție", rr_ccd: "Curățenie profesională după renovare.", rr_oc: "Curățenie birou", rr_ocd: "Curățenie regulată sau unică.", rr_ct: "Solicitați curățenie în Regensburg", rr_ctxt: "Programați curățenie profesională.",
    etr_mt: "Golire Regensburg", etr_md: "FLOXANT golește profesional în Regensburg.", etr_htp: "Golire în", etr_hd: "A renunța este un proces.", etr_it: "Golire în Regensburg", etr_ip1: "Regensburg este centrul nostru operațional.", etr_ip2: "Echipa noastră sortează profesional la fața locului.", etr_st: "Serviciile noastre de golire în Regensburg", etr_hh: "Lichidare locuință", etr_hhd: "Golire completă.", etr_com: "Golire comercială", etr_comd: "Golire profesională birouri.", etr_par: "Golire parțială", etr_pard: "Golire selectivă.", etr_ct: "Solicitați golire în Regensburg", etr_ctxt: "Contactați-ne.",
    bur_mt: "Mutare birou Regensburg", bur_md: "FLOXANT organizează mutări de birou în Regensburg.", bur_htp: "Mutare birou în", bur_hd: "Continuitatea afacerii este prioritatea.", bur_it: "Mutări de birou în Regensburg", bur_ip1: "Regensburg crește constant ca locație de afaceri.", bur_ip2: "Coordonăm mutarea biroului dvs.", bur_st: "Serviciile noastre de mutare birou", bur_fm: "Mutare completă", bur_fmd: "Mutare completă birou și IT.", bur_itr: "Relocare IT", bur_itrd: "Deconectare și reconectare profesională.", bur_wm: "Mutare weekend", bur_wmd: "Execuție în afara programului.", bur_ct: "Planificați mutarea biroului", bur_ctxt: "Să planificăm împreună.",
    sig_badge: "Experiență Signature",
    sigs: {
        sig_ritual_exit: { ht: "Cutia Ritualului de Adio", hd: "A pleca de acasă înseamnă a încheia un capitol.", st: "De ce adio merită un ritual", pt_label: "Valoare psihologică", ct: "Adăugați cutia ritualului" },
        sig_clean_start: { ht: "Ceremonia Startului Curat", hd: "Înainte de a aranja mobilierul, pregătim spațiul.", st: "Noul început începe cu claritate", pt_label: "Valoare psihologică", ct: "Rezervați start curat" },
        sig_neighbour_kit: { ht: "Setul Noului Vecin", hd: "Prima impresie contează.", st: "Sosirea începe cu conexiunea", pt_label: "Valoare socială", ct: "Comandați setul de vecin" },
        sig_first_48h: { ht: "Pachetul Primelor 48 de Ore", hd: "Primele ore sunt decisive.", st: "Primele 48 de ore critice", pt_label: "Valoare practică", ct: "Rezervați pachetul 48h" },
        sig_bureaucracy: { ht: "Scutul Birocrației", hd: "Formalitățile fac parte din fiecare mutare.", st: "Birocrația nu ar trebui să fie grija dvs.", pt_label: "Valoare organizațională", ct: "Solicitați scutul birocrației" },
        sig_furniture_opt: { ht: "Optimizarea Mobilierului", hd: "A aranja, nu doar a pune.", st: "Spațiul dvs., reimaginat", pt_label: "Valoare de design", ct: "Solicitați optimizare" },
        sig_cleaning_guarantee: { ht: "Garanția de Curățenie", hd: "Predare curată – garantat.", st: "Încredere la predare", pt_label: "Valoare financiară", ct: "Adăugați garanția" },
        sig_storage_rot: { ht: "Rotația Depozitului", hd: "Nu totul trebuie mutat odată.", st: "Depozitarea temporară ca instrument strategic", pt_label: "Valoare logistică", ct: "Solicitați rotația" },
        sig_kids_box: { ht: "Cutia de Mutare pentru Copii", hd: "Copiii experimentează mutarea altfel.", st: "Mutarea prin ochii copilului", pt_label: "Valoare educațională", ct: "Comandați cutia pentru copii" },
        sig_service_24h: { ht: "Serviciu de Mutare 24h", hd: "Uneori mutarea nu poate aștepta.", st: "Disponibilitatea ca promisiune", pt_label: "Valoare temporală", ct: "Solicitați serviciul 24h" },
        sig_ladies_team: { ht: "Echipa Feminină", hd: "Unele situații necesită sensibilitate specială.", st: "Respectul începe cu înțelegerea", pt_label: "Valoare personală", ct: "Solicitați echipa feminină" },
        sig_memory_capsule: { ht: "Capsula Memoriei", hd: "Unele locuri merită amintite.", st: "Un loc înghețat în timp", pt_label: "Valoare emoțională", ct: "Adăugați capsula memoriei" },
        sig_maybe_box: { ht: "Cutia Poate", hd: "Nu fiecare decizie trebuie luată imediat.", st: "Reducerea presiunii decizionale", pt_label: "Valoare decizională", ct: "Solicitați cutia Poate" },
        sig_key_handover: { ht: "Predarea Cheilor", hd: "Documentat. Sigur. Trasabil.", st: "Ultimul pas, documentat corect", pt_label: "Valoare juridică", ct: "Rezervați predarea cheilor" }
    }
}));

// =========== BULGARIAN ===========
gen('bg', {
    title: "Зони на обслужване", hub_note: "Седалището на FLOXANT е в Дюселдорф. Операционният ни център е в Регенсбург и Горен Пфалц.",
    description: "Седалището на FLOXANT е в Дюселдорф. Операционният ни център е в Регенсбург.",
    cities: { regensburg: "Регенсбург", bavaria: "Бавария", munich: "Мюнхен", nuremberg: "Нюрнберг", augsburg: "Аугсбург", germany: "Цяла Германия" }
}, applyTranslations({
    move_in: "Вашето преместване в", munich: "Мюнхен", muc_hero: "Без стрес до столицата на Бавария. FLOXANT предлага премиум услуги с гарантирана фиксирана цена.", muc_badge: "Мюнхен и околности",
    muc_intro_title: "Преместване в Мюнхен – с план и прецизност", muc_intro1: "Мюнхен е динамичен мегаполис. Преместването в баварската столица често е логистично предизвикателство. Тесни стълбища, липса на паркоместа – условията изискват опит и добро планиране.", muc_intro2: "FLOXANT е услугата за преместване, която овладява тези предизвикателства. Не просто започваме – детайлно планираме вашето преместване.",
    transp_title: "Прозрачност относно седалището", transp_text: "Юридическото седалище на FLOXANT е в Дюселдорф. Екипът ни работи редовно в Мюнхен.",
    portfolio: "Нашето портфолио за Мюнхен", city_move: "Градски премествания Мюнхен", city_desc: "Бързо и ефективно в рамките на града.",
    remote_move: "Далечни премествания от Мюнхен", remote_desc: "От Изар до Рейн.", clearance: "Изчистване", clearance_desc: "Професионално изхвърляне на стари мебели.",
    details_title: "Специфика на Мюнхен", details_text: "Всеки град има своите особености.", long_title: "От Бавария до цяла Германия", long_text: "Много клиенти се преместват от Мюнхен.",
    pricing_title: "Прозрачни цени без изненади", pricing_text: "Мюнхен е достатъчно скъп. Ние залагаме на абсолютна прозрачност.",
    feat_insp: "Безплатен оглед: предварителна оценка по видеоразговор.", feat_ins: "Застраховка включена: пълна защита на мебелите.", feat_staff: "Квалифициран персонал: опитен и внимателен.",
    links: "Други локации в региона", muc_cta: "Вашата оферта за Мюнхен", muc_cta_text: "Започнете запитването сега.",
    su_mt: "Частно преместване", su_md: "FLOXANT съпровожда частното ви преместване.", core_badge: "Основна услуга", su_ht: "Частно преместване", su_hd: "Преместването е повече от транспорт. Това е преход.",
    su_it: "Вашето преместване – обмислено до детайл", su_ip1: "Частното преместване засяга всички аспекти на живота. Лични вещи, ценни спомени – всичко изисква индивидуално внимание.", su_ip2: "Екипът ни работи с ясен процес, осигуряващ пълна прозрачност.",
    for_whom: "За кого е тази услуга?", su_fw: ["Частни лица и семейства", "Жилищни премествания", "Премествания с ценности"],
    process: "Нашият процес", su_steps: [{ title: "Оценка", desc: "Безплатен оглед." }, { title: "Фиксирана цена", desc: "Прозрачна оферта." }, { title: "Изпълнение", desc: "Професионално опаковане и транспорт." }, { title: "Предаване", desc: "Монтаж и почистване." }],
    guarantees: "Нашите гаранции", su_guar: ["Гарантирана фиксирана цена", "Пълна застраховка", "Квалифициран персонал"],
    su_ct: "Подайте запитване", su_ctxt: "Започнете с персонална оферта.",
    sb_mt: "Офис преместване", sb_md: "FLOXANT организира офис преместването ви.", sb_badge: "Комерсиално", sb_ht: "Офис преместване", sb_hd: "Бизнес непрекъснатостта изисква планиране.",
    sb_it: "Корпоративни премествания с прецизност", sb_ip1: "Офис преместването засяга активни бизнес процеси.", sb_ip2: "Координираме всички дейности.",
    sb_fw: ["Фирми от всякакъв размер", "Адвокатски кантори", "Компании с минимален престой"],
    sb_steps: [{ title: "Планиране", desc: "Детайлен анализ." }, { title: "Координация", desc: "Връзка с ИТ екипа." }, { title: "Изпълнение", desc: "Преместване в определени часове." }, { title: "Пускане", desc: "Настройка на работните места." }],
    sb_guar: ["Гарантирани часови прозорци", "ИТ застраховка", "Дискретна обработка"], sb_ct: "Планирайте офис преместване", sb_ctxt: "Да структурираме заедно.",
    sf_mt: "Далечно преместване", sf_md: "FLOXANT организира далечни премествания от Бавария.", sf_badge: "Далечно", sf_ht: "Далечно преместване", sf_hd: "Разстоянието не е пречка.",
    sf_it: "Далечни разстояния с прецизност", sf_ip1: "Далечното преместване изисква специално планиране.", sf_ip2: "От Регенсбург до Хамбург, от Мюнхен до Берлин.",
    sf_fw: ["Смяна на работа", "Семейства", "Компании"], sf_steps: [{ title: "Маршрут", desc: "Оптимален маршрут." }, { title: "Опаковане", desc: "Професионално опаковане." }, { title: "Транспорт", desc: "GPS мониторинг." }, { title: "Доставка", desc: "Навременна доставка." }],
    sf_guar: ["Фиксирана цена", "Пълна застраховка", "Гарантирана доставка"], sf_ct: "Заявете далечно преместване", sf_ctxt: "Къде искате да отидете?",
    sr_mt: "Професионално почистване", sr_md: "FLOXANT предлага професионално финално почистване.", sr_badge: "Почистване", sr_ht: "Почистване", sr_hd: "Чистотата не е детайл – тя е основата.",
    sr_it: "Финално почистване със систем", sr_ip1: "Финалното почистване е решаващ фактор за връщането на депозита.", sr_ip2: "Екипът ни работи прецизно и бързо.",
    sr_fw: ["Наематели", "Собственици", "Търговски обекти"], sr_steps: [{ title: "Инспекция", desc: "Оценка." }, { title: "Изпълнение", desc: "Систематично почистване." }, { title: "Качествен контрол", desc: "Приемане с фотодокументация." }, { title: "Предаване", desc: "Чисто предаване." }],
    sr_guar: ["Стандарти на наемодателя", "Фотодокументация", "Повторно почистване при жалби"], sr_ct: "Поръчайте почистване", sr_ctxt: "Поръчайте професионално почистване.",
    se_mt: "Изчистване", se_md: "FLOXANT професионално изчиства имоти.", se_badge: "Изхвърляне", se_ht: "Изчистване", se_hd: "Да пуснеш изисква доверие.",
    se_it: "Изчистване с отговорност", se_ip1: "Изчистването е повече от премахване.", se_ip2: "Сортираме професионално и екологично.",
    se_fw: ["Ликвидации", "Търговско изчистване", "Частни лица"], se_steps: [{ title: "Обиколка", desc: "Съвместна инвентаризация." }, { title: "Изчистване", desc: "Систематично." }, { title: "Изхвърляне", desc: "Професионално сортиране." }, { title: "Финално", desc: "Чисто предаване." }],
    se_guar: ["Екологично изхвърляне", "Дискретна обработка", "Чисто предаване"], se_ct: "Заявете изчистване", se_ctxt: "Свържете се с нас.",
    sm_mt: "Монтаж", sm_md: "FLOXANT монтира професионално мебели и кухни.", sm_badge: "Монтаж", sm_ht: "Монтаж", sm_hd: "Прецизност в детайла.",
    sm_it: "Монтаж с експертиза", sm_ip1: "Качествените мебели заслужават професионален монтаж.", sm_ip2: "От рафтове IKEA до дизайнерски кухни.",
    sm_fw: ["След преместване", "Търговски клиенти", "Кухненски монтаж"], sm_steps: [{ title: "Подготовка", desc: "Проверка на инструкции." }, { title: "Монтаж", desc: "Професионална инсталация." }, { title: "Тест", desc: "Тест на движещи се части." }, { title: "Контрол", desc: "Почистване на работното място." }],
    sm_guar: ["Професионален монтаж", "Грижа за повърхности", "Чисто работно място"], sm_ct: "Поръчайте монтаж", sm_ctxt: "Професионален монтаж.",
    sh_mt: "Зона за забрана на паркиране", sh_md: "FLOXANT организира зони за забрана.", sh_badge: "Логистика", sh_ht: "Зона за забрана на паркиране", sh_hd: "Свободен достъп е основата.",
    sh_it: "Зони за забрана – навреме и законно", sh_ip1: "В много градски зони е необходима зона за забрана.", sh_ip2: "FLOXANT поема целия процес.",
    sh_fw: ["Премествания в центъра", "Търговски премествания", "Всяко преместване"], sh_steps: [{ title: "Заявка", desc: "Подаване до властите." }, { title: "Одобрение", desc: "Потвърждение." }, { title: "Инсталиране", desc: "Поставяне на знаци." }, { title: "Демонтаж", desc: "Премахване на знаци." }],
    sh_guar: ["Пълно оформление", "Навременна инсталация", "Пълно обслужване"], sh_ct: "Подайте заявка", sh_ctxt: "Осигурете свободен достъп.",
    rr_mt: "Почистване Регенсбург", rr_md: "FLOXANT предлага почистване в Регенсбург.", rr_htp: "Професионално почистване в", rr_hd: "Регенсбург е нашият център.", rr_it: "Финално почистване в Регенсбург", rr_ip1: "Като оперативна база на FLOXANT.", rr_ip2: "Нашето почистване следва документиран процес.", rr_st: "Нашите почистващи услуги", rr_ec: "Финално почистване", rr_ecd: "Пълно почистване.", rr_cc: "Почистване след строеж", rr_ccd: "Професионално почистване след ремонт.", rr_oc: "Офис почистване", rr_ocd: "Редовно или еднократно.", rr_ct: "Заявете почистване в Регенсбург", rr_ctxt: "Запишете се.",
    etr_mt: "Изчистване Регенсбург", etr_md: "FLOXANT изчиства в Регенсбург.", etr_htp: "Изчистване в", etr_hd: "Да пуснеш е процес.", etr_it: "Изчистване в Регенсбург", etr_ip1: "Нашият оперативен център.", etr_ip2: "Екипът сортира на място.", etr_st: "Услуги по изчистване", etr_hh: "Ликвидация", etr_hhd: "Пълно изчистване.", etr_com: "Търговско", etr_comd: "Офиси и складове.", etr_par: "Частично", etr_pard: "Избрани помещения.", etr_ct: "Заявете изчистване", etr_ctxt: "Свържете се.",
    bur_mt: "Офис преместване Регенсбург", bur_md: "FLOXANT организира офис премествания.", bur_htp: "Офис преместване в", bur_hd: "Бизнес непрекъснатост е приоритет.", bur_it: "Офис премествания в Регенсбург", bur_ip1: "Регенсбург расте като бизнес локация.", bur_ip2: "Координираме преместването.", bur_st: "Нашите офис услуги", bur_fm: "Пълно преместване", bur_fmd: "Пълно офис и ИТ преместване.", bur_itr: "ИТ релокация", bur_itrd: "Професионално разкачване.", bur_wm: "Уикенд преместване", bur_wmd: "Извън работно време.", bur_ct: "Планирайте офис преместване", bur_ctxt: "Да планираме заедно.",
    sig_badge: "Signature Преживяване",
    sigs: {
        sig_ritual_exit: { ht: "Ритуална кутия за сбогуване", hd: "Да напуснеш дом е да затвориш глава.", st: "Защо сбогуването заслужава ритуал", pt_label: "Психологическа стойност", ct: "Добавете ритуална кутия" },
        sig_clean_start: { ht: "Церемония за чист старт", hd: "Преди мебелите, подготвяме пространството.", st: "Новото начало с чистота", pt_label: "Психологическа стойност", ct: "Резервирайте чист старт" },
        sig_neighbour_kit: { ht: "Комплект нов съсед", hd: "Първото впечатление е важно.", pt_label: "Социална стойност", ct: "Поръчайте комплект" },
        sig_first_48h: { ht: "Пакет първите 48 часа", hd: "Първите часове са решаващи.", pt_label: "Практическа стойност", ct: "Резервирайте пакет 48ч" },
        sig_bureaucracy: { ht: "Бюрократичен щит", hd: "Формалностите са част от преместването.", pt_label: "Организационна стойност", ct: "Заявете бюрократичен щит" },
        sig_furniture_opt: { ht: "Оптимизация на мебели", hd: "Подредете, не просто слагайте.", pt_label: "Дизайнерска стойност", ct: "Заявете оптимизация" },
        sig_cleaning_guarantee: { ht: "Гаранция за чистота", hd: "Чисто предаване – гарантирано.", pt_label: "Финансова стойност", ct: "Добавете гаранция" },
        sig_storage_rot: { ht: "Ротация на склад", hd: "Не всичко трябва да се мести наведнъж.", pt_label: "Логистична стойност", ct: "Заявете ротация" },
        sig_kids_box: { ht: "Детска кутия за преместване", hd: "Децата изживяват преместването различно.", pt_label: "Образователна стойност", ct: "Поръчайте детска кутия" },
        sig_service_24h: { ht: "24-часово преместване", hd: "Понякога не може да се чака.", pt_label: "Времева стойност", ct: "Заявете 24ч услуга" },
        sig_ladies_team: { ht: "Дамски екип", hd: "Някои ситуации изискват специална чувствителност.", pt_label: "Лична стойност", ct: "Заявете дамски екип" },
        sig_memory_capsule: { ht: "Капсула на паметта", hd: "Някои места заслужават да бъдат запомнени.", pt_label: "Емоционална стойност", ct: "Добавете капсула" },
        sig_maybe_box: { ht: "Кутия «Може би»", hd: "Не всяко решение трябва да е незабавно.", pt_label: "Стойност на решението", ct: "Заявете кутия «Може би»" },
        sig_key_handover: { ht: "Предаване на ключове", hd: "Документирано. Сигурно. Проследимо.", pt_label: "Юридическа стойност", ct: "Резервирайте предаване" }
    }
}));

console.log('Romanian and Bulgarian done.');
