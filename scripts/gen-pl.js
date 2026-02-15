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

// Translate core service pages for a locale using a translation map
function translatePages(L) {
    const p = clone(enDict.pages);
    const m = p.umzug_muenchen;
    m.hero_title_prefix = L.move_in; m.hero_title_highlight = L.munich;
    m.hero_desc = L.muc_hero; m.badge = L.muc_badge; m.intro_title = L.muc_intro_title;
    m.intro_text_1 = L.muc_intro1; m.intro_text_2 = L.muc_intro2;
    m.transparency_title = L.transp_title; m.transparency_text = L.transp_text;
    m.portfolio_title = L.portfolio; m.services.city.title = L.city_move; m.services.city.desc = L.city_desc;
    m.services.remote.title = L.remote_move; m.services.remote.desc = L.remote_desc;
    m.services.clearance.title = L.clearance; m.services.clearance.desc = L.clearance_desc;
    m.details_title = L.details_title; m.details_text = L.details_text;
    m.remote_title = L.long_title; m.remote_text = L.long_text;
    m.pricing_title = L.pricing_title; m.pricing_text = L.pricing_text;
    m.features.inspection = L.feat_insp; m.features.insurance = L.feat_ins; m.features.staff = L.feat_staff;
    m.links_title = L.links; m.cta_title = L.muc_cta; m.cta_text = L.muc_cta_text;

    // service_umzug
    const su = p.service_umzug;
    su.meta_title = L.su_mt; su.meta_desc = L.su_md; su.badge = L.core_badge; su.hero_title = L.su_ht; su.hero_desc = L.su_hd;
    su.intro_title = L.su_it; su.intro_p1 = L.su_ip1; su.intro_p2 = L.su_ip2;
    su.for_whom_title = L.for_whom; su.for_whom_items = L.su_fw;
    su.process_title = L.process; su.process_steps = L.su_steps;
    su.guarantees_title = L.guarantees; su.guarantees = L.su_guar;
    su.cta_title = L.su_ct; su.cta_text = L.su_ctxt;

    // service_buero_umzug
    const sb = p.service_buero_umzug;
    sb.meta_title = L.sb_mt; sb.meta_desc = L.sb_md; sb.badge = L.com_badge; sb.hero_title = L.sb_ht; sb.hero_desc = L.sb_hd;
    sb.intro_title = L.sb_it; sb.intro_p1 = L.sb_ip1; sb.intro_p2 = L.sb_ip2;
    sb.for_whom_title = L.for_whom; sb.for_whom_items = L.sb_fw;
    sb.process_title = L.process; sb.process_steps = L.sb_steps;
    sb.guarantees_title = L.guarantees; sb.guarantees = L.sb_guar;
    sb.cta_title = L.sb_ct; sb.cta_text = L.sb_ctxt;

    // service_fernumzug
    const sf = p.service_fernumzug;
    sf.meta_title = L.sf_mt; sf.meta_desc = L.sf_md; sf.badge = L.long_badge; sf.hero_title = L.sf_ht; sf.hero_desc = L.sf_hd;
    sf.intro_title = L.sf_it; sf.intro_p1 = L.sf_ip1; sf.intro_p2 = L.sf_ip2;
    sf.for_whom_title = L.for_whom; sf.for_whom_items = L.sf_fw;
    sf.process_title = L.process; sf.process_steps = L.sf_steps;
    sf.guarantees_title = L.guarantees; sf.guarantees = L.sf_guar;
    sf.cta_title = L.sf_ct; sf.cta_text = L.sf_ctxt;

    // service_reinigung
    const sr = p.service_reinigung;
    sr.meta_title = L.sr_mt; sr.meta_desc = L.sr_md; sr.badge = L.clean_badge; sr.hero_title = L.sr_ht; sr.hero_desc = L.sr_hd;
    sr.intro_title = L.sr_it; sr.intro_p1 = L.sr_ip1; sr.intro_p2 = L.sr_ip2;
    sr.for_whom_title = L.for_whom; sr.for_whom_items = L.sr_fw;
    sr.process_title = L.process; sr.process_steps = L.sr_steps;
    sr.guarantees_title = L.guarantees; sr.guarantees = L.sr_guar;
    sr.cta_title = L.sr_ct; sr.cta_text = L.sr_ctxt;

    // service_entruempelung
    const se = p.service_entruempelung;
    se.meta_title = L.se_mt; se.meta_desc = L.se_md; se.badge = L.disp_badge; se.hero_title = L.se_ht; se.hero_desc = L.se_hd;
    se.intro_title = L.se_it; se.intro_p1 = L.se_ip1; se.intro_p2 = L.se_ip2;
    se.for_whom_title = L.for_whom; se.for_whom_items = L.se_fw;
    se.process_title = L.process; se.process_steps = L.se_steps;
    se.guarantees_title = L.guarantees; se.guarantees = L.se_guar;
    se.cta_title = L.se_ct; se.cta_text = L.se_ctxt;

    // service_montage
    const sm = p.service_montage;
    sm.meta_title = L.sm_mt; sm.meta_desc = L.sm_md; sm.badge = L.mont_badge; sm.hero_title = L.sm_ht; sm.hero_desc = L.sm_hd;
    sm.intro_title = L.sm_it; sm.intro_p1 = L.sm_ip1; sm.intro_p2 = L.sm_ip2;
    sm.for_whom_title = L.for_whom; sm.for_whom_items = L.sm_fw;
    sm.process_title = L.process; sm.process_steps = L.sm_steps;
    sm.guarantees_title = L.guarantees; sm.guarantees = L.sm_guar;
    sm.cta_title = L.sm_ct; sm.cta_text = L.sm_ctxt;

    // service_halteverbotszone
    const sh = p.service_halteverbotszone;
    sh.meta_title = L.sh_mt; sh.meta_desc = L.sh_md; sh.badge = L.log_badge; sh.hero_title = L.sh_ht; sh.hero_desc = L.sh_hd;
    sh.intro_title = L.sh_it; sh.intro_p1 = L.sh_ip1; sh.intro_p2 = L.sh_ip2;
    sh.for_whom_title = L.for_whom; sh.for_whom_items = L.sh_fw;
    sh.process_title = L.process; sh.process_steps = L.sh_steps;
    sh.guarantees_title = L.guarantees; sh.guarantees = L.sh_guar;
    sh.cta_title = L.sh_ct; sh.cta_text = L.sh_ctxt;

    // Regensburg pages
    const rr = p.reinigung_regensburg;
    rr.meta_title = L.rr_mt; rr.meta_desc = L.rr_md; rr.badge = "Regensburg";
    rr.hero_title_prefix = L.rr_htp; rr.hero_title_highlight = "Regensburg";
    rr.hero_desc = L.rr_hd; rr.intro_title = L.rr_it; rr.intro_p1 = L.rr_ip1; rr.intro_p2 = L.rr_ip2;
    rr.services_title = L.rr_st;
    rr.services.end_cleaning.title = L.rr_ec; rr.services.end_cleaning.desc = L.rr_ecd;
    rr.services.construction_cleaning.title = L.rr_cc; rr.services.construction_cleaning.desc = L.rr_ccd;
    rr.services.office_cleaning.title = L.rr_oc; rr.services.office_cleaning.desc = L.rr_ocd;
    rr.cta_title = L.rr_ct; rr.cta_text = L.rr_ctxt;

    const etr = p.entruempelung_regensburg;
    etr.meta_title = L.etr_mt; etr.meta_desc = L.etr_md; etr.badge = "Regensburg";
    etr.hero_title_prefix = L.etr_htp; etr.hero_title_highlight = "Regensburg";
    etr.hero_desc = L.etr_hd; etr.intro_title = L.etr_it; etr.intro_p1 = L.etr_ip1; etr.intro_p2 = L.etr_ip2;
    etr.services_title = L.etr_st;
    etr.services.household.title = L.etr_hh; etr.services.household.desc = L.etr_hhd;
    etr.services.commercial.title = L.etr_com; etr.services.commercial.desc = L.etr_comd;
    etr.services.partial.title = L.etr_par; etr.services.partial.desc = L.etr_pard;
    etr.cta_title = L.etr_ct; etr.cta_text = L.etr_ctxt;

    const bur = p.buero_umzug_regensburg;
    bur.meta_title = L.bur_mt; bur.meta_desc = L.bur_md; bur.badge = "Regensburg";
    bur.hero_title_prefix = L.bur_htp; bur.hero_title_highlight = "Regensburg";
    bur.hero_desc = L.bur_hd; bur.intro_title = L.bur_it; bur.intro_p1 = L.bur_ip1; bur.intro_p2 = L.bur_ip2;
    bur.services_title = L.bur_st;
    bur.services.full_move.title = L.bur_fm; bur.services.full_move.desc = L.bur_fmd;
    bur.services.it_relocation.title = L.bur_itr; bur.services.it_relocation.desc = L.bur_itrd;
    bur.services.weekend_move.title = L.bur_wm; bur.services.weekend_move.desc = L.bur_wmd;
    bur.cta_title = L.bur_ct; bur.cta_text = L.bur_ctxt;

    // Signature services
    const sigBadge = L.sig_badge;
    const sigKeys = ['sig_ritual_exit', 'sig_clean_start', 'sig_neighbour_kit', 'sig_first_48h', 'sig_bureaucracy', 'sig_furniture_opt', 'sig_cleaning_guarantee', 'sig_storage_rot', 'sig_kids_box', 'sig_service_24h', 'sig_ladies_team', 'sig_memory_capsule', 'sig_maybe_box', 'sig_key_handover'];
    for (const k of sigKeys) {
        const s = p[k];
        const t = L.sigs[k];
        if (t) {
            s.badge = sigBadge;
            s.hero_title = t.ht; s.hero_desc = t.hd;
            if (t.mt) s.meta_title = t.mt;
            if (t.md) s.meta_desc = t.md;
            if (t.st) s.story_title = t.st;
            if (t.pt_label) s.purpose_title = t.pt_label;
            if (t.pt) s.purpose_text = t.pt;
            if (t.sp1) s.story_p1 = t.sp1;
            if (t.sp2) s.story_p2 = t.sp2;
            if (t.fw_label) s.for_whom_title = t.fw_label;
            if (t.fw) s.for_whom_text = t.fw;
            if (t.ct) s.cta_title = t.ct;
            if (t.ctxt) s.cta_text = t.ctxt;
        }
    }

    return p;
}

// ===== POLISH =====
const plT = {
    move_in: "Twoja przeprowadzka w", munich: "Monachium",
    muc_hero: "Bezstresowa przeprowadzka do stolicy Bawarii lub z Monachium na świat. FLOXANT oferuje usługi premium z gwarancją stałej ceny.",
    muc_badge: "Monachium i okolice", muc_intro_title: "Przeprowadzka w Monachium – z planem i precyzją",
    muc_intro1: "Monachium to dynamiczna metropolia przyciągająca ludzi z całego świata. Jednak przeprowadzka w stolicy Bawarii często stanowi wyzwanie logistyczne. Wąskie klatki schodowe, brak miejsc parkingowych – warunki wymagają doświadczenia i dobrego planowania.",
    muc_intro2: "FLOXANT to serwis przeprowadzkowy, który mistrzowsko radzi sobie z tymi wyzwaniami. Nie zaczynamy po prostu pracy – szczegółowo planujemy Twoją przeprowadzkę.",
    transp_title: "Przejrzystość dotycząca siedziby", transp_text: "Siedziba FLOXANT mieści się w Düsseldorfie. Nasz zespół regularnie realizuje przeprowadzki w Monachium i okolicach.",
    portfolio: "Nasz portfel usług dla Monachium",
    city_move: "Przeprowadzki miejskie Monachium", city_desc: "Szybko i sprawnie w obrębie miasta.",
    remote_move: "Przeprowadzki dalekodystansowe z Monachium", remote_desc: "Od Isar do Renu. Zoptymalizowane logistycznie.",
    clearance: "Opróżnianie", clearance_desc: "Profesjonalna utylizacja starych mebli.",
    details_title: "Specyfika Monachium", details_text: "Każde miasto ma swoją specyfikę. Parkowanie jest ograniczone w wielu dzielnicach.",
    long_title: "Z Bawarii do całych Niemiec", long_text: "Wielu naszych klientów przenosi się z Monachium do innych metropolii.",
    pricing_title: "Przejrzyste ceny bez niespodzianek", pricing_text: "Monachium jest wystarczająco drogie. W FLOXANT stawiamy na pełną przejrzystość kosztów.",
    feat_insp: "Bezpłatna inspekcja: wcześniejszy przegląd przez wideorozmowę.", feat_ins: "Ubezpieczenie w cenie: pełna ochrona mebli.", feat_staff: "Wykwalifikowany personel: doświadczony i staranny.",
    links: "Inne lokalizacje w regionie", muc_cta: "Twoja oferta dla Monachium", muc_cta_text: "Rozpocznij zapytanie teraz.",
    // service_umzug
    su_mt: "Przeprowadzka prywatna", su_md: "FLOXANT towarzyszy Twojej prywatnej przeprowadzce z precyzją i dyskrecją.",
    core_badge: "Usługa podstawowa", su_ht: "Przeprowadzka prywatna", su_hd: "Przeprowadzka to więcej niż transport. To transformacja. FLOXANT towarzyszy temu procesowi z dyskrecją i niezawodnością.",
    su_it: "Twoja przeprowadzka – przemyślana co do detalu",
    su_ip1: "Prywatna przeprowadzka dotyka wszystkich aspektów życia. Osobiste rzeczy, cenne wspomnienia, delikatne meble – wszystko wymaga indywidualnej uwagi.",
    su_ip2: "Nasz zespół pracuje według jasnego procesu zapewniającego pełną przejrzystość na każdym etapie.",
    for_whom: "Dla kogo ta usługa?", su_fw: ["Osoby i rodziny ceniące staranne podejście", "Przeprowadzki mieszkaniowe w obrębie miasta lub regionu", "Przeprowadzki wymagające specjalnej ochrony wartościowych przedmiotów"],
    process: "Nasz proces", su_steps: [{ title: "Ocena", desc: "Bezpłatna inspekcja – na miejscu lub przez wideorozmowę." }, { title: "Stała cena", desc: "Przejrzysta oferta bez ukrytych kosztów." }, { title: "Realizacja", desc: "Profesjonalne pakowanie, bezpieczny transport, terminowa dostawa." }, { title: "Przekazanie", desc: "Montaż, ustawienie i sprzątanie starego lokalu." }],
    guarantees: "Nasze gwarancje", su_guar: ["Gwarancja stałej ceny bez dopłat", "Pełne ubezpieczenie całego mienia", "Wykwalifikowany, profesjonalnie przeszkolony personel"],
    su_ct: "Złóż niezobowiązujące zapytanie", su_ctxt: "Rozpocznij przeprowadzkę od indywidualnej oferty.",
    // service_buero_umzug
    sb_mt: "Przeprowadzka biurowa", sb_md: "FLOXANT organizuje przeprowadzkę biura z minimalnym przestojem.",
    com_badge: "Komercyjne", sb_ht: "Przeprowadzka biurowa", sb_hd: "Ciągłość biznesu wymaga planowania.",
    sb_it: "Przeprowadzki firmowe z precyzją",
    sb_ip1: "Przeprowadzka biura ingeruje w aktywne procesy biznesowe. Infrastruktura IT, poufne dokumenty – każdy szczegół musi być poprawny.",
    sb_ip2: "Koordynujemy wszystkie prace: od odłączenia IT po fizyczny transport i ponowną instalację.",
    sb_fw: ["Firmy każdej wielkości", "Kancelarie prawne, gabinety", "Firmy minimalizujące przestój"],
    sb_steps: [{ title: "Planowanie projektu", desc: "Szczegółowa analiza biura." }, { title: "Koordynacja", desc: "Współpraca z działem IT." }, { title: "Realizacja", desc: "Przeprowadzka w określonych oknach czasowych." }, { title: "Uruchomienie", desc: "Konfiguracja stanowisk pracy." }],
    sb_guar: ["Określone okna czasowe z gwarancją", "Ubezpieczenie sprzętu IT", "Dyskretna obsługa"],
    sb_ct: "Zaplanuj przeprowadzkę biura", sb_ctxt: "Zorganizujmy wspólnie Twoją przeprowadzkę firmową.",
    // service_fernumzug
    sf_mt: "Przeprowadzka dalekodystansowa", sf_md: "FLOXANT organizuje przeprowadzki dalekodystansowe z Bawarii.",
    long_badge: "Daleki dystans", sf_ht: "Przeprowadzka dalekodystansowa", sf_hd: "Odległość nie jest przeszkodą.",
    sf_it: "Daleki dystans z precyzją", sf_ip1: "Przeprowadzka dalekodystansowa wymaga szczególnego planowania.", sf_ip2: "Z Regensburga do Hamburga, z Monachium do Berlina.",
    sf_fw: ["Osoby zmieniające pracę", "Rodziny przenoszące się do innego miasta", "Firmy transferujące pracowników"],
    sf_steps: [{ title: "Planowanie trasy", desc: "Optymalna trasa z uwzględnieniem ruchu." }, { title: "Pakowanie", desc: "Profesjonalne pakowanie specjalnymi materiałami." }, { title: "Transport", desc: "Monitoring GPS z doświadczonymi kierowcami." }, { title: "Dostawa", desc: "Terminowa dostawa, montaż i ustawienie." }],
    sf_guar: ["Stała cena na całą trasę", "Pełne ubezpieczenie", "Gwarancja terminowej dostawy"],
    sf_ct: "Zapytaj o przeprowadzkę dalekodystansową", sf_ctxt: "Dokąd chcesz się przeprowadzić?",
    // service_reinigung
    sr_mt: "Profesjonalne sprzątanie", sr_md: "FLOXANT oferuje profesjonalne sprzątanie końcowe.",
    clean_badge: "Sprzątanie", sr_ht: "Sprzątanie", sr_hd: "Czystość to nie detal – to podstawa zakończenia i nowego początku.",
    sr_it: "Sprzątanie końcowe z systemem", sr_ip1: "Sprzątanie końcowe jest często czynnikiem decydującym o zwrocie kaucji.", sr_ip2: "Nasz zespół pracuje dokładnie i szybko.",
    sr_fw: ["Najemcy przed przekazaniem", "Właściciele przed sprzedażą", "Lokale komercyjne"],
    sr_steps: [{ title: "Inspekcja", desc: "Ocena stanu i zakresu." }, { title: "Realizacja", desc: "Systematyczne sprzątanie." }, { title: "Kontrola jakości", desc: "Odbiór według listy kontrolnej z dokumentacją fotograficzną." }, { title: "Przekazanie", desc: "Czyste przekazanie." }],
    sr_guar: ["Sprzątanie według standardów właściciela", "Dokumentacja fotograficzna w cenie", "Ponowne sprzątanie przy uzasadnionych reklamacjach"],
    sr_ct: "Zamów sprzątanie", sr_ctxt: "Zamów profesjonalne sprzątanie końcowe.",
    // service_entruempelung
    se_mt: "Opróżnianie – profesjonalne czyszczenie", se_md: "FLOXANT profesjonalnie opróżnia nieruchomości.",
    disp_badge: "Utylizacja", se_ht: "Opróżnianie", se_hd: "Rozstanie wymaga zaufania. Opróżniamy profesjonalnie i ekologicznie.",
    se_it: "Opróżnianie z odpowiedzialnością", se_ip1: "Opróżnianie to więcej niż usuwanie rzeczy.", se_ip2: "Profesjonalnie sortujemy i ekologicznie utylizujemy.",
    se_fw: ["Likwidacja gospodarstw domowych", "Opróżnianie komercyjne", "Osoby prywatne"],
    se_steps: [{ title: "Obchód", desc: "Wspólna inwentaryzacja." }, { title: "Opróżnianie", desc: "Systematyczne opróżnianie." }, { title: "Utylizacja", desc: "Profesjonalne sortowanie i utylizacja." }, { title: "Stan końcowy", desc: "Czyste przekazanie." }],
    se_guar: ["Ekologiczna utylizacja z dokumentacją", "Dyskretna obsługa", "Gwarantowane czyste przekazanie"],
    se_ct: "Zapytaj o opróżnianie", se_ctxt: "Skontaktuj się z nami.",
    // service_montage
    sm_mt: "Montaż – profesjonalny montaż mebli", sm_md: "FLOXANT profesjonalnie montuje meble i kuchnie.",
    mont_badge: "Montaż", sm_ht: "Montaż", sm_hd: "Precyzja w detalu.",
    sm_it: "Montaż z ekspertyzą", sm_ip1: "Wysokiej jakości meble zasługują na profesjonalny montaż.", sm_ip2: "Od regałów IKEA po kuchnie designerskie.",
    sm_fw: ["Po przeprowadzce lub zakupie", "Klienci komercyjni", "Montaż kuchni"],
    sm_steps: [{ title: "Przygotowanie", desc: "Sprawdzenie instrukcji." }, { title: "Montaż", desc: "Profesjonalna instalacja." }, { title: "Test funkcji", desc: "Test ruchomych części." }, { title: "Kontrola końcowa", desc: "Sprzątanie miejsca pracy." }],
    sm_guar: ["Profesjonalny montaż", "Staranne podejście", "Czyste miejsce pracy"],
    sm_ct: "Zamów montaż", sm_ctxt: "Profesjonalny montaż bez kompromisów.",
    // service_halteverbotszone
    sh_mt: "Strefa zakazu parkowania", sh_md: "FLOXANT załatwia strefy zakazu parkowania.",
    log_badge: "Logistyka", sh_ht: "Strefa zakazu parkowania", sh_hd: "Swobodny dojazd to podstawa każdej udanej przeprowadzki.",
    sh_it: "Strefy zakazu parkowania – terminowo i legalnie", sh_ip1: "W wielu obszarach miejskich strefa zakazu jest niezbędna.", sh_ip2: "FLOXANT zajmuje się całym procesem.",
    sh_fw: ["Przeprowadzki w centrum", "Przeprowadzki komercyjne", "Każda przeprowadzka wymagająca gwarantowanego dojazdu"],
    sh_steps: [{ title: "Wniosek", desc: "Złożenie do urzędu drogowego." }, { title: "Zatwierdzenie", desc: "Kontrola i potwierdzenie." }, { title: "Instalacja", desc: "Ustawienie znaków." }, { title: "Demontaż", desc: "Usunięcie znaków po przeprowadzce." }],
    sh_guar: ["Kompletne załatwienie urzędowe", "Terminowa instalacja", "Pełna obsługa"],
    sh_ct: "Złóż wniosek o strefę zakazu", sh_ctxt: "Zapewnij swobodny dojazd.",
    // Regensburg pages
    rr_mt: "Sprzątanie Regensburg", rr_md: "FLOXANT oferuje profesjonalne sprzątanie w Regensburgu.",
    rr_htp: "Profesjonalne sprzątanie w", rr_hd: "Regensburg to nasze centrum operacyjne.",
    rr_it: "Sprzątanie końcowe w Regensburgu", rr_ip1: "Jako baza operacyjna FLOXANT, Regensburg jest centrum naszych usług sprzątania.", rr_ip2: "Nasze sprzątanie końcowe opiera się na udokumentowanym procesie.",
    rr_st: "Nasze usługi sprzątania w Regensburgu",
    rr_ec: "Sprzątanie końcowe", rr_ecd: "Pełne sprzątanie według standardów właściciela.",
    rr_cc: "Sprzątanie pobudowlane", rr_ccd: "Profesjonalne sprzątanie po remoncie.",
    rr_oc: "Sprzątanie biurowe", rr_ocd: "Regularne lub jednorazowe sprzątanie komercyjne.",
    rr_ct: "Zapytaj o sprzątanie w Regensburgu", rr_ctxt: "Umów się na profesjonalne sprzątanie.",

    etr_mt: "Opróżnianie Regensburg", etr_md: "FLOXANT profesjonalnie opróżnia nieruchomości w Regensburgu.",
    etr_htp: "Opróżnianie w", etr_hd: "Rozstanie to proces. W Regensburgu towarzyszymy z szacunkiem.",
    etr_it: "Opróżnianie w Regensburgu", etr_ip1: "Regensburg to nasze centrum operacyjne.", etr_ip2: "Nasz zespół profesjonalnie sortuje na miejscu.",
    etr_st: "Nasze usługi opróżniania w Regensburgu",
    etr_hh: "Likwidacja gospodarstwa", etr_hhd: "Pełne opróżnianie mieszkań.",
    etr_com: "Opróżnianie komercyjne", etr_comd: "Profesjonalne opróżnianie biur i magazynów.",
    etr_par: "Częściowe opróżnianie", etr_pard: "Celowe opróżnianie wybranych pomieszczeń.",
    etr_ct: "Zapytaj o opróżnianie w Regensburgu", etr_ctxt: "Skontaktuj się z nami.",

    bur_mt: "Przeprowadzka biurowa Regensburg", bur_md: "FLOXANT organizuje przeprowadzki biurowe w Regensburgu.",
    bur_htp: "Przeprowadzka biurowa w", bur_hd: "Ciągłość biznesu jest priorytetem.",
    bur_it: "Przeprowadzki biurowe w Regensburgu", bur_ip1: "Regensburg stabilnie rośnie jako lokalizacja biznesowa.", bur_ip2: "Koordynujemy przeprowadzkę biura.",
    bur_st: "Nasze usługi przeprowadzek biurowych",
    bur_fm: "Pełna przeprowadzka", bur_fmd: "Kompletna przeprowadzka biura i IT.",
    bur_itr: "Relokacja IT", bur_itrd: "Profesjonalne odłączanie i podłączanie serwerów.",
    bur_wm: "Przeprowadzka weekendowa", bur_wmd: "Realizacja poza godzinami pracy.",
    bur_ct: "Zaplanuj przeprowadzkę biura w Regensburgu", bur_ctxt: "Zaplanujmy wspólnie.",

    sig_badge: "Signature Doświadczenie",
    sigs: {
        sig_ritual_exit: { mt: "Rytualne pudełko pożegnalne", md: "Rytualne pudełko pożegnalne FLOXANT.", ht: "Rytualne pudełko pożegnalne", hd: "Opuszczenie domu to zamknięcie rozdziału.", st: "Dlaczego pożegnanie zasługuje na rytuał", sp1: "Każdy dom niesie wspomnienia.", sp2: "W pudełku znajdziesz małą ceremonię.", pt_label: "Wartość psychologiczna", pt: "Świadome przejścia redukują stres.", fw_label: "Dla kogo to doświadczenie?", fw: "Dla tych, którzy chcą się pożegnać.", ct: "Dodaj rytualne pudełko", ctxt: "Uzupełnij przeprowadzkę rytuałem pożegnalnym." },
        sig_clean_start: { mt: "Ceremonia czystego startu", md: "Ceremonia czystego startu FLOXANT.", ht: "Ceremonia czystego startu", hd: "Zanim ustawisz meble, przygotowujemy przestrzeń.", st: "Nowy początek zaczyna się od czystości", sp1: "Nowy dom powinien czuć się Twój od pierwszej sekundy.", sp2: "Nie tylko czyścimy – tworzymy atmosferę.", pt_label: "Wartość psychologiczna", pt: "Czysta przestrzeń sygnalizuje: zaczyna się coś nowego.", fw_label: "Dla kogo?", fw: "Przy wprowadzaniu się do istniejących nieruchomości.", ct: "Zarezerwuj czysty start", ctxt: "Przygotuj swoją przeprowadzkę." },
        sig_neighbour_kit: { ht: "Zestaw nowego sąsiada", hd: "Pierwsze wrażenie ma znaczenie.", st: "Przybycie zaczyna się od kontaktu", pt_label: "Wartość społeczna", ct: "Zamów zestaw sąsiada" },
        sig_first_48h: { ht: "Pakiet pierwszych 48 godzin", hd: "Pierwsze godziny w nowym domu są kluczowe.", st: "Krytyczne pierwsze 48 godzin", pt_label: "Wartość praktyczna", ct: "Zarezerwuj pakiet 48h" },
        sig_bureaucracy: { ht: "Tarcza biurokratyczna", hd: "Formalności to część każdej przeprowadzki.", st: "Biurokracja nie powinna być Twoim zmartwieniem", pt_label: "Wartość organizacyjna", ct: "Zamów tarczę biurokratyczną" },
        sig_furniture_opt: { ht: "Optymalizacja mebli", hd: "Ustawiać, a nie tylko wstawiać.", st: "Twoja przestrzeń, na nowo przemyślana", pt_label: "Wartość designu", ct: "Zamów optymalizację mebli" },
        sig_cleaning_guarantee: { ht: "Gwarancja czystości", hd: "Czyste przekazanie – gwarantowane.", st: "Pewność przy przekazaniu", pt_label: "Wartość finansowa", ct: "Dodaj gwarancję czystości" },
        sig_storage_rot: { ht: "Rotacja magazynu", hd: "Nie wszystko musi się przenieść naraz.", st: "Magazynowanie tymczasowe jako narzędzie strategiczne", pt_label: "Wartość logistyczna", ct: "Zamów rotację magazynu" },
        sig_kids_box: { ht: "Dziecięce pudełko przeprowadzkowe", hd: "Dzieci doświadczają przeprowadzki inaczej.", st: "Przeprowadzka oczami dziecka", pt_label: "Wartość edukacyjna", ct: "Zamów pudełko dla dzieci" },
        sig_service_24h: { ht: "Przeprowadzka 24h", hd: "Czasem przeprowadzka nie może czekać.", st: "Dostępność jako obietnica", pt_label: "Wartość czasowa", ct: "Zamów serwis 24h" },
        sig_ladies_team: { ht: "Zespół damski", hd: "Niektóre sytuacje wymagają szczególnej wrażliwości.", st: "Szacunek zaczyna się od zrozumienia", pt_label: "Wartość osobista", ct: "Zamów zespół damski" },
        sig_memory_capsule: { ht: "Kapsuła pamięci", hd: "Niektóre miejsca zasługują na pamięć.", st: "Miejsce zamrożone w czasie", pt_label: "Wartość emocjonalna", ct: "Dodaj kapsułę pamięci" },
        sig_maybe_box: { ht: "Pudełko 'Może'", hd: "Nie każda decyzja musi zapaść od razu.", st: "Redukcja presji decyzyjnej", pt_label: "Wartość decyzyjna", ct: "Zamów pudełko 'Może'" },
        sig_key_handover: { ht: "Przekazanie kluczy", hd: "Udokumentowane. Bezpieczne. Weryfikowalne.", st: "Ostatni krok, właściwie udokumentowany", pt_label: "Wartość prawna", ct: "Zarezerwuj przekazanie kluczy" }
    }
};

gen('pl', {
    title: "Obszary usług", description: "Siedziba FLOXANT mieści się w Düsseldorfie. Nasze centrum operacyjne to Regensburg i Górny Palatynat.",
    hub_note: "Siedziba FLOXANT mieści się w Düsseldorfie. Nasze centrum operacyjne to Regensburg i Górny Palatynat. Stąd obsługujemy klientów w całej Bawarii.",
    cities: { regensburg: "Regensburg", bavaria: "Bawaria", munich: "Monachium", nuremberg: "Norymberga", augsburg: "Augsburg", germany: "Cała Niemcy" }
}, translatePages(plT));

console.log('Polish done.');
